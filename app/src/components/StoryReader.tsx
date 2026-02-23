'use client';

import { useEffect, useCallback } from 'react';
import Link from 'next/link';
import { useGameStore } from '@/stores/game-store';
import { ComicPanel } from './ComicPanel';
import { ChoiceNode } from './ChoiceNode';
import { EndingScreen } from './EndingScreen';

export function StoryReader() {
  const {
    story,
    currentSceneId,
    currentPanelIndex,
    isTransitioning,
    getCurrentScene,
    nextPanel,
    prevPanel,
    makeChoice,
    restartStory,
    resetToScene,
  } = useGameStore();

  const scene = getCurrentScene();

  // 如果没有故事，显示加载状态
  if (!story) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <p className="text-white/60">Loading...</p>
      </div>
    );
  }

  // 键盘控制
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (scene?.type === 'choice') return; // 选择场景不响应键盘

      if (e.key === 'ArrowRight' || e.key === ' ' || e.key === 'Enter') {
        e.preventDefault();
        nextPanel();
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        prevPanel();
      }
    },
    [scene, nextPanel, prevPanel]
  );

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  // 点击屏幕继续
  const handleClick = () => {
    if (scene?.type === 'choice' || scene?.type === 'ending') return;
    nextPanel();
  };

  if (!scene) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-white/60">加载中...</p>
      </div>
    );
  }

  return (
    <div
      className={`
        min-h-screen bg-gradient-to-b from-slate-950 via-purple-950 to-slate-950
        transition-opacity duration-500
        ${isTransitioning ? 'opacity-0' : 'opacity-100'}
      `}
    >
      {/* 顶部导航栏 */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-black/50 backdrop-blur-sm">
        <div className="max-w-lg mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link
              href="/universes"
              className="text-white/60 hover:text-white transition-colors"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </Link>
            <div>
              <h1 className="text-white font-medium">{story.titleCn}</h1>
              <p className="text-white/50 text-sm">{story.characterCn}</p>
            </div>
          </div>
          <button
            onClick={restartStory}
            className="text-white/60 hover:text-white text-sm transition-colors"
          >
            重新开始
          </button>
        </div>
      </header>

      {/* 主内容区 */}
      <main className="pt-20 pb-24 px-4">
        {/* 叙事/对话场景 */}
        {(scene.type === 'narration' || scene.type === 'dialogue') && (
          <div
            className="cursor-pointer min-h-[calc(100vh-12rem)]"
            onClick={handleClick}
          >
            {scene.panels?.map((panel, index) => (
              <div
                key={panel.id}
                className={`
                  transition-all duration-500 mb-8
                  ${index === currentPanelIndex ? 'block' : 'hidden'}
                `}
              >
                <ComicPanel
                  panel={panel}
                  isActive={index === currentPanelIndex}
                />
              </div>
            ))}

            {/* 进度指示 */}
            {scene.panels && scene.panels.length > 1 && (
              <div className="flex justify-center gap-1.5 mt-6">
                {scene.panels.map((_, index) => (
                  <div
                    key={index}
                    className={`
                      w-2 h-2 rounded-full transition-all duration-300
                      ${index === currentPanelIndex ? 'bg-pink-400 w-6' : 'bg-white/20'}
                      ${index < currentPanelIndex ? 'bg-pink-400/50' : ''}
                    `}
                  />
                ))}
              </div>
            )}

            {/* 点击继续提示 */}
            <p className="text-center text-white/30 text-sm mt-8 animate-pulse">
              点击屏幕继续
            </p>
          </div>
        )}

        {/* 选择场景 */}
        {scene.type === 'choice' && scene.choice && (
          <div className="min-h-[calc(100vh-12rem)] flex flex-col justify-center">
            <ChoiceNode
              choice={scene.choice}
              sceneId={currentSceneId}
              onSelect={makeChoice}
            />
          </div>
        )}

        {/* 结局场景 */}
        {scene.type === 'ending' && scene.ending && (
          <EndingScreen
            panels={scene.panels}
            ending={scene.ending}
            currentPanelIndex={currentPanelIndex}
            onNextPanel={nextPanel}
            onRestart={restartStory}
            onReplay={() => resetToScene('choice-2')}
          />
        )}
      </main>

      {/* 底部操作栏 */}
      <footer className="fixed bottom-0 left-0 right-0 bg-black/50 backdrop-blur-sm">
        <div className="max-w-lg mx-auto px-4 py-3 flex items-center justify-between">
          <p className="text-white/40 text-sm">
            场景: {currentSceneId}
          </p>
          <div className="flex gap-2">
            <button
              onClick={prevPanel}
              disabled={currentPanelIndex === 0}
              className="px-3 py-1 text-sm text-white/60 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed"
            >
              ← 上一步
            </button>
            <button
              onClick={nextPanel}
              className="px-3 py-1 text-sm text-white/60 hover:text-white"
            >
              下一步 →
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}
