import { ticketRoutingProject } from "./vibe-ticket-routing";
import { midnightPressProject } from "./vibe-midnight-press";
import { aiProjectPusherProject } from "./vibe-ai-project-pusher";

export const artifacts = [
  { slug: "product-teardown", label: "产品拆解", number: "01" },
  { slug: "competitor-analysis", label: "竞品分析", number: "02" },
  { slug: "requirements", label: "需求定义", number: "03" },
  { slug: "prd", label: "PRD", number: "04" },
  { slug: "validation", label: "验证报告", number: "05" },
] as const;
export type ArtifactSlug = (typeof artifacts)[number]["slug"];
export interface VibeProject {
  slug: string;
  index: string;
  status: "placeholder" | "in-progress" | "validated";
  statusLabel?: string;
  contextNote?: string;
  competitorNote?: string;
  sources?: Array<{ title: string; url: string }>;
  name: string;
  englishName: string;
  type: string;
  accent: "lavender" | "mint" | "blue";
  teardownTarget: string;
  userScenario: string;
  productJudgment: string;
  validationGoal: string;
  demoUrl: string;
  cover?: string;
  stages: {
    scenario: boolean;
    requirements: boolean;
    prd: boolean;
    demo: boolean;
    validation: boolean;
  };
  overview: {
    user: string;
    context: string;
    currentSolution: string;
    friction: string;
  };
  teardown: {
    coreUser: string;
    coreJob: string;
    journey: string[];
    mechanism: string[];
    strengths: string[];
    frictions: string[];
  };
  opportunity: { whyNow: string; decision: string; nonGoals: string[] };
  competitors: Array<{
    name: string;
    user: string;
    scenario: string;
    value: string;
    journey: string;
    controllability: string;
    trust: string;
    intervention: string;
    boundary: string;
  }>;
  requirements: {
    targetUser: string;
    jobToBeDone: string;
    problem: string;
    goal: string;
    successMetrics: string[];
    boundaries: string[];
    mvp: string[];
    nonGoals: string[];
  };
  prd: {
    background: string;
    problem: string;
    userStories: string[];
    flow: string[];
    features: Array<{
      name: string;
      priority: "P0" | "P1" | "P2";
      description: string;
      states: string[];
      edgeCases: string[];
    }>;
    tracking: string[];
    successMetrics: string[];
    outOfScope: string[];
  };
  validation: {
    label?: string;
    hypothesis: string;
    users: string;
    tasks: string[];
    observations: string[];
    result: string;
    learnings: string[];
    nextIteration: string[];
  };
  iteration: {
    confirmed: string;
    rejected: string;
    keep: string;
    remove: string;
    next: string;
  };
  demo: {
    kind: "search" | "creation" | "agent" | "ticket" | "newsroom";
    available?: boolean;
    embedUrl?: string;
    inputLabel: string;
    defaultInput: string;
    response: string;
    options: string[];
    steps: string[];
  };
}

export const vibeProjects: VibeProject[] = [
  ticketRoutingProject,
  midnightPressProject,
  aiProjectPusherProject,
];
export const findVibeProject = (slug: string) =>
  vibeProjects.find(
    (project) =>
      project.slug === (slug === "trusted-answer" ? "ticket-routing" : slug === "controlled-generation" ? "midnight-press" : slug),
  );
export const findArtifact = (slug: string) =>
  artifacts.find((artifact) => artifact.slug === slug);
export const projectStatus = (project: VibeProject) =>
  project.statusLabel ??
  (project.status === "placeholder"
    ? "示例内容 / 待替换"
    : project.status === "in-progress"
      ? "进行中"
      : "已完成验证");
