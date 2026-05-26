"use client";

/**
 * 一键分享到微信（带图片）
 *
 * 兼容策略：
 * 1. Android Chrome / iOS Safari 15+：直接调起系统分享面板 (Web Share Level 2)，
 *    带图片 + 文字，用户选「微信」即可。
 * 2. 微信内置浏览器 / 桌面浏览器：弹窗显示图片，提示长按保存（手机）或下载（电脑），
 *    再手动到微信发出去。
 *
 * 现在用的图片是 /og/<teamId>.png（与抓取卡片同一张）；
 * 等以后做了"球队海报"再把这里的 imageUrl 换掉即可。
 */

import { useEffect, useState } from "react";

type State = "idle" | "loading" | "fallback";

interface Props {
  /** 相对路径或绝对路径都行，会自动转成绝对地址 */
  imageUrl: string;
  /** 分享主标题 */
  title: string;
  /** 分享描述 */
  text: string;
  /** 下载文件名（不含 .png） */
  filename?: string;
}

export default function ShareImageButton({
  imageUrl,
  title,
  text,
  filename = "wcti-share",
}: Props) {
  const [state, setState] = useState<State>("idle");
  const [absUrl, setAbsUrl] = useState(imageUrl);

  // 在客户端把 /og/xxx.png 解成 https://host/og/xxx.png，便于下载和兜底展示
  useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        setAbsUrl(new URL(imageUrl, window.location.origin).toString());
      } catch {
        /* keep original */
      }
    }
  }, [imageUrl]);

  async function handleShare() {
    if (state === "loading") return;
    setState("loading");

    const pageUrl =
      typeof window !== "undefined" ? window.location.href : "";
    const isWeChat =
      typeof navigator !== "undefined" &&
      /MicroMessenger/i.test(navigator.userAgent);

    // 微信内置浏览器：navigator.share 行为不稳定，直接走"长按保存"兜底
    if (isWeChat) {
      setState("fallback");
      return;
    }

    try {
      // 拉图片转 File（Web Share Level 2 必须 File）
      const res = await fetch(imageUrl, { cache: "force-cache" });
      if (!res.ok) throw new Error(`img ${res.status}`);
      const blob = await res.blob();
      const file = new File([blob], `${filename}.png`, {
        type: blob.type || "image/png",
      });

      // 优先：带图片分享（Android Chrome / iOS Safari 15+）
      if (
        typeof navigator !== "undefined" &&
        typeof navigator.canShare === "function" &&
        navigator.canShare({ files: [file] })
      ) {
        try {
          await navigator.share({
            files: [file],
            title,
            text: `${text}\n${pageUrl}`,
          });
          setState("idle");
          return;
        } catch (e) {
          if ((e as Error).name === "AbortError") {
            setState("idle");
            return;
          }
          // 其它错误：往下走兜底
        }
      }

      // 次选：仅分享文字+链接（少数支持 share() 但不支持 files 的浏览器）
      if (
        typeof navigator !== "undefined" &&
        typeof navigator.share === "function"
      ) {
        try {
          await navigator.share({ title, text, url: pageUrl });
          setState("idle");
          return;
        } catch (e) {
          if ((e as Error).name === "AbortError") {
            setState("idle");
            return;
          }
        }
      }
    } catch {
      /* fetch / share 全失败，走兜底 */
    }

    setState("fallback");
  }

  function downloadImage() {
    const a = document.createElement("a");
    a.href = absUrl;
    a.download = `${filename}.png`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }

  function closeFallback() {
    setState("idle");
  }

  return (
    <>
      <button
        type="button"
        onClick={handleShare}
        disabled={state === "loading"}
        className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#07c160] px-6 py-3 text-sm font-bold text-white shadow-lg shadow-emerald-500/30 transition hover:bg-[#06ad56] active:scale-95 disabled:opacity-60 sm:w-auto"
      >
        {state === "loading" ? "准备中..." : "💚 分享到微信"}
      </button>

      {state === "fallback" && (
        <div
          className="fixed inset-0 z-50 flex items-end justify-center bg-black/80 p-4 backdrop-blur-sm sm:items-center"
          role="dialog"
          aria-modal="true"
          onClick={closeFallback}
        >
          <div
            className="w-full max-w-sm rounded-3xl border border-white/10 bg-slate-950 p-5 shadow-2xl animate-pop"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <div className="text-base font-bold text-slate-50">
                  分享到微信
                </div>
                <div className="mt-1 text-xs leading-relaxed text-slate-400">
                  📱 手机：<span className="text-slate-200">长按下图保存</span>，
                  再打开微信发给好友 / 朋友圈
                  <br />
                  💻 电脑：<span className="text-slate-200">点下方"下载图片"</span>
                </div>
              </div>
              <button
                type="button"
                onClick={closeFallback}
                aria-label="关闭"
                className="rounded-full p-1.5 text-slate-400 hover:bg-white/5 hover:text-slate-100"
              >
                ✕
              </button>
            </div>
            <div className="mt-4 overflow-hidden rounded-2xl border border-white/10 bg-black/30">
              {/* 用原生 img 而不是 next/image —— 这里需要原图供长按保存 */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={absUrl}
                alt={title}
                className="block w-full select-none"
                draggable={false}
              />
            </div>
            <div className="mt-4 flex gap-2">
              <button
                type="button"
                onClick={downloadImage}
                className="flex-1 rounded-full border border-white/15 bg-white/5 px-4 py-2.5 text-xs font-semibold text-slate-100 transition hover:bg-white/10"
              >
                💾 下载图片
              </button>
              <button
                type="button"
                onClick={closeFallback}
                className="flex-1 rounded-full bg-amber-400 px-4 py-2.5 text-xs font-bold text-slate-950 transition hover:bg-amber-300"
              >
                好的
              </button>
            </div>
            <div className="mt-3 text-center text-[11px] text-slate-500">
              微信审核通过前，链接预览可能不显示卡片，发图片更稳
            </div>
          </div>
        </div>
      )}
    </>
  );
}
