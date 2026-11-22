"use client";

import { useMutation } from "@tanstack/react-query";
import { useState, type FormEvent } from "react";
import { useTranslation } from "react-i18next";
import { v4 as uuidv4 } from "uuid";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ApiError } from "@/lib/http/client";
import { supplierApi } from "./api";
import { buildSupplierAdjustment, buildSupplierRate, buildSupplierSettlement, supplierPriceFields } from "./forms";
import { SupplierError, SupplierField, SupplierNotice } from "./Shared";
import type { SupplierAdjustmentInput, SupplierRateInput, SupplierReviewInput, SupplierSettlementInput } from "./types";

type AdminActionProps = { accessToken: string; supplierId: string; onSaved: () => void };

export function ReviewApplication({
  accessToken,
  supplierId,
  onSaved,
  expectedRevision,
}: AdminActionProps & { expectedRevision: number }) {
  const { t } = useTranslation();
  const [note, setNote] = useState("");
  const [invalid, setInvalid] = useState(false);
  const mutation = useMutation({
    mutationFn: (body: SupplierReviewInput) => supplierApi.review(accessToken, supplierId, body),
    retry: false,
    onSuccess: onSaved,
  });
  const outdated = mutation.error instanceof ApiError && mutation.error.status === 409;
  function decide(status: "approved" | "rejected") {
    if (status === "rejected" && !note.trim()) {
      setInvalid(true);
      return;
    }
    setInvalid(false);
    mutation.mutate({ status, review_note: note.trim(), expected_revision: expectedRevision });
  }
  return (
    <Card>
      <CardHeader>
        <CardTitle>{t("suppliers.review")}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="supplier-review-note">{t("suppliers.reviewNote")}</Label>
          <Textarea
            id="supplier-review-note"
            value={note}
            onChange={(event) => setNote(event.target.value)}
            maxLength={2000}
            placeholder={t("suppliers.rejectionReason")}
            disabled={mutation.isPending}
          />
        </div>
        {invalid && <SupplierError error={t("suppliers.rejectionReasonRequired")} />}
        {mutation.isError && <SupplierError error={outdated ? t("suppliers.reviewOutdated") : mutation.error} />}
        {outdated && (
          <Button type="button" variant="outline" onClick={onSaved}>
            {t("suppliers.refreshReview")}
          </Button>
        )}
        <div className="flex flex-wrap gap-2">
          <Button type="button" disabled={mutation.isPending || outdated} onClick={() => decide("approved")}>
            {t("suppliers.approve")}
          </Button>
          <Button
            type="button"
            variant="outline"
            disabled={mutation.isPending || outdated}
            onClick={() => decide("rejected")}
          >
            {t("suppliers.reject")}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

export function PublishSupplierRate({ accessToken, supplierId, onSaved }: AdminActionProps) {
  const { t } = useTranslation();
  const [invalid, setInvalid] = useState(false);
  const mutation = useMutation({
    mutationFn: (body: SupplierRateInput) => supplierApi.publishRate(accessToken, body),
    onSuccess: onSaved,
  });
  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const values = {
      model_id: String(data.get("model_id") ?? ""),
      input_per_million: String(data.get("input_per_million") ?? ""),
      output_per_million: String(data.get("output_per_million") ?? ""),
      cache_read_per_million: String(data.get("cache_read_per_million") ?? ""),
      cache_write_per_million: String(data.get("cache_write_per_million") ?? ""),
    };
    const body = buildSupplierRate(supplierId, values);
    setInvalid(body === null);
    if (body) {
      const form = event.currentTarget;
      mutation.mutate(body, { onSuccess: () => form.reset() });
    }
  }
  return (
    <Card>
      <CardHeader>
        <CardTitle>{t("suppliers.publishRate")}</CardTitle>
        <CardDescription>{t("suppliers.quoteUnit")}</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={submit} className="space-y-4">
          <fieldset disabled={mutation.isPending} className="space-y-4">
            <SupplierField
              id="supplier-rate-model"
              name="model_id"
              label={t("suppliers.modelId")}
              hint={t("suppliers.quoteModelHelp")}
              required
              maxLength={256}
            />
            <div className="grid gap-4 sm:grid-cols-2">
              {supplierPriceFields.map((field) => (
                <SupplierField
                  key={field}
                  id={`supplier-price-${field}`}
                  name={field}
                  label={t(`suppliers.${field}`)}
                  required
                  inputMode="decimal"
                  autoComplete="off"
                />
              ))}
            </div>
            <Button type="submit" disabled={mutation.isPending}>
              {mutation.isPending ? t("suppliers.saving") : t("suppliers.publishRate")}
            </Button>
          </fieldset>
          {invalid && <SupplierError error={t("suppliers.quoteInvalid")} />}
          {mutation.isError && <SupplierError error={mutation.error} />}
          {mutation.isSuccess && <SupplierNotice>{t("suppliers.quoteSaved")}</SupplierNotice>}
        </form>
      </CardContent>
    </Card>
  );
}

export function AdjustSupplierEarnings({ accessToken, supplierId, onSaved }: AdminActionProps) {
  const { t } = useTranslation();
  const [invalid, setInvalid] = useState(false);
  const [idempotencyKey, setIdempotencyKey] = useState<string>(() => uuidv4());
  const mutation = useMutation({
    mutationFn: (body: SupplierAdjustmentInput) => supplierApi.adjust(accessToken, body),
    onSuccess: () => {
      setIdempotencyKey(uuidv4());
      onSaved();
    },
  });
  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const body = buildSupplierAdjustment(
      supplierId,
      String(data.get("amount") ?? ""),
      String(data.get("reason") ?? ""),
      idempotencyKey,
    );
    setInvalid(body === null);
    if (body) {
      const form = event.currentTarget;
      mutation.mutate(body, { onSuccess: () => form.reset() });
    }
  }
  return (
    <Card>
      <CardHeader>
        <CardTitle>{t("suppliers.adjustmentTitle")}</CardTitle>
        <CardDescription>{t("suppliers.adjustmentHelp")}</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={submit} className="space-y-4">
          <fieldset disabled={mutation.isPending} className="space-y-4">
            <SupplierField
              id="supplier-adjustment-amount"
              name="amount"
              label={t("suppliers.amount")}
              required
              inputMode="decimal"
              autoComplete="off"
            />
            <div className="space-y-2">
              <Label htmlFor="supplier-adjustment-reason">{t("suppliers.adjustmentReason")}</Label>
              <Textarea id="supplier-adjustment-reason" name="reason" required maxLength={2000} />
            </div>
            <Button type="submit" disabled={mutation.isPending}>
              {mutation.isPending ? t("suppliers.saving") : t("suppliers.recordAdjustment")}
            </Button>
          </fieldset>
          {invalid && <SupplierError error={t("suppliers.adjustmentInvalid")} />}
          {mutation.isError && <SupplierError error={mutation.error} />}
          {mutation.isSuccess && <SupplierNotice>{t("suppliers.adjustmentSaved")}</SupplierNotice>}
        </form>
      </CardContent>
    </Card>
  );
}

export function RecordSupplierSettlement({
  accessToken,
  supplierId,
  onSaved,
  ledgerIds,
}: AdminActionProps & { ledgerIds: readonly string[] }) {
  const { t } = useTranslation();
  const [invalid, setInvalid] = useState(false);
  const [idempotencyKey, setIdempotencyKey] = useState<string>(() => uuidv4());
  const mutation = useMutation({
    mutationFn: (body: SupplierSettlementInput) => supplierApi.settle(accessToken, body),
    onSuccess: () => {
      setIdempotencyKey(uuidv4());
      onSaved();
    },
  });
  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const body = buildSupplierSettlement(supplierId, ledgerIds, String(data.get("reference") ?? ""), idempotencyKey);
    setInvalid(body === null);
    if (body) {
      const form = event.currentTarget;
      mutation.mutate(body, { onSuccess: () => form.reset() });
    }
  }
  return (
    <div className="space-y-4 rounded-lg border bg-muted/20 p-4">
      <h3 className="font-medium">{t("suppliers.manualSettlement")}</h3>
      <p className="max-w-3xl text-sm text-muted-foreground">{t("suppliers.manualSettlementHelp")}</p>
      <p role="status" className="text-sm">
        {t("suppliers.selectedCount", { count: ledgerIds.length })}
      </p>
      <form onSubmit={submit} className="flex flex-wrap items-end gap-3">
        <SupplierField
          id="supplier-payment-reference"
          name="reference"
          label={t("suppliers.reference")}
          required
          maxLength={256}
          disabled={mutation.isPending}
        />
        <Button type="submit" disabled={!ledgerIds.length || mutation.isPending}>
          {mutation.isPending ? t("suppliers.saving") : t("suppliers.recordSettlement")}
        </Button>
      </form>
      {invalid && <SupplierError error={t("suppliers.settlementInvalid")} />}
      {mutation.isError && <SupplierError error={mutation.error} />}
      {mutation.isSuccess && <SupplierNotice>{t("suppliers.settlementSaved")}</SupplierNotice>}
    </div>
  );
}
