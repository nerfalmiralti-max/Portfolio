"use client";

import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { ArrowUpRight, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { journey } from "@/content/site";

const relatedHref = (title: string) => title.includes("99") ? "/projects/99-aktau" : title.includes("Mangystau") ? "/projects/mangystau-trials" : title.includes("Kronos") ? "/projects/kronos" : null;

export function InteractiveJourney() {
  const [active, setActive] = useState(0);
  const [focused, setFocused] = useState<number | null>(null);
  const rootRef = useRef<HTMLElement>(null);
  const entryRefs = useRef<Array<HTMLButtonElement | null>>([]);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      const current = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (current) setActive(Number((current.target as HTMLElement).dataset.index || 0));
    }, { rootMargin: "-40% 0px -44%", threshold: [0, .2, .5] });
    entryRefs.current.forEach((entry) => entry && observer.observe(entry));
    const progress = () => {
      const root = rootRef.current;
      if (!root) return;
      const rect = root.getBoundingClientRect();
      const amount = Math.max(0, Math.min(1, (window.innerHeight * .55 - rect.top) / Math.max(1, rect.height - window.innerHeight * .2)));
      root.style.setProperty("--journey-progress", `${amount * 100}%`);
    };
    progress();
    window.addEventListener("scroll", progress, { passive: true });
    return () => { observer.disconnect(); window.removeEventListener("scroll", progress); };
  }, []);

  const selected = focused === null ? null : journey[focused];
  const related = selected ? relatedHref(selected.title) : null;

  return (
    <section className={`journey-timeline journey-active-${journey[active].category.toLowerCase()}`} ref={rootRef} data-atmosphere="journey">
      <div className="timeline-key">{["Build", "Learn", "Compete", "Train", "Future"].map((item) => <span key={item}><i className={`marker-${item.toLowerCase()}`} />{item}</span>)}</div>
      <div className="journey-axis" aria-hidden="true"><i /></div>
      <div className="journey-milestones">
        {journey.map((event, index) => (
          <motion.button layout type="button" data-index={index} data-cursor="OPEN" ref={(node) => { entryRefs.current[index] = node; }} onClick={() => setFocused(index)} className={`journey-milestone marker-surface-${event.category.toLowerCase()} ${active === index ? "is-active" : ""}`} key={event.title}>
            <span className="journey-node" aria-hidden="true" />
            <span className="journey-period"><span>{event.period}</span><small>{String(index + 1).padStart(2, "0")}</small></span>
            <span className="overline">{event.category}</span>
            <strong>{event.title}</strong>
            <span className="milestone-prompt">Open note <ArrowUpRight size={13} /></span>
          </motion.button>
        ))}
      </div>
      <AnimatePresence>
        {selected ? (
          <motion.aside className={`journey-focus marker-surface-${selected.category.toLowerCase()}`} role="dialog" aria-modal="true" aria-label={`${selected.title} detail`} initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 40 }}>
            <button type="button" onClick={() => setFocused(null)} aria-label="Close milestone detail"><X size={18} /></button>
            <span className="overline">{selected.period} / {selected.category}</span>
            <h2>{selected.title}</h2>
            <p>{selected.story}</p>
            <blockquote><span>Lesson learned</span>{selected.lesson}</blockquote>
            {related ? <Link href={related} data-cursor="VIEW">Related case study <ArrowUpRight size={15} /></Link> : null}
          </motion.aside>
        ) : null}
      </AnimatePresence>
    </section>
  );
}
