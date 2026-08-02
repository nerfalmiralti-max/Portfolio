"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Menu, Moon, Sun, X } from "lucide-react";
import { LanguageSwitcher } from "@/components/language-switcher";
import { useLanguage } from "@/components/language-provider";

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [light, setLight] = useState(false);
  const { copy } = useLanguage();
  const navigation = [
    { label: copy.nav.work, href: "/projects" },
    { label: copy.nav.about, href: "/about" },
    { label: copy.nav.journey, href: "/journey" },
    { label: copy.nav.contact, href: "/contact" },
  ];

  useEffect(() => {
    const stored = window.localStorage.getItem("altair-theme");
    const nextLight = stored === "light";
    document.documentElement.dataset.theme = nextLight ? "light" : "dark";
    const frame = window.requestAnimationFrame(() => setLight(nextLight));
    return () => window.cancelAnimationFrame(frame);
  }, []);

  const toggleTheme = () => {
    const next = !light;
    setLight(next);
    document.documentElement.dataset.theme = next ? "light" : "dark";
    window.localStorage.setItem("altair-theme", next ? "light" : "dark");
  };

  return (
    <header className="site-header">
      <div className="header-inner">
        <Link href="/" className="brand" aria-label="Altair Tolesh home">
          <span className="monogram" aria-hidden="true"><i>A</i><i>T</i></span>
          <span className="brand-name">ALTAIR TOLESH</span>
        </Link>
        <nav className="desktop-nav" aria-label="Primary navigation">
          {navigation.map((item) => <Link href={item.href} key={item.href}>{item.label}</Link>)}
        </nav>
        <div className="header-actions">
          <span className="build-status"><i />{copy.status}</span>
          <LanguageSwitcher />
          <button className="icon-button" type="button" onClick={toggleTheme} aria-label={copy.theme}>
            {light ? <Moon aria-hidden="true" size={17} /> : <Sun aria-hidden="true" size={17} />}
          </button>
          <Link href="/contact" className="header-contact">{copy.nav.contact}</Link>
          <button className="menu-button" type="button" onClick={() => setOpen(!open)} aria-expanded={open} aria-controls="mobile-menu" aria-label={open ? copy.close : copy.menu}>
            {open ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
          </button>
        </div>
      </div>
      <div id="mobile-menu" className={`mobile-menu ${open ? "is-open" : ""}`} aria-hidden={!open}>
        <div className="mobile-menu-inner">
          <span className="overline">{copy.status}</span>
          {navigation.map((item, index) => (
            <Link href={item.href} key={item.href} onClick={() => setOpen(false)}>
              <span>0{index + 1}</span>{item.label}
            </Link>
          ))}
          <div className="mobile-menu-meta"><span>43.6411° N</span><span>51.1985° E</span></div>
        </div>
      </div>
    </header>
  );
}
