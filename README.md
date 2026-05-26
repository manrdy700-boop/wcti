# WCTI · 世界杯本命球队测试

一个用 12 道题帮你找到"本命世界杯球队"的网页小工具。

技术栈：Next.js 14 (App Router) + TypeScript + Tailwind CSS。无后端，无数据库，无登录。

## 启动

```bash
npm install
npm run dev
```

然后打开 http://localhost:3000

## 目录结构

```
app/
  layout.tsx                 # 全局布局 + 顶部导航
  page.tsx                   # 首页
  globals.css                # 全局样式 + 球场背景
  quiz/page.tsx              # 测试页（客户端组件）
  result/[teamId]/page.tsx   # 结果页（静态生成）
  result/[teamId]/not-found.tsx
  teams/page.tsx             # 球队库
components/
  CopyLinkButton.tsx         # 复制链接按钮
data/
  types.ts                   # Team / Question 等类型
  teams.ts                   # 12 支球队数据
  questions.ts               # 12 道题目数据
lib/
  scoring.ts                 # 答案 → 球队 的计分逻辑
```

## 修改题库 / 球队库

- **加题**：在 `data/questions.ts` 的 `QUESTIONS` 数组里追加一项。每个选项的 `scores` 用对象形式记录给哪些球队加分（可只列要加分的）。
- **加球队**：先在 `data/types.ts` 的 `TeamId` 联合类型里加一个 id，再在 `data/teams.ts` 的 `TEAMS` 对象里补一项。`accent` 是球队主色（hex），用于 UI 强调色。
- **删球队**：从 `TEAMS` 删除，同时在 `data/types.ts` 移除该 id；记得把 `questions.ts` 中所有引用该 id 的 `scores` 字段一并删除。

## 后续可做（图片占位已留好）

- `app/teams/page.tsx` 卡片头部目前是 `🇦🇷` 风格的 emoji 占位 + "Image · TODO" 角标，引入正式球队图片时把 `<div>` 块换成 `<Image src={team.image} ... />` 即可，建议在 `data/types.ts` 的 `Team` 接口里加一个 `image: string` 字段。
- 结果页 `app/result/[teamId]/page.tsx` 的顶部 hero 区也可以加一张代表性图片。

## 部署

可直接部署到 Vercel：`vercel` 一键即可。所有结果页都通过 `generateStaticParams` 预生成为静态页面。
