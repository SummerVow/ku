import { ArrowRight, GraduationCap } from "lucide-react";
import { education } from "@/data/portfolio";
import SectionHeading from "./SectionHeading";
import PhotoPlaceholder from "./PhotoPlaceholder";
export function EducationCard({
  item,
  index,
}: {
  item: (typeof education)[number];
  index: number;
}) {
  return (
    <article className="education-card">
      <div className={`campus-photo campus-${index}`}>
        <PhotoPlaceholder
          label="在这里，放一张校园照片"
          index={`0${index + 1}`}
          image={item.image}
          alt={item.school + "校园"}
        />
        <span className="photo-caption">{item.caption}</span>
      </div>
      <div className="school-seal" aria-label={item.school + "校徽占位"}>
        <GraduationCap size={22} strokeWidth={1} />
        <span>{item.abbr}</span>
      </div>
      <div className="education-body">
        <div className="education-meta">
          <span>{item.period}</span>
          <span>{item.degree}</span>
        </div>
        <h3>{item.school}</h3>
        <p className="education-major">{item.major}</p>
        {item.courses && <p className="education-courses">{item.courses}</p>}
        <span className="education-note">{item.note}</span>
      </div>
    </article>
  );
}
export default function Education() {
  return (
    <section className="education section-shell chapter" id="education">
      <SectionHeading
        number="01"
        eyebrow="LEARNING PATH"
        title="我的学习坐标"
        aside="每一段学习，都在拓宽看世界的方式。"
      />
      <div
        className={`education-container reveal ${education.length === 1 ? "single-education" : ""}`}
      >
        {education.map((item, index) => (
          <EducationCard key={item.school} item={item} index={index} />
        ))}
        {education.length > 1 && (
          <div className="learning-bridge">
            <span>成长路径</span>
            <ArrowRight size={18} strokeWidth={1} />
          </div>
        )}
      </div>
      <p className="section-footnote">
        从园林专业出发，在产品实践中继续学习。
        <span>ALWAYS A STUDENT OF LIFE.</span>
      </p>
    </section>
  );
}
