import type { VibeProject } from "@/data/vibe-projects";
export default function VibePreview({ project }: { project: VibeProject }) {
  if (project.cover)
    return (
      <div className="vibe-preview">
        {/* Native image keeps optional local assets portable without an image service. */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={project.cover}
          alt={`${project.name}项目预览`}
          loading="lazy"
          width="800"
          height="560"
        />
      </div>
    );
  return (
    <div
      className={`vibe-preview vibe-preview-${project.demo.kind}`}
      aria-label={`${project.name}前端原型界面示意`}
    >
      <div className="vibe-window">
        <div className="vibe-window-bar">
          <span>● ● ●</span>
          <span>{project.englishName}</span>
          <span>↗</span>
        </div>
        {project.demo.kind === "search" && (
          <div className="vibe-search-preview">
            <div className="vibe-fake-input">⌕ &nbsp; 答案的依据，在哪里？</div>
            <p>从结论，回到证据。</p>
            <div className="vibe-ink-lines">
              <i />
              <i />
              <i />
            </div>
            <div className="vibe-source">
              <span>01 · 来源与适用范围</span>
              <b>待核验 ↗</b>
            </div>
            <div className="vibe-source">
              <span>02 · 引用原文</span>
              <b>查看依据 ↗</b>
            </div>
          </div>
        )}
        {project.demo.kind === "creation" && (
          <div className="vibe-create-preview">
            <div className="vibe-artwork">
              <span>
                SLOW
                <br />
                MOMENTS.
              </span>
              <i />
              <small>封面示意 / V.01</small>
            </div>
            <div className="vibe-edit-preview">
              <small>修改方向</small>
              {project.demo.options.map((option, i) => (
                <span key={option}>
                  {i === 0 ? "◉" : "○"} {option}
                </span>
              ))}
              <b>对比版本 ↗</b>
            </div>
          </div>
        )}
        {project.demo.kind === "ticket" && (
          <div className="vibe-agent-preview">
            <p>先分对，再流转。</p>
            {project.demo.options.map((option, index) => (
              <div key={option}>
                <i>{index === 0 ? "→" : "!"}</i>
                <span>{option}</span>
              </div>
            ))}
            <small>流程示意 · 非真实工单</small>
          </div>
        )}
        {project.demo.kind === "agent" && (
          <div className="vibe-agent-preview">
            <p>每一步，都有交代。</p>
            {project.demo.steps.slice(0, 3).map((step, i) => (
              <div key={step}>
                <i>{i < 2 ? "✓" : "!"}</i>
                <span>
                  {step}
                  <small>{i < 2 ? "模拟完成" : "等待你的确认"}</small>
                </span>
                <b>{i < 2 ? "DONE" : "PAUSED"}</b>
              </div>
            ))}
            <small>人工接管 &nbsp; ↗</small>
          </div>
        )}
      </div>
      <span className="vibe-preview-caption">
        {project.demo.available === false
          ? "PRODUCT FLOW / PRD"
          : "INTERACTIVE PROTOTYPE"}
      </span>
    </div>
  );
}
