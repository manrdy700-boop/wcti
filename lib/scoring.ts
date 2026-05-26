import { QUESTIONS } from "@/data/questions";
import { TEAM_LIST, createScoreMap } from "@/data/teams";
import type { ScoreMap, TeamId } from "@/data/types";

// answers[i] = 用户在第 i 题选择的选项 index（0-based）
// 若某题未作答，传 -1 跳过即可。
export function computeScores(answers: number[]): ScoreMap {
  const scores = createScoreMap();
  QUESTIONS.forEach((question, qIdx) => {
    const chosen = answers[qIdx];
    if (chosen === undefined || chosen < 0) return;
    const option = question.options[chosen];
    if (!option) return;
    for (const [teamId, value] of Object.entries(option.scores)) {
      if (value) scores[teamId as TeamId] += value;
    }
  });
  return scores;
}

// 返回得分最高的球队 id。若并列，取在 TEAM_LIST 中排序更靠前者，保持结果稳定。
export function pickWinner(scores: ScoreMap): TeamId {
  let best: TeamId = TEAM_LIST[0].id;
  let bestScore = -Infinity;
  for (const team of TEAM_LIST) {
    const s = scores[team.id];
    if (s > bestScore) {
      bestScore = s;
      best = team.id;
    }
  }
  return best;
}

// 拿到排序后的完整榜单（可用于结果页的"前三名"展示，目前只在内部用）
export function rankTeams(scores: ScoreMap): { id: TeamId; score: number }[] {
  return TEAM_LIST
    .map((t) => ({ id: t.id, score: scores[t.id] }))
    .sort((a, b) => b.score - a.score);
}
