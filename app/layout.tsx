import type { Metadata, Viewport } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: "WCTI · 世界杯本命球队测试",
  description: "不懂球也没关系，12 道题帮你找到最适合支持的世界杯球队。",
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
