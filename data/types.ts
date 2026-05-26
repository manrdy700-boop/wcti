// 数据层统一类型定义。修改题库或球队时，仅需在 teams.ts / questions.ts 中调整。

export type TeamId =
  | "argentina"
  | "brazil"
  | "france"
  | "england"
  | "germany"
  | "spain"
  | "portugal"
  | "netherlands"
  | "japan"
  | "croatia"
  | "morocco"
  | "mexico";

export interface Team {
  id: TeamId;
  name: string;          // 中文名
  englishName: string;   // 英文名
  flag: string;          // 国旗 emoji
  personality: string;   // 人格类型一句话标签
  tagline: string;       // 与结果页标题搭配的副标题
  why: string;           // 推荐理由（为什么是你的本命）
  watchGuide: string[];  // 入门观赛指南（3-5 条 bullet）
  audience: string[];    // 适合人群标签
  accent: string;        // 球队主色（用于 UI 强调色）
}

export interface QuestionOption {
  // 选项展示文本
  label: string;
  // 此选项为每支球队加的分数；可只列要加分的球队
  scores: Partial<Record<TeamId, number>>;
}

export interface Question {
  id: string;
  prompt: string;
  options: QuestionOption[];
}

// 计分时统一初始化的分数表
export type ScoreMap = Record<TeamId, number>;
