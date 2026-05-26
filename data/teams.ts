import type { Team, TeamId, Vector } from "./types";

// ─────────────────────────────────────────────────────────────
// 12 维向量赋值约定（参考用户给出的维度定义）
// ─────────────────────────────────────────────────────────────
// powerSecurity     强队安全感
// underdogDrama     黑马逆袭感
// superstarGravity  巨星吸引力
// teamIdentity      团队认同感
// aestheticFlair    华丽观赏性
// toughness         铁血抗压感
// legacyRomance     历史情怀感
// growthStory       成长陪伴感
// nicheIdentity     小众独特感
// socialHeat        社交话题性
// cameraAppeal      镜头吸引力（注意：不是颜值分）
// tacticalOrder     秩序掌控感
//
// 取值 0–10 整数。算法在 dot/cosine 时再做归一化。
// 这版赋值是 v0 推断，待你审核后逐队调整。

const v = (
  powerSecurity: number, underdogDrama: number, superstarGravity: number, teamIdentity: number,
  aestheticFlair: number, toughness: number, legacyRomance: number, growthStory: number,
  nicheIdentity: number, socialHeat: number, cameraAppeal: number, tacticalOrder: number,
): Vector => ({
  powerSecurity, underdogDrama, superstarGravity, teamIdentity,
  aestheticFlair, toughness, legacyRomance, growthStory,
  nicheIdentity, socialHeat, cameraAppeal, tacticalOrder,
});

// ═════════════════════════════════════════════════════════════
// 49 支球队（FIFA 2026 正式 48 + 意大利彩蛋）
// 按大洲分组；id 统一短横线小写。
// ═════════════════════════════════════════════════════════════
export const TEAMS: Record<TeamId, Team> = {

  // ── CONCACAF 主办国（3）─────────────────────────────────
  canada: {
    id: "canada",
    name: "加拿大",
    englishName: "Canada",
    flag: "🇨🇦",
    accent: "#d52b1e",
    confederation: "CONCACAF",
    host: true,
    personality: "北方新势力",
    tagline: "我们也来踢世界杯了",
    //          PS UD SG TI AF TG LR GS NI SH CA TO
    vector: v(  3, 7, 6, 6, 6, 6, 2, 9, 6, 5, 6, 5),
  },
  mexico: {
    id: "mexico",
    name: "墨西哥",
    englishName: "Mexico",
    flag: "🇲🇽",
    accent: "#006847",
    confederation: "CONCACAF",
    host: true,
    personality: "永远的派对",
    tagline: "我们 17 届世界杯，每届都很开心",
    vector: v(  4, 4, 5, 8, 6, 5, 6, 3, 4, 10, 9, 5),
    why: "你看球是为了享受当下，而不是为了夺冠。墨西哥球迷可能是世界上最热情的一群——彩绘脸、墨西哥帽、全场跳浪、每场都像嘉年华。球队成绩稳定地停留在 16 强（「第五场魔咒」），但氛围永远第一档。",
    watchGuide: [
      "看球同时听一下他们球迷的合唱",
      "「第五场魔咒」是固定剧情，但球迷不在乎",
      "比赛节奏快、对抗激烈、永不放弃",
      "推荐了解墨西哥 vs 美国的德比文化",
    ],
    audience: ["氛围党", "快乐足球", "派对动物", "ESFP"],
  },
  usa: {
    id: "usa",
    name: "美国",
    englishName: "United States",
    flag: "🇺🇸",
    accent: "#3c3b6e",
    confederation: "CONCACAF",
    host: true,
    personality: "新世界开拓者",
    tagline: "足球还在路上，但我们的步子越来越大",
    vector: v(  5, 5, 5, 7, 5, 5, 3, 8, 4, 7, 6, 6),
  },

  // ── AFC 亚洲（9）───────────────────────────────────────
  australia: {
    id: "australia",
    name: "澳大利亚",
    englishName: "Australia",
    flag: "🇦🇺",
    accent: "#ffcd00",
    confederation: "AFC",
    personality: "黄金袋鼠",
    tagline: "拼到最后一刻",
    vector: v(  4, 7, 4, 9, 5, 9, 4, 5, 7, 5, 6, 6),
  },
  iran: {
    id: "iran",
    name: "伊朗",
    englishName: "Iran",
    flag: "🇮🇷",
    accent: "#da0000",
    confederation: "AFC",
    personality: "波斯铁壁",
    tagline: "亚洲传统强队",
    vector: v(  5, 5, 5, 8, 5, 8, 4, 4, 6, 5, 6, 7),
  },
  iraq: {
    id: "iraq",
    name: "伊拉克",
    englishName: "Iraq",
    flag: "🇮🇶",
    accent: "#ce1126",
    confederation: "AFC",
    personality: "西亚硬骨头",
    tagline: "中东的钢铁意志",
    vector: v(  3, 7, 3, 8, 5, 8, 5, 6, 8, 3, 5, 5),
  },
  japan: {
    id: "japan",
    name: "日本",
    englishName: "Japan",
    flag: "🇯🇵",
    accent: "#bc002d",
    confederation: "AFC",
    personality: "热血少年",
    tagline: "三十年磨一剑，我们正在登场",
    vector: v(  5, 8, 4, 9, 6, 7, 3, 10, 5, 7, 7, 8),
    why: "你相信努力、计划、慢慢变强。日本足球从 90 年代制定百年计划起，一步一个脚印从亚洲弱旅打进 16 强、打赢德国西班牙。蓝武士的精神不在天赋，而在「今天比昨天好一点」。这种成长曲线让人感动。",
    watchGuide: [
      "看他们的体能和跑动数据，一般是全场最高",
      "关注归化与留洋球员的成长史",
      "推荐了解 J 联赛百年计划",
      "球迷赛后捡垃圾的画面是固定彩蛋",
    ],
    audience: ["努力型人格", "动漫党", "亚洲足球关注者", "ISTJ"],
  },
  jordan: {
    id: "jordan",
    name: "约旦",
    englishName: "Jordan",
    flag: "🇯🇴",
    accent: "#007a3d",
    confederation: "AFC",
    personality: "西亚黑马",
    tagline: "亚洲杯决赛之后，世界杯也来了",
    vector: v(  3, 9, 3, 9, 5, 8, 2, 9, 8, 6, 5, 6),
  },
  "south-korea": {
    id: "south-korea",
    name: "韩国",
    englishName: "South Korea",
    flag: "🇰🇷",
    accent: "#0047a0",
    confederation: "AFC",
    personality: "亚洲常客",
    tagline: "孙兴慜的国家",
    vector: v(  5, 7, 8, 8, 6, 8, 6, 5, 5, 7, 7, 7),
  },
  qatar: {
    id: "qatar",
    name: "卡塔尔",
    englishName: "Qatar",
    flag: "🇶🇦",
    accent: "#8d1b3d",
    confederation: "AFC",
    personality: "上届东道主",
    tagline: "请允许我们再来一次",
    vector: v(  3, 4, 3, 6, 5, 5, 3, 5, 8, 4, 5, 5),
  },
  "saudi-arabia": {
    id: "saudi-arabia",
    name: "沙特阿拉伯",
    englishName: "Saudi Arabia",
    flag: "🇸🇦",
    accent: "#006c35",
    confederation: "AFC",
    personality: "梅西杀手",
    tagline: "我们也能掀翻冠军",
    vector: v(  3, 10, 3, 7, 5, 6, 3, 6, 7, 8, 5, 5),
  },
  uzbekistan: {
    id: "uzbekistan",
    name: "乌兹别克斯坦",
    englishName: "Uzbekistan",
    flag: "🇺🇿",
    accent: "#0099b5",
    confederation: "AFC",
    personality: "中亚新星",
    tagline: "我们是最年轻的世界杯客人",
    vector: v(  3, 8, 3, 7, 5, 6, 2, 9, 9, 3, 5, 6),
  },

  // ── CAF 非洲（10）──────────────────────────────────────
  algeria: {
    id: "algeria",
    name: "阿尔及利亚",
    englishName: "Algeria",
    flag: "🇩🇿",
    accent: "#006633",
    confederation: "CAF",
    personality: "沙漠狐",
    tagline: "马赫雷斯领衔，北非铁军",
    vector: v(  5, 7, 7, 7, 6, 7, 5, 5, 6, 5, 6, 6),
  },
  "cape-verde": {
    id: "cape-verde",
    name: "佛得角",
    englishName: "Cape Verde",
    flag: "🇨🇻",
    accent: "#003893",
    confederation: "CAF",
    personality: "大西洋小岛奇迹",
    tagline: "五十万人的世界杯首秀",
    vector: v(  2, 10, 3, 9, 6, 7, 2, 10, 10, 7, 5, 5),
  },
  "dr-congo": {
    id: "dr-congo",
    name: "刚果（金）",
    englishName: "DR Congo",
    flag: "🇨🇩",
    accent: "#007fff",
    confederation: "CAF",
    personality: "中非新风",
    tagline: "非洲的下一支新星",
    vector: v(  4, 7, 4, 7, 6, 7, 4, 7, 8, 3, 6, 5),
  },
  "cote-divoire": {
    id: "cote-divoire",
    name: "科特迪瓦",
    englishName: "Côte d’Ivoire",
    flag: "🇨🇮",
    accent: "#ff8200",
    confederation: "CAF",
    personality: "象牙海岸之光",
    tagline: "德罗巴遗留的精神",
    vector: v(  5, 6, 6, 7, 7, 7, 6, 6, 6, 5, 7, 6),
  },
  egypt: {
    id: "egypt",
    name: "埃及",
    englishName: "Egypt",
    flag: "🇪🇬",
    accent: "#c8102e",
    confederation: "CAF",
    personality: "法老复兴",
    tagline: "萨拉赫的舞台",
    vector: v(  5, 6, 9, 6, 7, 6, 6, 5, 5, 7, 7, 6),
  },
  ghana: {
    id: "ghana",
    name: "加纳",
    englishName: "Ghana",
    flag: "🇬🇭",
    accent: "#fcd116",
    confederation: "CAF",
    personality: "黑色之星",
    tagline: "非洲最有故事的那一支",
    vector: v(  4, 8, 5, 7, 7, 7, 7, 5, 6, 6, 7, 5),
  },
  morocco: {
    id: "morocco",
    name: "摩洛哥",
    englishName: "Morocco",
    flag: "🇲🇦",
    accent: "#c1272d",
    confederation: "CAF",
    personality: "奇迹缔造者",
    tagline: "我们写历史，没有人能阻挡",
    vector: v(  4, 10, 5, 10, 6, 9, 3, 8, 7, 9, 7, 8),
    why: "你相信团结的力量，喜欢看见「不被看好的人逆袭」。摩洛哥是 2022 世界杯最大的故事——首支闯入四强的非洲球队、全员凝聚、为家乡而战。他们用防守反击 + 集体信仰，连斩比利时、西班牙、葡萄牙。新时代的足球之光。",
    watchGuide: [
      "看他们的防守阵型，紧凑而无私",
      "赛后球员和母亲拥抱的画面已成名场面",
      "推荐回顾 2022 世界杯摩洛哥全部比赛",
      "球迷氛围超热烈，全非洲全阿拉伯世界都在加油",
    ],
    audience: ["黑马党", "团结至上", "情感共鸣型", "ENFJ"],
  },
  senegal: {
    id: "senegal",
    name: "塞内加尔",
    englishName: "Senegal",
    flag: "🇸🇳",
    accent: "#00853f",
    confederation: "CAF",
    personality: "非洲雄狮",
    tagline: "已经不是黑马，是真正的强队",
    vector: v(  6, 5, 7, 8, 6, 8, 4, 7, 5, 6, 7, 6),
  },
  "south-africa": {
    id: "south-africa",
    name: "南非",
    englishName: "South Africa",
    flag: "🇿🇦",
    accent: "#007749",
    confederation: "CAF",
    personality: "彩虹之国回归",
    tagline: "Bafana Bafana 再上路",
    vector: v(  4, 7, 4, 8, 6, 6, 6, 7, 6, 6, 7, 5),
  },
  tunisia: {
    id: "tunisia",
    name: "突尼斯",
    englishName: "Tunisia",
    flag: "🇹🇳",
    accent: "#e70013",
    confederation: "CAF",
    personality: "迦太基雄鹰",
    tagline: "北非的硬度",
    vector: v(  4, 6, 3, 8, 5, 8, 5, 4, 6, 4, 5, 7),
  },

  // ── CONCACAF 非主办（3）────────────────────────────────
  curacao: {
    id: "curacao",
    name: "库拉索",
    englishName: "Curaçao",
    flag: "🇨🇼",
    accent: "#f9e814",
    confederation: "CONCACAF",
    personality: "加勒比小奇迹",
    tagline: "全国不到二十万人，我们打进了世界杯",
    vector: v(  2, 10, 2, 9, 6, 6, 2, 10, 10, 7, 5, 5),
  },
  haiti: {
    id: "haiti",
    name: "海地",
    englishName: "Haiti",
    flag: "🇭🇹",
    accent: "#002868",
    confederation: "CONCACAF",
    personality: "加勒比奇迹",
    tagline: "用足球写希望",
    vector: v(  2, 9, 3, 8, 7, 7, 5, 9, 9, 6, 6, 5),
  },
  panama: {
    id: "panama",
    name: "巴拿马",
    englishName: "Panama",
    flag: "🇵🇦",
    accent: "#d21034",
    confederation: "CONCACAF",
    personality: "运河国新军",
    tagline: "中美洲的拼搏",
    vector: v(  3, 6, 3, 7, 5, 7, 3, 6, 7, 3, 5, 5),
  },

  // ── CONMEBOL 南美（6）──────────────────────────────────
  argentina: {
    id: "argentina",
    name: "阿根廷",
    englishName: "Argentina",
    flag: "🇦🇷",
    accent: "#75aadb",
    confederation: "CONMEBOL",
    personality: "天才浪漫主义者",
    tagline: "为一个人疯狂，为一场梦哭泣",
    vector: v(  8, 4, 10, 6, 7, 7, 9, 4, 3, 9, 8, 6),
    why: "你相信命运、相信天才、也相信悲喜交加的故事。阿根廷的足球永远围绕着一个 No.10——从马拉多纳到梅西——他们的比赛就像一首情诗，赢得不容易，输得也不甘心。你支持的不只是一支球队，而是一种「明知会心碎也要相信」的浪漫。",
    watchGuide: [
      "记住 10 号球员，他通常就是答案",
      "比赛前 60 分钟可能很闷，最后 30 分钟才是高潮",
      "进球后听一下解说员的吼叫，那是球迷情绪的浓缩",
      "看完比赛去搜搜阿根廷球迷在街头唱的《Muchachos》",
    ],
    audience: ["浪漫主义者", "梅西球迷", "戏剧脑", "INFP"],
  },
  brazil: {
    id: "brazil",
    name: "巴西",
    englishName: "Brazil",
    flag: "🇧🇷",
    accent: "#fedf00",
    confederation: "CONMEBOL",
    personality: "桑巴艺术家",
    tagline: "足球是用来跳舞的，不是用来计算的",
    vector: v(  9, 2, 8, 5, 10, 5, 10, 3, 2, 9, 9, 6),
    why: "你在意「好看」胜过「赢球」，喜欢一切自由、张扬、有节奏感的东西。巴西是足球世界里最会「表演」的那支队伍——彩虹过人、马赛回旋、进球后的桑巴舞——他们提醒我们足球本来的样子：好玩。",
    watchGuide: [
      "重点看前场 4 个攻击球员的脚下技术",
      "进球庆祝动作往往比进球本身还精彩",
      "如果听到「Samba」，那基本就是巴西打高潮了",
      "经典推荐：1970 年世界杯巴西队比赛集锦",
    ],
    audience: ["视觉系球迷", "颜值党", "嘉年华爱好者", "ENFP"],
  },
  colombia: {
    id: "colombia",
    name: "哥伦比亚",
    englishName: "Colombia",
    flag: "🇨🇴",
    accent: "#fcd116",
    confederation: "CONMEBOL",
    personality: "南美浪漫派",
    tagline: "James 的国度，舞步与进球",
    vector: v(  5, 6, 7, 7, 8, 5, 5, 6, 5, 7, 8, 6),
  },
  ecuador: {
    id: "ecuador",
    name: "厄瓜多尔",
    englishName: "Ecuador",
    flag: "🇪🇨",
    accent: "#ffce00",
    confederation: "CONMEBOL",
    personality: "高原惊喜",
    tagline: "南美藏得最深的黑马",
    vector: v(  4, 8, 4, 8, 6, 7, 3, 7, 7, 4, 6, 6),
  },
  paraguay: {
    id: "paraguay",
    name: "巴拉圭",
    englishName: "Paraguay",
    flag: "🇵🇾",
    accent: "#0038a8",
    confederation: "CONMEBOL",
    personality: "南美硬骨头",
    tagline: "我们不踢漂亮，我们踢赢",
    vector: v(  3, 7, 3, 8, 5, 9, 5, 5, 7, 3, 5, 6),
  },
  uruguay: {
    id: "uruguay",
    name: "乌拉圭",
    englishName: "Uruguay",
    flag: "🇺🇾",
    accent: "#0038a8",
    confederation: "CONMEBOL",
    personality: "南美铁血",
    tagline: "人口三百万，冠军两座",
    vector: v(  6, 6, 6, 9, 6, 10, 9, 4, 7, 6, 6, 7),
  },

  // ── OFC 大洋洲（1）─────────────────────────────────────
  "new-zealand": {
    id: "new-zealand",
    name: "新西兰",
    englishName: "New Zealand",
    flag: "🇳🇿",
    accent: "#00247d",
    confederation: "OFC",
    personality: "南半球的孤独旅人",
    tagline: "大洋洲唯一的代表",
    vector: v(  3, 5, 3, 8, 5, 7, 3, 5, 9, 3, 5, 5),
  },

  // ── UEFA 欧洲（16）─────────────────────────────────────
  austria: {
    id: "austria",
    name: "奥地利",
    englishName: "Austria",
    flag: "🇦🇹",
    accent: "#ed2939",
    confederation: "UEFA",
    personality: "中欧老灵魂",
    tagline: "我们曾经也踢过决赛",
    vector: v(  5, 6, 5, 7, 5, 6, 5, 5, 6, 4, 5, 7),
  },
  belgium: {
    id: "belgium",
    name: "比利时",
    englishName: "Belgium",
    flag: "🇧🇪",
    accent: "#ef3340",
    confederation: "UEFA",
    personality: "迟到的黄金一代",
    tagline: "永远差最后一脚",
    vector: v(  7, 3, 7, 6, 6, 5, 5, 3, 4, 6, 6, 7),
  },
  "bosnia-herzegovina": {
    id: "bosnia-herzegovina",
    name: "波黑",
    englishName: "Bosnia and Herzegovina",
    flag: "🇧🇦",
    accent: "#0028b3",
    confederation: "UEFA",
    personality: "巴尔干硬汉",
    tagline: "我们用足球疗伤",
    vector: v(  4, 7, 5, 8, 6, 8, 5, 5, 7, 4, 5, 6),
  },
  croatia: {
    id: "croatia",
    name: "克罗地亚",
    englishName: "Croatia",
    flag: "🇭🇷",
    accent: "#171796",
    confederation: "UEFA",
    personality: "黑马匠人",
    tagline: "人口四百万，半决赛三连击",
    vector: v(  5, 9, 6, 9, 7, 10, 5, 4, 7, 7, 8, 7),
    why: "你欣赏「小而美」的故事，相信团队里几个核心可以掀翻巨头。克罗地亚仅有 400 万人口，却连续两届世界杯进四强，全靠中场艺术家莫德里奇带出来的几代人。他们打加时赛和点球如喝水，是名副其实的「半决赛专业户」。",
    watchGuide: [
      "重点看中场（10 号位）的调度",
      "他们经常 90 分钟打平、加时赢、点球赢",
      "推荐回看 2018 世界杯连续淘汰丹麦、俄罗斯、英格兰",
      "格子衫球衣是现代足球最辨识度的设计之一",
    ],
    audience: ["小众团队迷", "中场党", "韧性派", "INTP"],
  },
  czechia: {
    id: "czechia",
    name: "捷克",
    englishName: "Czechia",
    flag: "🇨🇿",
    accent: "#d7141a",
    confederation: "UEFA",
    personality: "波西米亚匠人",
    tagline: "技术、冷静、低调地强",
    vector: v(  5, 5, 4, 7, 7, 6, 8, 5, 7, 4, 5, 7),
  },
  england: {
    id: "england",
    name: "英格兰",
    englishName: "England",
    flag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿",
    accent: "#ce1124",
    confederation: "UEFA",
    personality: "永远的下一届",
    tagline: "It's coming home——但还没到家",
    vector: v(  6, 5, 7, 6, 5, 5, 7, 5, 3, 8, 6, 6),
    why: "你接受「努力不一定有回报」，并且能在反复失望中保持热情。三狮军团从 1966 之后就是世界足坛最大的「下一届主角」，但他们的球迷有种特别的执着：一边骂一边唱，一边失望一边期待。这本身，就很英国。",
    watchGuide: [
      "比赛通常会让你又紧张又上火",
      "听一下《Three Lions》这首歌就懂他们的心情",
      "关键球时容易掉链子，是种传统",
      "球迷文化值得专门研究，pub 看球是灵魂",
    ],
    audience: ["乐观的悲观主义者", "英超党", "酒吧文化爱好者", "ISFP"],
  },
  france: {
    id: "france",
    name: "法国",
    englishName: "France",
    flag: "🇫🇷",
    accent: "#0055a4",
    confederation: "UEFA",
    personality: "全能优等生",
    tagline: "什么都会一点，关键时刻就赢了",
    vector: v( 10, 2, 9, 7, 6, 8, 6, 3, 2, 8, 7, 8),
    why: "你做事讲究效率、追求稳定，知道自己想要什么。法国队就像班里那个理科满分还会弹钢琴的同学——阵容深度恐怖、风格灵活、几乎没短板。冠军不是靠运气，是靠选材广、底子厚、教练靠谱。",
    watchGuide: [
      "看球前先看大名单，你会发现他们替补能组另一支强队",
      "比赛节奏可能不刺激，但赢得很「合理」",
      "重点关注姆巴佩的反击速度",
      "他们经常前场散步、后场踢得很稳",
    ],
    audience: ["务实派", "结果导向型", "选材癌", "ISTJ"],
  },
  germany: {
    id: "germany",
    name: "德国",
    englishName: "Germany",
    flag: "🇩🇪",
    accent: "#000000",
    confederation: "UEFA",
    personality: "理性工程师",
    tagline: "我们不是赢了，我们是把对手的失误利用到极致",
    vector: v(  7, 3, 4, 8, 5, 8, 9, 4, 2, 5, 6, 9),
    why: "你相信纪律、规则和系统的力量。德国队是足球世界里的「工程公司」——青训体系、数据分析、心理建设、轮换深度……每一环都打磨得严丝合缝。即便近几届起伏，他们依然是「四星德意志」。你和他们一样：稳。",
    watchGuide: [
      "他们 0-0 也可能踢得很精彩，是战术的胜利",
      "点球大战时永远是德国占心理优势",
      "看比赛同时可以了解一下「克洛普式高压逼抢」",
      "推荐回顾 2014 年世界杯德国 7-1 巴西",
    ],
    audience: ["秩序爱好者", "战术派", "数据分析师", "ISTJ"],
  },
  netherlands: {
    id: "netherlands",
    name: "荷兰",
    englishName: "Netherlands",
    flag: "🇳🇱",
    accent: "#fb8c00",
    confederation: "UEFA",
    personality: "理想主义者",
    tagline: "我们不一定赢，但我们的踢法值得载入史册",
    vector: v(  6, 4, 5, 7, 8, 5, 8, 5, 5, 5, 7, 7),
    why: "你重视理念、风格、做事的「姿势」，宁可输得漂亮也不愿赢得难看。荷兰的「全攻全守」是现代足球的思想源头之一，三次世界杯亚军是足球史上最美的失败者。橙衣军团代表的是一种坚持自己的方式。",
    watchGuide: [
      "看他们如何把后卫推到前场",
      "三届世界杯亚军 = 永远的无冕之王",
      "推荐了解克鲁伊夫、范巴斯滕的故事",
      "比赛时常出现「内部矛盾」的八卦，也是看点",
    ],
    audience: ["理想主义者", "风格党", "无冕之王迷", "INFJ"],
  },
  norway: {
    id: "norway",
    name: "挪威",
    englishName: "Norway",
    flag: "🇳🇴",
    accent: "#ba0c2f",
    confederation: "UEFA",
    personality: "Haaland 的国家",
    tagline: "等了 28 年的重返",
    vector: v(  6, 7, 9, 6, 6, 6, 3, 8, 6, 8, 7, 6),
  },
  portugal: {
    id: "portugal",
    name: "葡萄牙",
    englishName: "Portugal",
    flag: "🇵🇹",
    accent: "#006600",
    confederation: "UEFA",
    personality: "孤胆英雄",
    tagline: "全队的故事，可以只围绕一个人讲",
    vector: v(  7, 4, 10, 5, 7, 7, 5, 5, 3, 9, 8, 5),
    why: "你欣赏自律、野心和「我自己来」的英雄主义。从尤西比奥到 C 罗，葡萄牙总能孕育出一位能扛起全队的超级巨星。他们的比赛永远聚焦在一个名字上——意味着你能很快记住所有剧情。",
    watchGuide: [
      "看 7 号就行，剧情大概率围绕他展开",
      "他们大赛偶有惊喜：2016 欧洲杯冠军是经典",
      "新一代有大量年轻天才，值得专门追",
      "C 罗的庆祝动作 SIIIIU 是文化符号",
    ],
    audience: ["C 罗球迷", "个人英雄主义者", "自律选手", "ENTJ"],
  },
  scotland: {
    id: "scotland",
    name: "苏格兰",
    englishName: "Scotland",
    flag: "🏴󠁧󠁢󠁳󠁣󠁴󠁿",
    accent: "#0065bd",
    confederation: "UEFA",
    personality: "格子军团",
    tagline: "等了 28 年重返世界杯",
    vector: v(  4, 7, 4, 8, 5, 7, 8, 6, 8, 7, 7, 6),
  },
  spain: {
    id: "spain",
    name: "西班牙",
    englishName: "Spain",
    flag: "🇪🇸",
    accent: "#aa151b",
    confederation: "UEFA",
    personality: "传控诗人",
    tagline: "球在脚下，对手就一定追不到",
    vector: v(  7, 3, 5, 9, 9, 5, 7, 5, 3, 6, 7, 9),
    why: "你喜欢慢慢搭建、用过程证明自己，相信「控制就是最好的进攻」。西班牙的 tiki-taka 是足球史上最优雅的体系——短传、跑位、保持控球率，把对手磨到崩溃。你不追求轰轰烈烈，但对「完美的传球路线」上瘾。",
    watchGuide: [
      "重点看中场三人组的小三角传递",
      "他们控球率经常 70%+，可能进球少但赏心悦目",
      "经典回看：2010 年世界杯决赛、2012 欧洲杯决赛",
      "建议静音电视，专心看球员跑位",
    ],
    audience: ["细节控", "中场爱好者", "下棋型人格", "INTJ"],
  },
  sweden: {
    id: "sweden",
    name: "瑞典",
    englishName: "Sweden",
    flag: "🇸🇪",
    accent: "#fecc00",
    confederation: "UEFA",
    personality: "蓝黄军团",
    tagline: "没有伊布，依然在路上",
    vector: v(  5, 5, 4, 8, 5, 7, 6, 5, 6, 4, 6, 7),
  },
  switzerland: {
    id: "switzerland",
    name: "瑞士",
    englishName: "Switzerland",
    flag: "🇨🇭",
    accent: "#ff0000",
    confederation: "UEFA",
    personality: "瑞士军刀",
    tagline: "精密、谨慎、低调地强",
    vector: v(  6, 5, 5, 8, 5, 7, 4, 5, 6, 4, 6, 9),
  },
  turkiye: {
    id: "turkiye",
    name: "土耳其",
    englishName: "Türkiye",
    flag: "🇹🇷",
    accent: "#e30a17",
    confederation: "UEFA",
    personality: "热血新月",
    tagline: "情绪上头，对抗到底",
    vector: v(  5, 7, 6, 7, 6, 8, 4, 6, 5, 7, 6, 5),
  },

  // ── 🥚 Easter Egg：意大利（未参赛 2026）─────────────────
  italy: {
    id: "italy",
    name: "意大利",
    englishName: "Italy",
    flag: "🇮🇹",
    accent: "#0066cc", // azzurri 蓝
    confederation: "UEFA",
    isEasterEgg: true,
    qualified: false,
    personality: "未到场的传奇",
    tagline: "蓝衣军团的遗憾，与不朽",
    // 历史情怀 / 战术秩序 / 铁血抗压 / 小众独特拉得很高（因为缺席本身就是稀缺）
    vector: v(  6, 4, 4, 8, 7, 9, 10, 2, 10, 6, 8, 9),
  },
};

// ─────────────────────────────────────────────────────────────
// 派生：数组形态、过滤器、工具
// ─────────────────────────────────────────────────────────────

/** 全部 49 队（含彩蛋）*/
export const TEAM_LIST: Team[] = Object.values(TEAMS);

/** 2026 正式参赛 48 队（不含意大利）。命名匹配你给定的规范。*/
export const qualifiedTeams2026: Team[] = TEAM_LIST.filter(
  (t) => t.qualified !== false && !t.isEasterEgg,
);

/** 彩蛋队（只含意大利）*/
export const easterEggTeams: Team[] = TEAM_LIST.filter(
  (t) => t.isEasterEgg === true,
);

// ─────────────────────────────────────────────────────────────
// ⚠️ 启动时自检（违反则在构建期 / 启动期立刻抛错，杜绝数据漂移）
// ─────────────────────────────────────────────────────────────
if (qualifiedTeams2026.length !== 48) {
  throw new Error(
    `[WCTI] qualifiedTeams2026.length 必须等于 48，实际 ${qualifiedTeams2026.length}`,
  );
}
if (easterEggTeams.length !== 1) {
  throw new Error(
    `[WCTI] easterEggTeams.length 必须等于 1，实际 ${easterEggTeams.length}`,
  );
}
if (TEAM_LIST.length !== 49) {
  throw new Error(
    `[WCTI] 项目总球队数必须等于 49（48 + 1 彩蛋），实际 ${TEAM_LIST.length}`,
  );
}

// ─────────────────────────────────────────────────────────────
// 工具函数
// ─────────────────────────────────────────────────────────────

// 初始化分数表（旧算法用；切到向量算法后会被替换）
export function createScoreMap(): Record<TeamId, number> {
  return TEAM_LIST.reduce(
    (acc, team) => {
      acc[team.id] = 0;
      return acc;
    },
    {} as Record<TeamId, number>,
  );
}

export function getTeam(id: string): Team | undefined {
  return (TEAMS as Record<string, Team>)[id];
}

export function teamsByConfederation(): Record<string, Team[]> {
  return TEAM_LIST.reduce(
    (acc, team) => {
      (acc[team.confederation] ??= []).push(team);
      return acc;
    },
    {} as Record<string, Team[]>,
  );
}
