"use client";

import { useLanguage } from "@/components/language-provider";
import type { Locale } from "@/content/site";

export function LanguageSwitcher() {
  const { locale, setLocale, copy } = useLanguage();

  return (
    <label className="language-switcher">
      <span className="sr-only">{copy.language}</span>
      <select value={locale} onChange={(event) => setLocale(event.target.value as Locale)} aria-label={copy.language}>
        <option value="en">EN</option>
        <option value="ru">RU</option>
        <option value="kk">KZ</option>
      </select>
    </label>
  );
}
