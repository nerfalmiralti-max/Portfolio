"use client";

import { useCallback, useEffect, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";

type DocumentWithTransitions = Document & {
  startViewTransition?: (callback: () => void | Promise<void>) => unknown;
};

/** Longest the outgoing page may stay frozen waiting for the next one. */
const HOLD_LIMIT = 420;

/**
 * Navigation that hands the project title from the index to the case study
 * cover, where the browser supports it.
 *
 * Strictly progressive: links stay real links, the default navigation happens
 * on every browser, and the transition is capped so a slow response can never
 * leave the page frozen. Reduced motion skips it entirely.
 */
export function useTransitionRouter() {
  const router = useRouter();
  const pathname = usePathname();
  const arrived = useRef<(() => void) | null>(null);

  useEffect(() => {
    arrived.current?.();
    arrived.current = null;
  }, [pathname]);

  return useCallback(
    (href: string) => {
      const doc = document as DocumentWithTransitions;
      const calm =
        typeof matchMedia === "function" &&
        matchMedia("(prefers-reduced-motion: reduce)").matches;

      if (calm || typeof doc.startViewTransition !== "function") {
        router.push(href);
        return;
      }

      doc.startViewTransition(() => {
        const navigated = new Promise<void>((resolve) => {
          arrived.current = resolve;
        });
        const capped = new Promise<void>((resolve) =>
          setTimeout(resolve, HOLD_LIMIT),
        );
        router.push(href);
        return Promise.race([navigated, capped]);
      });
    },
    [router],
  );
}

/** True for a click the browser should handle itself (new tab, download, …). */
export function isModifiedClick(event: React.MouseEvent) {
  return (
    event.defaultPrevented ||
    event.metaKey ||
    event.ctrlKey ||
    event.shiftKey ||
    event.altKey ||
    event.button !== 0
  );
}
