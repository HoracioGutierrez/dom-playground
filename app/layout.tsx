import type { Metadata } from "next";
import { getLocale } from "gt-next/server";
import { GTProvider } from "gt-next";

import { ThemeProvider } from "@/components/theme-prodiver";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";

import type { RootLayoutProps } from "@/lib/types";

import "./globals.css";

export const metadata: Metadata = {
  title: "DOM Playground",
  description:
    "Drag and drop HTML tags to the left into the dropzone to the right.",
};

export default async function RootLayout({ children }: RootLayoutProps) {
  const locale = await getLocale();

  const bodyClasses =
    "bg-[linear-gradient(to_right,#80808033_1px,transparent_1px),linear-gradient(to_bottom,#80808033_1px,transparent_1px)] bg-[size:70px_70px] min-h-dvh flex flex-col";

  const mainClasses = "p-4 grow flex flex-col";

  return (
    <html lang={locale} suppressHydrationWarning>
      <body className={bodyClasses}>
        <GTProvider>
          <ThemeProvider attribute="class" disableTransitionOnChange>
            <Header />
            <main className={mainClasses}>{children}</main>
            <Footer />
          </ThemeProvider>
        </GTProvider>
      </body>
    </html>
  );
}
