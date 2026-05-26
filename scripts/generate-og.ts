/**
 * 构建时生成 OG 分享卡片（用于微信 / Twitter / FB 等抓取，以及"分享到微信"按钮使用）
 * - public/og/default.png  → 首页 + 缺省回退，二维码指向 /quiz/
 * - public/og/<teamId>.png → 每支球队的结果页专属卡片，二维码指向 /quiz/
 *                            （让接收图片的朋友扫码开始他自己的测试）
 *
 * 触发方式：npm run generate:og（build / dev 前会自动跑）
 *
 * 切换域名（备案下来 wcti.cn 时）：
 *   .env.local 里加一行 NEXT_PUBLIC_SITE_URL=https://wcti.cn，重 build 即可。
 *   13 张图里的二维码会自动指向新域名。
 */
import sharp from "sharp";
import QRCode from "qrcode";
import { mkdir } from "node:fs/promises";
import { resolve } from "node:path";
import { TEAMS } from "../data/teams";

const W = 1200;
const H = 630;
const OUT = resolve(process.cwd(), "public/og");

// 二维码：放在右下角，扫码进 /quiz/
const QR_SIZE = 210;
const QR_PADDING = 18; // QR 周围的白色卡片留白
const QR_CARD_SIZE = QR_SIZE + QR_PADDING * 2; // = 246
const QR_CARD_LEFT = W - QR_CARD_SIZE - 60;     // = 894
const QR_CARD_TOP = H - QR_CARD_SIZE - 70;      // = 314

// 当前站点 URL（用于 QR 编码）
const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ||
  "https://wcti-d3gwebxstb5a57368-1437093153.tcloudbaseapp.com";

// 国旗主色偏暗时（德国黑、葡萄牙深绿等）OG 卡片会糊掉，做一次提亮
function brighten(hex: string): string {
  const m = hex.match(/^#?([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})$/i);
  if (!m) return hex;
  const r = parseInt(m[1], 16);
  const g = parseInt(m[2], 16);
  const b = parseInt(m[3], 16);
  const max = Math.max(r, g, b);
  if (max >= 200) return hex;
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
  title: string;
  subtitle: string;
  label: string;
  accent: string;
  cta: string;
  qrCaption: string; // 二维码下方的小提示
}

function cardSvg({
  brand, title, subtitle, label, accent, cta, qrCaption,
}: CardInput): Buffer {
  const a = brighten(accent);
  const labelWidth = Math.max(label.length * 38 + 60, 220);
  const qrCardCenterX = QR_CARD_LEFT + QR_CARD_SIZE / 2;

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

    <!-- 二维码白色卡片背景（QR 本身由 sharp.composite 合成上去） -->
    <g transform="translate(${QR_CARD_LEFT}, ${QR_CARD_TOP})">
      <rect rx="24" ry="24" width="${QR_CARD_SIZE}" height="${QR_CARD_SIZE}" fill="#FFFFFF"/>
      <!-- 卡片下方点缀色边 -->
      <rect x="0" y="${QR_CARD_SIZE - 6}" width="${QR_CARD_SIZE}" height="6" rx="3" fill="${a}"/>
    </g>

    <!-- 二维码下方 caption -->
    <text x="${qrCardCenterX}" y="${QR_CARD_TOP + QR_CARD_SIZE + 38}"
          fill="rgba(255,255,255,0.85)" font-size="22" font-weight="600"
          text-anchor="middle" letter-spacing="2">
      ${esc(qrCaption)}
    </text>
  </g>
</svg>`;
  return Buffer.from(svg);
}

async function makeQrPng(url: string): Promise<Buffer> {
  return await QRCode.toBuffer(url, {
    errorCorrectionLevel: "M",
    margin: 0, // 白色 quiet zone 由外层白卡片承担
    width: QR_SIZE,
    color: { dark: "#020617", light: "#FFFFFF" },
  });
}

interface RenderJob {
  filename: string;
  card: CardInput;
  qrUrl: string;
}

async function render(job: RenderJob) {
  const svgBuf = cardSvg(job.card);
  const qrBuf = await makeQrPng(job.qrUrl);
  await sharp(svgBuf)
    .composite([
      {
        input: qrBuf,
        top: QR_CARD_TOP + QR_PADDING,
        left: QR_CARD_LEFT + QR_PADDING,
      },
    ])
    .png({ quality: 95, compressionLevel: 9 })
    .toFile(resolve(OUT, job.filename));
  console.log(`✓ public/og/${job.filename}  → QR: ${job.qrUrl}`);
}

async function main() {
  await mkdir(OUT, { recursive: true });

  // 1. 默认 OG
  await render({
    filename: "default.png",
    card: {
      brand: "WCTI · 世界杯本命球队测试",
      title: "你的本命球队",
      subtitle: "WORLD CUP TEAM IDENTITY",
      label: "12 道题 · 不懂球也能玩",
      accent: "#f59e0b",
      cta: "扫码 / 点链接，开始测试 →",
      qrCaption: "扫码测一下 ↑",
    },
    qrUrl: `${SITE_URL}/quiz/`,
  });

  // 2. 12 支球队各一张
  for (const team of Object.values(TEAMS)) {
    await render({
      filename: `${team.id}.png`,
      card: {
        brand: "WCTI · 我的世界杯本命球队",
        title: team.name,
        subtitle: team.englishName.toUpperCase(),
        label: team.personality,
        accent: team.accent,
        cta: "想知道你的本命？扫码测一下 →",
        qrCaption: "扫码 · 测你的本命 ↑",
      },
      qrUrl: `${SITE_URL}/quiz/`,
    });
  }

  console.log(`\n搞定。共生成 ${1 + Object.keys(TEAMS).length} 张图，QR 指向 ${SITE_URL}/quiz/`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
