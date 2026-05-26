import Link from "next/link";
import { TEAM_LIST } from "@/data/teams";
import { QUESTIONS } from "@/data/questions";

export default function HomePage() {
  return (
    <div className="flex flex-col items-center text-center">
      <section className="relative w-full overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-b from-emerald-900/40 via-slate-900/40 to-slate-950/80 px-6 py-12 shadow-2xl sm:py-16">
        <div className="pointer-events-none absolute inset-0 opacity-30 [background:radial-gradient(circle_at_20%_10%,rgba(34,197,94,0.35),transparent_40%),radial-gradient(circle_at_80%_90%,rgba(245,158,11,0.25),transparent_45%)]" />
        <div className="relative">
          <div className="mb-4 flex justify-center gap-1 text-2xl sm:text-3xl">
            {TEAM_LIST.slice(0, 8).map((t) => (
              <span key={t.id} aria-hidden>
                {t.flag}
              </span>
            ))}
          </div>
          <h1 className="bg-gradient-to-b from-white to-slate-300 bg-clip-text text-3xl font-extrabold leading-tight text-transparent sm:text-5xl">
            WCTI：你的世界杯
            <br className="sm:hidden" />
            本命球队测试
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-slate-300 sm:text-lg">
            不懂球也没关系，{QUESTIONS.length} 道题帮你找到最适合支持的世界杯球队。
          </p>
          <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <Link
              href="/quiz"
              className="group inline-flex w-full items-center justify-center gap-2 rounded-full bg-amber-400 px-8 py-3.5 text-base font-bold text-slate-950 shadow-lg shadow-amber-500/20 transition hover:bg-amber-300 active:scale-95 sm:w-auto"
            >
              开始测试
              <span className="transition group-hover:translate-x-0.5">→</span>
            </Link>
            <Link
              href="/teams"
              className="inline-flex w-full items-center justify-center rounded-full border border-white/20 px-6 py-3 text-sm font-medium text-slate-200 hover:bg-white/5 sm:w-auto"
            >
              先看看有哪些球队
            </Link>
          </div>
          <p className="mt-5 text-xs text-slate-400">
            完全免费 · 无需登录 · 大约 2 分钟
          </p>
        </div>
      </section>

      <section className="mt-10 grid w-full grid-cols-1 gap-3 sm:grid-cols-3">
        {[
          { emoji: "🎯", title: "12 题精准定位", desc: "覆盖性格、审美、价值观" },
          { emoji: "🌍", title: "12 支球队人格", desc: "强队黑马都有戏" },
          { emoji: "📲", title: "结果可分享", desc: "复制链接发给朋友比一下" },
        ].map((item) => (
          <div
            key={item.title}
            className="rounded-2xl border border-white/10 bg-white/5 p-4 text-left"
          >
            <div className="text-2xl">{item.emoji}</div>
            <div className="mt-2 text-sm font-semibold text-slate-100">
              {item.title}
            </div>
            <div className="mt-1 text-xs text-slate-400">{item.desc}</div>
          </div>
        ))}
      </section>
    </div>
  );
}
