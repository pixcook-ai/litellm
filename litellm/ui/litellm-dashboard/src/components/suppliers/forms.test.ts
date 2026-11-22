import { describe, expect, it } from "vitest";
import { buildSupplierAdjustment, buildSupplierRate, buildSupplierSettlement, formatSupplierAmount } from "./forms";

const quote = {
  model_id: "deployment-1",
  input_per_million: "0.000000000000000001",
  output_per_million: "12.35",
  cache_read_per_million: "0",
  cache_write_per_million: "1.5",
};

describe("supplier quote submission", () => {
  it("preserves decimal precision and an explicitly free cache category", () => {
    expect(buildSupplierRate("supplier-1", quote)).toEqual({ supplier_id: "supplier-1", ...quote });
  });

  it.each(["", "-1", "NaN", "1e5", "1,000"])("rejects an invalid price %s instead of treating it as free", (price) => {
    expect(buildSupplierRate("supplier-1", { ...quote, cache_read_per_million: price })).toBeNull();
  });
});

describe("supplier settlement submission", () => {
  it("submits explicit selected entries and a reference without a client-calculated amount", () => {
    const expected = {
      supplier_id: "supplier-1",
      ledger_ids: ["entry-1", "entry-3"],
      reference: "bank-transfer-7",
      idempotency_key: "key-1",
    };
    expect(buildSupplierSettlement("supplier-1", ["entry-1", "entry-3"], " bank-transfer-7 ", "key-1")).toEqual(
      expected,
    );
  });

  it("rejects an empty selection, duplicate entries and a missing payment reference", () => {
    expect(buildSupplierSettlement("supplier-1", [], "transfer", "key")).toBeNull();
    expect(buildSupplierSettlement("supplier-1", ["one", "one"], "transfer", "key")).toBeNull();
    expect(buildSupplierSettlement("supplier-1", ["one"], " ", "key")).toBeNull();
  });
});

describe("supplier adjustments", () => {
  it("preserves a negative correction and its explanation", () => {
    const expected = {
      supplier_id: "supplier-1",
      amount: "-0.000012345678901234",
      reason: "correction",
      idempotency_key: "key",
    };
    expect(buildSupplierAdjustment("supplier-1", "-0.000012345678901234", " correction ", "key")).toEqual(expected);
  });

  it.each(["0", "-0.000", "", "Infinity", "1e2"])(
    "rejects an adjustment that does not name a finite nonzero amount %s",
    (amount) => {
      expect(buildSupplierAdjustment("supplier-1", amount, "reason", "key")).toBeNull();
    },
  );

  it("requires an explanation", () => {
    expect(buildSupplierAdjustment("supplier-1", "-2", " ", "key")).toBeNull();
  });
});

it("displays small and large earnings without floating point rounding", () => {
  expect(formatSupplierAmount("0.000000000000000001")).toBe("0.000000000000000001 USD");
  expect(formatSupplierAmount("12345678901234567890.1200")).toBe("12,345,678,901,234,567,890.12 USD");
  expect(formatSupplierAmount("0.000")).toBe("0 USD");
  expect(formatSupplierAmount("1.2E-10")).toBe("1.2E-10 USD");
});
