"use client";

import { useQuery, useQueryClient } from "@tanstack/react-query";
import { parseAsString, parseAsStringLiteral, useQueryState } from "nuqs";
import { useTranslation } from "react-i18next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Page } from "@/components/shared/Page";
import { PageHeader, PageHeaderDescription, PageHeaderTitle } from "@/components/shared/PageHeader";
import { isProxyAdminRole, isProxyAdminTierRole } from "@/utils/roles";
import { uiHref } from "@/utils/uiHref";
import { ApplicationForm } from "./ApplicationForm";
import { ReviewApplication } from "./AdminActions";
import { supplierApi } from "./api";
import { SupplierError, SupplierNotice, SupplierPagination, SupplierStatusBadge } from "./Shared";
import { SupplierWorkbench, supplierOffsetParser } from "./Workbench";
import type { SupplierApplication } from "./types";

const applicationFilters = ["pending", "approved", "rejected", "all"] as const;
type PortalProps = { accessToken: string; userId: string; userRole: string; isViewOnly: boolean };

function ApplicationDetails({ application }: { application: SupplierApplication }) {
  const { t } = useTranslation();
  const fields = [
    ["contactEmail", application.contact_email],
    ["website", application.website],
    ["endpointUrl", application.endpoint_url],
    ["models", application.models],
    ["capacity", application.capacity],
  ] as const;
  return (
    <Card>
      <CardHeader>
        <CardTitle>{t("suppliers.supplierDetails")}</CardTitle>
      </CardHeader>
      <CardContent>
        <dl className="grid gap-4 text-sm sm:grid-cols-2">
          {fields.map(([label, value]) => (
            <div key={label} className="min-w-0 space-y-1">
              <dt className="text-muted-foreground">{t(`suppliers.${label}`)}</dt>
              <dd className="whitespace-pre-wrap break-words">{value}</dd>
            </div>
          ))}
        </dl>
        {application.review_note && (
          <div className="mt-5 border-t pt-4 text-sm">
            <p className="mb-1 font-medium">{t("suppliers.reviewNote")}</p>
            <p className="whitespace-pre-wrap break-words text-muted-foreground">{application.review_note}</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

function AdminSuppliers({
  accessToken,
  userId,
  canWrite,
  onSaved,
}: {
  accessToken: string;
  userId: string;
  canWrite: boolean;
  onSaved: () => void;
}) {
  const { t } = useTranslation();
  const [filter, setFilter] = useQueryState(
    "supplierStatus",
    parseAsStringLiteral(applicationFilters).withDefault("pending"),
  );
  const [selected, setSelected] = useQueryState("supplier", parseAsString.withOptions({ history: "push" }));
  const [offset, setOffset] = useQueryState("supplierApplicationOffset", supplierOffsetParser);
  const list = useQuery({
    queryKey: ["suppliers", userId, "applications", filter, offset],
    queryFn: ({ signal }) => supplierApi.applications(accessToken, filter === "all" ? null : filter, offset, signal),
  });
  const detail = useQuery({
    queryKey: ["suppliers", userId, "detail", selected],
    queryFn: ({ signal }) => supplierApi.overview(accessToken, selected ?? "", signal),
    enabled: Boolean(selected),
  });
  return (
    <div className="grid items-start gap-6 xl:grid-cols-[minmax(15rem,19rem)_minmax(0,1fr)]">
      <Card>
        <CardHeader>
          <CardTitle>{t("suppliers.applications")}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-wrap gap-2">
            {applicationFilters.map((status) => (
              <Button
                key={status}
                type="button"
                size="sm"
                variant={filter === status ? "secondary" : "ghost"}
                aria-pressed={filter === status}
                onClick={() => {
                  void setFilter(status);
                  void setOffset(0);
                }}
              >
                {t(`suppliers.${status}`)}
              </Button>
            ))}
          </div>
          {list.isPending && <SupplierNotice>{t("suppliers.loading")}</SupplierNotice>}
          {list.isError && <SupplierError error={list.error} retry={() => void list.refetch()} />}
          {list.data &&
            (list.data.items.length ? (
              <ul className="space-y-2">
                {list.data.items.map((application) => (
                  <li key={application.id}>
                    <button
                      type="button"
                      className="w-full rounded-lg border p-3 text-left transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring aria-pressed:border-primary aria-pressed:bg-muted"
                      aria-pressed={selected === application.id}
                      onClick={() => void setSelected(application.id)}
                    >
                      <span className="mb-1 block break-words font-medium">{application.display_name}</span>
                      <span className="mb-3 block break-all text-xs text-muted-foreground">
                        {application.contact_email}
                      </span>
                      <SupplierStatusBadge status={application.status} />
                    </button>
                  </li>
                ))}
              </ul>
            ) : (
              <SupplierNotice>{t("suppliers.noApplications")}</SupplierNotice>
            ))}
          {list.data && (
            <SupplierPagination offset={offset} total={list.data.total} onChange={(value) => void setOffset(value)} />
          )}
        </CardContent>
      </Card>
      <div className="min-w-0 space-y-6">
        {!selected && <SupplierNotice>{t("suppliers.selectSupplier")}</SupplierNotice>}
        {selected && detail.isPending && <SupplierNotice>{t("suppliers.loading")}</SupplierNotice>}
        {selected && detail.isError && <SupplierError error={detail.error} retry={() => void detail.refetch()} />}
        {selected && detail.data && (
          <div key={selected} className="space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <h2 className="text-xl font-semibold">{detail.data.application.display_name}</h2>
              <SupplierStatusBadge status={detail.data.application.status} />
            </div>
            <ApplicationDetails application={detail.data.application} />
            {canWrite && detail.data.application.status === "pending" && (
              <ReviewApplication
                key={detail.data.application.revision}
                accessToken={accessToken}
                supplierId={selected}
                expectedRevision={detail.data.application.revision}
                onSaved={onSaved}
              />
            )}
            {detail.data.application.status === "approved" && (
              <SupplierWorkbench
                accessToken={accessToken}
                userId={userId}
                overview={detail.data}
                admin
                canWrite={canWrite}
                onSaved={onSaved}
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
}

function MySupplierAccount({
  accessToken,
  userId,
  isViewOnly,
  onSaved,
}: Omit<PortalProps, "userRole"> & { onSaved: () => void }) {
  const { t } = useTranslation();
  const query = useQuery({
    queryKey: ["suppliers", userId, "mine"],
    queryFn: ({ signal }) => supplierApi.mine(accessToken, signal),
  });
  if (query.isPending) return <SupplierNotice>{t("suppliers.loading")}</SupplierNotice>;
  if (query.isError) return <SupplierError error={query.error} retry={() => void query.refetch()} />;
  const application = query.data?.application;
  return (
    <div className="space-y-6">
      {application && (
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h2 className="text-xl font-semibold">{application.display_name}</h2>
          <SupplierStatusBadge status={application.status} />
        </div>
      )}
      {application?.status === "pending" && <SupplierNotice>{t("suppliers.pendingNotice")}</SupplierNotice>}
      {application?.status === "rejected" && <SupplierNotice>{t("suppliers.rejectedNotice")}</SupplierNotice>}
      {application?.review_note && (
        <SupplierNotice>
          <strong className="mb-1 block">{t("suppliers.reviewNote")}</strong>
          {application.review_note}
        </SupplierNotice>
      )}
      {query.data && application?.status === "approved" ? (
        <SupplierWorkbench
          accessToken={accessToken}
          userId={userId}
          overview={query.data}
          admin={false}
          canWrite={false}
          onSaved={onSaved}
        />
      ) : (
        <ApplicationForm
          key={application?.updated_at ?? "new"}
          accessToken={accessToken}
          application={application}
          readOnly={isViewOnly}
          onSaved={onSaved}
        />
      )}
    </div>
  );
}

export function SupplierPortal({ accessToken, userId, userRole, isViewOnly }: PortalProps) {
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  const admin = isProxyAdminTierRole(userRole);
  const canWrite = isProxyAdminRole(userRole) && !isViewOnly;
  const refresh = () => {
    void queryClient.invalidateQueries({ queryKey: ["suppliers", userId] });
  };
  return (
    <Page>
      <div className="flex flex-wrap items-start justify-between gap-4">
        <PageHeader className="min-w-0 max-w-full">
          <PageHeaderTitle>{t("suppliers.title")}</PageHeaderTitle>
          <PageHeaderDescription>{t("suppliers.subtitle")}</PageHeaderDescription>
        </PageHeader>
        <div className="flex items-center gap-3">
          <Link
            className="text-sm text-muted-foreground underline underline-offset-4 hover:text-foreground"
            href={uiHref("providers/apply")}
          >
            {t("suppliers.publicPage")}
          </Link>
          <Button type="button" variant="outline" onClick={refresh}>
            {t("suppliers.refresh")}
          </Button>
        </div>
      </div>
      {isViewOnly && <SupplierNotice>{t("suppliers.readOnly")}</SupplierNotice>}
      {admin ? (
        <AdminSuppliers accessToken={accessToken} userId={userId} canWrite={canWrite} onSaved={refresh} />
      ) : (
        <MySupplierAccount accessToken={accessToken} userId={userId} isViewOnly={isViewOnly} onSaved={refresh} />
      )}
    </Page>
  );
}
