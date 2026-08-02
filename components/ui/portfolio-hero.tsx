"use client";

import Link from "next/link";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { ArrowDown, ArrowRight } from "lucide-react";
import { useLanguage } from "@/components/language-provider";
import { profile } from "@/content/site";

interface BlurTextProps { text: string; delay?: number; animateBy?: "words" | "letters"; className?: string; }

export function BlurText({ text, delay = 45, animateBy = "words", className = "" }: BlurTextProps) {
  const [inView, setInView] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(([entry]) => entry.isIntersecting && setInView(true), { threshold: 0.1 });
    observer.observe(node);
    return () => observer.disconnect();
  }, []);
  const segments = useMemo(() => animateBy === "words" ? text.split(" ") : text.split(""), [text, animateBy]);
  return (
    <span ref={ref} className={`blur-text ${className}`} aria-label={text}>
      {segments.map((segment, index) => <span aria-hidden="true" key={`${segment}-${index}`} style={{ transitionDelay: `${index * delay}ms`, opacity: inView ? 1 : 0, filter: inView ? "blur(0)" : "blur(10px)", transform: inView ? "translateY(0)" : "translateY(18px)" }}>{segment}{animateBy === "words" && index < segments.length - 1 ? "\u00A0" : ""}</span>)}
    </span>
  );
}

export default function PortfolioHero() {
  const { copy, locale } = useLanguage();
  const visualRef = useRef<HTMLDivElement>(null);
  const [boosted, setBoosted] = useState(false);

  useEffect(() => {
    let timer: number | undefined;
    const boost = () => { setBoosted(true); timer = window.setTimeout(() => setBoosted(false), 2400); };
    window.addEventListener("altair:orbit-boost", boost);
    return () => { window.removeEventListener("altair:orbit-boost", boost); if (timer) window.clearTimeout(timer); };
  }, []);

  const move = (event: React.PointerEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    visualRef.current?.style.setProperty("--orbit-x", `${x * 12}px`);
    visualRef.current?.style.setProperty("--orbit-y", `${y * 12}px`);
  };

  return (
    <section className="hero" onPointerMove={move} data-atmosphere="hero">
      <div className="hero-copy">
        <p className="eyebrow"><span className="eyebrow-line" />{copy.hero.eyebrow}</p>
        {locale === "en" ? (
          <h1 aria-label={copy.hero.title}>
            <span className="hero-line"><BlurText text="I turn ambitious ideas" delay={42} /></span>
            <span className="hero-line hero-line-working">into <em>working</em></span>
            <span className="hero-line hero-line-final">digital products.</span>
          </h1>
        ) : <h1><BlurText text={copy.hero.title} delay={38} /></h1>}
        <p className="hero-intro">{copy.hero.intro}</p>
        <div className="hero-actions">
          <Link href="/projects" className="button button-primary" data-cursor="WORK">{copy.hero.work}<ArrowRight size={17} /></Link>
          <Link href="/journey" className="button button-quiet" data-cursor="JOURNEY">{copy.hero.journey}</Link>
        </div>
        <p className="age-note"><span />{profile.ageVisible ? copy.hero.note : "Building seriously."}</p>
      </div>
      <div className={`orbit-system ${boosted ? "is-boosted" : ""}`} ref={visualRef} aria-label="Three projects orbiting the AT monogram" role="img" data-cursor="EXPLORE">
        <div className="coordinate coordinate-top">{profile.coordinates}</div>
        <div className="orbit-grid" />
        <div className="orbit orbit-one"><div className="project-node node-99"><div className="node-art node-art-booking"><i /><i /><i /><i /></div><span>01</span><strong>99 AKTAU</strong><small>BOOK / SHIPPED</small></div></div>
        <div className="orbit orbit-two"><div className="project-node node-mangystau"><div className="node-art node-art-map"><i /><i /><i /></div><span>02</span><strong>MANGYSTAU</strong><small>ROUTE / PROTOTYPE</small></div></div>
        <div className="orbit orbit-three"><div className="project-node node-kronos"><div className="node-art node-art-time"><i /><i /></div><span>03</span><strong>KRONOS</strong><small>TIME / BUILDING</small></div></div>
        <div className="orbit-core"><span className="monogram monogram-hero" aria-hidden="true"><i>A</i><i>T</i></span><strong>ALTAIR TOLESH</strong><small>IDEA → WORKING PRODUCT</small></div>
        <div className="coordinate coordinate-bottom">CASPIAN / UTC+5</div>
      </div>
      <a href="#selected-work" className="scroll-cue" aria-label="Scroll to selected work"><span>Scroll to work</span><ArrowDown size={16} /></a>
    </section>
  );
}
