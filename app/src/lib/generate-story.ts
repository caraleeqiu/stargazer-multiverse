/**
 * 互动剧本生成服务
 * 使用 Google Gemini API 生成剧本内容
 */

import { GoogleGenAI } from '@google/genai';
import { getStructurePrompt, getSceneContentPrompt, getImagePrompt } from './prompts';

// 延迟初始化 Gemini 客户端
let genAI: GoogleGenAI | null = null;

function getGenAI(): GoogleGenAI | null {
  if (!genAI && process.env.GOOGLE_GEMINI_API_KEY) {
    genAI = new GoogleGenAI({
      apiKey: process.env.GOOGLE_GEMINI_API_KEY,
    });
  }
  return genAI;
}

// 生成状态
export type GenerationStatus =
  | 'idle'
  | 'generating-structure'
  | 'generating-content'
  | 'generating-images'
  | 'completed'
  | 'error';

// 剧本结构（从 AI 返回）
export interface StoryStructure {
  title: string;
  titleCn: string;
  synopsis: string;
  scenes: SceneStructure[];
}

export interface SceneStructure {
  id: string;
  type: 'narration' | 'choice' | 'ending';
  title: string;
  description?: string;
  nextScene?: string;
  prompt?: string;
  options?: ChoiceOption[];
  endingType?: 'HE' | 'NE' | 'OE';
}

export interface ChoiceOption {
  id: string;
  text: string;
  mood: string;
  nextScene: string;
}

// 生成配置
export interface GenerateConfig {
  universeId: string;
  characterId: string;
  themeId: string;
  apiKey?: string; // 可选的自定义 API key
}

/**
 * 从 AI 响应中提取 JSON
 */
function extractJSON(text: string): string {
  // 尝试提取 ```json ... ``` 块
  const jsonBlockMatch = text.match(/```json\s*([\s\S]*?)\s*```/);
  if (jsonBlockMatch) {
    return jsonBlockMatch[1].trim();
  }

  // 尝试提取 ``` ... ``` 块
  const codeBlockMatch = text.match(/```\s*([\s\S]*?)\s*```/);
  if (codeBlockMatch) {
    return codeBlockMatch[1].trim();
  }

  // 尝试找到 JSON 对象
  const jsonMatch = text.match(/\{[\s\S]*\}/);
  if (jsonMatch) {
    return jsonMatch[0];
  }

  return text;
}

/**
 * 生成剧本结构
 */
export async function generateStoryStructure(config: GenerateConfig): Promise<StoryStructure> {
  const prompt = getStructurePrompt(config.universeId, config.characterId, config.themeId);

  console.log('=== 生成剧本结构 ===');
  console.log('Config:', { universe: config.universeId, character: config.characterId, theme: config.themeId });

  // 检查 API key
  const apiKey = config.apiKey || process.env.GOOGLE_GEMINI_API_KEY;
  if (!apiKey) {
    console.warn('No API key found, using mock data');
    await simulateDelay(2000);
    return getMockStructure(config);
  }

  try {
    // 使用 Gemini API
    const ai = config.apiKey
      ? new GoogleGenAI({ apiKey: config.apiKey })
      : getGenAI();

    if (!ai) {
      console.warn('No Gemini client available, using mock data');
      return getMockStructure(config);
    }

    const response = await ai.models.generateContent({
      model: 'gemini-2.0-flash',
      contents: prompt,
      config: {
        temperature: 0.8,
        maxOutputTokens: 4096,
      },
    });

    const text = response.text || '';
    console.log('AI Response length:', text.length);

    // 提取并解析 JSON
    const jsonStr = extractJSON(text);
    const structure = JSON.parse(jsonStr) as StoryStructure;

    // 验证结构
    if (!structure.title || !structure.scenes || !Array.isArray(structure.scenes)) {
      console.warn('Invalid structure, using mock data');
      return getMockStructure(config);
    }

    console.log('Generated structure:', structure.title, '-', structure.scenes.length, 'scenes');
    return structure;

  } catch (error) {
    console.error('Error generating story structure:', error);
    // 出错时使用 mock 数据
    console.warn('Using mock data due to error');
    await simulateDelay(1000);
    return getMockStructure(config);
  }
}

/**
 * 生成场景详细内容
 */
export async function generateSceneContent(
  config: GenerateConfig,
  sceneDescription: string
): Promise<{ panels: PanelContent[] }> {
  const prompt = getSceneContentPrompt(config.universeId, config.characterId, sceneDescription);

  console.log('=== 生成场景内容 ===');
  console.log('Scene:', sceneDescription);

  const apiKey = config.apiKey || process.env.GOOGLE_GEMINI_API_KEY;
  if (!apiKey) {
    await simulateDelay(1000);
    return getDefaultPanels(sceneDescription);
  }

  try {
    const ai = config.apiKey
      ? new GoogleGenAI({ apiKey: config.apiKey })
      : getGenAI();

    if (!ai) {
      return getDefaultPanels(sceneDescription);
    }

    const response = await ai.models.generateContent({
      model: 'gemini-2.0-flash',
      contents: prompt,
      config: {
        temperature: 0.7,
        maxOutputTokens: 2048,
      },
    });

    const text = response.text || '';
    const jsonStr = extractJSON(text);
    const result = JSON.parse(jsonStr) as { panels: PanelContent[] };

    if (!result.panels || !Array.isArray(result.panels)) {
      return getDefaultPanels(sceneDescription);
    }

    return result;

  } catch (error) {
    console.error('Error generating scene content:', error);
    return getDefaultPanels(sceneDescription);
  }
}

export interface PanelContent {
  id: string;
  narration?: string;
  dialogue?: {
    character: string;
    text: string;
  };
  imagePrompt: string;
}

function getDefaultPanels(sceneDescription: string): { panels: PanelContent[] } {
  return {
    panels: [
      {
        id: 'panel-1',
        narration: sceneDescription,
        imagePrompt: 'anime style scene, emotional moment, cinematic lighting'
      }
    ]
  };
}

/**
 * 生成配图
 * TODO: 接入图像生成 API (Stable Diffusion / DALL-E / Midjourney / Gemini)
 */
export async function generateImage(imagePrompt: string): Promise<string> {
  console.log('=== 生成配图 ===');
  console.log('Image prompt:', imagePrompt);

  // TODO: 可以使用 Gemini 2.0 Flash 的图像生成功能
  // model: 'gemini-2.0-flash-exp-image-generation'

  await simulateDelay(500);

  // 返回占位图
  return '/images/luke-pearce/Main-Story/01-opening.png';
}

// ============ Mock 数据 ============

function simulateDelay(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function getMockStructure(config: GenerateConfig): StoryStructure {
  const characterNames: Record<string, string> = {
    'luke': '左然',
    'gintoki': '坂田银时',
    'tanjiro': '灶门炭治郎'
  };

  const themeNames: Record<string, string> = {
    'confession': '告白',
    'reunion': '重逢',
    'crisis': '危机',
    'misunderstanding': '误会'
  };

  const characterName = characterNames[config.characterId] || '他';
  const themeName = themeNames[config.themeId] || '故事';

  return {
    title: `A Story of ${themeName}`,
    titleCn: `与${characterName}的${themeName}`,
    synopsis: `在这个世界里，你与${characterName}之间会发生怎样的故事？`,
    scenes: [
      {
        id: 'opening',
        type: 'narration',
        title: '开场',
        description: '故事的开始，你与他的相遇...',
        nextScene: 'buildup-1'
      },
      {
        id: 'buildup-1',
        type: 'narration',
        title: '铺垫',
        description: '情感在日常中慢慢积累...',
        nextScene: 'choice-1'
      },
      {
        id: 'choice-1',
        type: 'choice',
        title: '第一个抉择',
        prompt: '面对他的目光，你选择...',
        options: [
          { id: 'a', text: '调侃地回应', mood: '俏皮', nextScene: 'branch-a' },
          { id: 'b', text: '认真地回答', mood: '真诚', nextScene: 'branch-b' },
          { id: 'c', text: '沉默不语', mood: '内敛', nextScene: 'branch-c' }
        ]
      },
      {
        id: 'branch-a',
        type: 'narration',
        title: '俏皮的回应',
        description: '你选择用轻松的方式化解尴尬...',
        nextScene: 'convergence'
      },
      {
        id: 'branch-b',
        type: 'narration',
        title: '真诚的回答',
        description: '你选择坦诚面对...',
        nextScene: 'convergence'
      },
      {
        id: 'branch-c',
        type: 'narration',
        title: '沉默的选择',
        description: '有些话不需要说出口...',
        nextScene: 'convergence'
      },
      {
        id: 'convergence',
        type: 'narration',
        title: '汇聚',
        description: '不管之前如何选择，你们来到了同一个时刻...',
        nextScene: 'choice-2'
      },
      {
        id: 'choice-2',
        type: 'choice',
        title: '核心抉择',
        prompt: '此刻，你决定...',
        options: [
          { id: 'a', text: '说出心里话', mood: '勇敢', nextScene: 'ending-he' },
          { id: 'b', text: '保持现状', mood: '克制', nextScene: 'ending-ne' },
          { id: 'c', text: '试探他的心意', mood: '试探', nextScene: 'ending-oe' }
        ]
      },
      {
        id: 'ending-he',
        type: 'ending',
        endingType: 'HE',
        title: '圆满结局',
        description: '你鼓起勇气说出了心里话，而他的回应让你明白，等待是值得的。'
      },
      {
        id: 'ending-ne',
        type: 'ending',
        endingType: 'NE',
        title: '普通结局',
        description: '你选择了沉默，一切回归平静。也许这样也好，至少不会失去现在拥有的。'
      },
      {
        id: 'ending-oe',
        type: 'ending',
        endingType: 'OE',
        title: '开放结局',
        description: '你试探性地抛出了问题，他的眼神变得深邃。这个故事，还没有结束。'
      }
    ]
  };
}

/**
 * 将生成的结构转换为游戏可用的 Story 格式
 */
export function convertToStoryFormat(structure: StoryStructure, characterId: string) {
  const characterNames: Record<string, { en: string; cn: string }> = {
    'luke': { en: 'Luke Pearce', cn: '左然' },
    'gintoki': { en: 'Sakata Gintoki', cn: '坂田银时' },
    'tanjiro': { en: 'Kamado Tanjiro', cn: '灶门炭治郎' }
  };

  const char = characterNames[characterId] || { en: 'Unknown', cn: '未知' };

  return {
    id: `generated-${Date.now()}`,
    title: structure.title,
    titleCn: structure.titleCn,
    character: char.en,
    characterCn: char.cn,
    cover: '/images/luke-pearce/Main-Story/01-opening.png', // TODO: 生成封面
    estimatedTime: '5 min',
    scenes: structure.scenes.map(scene => ({
      id: scene.id,
      type: scene.type,
      panels: scene.type !== 'choice' ? [
        {
          id: `${scene.id}-panel-1`,
          image: 'PAGE_1', // TODO: 替换为生成的图片
          narration: scene.description || ''
        }
      ] : undefined,
      choice: scene.type === 'choice' ? {
        prompt: scene.prompt,
        options: scene.options?.map(opt => ({
          id: opt.id,
          text: opt.mood,
          textCn: opt.text,
          mood: opt.mood,
          nextSceneId: opt.nextScene
        }))
      } : undefined,
      ending: scene.type === 'ending' ? {
        type: scene.endingType || 'NE',
        title: scene.endingType === 'HE' ? 'Happy Ending' : scene.endingType === 'OE' ? 'Open Ending' : 'Normal Ending',
        titleCn: scene.title,
        description: scene.description || '',
        image: 'PAGE_1'
      } : undefined
    }))
  };
}

/**
 * 构建场景流转图
 */
export function buildSceneFlow(structure: StoryStructure): Record<string, string> {
  const flow: Record<string, string> = {};

  for (const scene of structure.scenes) {
    if (scene.nextScene) {
      flow[scene.id] = scene.nextScene;
    }
  }

  return flow;
}
