"use client";
import { useState } from "react";
import type { VibeProject } from "@/data/vibe-projects";
import { asset } from "@/lib/asset";
export default function VibeDemoShell({ project }: { project: VibeProject }) {
  if (project.demo.embedUrl && project.demo.available !== false) {
    return (
      <div className={`vibe-demo vibe-${project.accent}`}>
        <div className="vibe-demo-header">
          <span>LIVE DEMO / {project.index}</span>
          <a
            className="vibe-action"
            href={asset(project.demoUrl)}
            target="_blank"
            rel="noopener noreferrer"
          >
            在新窗口打开 ↗
          </a>
        </div>
        <p className="vibe-demo-notice">{project.demo.response}</p>
        <iframe
          className="vibe-live-demo"
          src={project.demo.embedUrl ? asset(project.demo.embedUrl) : project.demoUrl}
          title={`${project.name}交互 Demo`}
          loading="lazy"
          sandbox="allow-scripts allow-same-origin allow-forms allow-downloads allow-popups allow-popups-to-escape-sandbox"
          allow="clipboard-write"
          referrerPolicy="no-referrer"
        />
      </div>
    );
  }
  if (project.demo.available === false) {
    return (
      <div className={`vibe-demo vibe-${project.accent}`}>
        <p className="vibe-demo-notice">{project.demo.response}</p>
        <ol className="vibe-flow">
          {project.demo.steps.map((step) => (
            <li key={step}>{step}</li>
          ))}
        </ol>
      </div>
    );
  }
  return <InteractiveDemo project={project} />;
}
function InteractiveDemo({ project }: { project: VibeProject }) {
  const { demo } = project;
  const [input, setInput] = useState(demo.defaultInput);
  const [started, setStarted] = useState(false);
  const [error, setError] = useState("");
  const [checked, setChecked] = useState<number[]>([]);
  const [direction, setDirection] = useState(0);
  const [version, setVersion] = useState(0);
  const [appliedDirection, setAppliedDirection] = useState(0);
  const [step, setStep] = useState(0);
  const [agentState, setAgentState] = useState<
    "idle" | "running" | "paused" | "complete" | "takeover" | "cancelled"
  >("idle");
  const [message, setMessage] = useState("选择操作，体验一次本地产品流程。");
  const reset = () => {
    setInput(demo.defaultInput);
    setStarted(false);
    setError("");
    setChecked([]);
    setVersion(0);
    setDirection(0);
    setAppliedDirection(0);
    setStep(0);
    setAgentState("idle");
    setMessage("已重置，可以重新体验。");
  };
  const nextStep = () => {
    if (agentState !== "running" && agentState !== "paused") return;
    const next = step + 1;
    setStep(next);
    const state =
      next >= demo.steps.length - 1
        ? "complete"
        : next === demo.steps.length - 2
          ? "paused"
          : "running";
    setAgentState(state);
    setMessage(
      state === "complete"
        ? "模拟完成，没有执行外部操作。"
        : state === "paused"
          ? "已暂停，请确认交付范围或人工接管。"
          : `正在模拟：${demo.steps[next]}`,
    );
  };
  return (
    <div className={`vibe-demo vibe-${project.accent}`}>
      <div className="vibe-demo-header">
        <span>LOCAL PROTOTYPE / {project.index}</span>
        <button type="button" className="vibe-action" onClick={reset}>
          重置原型 ↺
        </button>
      </div>
      <p className="vibe-demo-notice">
        当前为前端交互原型，尚未接入真实 AI 服务。
      </p>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          if (!input.trim()) {
            setError("请先填写内容，再开始体验。");
            return;
          }
          setError("");
          setStarted(true);
          setChecked([]);
          if (demo.kind === "creation") {
            setVersion((v) => v + 1);
            setAppliedDirection(direction);
            setMessage(
              `已生成示意版本，修改方向：${demo.options[direction]}。`,
            );
          } else if (demo.kind === "agent") {
            setStep(0);
            setAgentState("running");
            setMessage(`开始模拟：${demo.steps[0]}`);
          } else {
            setMessage("已展示示例答案，请展开来源并人工检查。");
          }
        }}
      >
        <label htmlFor={`demo-input-${project.slug}`}>{demo.inputLabel}</label>
        <textarea
          id={`demo-input-${project.slug}`}
          value={input}
          maxLength={300}
          onChange={(event) => setInput(event.target.value)}
          aria-invalid={!!error}
          aria-describedby={`demo-help-${project.slug}`}
          rows={2}
        />
        <small id={`demo-help-${project.slug}`}>
          {error || "最多 300 字 · 仅在当前页面使用，不上传、不保存"}
        </small>
        {demo.kind === "creation" && (
          <fieldset>
            <legend>选择一个修改方向</legend>
            <div className="vibe-demo-options">
              {demo.options.map((option, index) => (
                <label key={option}>
                  <input
                    type="radio"
                    name={`direction-${project.slug}`}
                    checked={direction === index}
                    onChange={() => setDirection(index)}
                  />
                  {option}
                </label>
              ))}
            </div>
          </fieldset>
        )}
        <button
          className="vibe-action vibe-action-primary"
          type="submit"
          disabled={
            demo.kind === "agent" &&
            (agentState === "running" || agentState === "paused")
          }
        >
          {demo.kind === "search"
            ? "查看示例答案"
            : demo.kind === "creation"
              ? "生成示意版本"
              : "开始模拟任务"}{" "}
          →
        </button>
      </form>
      <div className="vibe-live-status" role="status">
        {message}
      </div>
      {demo.kind === "search" && (
        <div className="vibe-demo-result">
          {!started ? (
            <p>提交问题后，在这里查看示例答案与证据卡片。</p>
          ) : (
            <>
              <h4>示例答案 · 不构成事实依据</h4>
              <p>{demo.response}</p>
              {demo.options.map((option, index) => (
                <details key={option}>
                  <summary>
                    {option}
                    <span>
                      {checked.includes(index) ? "已人工查看" : "待查看"}
                    </span>
                  </summary>
                  <p>
                    示例证据：应比对研究对象、时间和方法。此处没有接入真实来源，仍需在实际产品中核验原文。
                  </p>
                  <button
                    className="vibe-action"
                    type="button"
                    aria-pressed={checked.includes(index)}
                    onClick={() => {
                      setChecked((old) =>
                        old.includes(index)
                          ? old.filter((value) => value !== index)
                          : [...old, index],
                      );
                      setMessage("查看记录已更新。已查看不代表结论已被证实。");
                    }}
                  >
                    {checked.includes(index)
                      ? "撤销查看标记"
                      : "标记已人工查看"}
                  </button>
                </details>
              ))}
            </>
          )}
        </div>
      )}
      {demo.kind === "creation" && (
        <>
          <p className="vibe-demo-explanation">{demo.response}</p>
          <div className="vibe-version-compare">
            <figure>
              <div className="vibe-artwork">
                <span>
                  SLOW
                  <br />
                  MOMENTS.
                </span>
                <i />
              </div>
              <figcaption>初稿 · 始终保留</figcaption>
            </figure>
            <figure>
              <div
                className={`vibe-artwork ${version ? `vibe-artwork-variant-${appliedDirection}` : "vibe-artwork-empty"}`}
              >
                {version ? (
                  <>
                    <span>
                      SLOW
                      <br />
                      MOMENTS.
                    </span>
                    <i />
                  </>
                ) : (
                  <p>选择方向后生成新版本</p>
                )}
              </div>
              <figcaption>
                {version
                  ? `V.${String(version + 1).padStart(2, "0")} · ${demo.options[appliedDirection]}`
                  : "修改版本待生成"}
              </figcaption>
            </figure>
          </div>
        </>
      )}
      {demo.kind === "agent" && (
        <>
          <p className="vibe-demo-explanation">{demo.response}</p>
          <ol className="vibe-agent-steps">
            {demo.steps.map((label, index) => (
              <li
                key={label}
                className={started && index === step ? "is-current" : ""}
              >
                <span>
                  {started && index < step
                    ? "✓"
                    : String(index + 1).padStart(2, "0")}
                </span>
                <p>
                  {label}
                  <small>
                    {!started || index > step
                      ? "未开始"
                      : index < step
                        ? "模拟完成"
                        : agentState === "paused"
                          ? "等待确认"
                          : agentState === "takeover"
                            ? "已人工接管"
                            : agentState === "cancelled"
                              ? "已取消"
                              : agentState === "complete"
                                ? "模拟完成"
                                : "模拟执行中"}
                  </small>
                </p>
              </li>
            ))}
          </ol>
          {agentState === "paused" && (
            <aside className="vibe-risk">
              <strong>确认后才继续</strong>
              <p>
                真实场景中，此节点将涉及向他人交付周报。请先检查对象与内容。本原型只演示状态，不会发送消息。
              </p>
            </aside>
          )}
          {(agentState === "running" || agentState === "paused") && (
            <div className="vibe-demo-controls">
              <button
                className="vibe-action vibe-action-primary"
                onClick={nextStep}
              >
                {agentState === "paused" ? "确认范围，继续模拟" : "推进下一步"}
              </button>
              <button
                className="vibe-action"
                onClick={() => {
                  setAgentState("takeover");
                  setMessage("已人工接管，自动流程停止。可重置后重新体验。");
                }}
              >
                人工接管
              </button>
              <button
                className="vibe-action"
                onClick={() => {
                  setAgentState("cancelled");
                  setMessage("已取消任务，没有执行任何外部操作。");
                }}
              >
                取消任务
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
