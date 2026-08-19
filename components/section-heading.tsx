export function SectionHeading({
  eyebrow,
  title,
  body,
}: {
  eyebrow: string;
  title: string;
  body?: string;
}) {
  return (
    <header className="section-heading" data-reveal>
      <p className="label">{eyebrow}</p>
      <h2>{title}</h2>
      {body ? <p>{body}</p> : null}
    </header>
  );
}
