import type { Metadata } from "next";
import { BRAND_LOGO_PATH, BRAND_NAME, BRAND_SLOGAN } from "@/lib/brand";
import { uiHref } from "@/utils/uiHref";
import { Inter } from "next/font/google";
import "./globals.css";

import { NuqsAdapter } from "nuqs/adapters/next/app";
import { ThemeProvider } from "next-themes";

import { AuthProvider } from "@/contexts/AuthContext";
import ReactQueryProvider from "@/contexts/ReactQueryProvider";
import HotkeysProvider from "@/contexts/HotkeysProvider";
import { TerminologyProvider } from "@/contexts/TerminologyContext";
import { Toaster } from "@/components/ui/sonner";
import I18nProvider from "@/i18n/I18nProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: BRAND_NAME,
  description: BRAND_SLOGAN,
  icons: { icon: { url: uiHref(BRAND_LOGO_PATH), type: "image/svg+xml" } },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // next-themes stamps the theme class on <html> before paint, which the exported markup
    // cannot predict; suppressHydrationWarning confines that mismatch to this element.
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <I18nProvider>
            <NuqsAdapter>
              <ReactQueryProvider>
                <TerminologyProvider>
                  <HotkeysProvider>
                    <AuthProvider>{children}</AuthProvider>
                  </HotkeysProvider>
                </TerminologyProvider>
                <Toaster />
              </ReactQueryProvider>
            </NuqsAdapter>
          </I18nProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
