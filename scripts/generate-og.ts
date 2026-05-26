/**
 * 构建时生成 OG 分享卡片（用于微信 / Twitter / FB 等抓取）
 * - public/og/default.png  → 首页 + 缺省回退
 * - public/og/<teamId>.png → 每支球队的结果页专属卡片
 *
 * 触发方式：npm run generate:og (build / dev 前会自动跑)
 * 修改方式：调 `card()` 里的 SVG 模板即可；team 文案来源 data/teams.ts
 */
import sharp from "sharp";
import { mkdir } from "node:fs/promises";
import { resolve } from "node:path";
import { TEAMS } from "../data/teams";

const W = 1200;
const H = 630;
const OUT = resolve(process.cwd(), "public/og");

// 国旗主色有些天然偏暗（如德国黑、葡萄牙深绿）；在黑色背景上会糊掉。
// 这里做一次"提亮"，专门给 OG 卡片用，UI 主色仍保持忠实国旗色。
function brighten(hex: string): string {
  const m = hex.match(/^#?([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})$/i);
  if (!m) return hex;
  const r = parseInt(m[1], 16);
  const g = parseInt(m[2], 16);
  const b = parseInt(m[3], 16);
  const max = Math.max(r, g, b);
  if (max >= 200) return hex; // 已经够亮
  if (max < 20) return "#FFCE00"; // 纯黑（德国）→ 用德国旗的金色
  const factor = 230 / max;
  const cap = (n: number) =>
    Math.min(255, Math.round(n * factor)).toString(16).padStart(2, "0");
  return `#${cap(r)}${cap(g)}${cap(b)}`;
}

const ESC: Record<string, string> = {
  "<": "&lt;", ">": "&gt;", "&": "&amp;", "'": "&apos;", '"': "&quot;",
};
const esc = (s: string) => s.replace(/[<>&'"]/g, (c) => ESC[c]);

interface CardInput {
  brand: string;
  title: string;       // 中文主标题
  subtitle: string;    // 英文 / 副标题
  label: string;       // 人格类型 / 标签
  accent: string;      // 强调色（自动提亮）
  cta: string;         // 底部行动号召
}

function cardSvg({ brand, title, subtitle, label, accent, cta }: CardInput): Buffer {
  const a = brighten(accent);
  // 粗略估算 label 像素宽度（中文 ~38px / 字）做胶囊宽度
  const labelWidth = Math.max(label.length * 38 + 60, 220);
  const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#020617"/>
      <stop offset="100%" stop-color="#0f172a"/>
    </linearGradient>
    <radialGradient id="glow" cx="78%" cy="30%" r="60%">
      <stop offset="0%" stop-color="${a}" stop-opacity="0.55"/>
      <stop offset="100%" stop-color="${a}" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="sheen" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#ffffff" stop-opacity="0.04"/>
      <stop offset="100%" stop-color="#ffffff" stop-opacity="0"/>
    </linearGradient>
  </defs>

  <rect width="${W}" height="${H}" fill="url(#bg)"/>
  <rect width="${W}" height="${H}" fill="url(#glow)"/>
  <rect width="${W}" height="${H}" fill="url(#sheen)"/>

  <!-- 左侧色条 -->
  <rect x="0" y="0" width="14" height="${H}" fill="${a}"/>

  <g font-family="'PingFang SC','Microsoft YaHei','Hiragino Sans GB','Source Han Sans CN','Noto Sans CJK SC',sans-serif">
    <!-- 顶部品牌 -->
    <text x="80" y="105" fill="rgba(255,255,255,0.7)" font-size="30" font-weight="600" letter-spacing="3">
      ${esc(brand)}
    </text>
    <!-- 一条短分隔线 -->
    <rect x="80" y="125" width="64" height="3" fill="${a}"/>

    <!-- 主标题 -->
    <text x="80" y="310" fill="#FFFFFF" font-size="140" font-weight="900" letter-spacing="-3">
      ${esc(title)}
    </text>

    <!-- 副标题 -->
    <text x="84" y="368" fill="rgba(255,255,255,0.5)" font-size="38" font-weight="500" letter-spacing="6">
      ${esc(subtitle)}
    </text>

    <!-- 人格类型 胶囊 -->
    <g transform="translate(80, 430)">
      <rect rx="44" ry="44" width="${labelWidth}" height="88" fill="${a}" fill-opacity="0.18"/>
      <rect rx="44" ry="44" width="${labelWidth}" height="88" fill="none" stroke="${a}" stroke-width="2.5" stroke-opacity="0.9"/>
      <text x="34" y="60" fill="${a}" font-size="38" font-weight="700" letter-spacing="1">
        ${esc(label)}
      </text>
    </g>

    <!-- 底部 CTA -->
    <text x="80" y="578" fill="rgba(255,255,255,0.55)" font-size="28" font-weight="500" letter-spacing="2">
      ${esc(cta)}
    </text>
  </g>
</svg>`;
  return Buffer.from(svg);
}

async function main() {
  await mkdir(OUT, { recursive: true });

  // 1. 默认 OG（首页、未匹配到具体球队时的回退）
  const def = cardSvg({
    brand: "WCTI · 世界杯本命球队测试",
    title: "你的本命球队",
    subtitle: "WORLD CUP TEAM IDENTITY",
    label: "12 道题 · 不懂球也能玩",
    accent: "#f59e0b",
    cta: "点开链接，测一测你的世界杯本命 →",
  });
  await sharp(def).png({ quality: 95, compressionLevel: 9 }).toFile(resolve(OUT, "default.png"));
  console.log("✓ public/og/default.png");

  // 2. 12 支球队各一张
  let count = 0;
  for (const team of Object.values(TEAMS)) {
    const svg = cardSvg({
      brand: "WCTI · 我的世界杯本命球队",
      title: team.name,
      subtitle: team.englishName.toUpperCase(),
      label: team.personality,
      accent: team.accent,
      cta: "点开测一测你的本命球队 →",
    });
    await sharp(svg).png({ quality: 95, compressionLevel: 9 }).toFile(resolve(OUT, `${team.id}.png`));
    console.log(`✓ public/og/${team.id}.png`);
    count++;
  }

  console.log(`\n搞定。共生成 ${1 + count} 张 OG 图。`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
