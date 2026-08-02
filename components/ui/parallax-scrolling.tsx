"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function ParallaxComponent() {
  const parallaxRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const root = parallaxRef.current;
    if (!root || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    gsap.registerPlugin(ScrollTrigger);
    const layers = root.querySelectorAll<HTMLElement>("[data-parallax-layer]");
    const tweens = Array.from(layers).map((layer, index) => gsap.to(layer, {
      yPercent: 7 + index * 6,
      ease: "none",
      scrollTrigger: { trigger: root, start: "top bottom", end: "bottom top", scrub: true },
    }));
    return () => tweens.forEach((tween) => { tween.scrollTrigger?.kill(); tween.kill(); });
  }, []);

  return (
    <div className="parallax-landscape" ref={parallaxRef} aria-label="Abstract landscape inspired by the Caspian coast" role="img">
      <div className="parallax-sky" data-parallax-layer="1" />
      <div className="parallax-sun" data-parallax-layer="2" />
      <div className="parallax-ridge ridge-far" data-parallax-layer="3" />
      <div className="parallax-ridge ridge-near" data-parallax-layer="4" />
      <div className="parallax-caption"><span>AKTAU / CASPIAN COAST</span><strong>Place shapes perspective.</strong></div>
    </div>
  );
}
