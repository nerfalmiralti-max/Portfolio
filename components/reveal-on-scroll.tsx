"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * Reveals `[data-reveal]` elements as they enter the viewport.
 *
 * The hidden state lives behind `html[data-motion="on"]`, set by an inline
 * script before first paint (see `app/layout.tsx`). That single attribute is
 * also the escape hatch: dropping it makes every hidden-state rule stop
 * applying, so content becomes plainly visible with no transition involved.
 *
 * That matters because transitions and animations do not advance in a
 * backgrounded tab. Adding a class there would leave content stuck at
 * `opacity: 0`, so instead we leave motion mode altogether whenever we cannot
 * be sure an animation will actually run.
 */
export function RevealOnScroll() {
  const pathname = usePathname();

  useEffect(() => {
    const root = document.documentElement;
    // "off" cancels in-flight transitions too, which removing the attribute
    // outright would not.
    const disableMotion = () => {
      root.dataset.motion = "off";
    };

    // Nothing is being painted, so nothing can animate. Show it all instead.
    if (document.visibilityState === "hidden") {
      disableMotion();
      return;
    }

    const targets = Array.from(
      document.querySelectorAll<HTMLElement>(
        "[data-reveal], [data-reveal-stagger], [data-reveal-sequence]",
      ),
    );
    if (targets.length === 0) return;

    if (typeof IntersectionObserver !== "function") {
      disableMotion();
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        });
      },
      { rootMargin: "0px 0px -8%", threshold: 0.05 },
    );

    targets.forEach((target) => {
      // Already on screen at load — reveal without waiting for a callback.
      if (target.getBoundingClientRect().top < window.innerHeight) {
        target.classList.add("is-visible");
        return;
      }
      observer.observe(target);
    });

    // If the tab is hidden before the reader reaches the rest of the page,
    // give up on animating it rather than risk leaving it invisible.
    const onHide = () => {
      if (document.visibilityState === "hidden") disableMotion();
    };
    document.addEventListener("visibilitychange", onHide);

    return () => {
      document.removeEventListener("visibilitychange", onHide);
      observer.disconnect();
    };
  }, [pathname]);

  return null;
}
