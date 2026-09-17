"use client";
import { useRef, useState } from "react";
import { vibeProjects } from "@/data/vibe-projects";
import SectionHeading from "@/components/portfolio/SectionHeading";
import VibeProjectCard from "./VibeProjectCard";
export default function VibeLabSection() {
  const rail = useRef<HTMLDivElement>(null);
  const [current, setCurrent] = useState(0);
  const go = (index: number) => {
    const el = rail.current;
    const card = el?.children[index] as HTMLElement | undefined;
    if (el && card)
      el.scrollTo({
        left: card.offsetLeft - (el.children[0] as HTMLElement).offsetLeft,
        behavior: matchMedia("(prefers-reduced-motion: reduce)").matches
          ? "instant"
          : "smooth",
      });
  };
  return (
    <section id="vibe-lab" className="vibe-lab" aria-label="Vibe Product Lab">
      <SectionHeading
        number="03B"
        eyebrow="VIBE PRODUCT LAB"
        title="把产品判断，做成可以体验的东西"
      />
      <div className="vibe-lab-intro">
        <p>从拆解一款 AI 产品开始，完成需求、PRD、原型与一轮验证。</p>
        <span>FROM PRODUCT TEARDOWN TO WORKING PROTOTYPE.</span>
      </div>
      <div className="vibe-lab-note">
        <span>OPEN ARCHIVE / {vibeProjects.length} FILES</span>
        <p>
          {vibeProjects.every((project) => project.status === "placeholder")
            ? "示例实验档案 · 内容待替换，真实用户验证尚未开展"
            : "从产品判断到验证记录，打开一份完整档案"}
        </p>
      </div>
      <div
        className="vibe-grid"
        ref={rail}
        onScroll={() => {
          const el = rail.current;
          if (!el) return;
          const children = Array.from(el.children) as HTMLElement[];
          const first = children[0].offsetLeft;
          setCurrent(
            children.reduce(
              (best, item, index) =>
                Math.abs(item.offsetLeft - first - el.scrollLeft) <
                Math.abs(children[best].offsetLeft - first - el.scrollLeft)
                  ? index
                  : best,
              0,
            ),
          );
        }}
      >
        {vibeProjects.map((project, index) => (
          <VibeProjectCard key={project.slug} project={project} order={index} />
        ))}
      </div>
      <div className="vibe-pagination">
        <span aria-live="polite">
          {String(current + 1).padStart(2, "0")} /{" "}
          {String(vibeProjects.length).padStart(2, "0")}
        </span>
        <div>
          {vibeProjects.map((project, index) => (
            <button
              key={project.slug}
              onClick={() => go(index)}
              aria-label={`显示${project.name}`}
              aria-pressed={current === index}
            >
              <i />
            </button>
          ))}
        </div>
        <span>滑动翻阅 →</span>
      </div>
    </section>
  );
}
