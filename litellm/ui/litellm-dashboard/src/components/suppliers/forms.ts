import type { SupplierAdjustmentInput, SupplierRateInput, SupplierSettlementInput } from "./types";

export const supplierPriceFields = [
  "input_per_million",
  "output_per_million",
  "cache_read_per_million",
  "cache_write_per_million",
] as const;

export type SupplierPriceField = (typeof supplierPriceFields)[number];
export type RateFormValues = Record<SupplierPriceField | "model_id", string>;

const nonnegativeDecimal = /^(?:0|[1-9]\d*)(?:\.\d{1,18})?$/;
const signedDecimal = /^-?(?:0|[1-9]\d*)(?:\.\d{1,30})?$/;

export function buildSupplierRate(supplierId: string, values: RateFormValues): SupplierRateInput | null {
  if (!values.model_id.trim() || supplierPriceFields.some((field) => !nonnegativeDecimal.test(values[field].trim())))
    return null;
  return {
    supplier_id: supplierId,
    model_id: values.model_id.trim(),
    input_per_million: values.input_per_million.trim(),
    output_per_million: values.output_per_million.trim(),
    cache_read_per_million: values.cache_read_per_million.trim(),
    cache_write_per_million: values.cache_write_per_million.trim(),
  };
}

export function buildSupplierAdjustment(
  supplierId: string,
  amount: string,
  reason: string,
  idempotencyKey: string,
): SupplierAdjustmentInput | null {
  const trimmed = amount.trim();
  if (!signedDecimal.test(trimmed) || !/[1-9]/.test(trimmed) || !reason.trim()) return null;
  return { supplier_id: supplierId, amount: trimmed, reason: reason.trim(), idempotency_key: idempotencyKey };
}

export function buildSupplierSettlement(
  supplierId: string,
  ledgerIds: readonly string[],
  reference: string,
  idempotencyKey: string,
): SupplierSettlementInput | null {
  const invalidSelection = !ledgerIds.length || ledgerIds.length > 1000 || new Set(ledgerIds).size !== ledgerIds.length;
  if (invalidSelection || !reference.trim()) return null;
  return {
    supplier_id: supplierId,
    ledger_ids: [...ledgerIds],
    reference: reference.trim(),
    idempotency_key: idempotencyKey,
  };
}

export function formatSupplierAmount(value: string): string {
  if (/[eE]/.test(value)) return `${value} USD`;
  const normalized = value.includes(".") ? value.replace(/0+$/, "").replace(/\.$/, "") : value;
  const [integer, fraction] = normalized.split(".");
  const formattedInteger = integer.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return `${formattedInteger}${fraction ? `.${fraction}` : ""} USD`;
}
