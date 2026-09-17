"use client";
import { useState, useRef, useEffect } from "react";
import { ArrowUpRight, RotateCw, Shuffle, Sparkles } from "lucide-react";
import { files } from "@/data/portfolio";
import SectionHeading from "./SectionHeading";
function FileArt({ type }: { type: string }) {
  return (
    <div className={`file-art ${type}`} aria-hidden="true">
      {type === "radar" ? (
        <svg viewBox="0 0 260 210">
          <g fill="none" stroke="#a897bc" strokeWidth=".65">
            {[1, 0.75, 0.5, 0.25].map((s) => (
              <polygon
                key={s}
                points="130,15 223,80 188,186 72,186 37,80"
                transform={`translate(${130 * (1 - s)} ${105 * (1 - s)}) scale(${s})`}
              />
            ))}
            <path d="M130 15V105L223 80M130 105L188 186M130 105L72 186M130 105L37 80" />
          </g>
          <polygon
            points="130,28 212,84 169,157 77,177 61,88"
            fill="#a891c842"
            stroke="#927aaf"
            strokeWidth="1.4"
          />
          <circle cx="130" cy="105" r="5" fill="#9980b8" />
        </svg>
      ) : type === "sun" ? (
        <>
          <span className="art-sun" />
          <span className="art-horizon" />
          <span className="sun-line" />
        </>
      ) : type === "mountain" ? (
        <>
          <span className="art-mountain one" />
          <span className="art-mountain two" />
          <span className="mountain-sun" />
        </>
      ) : (
        <>
          <span className="orbit-ring ring-one" />
          <span className="orbit-ring ring-two" />
          <span className="orbit-ring ring-three" />
          <span className="orbit-core">✳</span>
          <span className="orbit-dot dot-a" />
          <span className="orbit-dot dot-b" />
          <span className="orbit-small-star">✧</span>
        </>
      )}
    </div>
  );
}
export default function SkillFiles() {
  const [index, setIndex] = useState(0),
    [flipped, setFlipped] = useState(false),
    [drawing, setDrawing] = useState(false);
  const bag = useRef<number[]>([]);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);
  useEffect(
    () => () => {
      timers.current.forEach(clearTimeout);
    },
    [],
  );
  const draw = () => {
    if (drawing || files.length < 2) return;
    setDrawing(true);
    setFlipped(true);
    if (!bag.current.length) {
      bag.current = files.map((_, i) => i).filter((i) => i !== index);
      for (let i = bag.current.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [bag.current[i], bag.current[j]] = [bag.current[j], bag.current[i]];
      }
    }
    const next = bag.current.pop()!;
    timers.current.forEach(clearTimeout);
    timers.current = [
      setTimeout(() => {
        setIndex(next);
        setFlipped(false);
      }, 340),
      setTimeout(() => setDrawing(false), 900),
    ];
  };
  const card = files[index];
  return (
    <section className="skills section-shell chapter" id="skills">
      <SectionHeading
        number="04"
        eyebrow="SKILLS & LIFE"
        title="随机抽取一张我的档案卡"
        aside="关于产品与 AI 的实践积累。"
      />
      <div className="files-stage reveal">
        <div className="files-left">
          <span className="files-pretitle">PRODUCT THINKING. AI PRACTICE.</span>
          <div
            className={`card-stack ${drawing ? "shuffling" : ""}`}
            aria-hidden="true"
          >
            <div className="stack-layer layer-three" />
            <div className="stack-layer layer-two" />
            <div className="stack-layer layer-one" />
            <div className="stack-cover">
              <div className="stack-top">
                <span>
                  PERSONAL
                  <br />
                  COLLECTION
                </span>
                <Sparkles size={19} strokeWidth={1} />
              </div>
              <div className="stack-title">
                MY
                <br />
                FILES<span>PRODUCT × AI</span>
              </div>
              <div className="stack-bottom">
                <span>
                  {String(files.length).padStart(2, "0")} CARDS INSIDE
                </span>
                <span>↗</span>
              </div>
            </div>
          </div>
          <div className="files-count">
            <span>{String(files.length).padStart(2, "0")} 张档案</span>
            <i />
            <span>
              {String(files.filter((f) => f.type === "skill").length).padStart(
                2,
                "0",
              )}{" "}
              技能
            </span>
            <i />
            <span>生活档案待补充</span>
          </div>
          <button
            className="button draw-button"
            onClick={draw}
            disabled={drawing || files.length < 2}
          >
            <Shuffle size={15} />
            {drawing ? "正在翻阅…" : "随机抽一张"}
            <span>✦</span>
          </button>
          <p className="draw-hint">每次相遇，多认识我一点。</p>
        </div>
        <div className="files-connector" aria-hidden="true">
          <svg viewBox="0 0 150 80">
            <path
              d="M6 40 Q69 1 132 36 M118 21L134 37 112 44"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.2"
            />
          </svg>
          <span>a little surprise</span>
        </div>
        <div className="file-result">
          <div className={`file-perspective ${drawing ? "drawing" : ""}`}>
            <button
              className={`skill-card ${flipped ? "flipped" : ""} ${card.type === "life" ? "life-card" : ""}`}
              onClick={() => !drawing && setFlipped(!flipped)}
              aria-label={`${card.name}，${flipped ? "查看正面" : "翻面查看详情"}`}
              aria-pressed={flipped}
              disabled={drawing}
            >
              <div className="file-face file-front" aria-hidden={flipped}>
                <div className="file-top">
                  <span>{card.category}</span>
                  <span>FILE / {String(index + 1).padStart(2, "0")}</span>
                </div>
                <FileArt type={card.art} />
                <div className="file-bottom">
                  <span className="file-type">
                    {card.type === "skill"
                      ? "关于我如何工作"
                      : "关于我如何生活"}
                  </span>
                  <h3>{card.name}</h3>
                  <div className="file-keywords">
                    {card.keywords.map((k) => (
                      <span key={k}>{k}</span>
                    ))}
                  </div>
                  <div className="flip-hint">
                    <span>轻点卡片，看看另一面</span>
                    <RotateCw size={14} />
                  </div>
                </div>
              </div>
              <div className="file-face file-back" aria-hidden={!flipped}>
                <div className="file-top">
                  <span>BEHIND THE FILE</span>
                  <ArrowUpRight size={18} />
                </div>
                <span className="back-star">✳</span>
                <h3>{card.name}</h3>
                <p>{card.detail}</p>
                <div className="proficiency">
                  <span>{card.type === "skill" ? "实践程度" : "生活状态"}</span>
                  <strong>{card.level}</strong>
                </div>
                <p className="file-example">{card.example}</p>
                <div className="flip-hint">
                  <span>轻点，回到正面</span>
                  <RotateCw size={14} />
                </div>
              </div>
            </button>
          </div>
          <div className="file-counter" aria-live="polite">
            <strong>{String(index + 1).padStart(2, "0")}</strong>
            <span />
            <span>{String(files.length).padStart(2, "0")}</span>
            <small>{card.type === "skill" ? "SKILL CARD" : "LIFE CARD"}</small>
          </div>
          <span className="sr-only" role="status">
            {drawing ? "正在抽卡" : `当前档案：${card.name}`}
          </span>
        </div>
      </div>
    </section>
  );
}
