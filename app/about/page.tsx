import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ParallaxComponent } from "@/components/ui/parallax-scrolling";
import { profile } from "@/content/site";

export const metadata: Metadata = { title: "About", description: "Altair Tolesh’s story: Aktau, school, product building, judo, and the direction ahead.", alternates: { canonical: "/about" } };

const principles = ["Ship something real.", "Design is part of how a product works.", "Failure is information.", "Small projects can teach serious lessons.", "Consistency matters more than motivation.", "Ambition needs execution.", "Stay curious longer than everyone else."];

export default function AboutPage() {
  return (
    <div className="page-shell about-page">
      <header className="page-hero about-hero"><div><span className="overline">About / Personal story</span><h1>I learn by building things that can be <em>tested, used, and improved.</em></h1></div><p>I am Altair, a student from Aktau. Technology is where curiosity becomes something visible; judo is where discipline becomes something repeatable.</p></header>
      <ParallaxComponent />
      <section className="about-story">
        <div className="story-aside"><span className="overline">At a glance</span><dl><div><dt>Based in</dt><dd>{profile.location}</dd></div>{profile.schoolVisible ? <div><dt>Learning at</dt><dd>{profile.school}</dd></div> : null}<div><dt>Languages</dt><dd>Kazakh · Russian · English</dd></div><div><dt>Current focus</dt><dd>{profile.currentProject}</dd></div></dl></div>
        <div className="story-copy"><span className="drop-cap">A</span><p>I grew up in Aktau, on the Caspian coast, and started building digital products at a young age. The point was never to look older than I am. It was to find out how far an idea could travel when I took every step seriously—from sketch and interface to code, deployment, and actual use.</p><p>School gives me foundations. Projects teach me how decisions, deadlines, users, and real problems work. At Nazarbayev Intellectual School, I explore biology, technology, entrepreneurship, artificial intelligence, and the English I will need for international education.</p><p>Competition work has taught me to keep unsuccessful results in the story. Mangystau Trials did not pass its hackathon’s final selection. The project still changed how I think about scope, product hypotheses, and showing the essential idea faster.</p></div>
      </section>
      <section className="principles-section"><span className="overline">Principles I am learning to work by</span><div>{principles.map((principle, index) => <article key={principle}><span>{String(index + 1).padStart(2, "0")}</span><h2>{principle}</h2></article>)}</div></section>
      <section className="judo-story"><div><span className="overline">Discipline / Judo</span><h2>The mat makes excuses visible.</h2></div><div><p>I started practicing judo young and have participated in multiple competitions. Training turns improvement into a practical loop: repeat, notice the weak point, adjust, and return.</p><p>I apply the same loop to products. A broken flow, a rejected competition result, or a difficult bug is not a verdict. It is specific information about what to practice next.</p></div></section>
      <section className="academic-direction"><span className="overline">What I am building toward</span><h2>Stanford is the university I currently dream of studying at—not because of its name alone, but because of its culture of building ambitious ideas.</h2><p>That aspiration is not an affiliation or a promise. It is a direction for the daily work: stronger fundamentals, better English, more honest products, real users, international programs, and continued curiosity.</p><Link href="/journey" className="text-link">See the trajectory <ArrowRight size={18} /></Link></section>
    </div>
  );
}
