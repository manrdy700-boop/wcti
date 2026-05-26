import type { Metadata } from "next";
import Link from "next/link";
import { TEAM_LIST } from "@/data/teams";

export const metadata: Metadata = {
  title: "球队库 · WCTI",
  description: "12 支世界杯球队的人格速览。",
};

export default function TeamsPage() {
  return (
    <div>
      <header className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-2xl font-extrabold sm:text-3xl">球队库</h1>
          <p className="mt-1 text-sm text-slate-400">
            点开任意一张卡片，看看这支球队的"本命人格"是什么样。
          </p>
        </div>
        <Link
          href="/quiz"
          className="self-start rounded-full border border-amber-400/60 bg-amber-400/10 px-4 py-2 text-sm font-semibold text-amber-300 hover:bg-amber-400/20 sm:self-auto"
        >
          直接做测试 →
        </Link>
      </header>

      <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {TEAM_LIST.map((team) => (
          <li key={team.id}>
            <Link
              href={`/result/${team.id}`}
              className="group block h-full overflow-hidden rounded-2xl border border-white/10 bg-white/5 transition hover:border-white/30 hover:bg-white/10"
            >
              {/* 图片占位区——后续接入正式图片时直接在这里替换为 <Image /> 即可 */}
              <div
                className="relative flex h-28 items-center justify-center text-5xl"
                style={{
                  background: `radial-gradient(ellipse at center, ${team.accent}55 0%, transparent 70%)`,
                }}
                aria-hidden
              >
                <span className="drop-shadow-lg">{team.flag}</span>
                <span className="absolute right-3 top-2 text-[10px] uppercase tracking-widest text-slate-400">
                  Image · TODO
                </span>
              </div>
              <div className="p-4">
                <div className="flex items-baseline justify-between gap-2">
                  <div>
                    <div className="text-base font-bold text-slate-50">
                      {team.name}
                    </div>
                    <div className="text-xs text-slate-400">
                      {team.englishName}
                    </div>
                  </div>
                  <span
                    className="rounded-full border px-2 py-0.5 text-[11px] font-semibold"
                    style={{ borderColor: team.accent, color: team.accent }}
                  >
                    {team.personality}
                  </span>
                </div>
                <p className="mt-2 line-clamp-2 text-sm text-slate-300">
                  {team.tagline}
                </p>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {(team.audience ?? []).slice(0, 3).map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-white/5 px-2 py-0.5 text-[11px] text-slate-300"
                    >
                      #{tag}
                    </span>
                  ))}
                  {!team.audience && (
                    <span className="rounded-full border border-dashed border-white/15 px-2 py-0.5 text-[11px] text-slate-500">
                      详情待补
                    </span>
                  )}
                </div>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
