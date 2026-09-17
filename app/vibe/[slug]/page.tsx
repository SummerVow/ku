import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { findVibeProject, projectStatus } from "@/data/vibe-projects";
import VibeProjectDetail from "@/components/vibe/VibeProjectDetail";
type Props = { params: Promise<{ slug: string }> };
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const project = findVibeProject((await params).slug);
  return project
    ? {
        title: `${project.name} · 产品实验档案 | Vibe Product Lab`,
        description: `${projectStatus(project)}。${project.productJudgment}${project.validationGoal}`,
      }
    : { title: "未找到实验档案" };
}
export default async function VibePage({ params }: Props) {
  const { slug } = await params;
  const project = findVibeProject(slug);
  if (!project) notFound();
  if (slug !== project.slug) redirect(`/vibe/${project.slug}`);
  return <VibeProjectDetail project={project} />;
}
