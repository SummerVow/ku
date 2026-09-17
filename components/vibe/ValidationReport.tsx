import type { VibeProject } from "@/data/vibe-projects";
import { TextList } from "./PrdDocument";
export default function ValidationReport({
  project,
}: {
  project: VibeProject;
}) {
  const { validation } = project;
  return (
    <div className="vibe-prose">
      <div className="vibe-validation-banner">
        <span>VALIDATION STATUS</span>
        <h3>
          {validation.label ??
            (project.status === "placeholder"
              ? "待进行真实用户验证"
              : "验证记录")}
        </h3>
      </div>
      <h3>验证假设</h3>
      <p>{validation.hypothesis}</p>
      <h3>测试用户</h3>
      <p>{validation.users}</p>
      <h3>测试任务</h3>
      <TextList items={validation.tasks} />
      <h3>观察记录</h3>
      <TextList items={validation.observations} />
      <h3>结果与假设判断</h3>
      <p>{validation.result}</p>
      <TextList items={validation.learnings} />
      <h3>下一轮调整</h3>
      <TextList items={validation.nextIteration} />
    </div>
  );
}
