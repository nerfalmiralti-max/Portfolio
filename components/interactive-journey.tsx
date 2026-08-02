"use client";

import Link from "next/link";
import { ArrowUpRight, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { journey } from "@/content/site";

function relatedHref(title: string) {
  if (title.includes("99")) return "/projects/99-aktau";
  if (title.includes("Mangystau")) return "/projects/mangystau-trials";
  if (title.includes("Tuesday")) return "/projects/tuesday-lounge-bar";
  return null;
}

export function InteractiveJourney() {
  const [focused, setFocused] = useState<number | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (focused !== null && !dialog.open) dialog.showModal();
    if (focused === null && dialog.open) dialog.close();
  }, [focused]);

  const selected = focused === null ? null : journey[focused];
  const related = selected ? relatedHref(selected.title) : null;

  return (
    <section className="journey-timeline" aria-label="Altair Tolesh journey">
      <div className="timeline-key" aria-label="Timeline categories">
        {["Build", "Learn", "Compete", "Train", "Future"].map((item) => (
          <span key={item}>
            <i className={`marker-${item.toLowerCase()}`} /> {item}
          </span>
        ))}
      </div>
      <div className="journey-axis" aria-hidden="true">
        <i />
      </div>
      <div className="journey-milestones">
        {journey.map((event, index) => (
          <button
            type="button"
            onClick={() => setFocused(index)}
            className={`journey-milestone marker-surface-${event.category.toLowerCase()}`}
            key={event.title}
          >
            <span className="journey-node" aria-hidden="true" />
            <span className="journey-period">
              <span>{event.period}</span>
              <small>{String(index + 1).padStart(2, "0")}</small>
            </span>
            <span className="overline">{event.category}</span>
            <strong>{event.title}</strong>
            <span className="milestone-prompt">
              Open note <ArrowUpRight size={13} />
            </span>
          </button>
        ))}
      </div>

      <dialog
        ref={dialogRef}
        className={`journey-dialog ${selected ? `marker-surface-${selected.category.toLowerCase()}` : ""}`}
        onClose={() => setFocused(null)}
        aria-label={selected ? `${selected.title} detail` : "Journey detail"}
      >
        {selected ? (
          <>
            <button
              className="dialog-close"
              type="button"
              onClick={() => setFocused(null)}
              aria-label="Close milestone detail"
            >
              <X size={18} />
            </button>
            <span className="overline">
              {selected.period} / {selected.category}
            </span>
            <h2>{selected.title}</h2>
            <p>{selected.story}</p>
            <blockquote>
              <span>Lesson learned</span>
              {selected.lesson}
            </blockquote>
            {related ? (
              <Link href={related} className="text-link" onClick={() => setFocused(null)}>
                Related case study <ArrowUpRight size={15} />
              </Link>
            ) : null}
          </>
        ) : null}
      </dialog>
    </section>
  );
}
