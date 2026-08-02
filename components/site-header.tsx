"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { navigation } from "@/content/navigation";

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

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

  const isCurrent = (href: string) =>
    href === "/"
      ? pathname === "/"
      : pathname === href || pathname.startsWith(`${href}/`);

  return (
    <header className="site-header">
      <div className="header-inner">
        <Link href="/" className="brand" aria-label="Altair Tolesh" onClick={() => setOpen(false)}>
          <span className="monogram" aria-hidden="true">
            <i>A</i>
            <i>T</i>
          </span>
          <span className="brand-name">ALTAIR TOLESH</span>
        </Link>

        <nav className="desktop-nav" aria-label="Primary navigation">
          {navigation.map((item) => {
            const current = isCurrent(item.href);
            return (
              <Link
                href={item.href}
                className={current ? "is-active" : ""}
                aria-current={current ? "page" : undefined}
                key={item.href}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="header-actions">
          <span className="build-status">
            <i /> Available for selected work
          </span>
          <Link href="/contact" className="header-contact">
            Discuss a project
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
            {open ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
          </button>
        </div>
      </div>

      <div
        id="mobile-menu"
        ref={menuRef}
        className={`mobile-menu ${open ? "is-open" : ""}`}
        aria-hidden={!open}
        inert={!open ? true : undefined}
      >
        <div className="mobile-menu-inner">
          <span className="overline">Navigate</span>
          {navigation.map((item, index) => (
            <Link
              href={item.href}
              key={item.href}
              onClick={() => setOpen(false)}
              aria-current={isCurrent(item.href) ? "page" : undefined}
            >
              <span>0{index + 1}</span>
              {item.label}
            </Link>
          ))}
          <div className="mobile-menu-meta">
            <span>43.6411° N</span>
            <span>51.1985° E</span>
          </div>
        </div>
      </div>
    </header>
  );
}
