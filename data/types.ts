// 数据层统一类型定义。
// - 增减球队：在 teams.ts 中调整 TEAMS 表 + 同步这里的 TEAM_IDS 数组。
// - 增减题目：在 questions.ts 中调整 QUESTIONS 数组。
// - 调整 / 新增维度：修改下方 DIMENSIONS 数组（同步 data/teams.ts 里所有 vector）。

// ───────────────────────────────────────────────────────────
// 球队 ID（48 参赛队 + 1 彩蛋意大利 = 49）
// ───────────────────────────────────────────────────────────
// ❗严格基于 FIFA 2026 美加墨世界杯最终确认的 48 支参赛队 + 意大利彩蛋。
// 不要再混入旧媒体推测名单（丹麦/匈牙利/波兰/牙买加/玻利维亚等已剔除）。
// ID 统一规则：英文小写 + 多词用短横线连接（例：south-korea / dr-congo）。
export const TEAM_IDS = [
  // —— CONCACAF Hosts（3）
  "canada", "mexico", "usa",

  // —— AFC 亚洲 9 队
  "australia", "iran", "iraq", "japan", "jordan",
  "south-korea", "qatar", "saudi-arabia", "uzbekistan",

  // —— CAF 非洲 10 队（含原跨洲附加赛晋级队，DR Congo 现属 CAF 名额）
  "algeria", "cape-verde", "dr-congo", "cote-divoire", "egypt",
  "ghana", "morocco", "senegal", "south-africa", "tunisia",

  // —— CONCACAF 非主办 3 队
  "curacao", "haiti", "panama",

  // —— CONMEBOL 南美 6 队
  "argentina", "brazil", "colombia", "ecuador", "paraguay", "uruguay",

  // —— OFC 大洋洲 1 队
  "new-zealand",

  // —— UEFA 欧洲 16 队
  "austria", "belgium", "bosnia-herzegovina", "croatia", "czechia",
  "england", "france", "germany", "netherlands", "norway",
  "portugal", "scotland", "spain", "sweden", "switzerland", "turkiye",

  // —— 🥚 彩蛋：未参赛，必须 isEasterEgg=true、qualified=false
  "italy",
] as const;

export type TeamId = (typeof TEAM_IDS)[number];

// ───────────────────────────────────────────────────────────
// 大洲（用于过滤、统计、UI 分组）
// ───────────────────────────────────────────────────────────
export type Confederation =
  | "AFC"        // 亚洲
  | "CAF"        // 非洲
  | "CONCACAF"   // 中北美及加勒比
  | "CONMEBOL"   // 南美
  | "OFC"        // 大洋洲
  | "UEFA";      // 欧洲

// ───────────────────────────────────────────────────────────
// 12 个核心维度（向量空间）
// ───────────────────────────────────────────────────────────
// 用户已在指引中定义；任何关于球队 / 用户 / 解释的描述都围绕这 12 维展开。
// 数值范围约定：每维 0–10 整数（0 = 完全不像，10 = 极度典型）。
// 算法在 dot/cosine 计算时再做归一化。
export const DIMENSIONS = [
  "powerSecurity",     // 强队安全感
  "underdogDrama",     // 黑马逆袭感
  "superstarGravity",  // 巨星吸引力
  "teamIdentity",      // 团队认同感
  "aestheticFlair",    // 华丽观赏性
  "toughness",         // 铁血抗压感
  "legacyRomance",     // 历史情怀感
  "growthStory",       // 成长陪伴感
  "nicheIdentity",     // 小众独特感
  "socialHeat",        // 社交话题性
  "cameraAppeal",      // 镜头吸引力
  "tacticalOrder",     // 秩序掌控感
] as const;

export type Dimension = (typeof DIMENSIONS)[number];

/** 一个球队（或用户答卷归并后）的向量：12 维都需要赋值 */
export type Vector = Record<Dimension, number>;

// ───────────────────────────────────────────────────────────
// 球队
// ───────────────────────────────────────────────────────────
export interface Team {
  id: TeamId;
  name: string;                // 中文名
  englishName: string;         // 英文名
  flag: string;                // 国旗 emoji
  accent: string;              // 主色（HEX，给 UI 用；OG 脚本会自动提亮过暗色）
  personality: string;         // 人格类型一句话标签
  tagline: string;             // 副标题
  vector: Vector;              // 12 维向量
  confederation: Confederation;

  /** true = 主办国（USA / Canada / Mexico）*/
  host?: boolean;

  /**
   * 是否为 2026 世界杯正式参赛队。
   * 默认 true；只有彩蛋（意大利）显式置 false。
   */
  qualified?: boolean;

  /**
   * true = 未参赛的彩蛋队。
   * 算法匹配时与正式 48 队同等参与（按用户要求 1/49 即足够彩蛋感）。
   */
  isEasterEgg?: boolean;

  // —— 详细内容（可选，方便分批补齐）
  why?: string;                // 推荐理由
  watchGuide?: string[];       // 入门观赛指南
  audience?: string[];         // 适合人群标签
}

// ───────────────────────────────────────────────────────────
// 题目
// ───────────────────────────────────────────────────────────
export interface QuestionOption {
  label: string;
  // 旧算法：每个选项给若干球队加分（即将被向量算法取代）
  scores: Partial<Record<TeamId, number>>;
  // 新算法（占位，未启用）：每个选项对各维度的影响
  vectorDelta?: Partial<Vector>;
}

export interface Question {
  id: string;
  prompt: string;
  options: QuestionOption[];
}

// 计分时统一初始化的分数表（旧算法用）
export type ScoreMap = Record<TeamId, number>;
