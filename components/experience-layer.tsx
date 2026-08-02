"use client";

import { AnimatePresence, motion } from "framer-motion";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import Lenis from "@studio-freight/lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

type RouteTransition = { active: boolean; label: string; accent: string };

const routeAccent = (href: string) => {
  if (href.includes("99-aktau")) return "#7567ff";
  if (href.includes("mangystau")) return "#4bc6c8";
  if (href.includes("kronos")) return "#d5ff67";
  return "#7567ff";
};

export function ExperienceLayer() {
  const pathname = usePathname();
  const router = useRouter();
  const [intro, setIntro] = useState<"checking" | "visible" | "hidden">("checking");
  const [transition, setTransition] = useState<RouteTransition>({ active: false, label: "", accent: "#7567ff" });
  const [coordinateSignal, setCoordinateSignal] = useState(false);
  const cursorRef = useRef<HTMLDivElement>(null);
  const cursorDotRef = useRef<HTMLDivElement>(null);
  const routeTimer = useRef<number | null>(null);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const seen = window.sessionStorage.getItem("altair-intro-seen") === "true";
    const frame = window.requestAnimationFrame(() => setIntro(reduced || seen ? "hidden" : "visible"));
    let timer: number | undefined;
    if (!reduced && !seen) {
      window.sessionStorage.setItem("altair-intro-seen", "true");
      timer = window.setTimeout(() => setIntro("hidden"), 2200);
    }
    return () => { window.cancelAnimationFrame(frame); if (timer) window.clearTimeout(timer); };
  }, []);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;
    const lenis = new Lenis({ duration: 1.05, smoothWheel: true, syncTouch: false });
    let frame = 0;
    const raf = (time: number) => { lenis.raf(time); frame = window.requestAnimationFrame(raf); };
    frame = window.requestAnimationFrame(raf);
    const visibility = () => document.hidden ? lenis.stop() : lenis.start();
    document.addEventListener("visibilitychange", visibility);
    return () => { window.cancelAnimationFrame(frame); document.removeEventListener("visibilitychange", visibility); lenis.destroy(); };
  }, []);

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduced) return;
    let pointerX = -100;
    let pointerY = -100;
    let ringX = -100;
    let ringY = -100;
    let frame = 0;
    const move = (event: PointerEvent) => {
      pointerX = event.clientX;
      pointerY = event.clientY;
      if (cursorDotRef.current) cursorDotRef.current.style.transform = `translate3d(${pointerX}px, ${pointerY}px, 0)`;
      const target = (event.target as Element | null)?.closest<HTMLElement>("[data-cursor], a, button");
      const label = target?.dataset.cursor || (target?.matches("a,button") ? "LINK" : "");
      cursorRef.current?.setAttribute("data-label", label);
      cursorRef.current?.classList.toggle("is-active", Boolean(label));
    };
    const render = () => {
      ringX += (pointerX - ringX) * 0.16;
      ringY += (pointerY - ringY) * 0.16;
      if (cursorRef.current) cursorRef.current.style.transform = `translate3d(${ringX}px, ${ringY}px, 0)`;
      frame = window.requestAnimationFrame(render);
    };
    window.addEventListener("pointermove", move, { passive: true });
    frame = window.requestAnimationFrame(render);
    document.documentElement.classList.add("has-custom-cursor");
    return () => { window.removeEventListener("pointermove", move); window.cancelAnimationFrame(frame); document.documentElement.classList.remove("has-custom-cursor"); };
  }, []);

  useEffect(() => {
    let typed = "";
    let clearTimer: number | undefined;
    const keys = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement;
      if (target.matches("input, textarea, select, [contenteditable='true']") || event.metaKey || event.ctrlKey || event.altKey) return;
      const key = event.key.toLowerCase();
      if (key === "j") router.push("/journey");
      if (key === "p") router.push("/projects");
      if (key === "c") router.push("/contact");
      if (event.key.length === 1) {
        typed = `${typed}${event.key.toUpperCase()}`.slice(-5);
        if (typed === "AKTAU") {
          setCoordinateSignal(true);
          clearTimer = window.setTimeout(() => setCoordinateSignal(false), 2200);
        }
      }
    };
    window.addEventListener("keydown", keys);
    console.info("AT / BUILD NOTE: Curiosity is part of the interface. Try P, J, C — or type AKTAU.");
    return () => { window.removeEventListener("keydown", keys); if (clearTimer) window.clearTimeout(clearTimer); };
  }, [router]);

  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      const anchor = (event.target as Element | null)?.closest<HTMLAnchorElement>("a[href]");
      if (!anchor) return;
      const url = new URL(anchor.href, window.location.href);
      if (url.origin !== window.location.origin || url.hash || url.pathname === window.location.pathname || anchor.target === "_blank") return;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      event.preventDefault();
      const label = anchor.dataset.transitionLabel || anchor.textContent?.trim().slice(0, 28) || "OPEN";
      setTransition({ active: true, label, accent: anchor.dataset.routeAccent || routeAccent(url.pathname) });
      routeTimer.current = window.setTimeout(() => router.push(`${url.pathname}${url.search}`), 360);
    };
    document.addEventListener("click", onClick);
    return () => { document.removeEventListener("click", onClick); if (routeTimer.current) window.clearTimeout(routeTimer.current); };
  }, [router]);

  useEffect(() => {
    const timer = window.setTimeout(() => setTransition((current) => ({ ...current, active: false })), 360);
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!reduced) {
      gsap.registerPlugin(ScrollTrigger);
      const context = gsap.context(() => {
        gsap.fromTo(".page-hero h1, .case-heading h1", { y: 55, clipPath: "inset(0 0 100% 0)" }, { y: 0, clipPath: "inset(0 0 0% 0)", duration: .95, ease: "power3.out", stagger: .05 });
        gsap.utils.toArray<HTMLElement>(".case-section").forEach((section) => {
          gsap.fromTo(section.querySelectorAll("h2, p"), { y: 34, opacity: 0 }, { y: 0, opacity: 1, duration: .72, stagger: .08, ease: "power2.out", scrollTrigger: { trigger: section, start: "top 78%", once: true } });
        });
      });
      return () => { window.clearTimeout(timer); context.revert(); };
    }
    return () => window.clearTimeout(timer);
  }, [pathname]);

  return (
    <>
      <div className="ambient-system" aria-hidden="true"><i /><i /><i /></div>
      <div ref={cursorDotRef} className="cursor-dot" aria-hidden="true" />
      <div ref={cursorRef} className="cursor-ring" aria-hidden="true"><span /></div>
      <AnimatePresence>
        {intro !== "hidden" ? (
          <motion.div className="intro-sequence" initial={{ opacity: 1 }} exit={{ opacity: 0, transition: { duration: .45 } }}>
            <button type="button" onClick={() => setIntro("hidden")}>Skip intro</button>
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: .15, duration: .4 }}>43.6411° N — 51.1985° E</motion.p>
            <div className="intro-map-lines" aria-hidden="true"><i /><i /><i /></div>
            <div className="intro-mark" aria-label="AT"><motion.span initial={{ x: -48, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: .5, duration: .55 }}>A</motion.span><motion.span initial={{ x: 48, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: .5, duration: .55 }}>T</motion.span></div>
            <motion.small initial={{ opacity: 0, letterSpacing: ".5em" }} animate={{ opacity: 1, letterSpacing: ".18em" }} transition={{ delay: 1.2, duration: .6 }}>ALTAIR TOLESH / AKTAU</motion.small>
          </motion.div>
        ) : null}
      </AnimatePresence>
      <AnimatePresence>
        {transition.active ? <motion.div className="route-transition" style={{ "--wipe-accent": transition.accent } as React.CSSProperties} initial={{ clipPath: "circle(0% at 50% 50%)" }} animate={{ clipPath: "circle(150% at 50% 50%)" }} exit={{ opacity: 0 }} transition={{ duration: .42, ease: [0.76, 0, 0.24, 1] }}><span>{transition.label}</span><i>AT</i></motion.div> : null}
      </AnimatePresence>
      <AnimatePresence>
        {coordinateSignal ? <motion.div className="coordinate-signal" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}><span>AKTAU SIGNAL</span><strong>43.6411° N — 51.1985° E</strong><i /></motion.div> : null}
      </AnimatePresence>
    </>
  );
}
