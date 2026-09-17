import { artifacts, type ArtifactSlug } from "@/data/vibe-projects";
export default function ArtifactIndex({
  slug,
  active,
}: {
  slug: string;
  active?: ArtifactSlug;
}) {
  return (
    <nav className="vibe-artifacts" aria-label="成果物索引">
      {artifacts.map((item) => (
        <a
          key={item.slug}
          href={`/vibe/${slug}/${item.slug}`}
          aria-current={active === item.slug ? "page" : undefined}
        >
          <span>{item.number}</span>
          {item.label}
          <b aria-hidden="true">↗</b>
        </a>
      ))}
    </nav>
  );
}
