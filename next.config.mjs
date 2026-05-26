/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // 静态导出：构建后会生成 out/ 目录，全是 HTML/CSS/JS，
  // 可以上传到任意静态托管（CloudBase、OSS、Vercel 都通用）。
  output: "export",
  // 让所有路由生成 /xxx/index.html，对静态主机最友好（包括 CloudBase）。
  trailingSlash: true,
  // 关闭 next/image 优化（静态导出环境没有 Node 服务器，无法在线优化图片）。
  images: { unoptimized: true },
};

export default nextConfig;
