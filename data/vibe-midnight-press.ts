import type { VibeProject } from "./vibe-projects";

// Concise product interpretation of the supplied implementation and VERIFICATION.md.
// Technical checks are not user research or evidence of business improvement.
export const midnightPressProject: VibeProject = {
  slug: "midnight-press",
  index: "02",
  status: "in-progress",
  statusLabel: "自主实践 / 联调中",
  contextNote: "依据现有项目整理。展示版使用演示样稿；真实生成链路尚未通过端到端验收，用户效果待验证。",
  name: "午夜编辑室",
  englishName: "Midnight Press",
  type: "AI WORKFLOW / CONTENT CREATION",
  accent: "mint",
  teardownTarget: "微博、小红书图文与短视频生成工作流",
  userScenario: "同一条新闻要发多个平台，运营反复改文案、找配图、写分镜。",
  productJudgment: "共用事实，分平台表达；先审校文案，再按需制作素材。",
  validationGoal: "验证多平台草稿与单项重试能否减少改稿、搬运和返工。",
  // chatgpt.site 独立站默认带 ChatGPT 登录门禁，未登录请求返回 401，代码侧关不掉。
  // 这里指向站内免登录副本：public/demos 会被任何部署一起带上。
  // 若日后在 ChatGPT 侧把线上站点设为公开，可换回：
  // https://li-jiafu-midnight-press.ggnb6666.chatgpt.site
  demoUrl: "/demos/midnight-press/index.html",
  stages: { scenario: true, requirements: true, prd: true, demo: true, validation: false },
  overview: {
    user: "需要兼顾微博、小红书和短视频的内容运营。",
    context: "拿到一份新闻或活动原稿，要整理成各平台可审核的内容包。",
    currentSolution: "在写作、配图和视频工具间切换，逐个平台改写与整理版本。",
    friction: "同一事实反复输入；一次修改可能牵连文案、配图和镜头。",
  },
  teardown: {
    coreUser: "独立运营与小型内容团队，画像为当前产品假设。",
    coreJob: "把一份原稿变成三类可编辑、可审校、可导出的草稿。",
    journey: ["输入原稿", "判断平台适配", "生成渠道草稿", "编辑与制作素材", "核对并导出"],
    mechanism: ["同源内容拆成微博短文、小红书笔记与短视频口播和分镜。", "各渠道独立翻页；素材逐项制作、保留错误并支持重试。"],
    strengths: ["把文案、配图建议和分镜放在同一编辑台，减少搬运。", "不适合的渠道可跳过，避免为了三平台而强行生成。"],
    frictions: ["原始工作流返回空内容，输出契约仍需真实样本校准。", "媒体授权尚未打通；事实与素材仍需人工核验。"],
  },
  opportunity: {
    whyNow: "重复改写与整理素材有明确步骤，适合先验证一稿多平台的交付流程。",
    decision: "先交付可审核的内容包，把生成、审校和发布分开。",
    nonGoals: ["不自动发布，不承诺爆款或流量增长。", "不做完整剪辑器；本期不合成整条视频。"],
  },
  competitorNote: "参考官方功能说明做方案对照，未进行同题实测。扣子是底层编排方案，CapCut 是视频环节替代方案；效果与使用成本待比较。",
  sources: [
    { title: "扣子：大模型节点", url: "https://docs.coze.cn/guides_llm_node" },
    { title: "扣子：批处理节点", url: "https://docs.coze.cn/guides_batch_node" },
    { title: "CapCut：AI 脚本写作", url: "https://www.capcut.com/tools/ai-writer" },
  ],
  competitors: [
    { name: "扣子工作流", user: "流程搭建者", scenario: "编排模型与批量任务", value: "把提示词与节点组合成流程", journey: "配置 → 运行 → 检查输出", controllability: "配置提示词、变量与异常处理", trust: "节点输出仍需校验", intervention: "调整节点或异常分支", boundary: "编辑台与交付格式需自行设计" },
    { name: "CapCut AI Writer", user: "视频创作者", scenario: "从主题整理视频脚本", value: "脚本可编辑并进入视频制作", journey: "输入主题 → 脚本 → 编辑 / 视频", controllability: "人工调整脚本", trust: "文案与画面需人工复核", intervention: "编辑脚本、调整视频", boundary: "本次仅比较视频环节" },
    { name: "午夜编辑室（本项目）", user: "多平台内容运营", scenario: "同一原稿生成三类草稿", value: "渠道适配、独立版本与内容包", journey: "原稿 → 分渠道 → 审校 → 导出", controllability: "文案可改，素材可单项重试", trust: "标记演示数据，保留人工审核", intervention: "逐刊改稿、跳过与重试", boundary: "展示版可体验，真实生成待联调" },
  ],
  requirements: {
    targetUser: "首期聚焦一人维护多个平台的内容运营。",
    jobToBeDone: "收到一份新闻后，我希望快速获得各平台草稿，把时间留给事实核对和表达调整。",
    problem: "平台写法不同，文案与素材分散，局部失败容易造成整批返工。",
    goal: "完成从原稿到可编辑内容包的最小闭环。",
    successMetrics: ["待测：完成同一份内容包的耗时与人工改稿次数。", "待测：事实错误、渠道适配问题和素材重试次数。"],
    boundaries: ["生成内容是草稿，发布前人工核对事实与来源。", "展示版只演示预置样稿；真实接口需先通过联调。"],
    mvp: ["原稿输入、分渠道草稿与不适配跳过。", "独立版本编辑、单项素材状态、复制与内容包导出。"],
    nonGoals: ["不接管账号发布，不做流量预测。", "不做团队审批、定时发布与整片剪辑。"],
  },
  prd: {
    background: "多平台运营围绕同一原稿反复改写、制作和搬运素材。",
    problem: "在保留事实与人工判断的前提下，减少重复编辑和局部返工。",
    userStories: ["运营可并排检查三平台草稿，分别编辑和翻阅版本。", "某张图或某个镜头失败时，只重试该项，保留已完成内容。"],
    flow: ["输入原稿", "分渠道判断", "文案校样", "按需制作素材", "人工核对与导出"],
    features: [
      { name: "输入与执行反馈", priority: "P0", description: "输入原稿，展示执行状态；支持停止。真实接口与演示模式明确区分。", states: ["待输入 → 执行中 → 完成 / 失败 / 停止"], edgeCases: ["空输入拦截；空返回和连接中断明确报错，不伪造结果。"] },
      { name: "分渠道审校", priority: "P0", description: "微博、小红书、短视频各自保留版本与编辑内容；不适配则跳过。", states: ["草稿就绪 / 跳过 → 编辑 → 复制"], edgeCases: ["渠道缺字段时给出说明；翻页不能串改其他版本。"] },
      { name: "素材制作与重试", priority: "P0", description: "按配图建议和分镜逐项制作，失败仅影响当前素材。", states: ["待制作 → 制作中 → 完成 / 失败"], edgeCases: ["超时或授权失败保留文案；停止浏览器请求不等于撤销上游任务。"] },
      { name: "导出内容包", priority: "P1", description: "导出全部版本文案与素材链接，交由人工审核后发布。", states: ["可导出 → 已下载"], edgeCases: ["未完成素材标为待制作；链接可能过期，不视为永久归档。"] },
    ],
    tracking: ["计划记录开始、完成、失败、重试、编辑和导出事件。", "本版无业务埋点；测试先记录任务耗时与错误类型。"],
    successMetrics: ["同题比较人工流程与辅助流程的耗时、改稿量和事实准确性，尚无实测结论。"],
    outOfScope: ["自动发布、账号系统、整片合成与团队协作不纳入本期。"],
  },
  validation: {
    label: "技术验证有记录 / 用户效果待验证",
    hypothesis: "同源分渠道草稿与局部重试，可减少跨工具整理和重复制作。",
    users: "现有材料是开发验证记录，未提供真实运营用户测试。",
    tasks: ["检查输入解析、独立版本编辑、错误隔离和内容导出。", "后续用同一原稿对比人工制作与辅助制作，记录耗时和错误。"],
    observations: ["项目 2026-09-14 记录：8 项测试通过，版本编辑与素材错误状态可隔离。", "同日联调：工作流有完整回执但返回空内容；生图、生视频均授权失败。"],
    result: "已具备可体验的前端流程，真实生成闭环未通过。效率与内容质量假设尚不能成立或否定。",
    learnings: ["收到执行回执不等于拿到可用内容；应把非空结果与有效素材列为验收条件。"],
    nextIteration: ["先核对输入参数、真实输出样本与媒体授权，再做端到端验收。", "链路可用后邀请目标运营完成任务，对照人工流程验证价值。"],
  },
  iteration: {
    confirmed: "技术记录支持独立版本与错误隔离；用户价值仍待测试。",
    rejected: "“收到成功回执即可视为生成成功”不成立，必须检查实际内容。",
    keep: "保留分渠道审校、局部重试与人工导出。",
    remove: "本期排除自动发布和整片合成。",
    next: "优先打通非空工作流输出与媒体授权，再测运营任务。",
  },
  demo: {
    kind: "newsroom",
    available: true,
    embedUrl: "/demos/midnight-press/index.html",
    inputLabel: "新闻原稿",
    defaultInput: "为同一条新闻准备微博、小红书与短视频草稿。",
    response: "已接入午夜编辑室展示版。可切换样稿、编辑与导出；不调用真实 AI，分镜静帧不代表已生成视频。",
    options: ["微博 · 热点短文", "小红书 · 图文笔记", "短视频 · 口播分镜"],
    steps: ["输入原稿", "分渠道草稿", "人工审校", "导出内容包"],
  },
};
