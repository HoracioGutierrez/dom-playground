import type { Metadata } from "next";
import { ThemeProvider } from "@/components/theme-prodiver";
import { GTProvider } from "gt-next";
import { getLocale } from "gt-next/server";
import Header from "@/components/layout/header";
import { RootLayoutProps } from "@/lib/types";
import "./globals.css";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default async function RootLayout({ children }: RootLayoutProps) {

  const locale = await getLocale();

  return (
    <html lang={locale} suppressHydrationWarning>
      <body className="bg-[linear-gradient(to_right,#80808033_1px,transparent_1px),linear-gradient(to_bottom,#80808033_1px,transparent_1px)] bg-[size:70px_70px] min-h-dvh flex flex-col">
        <GTProvider>
          <ThemeProvider attribute="class" disableTransitionOnChange>
            <Header />
            <main className="p-4 grow flex flex-col">
              {children}
            </main>
          </ThemeProvider>
        </GTProvider>
      </body>
    </html>
  );
}
