import { createApiClient } from "@/lib/http/client";
import { getGlobalLitellmHeaderName, getProxyBaseUrl } from "@/components/networking";
import type {
  SupplierAdjustmentInput,
  SupplierApplication,
  SupplierApplicationInput,
  SupplierApplicationPage,
  SupplierLedgerPage,
  SupplierLedgerEntry,
  SupplierOverview,
  SupplierRateInput,
  SupplierRate,
  SupplierReviewInput,
  SupplierSettlementInput,
  SupplierSettlementPage,
  SupplierSettlement,
  SupplierStatus,
} from "./types";

const client = createApiClient({
  getBaseUrl: () => getProxyBaseUrl() ?? "",
  getAuthHeaderName: getGlobalLitellmHeaderName,
});

export const supplierApi = {
  mine: (accessToken: string, signal?: AbortSignal) =>
    client.get<SupplierOverview | null>("/supplier/me", { accessToken, signal }),
  apply: (accessToken: string, body: SupplierApplicationInput) =>
    client.post<SupplierApplication>("/supplier/applications", { accessToken, body }),
  applications: (accessToken: string, status: SupplierStatus | null, offset: number, signal?: AbortSignal) =>
    client.get<SupplierApplicationPage>("/supplier/admin/applications", {
      accessToken,
      signal,
      query: { status, offset, limit: 25 },
    }),
  overview: (accessToken: string, supplierId: string, signal?: AbortSignal) =>
    client.get<SupplierOverview>(`/supplier/admin/suppliers/${encodeURIComponent(supplierId)}`, {
      accessToken,
      signal,
    }),
  review: (accessToken: string, supplierId: string, body: SupplierReviewInput) =>
    client.post<SupplierApplication>(`/supplier/admin/applications/${encodeURIComponent(supplierId)}/review`, {
      accessToken,
      body,
    }),
  ledger: (accessToken: string, supplierId: string | null, offset: number, signal?: AbortSignal) =>
    client.get<SupplierLedgerPage>(supplierId ? "/supplier/admin/ledger" : "/supplier/ledger", {
      accessToken,
      signal,
      query: { supplier_id: supplierId, offset, limit: 25 },
    }),
  settlements: (accessToken: string, supplierId: string | null, offset: number, signal?: AbortSignal) =>
    client.get<SupplierSettlementPage>(supplierId ? "/supplier/admin/settlements" : "/supplier/settlements", {
      accessToken,
      signal,
      query: { supplier_id: supplierId, offset, limit: 25 },
    }),
  publishRate: (accessToken: string, body: SupplierRateInput) =>
    client.post<SupplierRate>("/supplier/admin/rates", { accessToken, body }),
  adjust: (accessToken: string, body: SupplierAdjustmentInput) =>
    client.post<SupplierLedgerEntry>("/supplier/admin/adjustments", { accessToken, body }),
  settle: (accessToken: string, body: SupplierSettlementInput) =>
    client.post<SupplierSettlement>("/supplier/admin/settlements", { accessToken, body }),
};
