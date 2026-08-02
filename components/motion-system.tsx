"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

const INTRO_KEY = "altair-motion-intro-v1";

function routeKind(pathname: string) {
  if (pathname === "/") return "home";
  if (pathname === "/work") return "work";
  if (pathname.includes("99-aktau")) return "booking";
  if (pathname.includes("tuesday-lounge-bar")) return "tuesday";
  if (pathname.includes("mangystau-trials")) return "mangystau";
  if (pathname.startsWith("/about")) return "about";
  if (pathname.startsWith("/process")) return "process";
  if (pathname.startsWith("/journey")) return "journey";
  if (pathname.startsWith("/contact")) return "contact";
  return "default";
}

export function MotionSystem() {
  const pathname = usePathname();
  const firstRoute = useRef(true);
  const introRef = useRef<HTMLDivElement>(null);
  const routeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = document.documentElement;
    const introLayer = introRef.current;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    root.classList.add("motion-ready");

    let introTimer: ReturnType<typeof setTimeout> | undefined;
    try {
      const hasSeenIntro = sessionStorage.getItem(INTRO_KEY) === "seen";
      if (!reduced.matches && !hasSeenIntro) {
        sessionStorage.setItem(INTRO_KEY, "seen");
        root.classList.add("intro-running");
        introLayer?.classList.add("is-active");
        introTimer = setTimeout(() => {
          root.classList.remove("intro-running");
          introLayer?.classList.remove("is-active");
        }, 1180);
      }
    } catch {
      // Session storage can be unavailable in privacy-restricted contexts.
    }

    const revealTargets = document.querySelectorAll<HTMLElement>("[data-motion]");
    let revealObserver: IntersectionObserver | null = null;
    if (typeof window.IntersectionObserver === "function") {
      revealObserver = new IntersectionObserver(
        (entries, observer) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            entry.target.classList.add("is-inview");
            if (entry.target.getAttribute("data-motion-repeat") !== "true") {
              observer.unobserve(entry.target);
            }
          });
        },
        { rootMargin: "0px 0px -10%", threshold: 0.12 },
      );
      revealTargets.forEach((target) => revealObserver?.observe(target));
    } else {
      revealTargets.forEach((target) => target.classList.add("is-inview"));
    }

    const journeyItems = Array.from(
      document.querySelectorAll<HTMLElement>("[data-journey-milestone]"),
    );
    let journeyObserver: IntersectionObserver | null = null;
    if (typeof window.IntersectionObserver === "function") {
      journeyObserver = new IntersectionObserver(
        (entries) => {
          const nearest = entries
            .filter((entry) => entry.isIntersecting)
            .sort(
              (a, b) =>
                Math.abs(a.boundingClientRect.top - window.innerHeight * 0.48) -
                Math.abs(b.boundingClientRect.top - window.innerHeight * 0.48),
            )[0];
          if (!nearest) return;
          journeyItems.forEach((item) => item.classList.remove("is-current"));
          nearest.target.classList.add("is-current", "is-inview");
        },
        { rootMargin: "-34% 0px -34%", threshold: [0, 0.4, 0.8] },
      );
      journeyItems.forEach((item) => journeyObserver?.observe(item));
    } else {
      journeyItems[0]?.classList.add("is-current");
    }

    const onVisibilityChange = () =>
      root.classList.toggle("tab-hidden", document.visibilityState === "hidden");
    const onScroll = () => root.classList.toggle("page-scrolled", window.scrollY > 56);
    document.addEventListener("visibilitychange", onVisibilityChange);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    return () => {
      if (introTimer) clearTimeout(introTimer);
      introLayer?.classList.remove("is-active");
      root.classList.remove("intro-running", "tab-hidden");
      revealObserver?.disconnect();
      journeyObserver?.disconnect();
      document.removeEventListener("visibilitychange", onVisibilityChange);
      window.removeEventListener("scroll", onScroll);
    };
  }, [pathname]);

  useEffect(() => {
    if (firstRoute.current) {
      firstRoute.current = false;
      return;
    }

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const layer = routeRef.current;
    layer?.classList.add("is-active");
    const timer = setTimeout(() => layer?.classList.remove("is-active"), 500);
    return () => clearTimeout(timer);
  }, [pathname]);

  const kind = routeKind(pathname);

  return (
    <>
      <div
        ref={introRef}
        className="opening-sequence"
        aria-hidden="true"
      >
        <svg viewBox="0 0 1200 160" preserveAspectRatio="none">
          <path d="M36 98 C250 20 460 142 670 76 S986 42 1128 78" />
          <circle cx="36" cy="98" r="5" />
          <g className="opening-mark opening-mark-a">
            <circle cx="330" cy="70" r="7" />
            <text x="346" y="75">99 AKTAU</text>
          </g>
          <g className="opening-mark opening-mark-b">
            <circle cx="650" cy="82" r="7" />
            <text x="666" y="87">TUESDAY</text>
          </g>
          <g className="opening-mark opening-mark-c">
            <circle cx="936" cy="52" r="7" />
            <text x="952" y="57">MANGYSTAU TRIALS</text>
          </g>
        </svg>
        <span className="opening-monogram">AT</span>
      </div>

      <div
        ref={routeRef}
        className={`route-transition route-${kind}`}
        aria-hidden="true"
      >
        <div className="route-transition-line" />
        <div className="route-transition-labels">
          <span>99 AKTAU</span>
          <span>TUESDAY</span>
          <span>MANGYSTAU</span>
        </div>
        <span className="route-transition-mark">AT</span>
      </div>
    </>
  );
}
