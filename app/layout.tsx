import type { Metadata, Viewport } from "next";
import Link from "next/link";
import "./globals.css";

// 站点根 URL：等备案下来切到 wcti.cn 时，把 .env.local 里这个值改了即可。
// 必须是完整 https:// 形式，OG 图绝对路径靠它拼出来。
const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ||
  "https://wcti-d3gwebxstb5a57368-1437093153.tcloudbaseapp.com";

const SITE_NAME = "WCTI";
const SITE_TITLE = "WCTI · 你的世界杯本命球队测试";
const SITE_DESC = "不懂球也没关系，12 道题帮你找到最适合支持的世界杯球队。";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_TITLE,
    template: "%s · WCTI",
  },
  description: SITE_DESC,
  applicationName: SITE_NAME,
  keywords: ["世界杯", "球队测试", "MBTI", "WCTI", "World Cup", "人格测试"],
  authors: [{ name: "WCTI" }],
  openGraph: {
    type: "website",
    locale: "zh_CN",
    siteName: SITE_NAME,
    title: SITE_TITLE,
    description: SITE_DESC,
    url: "/",
    images: [
      {
        url: "/og/default.png",
        width: 1200,
        height: 630,
        alt: SITE_TITLE,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESC,
    images: ["/og/default.png"],
  },
  // 微信不读 Twitter Card，但读 Open Graph；以下额外宣告供微信/QQ 优化预览
  other: {
    "wechat:image": `${SITE_URL}/og/default.png`,
    "wechat:title": SITE_TITLE,
    "wechat:description": SITE_DESC,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#020617",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-CN">
      <body className="min-h-screen bg-pitch font-display">
        <header className="sticky top-0 z-30 backdrop-blur bg-slate-950/60 border-b border-white/5">
          <nav className="mx-auto flex max-w-3xl items-center justify-between px-4 py-3">
            <Link href="/" className="flex items-center gap-2 text-base font-bold">
              <span className="text-xl">⚽</span>
              <span className="tracking-wide">WCTI</span>
            </Link>
            <div className="flex items-center gap-1 text-sm">
              <Link
                href="/quiz"
                className="rounded-full px-3 py-1.5 text-slate-200 hover:bg-white/10 transition"
              >
                测试
              </Link>
              <Link
                href="/teams"
                className="rounded-full px-3 py-1.5 text-slate-200 hover:bg-white/10 transition"
              >
                球队库
              </Link>
            </div>
          </nav>
        </header>
        <main className="mx-auto max-w-3xl px-4 pb-24 pt-6 sm:pt-10">{children}</main>
        <footer className="mx-auto max-w-3xl px-4 py-10 text-center text-xs text-slate-500">
          WCTI · 一个不太正经的世界杯人格测试 · 仅供娱乐
        </footer>
      </body>
    </html>
  );
}
