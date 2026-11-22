"use client";

import Link from "next/link";
import { Check, Server, ShieldCheck, Wallet } from "lucide-react";
import { useTranslation } from "react-i18next";
import { buttonVariants } from "@/components/ui/button";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { uiHref } from "@/utils/uiHref";

export default function SupplierApplicationPage() {
  const { t } = useTranslation();
  const steps = [
    { title: "landingStep1", body: "landingStep1Body", Icon: Server },
    { title: "landingStep2", body: "landingStep2Body", Icon: ShieldCheck },
    { title: "landingStep3", body: "landingStep3Body", Icon: Wallet },
  ] as const;
  const requirements = ["landingRequirement1", "landingRequirement2", "landingRequirement3"] as const;
  return (
    <ThemeProvider>
      <main className="min-h-screen bg-background text-foreground">
        <div className="mx-auto max-w-6xl px-5 py-8 sm:px-8 sm:py-12">
          <nav
            aria-label={t("suppliers.title")}
            className="mb-16 flex items-center justify-between gap-4 border-b pb-5"
          >
            <span className="flex items-center gap-2 text-sm font-medium">
              <Server className="size-4" aria-hidden="true" />
              {t("suppliers.title")}
            </span>
            <Link href={uiHref("suppliers")} className="text-sm underline underline-offset-4">
              {t("suppliers.landingOpen")}
            </Link>
          </nav>
          <section className="grid gap-12 pb-16 lg:grid-cols-[1.3fr_1fr]">
            <div className="space-y-6">
              <p className="text-xs font-semibold tracking-[0.16em] text-muted-foreground">
                {t("suppliers.landingEyebrow")}
              </p>
              <h1 className="max-w-2xl text-4xl font-semibold tracking-tight sm:text-5xl">
                {t("suppliers.landingTitle")}
              </h1>
              <p className="max-w-xl text-lg leading-relaxed text-muted-foreground">
                {t("suppliers.landingDescription")}
              </p>
              <Link href={uiHref("suppliers")} className={buttonVariants({ size: "lg" })}>
                {t("suppliers.landingApply")}
              </Link>
            </div>
            <aside className="rounded-xl border bg-muted/30 p-6">
              <h2 className="mb-5 font-semibold">{t("suppliers.landingRequirements")}</h2>
              <ul className="space-y-5">
                {requirements.map((key) => (
                  <li key={key} className="flex items-start gap-3 text-sm leading-relaxed text-muted-foreground">
                    <Check className="mt-0.5 size-4 shrink-0 text-foreground" aria-hidden="true" />
                    <span>{t(`suppliers.${key}`)}</span>
                  </li>
                ))}
              </ul>
            </aside>
          </section>
          <section className="grid gap-8 border-t py-12 md:grid-cols-3">
            {steps.map(({ title, body, Icon }, index) => (
              <article key={title} className="space-y-4">
                <div className="flex items-center justify-between">
                  <Icon className="size-5 text-muted-foreground" aria-hidden="true" />
                  <span className="font-mono text-xs text-muted-foreground">{String(index + 1).padStart(2, "0")}</span>
                </div>
                <h2 className="font-semibold">{t(`suppliers.${title}`)}</h2>
                <p className="text-sm leading-relaxed text-muted-foreground">{t(`suppliers.${body}`)}</p>
              </article>
            ))}
          </section>
          <p className="border-t pt-6 text-xs leading-relaxed text-muted-foreground">
            {t("suppliers.credentialsNotice")}
          </p>
        </div>
      </main>
    </ThemeProvider>
  );
}
