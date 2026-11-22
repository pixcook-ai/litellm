"use client";

import { useMutation } from "@tanstack/react-query";
import type { FormEvent } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { supplierApi } from "./api";
import { SupplierError, SupplierField, SupplierNotice } from "./Shared";
import type { SupplierApplication, SupplierApplicationInput } from "./types";

export function ApplicationForm({
  accessToken,
  application,
  readOnly,
  onSaved,
}: {
  accessToken: string;
  application?: SupplierApplication;
  readOnly: boolean;
  onSaved: () => void;
}) {
  const { t } = useTranslation();
  const mutation = useMutation({
    mutationFn: (body: SupplierApplicationInput) => supplierApi.apply(accessToken, body),
    onSuccess: onSaved,
  });
  const submitLabel = application ? t("suppliers.updateApplication") : t("suppliers.submitApplication");
  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const body = {
      display_name: String(data.get("display_name") ?? "").trim(),
      contact_email: String(data.get("contact_email") ?? "").trim(),
      website: String(data.get("website") ?? "").trim(),
      endpoint_url: String(data.get("endpoint_url") ?? "").trim(),
      models: String(data.get("models") ?? "").trim(),
      capacity: String(data.get("capacity") ?? "").trim(),
    };
    mutation.mutate(body);
  }
  return (
    <Card>
      <CardHeader>
        <CardTitle>{t("suppliers.applicationTitle")}</CardTitle>
        <CardDescription>{t("suppliers.applicationDescription")}</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={submit} className="space-y-5">
          <fieldset disabled={readOnly || mutation.isPending} className="space-y-5">
            <div className="grid gap-5 sm:grid-cols-2">
              <SupplierField
                id="supplier-display-name"
                name="display_name"
                label={t("suppliers.displayName")}
                required
                maxLength={160}
                defaultValue={application?.display_name ?? ""}
                autoComplete="organization"
              />
              <SupplierField
                id="supplier-contact-email"
                name="contact_email"
                type="email"
                label={t("suppliers.contactEmail")}
                required
                maxLength={254}
                defaultValue={application?.contact_email ?? ""}
                autoComplete="email"
              />
              <SupplierField
                id="supplier-website"
                name="website"
                type="url"
                label={t("suppliers.website")}
                required
                defaultValue={application?.website ?? ""}
              />
              <SupplierField
                id="supplier-endpoint"
                name="endpoint_url"
                type="url"
                label={t("suppliers.endpointUrl")}
                required
                defaultValue={application?.endpoint_url ?? ""}
                autoComplete="off"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="supplier-models">{t("suppliers.models")}</Label>
              <Textarea
                id="supplier-models"
                name="models"
                required
                maxLength={4000}
                rows={4}
                defaultValue={application?.models ?? ""}
                aria-describedby="supplier-models-help"
              />
              <p id="supplier-models-help" className="text-xs text-muted-foreground">
                {t("suppliers.modelsHelp")}
              </p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="supplier-capacity">{t("suppliers.capacity")}</Label>
              <Textarea
                id="supplier-capacity"
                name="capacity"
                required
                maxLength={2000}
                rows={3}
                defaultValue={application?.capacity ?? ""}
                aria-describedby="supplier-capacity-help"
              />
              <p id="supplier-capacity-help" className="text-xs text-muted-foreground">
                {t("suppliers.capacityHelp")}
              </p>
            </div>
            <SupplierNotice>{t("suppliers.credentialsNotice")}</SupplierNotice>
            {!readOnly && (
              <Button type="submit" disabled={mutation.isPending}>
                {mutation.isPending ? t("suppliers.saving") : submitLabel}
              </Button>
            )}
          </fieldset>
          {readOnly && <SupplierNotice>{t("suppliers.readOnly")}</SupplierNotice>}
          {mutation.isError && <SupplierError error={mutation.error} />}
          {mutation.isSuccess && <SupplierNotice>{t("suppliers.applicationSaved")}</SupplierNotice>}
        </form>
      </CardContent>
    </Card>
  );
}
