import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { journey } from "@/content/journey";

export function JourneyTimeline() {
  return (
    <section className="journey-timeline" aria-label="Altair Tolesh journey">
      <svg
        className="journey-line"
        viewBox="0 0 1000 80"
        role="img"
        aria-label="Timeline connecting six milestones"
      >
        <line x1="40" y1="40" x2="960" y2="40" />
        {journey.map((event, index) => (
          <circle
            key={event.title}
            cx={40 + index * (920 / (journey.length - 1))}
            cy="40"
            r="7"
          />
        ))}
      </svg>
      <div className="journey-list">
        {journey.map((event, index) => (
          <article key={event.title}>
            <div className="journey-period">
              <span>{event.period}</span>
              <small>{String(index + 1).padStart(2, "0")}</small>
            </div>
            <p className="overline">{event.category}</p>
            <h2>{event.title}</h2>
            <p>{event.story}</p>
            <p className="journey-lesson">
              <strong>What I learned:</strong> {event.lesson}
            </p>
            {event.relatedHref ? (
              <Link href={event.relatedHref} className="text-link">
                Read the case study <ArrowUpRight size={15} />
              </Link>
            ) : null}
          </article>
        ))}
      </div>
    </section>
  );
}
