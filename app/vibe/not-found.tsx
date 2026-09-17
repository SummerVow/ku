import Link from "next/link";

export default function NotFound() {
  return (
    <main id="vibe-main" className="vibe-page vibe-empty">
      <p className="vibe-kicker">FILE NOT FOUND / 404</p>
      <h1>这份档案还不存在</h1>
      <p>请检查地址，或返回实验室打开已有项目。</p>
      <Link className="vibe-action vibe-action-primary" href="/#vibe-lab">
        返回 Vibe Product Lab →
      </Link>
    </main>
  );
}
