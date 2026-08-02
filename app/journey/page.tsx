import type { Metadata } from "next";
import { JourneyTimeline } from "@/components/journey-timeline";

export const metadata: Metadata = { title: "Journey", description: "What Altair Tolesh learned from building 99 AKTAU, Tuesday Lounge Bar, and Mangystau Trials.", alternates: { canonical: "/journey" } };

export default function JourneyPage() {
  return (
    <div className="page-shell journey-page">
      <header className="page-hero journey-hero">
        <div>
          <span className="overline">Journey</span>
          <h1>What I learned from each project</h1>
        </div>
        <p>
          Mangystau Trials taught me to reduce the scope. 99 AKTAU taught me to
          think about the client after deployment. Tuesday taught me how strongly
          content and mobile navigation affect a business website.
        </p>
      </header>
      <JourneyTimeline />
    </div>
  );
}
