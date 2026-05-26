import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center text-center py-20">
      <div className="text-5xl">🤔</div>
      <h1 className="mt-4 text-2xl font-bold">没找到这支球队</h1>
      <p className="mt-2 text-sm text-slate-400">
        可能链接错了，或者这支球队还没加入题库。
      </p>
      <Link
        href="/quiz"
        className="mt-6 rounded-full bg-amber-400 px-6 py-3 text-sm font-bold text-slate-950 hover:bg-amber-300"
      >
        重新开始测试
      </Link>
    </div>
  );
}
