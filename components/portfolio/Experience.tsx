import { ArrowUpRight, Quote } from "lucide-react";
import { experience } from "@/data/portfolio";
import SectionHeading from "./SectionHeading";
import PhotoPlaceholder from "./PhotoPlaceholder";
export default function Experience() {
  return (
    <section className="experience section-shell chapter" id="experience">
      <SectionHeading
        number="02"
        eyebrow="THE PRACTITIONER"
        title="我在真实现场做过什么"
        aside="把问题想清楚，也把事情往前推一步。"
      />
      <div className="timeline">
        {experience.map((item, index) => (
          <article
            className={`timeline-row reveal ${index % 2 ? "reversed" : ""}`}
            key={item.company}
          >
            <span className="timeline-node">0{index + 1}</span>
            <div className="experience-card">
              <div className="job-meta">
                <span>{item.period}</span>
                <span className="role-pill">{item.role}</span>
              </div>
              <h3>
                {item.company}
                <ArrowUpRight size={22} strokeWidth={1} />
              </h3>
              <h4>{item.title}</h4>
              <p className="job-description">{item.description}</p>
              <div className="job-result">
                <Quote size={15} />
                <p>{item.result}</p>
              </div>
              <div className="job-metrics">
                {item.metrics.map((metric) => (
                  <div key={metric.label}>
                    <strong>{metric.value}</strong>
                    <span>{metric.label}</span>
                  </div>
                ))}
              </div>
              <div className="job-tags">
                {item.tags.map((tag) => (
                  <span key={tag}>{tag}</span>
                ))}
              </div>
            </div>
            <div className="field-notes">
              <div className="grid-paper" />
              <span className="field-label">FIELD NOTE / 0{index + 1}</span>
              <figure className="polaroid">
                <span className="photo-tape" />
                <div className={`field-photo field-photo-${index}`}>
                  <PhotoPlaceholder
                    label="留给工作现场的一帧"
                    index={`0${index + 1}`}
                    image={item.image}
                    alt={item.note}
                  />
                </div>
                <figcaption>
                  {item.note}
                  <span>{item.place}</span>
                </figcaption>
              </figure>
              <span className="hand-note">
                {index === 0
                  ? "good things take a team."
                  : index === 1
                    ? "listen first, design later."
                    : "it all starts with a question."}
              </span>
              <span className="note-star" aria-hidden="true">
                ✳
              </span>
            </div>
          </article>
        ))}
      </div>
      <p className="sample-note">
        * 经历与成果依据个人简历整理，现场照片待补充。
      </p>
    </section>
  );
}
