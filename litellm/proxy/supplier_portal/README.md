# Supplier portal

## Accepted scope

Suppliers apply using their existing signed-in user identity. Administrators review applications and bind existing model deployments to approved suppliers with independent wholesale prices. Supplier earnings use those wholesale prices, separately from customer spend and retail pricing. The first release records manual settlements and never sends payments or publishes model credentials.

An application contains a display name, contact email, website, endpoint URL, model offering and capacity description. The endpoint URL is descriptive and never fetched. Credentials are configured through existing administrator model management rather than through applications.

An administrator records all four USD prices per million tokens, for uncached input, output, cache reads and cache writes. Prices and deployment ownership are versioned together at the time of publication. Historical usage uses the quote effective when the request started. No quote can be backdated, edited or deleted. A deployment must exist and use a supported OpenAI-compatible adapter before a quote can be published.

Automatic accrual in this release supports text token calls through the effective `openai` adapter, including custom API base URLs. It requires a successful call and proof that the same provider attempt reported complete input and output token counts before default values or tokenizer estimates were applied. Other native adapters are not eligible for automatic quotes in this release. An OpenAI-compatible endpoint backed by another model provider still qualifies when the configured adapter is `openai` and the endpoint reports complete usage. Messages compatibility routes use the original OpenAI bridge response and its usage provenance. They do not infer payable tokens from the translated Anthropic response, whose input token display excludes cache categories.

Response-cache hits, failed calls, estimated or missing usage, unsupported billing units and calls before a quote exists do not create automatic earnings. Partial usage billed by an upstream provider on a failed call requires an administrator adjustment with a reason. Usage identity is unique so retries of accounting cannot double accrue. Supplier ownership, token categories, price and amount are preserved in an append-only ledger. Amounts use exact decimal arithmetic and are serialized as strings.

Supplier-facing responses contain only the authenticated supplier's application, quotes, usage quantities, earnings and settlements. They never contain customer identities, prompts, API keys or upstream endpoint credentials. Only a full proxy administrator may review, publish rates, adjust a ledger or record a settlement. Administrator view-only users cannot mutate records.

A settlement atomically claims explicit unpaid ledger entries for one supplier, calculates its amount on the server and records the administrator's payment reference. Repeated submissions with the same idempotency key return the original settlement. Entries cannot be settled twice, including across workers. Corrections use signed adjustment entries with an explanation.

## Operational requirements

The proxy requires PostgreSQL and the durable spend ledger with `general_settings.use_spend_logs_ledger` enabled. Rate publication rejects a disabled ledger. Keep it enabled while accepting supplier traffic. Disabling it later stops new supplier accrual and leaves the workbench showing the last persisted balances. The portal does not replace existing spend-ledger monitoring or reconcile usage that never reaches the durable outbox.

Apply the schema migration before running the feature. It adds supplier tables and indexes without rewriting existing spend rows. Existing model deployments remain the source of upstream credentials. Publishing a supplier quote does not create, enable or change a deployment.

Supplier projection runs inside the existing customer-accounting transaction. It locks distinct model identifiers in a stable order, then reads historical quotes in a separate SQL statement so a quote committed while the consumer waits is visible. Empty batches issue no supplier queries. An unquoted batch of one or 500 attempts uses two additional database round trips, a new quoted batch uses three, and a conflicting replay uses at most four.

## Interface

The API prefix is `/supplier`. All API routes use the existing authentication dependency.

`POST /supplier/applications` submits or resubmits the authenticated user's application. `GET /supplier/me` returns their application and earnings overview. `GET /supplier/ledger` and `GET /supplier/settlements` return bounded pages.

`GET /supplier/admin/applications` lists applications. `POST /supplier/admin/applications/{supplier_id}/review` accepts an approved or rejected decision with a review note. `GET /supplier/admin/suppliers/{supplier_id}` returns an administrator's supplier overview. `GET /supplier/admin/ledger` accepts a supplier identifier and bounded pagination.

`POST /supplier/admin/rates` publishes a new quote for a deployment. `POST /supplier/admin/adjustments` appends a signed correction. `POST /supplier/admin/settlements` records a manual settlement for explicit ledger identifiers.

The dashboard has a Suppliers entry. Members see their application and workbench. Administrators see application review, supplier details, pricing and manual settlement controls. The public application landing page follows the reference's information hierarchy while using the existing product components and authentication flow.

## Acceptance

Verify application submission, review, deployment binding, successful usage, exact earnings, adjustment and settlement through the live proxy and a real isolated database. Verify supplier isolation, administrator-only mutations, quote changes, invalid quantities, duplicate accounting and concurrent settlements. Verify the browser form and workbench, including loading, empty, rejected and error states. Keep existing customer billing unchanged.

Run focused unit and UI tests, generated API types and the repository checks. Capture reproducible local proof with commit identifiers and commands. Record every unverified boundary instead of treating mocks or missing credentials as a live pass.

## Local verification

The 2026-11-23 verification uses an isolated PostgreSQL instance on `127.0.0.1:15573`, shared Redis on `127.0.0.1:16573`, the proxy on `127.0.0.1:4057` and the dashboard on `127.0.0.1:4058`. It does not change production accounts, model deployments or payouts. Wholesale prices of 2, 8, 0.5 and 3 USD per million tokens are controlled test inputs, not published provider prices.

The baseline is commit `754c2225d7db8ce71a94459df2216708995c037b`. Its live proxy returns HTTP 404 for `GET /supplier/me`. Both baseline and feature proxies use the following flags, with two serving worker processes and the same dedicated Redis for router and accounting coordination.

```sh
rtk .venv/bin/python litellm/proxy/proxy_cli.py \
  --config /tmp/litellm-supplier-qa-20261123/config/config.yaml \
  --num_workers 2 --detailed_debug --reload --use_v2_migration_resolver \
  --host 127.0.0.1 --port 4057
```

The launcher injects `DATABASE_URL`, `LITELLM_MASTER_KEY`, `LITELLM_SALT_KEY`, `UI_USERNAME` and `UI_PASSWORD` from private QA settings. `PYTHON_DOTENV_DISABLED=1` prevents the checkout's local dotenv from replacing those settings. The durable spend ledger uses the enabled `GeneralSettings` schema default. Both `router_settings.redis_host/redis_port` and `general_settings.coordination_redis.host/port` point to the dedicated Redis instance. Quote publication and persisted outbox deliveries confirm that the ledger is active. No upstream credential is included in this document.

Real PostgreSQL regression covers historical and exact-effective-time quotes, uncommitted first and replacement quotes, stale application review, supplier isolation, adjustments, concurrent settlement and batch accounting. The thirteen tests pass, including real query-count measurements for a 500-attempt batch.

Browser verification follows the anonymous application CTA through real administrator login back to the supplier workbench. It reads actual persisted usage and a manual settlement. A second member activates an invitation, submits the application form and still sees pending review after reloading. A 390 by 844 viewport has no horizontal document overflow and keeps the submit button reachable. Runtime error and unhandled-rejection capture is empty for these interactions.

Three real non-streaming Responses turns with resent history each produce one matching supplier entry. An additional real Responses stream and three requests using a continuation identifier also match all reported input, output, cache-read and cache-write quantities to exact ledger amounts. The continuation requests establish accounting behavior, not conversational correctness. Their answer text does not consistently preserve the requested test word, so this verification does not claim to fix or validate that upstream conversation behavior.

Final product verification runs at `b3bdea43ee18d79a5e2556bbc1d4b658b2ffba5e`. Six real upstream calls cover ordinary and streaming Responses, Chat Completions and Messages compatibility routes. All six return successfully and produce exactly six entries for the quoted deployment, matching every reported input, output, cache-read and cache-write quantity and the exact decimal wholesale amount. Before the final fix, the same Messages ordinary call succeeded without producing supplier usage. The controlled call-type admission now retains the original bridge provenance and records it correctly.

The final focused API, domain and real PostgreSQL run passes 107 tests. The final metering and Responses regression runs pass another 138 focused tests. `rtk make check` passes with no staged files, so its scope includes the complete branch diff against the baseline rather than only the documentation. Python rule and type budgets, test-tree lint, dashboard lint and generated API type synchronization all run. The final proxy serves from worker processes 99484 and 99485 with shared Redis coordination.

A scripted local upstream also exercises the actual HTTP router, streaming wrappers, durable outbox and PostgreSQL projection. All sixteen cases pass at the final product commit. They cover complete, partial and absent usage for Chat JSON, Chat SSE, Responses SSE and both Messages forms, plus an output-token-limit synthetic response. The Messages fixtures follow the actual Responses bridge. All sixteen client responses and persisted customer spend rows agree. Only the five complete-usage cases create supplier entries, each exactly once with 50 input tokens, seven output tokens and a wholesale amount of 0.000064 USD. Customer retail spend remains independently calculated at 0.000128 USD for those controlled cases. The other eleven cases create no supplier income. Internal provenance markers never appear in customer JSON. All sixteen temporary deployments are deleted and the local upstream port is closed afterward.

Two initial harness mistakes are retained in separate evidence files. A partial Chat stream preserves 50 input and zero output tokens rather than estimating output. Messages chooses a Responses bridge, so the local upstream fixture must serve that endpoint. Both harness assumptions were corrected without changing customer behavior to satisfy them. Scripted cases verify integration behavior and do not count as calls to an external provider.

Production dashboard type checking uses `tsconfig.production.json` and passes. The broader `tsconfig.json` run includes unrelated tests and reports errors outside the supplier product code. The supplier integration test's unsupported query option found by that run is fixed. The broad run is not reported as a clean repository-wide type check.

Sanitized local evidence is retained under `/tmp/litellm-supplier-qa-20261123`. `final-http-proof.json` contains the six external-provider quantity and price comparisons. `provenance-http-proof.json` contains the sixteen scripted HTTP cases and cleanup results. `environment-proof.json` records the product commit, serving workers and shared Redis configuration. `full-check-final.log` contains the complete branch-scoped check output. `ui-evidence.json` and the screenshots record browser acceptance. Private credentials, proxy logs and the disposable database are removed after verification.

This release has not been deployed to production. It does not verify interrupted streams or cross-supplier fallback against a live external provider. Other native adapters remain outside automatic accrual, and failed partial charges require an administrator adjustment.
