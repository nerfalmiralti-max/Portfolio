"use client";

import { useEffect, useState, type RefObject } from "react";

type Options = {
  /** Fires once and stops observing. Entrances should not replay on scroll-up. */
  once?: boolean;
  rootMargin?: string;
  threshold?: number | number[];
};

/**
 * One IntersectionObserver primitive for every scroll-driven state on the
 * site.
 *
 * If the observer is unavailable, this leaves motion mode altogether rather
 * than reporting a state it cannot verify — the same escape hatch the reveal
 * primitive uses. Dropping `data-motion` stops every hidden-state rule from
 * applying, so nothing can be stranded invisible.
 */
export function useInView(
  ref: RefObject<Element | null>,
  { once = true, rootMargin = "0px 0px -12%", threshold = 0.2 }: Options = {},
) {
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    if (typeof IntersectionObserver !== "function") {
      document.documentElement.dataset.motion = "off";
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          if (once) observer.disconnect();
        } else if (!once) {
          setInView(false);
        }
      },
      { rootMargin, threshold },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [ref, once, rootMargin, threshold]);

  return inView;
}

/**
 * Which of a set of elements is currently closest to the reading line — the
 * primitive behind the process track and the touch behaviour of the project
 * index. One observer for the whole group, not one listener per scroll event.
 */
export function useActiveIndex(
  refs: RefObject<(HTMLElement | null)[]>,
  count: number,
  { rootMargin = "-45% 0px -45% 0px" }: { rootMargin?: string } = {},
) {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const elements = (refs.current ?? []).filter(Boolean) as HTMLElement[];
    if (elements.length === 0) return;
    if (typeof IntersectionObserver !== "function") return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const index = elements.indexOf(entry.target as HTMLElement);
          if (index >= 0) setActive(index);
        });
      },
      { rootMargin, threshold: 0 },
    );

    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, [refs, count, rootMargin]);

  return active;
}
