"use client";

import { useQuery } from "@tanstack/react-query";
import { createParser, useQueryState } from "nuqs";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { supplierApi } from "./api";
import { AdjustSupplierEarnings, PublishSupplierRate, RecordSupplierSettlement } from "./AdminActions";
import { formatSupplierAmount, supplierPriceFields } from "./forms";
import { SupplierError, SupplierNotice, SupplierPagination } from "./Shared";
import type { SupplierOverview } from "./types";

export const supplierOffsetParser = createParser({
  parse: (value) => {
    const offset = Number(value);
    return Number.isSafeInteger(offset) && offset >= 0 && offset % 25 === 0 ? offset : null;
  },
  serialize: String,
}).withDefault(0);

type WorkbenchProps = {
  accessToken: string;
  userId: string;
  overview: SupplierOverview;
  admin: boolean;
  canWrite: boolean;
  onSaved: () => void;
};

function EarningsLedger({
  accessToken,
  userId,
  supplierId,
  canWrite,
  onSaved,
}: {
  accessToken: string;
  userId: string;
  supplierId: string | null;
  canWrite: boolean;
  onSaved: () => void;
}) {
  const { t, i18n } = useTranslation();
  const [offset, setOffset] = useQueryState("supplierLedgerOffset", supplierOffsetParser);
  const [selection, setSelection] = useState<readonly string[]>([]);
  const query = useQuery({
    queryKey: ["suppliers", userId, "ledger", supplierId, offset],
    queryFn: ({ signal }) => supplierApi.ledger(accessToken, supplierId, offset, signal),
  });
  const selectedIds = (query.data?.items ?? [])
    .filter((entry) => !entry.settlement_id && selection.includes(entry.id))
    .map((entry) => entry.id);
  const saved = () => {
    setSelection([]);
    onSaved();
  };
  const changePage = (value: number) => {
    setSelection([]);
    void setOffset(value);
  };
  return (
    <Card>
      <CardHeader>
        <CardTitle>{t("suppliers.ledger")}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-5">
        {query.isPending && <SupplierNotice>{t("suppliers.loading")}</SupplierNotice>}
        {query.isError && <SupplierError error={query.error} retry={() => void query.refetch()} />}
        {query.data &&
          (query.data.items.length ? (
            <Table>
              <TableHeader>
                <TableRow>
                  {canWrite && <TableHead>{t("suppliers.select")}</TableHead>}
                  <TableHead>{t("suppliers.date")}</TableHead>
                  <TableHead>{t("suppliers.entry")}</TableHead>
                  <TableHead>{t("suppliers.modelId")}</TableHead>
                  <TableHead>{t("suppliers.tokens")}</TableHead>
                  <TableHead>{t("suppliers.amount")}</TableHead>
                  <TableHead>{t("suppliers.paymentStatus")}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {query.data.items.map((entry) => (
                  <TableRow key={entry.id}>
                    {canWrite && (
                      <TableCell>
                        <Checkbox
                          aria-label={t("suppliers.selectEntry", { id: entry.id })}
                          disabled={Boolean(entry.settlement_id)}
                          checked={selectedIds.includes(entry.id)}
                          onCheckedChange={(checked) =>
                            setSelection((previous) =>
                              checked ? [...previous, entry.id] : previous.filter((id) => id !== entry.id),
                            )
                          }
                        />
                      </TableCell>
                    )}
                    <TableCell>{new Date(entry.created_at).toLocaleString(i18n.language)}</TableCell>
                    <TableCell>
                      <div>{t(`suppliers.${entry.kind}`)}</div>
                      {entry.reason && (
                        <p className="max-w-64 whitespace-pre-wrap break-words text-xs text-muted-foreground">
                          {entry.reason}
                        </p>
                      )}
                    </TableCell>
                    <TableCell>
                      <code className="text-xs">{entry.model_id ?? t("suppliers.notAvailable")}</code>
                    </TableCell>
                    <TableCell className="tabular-nums">{`${entry.prompt_tokens.toLocaleString(i18n.language)} / ${entry.completion_tokens.toLocaleString(i18n.language)}`}</TableCell>
                    <TableCell className="font-mono text-xs tabular-nums">
                      {formatSupplierAmount(entry.amount)}
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">
                        {entry.settlement_id ? t("suppliers.paid") : t("suppliers.unpaid")}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <SupplierNotice>{t("suppliers.noLedger")}</SupplierNotice>
          ))}
        {query.data && <SupplierPagination offset={offset} total={query.data.total} onChange={changePage} />}
        {canWrite && supplierId && (
          <RecordSupplierSettlement
            accessToken={accessToken}
            supplierId={supplierId}
            ledgerIds={selectedIds}
            onSaved={saved}
          />
        )}
      </CardContent>
    </Card>
  );
}

function SettlementHistory({
  accessToken,
  userId,
  supplierId,
}: {
  accessToken: string;
  userId: string;
  supplierId: string | null;
}) {
  const { t, i18n } = useTranslation();
  const [offset, setOffset] = useQueryState("supplierSettlementOffset", supplierOffsetParser);
  const query = useQuery({
    queryKey: ["suppliers", userId, "settlements", supplierId, offset],
    queryFn: ({ signal }) => supplierApi.settlements(accessToken, supplierId, offset, signal),
  });
  return (
    <Card>
      <CardHeader>
        <CardTitle>{t("suppliers.settlements")}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {query.isPending && <SupplierNotice>{t("suppliers.loading")}</SupplierNotice>}
        {query.isError && <SupplierError error={query.error} retry={() => void query.refetch()} />}
        {query.data &&
          (query.data.items.length ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>{t("suppliers.date")}</TableHead>
                  <TableHead>{t("suppliers.reference")}</TableHead>
                  <TableHead>{t("suppliers.amount")}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {query.data.items.map((settlement) => (
                  <TableRow key={settlement.id}>
                    <TableCell>{new Date(settlement.created_at).toLocaleString(i18n.language)}</TableCell>
                    <TableCell className="max-w-80 whitespace-normal break-words">{settlement.reference}</TableCell>
                    <TableCell className="font-mono text-xs">{formatSupplierAmount(settlement.amount)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <SupplierNotice>{t("suppliers.noSettlements")}</SupplierNotice>
          ))}
        {query.data && (
          <SupplierPagination offset={offset} total={query.data.total} onChange={(value) => void setOffset(value)} />
        )}
      </CardContent>
    </Card>
  );
}

export function SupplierWorkbench({ accessToken, userId, overview, admin, canWrite, onSaved }: WorkbenchProps) {
  const { t, i18n } = useTranslation();
  const supplierId = overview.application.id;
  const metrics = [
    ["totalEarnings", overview.total_earnings],
    ["unsettled", overview.unsettled_amount],
    ["settled", overview.settled_amount],
  ] as const;
  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-3">
        {metrics.map(([label, value]) => (
          <Card key={label} size="sm">
            <CardHeader>
              <CardDescription>{t(`suppliers.${label}`)}</CardDescription>
              <CardTitle className="break-words font-mono text-xl tracking-tight">
                {formatSupplierAmount(value)}
              </CardTitle>
            </CardHeader>
          </Card>
        ))}
      </div>
      <p className="text-sm text-muted-foreground">{t("suppliers.earningsNote")}</p>
      <Card>
        <CardHeader>
          <CardTitle>{t("suppliers.quotes")}</CardTitle>
          <CardDescription>{t("suppliers.quoteUnit")}</CardDescription>
        </CardHeader>
        <CardContent>
          {overview.rates.length ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>{t("suppliers.modelId")}</TableHead>
                  {supplierPriceFields.map((field) => (
                    <TableHead key={field}>{t(`suppliers.${field}`)}</TableHead>
                  ))}
                  <TableHead>{t("suppliers.effectiveAt")}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {overview.rates.map((rate) => (
                  <TableRow key={rate.id}>
                    <TableCell>
                      <code className="text-xs">{rate.model_id}</code>
                    </TableCell>
                    {supplierPriceFields.map((field) => (
                      <TableCell key={field} className="font-mono text-xs">
                        {formatSupplierAmount(rate[field])}
                      </TableCell>
                    ))}
                    <TableCell>{new Date(rate.effective_at).toLocaleString(i18n.language)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <SupplierNotice>{t("suppliers.noQuotes")}</SupplierNotice>
          )}
        </CardContent>
      </Card>
      {canWrite && <PublishSupplierRate accessToken={accessToken} supplierId={supplierId} onSaved={onSaved} />}
      <EarningsLedger
        key={supplierId}
        accessToken={accessToken}
        userId={userId}
        supplierId={admin ? supplierId : null}
        canWrite={canWrite}
        onSaved={onSaved}
      />
      <SettlementHistory accessToken={accessToken} userId={userId} supplierId={admin ? supplierId : null} />
      {canWrite && <AdjustSupplierEarnings accessToken={accessToken} supplierId={supplierId} onSaved={onSaved} />}
    </div>
  );
}
