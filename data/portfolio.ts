import { asset } from "@/lib/asset";

// 资料来源：用户提供的《李家福-1.pdf》（2026-09-17）。
// 项目日期、现场截图、课程和爱好未提供，保留为空，不推断或编造。
export const profile = {
  name: "李家福",
  englishName: "LI JIAFU",
  initials: "LJ",
  role: "AI Product / AI 产品方向",
  description:
    "从业务痛点出发，把大模型做成真正有人用的产品——想清楚、做出来、跑通验证，我自己走完这一遍",
  tags: ["AI 产品", "Prompt 设计", "Agent / RAG", "产品验证"],
  email: "1943547541@qq.com",
  phone: "19883507096",
  location: "2026 届 · 本科",
  status: "聚焦大模型应用、智能体与企业知识问答",
  // 只有 portrait 由 Hero 的 <img> 直接渲染，那里已经调用 asset()，
  // 因此这里保留原始路径，避免出现 /ku/ku/... 的双重前缀。
  portrait: "/images/lijiafu-portrait.png",
  resumeUrl: asset("/resume.pdf"),
  available: "期待 AI 产品方向的新机会",
};
export const navigation = [
  { id: "about", label: "关于我" },
  { id: "education", label: "教育背景" },
  { id: "experience", label: "工作经历" },
  { id: "projects", label: "Vibe Coding作品" },
  { id: "skills", label: "技能与爱好" },
  { id: "contact", label: "联系我" },
];
export const education = [
  {
    period: "2022 — 2026",
    degree: "本科",
    major: "园林",
    school: "绍兴理工学院",
    abbr: "",
    image: "/images/campus-library.webp",
    caption: "从园林专业出发，走向 AI 产品实践。",
    courses: "",
    note: "LEARNING PATH / 2022 — 2026",
  },
];
export const experience = [
  {
    period: "2025.12 — 2026.02",
    company: "杭州中恒建筑有限公司",
    role: "产品助理 · 实习",
    title: "把一线流程痛点，转化为产品优化",
    description:
      "负责内部项目管理系统的需求调研与业务梳理，访谈一线业务人员，对齐真实使用场景。独立输出完整 PRD，联动设计、研发推进需求评审、开发与上线交付，并沉淀用户反馈报告。",
    result:
      "跟进版本 A/B 测试，优化任务分配逻辑，提升项目任务流转效率，为后续版本规划提供依据。",
    metrics: [
      { value: "20%", label: "项目任务流转效率提升" },
      { value: "3 份", label: "独立输出完整 PRD" },
    ],
    tags: ["需求调研", "PRD", "A/B 测试"],
    image: "",
    note: "让需求评审、开发与交付连起来",
    place: "HANGZHOU · 2025 — 2026",
  },  {
    period: "2026.03 — 2026.07",
    company: "绍兴市携创科技有限公司",
    role: "产品助理 · 实习",
    title: "围绕真实对话，迭代 AI 客服",
    description:
      "承接 AI 客服产品需求分析与迭代优化，梳理用户反馈和对话日志，定位高频业务痛点。设计 Prompt 调优方案与知识库标准化更新机制，协同算法、运营团队完成评审与落地。",
    result:
      "持续开展产品验证与版本迭代，提升机器人首轮问题解决率，减少人工转接与运营成本。",
    metrics: [{ value: "15%", label: "首轮问题解决率提升" }],
    tags: ["AI 客服", "Prompt 调优", "知识库更新"],
    image: "",
    note: "从用户反馈到产品迭代",
    place: "SHAOXING · 2026",
  },

];
export type ProjectPanel = {
  title: string;
  summary: string;
  value: string;
  metric: string;
  items: string[];
};
export type Project = {
  id: string;
  name: string;
  en: string;
  category: string;
  date: string;
  description: string;
  features: string[];
  color: string;
  url: string;
  slides: string[];
  images: string[];
  panels: ProjectPanel[];
  outcomes: string[];
};
export const projects: Project[] = [
  {
    id: "01",
    name: "AIGC 生成工作台",
    en: "AIGC DESIGN WORKBENCH",
    category: "AI 产品 / 建筑设计",
    date: "",
    description:
      "面向企业内部建筑设计师，针对出图效率低、效果不可控的痛点，提供一站式 AI 生成能力，融入方案设计、投标比稿与效果优化流程。",
    features: [
      "用户调研与竞品分析，明确 MVP 范围与优先级",
      "规划文生方案、文生效果图、风格迁移三大功能",
      "搭建多智能体工作流与建筑领域 Prompt 模板库",
    ],
    color: "lavender",
    url: "",
    slides: ["业务场景", "产品规划", "生成工作流", "项目成果"],
    images: [],
    panels: [
      {
        title: "把 AI 生成融入建筑设计流程",
        summary:
          "服务建筑内容创作团队，覆盖从方案初稿到效果优化的日常设计场景。",
        value: "82%",
        metric: "日常基础设计需求覆盖",
        items: ["方案初稿生成", "效果图风格转译", "批量方案变体输出"],
      },
      {
        title: "先明确 MVP，再定义交付优先级",
        summary:
          "通过用户调研与竞品分析锚定核心用户，输出 PRD，定义首版功能边界。",
        value: "3 项",
        metric: "核心功能规划",
        items: ["文生方案", "文生效果图", "风格迁移"],
      },
      {
        title: "让多个智能体协同完成生成",
        summary:
          "沉淀建筑领域专属 Prompt 模板，联动技术侧调优生成规则，并闭环校验效果质量。",
        value: "4 → 2.3 h",
        metric: "单方案初稿平均产出时长",
        items: ["多智能体协同", "领域 Prompt 模板", "效果质量校验"],
      },
      {
        title: "用设计团队的实际产出来衡量",
        summary:
          "日均支持产出方案稿 126 份；内容生成效率较人工提升 42%，后期修改工作量减少 35%。",
        value: "58% → 87%",
        metric: "生成内容直接可用率",
        items: ["126 份 / 日", "生成效率 +42%", "修改工作量 −35%"],
      },
    ],
    outcomes: [
      "设计团队日均产出方案稿 126 份。",
      "内容生成效率较人工提升 42%；单方案初稿平均产出时长由 4 小时缩短至 2.3 小时。",
      "生成内容直接可用率由 58% 提升至 87%，后期修改工作量减少 35%。",
      "覆盖业务部门 82% 的日常基础设计需求。",
    ],
  },
  {
    id: "02",
    name: "制度问答机器人",
    en: "HR POLICY ASSISTANT",
    category: "AI 产品 / 企业知识问答",
    date: "",
    description:
      "面向 200 人规模企业，围绕年假、报销、考勤三类高频 HR 制度咨询，打造基于 RAG 的 FAQ 智能问答机器人，减少重复咨询的人工处理。",
    features: [
      "主导需求拆解与全量 PRD，划分三级功能优先级",
      "设计问答规则与合规边界，高风险问题转人工",
      "建立隔离评测集、服务降级与版本回滚机制",
    ],
    color: "mint",
    url: "",
    slides: ["业务场景", "需求与边界", "RAG 问答链路", "上线成果"],
    images: [],
    panels: [
      {
        title: "把重复的制度咨询交给知识问答",
        summary: "适配新员工入职、月末报销等高峰场景，服务企业内部员工。",
        value: "200 人",
        metric: "全公司覆盖规模",
        items: ["年假咨询", "报销制度", "考勤规则"],
      },
      {
        title: "在业务目标与合规边界之间取舍",
        summary: "输出全量 PRD，组织跨方评审；高风险问题强制转人工兜底。",
        value: "3 级",
        metric: "功能优先级划分",
        items: ["需求拆解", "问答业务规则", "高风险人工兜底"],
      },
      {
        title: "让回答可评测，让服务可回退",
        summary: "基于 RAG 架构设计完整处理链路，把控响应时效与运行成本。",
        value: "≥90%",
        metric: "核心制度问题答复准确率",
        items: ["隔离评测集", "服务降级", "版本回滚"],
      },
      {
        title: "零新增预算，按期完成上线",
        summary:
          "两周完成试用版上线，达成 HR 重复制度咨询人工处理量下降 50% 的业务目标。",
        value: "50%",
        metric: "HR 人工处理量下降",
        items: ["2 周试用版上线", "零新增预算", "高风险问题 100% 拦截"],
      },
    ],
    outcomes: [
      "零新增人力与采购预算，2 周完成试用版上线。",
      "覆盖全公司 200 名员工。",
      "核心制度问题答复准确率 ≥90%，高风险问题 100% 拦截。",
      "HR 重复制度咨询人工处理量下降 50%。",
    ],
  },
];
export const files = [
  {
    category: "PRODUCT / RESEARCH",
    name: "从业务痛点出发",
    keywords: ["用户调研", "竞品分析", "KANO"],
    level: "项目实践",
    detail:
      "访谈一线业务人员，梳理真实使用场景与流程痛点；通过用户调研和竞品分析明确核心用户与优化方向。",
    example: "相关经历：内部项目管理系统需求调研、AIGC 工作台产品策划。",
    type: "skill",
    art: "radar",
  },
  {
    category: "PRODUCT / DELIVERY",
    name: "把需求写清楚",
    keywords: ["PRD", "MVP", "优先级"],
    level: "独立输出",
    detail:
      "独立输出完整 PRD，定义 MVP 交付范围与功能优先级；联动设计、研发与业务团队推进评审、开发和交付。",
    example: "相关经历：独立输出 3 份 PRD；制度问答机器人三级功能优先级划分。",
    type: "skill",
    art: "radar",
  },
  {
    category: "AI / PROMPT",
    name: "让提示词贴近业务",
    keywords: ["Prompt Engineering", "模板库", "调优"],
    level: "项目实践",
    detail:
      "围绕业务场景设计 Prompt 方案，沉淀领域专属模板，并结合用户反馈与对话日志持续调优。",
    example: "相关项目：建筑领域 Prompt 模板库、AI 客服 Prompt 调优。",
    type: "skill",
    art: "orbit",
  },
  {
    category: "AI / AGENT",
    name: "把智能体串成工作流",
    keywords: ["Agent", "Workflow", "MCP"],
    level: "项目实践",
    detail:
      "搭建多智能体协同生成工作流，联动技术侧优化生成规则。技能覆盖 Agent / Workflow 设计及 MCP 接入。",
    example: "相关项目：AIGC 生成工作台的多智能体协同生成流程。",
    type: "skill",
    art: "orbit",
  },
  {
    category: "AI / KNOWLEDGE",
    name: "让知识支撑回答",
    keywords: ["RAG", "知识库优化", "标准化更新"],
    level: "项目实践",
    detail:
      "基于 RAG 设计企业问答处理链路，建立知识库标准化更新机制，让制度知识与业务问答保持一致。",
    example: "相关项目：制度问答机器人；AI 客服知识库更新机制。",
    type: "skill",
    art: "orbit",
  },
  {
    category: "AI / EVALUATION",
    name: "为 AI 结果设一道关",
    keywords: ["模型评测", "幻觉治理", "风险兜底"],
    level: "项目实践",
    detail:
      "设计隔离评测集、服务降级与版本回滚机制；定义合规边界，高风险问题强制转人工，把控响应时效与成本。",
    example: "相关项目：制度问答核心准确率 ≥90%，高风险问题 100% 拦截。",
    type: "skill",
    art: "radar",
  },
  {
    category: "DESIGN / TOOLS",
    name: "用原型推动讨论",
    keywords: ["Figma", "Xmind", "交互设计"],
    level: "工具能力",
    detail:
      "使用 Figma、Xmind 支持功能设计、交互设计与结构化表达，将需求转化为便于跨团队讨论的方案。",
    example: "简历技能：功能设计、交互设计、Figma、Xmind。",
    type: "skill",
    art: "orbit",
  },
  {
    category: "DATA / TOOLS",
    name: "让迭代有数据依据",
    keywords: ["Excel 透视表 / VBA", "SQL 基础", "A/B 测试"],
    level: "SQL 基础 / 工具应用",
    detail:
      "运用 Excel 透视表与 VBA，掌握基础 SQL；跟进版本 A/B 测试，结合用户反馈支持产品优化和版本规划。",
    example: "相关经历：任务分配逻辑优化，项目任务流转效率提升 20%。",
    type: "skill",
    art: "radar",
  },
  {
    category: "BUILD / LOW CODE",
    name: "快速做出可验证的 Demo",
    keywords: ["Cursor", "Coze", "低代码"],
    level: "熟练使用",
    detail:
      "熟练使用 Cursor、Coze 等工具，快速完成产品验证与 Demo 搭建，将大模型应用想法转化为可讨论、可验证的方案。",
    example: "简历核心优势：低代码工具实践与产品验证。",
    type: "skill",
    art: "orbit",
  },
];
