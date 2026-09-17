import { ArrowUpRight, Plus } from "lucide-react";
import type { Project } from "@/data/portfolio";
export default function ProjectPreview({
  project,
  slide,
}: {
  project: Project;
  slide: number;
}) {
  const panel = project.panels[slide];
  return (
    <div className={`browser-preview case-preview ${project.color}`}>
      <div className="browser-chrome">
        <span />
        <span />
        <span />
        <div>{project.name} · 项目档案</div>
        <ArrowUpRight size={10} />
      </div>
      <div className="case-content">
        <span className="preview-eyebrow">
          CASE STUDY / {String(slide + 1).padStart(2, "0")}
        </span>
        <h4>{panel.title}</h4>
        <p>{panel.summary}</p>
        <div className="case-stat">
          <strong>{panel.value}</strong>
          <span>{panel.metric}</span>
        </div>
        <div className="case-items">
          {panel.items.map((item) => (
            <span key={item}>
              <Plus size={10} />
              {item}
            </span>
          ))}
        </div>
        <small className="case-image-note">内容来自简历 · 项目截图待补充</small>
      </div>
    </div>
  );
}
