import type { ArtifactSlug, VibeProject } from "@/data/vibe-projects";
import CompetitorTable from "./CompetitorTable";
import PrdDocument, { TextList } from "./PrdDocument";
import ValidationReport from "./ValidationReport";
export function Opportunity({ project }: { project: VibeProject }) {
  return (
    <div className="vibe-two-columns">
      <div>
        <h3>为什么值得做</h3>
        <p>{project.opportunity.whyNow}</p>
        <h3>这次的产品判断</h3>
        <p>{project.opportunity.decision}</p>
      </div>
      <aside className="vibe-nongoals">
        <h3>这次决定不做什么</h3>
        <TextList items={project.opportunity.nonGoals} />
      </aside>
    </div>
  );
}
export default function VibeContent({
  project,
  document,
}: {
  project: VibeProject;
  document: ArtifactSlug;
}) {
  if (document === "competitor-analysis")
    return <CompetitorTable project={project} />;
  if (document === "prd") return <PrdDocument project={project} />;
  if (document === "validation") return <ValidationReport project={project} />;
  if (document === "requirements") {
    const r = project.requirements;
    return (
      <div className="vibe-prose">
        <h3>目标用户</h3>
        <p>{r.targetUser}</p>
        <h3>Job To Be Done</h3>
        <blockquote>{r.jobToBeDone}</blockquote>
        <h3>核心问题</h3>
        <p>{r.problem}</p>
        <h3>产品目标</h3>
        <p>{r.goal}</p>
        <h3>成功指标</h3>
        <TextList items={r.successMetrics} />
        <h3>使用边界</h3>
        <TextList items={r.boundaries} />
        <h3>MVP 范围</h3>
        <TextList items={r.mvp} />
        <aside className="vibe-nongoals">
          <h3>非目标</h3>
          <TextList items={r.nonGoals} />
        </aside>
      </div>
    );
  }
  const t = project.teardown;
  return (
    <div className="vibe-prose">
      <h3>核心用户</h3>
      <p>{t.coreUser}</p>
      <h3>核心任务</h3>
      <p>{t.coreJob}</p>
      <h3>关键使用路径</h3>
      <ol className="vibe-flow">
        {t.journey.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ol>
      <h3>产品机制</h3>
      <TextList items={t.mechanism} />
      <div className="vibe-two-columns">
        <div>
          <h3>当前优势 · 待核实</h3>
          <TextList items={t.strengths} />
        </div>
        <div>
          <h3>可能存在的体验摩擦</h3>
          <TextList items={t.frictions} />
        </div>
      </div>
    </div>
  );
}
