"use client";
import { useEffect } from "react";
import Navigation from "./Navigation";
import Hero from "./Hero";
import Education from "./Education";
import Experience from "./Experience";
import Projects from "./Projects";
import SkillFiles from "./SkillFiles";
import Contact from "./Contact";
export default function Portfolio() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("visible");
            observer.unobserve(e.target);
          }
        }),
      { threshold: 0.08 },
    );
    // Streaming and hot reload can mount a section after the page effect runs.
    // Only hide elements once they are actively observed; without JS, all content remains readable.
    const observeSections = () => {
      document
        .querySelectorAll(".reveal:not(.is-observed):not(.visible)")
        .forEach((el) => {
          el.classList.add("is-observed");
          observer.observe(el);
        });
    };
    observeSections();
    const mutations = new MutationObserver(observeSections);
    mutations.observe(document.getElementById("main")!, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ["class"],
    });
    return () => {
      observer.disconnect();
      mutations.disconnect();
    };
  }, []);
  return (
    <>
      <div className="aurora" aria-hidden="true" />
      <div className="paper-grain" aria-hidden="true" />
      <a className="skip-link" href="#main">
        跳到主要内容
      </a>
      <Navigation />
      <main id="main">
        <Hero />
        <Education />
        <Experience />
        <Projects />
        <SkillFiles />
        <Contact />
      </main>
    </>
  );
}
