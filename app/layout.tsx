import type { Metadata } from "next";
import "./globals.css";
import "./vibe.css";

export const metadata: Metadata = {
  title: "李家福 LI JIAFU — AI 产品个人作品集",
  description:
    "李家福的 AI 产品实践：AIGC 生成工作台、制度问答机器人、产品助理实习与专业技能。",
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body className="antialiased">{children}</body>
    </html>
  );
}
