import Link from "next/link";
import {
  artifacts,
  projectStatus,
  type VibeProject,
} from "@/data/vibe-projects";
import VibePreview from "./VibePreview";
import { DemoLink } from "./VibeProjectCard";
import VibeStageTrail from "./VibeStageTrail";
import ArtifactIndex from "./ArtifactIndex";
import VibeContent, { Opportunity } from "./VibeContent";
import VibeDemoShell from "./VibeDemoShell";

export default function VibeProjectDetail({
  project,
}: {
  project: VibeProject;
}) {
  return (
    <main id="vibe-main" className={`vibe-page vibe-${project.accent}`}>
      <header className="vibe-cover">
        <div>
          <p className="vibe-kicker">
            VIBE FILE / {project.index} · {project.type}
          </p>
          <p className="vibe-status">{projectStatus(project)}</p>
          <h1>
            {project.name}
            <span>{project.englishName}</span>
          </h1>
          <p className="vibe-cover-judgment">{project.productJudgment}</p>
          {project.contextNote && (
            <p className="vibe-note">{project.contextNote}</p>
          )}
          <div className="vibe-cover-actions">
            <a className="vibe-action vibe-action-primary" href="#prototype">
              {project.demo.available === false
                ? "查看核心流程 ↓"
                : "体验本页原型 ↓"}
            </a>
            <DemoLink project={project} />
          </div>
          <VibeStageTrail project={project} />
        </div>
        <VibePreview project={project} />
      </header>
      <div className="vibe-case-index">
        <span>成果物索引 / DOCUMENTS</span>
        <ArtifactIndex slug={project.slug} />
      </div>
      <section className="vibe-reading-section" id="scenario">
        <header>
          <span>01 / CONTEXT</span>
          <h2>用户场景</h2>
        </header>
        <dl className="vibe-scenario-grid">
          {[
            ["谁是用户", project.overview.user],
            ["何时遇到问题", project.overview.context],
            ["当前如何解决", project.overview.currentSolution],
            ["哪一步成本最高", project.overview.friction],
          ].map(([label, value]) => (
            <div key={label}>
              <dt>{label}</dt>
              <dd>{value}</dd>
            </div>
          ))}
        </dl>
      </section>
      <section className="vibe-reading-section" id="teardown">
        <header>
          <span>02 / TEARDOWN</span>
          <h2>产品拆解</h2>
          <a href={`/vibe/${project.slug}/product-teardown`}>单独阅读 ↗</a>
        </header>
        <VibeContent project={project} document="product-teardown" />
      </section>
      <section className="vibe-reading-section" id="opportunity">
        <header>
          <span>03 / DECISIONS</span>
          <h2>机会判断</h2>
        </header>
        <Opportunity project={project} />
      </section>
      {artifacts.slice(1, 4).map((artifact, i) => (
        <section
          className="vibe-reading-section"
          id={artifact.slug}
          key={artifact.slug}
        >
          <header>
            <span>
              0{i + 4} / {artifact.slug.toUpperCase()}
            </span>
            <h2>{artifact.label}</h2>
            <a href={`/vibe/${project.slug}/${artifact.slug}`}>单独阅读 ↗</a>
          </header>
          <VibeContent project={project} document={artifact.slug} />
        </section>
      ))}
      <section className="vibe-reading-section" id="prototype">
        <header>
          <span>07 / PROTOTYPE</span>
          <h2>
            {project.demo.available === false
              ? "核心流程示意"
              : "先体验，再判断"}
          </h2>
        </header>
        <VibeDemoShell project={project} />
      </section>
      <section className="vibe-reading-section" id="validation">
        <header>
          <span>08 / VALIDATION</span>
          <h2>一轮验证</h2>
          <a href={`/vibe/${project.slug}/validation`}>单独阅读 ↗</a>
        </header>
        <VibeContent project={project} document="validation" />
      </section>
      <section className="vibe-reading-section">
        <header>
          <span>09 / NEXT ITERATION</span>
          <h2>迭代判断</h2>
        </header>
        <dl className="vibe-iteration">
          {[
            ["什么假设被验证", project.iteration.confirmed],
            ["什么假设被否定", project.iteration.rejected],
            ["下一版保留什么", project.iteration.keep],
            ["下一版删除什么", project.iteration.remove],
            ["下一版优先修改什么", project.iteration.next],
          ].map(([label, value]) => (
            <div key={label}>
              <dt>{label}</dt>
              <dd>{value}</dd>
            </div>
          ))}
        </dl>
      </section>
      <footer className="vibe-page-footer">
        <Link href="/#vibe-lab">← 返回作品集 · Vibe Product Lab</Link>
        <span>{projectStatus(project)}</span>
      </footer>
    </main>
  );
}
