import type { Metadata } from "next";
import { InteractiveJourney } from "@/components/interactive-journey";

export const metadata: Metadata = { title: "Journey", description: "An honest timeline of building, learning, competing, training, and future direction.", alternates: { canonical: "/journey" } };

export default function JourneyPage() {
  return (
    <div className="page-shell journey-page">
      <header className="page-hero journey-hero">
        <div>
          <span className="overline">Journey / Timeline</span>
          <h1>
            The work becomes more complete <em>with every project.</em>
          </h1>
        </div>
        <p>
          Exact dates are omitted where they are not confirmed. The useful story
          is the sequence: learn a tool, apply it under pressure, review the
          result, and improve the next decision.
        </p>
      </header>
      <InteractiveJourney />
    </div>
  );
}
