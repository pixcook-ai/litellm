import type { components } from "@/lib/http/schema";

export type SupplierApplication = components["schemas"]["Application"];
export type SupplierApplicationInput = components["schemas"]["ApplicationInput"];
export type SupplierApplicationPage = components["schemas"]["ApplicationPage"];
export type SupplierOverview = components["schemas"]["SupplierOverview"];
export type SupplierRateInput = components["schemas"]["RateInput"];
export type SupplierRate = components["schemas"]["Rate"];
export type SupplierLedgerEntry = components["schemas"]["LedgerEntry"];
export type SupplierLedgerPage = components["schemas"]["LedgerPage"];
export type SupplierSettlementPage = components["schemas"]["SettlementPage"];
export type SupplierAdjustmentInput = components["schemas"]["AdjustmentInput"];
export type SupplierSettlementInput = components["schemas"]["SettlementInput"];
export type SupplierSettlement = components["schemas"]["Settlement"];
export type SupplierReviewInput = components["schemas"]["ReviewInput"];
export type SupplierStatus = SupplierApplication["status"];
