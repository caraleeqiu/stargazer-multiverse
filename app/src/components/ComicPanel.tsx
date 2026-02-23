'use client';

import { Panel } from '@/types/story';
import Image from 'next/image';

interface ComicPanelProps {
  panel: Panel;
  isActive: boolean;
}

// 占位图的渐变色配置
const placeholderGradients: Record<string, string> = {
  'PAGE_1': 'from-amber-900/60 to-stone-900/80',      // 开场引用 - 温暖复古
  'PAGE_2': 'from-slate-800/70 to-blue-900/60',       // 睁眼 - 朦胧
  'PAGE_3': 'from-purple-900/50 to-slate-800/70',     // 担忧特写 - 紫色忧郁
  'PAGE_5': 'from-blue-800/50 to-slate-700/60',       // 递水 - 冷静蓝
  'PAGE_7': 'from-indigo-900/50 to-purple-800/60',    // 特写 - 深邃
  'PAGE_8': 'from-amber-800/40 to-slate-800/60',      // 削苹果 - 暖色
  'PAGE_9': 'from-slate-900/70 to-gray-800/80',       // 别开玩笑 - 严肃
  'PAGE_10': 'from-red-900/40 to-slate-900/70',       // 刀切手 - 紧张红
  'PAGE_11': 'from-slate-700/50 to-indigo-900/60',    // 全身 - 平静
  'PAGE_12': 'from-pink-900/40 to-purple-900/60',     // 含泪 - 感动粉紫
};

// 占位图显示的文字
const placeholderText: Record<string, string> = {
  'PAGE_1': '开场引用',
  'PAGE_2': '醒来',
  'PAGE_3': '左然 · 担忧',
  'PAGE_5': '递水',
  'PAGE_7': '特写',
  'PAGE_8': '削苹果',
  'PAGE_9': '严肃对话',
  'PAGE_10': '刀停 · 告白',
  'PAGE_11': '月光下',
  'PAGE_12': '八年之约',
};

export function ComicPanel({ panel, isActive }: ComicPanelProps) {
  const isPlaceholder = panel.image.startsWith('PAGE_') || !panel.image.startsWith('/');
  const gradient = placeholderGradients[panel.image] || 'from-purple-900/50 to-pink-900/50';
  const text = placeholderText[panel.image] || panel.image;

  return (
    <div
      className={`
        relative w-full max-w-lg mx-auto transition-all duration-500
        ${isActive ? 'opacity-100 scale-100' : 'opacity-50 scale-95'}
      `}
    >
      {/* 同时有对话和旁白时，旁白显示在图片上方 */}
      {panel.narration && panel.dialogue && (
        <div className="mb-4 px-2">
          <p className="text-white/70 text-center text-base italic leading-relaxed">
            {panel.narration}
          </p>
        </div>
      )}

      {/* 漫画图片 */}
      <div className="relative aspect-[9/16] rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
        {isPlaceholder ? (
          // 占位符样式
          <div className={`absolute inset-0 bg-gradient-to-br ${gradient}`}>
            {/* 装饰线条 */}
            <div className="absolute inset-0 opacity-20">
              <div className="absolute top-1/4 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white to-transparent" />
              <div className="absolute top-2/4 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white to-transparent" />
              <div className="absolute top-3/4 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white to-transparent" />
            </div>

            {/* 中心内容 */}
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <div className="w-20 h-20 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center mb-4 border border-white/20">
                <span className="text-3xl">🎬</span>
              </div>
              <p className="text-white/80 text-lg font-medium">{text}</p>
              <p className="text-white/40 text-sm mt-2">{panel.image}</p>
            </div>

            {/* 角落装饰 */}
            <div className="absolute top-4 left-4 w-8 h-8 border-l-2 border-t-2 border-white/20 rounded-tl-lg" />
            <div className="absolute top-4 right-4 w-8 h-8 border-r-2 border-t-2 border-white/20 rounded-tr-lg" />
            <div className="absolute bottom-4 left-4 w-8 h-8 border-l-2 border-b-2 border-white/20 rounded-bl-lg" />
            <div className="absolute bottom-4 right-4 w-8 h-8 border-r-2 border-b-2 border-white/20 rounded-br-lg" />
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

        {/* 对话框 */}
        {panel.dialogue && (
          <div
            className={`
              absolute bottom-4 left-4 right-4
              bg-black/80 backdrop-blur-md rounded-2xl p-4
              border border-white/20 shadow-lg
              ${panel.dialogue.position === 'center' ? 'text-center' : ''}
            `}
          >
            <p className="text-pink-300 text-sm font-medium mb-1.5 tracking-wide">
              {panel.dialogue.character}
            </p>
            <p className="text-white text-base leading-relaxed">
              「{panel.dialogue.text}」
            </p>
          </div>
        )}
      </div>

      {/* 旁白（无对话时显示在下方）*/}
      {panel.narration && !panel.dialogue && (
        <div className="mt-6 px-2">
          <p className="text-white/90 text-center text-lg leading-relaxed">
            {panel.narration}
          </p>
        </div>
      )}
    </div>
  );
}
