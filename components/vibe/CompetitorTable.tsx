import type { VibeProject } from "@/data/vibe-projects";
const dimensions = [
  ["user", "目标用户"],
  ["scenario", "核心场景"],
  ["value", "主要价值"],
  ["journey", "关键路径"],
  ["controllability", "AI 可控性"],
  ["trust", "结果可信度"],
  ["intervention", "用户介入方式"],
  ["boundary", "适用边界"],
] as const;
export default function CompetitorTable({ project }: { project: VibeProject }) {
  return (
    <>
      <p className="vibe-note">
        {project.competitorNote ??
          (project.status === "placeholder"
            ? "以下为方案类型的示例对照，未经真实竞品调研；不代表具体商业产品的能力。"
            : "沿用户任务与使用边界对照，不使用主观星级评分。")}
      </p>
      <div
        className="vibe-table-scroll"
        tabIndex={0}
        role="region"
        aria-label="竞品对比表，可横向滚动"
      >
        <table className="vibe-table">
          <caption>{project.name} · 竞品分析</caption>
          <thead>
            <tr>
              <th scope="col">对比维度</th>
              {project.competitors.map((competitor) => (
                <th scope="col" key={competitor.name}>
                  {competitor.name}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {dimensions.map(([key, label]) => (
              <tr key={key}>
                <th scope="row">{label}</th>
                {project.competitors.map((competitor) => (
                  <td key={competitor.name}>{competitor[key]}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {project.sources && (
        <p className="vibe-note">
          参考资料：{project.sources.map((source, index) => (
            <span key={source.url}>
              {index > 0 && " · "}
              <a href={source.url} target="_blank" rel="noopener noreferrer">{source.title} ↗</a>
            </span>
          ))}
        </p>
      )}
    </>
  );
}
