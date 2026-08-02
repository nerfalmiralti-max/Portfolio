"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function HomeMotion() {
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;
    gsap.registerPlugin(ScrollTrigger);
    const desktop = window.matchMedia("(min-width: 900px)").matches;
    const context = gsap.context(() => {
      gsap.timeline({ scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: .65 } })
        .to(".hero-copy", { yPercent: -15, opacity: .35, ease: "none" }, 0)
        .to(".orbit-system", { yPercent: 30, scale: .72, rotate: 5, ease: "none" }, 0)
        .to(".node-99", { xPercent: -95, yPercent: 50, ease: "none" }, 0)
        .to(".node-mangystau", { xPercent: 65, yPercent: -40, ease: "none" }, 0)
        .to(".node-kronos", { xPercent: 50, yPercent: 90, ease: "none" }, 0);

      if (desktop) {
        gsap.fromTo(".statement-section blockquote", { xPercent: 6 }, { xPercent: -2, ease: "none", scrollTrigger: { trigger: ".statement-section", start: "top bottom", end: "bottom top", scrub: true } });
      }
      gsap.fromTo(".philosophy-verb", { yPercent: 80, opacity: 0 }, { yPercent: 0, opacity: 1, stagger: .09, ease: "power3.out", scrollTrigger: { trigger: ".philosophy-verbs", start: "top 78%", once: true } });
      gsap.fromTo(".capability-grid article", { y: 72, opacity: 0 }, { y: 0, opacity: 1, stagger: .1, ease: "power3.out", scrollTrigger: { trigger: ".capability-grid", start: "top 76%", once: true } });
      gsap.fromTo(".timeline-rail article", { x: 40, opacity: .25 }, { x: 0, opacity: 1, stagger: .08, ease: "power2.out", scrollTrigger: { trigger: ".timeline-rail", start: "top 75%", once: true } });
      gsap.fromTo(".discipline-visual .mat-line", { scaleX: .05 }, { scaleX: 1, stagger: .18, transformOrigin: "left center", ease: "power2.inOut", scrollTrigger: { trigger: ".discipline-section", start: "top 70%", once: true } });
      gsap.fromTo(".goal-field > div", { y: 45, opacity: 0 }, { y: 0, opacity: 1, stagger: .06, ease: "power2.out", scrollTrigger: { trigger: ".goal-field", start: "top 80%", once: true } });
      gsap.fromTo(".contact-cta h2", { backgroundPosition: "100% 0" }, { backgroundPosition: "0% 0", ease: "none", scrollTrigger: { trigger: ".contact-cta", start: "top bottom", end: "center center", scrub: true } });
    });

    const atmosphereSections = Array.from(document.querySelectorAll<HTMLElement>("[data-atmosphere]"));
    const observer = new IntersectionObserver((entries) => {
      const active = entries.find((entry) => entry.isIntersecting);
      if (active) document.documentElement.dataset.atmosphere = (active.target as HTMLElement).dataset.atmosphere || "default";
    }, { rootMargin: "-40% 0px -45%" });
    atmosphereSections.forEach((section) => observer.observe(section));
    return () => { observer.disconnect(); delete document.documentElement.dataset.atmosphere; context.revert(); };
  }, []);
  return null;
}
