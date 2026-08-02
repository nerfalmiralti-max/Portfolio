import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { profile } from "@/content/site";

export const metadata: Metadata = {
  title: "About",
  description:
    "Altair Tolesh on learning through real projects, studying in Aktau, judo, and the direction ahead.",
  alternates: { canonical: "/about" },
};

const principles = [
  "Start with the user’s task.",
  "Make the main path obvious.",
  "Keep unfinished work honest.",
  "Use motion only when it adds meaning.",
  "Test the release, not only the mockup.",
  "Leave the project maintainable.",
];

export default function AboutPage() {
  return (
    <div className="page-shell about-page">
      <header className="page-hero about-hero">
        <div>
          <span className="overline">About / Personal context</span>
          <h1>
            I learn fastest when the work has to function
            <em> outside a tutorial.</em>
          </h1>
        </div>
        <p>
          I am Altair Tolesh, a student from Aktau. Web development interests me
          because it connects research, structure, visual decisions, code, and
          the practical work required after release.
        </p>
      </header>

      <section className="about-coordinate" aria-label="Aktau coordinates">
        <div className="about-coordinate-mark" aria-hidden="true">
          <span>A</span>
          <span>T</span>
        </div>
        <div>
          <span className="overline">Point of origin</span>
          <strong>{profile.coordinates}</strong>
          <p>Aktau, on the Caspian coast of Kazakhstan.</p>
        </div>
      </section>

      <section className="about-story">
        <aside className="story-aside">
          <span className="overline">At a glance</span>
          <dl>
            <div>
              <dt>Based in</dt>
              <dd>{profile.location}</dd>
            </div>
            <div>
              <dt>Learning at</dt>
              <dd>{profile.school}</dd>
            </div>
            <div>
              <dt>Languages</dt>
              <dd>Kazakh · Russian · English</dd>
            </div>
            <div>
              <dt>Current focus</dt>
              <dd>Product design, frontend engineering, and client-ready delivery</dd>
            </div>
          </dl>
        </aside>
        <div className="story-copy">
          <p>
            I became interested in web development because it combines several
            kinds of work: understanding a problem, organizing information,
            designing an interface, writing the code, and checking whether the
            result works for another person.
          </p>
          <p>
            My portfolio includes commercial work, a hospitality website, and a
            tourism prototype created during a hackathon. Each project has
            taught me to make clearer decisions, reduce unnecessary features,
            solve technical problems, and finish work under real constraints.
          </p>
          <p>
            Mangystau Trials did not pass its hackathon’s final selection. I keep
            that result in the case study because it changed how I prioritize an
            MVP and present the most important product hypothesis.
          </p>
        </div>
      </section>

      <section className="principles-section">
        <span className="overline">Principles in practice</span>
        <div>
          {principles.map((principle, index) => (
            <article key={principle}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <h2>{principle}</h2>
            </article>
          ))}
        </div>
      </section>

      <section className="judo-story">
        <div>
          <span className="overline">Discipline / Judo</span>
          <h2>Repetition improves judgment.</h2>
        </div>
        <div>
          <p>
            Judo is not separate from the way I work. Training has taught me to
            focus on fundamentals, respond calmly to mistakes, and return to
            difficult problems until the technique becomes more reliable.
          </p>
          <p>
            The same loop applies to product work: build, test, notice the weak
            point, adjust, and verify again.
          </p>
        </div>
      </section>

      <section className="academic-direction">
        <span className="overline">Long-term direction</span>
        <h2>
          Strengthen engineering and product skills, study internationally, and
          build useful products beyond a portfolio page.
        </h2>
        <p>
          The immediate work is concrete: stronger fundamentals, better English,
          clearer product decisions, real users, and more dependable releases.
        </p>
        <Link href="/journey" className="text-link">
          See the trajectory <ArrowRight size={18} />
        </Link>
      </section>
    </div>
  );
}
