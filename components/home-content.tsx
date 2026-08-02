"use client";

import Link from "next/link";
import { ArrowRight, CircleCheck } from "lucide-react";
import PortfolioHero from "@/components/ui/portfolio-hero";
import { SectionHeading } from "@/components/section-heading";
import { capabilities, experiments, journey } from "@/content/site";
import { useLanguage } from "@/components/language-provider";
import { SelectedWorkStage } from "@/components/selected-work-stage";
import { HomeMotion } from "@/components/home-motion";

export function HomeContent() {
  const { copy } = useLanguage();
  return (
    <div className="home-experience">
      <HomeMotion />
      <PortfolioHero />
      <section className="proof-strip" aria-label={copy.sections.proof}>
        <span className="overline">{copy.sections.proof}</span>
        {["Commercial project shipped", "Full-stack product experience", "Design + development", "Based in Aktau", "Student + judo athlete"].map((item) => <div key={item}><CircleCheck size={15} />{item}</div>)}
      </section>

      <SelectedWorkStage title={copy.sections.work} />

      <section className="statement-section" data-atmosphere="philosophy">
        <div className="statement-index"><span>02</span><small>{copy.sections.philosophy}</small></div>
        <div><blockquote>Ideas become meaningful when they <em>survive reality.</em></blockquote><div className="philosophy-verbs" aria-label="Think. Design. Build. Ship."><span className="philosophy-verb">Think</span><span className="philosophy-verb">Design</span><span className="philosophy-verb">Build</span><span className="philosophy-verb">Ship</span></div></div>
      </section>

      <section className="section capabilities-section" data-atmosphere="capabilities">
        <SectionHeading eyebrow="03 / Practice" title={copy.sections.capabilities} body="The work crosses disciplines because useful products do too." />
        <div className="capability-grid">
          {Object.entries(capabilities).map(([group, items], index) => <article key={group}><span>0{index + 1}</span><h3>{group}</h3><ul>{items.map((item) => <li key={item}>{item}</li>)}</ul></article>)}
        </div>
      </section>

      <section className="section journey-preview" data-atmosphere="journey">
        <SectionHeading eyebrow="04 / Journey" title={copy.sections.journey} body="No invented dates. Just the sequence of projects, pressure, repetition, and clearer decisions." />
        <div className="timeline-rail">
          {journey.slice(0, 6).map((event, index) => <article key={event.title}><span className={`timeline-marker marker-${event.category.toLowerCase()}`} /><p className="overline">{event.category}</p><h3>{event.title}</h3><p>{event.story}</p><small>0{index + 1}</small></article>)}
        </div>
        <Link className="text-link section-link" href="/journey">Open the full journey <ArrowRight size={18} /></Link>
      </section>

      <section className="discipline-section" data-atmosphere="judo">
        <div className="discipline-visual" aria-hidden="true"><div className="mat-line line-a" /><div className="mat-line line-b" /><span>PRACTICE</span><span>FAILURE</span><span>ANALYSIS</span><span>ADJUSTMENT</span><span>RETURN</span></div>
        <div className="discipline-copy"><span className="overline">05 / Judo</span><h2>Technique improves through repetition. <em>So does judgment.</em></h2><p>Judo taught me that progress is rarely visible in a single day. The same is true in development: practice, fail, analyze, adjust, and return stronger.</p><Link href="/about" className="text-link">Read the personal story <ArrowRight size={17} /></Link></div>
      </section>

      <section className="section future-section" data-atmosphere="future">
        <SectionHeading eyebrow="06 / Direction" title={copy.sections.future} />
        <div className="goal-field">{["Strengthen engineering fundamentals", "Build with real users", "Improve English", "Explore artificial intelligence", "Prepare for international study", "Continue judo", "Develop Kronos"].map((goal, index) => <div key={goal}><span>{String(index + 1).padStart(2, "0")}</span><p>{goal}</p></div>)}</div>
      </section>

      <section className="section experiment-section">
        <SectionHeading eyebrow="07 / Experiments" title={copy.sections.experiments} body="Smaller ideas stay smaller here. They are studies, not inflated case studies." />
        <div className="experiment-list">{experiments.map((item, index) => <div key={item}><span>{String(index + 1).padStart(2, "0")}</span><p>{item}</p><i /></div>)}</div>
      </section>

      <section className="contact-cta" data-atmosphere="contact">
        <span className="overline">08 / Contact</span><h2>{copy.sections.contact}</h2><p>I am open to thoughtful collaborations, small commercial projects, educational opportunities, and conversations with people building useful things.</p><Link href="/contact" className="button button-primary">Start a conversation <ArrowRight size={18} /></Link>
      </section>
    </div>
  );
}
