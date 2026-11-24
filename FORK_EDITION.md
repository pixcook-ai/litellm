# Branch edition

This branch enables enterprise features in every environment. Authentication, roles, organization isolation, budgets and request limits still apply. External integrations still need their own credentials and configuration.

## Branch and upstream sync policy

The repository keeps one product branch, `litellm_supplier_portal_20261123`, for the branded edition. The official LiteLLM source of truth is the external `upstream/main` remote. The repository `main` branch is reserved for repository automation and must stay close to the upstream codebase.

Upstream updates follow this sequence:

1. Start a temporary branch from the current brand branch.
2. Merge `upstream/main` into that temporary branch. Never rebuild the branch from upstream and copy selected brand files back.
3. Resolve conflicts while keeping the brand edition policy, translations and product assets. Keep the Python and Rust edition policies aligned.
4. Run the focused license, organization, authentication, budget, KMS and dashboard checks, then verify login and organization creation through the local UI.
5. Open or refresh one pull request from the temporary branch into `litellm_supplier_portal_20261123`.
6. After the pull request is merged and the brand branch is verified, delete the temporary branch and any superseded sync branch.

The temporary branch must not be force-updated after a conflict unless its current remote head is checked first. If an upstream merge has conflicts, the workflow stops without publishing a partial branch and the conflicts are resolved in the pull request branch. Do not create a second long-lived product or sync branch for the same update.

Changes to the branded edition belong on the brand branch. Changes required only to run repository automation belong on `main`. Keep unrelated feature branches separate until their changes are merged or explicitly abandoned.

Python policy lives in `litellm/proxy/auth/edition.py`. Rust gateway policy lives in `litellm/rust/crates/gateway/src/edition.rs`. Keep these two constants aligned when merging upstream. The Python license, KMS and capacity constructors accept an edition argument so upstream license behavior remains testable. Rust uses `Entitlements::BranchEdition`, preserving signed and server verification.

After an upstream update, inspect new license gates and run the license, priority reservation, KMS and organization tests. Verify the real login and organization creation flow. Existing sessions need a new login because the enterprise identity is carried in the login token.

## Local verification on November 22, 2026

The local proxy used two workers and dedicated Redis on port 6398 for both router and coordination state. Configuration was `/tmp/litellm-local-dev-20261122.yaml`, copied from the dev configuration with no provider models. Secrets came from the ignored `.env` and were not copied into evidence.

```sh
.venv/bin/python litellm/proxy/proxy_cli.py --config /tmp/litellm-local-dev-20261122.yaml --host 127.0.0.1 --port 4000 --num_workers 2 --detailed_debug --reload --use_v2_migration_resolver
```

Before the change, an authenticated `GET /organization/list` returned 403 and `/organizations` showed the enterprise notice. After the change, the same API returned 200. Anonymous access returned 401. Through the browser at `http://127.0.0.1:3000/organizations`, a fresh admin login opened the organization table. Creating `Enterprise verification` succeeded and appeared in the table. The test organization was deleted afterward and the empty table was read back.

Python license and limiter tests passed 153 cases. Organization, budget and login tests passed 202 cases. License, KMS and CI coverage checks passed 93 cases. Disabling the Python edition constant made both new license regression cases fail, and the constant was restored. Rust license tests passed 76 cases and `cargo check -p litellm-gateway --locked` passed.

SSO, external secret services and other enterprise integrations were not tested against real external services. Rust gateway behavior was unit tested and compiled, but was not exercised as a standalone live server.

`make check` passed with `UV_PYTHON_PREFERENCE=only-managed` after installing an ARM Python 3.12 interpreter. The initial attempt selected an incompatible x86 interpreter. No lint budgets or type ceilings were changed. License and KMS tests passed another 40 cases after the local runtime moved to Python 3.12.
