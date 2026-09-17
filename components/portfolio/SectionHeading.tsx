export default function SectionHeading({
  number,
  eyebrow,
  title,
  aside,
}: {
  number: string;
  eyebrow: string;
  title: string;
  aside?: string;
}) {
  return (
    <header className="section-heading reveal">
      <p className="eyebrow">
        <span>{number}</span> / {eyebrow}
      </p>
      <div className="heading-row">
        <h2>{title}</h2>
        {aside && <p>{aside}</p>}
      </div>
    </header>
  );
}
