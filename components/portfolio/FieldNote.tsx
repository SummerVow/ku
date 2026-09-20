// 工作现场卡片的内容面板。
//
// 卡片原本用照片占位；在没有现场照片的情况下，这里改为一张“工作底稿”，
// 用 CSS 画出该段经历交付过的东西（流程、文档要点、界面切片）。
// 文案只来自 data/portfolio.ts 中同一段经历已写明的职责、标签与指标，不新增事实。
//
// 高度约束：面板被限制在 .field-photo 的 228px（移动端 196px）以内，
// 超出会被裁掉，因此这里只保留能在两行内说明完的内容。
type FieldNoteProps = {
  /** 现场条目序号，用于选择对应面板 */
  index: number;
  /** 该段经历的现场说明，兜底时使用 */
  label: string;
};

function HangzhouNote() {
  return (
    <div className="field-doc">
      <div className="field-doc-head">
        <span>INTERNAL PMS</span>
        <span>需求 → 上线</span>
      </div>
      <div className="field-doc-body">
        <div className="field-doc-node">
          <i>01</i>
          <span>
            <b>需求调研</b>
            <br />
            访谈一线业务人员
          </span>
        </div>
        <div className="field-doc-node">
          <i>02</i>
          <span>
            <b>独立输出 PRD</b>
            <br />
            对齐真实使用场景
          </span>
        </div>
        <div className="field-doc-node">
          <i>03</i>
          <span>
            <b>联动评审与交付</b>
            <br />
            设计 · 研发 · 上线
          </span>
        </div>
        <div className="field-doc-node">
          <i>04</i>
          <span>
            <b>版本 A/B 测试</b>
            <br />
            沉淀用户反馈报告
          </span>
        </div>
      </div>
      <div className="field-doc-foot">
        <span>任务流转效率 +20%</span>
        <em>·</em>
        <span>3 份 PRD</span>
      </div>
    </div>
  );
}

function ShaoxingNote() {
  return (
    <div className="field-doc">
      <div className="field-doc-head">
        <span>AI 客服对话</span>
        <span>迭代闭环</span>
      </div>
      <div className="field-doc-body">
        <div className="field-doc-turn">
          <span>退换货要几天到账？</span>
          <span>需先确认订单状态，再按制度说明时效。</span>
          <em>用户提问 → 优化回答口径</em>
        </div>
        <div className="field-doc-node">
          <i>01</i>
          <span>
            <b>梳理对话日志</b>
            <br />
            定位高频业务痛点
          </span>
        </div>
        <div className="field-doc-node">
          <i>02</i>
          <span>
            <b>Prompt 调优 + 知识库更新</b>
            <br />
            协同算法与运营评审落地
          </span>
        </div>
      </div>
      <div className="field-doc-foot">
        <span>首轮问题解决率 +15%</span>
        <em>·</em>
        <span>减少人工转接</span>
      </div>
    </div>
  );
}

export default function FieldNote({ index, label }: FieldNoteProps) {
  if (index === 0) return <HangzhouNote />;
  if (index === 1) return <ShaoxingNote />;
  return (
    <div className="field-doc">
      <div className="field-doc-head">
        <span>FIELD NOTE</span>
        <span>工作底稿</span>
      </div>
      <div className="field-doc-body">
        <div className="field-doc-node">
          <i>01</i>
          <span>{label}</span>
        </div>
      </div>
    </div>
  );
}
