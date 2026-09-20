import { ArrowDown, ArrowUpRight, Download, Plus } from "lucide-react";
import { profile } from "@/data/portfolio";
import { asset } from "@/lib/asset";
export default function Hero() {
  return (
    <section id="about" className="hero section-shell">
      <div className="hero-copy">
        <div className="hello load-in">
          <span /> HELLO / 你好，很高兴认识你
        </div>
        <h1 className="load-in delay-1">
          Hi, 我是
          <br />
          <span className="hero-name">
            {profile.name}
            <span className="name-star" aria-hidden="true">
              ✳
            </span>
            <span className="scan-texture" aria-hidden="true" />
          </span>
          <span className="name-en">{profile.englishName}.</span>
        </h1>
        <p className="hero-role load-in delay-2">
          {profile.role}
          <svg viewBox="0 0 310 13" aria-hidden="true">
            <path d="M4 8Q138 -1 304 6 M28 11Q178 3 284 10" />
          </svg>
        </p>
        <p className="hero-description load-in delay-2">
          {profile.description}
        </p>
        <div className="hero-tags load-in delay-3">
          {profile.tags.map((t, i) => (
            <span key={t}>
              <i className={`tag-dot dot-${i}`} />
              {t}
            </span>
          ))}
        </div>
        <div className="hero-actions load-in delay-3">
          <a className="button button-dark" href={profile.resumeUrl} download>
            下载简历 <Download size={16} />
          </a>
          <a className="button button-outline" href="#contact">
            联系我 <ArrowUpRight size={18} />
          </a>
        </div>
      </div>
      <div className="portrait-area load-in delay-2">
        <div className="portrait-halo" />
        <span className="orbit-label">A HUMAN BEHIND THE PRODUCT.</span>
        <div
          className={`portrait-frame ${profile.portrait ? "has-photo" : ""}`}
        >
          {profile.portrait ? (
            <>
              <img
                src={asset(profile.portrait)}
                alt={`${profile.name}的个人照片`}
                width="420"
                height="520"
                fetchPriority="high"
              />
              <div className="real-portrait-caption">
                <strong>{profile.name}</strong>
                <span>{profile.englishName}</span>
                <small>AI PRODUCT / 2026</small>
              </div>
            </>
          ) : (
            <div className="portrait-placeholder">
              <span className="portrait-topline">
                PERSONAL ARCHIVE <Plus size={14} />
              </span>
              <div className="portrait-blank">
                <span className="outline-head" />
                <span className="outline-body" />
              </div>
              <div className="portrait-caption">
                <span>
                  留一点空白，
                  <br />
                  等一个真实的我。
                </span>
                <small>YOUR PORTRAIT HERE</small>
              </div>
            </div>
          )}
        </div>
        <div className="portrait-sticker">
          <span>保持好奇</span>
          <i>Stay curious.</i>
        </div>
        <div className="now-card">
          <span>
            <i /> NOW / 当前方向
          </span>
          <p>{profile.status}</p>
          <small>
            探索中，也创造中 <ArrowUpRight size={15} />
          </small>
        </div>
        <span className="bubble bubble-one" />
        <span className="bubble bubble-two" />
        <span className="bubble bubble-three" />
        <span className="portrait-cross" aria-hidden="true">
          ✧
        </span>
        <span className="photo-index">FIG. 01 — A WORK IN PROGRESS</span>
      </div>
      <div className="hero-bottom">
        <span className="location">
          <i />
          {profile.location}
          <span className="local-time"> / 开放新的可能</span>
        </span>
        <a href="#education" className="scroll-cue">
          继续下滑，探索更多 <ArrowDown size={14} />
        </a>
        <span className="hero-edition">PERSONAL EDITION № 001</span>
      </div>
    </section>
  );
}
