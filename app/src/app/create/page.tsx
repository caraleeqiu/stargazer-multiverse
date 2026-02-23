'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  convertToStoryFormat,
  buildSceneFlow,
  StoryStructure,
  GenerationStatus
} from '@/lib/generate-story';
import { useGameStore } from '@/stores/game-store';
import { useUserStoriesStore } from '@/stores/user-stories-store';

// 世界观选项
const UNIVERSES = [
  {
    id: 'modern-city',
    name: '现代都市',
    description: '悬疑 · 浪漫',
    detail: '当代城市，霓虹闪烁。职场、案件、都市传说...',
    color: 'from-violet-600 to-blue-600',
  },
  {
    id: 'campus-youth',
    name: '校园青春',
    description: '青涩 · 纯真',
    detail: '阳光洒落的教室，放学后的天台，青春的悸动...',
    color: 'from-pink-500 to-orange-400',
  },
  {
    id: 'ancient-jianghu',
    name: '古风江湖',
    description: '侠义 · 浪漫',
    detail: '刀光剑影，快意恩仇。江湖儿女，情深义重...',
    color: 'from-cyan-600 to-teal-500',
  },
  {
    id: 'apocalypse',
    name: '末世危机',
    description: '紧张 · 生存',
    detail: '文明崩塌后的世界，信任与背叛，生存与抉择...',
    color: 'from-red-600 to-orange-600',
  },
];

// 角色选项
const CHARACTERS = [
  {
    id: 'luke',
    name: '左然',
    source: '未定事件簿',
    traits: '温柔 · 律师 · 青梅竹马',
    avatar: '左',
  },
  {
    id: 'gintoki',
    name: '坂田银时',
    source: '银魂',
    traits: '懒散 · 毒舌 · 外冷内热',
    avatar: '银',
  },
  {
    id: 'tanjiro',
    name: '灶门炭治郎',
    source: '鬼灭之刃',
    traits: '善良 · 坚韧 · 守护者',
    avatar: '炭',
  },
];

// 主题选项
const THEMES = [
  { id: 'confession', name: '告白抉择', icon: '💕', description: '在关键时刻，说出心中的话' },
  { id: 'reunion', name: '久别重逢', icon: '🌧️', description: '多年后的再次相遇' },
  { id: 'crisis', name: '生死危机', icon: '⚡', description: '危险中的相互守护' },
  { id: 'misunderstanding', name: '误会冰释', icon: '🌸', description: '解开心结，坦诚相对' },
];

type Step = 'universe' | 'character' | 'theme' | 'confirm' | 'generating' | 'result';

export default function CreatePage() {
  const router = useRouter();
  const { loadStory } = useGameStore();
  const { saveStory } = useUserStoriesStore();

  const [step, setStep] = useState<Step>('universe');
  const [selectedUniverse, setSelectedUniverse] = useState<string | null>(null);
  const [selectedCharacter, setSelectedCharacter] = useState<string | null>(null);
  const [selectedTheme, setSelectedTheme] = useState<string | null>(null);

  const [generationStatus, setGenerationStatus] = useState<GenerationStatus>('idle');
  const [generatedStructure, setGeneratedStructure] = useState<StoryStructure | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleUniverseSelect = (id: string) => {
    setSelectedUniverse(id);
    setStep('character');
  };

  const handleCharacterSelect = (id: string) => {
    setSelectedCharacter(id);
    setStep('theme');
  };

  const handleThemeSelect = (id: string) => {
    setSelectedTheme(id);
    setStep('confirm');
  };

  const [usedAI, setUsedAI] = useState(false);

  const handleGenerate = async () => {
    if (!selectedUniverse || !selectedCharacter || !selectedTheme) return;

    setStep('generating');
    setGenerationStatus('generating-structure');
    setError(null);
    setUsedAI(false);

    try {
      // 调用服务器端 API 生成剧本
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          universeId: selectedUniverse,
          characterId: selectedCharacter,
          themeId: selectedTheme,
        }),
      });

      const result = await response.json();

      if (!result.success) {
        throw new Error(result.error || '生成失败');
      }

      setGeneratedStructure(result.data);
      setUsedAI(!result.usedMock);
      setGenerationStatus('completed');
      setStep('result');

    } catch (err) {
      console.error('Generation error:', err);
      setError(err instanceof Error ? err.message : '生成失败，请重试');
      setGenerationStatus('error');
      setStep('confirm');
    }
  };

  const handlePlayGenerated = () => {
    if (!generatedStructure || !selectedCharacter || !selectedUniverse || !selectedTheme) return;

    // 转换为游戏格式
    const story = convertToStoryFormat(generatedStructure, selectedCharacter);
    const sceneFlow = buildSceneFlow(generatedStructure);

    const character = CHARACTERS.find(c => c.id === selectedCharacter);

    // 保存到用户故事库
    const storyId = saveStory({
      meta: {
        id: '', // will be set by saveStory
        title: generatedStructure.title,
        titleCn: generatedStructure.titleCn,
        character: character?.name || '',
        characterCn: character?.name || '',
        universeId: selectedUniverse,
        themeId: selectedTheme,
      },
      story: { ...story, id: '' } as any, // ID will be set below
      structure: generatedStructure,
      sceneFlow,
    });

    // 更新 story 的 ID 为保存后的 ID
    const storyWithId = { ...story, id: storyId };

    console.log('[handlePlayGenerated] Saved story:', storyId);
    console.log('[handlePlayGenerated] Story scenes:', story.scenes.map(s => s.id));
    console.log('[handlePlayGenerated] SceneFlow:', sceneFlow);

    // 加载到游戏状态
    loadStory(storyWithId as any, sceneFlow);

    // 使用 setTimeout 确保状态更新完成后再导航
    setTimeout(() => {
      router.push(`/play/${storyId}`);
    }, 100);
  };

  const goBack = () => {
    if (step === 'character') setStep('universe');
    else if (step === 'theme') setStep('character');
    else if (step === 'confirm') setStep('theme');
    else if (step === 'result') setStep('confirm');
  };

  const getStepNumber = () => {
    switch (step) {
      case 'universe': return 1;
      case 'character': return 2;
      case 'theme': return 3;
      case 'confirm':
      case 'generating':
      case 'result': return 4;
    }
  };

  const getSelectedUniverse = () => UNIVERSES.find(u => u.id === selectedUniverse);
  const getSelectedCharacter = () => CHARACTERS.find(c => c.id === selectedCharacter);
  const getSelectedTheme = () => THEMES.find(t => t.id === selectedTheme);

  return (
    <div className="min-h-screen bg-black">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md border-b border-white/10">
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center gap-4">
          {step === 'universe' ? (
            <Link href="/" className="text-white/60 hover:text-white transition-colors">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </Link>
          ) : step !== 'generating' ? (
            <button onClick={goBack} className="text-white/60 hover:text-white transition-colors">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
          ) : (
            <div className="w-6" />
          )}
          <h1 className="text-white font-semibold text-lg">创建故事</h1>
        </div>
      </header>

      {/* Progress */}
      <div className="fixed top-[73px] left-0 right-0 z-40 bg-black/50 backdrop-blur-sm border-b border-white/5">
        <div className="max-w-4xl mx-auto px-6 py-3">
          <div className="flex items-center gap-2">
            {[1, 2, 3, 4].map((num) => (
              <div key={num} className="flex items-center gap-2">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-colors ${
                    getStepNumber() === num
                      ? 'bg-violet-500 text-white'
                      : getStepNumber() > num
                      ? 'bg-violet-500/30 text-violet-300'
                      : 'bg-white/10 text-white/30'
                  }`}
                >
                  {getStepNumber() > num ? '✓' : num}
                </div>
                {num < 4 && (
                  <div className={`w-8 h-0.5 ${getStepNumber() > num ? 'bg-violet-500/50' : 'bg-white/10'}`} />
                )}
              </div>
            ))}
            <div className="ml-4 text-white/40 text-sm">
              {step === 'universe' && '选择世界观'}
              {step === 'character' && '选择角色'}
              {step === 'theme' && '选择主题'}
              {step === 'confirm' && '确认生成'}
              {step === 'generating' && 'AI 生成中...'}
              {step === 'result' && '生成完成'}
            </div>
          </div>
        </div>
      </div>

      {/* Main */}
      <main className="pt-36 pb-12 px-6">
        <div className="max-w-4xl mx-auto">

          {/* Step 1: Universe */}
          {step === 'universe' && (
            <div>
              <h2 className="text-2xl font-bold text-white mb-2">选择世界观</h2>
              <p className="text-white/60 mb-8">故事将发生在什么样的世界？</p>
              <div className="grid md:grid-cols-2 gap-4">
                {UNIVERSES.map((universe) => (
                  <button
                    key={universe.id}
                    onClick={() => handleUniverseSelect(universe.id)}
                    className="group p-6 rounded-2xl border border-white/10 bg-white/5 hover:border-violet-500/50 hover:bg-white/10 transition-all text-left"
                  >
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${universe.color} opacity-80 mb-4`} />
                    <h3 className="text-xl font-bold text-white mb-1">{universe.name}</h3>
                    <p className="text-violet-400 text-sm mb-2">{universe.description}</p>
                    <p className="text-white/40 text-sm">{universe.detail}</p>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 2: Character */}
          {step === 'character' && (
            <div>
              <h2 className="text-2xl font-bold text-white mb-2">选择角色</h2>
              <p className="text-white/60 mb-8">你想和谁展开这段故事？</p>
              <div className="grid md:grid-cols-3 gap-4">
                {CHARACTERS.map((character) => (
                  <button
                    key={character.id}
                    onClick={() => handleCharacterSelect(character.id)}
                    className="group p-6 rounded-2xl border border-white/10 bg-white/5 hover:border-violet-500/50 hover:bg-white/10 transition-all text-left"
                  >
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-violet-500/30 to-pink-500/30 flex items-center justify-center text-2xl mb-4">
                      {character.avatar}
                    </div>
                    <h3 className="text-lg font-bold text-white mb-1">{character.name}</h3>
                    <p className="text-white/50 text-sm mb-2">{character.source}</p>
                    <p className="text-white/40 text-xs">{character.traits}</p>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 3: Theme */}
          {step === 'theme' && (
            <div>
              <h2 className="text-2xl font-bold text-white mb-2">选择主题</h2>
              <p className="text-white/60 mb-8">这个故事的核心情节是什么？</p>
              <div className="grid md:grid-cols-2 gap-4">
                {THEMES.map((theme) => (
                  <button
                    key={theme.id}
                    onClick={() => handleThemeSelect(theme.id)}
                    className="group p-6 rounded-2xl border border-white/10 bg-white/5 hover:border-violet-500/50 hover:bg-white/10 transition-all text-left flex items-center gap-4"
                  >
                    <div className="text-4xl">{theme.icon}</div>
                    <div>
                      <h3 className="text-lg font-bold text-white mb-1">{theme.name}</h3>
                      <p className="text-white/50 text-sm">{theme.description}</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 4: Confirm */}
          {step === 'confirm' && (
            <div>
              <h2 className="text-2xl font-bold text-white mb-2">确认生成</h2>
              <p className="text-white/60 mb-8">检查你的选择，然后生成专属剧本</p>

              {error && (
                <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400">
                  {error}
                </div>
              )}

              <div className="space-y-4 mb-10">
                <div className="p-4 rounded-xl bg-white/5 border border-white/10 flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${getSelectedUniverse()?.color} opacity-80`} />
                  <div>
                    <p className="text-white/40 text-sm">世界观</p>
                    <p className="text-white font-medium">{getSelectedUniverse()?.name}</p>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-white/5 border border-white/10 flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-violet-500/30 to-pink-500/30 flex items-center justify-center text-xl">
                    {getSelectedCharacter()?.avatar}
                  </div>
                  <div>
                    <p className="text-white/40 text-sm">角色</p>
                    <p className="text-white font-medium">{getSelectedCharacter()?.name}</p>
                    <p className="text-white/50 text-xs">{getSelectedCharacter()?.source}</p>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-white/5 border border-white/10 flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center text-2xl">
                    {getSelectedTheme()?.icon}
                  </div>
                  <div>
                    <p className="text-white/40 text-sm">主题</p>
                    <p className="text-white font-medium">{getSelectedTheme()?.name}</p>
                  </div>
                </div>
              </div>

              <button
                onClick={handleGenerate}
                className="w-full py-4 bg-gradient-to-r from-violet-600 to-pink-600 text-white rounded-xl font-medium text-lg hover:from-violet-500 hover:to-pink-500 transition-all flex items-center justify-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                生成专属剧本
              </button>
            </div>
          )}

          {/* Generating */}
          {step === 'generating' && (
            <div className="text-center py-20">
              <div className="w-20 h-20 border-4 border-violet-500/30 border-t-violet-500 rounded-full animate-spin mx-auto mb-8" />
              <h2 className="text-2xl font-bold text-white mb-4">正在生成你的故事...</h2>
              <p className="text-white/60 mb-2">
                {generationStatus === 'generating-structure' && 'Step 1/3: 构建剧情结构...'}
                {generationStatus === 'generating-content' && 'Step 2/3: 生成场景内容...'}
                {generationStatus === 'generating-images' && 'Step 3/3: 生成配图...'}
              </p>
              <p className="text-white/40 text-sm">AI 正在为你创作专属互动剧本</p>
            </div>
          )}

          {/* Result */}
          {step === 'result' && generatedStructure && (
            <div>
              <div className="text-center mb-10">
                <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold text-white mb-2">生成完成！</h2>
                <p className="text-white/60">你的专属故事已经准备好了</p>
                {usedAI && (
                  <div className="mt-2 inline-flex items-center gap-1 px-3 py-1 bg-violet-500/20 rounded-full">
                    <span className="text-violet-400 text-xs">Gemini AI 生成</span>
                  </div>
                )}
              </div>

              {/* Story Preview */}
              <div className="p-6 rounded-2xl bg-white/5 border border-white/10 mb-8">
                <h3 className="text-xl font-bold text-white mb-2">{generatedStructure.titleCn}</h3>
                <p className="text-white/50 text-sm mb-4">{generatedStructure.title}</p>
                <p className="text-white/70 mb-6">{generatedStructure.synopsis}</p>

                <div className="flex items-center gap-4 text-white/40 text-sm">
                  <span>{generatedStructure.scenes.length} 个场景</span>
                  <span>·</span>
                  <span>2 个选择点</span>
                  <span>·</span>
                  <span>3 个结局</span>
                </div>
              </div>

              {/* Scene List Preview */}
              <div className="mb-8">
                <h4 className="text-white/60 text-sm mb-4">剧情结构预览</h4>
                <div className="space-y-2">
                  {generatedStructure.scenes.slice(0, 5).map((scene, index) => (
                    <div
                      key={scene.id}
                      className="flex items-center gap-3 p-3 rounded-lg bg-white/5"
                    >
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs ${
                        scene.type === 'choice' ? 'bg-violet-500/30 text-violet-300' :
                        scene.type === 'ending' ? 'bg-pink-500/30 text-pink-300' :
                        'bg-white/10 text-white/50'
                      }`}>
                        {index + 1}
                      </div>
                      <div className="flex-1">
                        <p className="text-white text-sm">{scene.title}</p>
                        <p className="text-white/40 text-xs">
                          {scene.type === 'choice' ? '选择节点' :
                           scene.type === 'ending' ? `${scene.endingType} 结局` :
                           '叙事场景'}
                        </p>
                      </div>
                    </div>
                  ))}
                  {generatedStructure.scenes.length > 5 && (
                    <p className="text-white/30 text-sm text-center py-2">
                      ... 还有 {generatedStructure.scenes.length - 5} 个场景
                    </p>
                  )}
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-4">
                <button
                  onClick={handlePlayGenerated}
                  className="flex-1 py-4 bg-gradient-to-r from-violet-600 to-pink-600 text-white rounded-xl font-medium text-lg hover:from-violet-500 hover:to-pink-500 transition-all flex items-center justify-center gap-2"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                  开始体验
                </button>
                <button
                  onClick={() => {
                    setStep('confirm');
                    setGeneratedStructure(null);
                  }}
                  className="px-6 py-4 bg-white/10 text-white rounded-xl font-medium hover:bg-white/20 transition-all"
                >
                  重新生成
                </button>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
