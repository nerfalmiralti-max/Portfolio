import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { journey } from "@/content/journey";

export function JourneyTimeline() {
  return (
    <section className="journey-timeline" aria-label="Altair Tolesh journey" data-motion="journey-signature">
      <svg className="journey-spine" viewBox="0 0 10 100" preserveAspectRatio="none" aria-hidden="true">
        <path d="M5 0 L5 100" />
      </svg>
      <div className="journey-list">
        {journey.map((event, index) => (
          <article
            className={index === journey.length - 1 ? "is-future" : ""}
            data-journey-milestone
            data-motion="journey-milestone"
            key={event.title}
          >
            <i className="journey-node" aria-hidden="true" />
            <div className="journey-period">
              <span>{event.period}</span>
              <small>{String(index + 1).padStart(2, "0")}</small>
            </div>
            <p className="overline">{index === journey.length - 1 ? "NEXT" : event.category.toUpperCase()}</p>
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
