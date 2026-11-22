import type { ComponentProps, ReactNode } from "react";
import { useTranslation } from "react-i18next";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { extractProxyErrorMessage } from "@/lib/http/client";
import type { SupplierStatus } from "./types";

export function SupplierField({
  label,
  hint,
  ...props
}: ComponentProps<typeof Input> & { label: string; hint?: string }) {
  return (
    <div className="space-y-2">
      <Label htmlFor={props.id}>{label}</Label>
      <Input {...props} aria-describedby={hint ? `${props.id}-hint` : undefined} />
      {hint && (
        <p id={`${props.id}-hint`} className="text-xs text-muted-foreground">
          {hint}
        </p>
      )}
    </div>
  );
}

export function SupplierError({ error, retry }: { error: unknown; retry?: () => void }) {
  const { t } = useTranslation();
  return (
    <Alert variant="destructive">
      <AlertDescription className="flex flex-wrap items-center gap-3">
        <span>{extractProxyErrorMessage(error)}</span>
        {retry && (
          <Button type="button" variant="outline" size="sm" onClick={retry}>
            {t("suppliers.retry")}
          </Button>
        )}
      </AlertDescription>
    </Alert>
  );
}

export function SupplierNotice({ children }: { children: ReactNode }) {
  return (
    <p role="status" className="rounded-lg border bg-muted/40 p-4 text-sm text-muted-foreground">
      {children}
    </p>
  );
}

export function SupplierStatusBadge({ status }: { status: SupplierStatus }) {
  const { t } = useTranslation();
  const variants = { approved: "secondary", rejected: "destructive", pending: "outline" } as const;
  return <Badge variant={variants[status]}>{t(`suppliers.${status}`)}</Badge>;
}

export function SupplierPagination({
  offset,
  total,
  onChange,
}: {
  offset: number;
  total: number;
  onChange: (value: number) => void;
}) {
  const { t } = useTranslation();
  return (
    <div className="flex flex-wrap items-center justify-between gap-3 border-t pt-4 text-sm">
      <span className="text-muted-foreground">
        {t("suppliers.pageCount", { start: total ? offset + 1 : 0, end: Math.min(offset + 25, total), total })}
      </span>
      <div className="flex gap-2">
        <Button
          type="button"
          variant="outline"
          size="sm"
          disabled={offset === 0}
          onClick={() => onChange(Math.max(0, offset - 25))}
        >
          {t("suppliers.previous")}
        </Button>
        <Button
          type="button"
          variant="outline"
          size="sm"
          disabled={offset + 25 >= total}
          onClick={() => onChange(offset + 25)}
        >
          {t("suppliers.next")}
        </Button>
      </div>
    </div>
  );
}
