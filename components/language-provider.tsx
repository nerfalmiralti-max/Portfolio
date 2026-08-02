"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { translations, type Locale } from "@/content/site";

type Dictionary = (typeof translations)[Locale];
type LanguageContextValue = { locale: Locale; copy: Dictionary; setLocale: (locale: Locale) => void };

const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("en");

  useEffect(() => {
    const saved = window.localStorage.getItem("altair-locale") as Locale | null;
    if (saved && saved in translations) {
      const frame = window.requestAnimationFrame(() => setLocaleState(saved));
      return () => window.cancelAnimationFrame(frame);
    }
  }, []);

  const setLocale = (next: Locale) => {
    setLocaleState(next);
    window.localStorage.setItem("altair-locale", next);
    document.documentElement.lang = next;
  };

  const value = useMemo(() => ({ locale, copy: translations[locale], setLocale }), [locale]);
  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const value = useContext(LanguageContext);
  if (!value) throw new Error("useLanguage must be used inside LanguageProvider");
  return value;
}
