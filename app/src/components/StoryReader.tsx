'use client';

import { useEffect, useCallback, useState } from 'react';
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
  } = useGameStore();

  const scene = getCurrentScene();
  const [showUI, setShowUI] = useState(true);

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
      if (scene?.type === 'choice') return;

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

  // 切换UI显示
  const toggleUI = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowUI(!showUI);
  };

  if (!scene) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <p className="text-white/60">加载中...</p>
      </div>
    );
  }

  // 计算整体进度
  const totalScenes = story.scenes.length;
  const currentSceneIndex = story.scenes.findIndex(s => s.id === currentSceneId);
  const progress = ((currentSceneIndex + 1) / totalScenes) * 100;

  return (
    <div
      className={`
        min-h-screen bg-black
        transition-opacity duration-500
        ${isTransitioning ? 'opacity-0' : 'opacity-100'}
      `}
    >
      {/* 顶部进度条 */}
      <div className="fixed top-0 left-0 right-0 z-50 h-1 bg-white/10">
        <div
          className="h-full bg-gradient-to-r from-pink-500 to-violet-500 transition-all duration-500"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* 顶部导航栏 */}
      <header
        className={`
          fixed top-1 left-0 right-0 z-40 transition-all duration-300
          ${showUI ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-full pointer-events-none'}
        `}
      >
        <div className="max-w-2xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link
            href="/stories"
            className="flex items-center gap-2 text-white/60 hover:text-white transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            <span className="text-sm">退出</span>
          </Link>

          <div className="text-center">
            <h1 className="text-white/90 font-medium text-sm">{story.titleCn}</h1>
          </div>

          <button
            onClick={restartStory}
            className="text-white/60 hover:text-white text-sm transition-colors"
          >
            重来
          </button>
        </div>
      </header>

      {/* 主内容区 */}
      <main
        className="min-h-screen flex flex-col"
        onClick={handleClick}
      >
        {/* 叙事/对话场景 */}
        {(scene.type === 'narration' || scene.type === 'dialogue') && (
          <div className="flex-1 flex flex-col cursor-pointer">
            {/* 场景标题 */}
            <div
              className={`
                pt-16 pb-4 px-6 text-center transition-all duration-300
                ${showUI ? 'opacity-100' : 'opacity-0'}
              `}
            >
              <p className="text-white/40 text-xs tracking-widest uppercase mb-1">
                {currentSceneIndex + 1} / {totalScenes}
              </p>
            </div>

            {/* 内容区域 */}
            <div className="flex-1 flex items-center justify-center px-4 pb-32">
              {scene.panels?.map((panel, index) => (
                <div
                  key={panel.id}
                  className={`
                    w-full max-w-md transition-all duration-500
                    ${index === currentPanelIndex
                      ? 'opacity-100 scale-100'
                      : 'opacity-0 scale-95 absolute pointer-events-none'}
                  `}
                >
                  <ComicPanel
                    panel={panel}
                    isActive={index === currentPanelIndex}
                  />
                </div>
              ))}
            </div>

            {/* 底部提示和控制 */}
            <div
              className={`
                fixed bottom-0 left-0 right-0 pb-6 pt-20
                bg-gradient-to-t from-black via-black/80 to-transparent
                transition-all duration-300
                ${showUI ? 'opacity-100 translate-y-0' : 'opacity-50'}
              `}
            >
              <div className="max-w-md mx-auto px-6">
                {/* 面板进度点 */}
                {scene.panels && scene.panels.length > 1 && (
                  <div className="flex justify-center gap-2 mb-4">
                    {scene.panels.map((_, index) => (
                      <div
                        key={index}
                        className={`
                          h-1 rounded-full transition-all duration-300
                          ${index === currentPanelIndex
                            ? 'bg-white w-6'
                            : index < currentPanelIndex
                              ? 'bg-white/50 w-2'
                              : 'bg-white/20 w-2'}
                        `}
                      />
                    ))}
                  </div>
                )}

                {/* 点击提示 */}
                <p className="text-center text-white/30 text-sm animate-pulse">
                  点击继续
                </p>
              </div>
            </div>
          </div>
        )}

        {/* 选择场景 */}
        {scene.type === 'choice' && scene.choice && (
          <div className="flex-1 flex flex-col justify-center px-4 py-20">
            <div className="text-center mb-8">
              <p className="text-white/40 text-xs tracking-widest uppercase mb-2">
                做出选择
              </p>
            </div>
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
          />
        )}
      </main>

      {/* 隐藏/显示UI按钮 */}
      {(scene.type === 'narration' || scene.type === 'dialogue') && (
        <button
          onClick={toggleUI}
          className="fixed bottom-20 right-4 z-50 w-8 h-8 rounded-full bg-white/10 text-white/50 hover:bg-white/20 hover:text-white flex items-center justify-center transition-all"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {showUI ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            )}
          </svg>
        </button>
      )}
    </div>
  );
}
