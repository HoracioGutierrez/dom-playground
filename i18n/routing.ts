import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["en", "es", "pt", "de", "ru"],
  defaultLocale: "en",
});
