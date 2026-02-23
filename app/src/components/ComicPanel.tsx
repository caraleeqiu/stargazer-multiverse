'use client';

import { Panel } from '@/types/story';
import Image from 'next/image';

interface ComicPanelProps {
  panel: Panel;
  isActive: boolean;
}

// 占位图的渐变色配置
const placeholderGradients: Record<string, string> = {
  'PAGE_1': 'from-amber-900/40 to-stone-900/60',
  'PAGE_2': 'from-slate-800/50 to-blue-900/40',
  'PAGE_3': 'from-purple-900/40 to-slate-800/50',
  'PAGE_5': 'from-blue-800/40 to-slate-700/50',
  'PAGE_7': 'from-indigo-900/40 to-purple-800/50',
  'PAGE_8': 'from-amber-800/30 to-slate-800/50',
  'PAGE_9': 'from-slate-900/50 to-gray-800/60',
  'PAGE_10': 'from-red-900/30 to-slate-900/50',
  'PAGE_11': 'from-slate-700/40 to-indigo-900/50',
  'PAGE_12': 'from-pink-900/30 to-purple-900/50',
  'ENDING_HE': 'from-pink-600/40 to-rose-900/50',
  'ENDING_NE': 'from-slate-600/40 to-gray-900/50',
  'ENDING_OE': 'from-violet-600/40 to-indigo-900/50',
};

export function ComicPanel({ panel, isActive }: ComicPanelProps) {
  const isPlaceholder = panel.image.startsWith('PAGE_') || panel.image.startsWith('ENDING_') || !panel.image.startsWith('/');
  const gradient = placeholderGradients[panel.image] || 'from-purple-900/40 to-pink-900/40';

  return (
    <div
      className={`
        relative w-full transition-all duration-700
        ${isActive ? 'opacity-100' : 'opacity-0'}
      `}
    >
      {/* 图片区域 */}
      <div className="relative aspect-[4/5] rounded-2xl overflow-hidden mb-6">
        {isPlaceholder ? (
          // 占位符样式 - 更简洁
          <div className={`absolute inset-0 bg-gradient-to-br ${gradient}`}>
            {/* 装饰元素 */}
            <div className="absolute inset-0 opacity-30">
              <div className="absolute top-1/3 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
              <div className="absolute top-2/3 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
            </div>

            {/* 中心图标 */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-16 h-16 rounded-full bg-white/5 backdrop-blur-sm flex items-center justify-center border border-white/10">
                <span className="text-3xl opacity-50">🎬</span>
              </div>
            </div>
          </div>
        ) : (
          // 真实图片
          <Image
            src={panel.image}
            alt=""
            fill
            className="object-cover"
            priority={isActive}
          />
        )}

        {/* 对话框 - 覆盖在图片上 */}
        {panel.dialogue && (
          <div className="absolute bottom-0 left-0 right-0 p-4">
            <div className="bg-black/70 backdrop-blur-md rounded-xl p-4 border border-white/10">
              <p className="text-pink-400 text-sm font-medium mb-1">
                {panel.dialogue.character}
              </p>
              <p className="text-white text-base leading-relaxed">
                「{panel.dialogue.text}」
              </p>
            </div>
          </div>
        )}
      </div>

      {/* 旁白文字 */}
      {panel.narration && (
        <div className="px-2">
          <p className="text-white/90 text-center text-lg leading-loose tracking-wide">
            {panel.narration}
          </p>
        </div>
      )}
    </div>
  );
}
