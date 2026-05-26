import type { Team, TeamId } from "./types";

// 修改/扩充球队：在此处编辑即可，UI 会自动更新。
export const TEAMS: Record<TeamId, Team> = {
  argentina: {
    id: "argentina",
    name: "阿根廷",
    englishName: "Argentina",
    flag: "🇦🇷",
    personality: "天才浪漫主义者",
    tagline: "为一个人疯狂，为一场梦哭泣",
    why: "你相信命运、相信天才、也相信悲喜交加的故事。阿根廷的足球永远围绕着一个 No.10——从马拉多纳到梅西——他们的比赛就像一首情诗，赢得不容易，输得也不甘心。你支持的不只是一支球队，而是一种「明知会心碎也要相信」的浪漫。",
    watchGuide: [
      "记住 10 号球员，他通常就是答案",
      "比赛前 60 分钟可能很闷，最后 30 分钟才是高潮",
      "进球后听一下解说员的吼叫，那是球迷情绪的浓缩",
      "看完比赛去搜搜阿根廷球迷在街头唱的《Muchachos》"
    ],
    audience: ["浪漫主义者", "梅西球迷", "戏剧脑", "INFP"],
    accent: "#75aadb"
  },
  brazil: {
    id: "brazil",
    name: "巴西",
    englishName: "Brazil",
    flag: "🇧🇷",
    personality: "桑巴艺术家",
    tagline: "足球是用来跳舞的，不是用来计算的",
    why: "你在意「好看」胜过「赢球」，喜欢一切自由、张扬、有节奏感的东西。巴西是足球世界里最会「表演」的那支队伍——彩虹过人、马赛回旋、进球后的桑巴舞——他们提醒我们足球本来的样子：好玩。",
    watchGuide: [
      "重点看前场 4 个攻击球员的脚下技术",
      "进球庆祝动作往往比进球本身还精彩",
      "如果听到「Samba」，那基本就是巴西打高潮了",
      "经典推荐：1970 年世界杯巴西队比赛集锦"
    ],
    audience: ["视觉系球迷", "颜值党", "嘉年华爱好者", "ENFP"],
    accent: "#fedf00"
  },
  france: {
    id: "france",
    name: "法国",
    englishName: "France",
    flag: "🇫🇷",
    personality: "全能优等生",
    tagline: "什么都会一点，关键时刻就赢了",
    why: "你做事讲究效率、追求稳定，知道自己想要什么。法国队就像班里那个理科满分还会弹钢琴的同学——阵容深度恐怖、风格灵活、几乎没短板。冠军不是靠运气，是靠选材广、底子厚、教练靠谱。",
    watchGuide: [
      "看球前先看大名单，你会发现他们替补能组另一支强队",
      "比赛节奏可能不刺激，但赢得很「合理」",
      "重点关注姆巴佩的反击速度",
      "他们经常前场散步、后场踢得很稳"
    ],
    audience: ["务实派", "结果导向型", "选材癌", "ISTJ"],
    accent: "#0055a4"
  },
  england: {
    id: "england",
    name: "英格兰",
    englishName: "England",
    flag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿",
    personality: "永远的下一届",
    tagline: "It's coming home——但还没到家",
    why: "你接受「努力不一定有回报」，并且能在反复失望中保持热情。三狮军团从 1966 之后就是世界足坛最大的「下一届主角」，但他们的球迷有种特别的执着：一边骂一边唱，一边失望一边期待。这本身，就很英国。",
    watchGuide: [
      "比赛通常会让你又紧张又上火",
      "听一下《Three Lions》这首歌就懂他们的心情",
      "关键球时容易掉链子，是种传统",
      "球迷文化值得专门研究，pub 看球是灵魂"
    ],
    audience: ["乐观的悲观主义者", "英超党", "酒吧文化爱好者", "ISFP"],
    accent: "#ce1124"
  },
  germany: {
    id: "germany",
    name: "德国",
    englishName: "Germany",
    flag: "🇩🇪",
    personality: "理性工程师",
    tagline: "我们不是赢了，我们是把对手的失误利用到极致",
    why: "你相信纪律、规则和系统的力量。德国队是足球世界里的「工程公司」——青训体系、数据分析、心理建设、轮换深度……每一环都打磨得严丝合缝。即便近几届起伏，他们依然是「四星德意志」。你和他们一样：稳。",
    watchGuide: [
      "他们 0-0 也可能踢得很精彩，是战术的胜利",
      "点球大战时永远是德国占心理优势",
      "看比赛同时可以了解一下「克洛普式高压逼抢」",
      "推荐回顾 2014 年世界杯德国 7-1 巴西"
    ],
    audience: ["秩序爱好者", "战术派", "数据分析师", "ISTJ"],
    accent: "#000000"
  },
  spain: {
    id: "spain",
    name: "西班牙",
    englishName: "Spain",
    flag: "🇪🇸",
    personality: "传控诗人",
    tagline: "球在脚下，对手就一定追不到",
    why: "你喜欢慢慢搭建、用过程证明自己，相信「控制就是最好的进攻」。西班牙的 tiki-taka 是足球史上最优雅的体系——短传、跑位、保持控球率，把对手磨到崩溃。你不追求轰轰烈烈，但对「完美的传球路线」上瘾。",
    watchGuide: [
      "重点看中场三人组的小三角传递",
      "他们控球率经常 70%+，可能进球少但赏心悦目",
      "经典回看：2010 年世界杯决赛、2012 欧洲杯决赛",
      "建议静音电视，专心看球员跑位"
    ],
    audience: ["细节控", "中场爱好者", "下棋型人格", "INTJ"],
    accent: "#aa151b"
  },
  portugal: {
    id: "portugal",
    name: "葡萄牙",
    englishName: "Portugal",
    flag: "🇵🇹",
    personality: "孤胆英雄",
    tagline: "全队的故事，可以只围绕一个人讲",
    why: "你欣赏自律、野心和「我自己来」的英雄主义。从尤西比奥到 C 罗，葡萄牙总能孕育出一位能扛起全队的超级巨星。他们的比赛永远聚焦在一个名字上——意味着你能很快记住所有剧情。",
    watchGuide: [
      "看 7 号就行，剧情大概率围绕他展开",
      "他们大赛偶有惊喜：2016 欧洲杯冠军是经典",
      "新一代有大量年轻天才，值得专门追",
      "C 罗的庆祝动作 SIIIIU 是文化符号"
    ],
    audience: ["C 罗球迷", "个人英雄主义者", "自律选手", "ENTJ"],
    accent: "#006600"
  },
  netherlands: {
    id: "netherlands",
    name: "荷兰",
    englishName: "Netherlands",
    flag: "🇳🇱",
    personality: "理想主义者",
    tagline: "我们不一定赢，但我们的踢法值得载入史册",
    why: "你重视理念、风格、做事的「姿势」，宁可输得漂亮也不愿赢得难看。荷兰的「全攻全守」是现代足球的思想源头之一，三次世界杯亚军是足球史上最美的失败者。橙衣军团代表的是一种坚持自己的方式。",
    watchGuide: [
      "看他们如何把后卫推到前场",
      "三届世界杯亚军 = 永远的无冕之王",
      "推荐了解克鲁伊夫、范巴斯滕的故事",
      "比赛时常出现「内部矛盾」的八卦，也是看点"
    ],
    audience: ["理想主义者", "风格党", "无冕之王迷", "INFJ"],
    accent: "#fb8c00"
  },
  japan: {
    id: "japan",
    name: "日本",
    englishName: "Japan",
    flag: "🇯🇵",
    personality: "热血少年",
    tagline: "三十年磨一剑，我们正在登场",
    why: "你相信努力、计划、慢慢变强。日本足球从 90 年代制定百年计划起，一步一个脚印从亚洲弱旅打进 16 强、打赢德国西班牙。蓝武士的精神不在天赋，而在「今天比昨天好一点」。这种成长曲线让人感动。",
    watchGuide: [
      "看他们的体能和跑动数据，一般是全场最高",
      "关注归化与留洋球员的成长史",
      "推荐了解 J 联赛百年计划",
      "球迷赛后捡垃圾的画面是固定彩蛋"
    ],
    audience: ["努力型人格", "动漫党", "亚洲足球关注者", "ISTJ"],
    accent: "#bc002d"
  },
  croatia: {
    id: "croatia",
    name: "克罗地亚",
    englishName: "Croatia",
    flag: "🇭🇷",
    personality: "黑马匠人",
    tagline: "人口四百万，半决赛三连击",
    why: "你欣赏「小而美」的故事，相信团队里几个核心可以掀翻巨头。克罗地亚仅有 400 万人口，却连续两届世界杯进四强，全靠中场艺术家莫德里奇带出来的几代人。他们打加时赛和点球如喝水，是名副其实的「半决赛专业户」。",
    watchGuide: [
      "重点看中场（10 号位）的调度",
      "他们经常 90 分钟打平、加时赢、点球赢",
      "推荐回看 2018 世界杯连续淘汰丹麦、俄罗斯、英格兰",
      "格子衫球衣是现代足球最辨识度的设计之一"
    ],
    audience: ["小众团队迷", "中场党", "韧性派", "INTP"],
    accent: "#171796"
  },
  morocco: {
    id: "morocco",
    name: "摩洛哥",
    englishName: "Morocco",
    flag: "🇲🇦",
    personality: "奇迹缔造者",
    tagline: "我们写历史，没有人能阻挡",
    why: "你相信团结的力量，喜欢看见「不被看好的人逆袭」。摩洛哥是 2022 世界杯最大的故事——首支闯入四强的非洲球队、全员凝聚、为家乡而战。他们用防守反击 + 集体信仰，连斩比利时、西班牙、葡萄牙。新时代的足球之光。",
    watchGuide: [
      "看他们的防守阵型，紧凑而无私",
      "赛后球员和母亲拥抱的画面已成名场面",
      "推荐回顾 2022 世界杯摩洛哥全部比赛",
      "球迷氛围超热烈，全非洲全阿拉伯世界都在加油"
    ],
    audience: ["黑马党", "团结至上", "情感共鸣型", "ENFJ"],
    accent: "#c1272d"
  },
  mexico: {
    id: "mexico",
    name: "墨西哥",
    englishName: "Mexico",
    flag: "🇲🇽",
    personality: "永远的派对",
    tagline: "我们 17 届世界杯，每届都很开心",
    why: "你看球是为了享受当下，而不是为了夺冠。墨西哥球迷可能是世界上最热情的一群——彩绘脸、墨西哥帽、全场跳浪、每场都像嘉年华。球队成绩稳定地停留在 16 强（「第五场魔咒」），但氛围永远第一档。",
    watchGuide: [
      "看球同时听一下他们球迷的合唱",
      "「第五场魔咒」是固定剧情，但球迷不在乎",
      "比赛节奏快、对抗激烈、永不放弃",
      "推荐了解墨西哥 vs 美国的德比文化"
    ],
    audience: ["氛围党", "快乐足球", "派对动物", "ESFP"],
    accent: "#006847"
  }
};

// 数组形式，方便遍历（球队库页 / 题库构建时用）
export const TEAM_LIST: Team[] = Object.values(TEAMS);

// 用于初始化分数表
export function createScoreMap(): Record<TeamId, number> {
  return TEAM_LIST.reduce((acc, team) => {
    acc[team.id] = 0;
    return acc;
  }, {} as Record<TeamId, number>);
}

export function getTeam(id: string): Team | undefined {
  return (TEAMS as Record<string, Team>)[id];
}
