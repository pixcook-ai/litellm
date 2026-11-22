"use client";

import { useTranslation } from "react-i18next";
import useAuthorized from "@/app/(dashboard)/hooks/useAuthorized";
import { SupplierPortal } from "@/components/suppliers/SupplierPortal";

export default function SuppliersPage() {
  const { t } = useTranslation();
  const { accessToken, userId, userRole, isViewOnly, isLoading, isAuthorized } = useAuthorized();
  const waitingForAuth = isLoading || !isAuthorized;
  if (waitingForAuth || !accessToken || !userId)
    return (
      <p role="status" className="p-6 text-sm text-muted-foreground">
        {t("suppliers.loading")}
      </p>
    );
  return <SupplierPortal accessToken={accessToken} userId={userId} userRole={userRole} isViewOnly={isViewOnly} />;
}
