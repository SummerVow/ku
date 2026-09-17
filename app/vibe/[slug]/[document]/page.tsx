import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import {
  findVibeProject,
  findArtifact,
  projectStatus,
} from "@/data/vibe-projects";
import VibeDocumentViewer from "@/components/vibe/VibeDocumentViewer";
type Props = { params: Promise<{ slug: string; document: string }> };
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug, document } = await params;
  const project = findVibeProject(slug);
  const artifact = findArtifact(document);
  return project && artifact
    ? {
        title: `${project.name} · ${artifact.label} | Vibe Product Lab`,
        description: `${projectStatus(project)}：${project.name}的${artifact.label}。${project.validationGoal}`,
      }
    : { title: "未找到文档" };
}
export default async function DocumentPage({ params }: Props) {
  const { slug, document } = await params;
  const project = findVibeProject(slug);
  const artifact = findArtifact(document);
  if (!project || !artifact) notFound();
  if (slug !== project.slug) redirect(`/vibe/${project.slug}/${artifact.slug}`);
  return <VibeDocumentViewer project={project} document={artifact.slug} />;
}
