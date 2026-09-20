/**
 * 站内静态资源路径。
 *
 * 本地开发与 Cloudflare Worker 构建时 basePath 为空，直接返回原路径；
 * GitHub Pages 部署在仓库子路径时（NEXT_PUBLIC_BASE_PATH=/仓库名），
 * 加上前缀，否则图片、简历这类 public/ 资源会 404。
 *
 * 只用于指向 public/ 的绝对路径；站内页面跳转请用 next/link。
 */
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export function asset(path: string): string {
  if (!path.startsWith("/")) return path;
  return `${basePath}${path}`;
}
