import Link from "next/link";
import {
  artifacts,
  projectStatus,
  type ArtifactSlug,
  type VibeProject,
} from "@/data/vibe-projects";
import ArtifactIndex from "./ArtifactIndex";
import VibeContent from "./VibeContent";
import { DemoLink } from "./VibeProjectCard";
// 站内链接统一使用 next/link：静态导出部署到 GitHub Pages 子路径时，
// 只有 Link 会自动补上 basePath，原生 <a> 不会。
export default function VibeDocumentViewer({
  project,
  document,
}: {
  project: VibeProject;
  document: ArtifactSlug;
}) {
  const current = artifacts.find((item) => item.slug === document)!;
  const index = artifacts.findIndex((item) => item.slug === document);
  return (
    <main
      id="vibe-main"
      className={`vibe-page vibe-document-page vibe-${project.accent}`}
    >
      <div className="vibe-document-top">
        <Link className="vibe-action" href={`/vibe/${project.slug}`}>
          ← 返回完整案例
        </Link>
        <Link className="vibe-action" href={`/vibe/${project.slug}#prototype`}>
          {project.demo.available === false
            ? "查看核心流程 ↗"
            : "体验本页原型 ↗"}
        </Link>
        <DemoLink project={project} />
      </div>
      <div className="vibe-reader">
        <aside className="vibe-reader-sidebar">
          <p className="vibe-kicker">VIBE FILE / {project.index}</p>
          <h2>{project.name}</h2>
          <p className="vibe-status">{projectStatus(project)}</p>
          <ArtifactIndex slug={project.slug} active={document} />
          <small>
            文档状态：
            {project.status === "placeholder"
              ? "示例稿，待真实材料替换"
              : projectStatus(project)}
          </small>
          <Link className="vibe-back-home" href="/#vibe-lab">
            ← 返回作品集
          </Link>
        </aside>
        <article className="vibe-document">
          <header className="vibe-document-heading">
            <p className="vibe-kicker">ARTIFACT {current.number} / 05</p>
            <h1>{current.label}</h1>
            <p>
              {project.name} · {project.teardownTarget}
            </p>
            <span className="vibe-status">{projectStatus(project)}</span>
          </header>
          <VibeContent project={project} document={document} />
          <footer className="vibe-document-pager">
            {index > 0 ? (
              <Link href={`/vibe/${project.slug}/${artifacts[index - 1].slug}`}>
                ← {artifacts[index - 1].label}
              </Link>
            ) : (
              <Link href={`/vibe/${project.slug}`}>← 完整案例</Link>
            )}
            {index < artifacts.length - 1 ? (
              <Link href={`/vibe/${project.slug}/${artifacts[index + 1].slug}`}>
                {artifacts[index + 1].label} →
              </Link>
            ) : (
              <Link href={`/vibe/${project.slug}#prototype`}>
                {project.demo.available === false ? "查看流程 →" : "体验原型 →"}
              </Link>
            )}
          </footer>
        </article>
      </div>
    </main>
  );
}
