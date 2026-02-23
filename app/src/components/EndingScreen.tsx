'use client';

import { useRouter } from 'next/navigation';
import { Ending, Panel } from '@/types/story';
import { useGameStore } from '@/stores/game-store';

interface EndingScreenProps {
  panels?: Panel[];
  ending: Ending;
  onRestart: () => void;
  currentPanelIndex: number;
  onNextPanel: () => void;
}

export function EndingScreen({
  panels,
  ending,
  onRestart,
  currentPanelIndex,
  onNextPanel,
}: EndingScreenProps) {
  const router = useRouter();
  const { unlockedEndings } = useGameStore();
  const showEndingCard = !panels || currentPanelIndex >= panels.length - 1;

  const handleBackToStories = () => {
    router.push('/stories');
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-8">
      {/* 如果还有面板没看完，先显示面板 */}
      {panels && currentPanelIndex < panels.length && (
        <div
          className="w-full max-w-lg mx-auto cursor-pointer"
          onClick={onNextPanel}
        >
          {/* 当前面板 */}
          <div className="relative aspect-[3/4] bg-gradient-to-br from-purple-900/50 to-pink-900/50 rounded-2xl overflow-hidden border border-white/10 mb-4">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center text-white/30">
                <p className="text-sm">{panels[currentPanelIndex].image}</p>
              </div>
            </div>

            {panels[currentPanelIndex].dialogue && (
              <div className="absolute bottom-4 left-4 right-4 bg-black/70 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                <p className="text-pink-300 text-sm font-medium mb-1">
                  {panels[currentPanelIndex].dialogue?.character}
                </p>
                <p className="text-white text-base leading-relaxed">
                  {panels[currentPanelIndex].dialogue?.text}
                </p>
              </div>
            )}
          </div>

          {panels[currentPanelIndex].narration && (
            <p className="text-white/90 text-center text-lg leading-relaxed mb-4">
              {panels[currentPanelIndex].narration}
            </p>
          )}

          <p className="text-white/40 text-center text-sm">点击继续</p>
        </div>
      )}

      {/* 结局卡片 */}
      {showEndingCard && (
        <div className="w-full max-w-md animate-fade-in">
          {/* 结局类型标签 */}
          <div className="flex justify-center mb-4">
            <span
              className={`
                px-4 py-1 rounded-full text-sm font-medium
                ${ending.type === 'HE' ? 'bg-pink-500/30 text-pink-300' : ''}
                ${ending.type === 'NE' ? 'bg-blue-500/30 text-blue-300' : ''}
                ${ending.type === 'OE' ? 'bg-purple-500/30 text-purple-300' : ''}
              `}
            >
              {ending.title}
            </span>
          </div>

          {/* 结局标题 */}
          <h2 className="text-2xl font-bold text-center text-white mb-3">
            {ending.titleCn}
          </h2>

          {/* 结局图片占位符 */}
          <div className="aspect-video bg-gradient-to-br from-purple-900/50 to-pink-900/50 rounded-2xl overflow-hidden border border-white/10 mb-6">
            <div className="w-full h-full flex items-center justify-center text-white/30">
              <p className="text-sm">{ending.image}</p>
            </div>
          </div>

          {/* 结局描述 */}
          <p className="text-white/80 text-center text-base leading-relaxed mb-8">
            {ending.description}
          </p>

          {/* 结局收集进度 */}
          <div className="flex justify-center gap-3 mb-8">
            {['HE', 'NE', 'OE'].map((type) => (
              <div
                key={type}
                className={`
                  w-12 h-12 rounded-full flex items-center justify-center text-sm font-medium border-2
                  ${unlockedEndings.includes(type)
                    ? type === 'HE' ? 'bg-pink-500/30 border-pink-500 text-pink-300'
                      : type === 'OE' ? 'bg-purple-500/30 border-purple-500 text-purple-300'
                      : 'bg-blue-500/30 border-blue-500 text-blue-300'
                    : 'bg-white/5 border-white/20 text-white/30'
                  }
                `}
              >
                {type}
              </div>
            ))}
          </div>

          {/* 操作按钮 */}
          <div className="space-y-3">
            <button
              onClick={onRestart}
              className="w-full py-3 px-6 rounded-xl bg-gradient-to-r from-pink-500 to-purple-600 text-white hover:from-pink-400 hover:to-purple-500 transition-colors"
            >
              重新开始（探索其他结局）
            </button>
            <button
              onClick={handleBackToStories}
              className="w-full py-3 px-6 rounded-xl bg-white/10 text-white hover:bg-white/20 transition-colors"
            >
              返回故事库
            </button>
          </div>

          {/* 结局收集提示 */}
          <p className="text-center text-white/40 text-sm mt-6">
            已解锁 {unlockedEndings.length}/3 个结局
          </p>
        </div>
      )}
    </div>
  );
}
