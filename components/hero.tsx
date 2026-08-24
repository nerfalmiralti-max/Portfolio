"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { homepageCopy, profile } from "@/content/profile";

const LETTERS = profile.wordmark.split("");

/**
 * The opening. The name is not a headline sitting on a page — it is the page's
 * largest structural object, cut by the same rule system that runs through the
 * rest of the site.
 *
 * Two things move here, and only in response to a pointer:
 *
 *   1. A stroked copy of the word sits exactly on top of the filled one and is
 *      masked to a small disc around the cursor, so moving across the word
 *      exposes its outline rather than lighting the whole thing up.
 *   2. The six letters push apart from the cursor by at most a few pixels.
 *
 * Both are written as custom properties on one element per frame. Nothing here
 * runs on a timer, nothing runs off-screen, and nothing runs at all on a
 * coarse pointer or under reduced motion — the entrance is pure CSS and the
 * content is in the HTML either way.
 */
export function Hero() {
  const stage = useRef<HTMLDivElement>(null);
  const word = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const stageEl = stage.current;
    const wordEl = word.current;
    if (!stageEl || !wordEl) return;

    if (typeof matchMedia !== "function") return;
    const fine = matchMedia("(pointer: fine)");
    const calm = matchMedia("(prefers-reduced-motion: reduce)");
    if (!fine.matches || calm.matches) return;

    let centres: number[] = [];
    let frame = 0;
    let pointerX = 0;
    let pointerY = 0;

    const measure = () => {
      const letters = Array.from(
        wordEl.querySelectorAll<HTMLElement>("[data-letter]"),
      );
      const base = wordEl.getBoundingClientRect().left;
      centres = letters.map((letter) => {
        const box = letter.getBoundingClientRect();
        return box.left - base + box.width / 2;
      });
    };

    const paint = () => {
      frame = 0;
      const wordBox = wordEl.getBoundingClientRect();
      const stageBox = stageEl.getBoundingClientRect();

      stageEl.style.setProperty("--px", `${pointerX - stageBox.left}px`);
      stageEl.style.setProperty("--py", `${pointerY - stageBox.top}px`);
      stageEl.style.setProperty("--scan", `${pointerX - stageBox.left}px`);

      const localX = pointerX - wordBox.left;
      // Tighter than the old width/5: a narrower reach means the letters the
      // cursor is actually between move a long way and the rest hold still,
      // which reads as the word resisting the pointer. A wide reach moved
      // everything a little and read as nothing.
      const reach = Math.max(wordBox.width / 7, 110);

      centres.forEach((centre, index) => {
        const distance = localX - centre;
        // Gaussian falloff: only the letters actually under the cursor move.
        const strength = Math.exp(-((distance / reach) ** 2));
        const push = distance === 0 ? 0 : -Math.sign(distance) * strength * 13;
        wordEl.style.setProperty(`--o${index}`, `${push.toFixed(2)}px`);
      });
    };

    const onMove = (event: PointerEvent) => {
      pointerX = event.clientX;
      pointerY = event.clientY;
      if (frame) return;
      frame = requestAnimationFrame(paint);
    };

    const onLeave = () => {
      if (frame) cancelAnimationFrame(frame);
      frame = 0;
      stageEl.style.removeProperty("--px");
      stageEl.style.removeProperty("--py");
      centres.forEach((_, index) =>
        wordEl.style.setProperty(`--o${index}`, "0px"),
      );
    };

    measure();
    stageEl.dataset.pointer = "fine";
    stageEl.addEventListener("pointermove", onMove);
    stageEl.addEventListener("pointerleave", onLeave);
    window.addEventListener("resize", measure);

    return () => {
      if (frame) cancelAnimationFrame(frame);
      delete stageEl.dataset.pointer;
      stageEl.removeEventListener("pointermove", onMove);
      stageEl.removeEventListener("pointerleave", onLeave);
      window.removeEventListener("resize", measure);
    };
  }, []);

  const letters = (variant: "fill" | "stroke") =>
    LETTERS.map((letter, index) => (
      <span
        className="wordmark-letter"
        data-letter={variant === "fill" ? "" : undefined}
        key={`${variant}-${letter}-${index}`}
        style={{ "--letter-index": index } as React.CSSProperties}
      >
        <span className="wordmark-glyph">{letter}</span>
      </span>
    ));

  return (
    <section className="hero" ref={stage}>
      <span className="hero-scan" aria-hidden="true" />

      <div className="shell hero-inner">
        <p className="hero-meta" aria-hidden="true">
          <span className="label">{homepageCopy.heroIndex} — 01</span>
          <span className="hero-meta-rule" />
          <span className="label">{profile.role}</span>
        </p>

        <h1 className="wordmark" aria-label={profile.name}>
          <span className="wordmark-stack" ref={word} aria-hidden="true">
            <span className="wordmark-layer wordmark-fill">
              {letters("fill")}
            </span>
            <span className="wordmark-layer wordmark-stroke">
              {letters("stroke")}
            </span>
          </span>
          {/* The cutting edge that runs across the word on load. Purely a
              motion layer: no text, no state, and it is displayed away
              entirely under reduced motion and by the escape hatch. */}
          <span className="wordmark-cut" aria-hidden="true" />
        </h1>

        <div className="hero-base">
          <p className="hero-statement">
            {homepageCopy.heroStatement}
          </p>

          <div className="hero-paths">
            <Link href="/work" className="path-link" data-path="work">
              <span className="path-index">01</span>
              <span className="path-name">Work</span>
              <span className="path-arrow" aria-hidden="true" />
            </Link>
            <Link href="/contact" className="path-link" data-path="contact">
              <span className="path-index">02</span>
              <span className="path-name">Contact</span>
              <span className="path-arrow" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
