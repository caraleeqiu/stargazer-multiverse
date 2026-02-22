'use client';

import { Panel } from '@/types/story';

interface ComicPanelProps {
  panel: Panel;
  isActive: boolean;
}

export function ComicPanel({ panel, isActive }: ComicPanelProps) {
  return (
    <div
      className={`
        relative w-full max-w-lg mx-auto transition-all duration-500
        ${isActive ? 'opacity-100 scale-100' : 'opacity-50 scale-95'}
      `}
    >
      {/* 漫画图片占位符 */}
      <div className="relative aspect-[3/4] bg-gradient-to-br from-purple-900/50 to-pink-900/50 rounded-2xl overflow-hidden border border-white/10">
        {/* 占位符图案 */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white/30">
            <svg
              className="w-16 h-16 mx-auto mb-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1}
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            <p className="text-sm">{panel.image}</p>
          </div>
        </div>

        {/* 对话框 */}
        {panel.dialogue && (
          <div
            className={`
              absolute bottom-4 left-4 right-4
              bg-black/70 backdrop-blur-sm rounded-xl p-4
              border border-white/20
            `}
          >
            <p className="text-pink-300 text-sm font-medium mb-1">
              {panel.dialogue.character}
            </p>
            <p className="text-white text-base leading-relaxed">
              {panel.dialogue.text}
            </p>
          </div>
        )}
      </div>

      {/* 旁白 */}
      {panel.narration && !panel.dialogue && (
        <div className="mt-4 px-4">
          <p className="text-white/90 text-center text-lg leading-relaxed">
            {panel.narration}
          </p>
        </div>
      )}

      {/* 同时有对话和旁白时，旁白显示在图片上方 */}
      {panel.narration && panel.dialogue && (
        <div className="mb-4 px-4">
          <p className="text-white/70 text-center text-base italic">
            {panel.narration}
          </p>
        </div>
      )}
    </div>
  );
}
