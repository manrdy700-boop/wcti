import type { Question } from "./types";

// 修改/扩充题库：在此处编辑即可。
// 每个选项的 scores 是对各球队加的分数，可以只列要加分的球队。
// 提示：让每支球队在所有题目里能拿到大致相近的总分，最终结果会更均衡。

export const QUESTIONS: Question[] = [
  {
    id: "q1_weekend",
    prompt: "周末更想做哪件事？",
    options: [
      {
        label: "看一场酣畅淋漓的进攻大战",
        scores: { brazil: 1, netherlands: 1, spain: 1 }
      },
      {
        label: "和朋友开派对到天亮",
        scores: { mexico: 1, argentina: 1, morocco: 1 }
      },
      {
        label: "一个人安静地看书或拼乐高",
        scores: { germany: 1, japan: 1, croatia: 1 }
      },
      {
        label: "看一部催泪的文艺片",
        scores: { portugal: 1, england: 1, france: 1 }
      }
    ]
  },
  {
    id: "q2_idol",
    prompt: "你的偶像通常是哪一种？",
    options: [
      {
        label: "天才横溢的艺术家",
        scores: { argentina: 1, brazil: 1, france: 1 }
      },
      {
        label: "默默坚持的工匠",
        scores: { croatia: 1, japan: 1, germany: 1 }
      },
      {
        label: "独闯天涯的英雄",
        scores: { portugal: 1, netherlands: 1, england: 1 }
      },
      {
        label: "凝聚集体的领袖",
        scores: { morocco: 1, spain: 1, mexico: 1 }
      }
    ]
  },
  {
    id: "q3_focus",
    prompt: "看球时你最在意什么？",
    options: [
      {
        label: "比分和结果",
        scores: { germany: 1, france: 1, england: 1 }
      },
      {
        label: "球员个人发挥",
        scores: { argentina: 1, portugal: 1, brazil: 1 }
      },
      {
        label: "战术与博弈",
        scores: { spain: 1, croatia: 1, netherlands: 1 }
      },
      {
        label: "现场氛围",
        scores: { mexico: 1, morocco: 1, japan: 1 }
      }
    ]
  },
  {
    id: "q4_motto",
    prompt: "下面哪句话最像你？",
    options: [
      {
        label: "结果比过程重要",
        scores: { germany: 1, france: 1, england: 1 }
      },
      {
        label: "管它呢，开心就好",
        scores: { mexico: 1, brazil: 1, morocco: 1 }
      },
      {
        label: "总有一天会属于我",
        scores: { portugal: 1, croatia: 1, argentina: 1 }
      },
      {
        label: "我们一起加油",
        scores: { japan: 1, spain: 1, netherlands: 1 }
      }
    ]
  },
  {
    id: "q5_travel",
    prompt: "你最喜欢的旅行风格？",
    options: [
      {
        label: "文艺浪漫之旅",
        scores: { argentina: 1, portugal: 1, france: 1 }
      },
      {
        label: "海边狂欢",
        scores: { brazil: 1, mexico: 1, morocco: 1 }
      },
      {
        label: "严谨打卡历史名城",
        scores: { germany: 1, england: 1, netherlands: 1 }
      },
      {
        label: "体验本地文化与美食",
        scores: { japan: 1, spain: 1, croatia: 1 }
      }
    ]
  },
  {
    id: "q6_love",
    prompt: "你心目中的爱情更接近？",
    options: [
      {
        label: "命中注定的天才相遇",
        scores: { argentina: 1, portugal: 1, brazil: 1 }
      },
      {
        label: "细水长流的陪伴",
        scores: { germany: 1, japan: 1, croatia: 1 }
      },
      {
        label: "热烈奔放的火花",
        scores: { mexico: 1, spain: 1, morocco: 1 }
      },
      {
        label: "理想主义的浪漫",
        scores: { netherlands: 1, france: 1, england: 1 }
      }
    ]
  },
  {
    id: "q7_team",
    prompt: "团队合作时你通常会？",
    options: [
      {
        label: "主导全局，分配任务",
        scores: { france: 1, germany: 1, portugal: 1 }
      },
      {
        label: "默默打辅助",
        scores: { japan: 1, croatia: 1, netherlands: 1 }
      },
      {
        label: "靠灵感制造惊喜",
        scores: { brazil: 1, argentina: 1, morocco: 1 }
      },
      {
        label: "营造氛围让大家放松",
        scores: { mexico: 1, spain: 1, england: 1 }
      }
    ]
  },
  {
    id: "q8_failure",
    prompt: "面对失败你的反应是？",
    options: [
      {
        label: "收拾心情立刻再来",
        scores: { japan: 1, germany: 1, croatia: 1 }
      },
      {
        label: "太痛苦了，先别提",
        scores: { england: 1, netherlands: 1, mexico: 1 }
      },
      {
        label: "戏剧性也是美的一部分",
        scores: { argentina: 1, brazil: 1, portugal: 1 }
      },
      {
        label: "把它当命运的考验",
        scores: { morocco: 1, spain: 1, france: 1 }
      }
    ]
  },
  {
    id: "q9_style",
    prompt: "你直觉里最喜欢哪种足球风格？",
    options: [
      {
        label: "大开大合的进攻流",
        scores: { brazil: 1, netherlands: 1, germany: 1 }
      },
      {
        label: "行云流水的传控",
        scores: { spain: 1, france: 1, argentina: 1 }
      },
      {
        label: "稳守反击、一击必杀",
        scores: { morocco: 1, croatia: 1, portugal: 1 }
      },
      {
        label: "拼到最后一秒",
        scores: { japan: 1, england: 1, mexico: 1 }
      }
    ]
  },
  {
    id: "q10_label",
    prompt: "下面哪个「标签」你能笑着接受？",
    options: [
      {
        label: "又菜又爱玩",
        scores: { mexico: 1, england: 1, morocco: 1 }
      },
      {
        label: "高冷的强者",
        scores: { germany: 1, france: 1, netherlands: 1 }
      },
      {
        label: "浪漫的天才",
        scores: { argentina: 1, brazil: 1, portugal: 1 }
      },
      {
        label: "努力型选手",
        scores: { japan: 1, croatia: 1, spain: 1 }
      }
    ]
  },
  {
    id: "q11_legend",
    prompt: "关于「传奇」，你的态度更接近？",
    options: [
      {
        label: "我就是为传奇而生",
        scores: { argentina: 1, portugal: 1, brazil: 1 }
      },
      {
        label: "传奇是集体共同的胜利",
        scores: { spain: 1, germany: 1, france: 1 }
      },
      {
        label: "我们正在创造新的传奇",
        scores: { morocco: 1, japan: 1, croatia: 1 }
      },
      {
        label: "传奇？我更想 party",
        scores: { mexico: 1, england: 1, netherlands: 1 }
      }
    ]
  },
  {
    id: "q12_dream",
    prompt: "如果你加入一支世界杯球队，你想要的是？",
    options: [
      {
        label: "稳稳抱大腿夺冠",
        scores: { france: 1, argentina: 1, germany: 1 }
      },
      {
        label: "黑马一战成名",
        scores: { morocco: 1, croatia: 1, japan: 1 }
      },
      {
        label: "输赢都浪漫，球风优先",
        scores: { brazil: 1, portugal: 1, spain: 1 }
      },
      {
        label: "球迷氛围最棒的那一队",
        scores: { mexico: 1, england: 1, netherlands: 1 }
      }
    ]
  }
];
