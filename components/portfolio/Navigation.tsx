"use client";
import { useEffect, useState } from "react";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { navigation, profile } from "@/data/portfolio";
export default function Navigation() {
  const [active, setActive] = useState("about"),
    [open, setOpen] = useState(false);
  useEffect(() => {
    let observer: IntersectionObserver;
    const registered = new Set<Element>();
    const watchSections = () => {
      navigation.forEach(({ id }) => {
        const el = document.getElementById(id);
        if (el && !registered.has(el)) {
          observer.observe(el);
          registered.add(el);
        }
      });
    };
    const observe = () => {
      observer?.disconnect();
      registered.clear();
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) setActive(entry.target.id);
          });
        },
        {
          rootMargin: `-${Math.round(innerHeight * 0.2)}px 0px -${Math.round(innerHeight * 0.55)}px 0px`,
          threshold: 0,
        },
      );
      watchSections();
    };
    observe();
    const mutations = new MutationObserver(watchSections);
    mutations.observe(document.body, { childList: true, subtree: true });
    window.addEventListener("resize", observe);
    return () => {
      observer.disconnect();
      mutations.disconnect();
      window.removeEventListener("resize", observe);
    };
  }, []);
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);
  return (
    <header className="nav-wrap">
      <nav className="navigation" aria-label="主导航">
        <a
          className="brand"
          href="#about"
          onClick={() => setOpen(false)}
          aria-label={`${profile.name}，返回首页`}
        >
          <span className="brand-icon">
            {profile.initials.toLowerCase()}
            <span>✳</span>
          </span>
          <span>
            PORTFOLIO<span className="brand-year"> / 2026</span>
          </span>
        </a>
        <div
          className={`nav-links ${open ? "is-open" : ""}`}
          id="navigation-links"
        >
          {navigation.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className={active === item.id ? "active" : ""}
              aria-current={active === item.id ? "location" : undefined}
              onClick={() => setOpen(false)}
            >
              {item.label}
            </a>
          ))}
        </div>
        <a
          className="nav-resume"
          href={profile.resumeUrl}
          target="_blank"
          rel="noreferrer"
        >
          简历.pdf <ArrowUpRight size={15} />
        </a>
        <button
          className="menu-toggle icon-button"
          aria-label={open ? "关闭菜单" : "打开菜单"}
          aria-expanded={open}
          aria-controls="navigation-links"
          onClick={() => setOpen(!open)}
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </nav>
    </header>
  );
}
