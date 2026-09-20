#  AI 产品个人作品集

中文 AI 产品作品集，基于 React 19、TypeScript、Vinext / Vite 和 CSS。个人信息、教育、两段产品助理实习、两个项目与技能依据用户提供的《李家福-1.pdf》整理（2026-09-17）。成果数字按简历保留；未另行核验。证件照从原始 PDF 无损提取，下载文件为原始简历的完整副本。

## 本地运行

### Windows 双击启动（推荐）

在 `D:\作品集` 中双击 **启动作品集.cmd**。它会自动寻找 Node.js、启动本地服务，等首页真正就绪后再打开默认浏览器，无需先打开 Codex 或输入命令。电脑重启后，再双击一次即可。

启动窗口可以最小化，使用期间请保留；关闭窗口或按 Ctrl+C 会停止服务。重复双击会复用已启动的网站，不会重复开一个服务。常用地址为 `http://127.0.0.1:5173/`，单独保存网址不能替代启动本地服务。可右键启动文件，选择“发送到 → 桌面快捷方式”，以后从桌面双击。

启动器不安装开机自启，也不依赖之前的生产构建，修改项目后会直接展示最新源码。运行日志在 `.sites-runtime/portfolio-launcher.log`；遇到缺少 Node.js、依赖、端口占用或超时，会保留错误提示。项目搬到另一台电脑时，需先安装 Node.js 22.13+ 并运行一次 `pnpm install`。

### 命令行启动

需要 Node.js 22.13+ 与 pnpm。

```sh
pnpm install
pnpm dev
```

打开 http://localhost:5173 。

```sh
pnpm exec tsc --noEmit
pnpm build
pnpm start
```

生产预览地址以终端实际显示为准。构建输出在 `dist/`，使用 Cloudflare Worker 兼容服务，不是单独双击 HTML 的静态页面。无需数据库或环境密钥。

## 替换资料

在 `data/portfolio.ts` 中集中编辑：

- `profile`：姓名、姓名拼音、方向、介绍、邮箱、电话、个人照片、简历链接。未把实习经历推断为当前任职，也未推断现居城市。
- `education`：绍兴理工学院 2022—2026 年园林本科。单段教育使用独立布局，不再保留虚构硕士。
- `experience`：工作时间轴、职责、成果、指标和现场图片。
- `projects`：AIGC 生成工作台、制度问答机器人。`panels` 是轮播展示的案例说明，`outcomes` 为详情页成果，`images` 与 `url` 留待补充。
- `files`：九张依据简历整理的专业技能卡。SQL 明确标注基础，未新增 React / TypeScript 熟练度等未经提供的技能。爱好尚未提供，已去掉虚构摄影、徒步、阅读经历。

把真实素材放进 `public/images/`，将相应 `image` 或 `portrait` 字段改成 `/images/文件名.webp`。留空时继续展示空白占位。人物建议使用透明背景 PNG / WebP。图片拥有固定容器比例；首屏人物优先加载，其余图片懒加载。

`public/resume.pdf` 已替换为用户提供的原始两页简历，并校验内容完全相同。后续可直接用新简历覆盖。旧的示例 PDF 生成脚本已移除，避免误覆盖真实文件。

项目 `images` 与 `slides` 一一对应。图片为空时展示以简历为依据的案例说明，明确标注截图待补充。`url` 为空时，查看项目详情展示职责与成果；填入完整 https 链接后将打开真实项目。不再使用与个人经历无关的阅读或心情应用演示。项目时间未提供，保持为空。

页签标题和描述在 `app/layout.tsx`；网站配色、排版、响应式和动效在 `app/globals.css`；标识在 `public/favicon.svg`。

## 组件

`components/portfolio/` 包含独立导航、首屏、教育卡、工作时间轴、项目轮播、项目预览、技能档案卡、联系区及共用标题和图片占位组件。入口为 `app/page.tsx`。

## 交互与可访问性

- Intersection Observer 更新当前章节，导航锚点平滑滚动；手机菜单支持 Escape 关闭。
- 每个作品独立轮播，支持按钮、分页、左右方向键、触屏滑动。
- 原生 dialog 限制焦点在弹窗内，Escape 或关闭按钮返回作品。
- 技能卡支持键盘操作、3D 翻面和一轮内避免重复的随机抽取。
- 邮箱复制有成功状态；浏览器限制剪贴板时提供手动复制文本框。
- `prefers-reduced-motion` 关闭移动动画，键盘焦点可见，按钮具备无障碍名称。
- 按 1440、1024、768、390px 设计响应式布局。手机轮播按钮与主操作触控区域至少 44px。

## Vibe Product Lab（新增）

首页位置：两个真实项目之后、技能档案之前，锚点为 `/#vibe-lab`，仍归属“个人作品”导航。真实履历保存在 `data/portfolio.ts`，新增示例数据不会写入该文件。

### 替换项目与文档

项目入口为 `data/vibe-projects.ts`。第一个项目「工单智能分流」保存在 `data/vibe-ticket-routing.ts`；第二个项目「午夜编辑室」保存在 `data/vibe-midnight-press.ts`；第三个项目「AI 项目推进助手」保存在 `data/vibe-ai-project-pusher.ts`。三个案例都是真实项目材料，不再保留示例占位项目。组件统一读取 `vibeProjects`，替换文档不需要修改页面代码。

工单项目已依据用户提供的 PRD、竞品画布和 PM 修炼总结精简，标注“自主实践 / 模拟案例”。800 / 1600 张工单、40% 工时是案例设定；85% 准确率和 3 秒响应是目标，非实测成果。验证页保留模拟评审 6/6 通过，未使用模拟器生成的上线效果数据。竞品内容按原画布摘录，具体版本与分类效果待试用核实。准确率验收口径与单条置信度阈值分开表述。

- `slug` 决定案例与全部文档地址；已有分享地址使用后，尽量不要再更改。
- `name`、`type`、`userScenario`、`productJudgment`、`validationGoal` 用于档案封面。
- `overview`、`teardown`、`opportunity`、`competitors`、`requirements`、`prd`、`validation`、`iteration` 分别保存正文。同一数据用于完整案例和单独文档，不需要重复维护。
- `status: "placeholder"` 显示“示例内容 / 待替换”；真实项目开始后可改为 `in-progress`，只有真实验证完成且有材料支撑时才使用 `validated`。这不会自动改变正文，应同时替换示例文案。
- `stages` 表示材料进度。前两个项目的场景、需求、PRD 和交互 Demo 已补齐；第三个项目同样已补齐场景、需求、PRD 与本地交互原型；真实用户效果验证在三个项目中都仍为空心。
- 验证的样本、观察、数据和结论都集中在 `validation`；当前没有虚构人数或提升比例。`iteration` 单独维护被支持／否定的假设和下一版取舍。
- `competitors` 保存对比内容，`competitorNote` 说明材料来源与待核实范围，`sources` 可附参考链接。第三个项目为设计方法对照，并明确标注我方方案得分来自设计意图而非实测。

### 替换截图与 Demo

把截图放进 `public/images/`，把 `cover` 改为 `/images/文件名.webp`。留空时显示 CSS 构建的产品界面示意；图片懒加载、固定宽高比。建议截图比例约 1.48:1。

`demoUrl` 留空会显示禁用的“Demo 待接入”和说明，没有 `#` 空链接。填入完整可信的 `https://` 地址后，外部 Demo 在新标签页打开；填入站内路径（如 `/demos/midnight-press/index.html`）则在新标签页打开站内副本，组件用 `asset()` 补 `basePath`。外部地址与详情页里的本地前端原型分别管理。

`demo.kind` 选择 `search`、`creation` 或 `agent`；其余字段配置输入标签、默认文字、提示内容、选项和任务步骤。三个原型支持空输入提示、结果反馈与重置。搜索原型可查看证据并记录人工查看状态；生成原型保留初稿并比较结构化修改；Agent 在倒数第二步暂停确认，支持接管与取消。它们不调用 AI、不上传输入、不保存业务数据，也没有埋点服务。切换为不同业务机制的真实 Demo 时，优先填入外部地址；若要新增第四种内置交互机制，再扩展 `VibeDemoShell`。

### 路由与组件

完整案例：`/vibe/ticket-routing`、`/vibe/midnight-press`、`/vibe/ai-project-pusher`。
工单项目现使用 `/vibe/ticket-routing`；旧的 `/vibe/trusted-answer` 及五份文档地址会重定向到对应新地址。用户提供的单文件 Demo 已原样复制到 `public/demos/ticket-routing.html`，由 `demo.embedUrl` 指定详情页内嵌预览；替换该文件即可更新本地预览，不依赖原电脑的 `file:///` 路径。所有“体验 Demo”按钮使用 `demoUrl`，现指向独立部署的 https://li-jiafu-ticket-demo.ggnb6666.chatgpt.site（当前仅本人可访问）。线上 Demo 需单独重新发布，本地文件修改不会自动同步。Demo 使用模拟数据，不代表真实业务上线或验证结果。`demo.available: false` 时仅显示核心流程。

工单 Demo 单独发布，未上传作品集中的简历或个人资料。其发布目录位于 `.sites-runtime/ticket-demo-site`，`.openai/hosting.json` 保留部署标识；请保留该目录以便后续更新同一网址。

### 第二个项目：午夜编辑室

`data/vibe-midnight-press.ts` 集中存放项目介绍与五份简版文档。案例地址为 `/vibe/midnight-press`，成果物地址在后面附加 `product-teardown`、`competitor-analysis`、`requirements`、`prd`、`validation`。旧的 `/vibe/controlled-generation` 及文档地址自动跳转到新项目。

独立展示地址 https://li-jiafu-midnight-press.ggnb6666.chatgpt.site 目前带 ChatGPT 登录门禁（未登录请求返回 401），门禁在托管平台侧，改代码关不掉。因此“体验 Demo”不再指向它，改为打开站内免登录副本 `/demos/midnight-press/index.html`；日后若在 ChatGPT 侧把该站点设为公开，可把 `demoUrl` 换回线上地址。本地案例与嵌入预览仍通过作品集一键启动使用。

文档依据 `F:\ChatGPT\项目\midnight-press` 的实现与 `VERIFICATION.md` 整理；竞品页附官方资料链接。技术记录与产品效果分开陈述：历史测试通过不等于真实生成链路或用户价值已验证。补充真实验证后，更新 `validation`、`iteration` 与 `stages.validation`。

原项目保持原样。作品集展示版位于 `.sites-runtime/midnight-press-site`，使用原 UI、样稿与配图，只保留前端交互，不复制环境文件、服务端密钥或接口。`public/demos/midnight-press/` 保存构建产物，`demo.embedUrl` 与 `demoUrl` 都指向其中的 `index.html`（线上独立站有登录门禁，见上）。展示版支持样稿切换、独立版本编辑、复制与导出，视频部分是分镜静帧。自定义原稿与媒体制作会说明真实服务尚未接入，不会伪造生成结果。

修改展示版后，在独立目录执行 `pnpm typecheck` 和 `pnpm build`，将 `out/` 完整复制到 `public/demos/midnight-press/`，再更新同一个独立线上站点。原项目真实联调通过后，可将 `demoUrl` 替换为真实服务地址，按需更新或移除 `demo.embedUrl`。请保留独立目录中的 `.openai/hosting.json`，避免重复创建站点。

### 第三个项目：AI 项目推进助手

`data/vibe-ai-project-pusher.ts` 集中存放项目介绍与五份简版文档。案例地址为 `/vibe/ai-project-pusher`，成果物地址在后面附加 `product-teardown`、`competitor-analysis`、`requirements`、`prd`、`validation`。旧的示例占位项目与 `seeds` 已移除。

文档依据 `C:\Users\Meesi\Coze\ai-project-pusher` 的 README、规则引擎与三套验证脚本整理：项目把「六类事实 → 显式确认 → 有据处置」做成一次对话流程；事实少于 6/6 时不调用工作流，事实齐备后仍需用户回复「确认无误」；无依据归责在入口被拦截，且不计入事实。

边界与来源分开陈述：`validation` 只记录开发方自己的自动化断言（规则引擎 83 项通过；HTTP 69 项、浏览器 59 项随项目产出，本次未重跑），并明确写明这些是**实现行为而不是用户行为**，没有把断言通过写成效率提升或用户信任。竞品页是设计方法对照，未做同题实测。

`public/demos/ai-project-pusher.html` 是自包含的本地原型：`demo.embedUrl` 指向它，`demo.kind` 为 `agent`，`available: true`。原型在浏览器里用确定性规则复刻六类事实识别、逐项追问、确认门禁与归责拦截，示例输入与原项目的 `quick-cases` 一致；它不调用任何外部服务，未配置工作流 ID 与令牌，因此确认后停在「不伪造结果」的说明上，不会展示编造的处置方案。改写该 HTML 即可更新本地原型；`demoUrl` 留空（独立线上地址与部署标识待补充）。

每个案例追加以下路径可直接阅读成果物：`product-teardown`、`competitor-analysis`、`requirements`、`prd`、`validation`。服务器动态路由支持直接访问和刷新，每页具有独立 title / description；无效地址返回 404。部署时需运行生成的 Worker，不要将这些地址当作静态文件目录。

`components/vibe/` 包含区域、档案卡、阶段轨迹、成果物索引、案例详情、共用文档阅读器、竞品表格、PRD、验证报告、Demo 和预览组件。新增样式仅在 `app/vibe.css` 中，使用 `vibe-` 前缀，与原有样式隔离。首页沿用现有进入动画，文档页使用轻量入场动画；均支持减少动态效果。

小屏（600px 以下）为原生横向滚动与 scroll snap，卡片占可用宽度的 88%，底部提供页码和可键盘操作的分页按钮；768px 使用两列、最后一张独立通栏布局。文档目录在 900px 以下变成顶部横向标签，表格只在自身容器内滚动。

### 本轮基础检查

TypeScript 检查和生产构建通过；生产服务中首页、3 个案例页、15 个成果物页均返回 200，并输出各自标题；无效案例与无效文档均返回 404。全部示例保留待验证状态。

生产预览启动后可运行 `node scripts/check-vibe-routes.mjs`，复查所有文档的完整 HTTP 请求、重复请求、独立 metadata、当前文档标记、空 Demo 状态和返回锚点。可用环境变量 `VIBE_TEST_URL` 指定其他本地端口。

本轮浏览器调试连接在同步阶段连续超时，因此新增区域的 1440 / 1024 / 768 / 390px 截图验收、整页溢出实测、真实键盘操作和减少动态效果的浏览器实测暂未完成。响应式、焦点和 reduced-motion 规则已实现；不要将代码检查或下方旧版验收记录视为本轮视觉实测通过。

## 在线发布

当前提供完整本地项目。预留的 `.openai/hosting.json` 保存站点身份；在线发布尚未完成，需可用的 Sites 发布工具及流程。也可将生成的 Worker 按托管平台要求部署。不要把本地预览地址当成公网地址。

### GitHub Pages（静态导出）

GitHub Pages 只能托管静态文件，而这个项目原本是 Next.js + Cloudflare Worker（页面由服务端渲染），所以 Pages 走的是**静态导出**这条独立通道。两套构建互不影响：

- 本地开发与 Worker 构建：`pnpm dev`、`pnpm build` 完全照旧，`next.config.ts` 里没有静态导出设置。
- Pages 构建：只有 `.github/workflows/deploy-pages.yml` 会设置 `NEXT_PUBLIC_STATIC_EXPORT=1`，此时 `output: "export"` 与 `trailingSlash` 才会生效，产物输出到 `out/`。

新增或改动了这些地方，都是为了子路径部署：

| 改动 | 原因 |
| --- | --- |
| `app/vibe/[slug]/page.tsx`、`[document]/page.tsx` 增加 `generateStaticParams()` | 静态导出必须在构建时枚举 3 案例 × 5 文档共 18 个地址 |
| Vibe 组件内的站内跳转由 `<a>` 改为 `next/link` | 只有 `Link` 会自动补 `basePath`，原生 `<a>` 不会，漏改就会 404 |
| `lib/asset.ts` 的 `asset()` | 给 `public/` 下的图片、简历等静态资源补 `basePath` |
| `.nojekyll` | 阻止 GitHub Pages 用 Jekyll 处理产物 |
| `package.json` 的 `build:pages` | 就是 `next build`，配合上面的环境变量使用 |

`basePath` 由工作流按仓库名自动生成（`NEXT_PUBLIC_BASE_PATH=/${{ github.event.repository.name }}`），所以仓库改名字也不用改代码。

要在本地复现 Pages 产物：

```sh
NEXT_PUBLIC_STATIC_EXPORT=1 NEXT_PUBLIC_BASE_PATH=/你的仓库名 pnpm build:pages
```

产物在 `out/`。Windows PowerShell 请先 `$env:NEXT_PUBLIC_STATIC_EXPORT="1"`、`$env:NEXT_PUBLIC_BASE_PATH="/你的仓库名"` 再执行，或者直接跑上面的工作流。

已知限制：旧的别名地址（`/vibe/trusted-answer`、`/vibe/controlled-generation`）依赖服务端 307 重定向，静态导出下不再跳转。三个正式案例地址不受影响。

## 已完成的验证

已通过 TypeScript 检查与生产构建，并启动构建后的版本，确认首页正常返回、简历文件以 PDF 格式提供下载。已在浏览器检查 1440、1024、768、390px 页面宽度，未出现整页横向溢出。

基础交互已实际操作验证：导航滚动高亮、手机菜单开关、作品轮播、Escape 关闭弹窗并将焦点还给打开按钮、档案卡随机抽取及翻面、邮箱复制。修复了宽屏导航的可视区域计算，以及页面分阶段挂载时部分章节未触发进入动画的问题。

待补充素材：校园与现场照片、项目截图、项目日期与演示链接、生活爱好。网站展示项目案例，不会调用真实业务系统或 AI 服务。
