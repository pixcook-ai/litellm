CREATE TABLE "LiteLLM_SupplierAccount" (
    "id" TEXT NOT NULL,
    "owner_user_id" TEXT NOT NULL,
    "revision" INTEGER NOT NULL DEFAULT 1 CHECK ("revision" >= 1),
    "display_name" TEXT NOT NULL,
    "contact_email" TEXT NOT NULL,
    "website" TEXT NOT NULL,
    "endpoint_url" TEXT NOT NULL,
    "models" TEXT NOT NULL,
    "capacity" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'pending' CHECK ("status" IN ('pending', 'approved', 'rejected')),
    "review_note" TEXT,
    "reviewed_by" TEXT,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "LiteLLM_SupplierAccount_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "LiteLLM_SupplierAccount_owner_user_id_key" ON "LiteLLM_SupplierAccount"("owner_user_id");
CREATE INDEX "LiteLLM_SupplierAccount_status_created_at_idx" ON "LiteLLM_SupplierAccount"("status", "created_at");

CREATE TABLE "LiteLLM_SupplierRate" (
    "id" TEXT NOT NULL,
    "supplier_id" TEXT NOT NULL REFERENCES "LiteLLM_SupplierAccount"("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    "model_id" TEXT NOT NULL,
    "input_per_million" DECIMAL(38,18) NOT NULL CHECK ("input_per_million" >= 0),
    "output_per_million" DECIMAL(38,18) NOT NULL CHECK ("output_per_million" >= 0),
    "cache_read_per_million" DECIMAL(38,18) NOT NULL CHECK ("cache_read_per_million" >= 0),
    "cache_write_per_million" DECIMAL(38,18) NOT NULL CHECK ("cache_write_per_million" >= 0),
    "effective_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "created_by" TEXT NOT NULL,
    CONSTRAINT "LiteLLM_SupplierRate_pkey" PRIMARY KEY ("id")
);

CREATE INDEX "LiteLLM_SupplierRate_model_id_effective_at_idx" ON "LiteLLM_SupplierRate"("model_id", "effective_at");
CREATE INDEX "LiteLLM_SupplierRate_supplier_id_idx" ON "LiteLLM_SupplierRate"("supplier_id");

CREATE TABLE "LiteLLM_SupplierSettlement" (
    "id" TEXT NOT NULL,
    "supplier_id" TEXT NOT NULL REFERENCES "LiteLLM_SupplierAccount"("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    "amount" DECIMAL(65,30) NOT NULL CHECK ("amount" > 0),
    "reference" TEXT NOT NULL,
    "ledger_ids" TEXT[] NOT NULL,
    "created_by" TEXT NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "LiteLLM_SupplierSettlement_pkey" PRIMARY KEY ("id")
);

CREATE INDEX "LiteLLM_SupplierSettlement_supplier_id_created_at_id_idx" ON "LiteLLM_SupplierSettlement"("supplier_id", "created_at", "id");

CREATE TABLE "LiteLLM_SupplierLedger" (
    "id" TEXT NOT NULL,
    "supplier_id" TEXT NOT NULL REFERENCES "LiteLLM_SupplierAccount"("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    "kind" TEXT NOT NULL,
    "request_id" TEXT,
    "rate_id" TEXT REFERENCES "LiteLLM_SupplierRate"("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    "model_id" TEXT,
    "prompt_tokens" BIGINT NOT NULL DEFAULT 0 CHECK ("prompt_tokens" >= 0),
    "completion_tokens" BIGINT NOT NULL DEFAULT 0 CHECK ("completion_tokens" >= 0),
    "cache_read_tokens" BIGINT NOT NULL DEFAULT 0 CHECK ("cache_read_tokens" >= 0),
    "cache_write_tokens" BIGINT NOT NULL DEFAULT 0 CHECK ("cache_write_tokens" >= 0),
    "amount" DECIMAL(65,30) NOT NULL,
    "reason" TEXT,
    "created_by" TEXT,
    "settlement_id" TEXT REFERENCES "LiteLLM_SupplierSettlement"("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "LiteLLM_SupplierLedger_pkey" PRIMARY KEY ("id"),
    CONSTRAINT "LiteLLM_SupplierLedger_token_categories_check" CHECK ("prompt_tokens" >= "cache_read_tokens"::numeric + "cache_write_tokens"),
    CONSTRAINT "LiteLLM_SupplierLedger_kind_check" CHECK (
        ("kind" = 'usage' AND "request_id" IS NOT NULL AND "rate_id" IS NOT NULL AND "model_id" IS NOT NULL AND "amount" >= 0) OR
        ("kind" = 'adjustment' AND "reason" IS NOT NULL AND length("reason") > 0 AND "amount" <> 0)
    )
);

CREATE INDEX "LiteLLM_SupplierLedger_supplier_id_created_at_id_idx" ON "LiteLLM_SupplierLedger"("supplier_id", "created_at", "id");
CREATE INDEX "LiteLLM_SupplierLedger_supplier_id_settlement_id_idx" ON "LiteLLM_SupplierLedger"("supplier_id", "settlement_id");
