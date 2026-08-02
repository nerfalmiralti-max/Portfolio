import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { profile, homepageCopy } from "@/content/profile";
import { HeroTrajectory } from "@/components/hero-trajectory";

export default function PortfolioHero() {
  return (
    <section className="hero">
      <div className="hero-copy" data-motion="hero-copy">
        <p className="eyebrow">
          <span className="eyebrow-line" />
          {homepageCopy.heroLabel}
        </p>
        <h1 aria-label="I design and build websites for real projects.">
          <span className="hero-line"><span>I design and build</span></span>
          <span className="hero-line hero-line-accent"><span>websites</span></span>
          <span className="hero-line"><span>for real projects.</span></span>
        </h1>
        <p className="hero-intro">{homepageCopy.heroBody}</p>
        <div className="hero-actions">
          <Link href="/work" className="button button-primary">
            View my work <ArrowRight size={17} />
          </Link>
          <Link href="/about" className="button button-quiet">
            About me
          </Link>
        </div>
        <p className="availability-note">
          <span /> {profile.availability}
        </p>
      </div>

      <HeroTrajectory />
    </section>
  );
}
