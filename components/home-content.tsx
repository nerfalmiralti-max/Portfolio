import { Hero } from "@/components/hero";
import { ProjectIndex } from "@/components/project-index";
import { ProcessTrack } from "@/components/process-track";
import { ContactBlock } from "@/components/contact-block";
import { homepageCopy } from "@/content/profile";
import { projects } from "@/content/projects";

export function HomeContent() {
  return (
    <>
      {/* Hero and index share one spine: the rule that starts under the
          wordmark is the rule the project index hangs from, and the marker on
          it travels as the reader moves between them. */}
      <div className="continuum">
        <span className="continuum-spine" aria-hidden="true">
          <span className="continuum-mark" />
        </span>

        <Hero />

        <ProjectIndex
          projects={projects}
          eyebrow={homepageCopy.workEyebrow}
          heading={homepageCopy.workHeading}
          body={homepageCopy.workBody}
        />
      </div>

      <section className="section ledger-section">
        <div className="shell">
          <p className="label">What you can check</p>
          <dl className="ledger" data-scene="ruled">
            {homepageCopy.ledger.map((item) => (
              <div key={item.label}>
                <dt>{item.value}</dt>
                <dd>{item.label}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="section section-ruled">
        <div className="shell statement-block" data-scene>
          <p className="label">Approach</p>
          <h2 className="statement-heading">{homepageCopy.noteHeading}</h2>
          <p className="statement-body">{homepageCopy.noteBody}</p>
        </div>
      </section>

      <section className="section section-ruled" id="process">
        <div className="shell">
          <header className="index-head" data-scene>
            <p className="label">{homepageCopy.processEyebrow}</p>
            <h2>{homepageCopy.processHeading}</h2>
            <p className="index-head-body">{homepageCopy.processBody}</p>
          </header>
          <ProcessTrack />
        </div>
      </section>

      <ContactBlock />
    </>
  );
}
