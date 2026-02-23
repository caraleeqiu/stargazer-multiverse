/**
 * 互动剧本生成 Prompts
 * 参考《未名情诗》的分支结构
 */

// 世界观详细设定
export const UNIVERSE_DETAILS: Record<string, string> = {
  'modern-city': `
【世界观：现代都市】
时代：当代（2020年代）
地点：繁华都市
氛围：悬疑、浪漫、都市感
常见场景：写字楼、咖啡厅、医院、雨夜街头、公寓
核心冲突：职场秘密、案件调查、身份隐瞒、禁忌感情
`,
  'campus-youth': `
【世界观：校园青春】
时代：当代
地点：高中或大学校园
氛围：青涩、纯真、怀旧
常见场景：教室、天台、图书馆、樱花树下、放学路上
核心冲突：暗恋、误会、成长、友情与爱情的抉择
`,
  'ancient-jianghu': `
【世界观：古风江湖】
时代：架空古代
地点：江湖、武林
氛围：侠义、浪漫、快意恩仇
常见场景：客栈、山崖、月下、竹林、比武场
核心冲突：门派恩怨、身世之谜、正邪对立、情义两难
`,
  'apocalypse': `
【世界观：末世危机】
时代：近未来
地点：废土、避难所
氛围：紧张、生存、信任危机
常见场景：废墟、地下基地、荒野、物资站
核心冲突：生存抉择、信任与背叛、人性考验、守护与牺牲
`,
};

// 角色详细设定
export const CHARACTER_DETAILS: Record<string, string> = {
  'luke': `
【角色：左然】
来源：未定事件簿
性格：温柔、细腻、外冷内热
身份：金牌律师
与玩家关系：青梅竹马
说话风格：温和但坚定，偶尔调侃，关键时刻会流露真情
代表台词："……我等这句话，等了八年。"
`,
  'gintoki': `
【角色：坂田银时】
来源：银魂
性格：懒散、毒舌、外表不正经但关键时刻可靠
身份：万事屋老板
与玩家关系：可以是同事、委托人、或意外相遇
说话风格：吐槽、玩世不恭，但会在不经意间说出温柔的话
代表台词："要守护的东西太多了，所以才会变强。"
`,
  'tanjiro': `
【角色：灶门炭治郎】
来源：鬼灭之刃
性格：善良、坚韧、温柔但坚定
身份：�的杀队剑士
与玩家关系：同伴、战友、守护者
说话风格：真诚、朴实，会认真对待每一个人
代表台词："不管多么痛苦，都要活下去。"
`,
};

// 主题详细设定
export const THEME_DETAILS: Record<string, string> = {
  'confession': `
【主题：告白抉择】
核心情节：在某个关键时刻，主角需要决定是否表白
情感基调：紧张、心跳、期待、害怕失去
关键场景：独处时刻、情绪积累后的爆发点
结局走向：
- HE：勇敢告白，得到回应
- NE：选择沉默，维持现状
- OE：暧昧试探，留下悬念
`,
  'reunion': `
【主题：久别重逢】
核心情节：分别多年后再次相遇，过去的情感重新涌动
情感基调：怀念、感慨、心情复杂
关键场景：偶然重逢、回忆往事、面对当下
结局走向：
- HE：解开心结，重新开始
- NE：释然告别，各自安好
- OE：留下联系方式，未来可期
`,
  'crisis': `
【主题：生死危机】
核心情节：在危险中相互守护，生死考验下的真情流露
情感基调：紧张、担忧、守护、珍惜
关键场景：危机发生、保护对方、危机解除后的对话
结局走向：
- HE：劫后余生，坦诚心意
- NE：安全脱险，但感情未说破
- OE：留下伏笔，关系微妙变化
`,
  'misunderstanding': `
【主题：误会冰释】
核心情节：因误会产生隔阂，最终真相大白
情感基调：委屈、解释、理解、释然
关键场景：误会产生、冷战对峙、真相揭晓、和解时刻
结局走向：
- HE：误会解开，感情升温
- NE：误会解开，但保持距离
- OE：部分误会解开，仍有秘密
`,
};

/**
 * 生成剧本结构的 Prompt
 */
export function getStructurePrompt(
  universeId: string,
  characterId: string,
  themeId: string
): string {
  const universe = UNIVERSE_DETAILS[universeId] || '';
  const character = CHARACTER_DETAILS[characterId] || '';
  const theme = THEME_DETAILS[themeId] || '';

  return `你是一位专业的互动剧本作家，擅长创作乙女向/女性向的互动小说。

${universe}
${character}
${theme}

请为我生成一个互动剧本的**结构大纲**，要求：

1. **开场场景**：1个场景，建立氛围和背景
2. **铺垫场景**：2-3个场景，发展情节，积累情感
3. **第一选择点**：3个选项，影响中间体验但最终汇聚
4. **分支场景**：每个选项对应1个不同的场景
5. **汇聚场景**：1个场景，三条线在此汇合
6. **核心选择点**：3个选项，决定最终结局
7. **三个结局**：HE（圆满）、NE（普通）、OE（开放）

输出 JSON 格式：
\`\`\`json
{
  "title": "剧本标题",
  "titleCn": "中文标题",
  "synopsis": "一句话简介",
  "scenes": [
    {
      "id": "opening",
      "type": "narration",
      "title": "场景标题",
      "description": "场景简述（用于后续生成详细内容）",
      "nextScene": "下一场景ID"
    },
    {
      "id": "choice-1",
      "type": "choice",
      "title": "选择场景标题",
      "prompt": "选择提示语",
      "options": [
        { "id": "a", "text": "选项A文本", "mood": "情绪标签", "nextScene": "branch-a" },
        { "id": "b", "text": "选项B文本", "mood": "情绪标签", "nextScene": "branch-b" },
        { "id": "c", "text": "选项C文本", "mood": "情绪标签", "nextScene": "branch-c" }
      ]
    },
    {
      "id": "ending-he",
      "type": "ending",
      "endingType": "HE",
      "title": "结局标题",
      "description": "结局简述"
    }
  ]
}
\`\`\`

注意：
- 对话和旁白风格要符合角色性格
- 情感发展要自然，有起伏
- 选项要有明显的情感倾向差异
- 结局要有差异化，不是简单的好坏之分`;
}

/**
 * 生成场景详细内容的 Prompt
 */
export function getSceneContentPrompt(
  universeId: string,
  characterId: string,
  sceneDescription: string
): string {
  const universe = UNIVERSE_DETAILS[universeId] || '';
  const character = CHARACTER_DETAILS[characterId] || '';

  return `你是一位专业的互动剧本作家。

${universe}
${character}

请根据以下场景描述，生成详细的场景内容：

场景描述：${sceneDescription}

要求：
- 生成 2-4 个面板（panel）
- 每个面板包含：旁白或对话
- 对话要符合角色性格
- 旁白要有画面感，便于配图

输出 JSON 格式：
\`\`\`json
{
  "panels": [
    {
      "id": "panel-1",
      "narration": "旁白文本（描述场景、氛围、人物状态）",
      "imagePrompt": "用于生成配图的英文描述"
    },
    {
      "id": "panel-2",
      "narration": "旁白文本",
      "dialogue": {
        "character": "角色名",
        "text": "对话内容"
      },
      "imagePrompt": "用于生成配图的英文描述"
    }
  ]
}
\`\`\``;
}

/**
 * 生成配图描述的 Prompt
 */
export function getImagePrompt(
  universeId: string,
  characterId: string,
  sceneNarration: string
): string {
  return `Convert this scene description into an image generation prompt:

Scene: ${sceneNarration}
Style: Anime/manga style, high quality, emotional, cinematic lighting
Character: Based on ${characterId}
Setting: ${universeId}

Output a single paragraph in English, describing:
- Character appearance and expression
- Scene setting and atmosphere
- Lighting and mood
- Camera angle

Keep it under 100 words.`;
}
