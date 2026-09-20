import type { VibeProject } from "./vibe-projects";

// Condensed from the user's PRD, competitor canvas and PM simulator export.
// Simulator-generated launch metrics are deliberately not used as real outcomes.
export const ticketRoutingProject: VibeProject = {
  slug: "ticket-routing",
  index: "01",
  status: "in-progress",
  statusLabel: "自主实践 / 模拟案例",
  contextNote:
    "基于 PM 模拟案例完成需求、PRD 与竞品分析。业务规模为案例设定，真实效果待验证。",
  name: "工单智能分流",
  englishName: "Ticket Triage",
  type: "AI WORKFLOW / CUSTOMER SERVICE",
  accent: "lavender",
  teardownTarget: "智能客服工单系统",
  userScenario: "高峰期工单积压，客服反复分类、定级，紧急问题难以及时入队。",
  productJudgment: "先把工单分对，再谈自动回复；VIP 与低置信结果交给人工。",
  validationGoal: "验证分类是否可用，以及异常工单能否可靠转人工。",
  demoUrl: "https://li-jiafu-ticket-demo.ggnb6666.chatgpt.site",
  cover: "",
  stages: {
    scenario: true,
    requirements: true,
    prd: true,
    demo: true,
    validation: false,
  },
  overview: {
    user: "一线客服为主，客服组长负责复核与质量管理。",
    context: "案例设定：日均约 800 张工单，大促时超过 1600 张。",
    currentSolution:
      "人工逐单分类、定优先级，占用约 40% 客服工时（案例设定）。",
    friction: "历史标签口径不一，高峰期分类积压；VIP 误降级风险高。",
  },
  teardown: {
    coreUser: "每天处理工单的一线客服。",
    coreJob: "让工单带着正确分类与优先级，进入可处理的队列。",
    journey: ["接收工单", "分类定级", "风险分流", "入队处理", "修正回流"],
    mechanism: [
      "文本映射三级标签，结合业务规则判定优先级。",
      "VIP 强制复核；低置信转人工，保留上下文。",
    ],
    strengths: [
      "复用现有客服系统，聚焦分类这一环节。",
      "人工修正留痕，为后续迭代积累样本。",
    ],
    frictions: [
      "标签频繁调整，历史数据不能直接作为可靠标准。",
      "分类正确不等于服务闭环，仍依赖队列与人工处理。",
    ],
  },
  opportunity: {
    whyNow: "重复分类占用客服时间，适合先用小范围 POC 检查 AI 能否接手。",
    decision: "自建分类判定器，接入既有系统；先校准标签，再回放历史工单。",
    nonGoals: [
      "不做自动回复、内容审核。",
      "不重建客服平台，不扩展多渠道与智能派单。",
    ],
  },
  competitorNote:
    "依据本人竞品画布摘录，聚焦规则、流程与接口。具体版本能力及 AI 分类效果待试用核实。",
  competitors: [
    {
      name: "智齿科技",
      user: "客服团队",
      scenario: "规则路由与工单管理",
      value: "分类树、触发器与反馈闭环",
      journey: "配置规则 → 触发分流",
      controllability: "规则与 API 回写",
      trust: "AI 语义分类效果待测",
      intervention: "人工处理与反馈",
      boundary: "借鉴路由机制，效果单独验证",
    },
    {
      name: "网易七鱼",
      user: "客服与流程管理团队",
      scenario: "多步骤工单流转",
      value: "流程画布、节点 SLA",
      journey: "判断节点 → 分配处理",
      controllability: "第三方判定接口（版本待核）",
      trust: "判定结果需独立评测",
      intervention: "人工节点接手",
      boundary: "接入能力与采购版本待核",
    },
    {
      name: "美洽",
      user: "客服与营销团队",
      scenario: "工作流分派与时效管理",
      value: "自定义流程、触发器与 SLA 预警",
      journey: "触发条件 → 流程分派",
      controllability: "自定义工作流",
      trust: "AI 语义分类效果待测",
      intervention: "人工跟进异常",
      boundary: "流程自动化不等于分类准确",
    },
  ],
  requirements: {
    targetUser: "首批服务一线客服，优先保证分类与队列流转。",
    jobToBeDone:
      "高峰期，我希望工单被正确分类并排好优先级，把时间留给问题处理。",
    problem: "人工分类重复、标签不一致，高风险工单不能完全交给模型。",
    goal: "两周 POC 聚焦分类可用性与人工兜底。",
    successMetrics: [
      "验收目标：普通工单分类准确率 ≥85%。",
      "质量红线：VIP 不得误降级；响应目标 ≤3 秒。",
    ],
    boundaries: [
      "只通过现有客服系统 API 对接；敏感字段先脱敏。",
      "85% 是整体评测目标，单条工单置信度阈值需另行校准。",
    ],
    mvp: [
      "三级标签分类与优先级判定。",
      "VIP 复核、低置信转人工、故障暂存与告警。",
    ],
    nonGoals: ["自动回复不纳入本期。", "运营看板为 P1，复杂性能优化为 P2。"],
  },
  prd: {
    background: "工单分类是队列入口，高峰积压会拖慢后续处理。",
    problem: "在减少人工分类的同时，确保 VIP 和不确定结果有人兜底。",
    userStories: [
      "客服直接承接已分类工单，减少重复判断。",
      "复核人员收到完整上下文，可纠正分类并留下记录。",
    ],
    flow: [
      "接收与脱敏",
      "分类定级",
      "VIP / 低置信拦截",
      "回写入队",
      "修正回流",
    ],
    features: [
      {
        name: "分类与定级",
        priority: "P0",
        description: "输出三级标签、优先级和置信度；低置信结果不自动入队。",
        states: ["待分类 → 待校验 → 可入队"],
        edgeCases: ["无效输入引导补充，模型超时转人工。"],
      },
      {
        name: "VIP 复核与异常兜底",
        priority: "P0",
        description: "VIP 一律人工确认，复核前不得流转；关键异常保留告警。",
        states: ["待复核 → 人工确认 / 修正"],
        edgeCases: ["VIP 标识取自客户档案，模型不得自行修改。"],
      },
      {
        name: "系统对接与回写",
        priority: "P0",
        description: "复用现有 API，回写须幂等；故障时先暂存，避免丢单。",
        states: ["待回写 → 已入队 / 已暂存"],
        edgeCases: ["排期压缩时，复杂自动重试延后，基础兜底保留。"],
      },
    ],
    tracking: [
      "记录分类结果、人工修正、转人工原因与耗时。",
      "VIP 异常、接口失败和模型超时触发告警。",
    ],
    successMetrics: ["以隔离评测集计算准确率，同时检查 VIP 拦截与分类耗时。"],
    outOfScope: ["本期不做自动回复；看板和复杂重试后续迭代。"],
  },
  validation: {
    label: "模拟评审完成 / 实测待补",
    hypothesis: "分类判定与人工兜底结合，可减少重复劳动并守住高风险边界。",
    users: "已做开发、测试、业务三方模拟评审，尚无真实用户测试记录。",
    tasks: [
      "评审检查性能瓶颈、优先级、评测隔离与异常告警。",
      "下一步用 100–300 条脱敏工单回放，覆盖 VIP、低置信与接口故障。",
    ],
    observations: [
      "标签口径与评测集隔离是前置条件。",
      "范围压缩时保留异常告警，拒绝追加自动回复。",
    ],
    result: "模拟评审 6/6 问题通过；分类准确率、耗时和实际节省工时仍待实测。",
    learnings: ["方案评审通过，不代表分类效果已达标。"],
    nextIteration: ["先统一标签与错误判定口径，再验证分类和故障降级。"],
  },
  iteration: {
    confirmed: "模拟评审支持当前范围与兜底设计；效果假设待实测。",
    rejected: "暂无被实测否定的假设。",
    keep: "保留 VIP 复核、低置信转人工与关键异常告警。",
    remove: "本期排除自动回复与复杂重试。",
    next: "校准标签、封存评测集，验证分类与接口失败降级。",
  },
  demo: {
    kind: "ticket",
    embedUrl: "/demos/ticket-routing.html",
    available: true,
    inputLabel: "工单内容",
    defaultInput: "登录时收不到验证码。",
    response: "已接入交互 Demo。数据为演示样本，未连接真实模型或客服系统。",
    options: [
      "普通工单 → 分类入队",
      "VIP 工单 → 人工复核",
      "低置信 → 人工处理",
    ],
    steps: ["接收工单", "分类定级", "VIP / 低置信转人工", "确认后入队"],
  },
};
