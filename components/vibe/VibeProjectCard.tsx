import { projectStatus, type VibeProject } from "@/data/vibe-projects";
import ArtifactIndex from "./ArtifactIndex";
import VibeStageTrail from "./VibeStageTrail";
import VibePreview from "./VibePreview";
export function DemoLink({ project }: { project: VibeProject }) {
  return project.demoUrl ? (
    <a
      className="vibe-action"
      href={project.demoUrl}
      target="_blank"
      rel="noopener noreferrer"
    >
      体验 Demo ↗
    </a>
  ) : (
    <span className="vibe-demo-unavailable">
      <button type="button" disabled>
        Demo 待接入
      </button>
      <small>
        {project.demo.available === false
          ? "实际作品链接待补充"
          : "外部地址待补充，案例内可体验前端原型"}
      </small>
    </span>
  );
}
export default function VibeProjectCard({
  project,
  order,
}: {
  project: VibeProject;
  order: number;
}) {
  return (
    <article
      className={`vibe-card vibe-${project.accent} reveal`}
      style={{ transitionDelay: `${order * 100}ms` }}
    >
      <header className="vibe-file-top">
        <span>VIBE FILE / {project.index}</span>
        <small>{projectStatus(project)}</small>
      </header>
      <VibePreview project={project} />
      <div className="vibe-card-body">
        <p className="vibe-kicker">{project.type}</p>
        <h3>
          {project.name}
          <span>{project.englishName}</span>
        </h3>
        <p className="vibe-target">拆解对象 / {project.teardownTarget}</p>
        <p className="vibe-scenario">{project.userScenario}</p>
        <div className="vibe-judgment">
          <span>核心产品判断</span>
          <p>{project.productJudgment}</p>
        </div>
        <div className="vibe-validation-goal">
          <span>想验证</span>
          <p>{project.validationGoal}</p>
        </div>
        <VibeStageTrail project={project} />
        <div className="vibe-index-label">
          成果物索引 <span>OPEN THE FILES ↓</span>
        </div>
        <ArtifactIndex slug={project.slug} />
        <footer className="vibe-card-actions">
          <a
            className="vibe-action vibe-action-primary"
            href={`/vibe/${project.slug}`}
          >
            查看完整案例 <span>↗</span>
          </a>
          <DemoLink project={project} />
        </footer>
      </div>
    </article>
  );
}
