"use client";
import { useState, useRef, useEffect } from "react";
import { ArrowLeft, ArrowRight, ArrowUpRight, X } from "lucide-react";
import { projects, type Project } from "@/data/portfolio";
import SectionHeading from "./SectionHeading";
import ProjectPreview from "./ProjectPreview";
import VibeLabSection from "@/components/vibe/VibeLabSection";
function ProjectDemo({
  project,
  onClose,
}: {
  project: Project;
  onClose: () => void;
}) {
  const dialog = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    const el = dialog.current;
    const opener =
      document.activeElement instanceof HTMLElement
        ? document.activeElement
        : null;
    el?.showModal();
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      if (el?.open) el.close();
      document.body.style.overflow = previous;
      opener?.focus({ preventScroll: true });
    };
  }, []);
  return (
    <dialog
      ref={dialog}
      className={`project-dialog ${project.color}`}
      onCancel={onClose}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      aria-labelledby={`dialog-${project.id}`}
    >
      <div className="dialog-heading">
        <div>
          <span className="eyebrow">PROJECT ARCHIVE / 项目详情</span>
          <h3 id={`dialog-${project.id}`}>{project.name}</h3>
        </div>
        <button className="icon-button" onClick={onClose} aria-label="关闭作品">
          <X size={19} />
        </button>
      </div>
      <p className="demo-intro">{project.description}</p>
      <div className="case-detail-block">
        <h4>我的职责</h4>
        <ul>
          {project.features.map((f) => (
            <li key={f}>{f}</li>
          ))}
        </ul>
      </div>
      <div className="case-detail-block">
        <h4>项目成果</h4>
        <ul>
          {project.outcomes.map((f) => (
            <li key={f}>{f}</li>
          ))}
        </ul>
      </div>
      <p className="demo-disclaimer">
        以上内容依据个人简历整理。项目日期、真实截图与演示链接待补充。
      </p>
    </dialog>
  );
}
export function ProjectCarousel({ project }: { project: Project }) {
  const [slide, setSlide] = useState(0),
    [demo, setDemo] = useState(false);
  const touch = useRef<number | null>(null);
  const change = (direction: number) =>
    setSlide(
      (v) => (v + direction + project.slides.length) % project.slides.length,
    );
  return (
    <article className={`project-card ${project.color} reveal`}>
      <div
        className="project-visual"
        role="region"
        aria-roledescription="轮播"
        aria-label={`${project.name}项目界面`}
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "ArrowLeft" || e.key === "ArrowRight") {
            e.preventDefault();
            change(e.key === "ArrowLeft" ? -1 : 1);
          }
        }}
        onTouchStart={(e) => {
          touch.current = e.touches[0].clientX;
        }}
        onTouchEnd={(e) => {
          if (touch.current !== null) {
            const delta = e.changedTouches[0].clientX - touch.current;
            if (Math.abs(delta) > 50) change(delta > 0 ? -1 : 1);
            touch.current = null;
          }
        }}
      >
        <div className="project-visual-label">
          <span>SELECTED WORK / {project.id}</span>
          <span>✳</span>
        </div>
        <div key={slide} className="project-slide">
          {project.images[slide] ? (
            <img
              src={project.images[slide]}
              alt={project.slides[slide]}
              loading="lazy"
              width="960"
              height="650"
            />
          ) : (
            <ProjectPreview project={project} slide={slide} />
          )}
        </div>
        <div className="carousel-controls">
          <button
            className="icon-button"
            aria-label={`${project.name}：上一张`}
            onClick={() => change(-1)}
          >
            <ArrowLeft size={17} />
          </button>
          <div className="carousel-dots">
            {project.slides.map((label, i) => (
              <button
                key={label}
                className={i === slide ? "selected" : ""}
                aria-label={`${project.name}：${label}`}
                aria-current={i === slide ? "true" : undefined}
                onClick={() => setSlide(i)}
              >
                <span />
              </button>
            ))}
          </div>
          <span className="carousel-page" aria-live="polite">
            0{slide + 1} <i>/ 0{project.slides.length}</i>
          </span>
          <button
            className="icon-button"
            aria-label={`${project.name}：下一张`}
            onClick={() => change(1)}
          >
            <ArrowRight size={17} />
          </button>
        </div>
        <span className="slide-caption">{project.slides[slide]}</span>
      </div>
      <div className="project-information">
        <div className="project-meta">
          <span>{project.category}</span>
          <span>{project.date}</span>
        </div>
        <div className="project-title">
          <h3>{project.name}</h3>
          <span>{project.en}</span>
        </div>
        <p>{project.description}</p>
        <ul>
          {project.features.map((f) => (
            <li key={f}>
              <span>↗</span>
              {f}
            </li>
          ))}
        </ul>
        <div className="project-open">
          {project.url ? (
            <a
              className="button button-dark"
              href={project.url}
              target="_blank"
              rel="noreferrer"
            >
              查看项目详情 <ArrowUpRight size={17} />
            </a>
          ) : (
            <button
              className="button button-dark"
              onClick={() => setDemo(true)}
            >
              查看项目详情 <ArrowUpRight size={17} />
            </button>
          )}
          <span>PRODUCT DESIGN & DELIVERY</span>
        </div>
      </div>
      {demo && <ProjectDemo project={project} onClose={() => setDemo(false)} />}
    </article>
  );
}
export default function Projects() {
  return (
    <section className="projects section-shell chapter" id="projects">
      <SectionHeading
        number="03"
        eyebrow="THE CREATOR"
        title="把 AI 放进真实的业务现场"
        aside="从场景识别，到验证与交付。"
      />
      <div className="project-list">
        {projects.map((project) => (
          <ProjectCarousel key={project.id} project={project} />
        ))}
      </div>
      <p className="section-footnote">
        用业务结果，检验产品方案。
        <span>FROM BUSINESS NEEDS TO AI PRODUCTS.</span>
      </p>
      <VibeLabSection />
    </section>
  );
}
