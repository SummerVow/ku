import { ticketRoutingProject } from "./vibe-ticket-routing";

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
    kind: "search" | "creation" | "agent" | "ticket";
    available?: boolean;
    inputLabel: string;
    defaultInput: string;
    response: string;
    options: string[];
    steps: string[];
  };
}

// These are proposed design exercises, not the author's work history or research results.
const seeds = [
  {
    slug: "controlled-generation",
    index: "02",
    name: "可控生成",
    englishName: "Controlled Creation",
    type: "AI CREATION",
    accent: "mint",
    teardownTarget: "AI 图片或内容生成工具",
    userScenario:
      "用户能生成内容，但很难稳定控制结果，也不知道如何修改提示词。",
    productJudgment:
      "降低生成门槛的关键不是提供更多模板，而是让修改方向变得清晰。",
    validationGoal: "测试结构化修改建议是否能减少重复生成次数。",
    user: "缺乏提示词经验、需要稳定产出视觉草稿的内容创作者",
    context: "已有一版生成结果，但画面氛围与构图偏离最初意图。",
    currentSolution: "反复修改整段提示词，保存图片后在不同窗口对比。",
    friction: "知道哪里不满意，却无法把不满意转成可操作的修改指令。",
    journey: ["描述意图", "获得草稿", "选择修改维度", "对比版本", "保留结果"],
    mechanism: [
      "将修改拆成构图、色彩与信息密度",
      "保留不变项，记录每次调整",
      "并排展示版本与修改理由",
    ],
    strengths: ["快速外化视觉意图", "低成本探索多个方向"],
    frictions: ["同时修改太多变量，难以归因", "重新生成可能破坏已经满意的部分"],
    whyNow: "首次生成的门槛已降低，但从草稿到可用结果仍依赖反复试错。",
    decision: "只验证一次单维度修改与版本对比，不扩展为完整设计编辑器。",
    mvp: ["结构化修改方向", "保留原稿与新版本", "修改理由与版本对比"],
    nonGoals: [
      "不训练图像模型",
      "不提供专业图层编辑",
      "不承诺风格或商业版权结果",
    ],
    metrics: [
      "达到预设满意标准所需修改轮次（待采集）",
      "用户能否准确复述修改方向（待采集）",
    ],
    stories: [
      "作为内容创作者，我希望只调整配色而保留构图，以便稳定接近目标。",
      "我希望对比修改前后并知道改了什么，以便决定继续修改还是保留。",
    ],
    feature: "结构化修改",
    featureDescription:
      "选择一个修改方向后生成新的本地示意版本，保留初稿并显示本轮修改说明。",
    edge: "未填写意图时提示补充；未选择方向时不允许提交修改。",
    observation:
      "示例观察记录：如果用户无法解释两个版本的差异，需要加强变更说明，而不是增加选项。",
    task: "从默认草稿出发，仅调整一个维度，然后比较两版并说明保留哪一版。",
    next: "优先检查修改维度是否易懂，删掉无法被用户区分的选项。",
    demo: {
      kind: "creation",
      inputLabel: "描述创作意图",
      defaultInput: "为一本关于慢生活的刊物制作清爽的封面。",
      response: "这里用 CSS 图形演示版本变化，不会生成或上传真实图片。",
      options: ["更柔和的配色", "更聚焦的构图", "更多留白"],
      steps: ["描述意图", "选择方向", "对比版本"],
    },
  },
  {
    slug: "visible-agent",
    index: "03",
    name: "任务可见",
    englishName: "Visible Agent",
    type: "AI AGENT",
    accent: "blue",
    teardownTarget: "Agent 与自动化工作流产品",
    userScenario:
      "Agent 执行复杂任务时，用户不知道它正在做什么，也不知道什么时候需要介入。",
    productJudgment: "让 AI 的工作过程可见，比让它表现得更聪明更重要。",
    validationGoal: "测试任务状态、风险提示和人工接管入口是否能增加信任。",
    user: "希望委托重复任务、但需要保留关键决定权的业务人员",
    context: "Agent 已开始处理资料，任务将进入有外部影响的步骤。",
    currentSolution: "持续盯着执行日志，或等到结果不对时重新发起任务。",
    friction: "无法区分正常执行、卡住与需要本人确认的风险节点。",
    journey: ["设定任务", "查看计划", "逐步执行", "确认风险", "复核结果"],
    mechanism: [
      "把执行计划转换为可读的任务状态",
      "高风险节点暂停并请求确认",
      "允许用户接管、取消和重新开始",
    ],
    strengths: ["组合多个步骤完成一项任务", "降低重复操作负担"],
    frictions: [
      "技术日志不等于用户理解的进度",
      "用户介入时可能缺少必要的上下文",
    ],
    whyNow: "当任务可以连续执行，用户更需要知道授权边界以及何时需要介入。",
    decision: "先把一次任务的进度、暂停和接管讲清楚，再考虑更复杂的调度。",
    mvp: ["可读的步骤状态", "关键步骤确认", "人工接管与取消"],
    nonGoals: [
      "不实现真实工具调用",
      "不自动发送任何消息",
      "不支持多 Agent 协同与后台定时任务",
    ],
    metrics: [
      "用户正确识别需介入节点的情况（待记录）",
      "任务前后对过程可理解性的主观反馈（待采集）",
    ],
    stories: [
      "作为任务委托者，我希望知道当前步骤和下一步，以便判断是否继续等待。",
      "涉及外部操作时，我希望先确认或接管，以便控制影响范围。",
    ],
    feature: "风险暂停与接管",
    featureDescription:
      "运行到待确认节点时暂停；只有明确确认后才能继续。接管或取消后，自动步骤停止。",
    edge: "重复点击不应跳过确认；取消后保留当前状态并允许重置。",
    observation:
      "示例观察记录：如果用户看到风险提示后仍不知道影响范围，需要补充操作对象和撤回方式。",
    task: "推进一项模拟任务，在待确认节点判断继续、接管或取消，并说明原因。",
    next: "优先验证风险文案能否支持决策，再调整暂停时机。",
    demo: {
      kind: "agent",
      inputLabel: "描述要委托的任务",
      defaultInput: "整理本周项目资料，准备一份待审核的周报。",
      response: "所有步骤均为本地模拟，不会读取文件、发送周报或执行外部操作。",
      options: ["继续模拟", "人工接管", "取消任务"],
      steps: ["整理示例资料", "生成周报草稿", "确认交付范围", "完成模拟"],
    },
  },
] as const;

const placeholderProjects: VibeProject[] = seeds.map((s) => ({
  slug: s.slug,
  index: s.index,
  status: "placeholder",
  name: s.name,
  englishName: s.englishName,
  type: s.type,
  accent: s.accent,
  teardownTarget: s.teardownTarget,
  userScenario: s.userScenario,
  productJudgment: s.productJudgment,
  validationGoal: s.validationGoal,
  demoUrl: "",
  cover: "",
  stages: {
    scenario: false,
    requirements: false,
    prd: false,
    demo: false,
    validation: false,
  },
  overview: {
    user: s.user,
    context: s.context,
    currentSolution: s.currentSolution,
    friction: s.friction,
  },
  teardown: {
    coreUser: s.user,
    coreJob: s.task,
    journey: [...s.journey],
    mechanism: [...s.mechanism],
    strengths: [...s.strengths],
    frictions: [...s.frictions],
  },
  opportunity: {
    whyNow: s.whyNow,
    decision: s.decision,
    nonGoals: [...s.nonGoals],
  },
  // Generic solution patterns, not claims about researched commercial competitors.
  competitors: [
    {
      name: "通用对话式工具（示例类型）",
      user: s.user,
      scenario: "通过对话完成一次任务",
      value: "表达门槛低",
      journey: "输入 → 回答 → 追问",
      controllability: "通过提示词间接控制",
      trust: "需额外核对过程和依据",
      intervention: "追加对话或重新开始",
      boundary: "不默认保留结构化过程",
    },
    {
      name: "专业工作流工具（示例类型）",
      user: "有明确流程与工具经验的用户",
      scenario: s.context,
      value: "显式配置过程与节点",
      journey: "配置 → 执行 → 检查",
      controllability: "可配置节点，学习成本待评估",
      trust: "依赖过程记录与人工审核",
      intervention: "手动编辑流程或参数",
      boundary: "复杂配置可能阻碍初次使用",
    },
    {
      name: `${s.name}（拟议方案）`,
      user: s.user,
      scenario: s.userScenario,
      value: s.decision,
      journey: s.journey.join(" → "),
      controllability: s.mvp[0],
      trust: "保留不确定性，效果待验证",
      intervention: s.mvp[2],
      boundary: s.nonGoals[0],
    },
  ],
  requirements: {
    targetUser: s.user,
    jobToBeDone: `当${s.context}我希望${s.decision}以便完成当前任务。`,
    problem: s.friction,
    goal: s.validationGoal,
    successMetrics: [...s.metrics],
    boundaries: ["当前仅为前端交互原型，不处理真实业务数据。", ...s.nonGoals],
    mvp: [...s.mvp],
    nonGoals: [...s.nonGoals],
  },
  prd: {
    background: s.context,
    problem: s.friction,
    userStories: [...s.stories],
    flow: [...s.journey],
    features: [
      {
        name: "任务输入",
        priority: "P0",
        description:
          "允许编辑示例输入，并在开始前保留修改内容；不向任何服务发送输入。",
        states: ["默认示例", "用户编辑", "空输入提示"],
        edgeCases: ["纯空格输入提示重新填写；输入最多 300 字。"],
      },
      {
        name: s.feature,
        priority: "P0",
        description: s.featureDescription,
        states: ["待操作", "操作中", "已更新", "已重置"],
        edgeCases: [s.edge],
      },
      {
        name: "结果反馈与重置",
        priority: "P1",
        description:
          "结果附带示例说明，状态变化提供可读反馈；可回到初始状态重新体验。",
        states: ["示例结果", "待核验", "初始状态"],
        edgeCases: ["离开页面后本地状态不保留；不得暗示已存储到云端。"],
      },
    ],
    tracking: [
      "计划：记录开始任务、核心操作、完成或退出事件。",
      "计划：对异常与重复操作做归因，不采集输入原文。",
      "本版未接入埋点服务，真实测试前需明确采集范围。",
    ],
    successMetrics: [...s.metrics],
    outOfScope: [...s.nonGoals],
  },
  validation: {
    hypothesis: s.validationGoal,
    users: "待进行真实用户验证；招募与样本规模待确定。",
    tasks: [s.task, "复述当前状态，并指出仍不确定的地方。"],
    observations: [
      s.observation,
      "示例观察记录仅说明未来记录方式，不代表已经观察到的行为。",
    ],
    result: "验证数据待补充。尚不能判断假设是否成立。",
    learnings: ["待真实测试后归纳，不以原型可操作代替用户价值被验证。"],
    nextIteration: [
      s.next,
      "根据观察记录决定保留、删除或修改，当前仅为预设方向。",
    ],
  },
  iteration: {
    confirmed: "尚无已验证假设。",
    rejected: "尚无被否定假设。",
    keep: `拟保留：${s.mvp[0]}，需真实验证后决定。`,
    remove: "暂不决定删除项；根据测试中的使用情况判断。",
    next: s.next,
  },
  demo: { ...s.demo, options: [...s.demo.options], steps: [...s.demo.steps] },
}));

export const vibeProjects: VibeProject[] = [
  ticketRoutingProject,
  ...placeholderProjects,
];
export const findVibeProject = (slug: string) =>
  vibeProjects.find(
    (project) =>
      project.slug === (slug === "trusted-answer" ? "ticket-routing" : slug),
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
