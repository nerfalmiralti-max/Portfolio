"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { navigation } from "@/content/navigation";

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLElement>(null);

  /**
   * One indicator travels between navigation items instead of each item
   * drawing its own underline. Position is written as two custom properties on
   * the nav, so the movement is a single transform on a single element.
   */
  const placeIndicator = useCallback(() => {
    const nav = navRef.current;
    if (!nav) return;
    const current = nav.querySelector<HTMLElement>('a[aria-current="page"]');
    if (!current) {
      nav.dataset.indicator = "off";
      return;
    }
    const navBox = nav.getBoundingClientRect();
    const box = current.getBoundingClientRect();
    nav.dataset.indicator = "on";
    nav.style.setProperty("--nav-x", `${box.left - navBox.left}px`);
    nav.style.setProperty("--nav-w", `${box.width}px`);
  }, []);

  useEffect(() => {
    placeIndicator();
    window.addEventListener("resize", placeIndicator);
    return () => window.removeEventListener("resize", placeIndicator);
  }, [placeIndicator, pathname]);

  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const focusable = Array.from(
      menuRef.current?.querySelectorAll<HTMLElement>("a, button") ?? [],
    );
    focusable[0]?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        setOpen(false);
        menuButtonRef.current?.focus();
        return;
      }

      if (event.key !== "Tab" || focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [open]);

  const close = () => setOpen(false);

  const isCurrent = (href: string) =>
    pathname === href || pathname.startsWith(`${href}/`);

  return (
    <header className="site-header">
      <div className="header-inner shell">
        <Link href="/" className="brand" onClick={close}>
          <span className="monogram" aria-hidden="true">
            AT
          </span>
          <span className="brand-name">Altair Tolesh</span>
        </Link>

        <nav className="desktop-nav" aria-label="Primary" ref={navRef}>
          <span className="nav-indicator" aria-hidden="true" />
          {navigation.map((item) => (
            <Link
              href={item.href}
              aria-current={isCurrent(item.href) ? "page" : undefined}
              key={item.href}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <Link href="/contact" className="header-cta">
          Start a project
        </Link>

        <button
          className="menu-button"
          type="button"
          ref={menuButtonRef}
          onClick={() => setOpen((current) => !current)}
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Close navigation" : "Open navigation"}
        >
          {open ? <X size={18} aria-hidden="true" /> : <Menu size={18} aria-hidden="true" />}
        </button>
      </div>

      <div
        id="mobile-menu"
        ref={menuRef}
        className="mobile-menu"
        data-open={open}
        inert={!open ? true : undefined}
      >
        <div className="mobile-menu-inner shell">
          {navigation.map((item, index) => (
            <Link
              href={item.href}
              key={item.href}
              onClick={close}
              aria-current={isCurrent(item.href) ? "page" : undefined}
            >
              <span>{String(index + 1).padStart(2, "0")}</span>
              {item.label}
            </Link>
          ))}
          <Link
            href="/contact"
            className="button button-primary mobile-menu-cta"
            onClick={close}
          >
            Start a project
          </Link>
        </div>
      </div>
    </header>
  );
}
