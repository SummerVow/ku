"use client";
import { useState, useRef, useEffect } from "react";
import { ArrowUp, ArrowUpRight, Check, Copy } from "lucide-react";
import { profile } from "@/data/portfolio";
export default function Contact() {
  const [copied, setCopied] = useState(false),
    [fallback, setFallback] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const input = useRef<HTMLInputElement>(null);
  useEffect(
    () => () => {
      if (timer.current) clearTimeout(timer.current);
    },
    [],
  );
  useEffect(() => {
    if (fallback) {
      input.current?.focus();
      input.current?.select();
    }
  }, [fallback]);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      if (timer.current) clearTimeout(timer.current);
      timer.current = setTimeout(() => setCopied(false), 2600);
    } catch {
      setFallback(true);
    }
  };
  return (
    <section className="contact chapter" id="contact">
      <div className="contact-card reveal">
        <div className="contact-orb" aria-hidden="true" />
        <div className="contact-top">
          <p className="eyebrow">
            <span>05</span> / LET’S TALK
          </p>
          <span className="availability">
            <i />
            {profile.available}
          </span>
        </div>
        <h2>
          下一段经历，
          <br />
          也许可以一起<span>创建。</span>
          <span className="contact-star" aria-hidden="true">
            ✳
          </span>
        </h2>
        <p className="contact-description">
          期待加入认真做产品的团队，也期待和有趣的人一起，
          <br className="desktop-break" />
          把值得做的事情，变成真实发生的事情。
        </p>
        <div className="contact-actions">
          <a className="button button-cream" href={`mailto:${profile.email}`}>
            写邮件给我 <ArrowUpRight size={17} />
          </a>
          <button className="button button-ghost" onClick={copy}>
            {copied ? "邮箱已复制" : "复制邮箱"}
            {copied ? <Check size={15} /> : <Copy size={15} />}
          </button>
          <a
            className="button button-ghost"
            href={profile.resumeUrl}
            target="_blank"
            rel="noreferrer"
          >
            查看简历.pdf <ArrowUpRight size={16} />
          </a>
        </div>
        <p className="contact-email">
          {profile.email}
          <span className="contact-phone">
            电话 <a href={`tel:${profile.phone}`}>{profile.phone}</a>
          </span>
        </p>
        {fallback && (
          <div className="copy-fallback">
            <label htmlFor="email-copy">
              暂时无法自动复制，请选中邮箱手动复制：
            </label>
            <input id="email-copy" ref={input} value={profile.email} readOnly />
            <button
              onClick={() => setFallback(false)}
              aria-label="关闭手动复制"
            >
              关闭
            </button>
          </div>
        )}
        <span className="sr-only" role="status">
          {copied ? "邮箱已复制到剪贴板" : ""}
        </span>
        <footer className="contact-footer">
          <span>
            © 2026 {profile.englishName}. <span>保持好奇，持续创造。</span>
          </span>
          <a href="#about">
            回到顶部 <ArrowUp size={15} />
          </a>
        </footer>
      </div>
      <div className="colophon section-shell">
        <span>DESIGNED WITH INTENTION. BUILT WITH CURIOSITY.</span>
        <span>
          一份仍在生长的个人档案 <span>✳</span>
        </span>
      </div>
    </section>
  );
}
