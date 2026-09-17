import Link from "next/link";

export default function VibeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="aurora" aria-hidden="true" />
      <div className="paper-grain" aria-hidden="true" />
      <a className="skip-link" href="#vibe-main">
        跳转到正文
      </a>
      <div className="vibe-topbar">
        <Link href="/#vibe-lab" aria-label="返回作品集 Vibe Product Lab">
          ← PORTFOLIO
        </Link>
        <span>VIBE PRODUCT LAB</span>
        <span>产品实验档案</span>
      </div>
      {children}
    </>
  );
}
