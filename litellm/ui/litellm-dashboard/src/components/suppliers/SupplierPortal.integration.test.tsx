import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { configure, fireEvent, screen, waitFor } from "@testing-library/react";
import { jsonResponse, renderWithProviders, testQueryClient } from "../../../tests/test-utils";
import { SupplierPortal } from "./SupplierPortal";
import type { SupplierApplication, SupplierLedgerEntry, SupplierOverview } from "./types";

configure({ asyncUtilTimeout: 10_000 });

const initialApplication: SupplierApplication = {
  id: "supplier-1",
  owner_user_id: "user-1",
  display_name: "Example supplier",
  contact_email: "operator@example.test",
  website: "https://example.test/",
  endpoint_url: "https://inference.example.test/v1",
  models: "A text model",
  capacity: "Available daily",
  status: "pending",
  revision: 1,
  review_note: null,
  created_at: "2026-01-01T00:00:00Z",
  updated_at: "2026-01-01T00:00:00Z",
};

const pendingEntry: SupplierLedgerEntry = {
  id: "entry-1",
  supplier_id: "supplier-1",
  kind: "usage",
  request_id: "request-1",
  rate_id: "quote-1",
  model_id: "deployment-1",
  prompt_tokens: 10,
  completion_tokens: 2,
  cache_read_tokens: 0,
  cache_write_tokens: 0,
  amount: "0.00000012",
  reason: null,
  settlement_id: null,
  created_at: "2026-01-01T01:00:00Z",
  currency: "USD",
};

const submitted = vi.fn<(path: string, body: unknown) => void>();
const unexpected = vi.fn<(path: string) => void>();
let application: SupplierApplication | null;
let ledger: SupplierLedgerEntry[];
let mineStatus: number;
let reviewConflict: boolean;
const page = <T,>(items: T[]) => ({ items, total: items.length, limit: 25, offset: 0 });

function overview(): SupplierOverview | null {
  return application
    ? {
        application,
        rates: [],
        total_earnings: "0.00000012",
        unsettled_amount: "0.00000012",
        settled_amount: "0",
        currency: "USD",
      }
    : null;
}

function reviewResponse(body: unknown): Response {
  if (reviewConflict) {
    application = { ...initialApplication, revision: 2, models: "Updated model offering" };
    return jsonResponse({ detail: "The application changed" }, 409);
  }
  const isRecord = typeof body === "object" && body !== null;
  const approved = isRecord && "status" in body && body.status === "approved";
  application = {
    ...(application ?? initialApplication),
    status: approved ? "approved" : "rejected",
    review_note: "Add the supported regions",
  };
  return jsonResponse(application);
}

beforeEach(() => {
  testQueryClient.clear();
  submitted.mockReset();
  unexpected.mockReset();
  application = null;
  ledger = [];
  mineStatus = 200;
  reviewConflict = false;
  vi.stubGlobal(
    "fetch",
    vi.fn(async (input: RequestInfo | URL, init?: RequestInit) => {
      const url = new URL(input instanceof Request ? input.url : String(input), "http://localhost");
      const path = url.pathname;
      if (init?.method === "POST") {
        const body: unknown = JSON.parse(String(init.body));
        submitted(path, body);
        if (path === "/supplier/applications") {
          application = initialApplication;
          return jsonResponse(application);
        }
        if (path.endsWith("/review")) return reviewResponse(body);
        if (path === "/supplier/admin/settlements") {
          ledger = ledger.map((entry) =>
            entry.id === pendingEntry.id ? { ...entry, settlement_id: "settlement-1" } : entry,
          );
          return jsonResponse({ id: "settlement-1" });
        }
        if (path === "/supplier/admin/rates") return jsonResponse({ id: "quote-1" });
      }
      if (path === "/supplier/me")
        return mineStatus === 200
          ? jsonResponse(overview())
          : jsonResponse({ detail: "Supplier access denied" }, mineStatus);
      if (path === "/supplier/admin/applications") return jsonResponse(page(application ? [application] : []));
      if (path === "/supplier/admin/suppliers/supplier-1") return jsonResponse(overview());
      if (path.endsWith("/ledger")) return jsonResponse(page(ledger));
      if (path.endsWith("/settlements")) return jsonResponse(page([]));
      unexpected(path);
      return jsonResponse({ detail: `Unexpected request ${path}` }, 500);
    }),
  );
});

afterEach(() => {
  testQueryClient.clear();
  vi.unstubAllGlobals();
  expect(unexpected).not.toHaveBeenCalled();
});

function renderPortal(userRole = "Internal User", isViewOnly = false) {
  return renderWithProviders(
    <SupplierPortal accessToken="test-token" userId="user-1" userRole={userRole} isViewOnly={isViewOnly} />,
  );
}

async function openAdminApplication(isViewOnly = false) {
  renderPortal("Admin", isViewOnly);
  fireEvent.click(await screen.findByRole("button", { name: /Example supplier/ }));
  await screen.findByText("Supplier details");
}

describe("supplier application", () => {
  it("submits the signed-in member's offering without accepting an owner identifier", async () => {
    renderPortal();
    await screen.findByRole("button", { name: "Submit application" });
    fireEvent.change(screen.getByRole("textbox", { name: "Supplier name" }), {
      target: { value: initialApplication.display_name },
    });
    fireEvent.change(screen.getByRole("textbox", { name: "Contact email" }), {
      target: { value: initialApplication.contact_email },
    });
    fireEvent.change(screen.getByRole("textbox", { name: "Website" }), {
      target: { value: initialApplication.website },
    });
    fireEvent.change(screen.getByRole("textbox", { name: "API endpoint URL" }), {
      target: { value: initialApplication.endpoint_url },
    });
    fireEvent.change(screen.getByRole("textbox", { name: "Models offered" }), {
      target: { value: initialApplication.models },
    });
    fireEvent.change(screen.getByRole("textbox", { name: "Capacity and availability" }), {
      target: { value: initialApplication.capacity },
    });
    fireEvent.click(screen.getByRole("button", { name: "Submit application" }));
    const expected = {
      display_name: initialApplication.display_name,
      contact_email: initialApplication.contact_email,
      website: initialApplication.website,
      endpoint_url: initialApplication.endpoint_url,
      models: initialApplication.models,
      capacity: initialApplication.capacity,
    };
    await waitFor(() => expect(submitted).toHaveBeenCalledWith("/supplier/applications", expected));
    expect(
      await screen.findByText("Your application is awaiting review. You can update the information below."),
    ).toBeInTheDocument();
  });

  it("keeps an authorization failure visible rather than offering a fresh application", async () => {
    mineStatus = 403;
    renderPortal();
    expect(await screen.findByText("Supplier access denied")).toBeInTheDocument();
    expect(screen.queryByRole("button", { name: "Submit application" })).not.toBeInTheDocument();
  });
});

describe("administrator review", () => {
  it("requires a reason and sends it with a rejected decision", async () => {
    application = initialApplication;
    await openAdminApplication();
    fireEvent.click(screen.getByRole("button", { name: "Request changes" }));
    expect(await screen.findByText("Add a review note before requesting changes.")).toBeInTheDocument();
    expect(submitted).not.toHaveBeenCalled();
    fireEvent.change(screen.getByRole("textbox", { name: "Review note" }), {
      target: { value: "Add the supported regions" },
    });
    fireEvent.click(screen.getByRole("button", { name: "Request changes" }));
    await waitFor(() =>
      expect(submitted).toHaveBeenCalledWith("/supplier/admin/applications/supplier-1/review", {
        status: "rejected",
        review_note: "Add the supported regions",
        expected_revision: 1,
      }),
    );
  });

  it("shows pending application details without mutation controls for an administrator viewer", async () => {
    application = initialApplication;
    await openAdminApplication(true);
    expect(screen.getByText(initialApplication.models)).toBeInTheDocument();
    expect(screen.queryByRole("button", { name: "Approve application" })).not.toBeInTheDocument();
    expect(screen.queryByRole("button", { name: "Request changes" })).not.toBeInTheDocument();
  });

  it("requires a fresh read after a review conflict without retrying the stale approval", async () => {
    application = initialApplication;
    reviewConflict = true;
    await openAdminApplication();
    fireEvent.click(screen.getByRole("button", { name: "Approve application" }));
    expect(
      await screen.findByText(
        "This application changed or was already reviewed. Refresh it before making another decision.",
      ),
    ).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Approve application" })).toBeDisabled();
    expect(submitted).toHaveBeenCalledTimes(1);
    reviewConflict = false;
    fireEvent.click(screen.getByRole("button", { name: "Refresh application" }));
    expect(await screen.findByText("Updated model offering")).toBeInTheDocument();
    expect(submitted).toHaveBeenCalledTimes(1);
    fireEvent.click(screen.getByRole("button", { name: "Approve application" }));
    await waitFor(() =>
      expect(submitted).toHaveBeenLastCalledWith("/supplier/admin/applications/supplier-1/review", {
        status: "approved",
        review_note: "",
        expected_revision: 2,
      }),
    );
  });
});

describe("wholesale accounting controls", () => {
  it("sends only the selected unpaid entries for a manual payment", async () => {
    application = { ...initialApplication, status: "approved" };
    ledger = [pendingEntry, { ...pendingEntry, id: "entry-paid", settlement_id: "earlier-settlement" }];
    await openAdminApplication();
    const select = await screen.findByRole("checkbox", { name: "Select ledger entry entry-1" });
    expect(screen.getByRole("checkbox", { name: "Select ledger entry entry-paid" })).toHaveAttribute(
      "aria-disabled",
      "true",
    );
    fireEvent.click(select);
    fireEvent.change(screen.getByRole("textbox", { name: "Payment reference" }), { target: { value: "transfer-42" } });
    fireEvent.click(screen.getByRole("button", { name: "Record settlement" }));
    const expected = {
      supplier_id: "supplier-1",
      ledger_ids: ["entry-1"],
      reference: "transfer-42",
      idempotency_key: expect.any(String),
    };
    await waitFor(() => expect(submitted).toHaveBeenCalledWith("/supplier/admin/settlements", expected));
    expect(await screen.findByText("Manual settlement recorded.")).toBeInTheDocument();
  });

  it("sends all four explicitly entered prices without losing precision", async () => {
    application = { ...initialApplication, status: "approved" };
    await openAdminApplication();
    fireEvent.change(screen.getByRole("textbox", { name: "Deployment ID" }), { target: { value: "deployment-1" } });
    fireEvent.change(screen.getByRole("textbox", { name: "Uncached input" }), {
      target: { value: "0.000000000000000001" },
    });
    fireEvent.change(screen.getByRole("textbox", { name: "Output" }), { target: { value: "2" } });
    fireEvent.change(screen.getByRole("textbox", { name: "Cache reads" }), { target: { value: "0" } });
    fireEvent.change(screen.getByRole("textbox", { name: "Cache writes" }), { target: { value: "1.5" } });
    fireEvent.click(screen.getByRole("button", { name: "Publish wholesale quote" }));
    const expected = {
      supplier_id: "supplier-1",
      model_id: "deployment-1",
      input_per_million: "0.000000000000000001",
      output_per_million: "2",
      cache_read_per_million: "0",
      cache_write_per_million: "1.5",
    };
    await waitFor(() => expect(submitted).toHaveBeenCalledWith("/supplier/admin/rates", expected));
  });
});
