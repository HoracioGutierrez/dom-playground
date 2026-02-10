import type { Metadata } from "next";
import { getLocale, getMessages } from "next-intl/server";
import { NextIntlClientProvider } from "next-intl";

import { ThemeProvider } from "@/components/theme-prodiver";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";

import type { RootLayoutProps } from "@/lib/types";

import "./globals.css";
import { Toaster } from "sonner";

export const metadata: Metadata = {
  title: "DOM Playground",
  description:
    "Drag and drop HTML tags to the left into the dropzone to the right.",
};

export default async function RootLayout({ children }: RootLayoutProps) {
  const locale = await getLocale();
  const messages = await getMessages();

  const bodyClasses =
    "bg-[linear-gradient(to_right,#80808033_1px,transparent_1px),linear-gradient(to_bottom,#80808033_1px,transparent_1px)] bg-[size:70px_70px] min-h-dvh flex flex-col";

  const mainClasses = "p-4 grow flex flex-col";

  return (
    <html lang={locale} suppressHydrationWarning>
      <body className={bodyClasses}>
        <NextIntlClientProvider messages={messages} locale={locale}>
          <ThemeProvider attribute="class" disableTransitionOnChange>
            <Header />
            <main className={mainClasses}>{children}</main>
            <Footer />
            <Toaster className="bg-main" />
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
