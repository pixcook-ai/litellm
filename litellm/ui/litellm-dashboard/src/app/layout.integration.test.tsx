import { act, cleanup, render, within } from "@testing-library/react";
import type { ReactNode } from "react";
import { hydrateRoot } from "react-dom/client";
import { renderToString } from "react-dom/server";
import { afterEach, describe, expect, it, vi } from "vitest";
import RootLayout from "./layout";

const { passthrough } = vi.hoisted(() => ({
  passthrough: ({ children }: { children: ReactNode }) => children,
}));

vi.mock("next/font/google", () => ({ Inter: () => ({ className: "inter" }) }));
vi.mock("./globals.css", () => ({}));
vi.mock("nuqs/adapters/next/app", () => ({ NuqsAdapter: passthrough }));
vi.mock("@/contexts/AuthContext", () => ({ AuthProvider: passthrough }));
vi.mock("@/contexts/ReactQueryProvider", () => ({ default: passthrough }));
vi.mock("@/contexts/HotkeysProvider", () => ({ default: passthrough }));
vi.mock("@/contexts/TerminologyContext", () => ({ TerminologyProvider: passthrough }));
vi.mock("@/components/ui/sonner", () => ({ Toaster: () => null }));

afterEach(() => {
  cleanup();
  localStorage.clear();
  document.documentElement.classList.remove("dark", "light");
  vi.unstubAllGlobals();
});

describe("root layout theme", () => {
  it("preserves the server theme script while hydrating a saved language", async () => {
    localStorage.setItem("litellm_language", "zh-CN");
    localStorage.setItem("theme", "dark");
    const app = (
      <RootLayout>
        <main>Localized dashboard</main>
      </RootLayout>
    );
    document.documentElement.innerHTML = renderToString(app).replace(/^<html[^>]*>|<\/html>$/g, "");
    // eslint-disable-next-line testing-library/no-node-access -- The hydration script has no accessible role or label.
    const script = document.querySelector("script");
    expect(script).not.toBeNull();
    const root = await act(async () => hydrateRoot(document, app));
    try {
      await act(async () => {
        await vi.waitFor(() => expect(document.documentElement.lang).toBe("zh-CN"));
      });
      expect(await within(document.body).findByText("Localized dashboard")).toBeInTheDocument();
      expect(script).toBeInTheDocument();
      expect(document.documentElement).toHaveClass("dark");
      expect(document.documentElement.lang).toBe("zh-CN");
    } finally {
      await act(async () => root.unmount());
    }
  });

  it.each([
    { systemDark: true, saved: null, expected: "dark" },
    { systemDark: false, saved: null, expected: "light" },
    { systemDark: true, saved: "light", expected: "light" },
    { systemDark: false, saved: "dark", expected: "dark" },
    { systemDark: true, saved: "system", expected: "dark" },
  ])("uses $expected when systemDark=$systemDark and saved=$saved", ({ systemDark, saved, expected }) => {
    localStorage.clear();
    if (saved) localStorage.setItem("theme", saved);
    vi.stubGlobal(
      "matchMedia",
      vi.fn((query: string) => ({
        matches: query === "(prefers-color-scheme: dark)" && systemDark,
        media: query,
        onchange: null,
        addListener: vi.fn(),
        removeListener: vi.fn(),
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn(),
      })),
    );

    render(
      <RootLayout>
        <main>Login or dashboard</main>
      </RootLayout>,
      { container: document },
    );

    expect(document.documentElement).toHaveClass(expected);
    expect(localStorage.getItem("theme")).toBe(saved);
  });
});
