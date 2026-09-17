import type { VibeProject } from "@/data/vibe-projects";
const stages = [
  ["scenario", "场景"],
  ["requirements", "需求"],
  ["prd", "PRD"],
  ["demo", "Demo"],
  ["validation", "验证"],
] as const;
export default function VibeStageTrail({ project }: { project: VibeProject }) {
  return (
    <div className="vibe-trail-wrap">
      <ol className="vibe-trail" aria-label="产品完成进度">
        {stages.map(([key, label]) => (
          <li key={key} className={project.stages[key] ? "is-complete" : ""}>
            <i aria-hidden="true" />
            {label}
            <span className="sr-only">
              ：{project.stages[key] ? "已完成" : "待完成"}
            </span>
          </li>
        ))}
      </ol>
      <small>
        {project.status === "placeholder"
          ? "空心节点：真实项目材料待补充"
          : "实心节点：已完成 · 空心节点：待完成"}
      </small>
    </div>
  );
}
