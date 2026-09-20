import type { NextConfig } from "next";

// 同一个配置支持两种构建：
//   1) 本地预览 / Cloudflare Worker（pnpm dev、pnpm build）——不带静态导出设置；
//   2) GitHub Pages 静态导出——由环境变量开启，见 .github/workflows/deploy-pages.yml。
// 这样改造 Pages 不会影响你原来的本地启动方式。
const isStaticExport = process.env.NEXT_PUBLIC_STATIC_EXPORT === "1";
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const nextConfig: NextConfig = isStaticExport
  ? {
      // 静态导出：产物是一堆 html，GitHub Pages 只能托管静态文件。
      output: "export",
      // GitHub Pages 按目录提供 index.html，导出成 目录/index.html 最稳。
      trailingSlash: true,
      basePath,
      // 仓库子路径部署时，静态资源 URL 也要带同一前缀。
      assetPrefix: basePath || undefined,
      images: { unoptimized: true },
    }
  : {
      /* config options here */
    };

export default nextConfig;
