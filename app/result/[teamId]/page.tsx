import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { TEAM_LIST, getTeam } from "@/data/teams";
import CopyLinkButton from "@/components/CopyLinkButton";

// 预生成所有球队的结果页（静态化）
export function generateStaticParams() {
  return TEAM_LIST.map((t) => ({ teamId: t.id }));
}

export function generateMetadata({
  params,
}: {
  params: { teamId: string };
}): Metadata {
  const team = getTeam(params.teamId);
  if (!team) return { title: "未找到球队 · WCTI" };
  return {
    title: `我的本命是 ${team.name} ${team.flag} · WCTI`,
    description: `${team.personality}：${team.tagline}`,
  };
}

export default function ResultPage({ params }: { params: { teamId: string } }) {
  const team = getTeam(params.teamId);
  if (!team) notFound();

  return (
    <div className="flex flex-col gap-8">
      {/* Hero */}
      <section
        className="relative overflow-hidden rounded-3xl border border-white/10 px-6 py-10 text-center shadow-2xl sm:px-10 sm:py-14"
        style={{
          background: `radial-gradient(ellipse at top, ${team.accent}33 0%, rgba(2,6,23,0.85) 60%, #020617 100%)`,
        }}
      >
        <div className="text-xs uppercase tracking-[0.3em] text-slate-400">
          Your World Cup Team
        </div>
        <div className="mt-4 text-7xl leading-none animate-pop sm:text-8xl">
          {team.flag}
        </div>
        <h1 className="mt-4 text-3xl font-extrabold text-slate-50 sm:text-5xl">
          {team.name}
          <span className="ml-2 text-base font-normal text-slate-400 sm:text-lg">
            {team.englishName}
          </span>
        </h1>
        <div
          className="mt-3 inline-block rounded-full border px-4 py-1 text-sm font-semibold"
          style={{ borderColor: team.accent, color: team.accent }}
        >
          {team.personality}
        </div>
        <p className="mx-auto mt-4 max-w-lg text-base leading-relaxed text-slate-300">
          {team.tagline}
        </p>
      </section>

      {/* Why */}
      <section>
        <h2 className="text-sm font-bold uppercase tracking-wider text-slate-400">
          为什么是你的本命
        </h2>
        <p className="mt-3 whitespace-pre-line text-base leading-relaxed text-slate-200">
          {team.why}
        </p>
      </section>

      {/* Watch Guide */}
      <section>
        <h2 className="text-sm font-bold uppercase tracking-wider text-slate-400">
          入门观赛指南
        </h2>
        <ul className="mt-3 space-y-2">
          {team.watchGuide.map((line, idx) => (
            <li
              key={idx}
              className="flex gap-3 rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-200"
            >
              <span
                className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-xs font-bold"
                style={{ backgroundColor: team.accent, color: "#020617" }}
              >
                {idx + 1}
              </span>
              <span>{line}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* Audience tags */}
      <section>
        <h2 className="text-sm font-bold uppercase tracking-wider text-slate-400">
          适合人群
        </h2>
        <div className="mt-3 flex flex-wrap gap-2">
          {team.audience.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-slate-200"
            >
              # {tag}
            </span>
          ))}
        </div>
      </section>

      {/* CTAs */}
      <section className="mt-2 flex flex-col gap-3 sm:flex-row sm:justify-center">
        <Link
          href="/quiz"
          className="inline-flex w-full items-center justify-center rounded-full bg-amber-400 px-6 py-3 text-sm font-bold text-slate-950 transition hover:bg-amber-300 active:scale-95 sm:w-auto"
        >
          🔁 重新测试
        </Link>
        <CopyLinkButton />
        <Link
          href="/teams"
          className="inline-flex w-full items-center justify-center rounded-full border border-white/15 px-6 py-3 text-sm font-medium text-slate-200 hover:bg-white/5 sm:w-auto"
        >
          看看其它球队
        </Link>
      </section>
    </div>
  );
}
