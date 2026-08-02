import Link from "next/link";
import { ArrowRight, CircleCheck } from "lucide-react";
import PortfolioHero from "@/components/ui/portfolio-hero";
import { SectionHeading } from "@/components/section-heading";
import { SelectedWorkStage } from "@/components/selected-work-stage";
import { capabilities, journey, processSteps, profile } from "@/content/site";

export function HomeContent() {
  return (
    <div className="home-experience">
      <PortfolioHero />

      <section className="intro-section" id="introduction">
        <span className="overline">00 / Working principle</span>
        <h2>A finished interface is only one part of the work.</h2>
        <p>
          A website also needs clear navigation, reliable forms, responsive
          behavior, understandable content, fast loading, and a structure
          another person can maintain. These details shape how I approach every
          project.
        </p>
        <div className="intro-proof" aria-label="Portfolio facts">
          {[
            "Three live project links",
            "Commercial full-stack delivery",
            "Design and development",
            "Based in Aktau",
          ].map((item) => (
            <span key={item}>
              <CircleCheck size={15} /> {item}
            </span>
          ))}
        </div>
      </section>

      <SelectedWorkStage />

      <section className="section process-section" id="process">
        <SectionHeading
          eyebrow="02 / Process"
          title="I work from the user’s task outward."
          body="Visual design begins after the main problem, content, and user path are understood. This keeps the interface focused and reduces unnecessary complexity during development."
        />
        <ol className="process-grid">
          {processSteps.map((step) => (
            <li key={step.number}>
              <span>{step.number}</span>
              <h3>{step.title}</h3>
              <p>{step.body}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="section capabilities-section">
        <SectionHeading
          eyebrow="03 / Capabilities"
          title="The parts of the process I can handle."
          body="The goal is not to collect skill labels. It is to connect the right decisions from first structure to release."
        />
        <div className="capability-grid">
          {capabilities.map((capability, index) => (
            <article key={capability.title}>
              <span>0{index + 1}</span>
              <h3>{capability.title}</h3>
              <p>{capability.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="about-preview">
        <div className="about-preview-label">
          <span className="overline">04 / About</span>
          <span>{profile.coordinates}</span>
        </div>
        <div>
          <h2>I learn fastest when the work has to function outside a tutorial.</h2>
          <p>
            I am Altair Tolesh, a student from Aktau studying at Nazarbayev
            Intellectual School. My projects have taught me how to make clearer
            decisions, reduce unnecessary features, solve technical problems,
            and finish work under real constraints.
          </p>
          <Link href="/about" className="text-link">
            Read the full story <ArrowRight size={17} />
          </Link>
        </div>
      </section>

      <section className="section journey-preview">
        <SectionHeading
          eyebrow="05 / Journey"
          title="The work becomes more complete with every project."
          body="Early experiments taught individual tools. Later work required those tools to operate as one system: interface, logic, deployment, and handover."
        />
        <div className="journey-rail">
          {journey.slice(1, 5).map((event, index) => (
            <article key={event.title}>
              <span className="journey-index">0{index + 1}</span>
              <p className="overline">{event.category}</p>
              <h3>{event.title}</h3>
              <p>{event.story}</p>
            </article>
          ))}
        </div>
        <Link href="/journey" className="text-link section-link">
          Open the complete journey <ArrowRight size={17} />
        </Link>
      </section>

      <section className="discipline-section">
        <div className="discipline-system" aria-hidden="true">
          <span>01 / REPEAT</span>
          <span>02 / REVIEW</span>
          <span>03 / ADJUST</span>
          <span>04 / RETURN</span>
          <i />
        </div>
        <div>
          <span className="overline">06 / Judo</span>
          <h2>Repetition improves judgment.</h2>
          <p>
            Judo has taught me to focus on fundamentals, respond calmly to
            mistakes, and return to difficult problems until the technique
            becomes more reliable.
          </p>
          <Link href="/about" className="text-link">
            About discipline and work <ArrowRight size={17} />
          </Link>
        </div>
      </section>

      <section className="contact-cta">
        <span className="overline">07 / Contact</span>
        <h2>Have a project that needs a clear structure and a reliable build?</h2>
        <p>
          I am open to selected websites, product collaborations, educational
          opportunities, and useful feedback.
        </p>
        <div>
          <Link href="/contact" className="button button-primary">
            Discuss a project <ArrowRight size={18} />
          </Link>
          <Link href="/projects" className="button button-quiet">
            View all work
          </Link>
        </div>
      </section>
    </div>
  );
}
