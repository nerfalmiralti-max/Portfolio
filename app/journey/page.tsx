import type { Metadata } from "next";
import { InteractiveJourney } from "@/components/interactive-journey";

export const metadata: Metadata = { title: "Journey", description: "An honest timeline of building, learning, competing, training, and future direction.", alternates: { canonical: "/journey" } };

export default function JourneyPage() {
  return (
    <div className="page-shell journey-page">
      <header className="page-hero journey-hero"><div><span className="overline">Journey / Timeline</span><h1>A trajectory measured in <em>things attempted.</em></h1></div><p>The dates are deliberately broad where they are not confirmed. What matters here is the sequence: learn, build, meet reality, adjust.</p></header>
      <InteractiveJourney />
    </div>
  );
}
