import type { VibeProject } from "@/data/vibe-projects";
export function TextList({ items }: { items: string[] }) {
  return (
    <ul className="vibe-list">
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  );
}
export default function PrdDocument({ project }: { project: VibeProject }) {
  const { prd } = project;
  return (
    <div className="vibe-prose">
      <h3>背景与问题定义</h3>
      <p>{prd.background}</p>
      <p>{prd.problem}</p>
      <h3>用户故事</h3>
      <TextList items={prd.userStories} />
      <h3>产品流程</h3>
      <ol className="vibe-flow">
        {prd.flow.map((step) => (
          <li key={step}>{step}</li>
        ))}
      </ol>
      <h3>功能需求与验收状态</h3>
      {prd.features.map((feature) => (
        <section className="vibe-feature" key={feature.name}>
          <h4>
            <span>{feature.priority}</span>
            {feature.name}
          </h4>
          <p>{feature.description}</p>
          <div className="vibe-two-columns">
            <div>
              <h5>页面状态</h5>
              <TextList items={feature.states} />
            </div>
            <div>
              <h5>异常状态与处理</h5>
              <TextList items={feature.edgeCases} />
            </div>
          </div>
        </section>
      ))}
      <h3>埋点计划</h3>
      <TextList items={prd.tracking} />
      <h3>成功指标</h3>
      <TextList items={prd.successMetrics} />
      <aside className="vibe-nongoals">
        <h3>本期不做</h3>
        <TextList items={prd.outOfScope} />
      </aside>
    </div>
  );
}
