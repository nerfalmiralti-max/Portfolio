"use client";

import { useEffect, useRef, useState } from "react";

export function SectionHeading({ eyebrow, title, body }: { eyebrow: string; title: string; body?: string }) {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(([entry]) => entry.isIntersecting && setVisible(true), { threshold: .35 });
    observer.observe(node);
    return () => observer.disconnect();
  }, []);
  return (
    <header className={`section-heading ${visible ? "is-visible" : ""}`} ref={ref}>
      <span className="overline">{eyebrow}</span>
      <h2 aria-label={title}>{title.split(" ").map((word, index) => <span className="heading-word-mask" aria-hidden="true" key={`${word}-${index}`}><i style={{ transitionDelay: `${index * 55}ms` }}>{word}</i></span>)}</h2>
      {body ? <p>{body}</p> : null}
    </header>
  );
}
