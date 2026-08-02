"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { Menu, Moon, Sun, X } from "lucide-react";
import { LanguageSwitcher } from "@/components/language-switcher";
import { useLanguage } from "@/components/language-provider";

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [light, setLight] = useState(false);
  const logoClicks = useRef(0);
  const pathname = usePathname();
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
    const apply = () => {
      setLight(next);
      document.documentElement.dataset.theme = next ? "light" : "dark";
      window.localStorage.setItem("altair-theme", next ? "light" : "dark");
    };
    const viewTransitionDocument = document as Document & { startViewTransition?: (callback: () => void) => void };
    if (viewTransitionDocument.startViewTransition && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) viewTransitionDocument.startViewTransition(apply);
    else apply();
  };

  const logoClick = () => {
    logoClicks.current += 1;
    if (logoClicks.current >= 4) {
      window.dispatchEvent(new Event("altair:orbit-boost"));
      logoClicks.current = 0;
    }
  };

  return (
    <header className="site-header">
      <div className="header-inner">
        <Link href="/" className="brand" aria-label="Altair Tolesh home" onClick={logoClick} data-cursor="AT">
          <span className="monogram" aria-hidden="true"><i>A</i><i>T</i></span>
          <span className="brand-name">ALTAIR TOLESH</span>
        </Link>
        <nav className="desktop-nav" aria-label="Primary navigation">
          {navigation.map((item) => <Link href={item.href} className={pathname.startsWith(item.href) ? "is-active" : ""} aria-current={pathname.startsWith(item.href) ? "page" : undefined} data-cursor="NAV" key={item.href}>{item.label}</Link>)}
        </nav>
        <div className="header-actions">
          <span className="build-status"><i />{copy.status}</span>
          <LanguageSwitcher />
          <button className="icon-button theme-button" type="button" onClick={toggleTheme} aria-label={copy.theme} data-cursor="THEME">
            {light ? <Moon aria-hidden="true" size={17} /> : <Sun aria-hidden="true" size={17} />}
          </button>
          <Link href="/contact" className="header-contact" data-cursor="CONTACT">{copy.nav.contact}</Link>
          <button className="menu-button" type="button" onClick={() => setOpen(!open)} aria-expanded={open} aria-controls="mobile-menu" aria-label={open ? copy.close : copy.menu}>
            {open ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
          </button>
        </div>
      </div>
      <div id="mobile-menu" className={`mobile-menu ${open ? "is-open" : ""}`} aria-hidden={!open} inert={!open ? true : undefined}>
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
