/**
 * 剧本生成 API 路由
 * POST /api/generate
 */

import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenAI } from '@google/genai';
import { getStructurePrompt } from '@/lib/prompts';

// 初始化 Gemini 客户端
const genAI = new GoogleGenAI({
  apiKey: process.env.GOOGLE_GEMINI_API_KEY || '',
});

interface GenerateRequest {
  universeId: string;
  characterId: string;
  themeId: string;
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

export async function POST(request: NextRequest) {
  try {
    const body: GenerateRequest = await request.json();
    const { universeId, characterId, themeId } = body;

    if (!universeId || !characterId || !themeId) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // 检查 API key
    if (!process.env.GOOGLE_GEMINI_API_KEY) {
      console.warn('No API key configured, returning mock data');
      return NextResponse.json({
        success: true,
        usedMock: true,
        data: getMockStructure(characterId, themeId)
      });
    }

    // 生成 prompt
    const prompt = getStructurePrompt(universeId, characterId, themeId);
    console.log('Generating story with Gemini...');

    // 调用 Gemini API
    const response = await genAI.models.generateContent({
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
    const structure = JSON.parse(jsonStr);

    // 验证结构
    if (!structure.title || !structure.scenes || !Array.isArray(structure.scenes)) {
      console.warn('Invalid structure from AI, returning mock');
      return NextResponse.json({
        success: true,
        usedMock: true,
        data: getMockStructure(characterId, themeId)
      });
    }

    return NextResponse.json({
      success: true,
      usedMock: false,
      data: structure
    });

  } catch (error) {
    console.error('Error in generate API:', error);

    // 出错时返回 mock 数据而不是错误
    return NextResponse.json({
      success: true,
      usedMock: true,
      error: error instanceof Error ? error.message : 'Unknown error',
      data: getMockStructure('luke', 'confession')
    });
  }
}

// Mock 数据生成
function getMockStructure(characterId: string, themeId: string) {
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

  const characterName = characterNames[characterId] || '他';
  const themeName = themeNames[themeId] || '故事';

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
