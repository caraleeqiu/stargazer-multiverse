'use client';

import { ChoiceNode as ChoiceNodeType } from '@/types/story';

interface ChoiceNodeProps {
  choice: ChoiceNodeType;
  sceneId: string;
  onSelect: (choiceId: string, optionId: string, nextSceneId: string) => void;
}

export function ChoiceNode({ choice, sceneId, onSelect }: ChoiceNodeProps) {
  return (
    <div className="w-full max-w-lg mx-auto px-4">
      {/* 提示语 */}
      {choice.prompt && (
        <p className="text-white/80 text-center text-lg mb-6">
          {choice.prompt}
        </p>
      )}

      {/* 选项卡片 */}
      <div className="space-y-3">
        {choice.options.map((option, index) => (
          <button
            key={option.id}
            onClick={() => onSelect(sceneId, option.id, option.nextSceneId)}
            className={`
              w-full p-4 rounded-xl text-left transition-all duration-300
              bg-gradient-to-r from-purple-500/20 to-pink-500/20
              border border-white/20 hover:border-pink-400/50
              hover:from-purple-500/30 hover:to-pink-500/30
              hover:scale-[1.02] hover:shadow-lg hover:shadow-pink-500/20
              active:scale-[0.98]
              group
            `}
          >
            {/* 选项序号 */}
            <div className="flex items-start gap-3">
              <span
                className={`
                  flex-shrink-0 w-7 h-7 rounded-full
                  bg-gradient-to-br from-pink-500 to-purple-600
                  flex items-center justify-center
                  text-white text-sm font-bold
                  group-hover:from-pink-400 group-hover:to-purple-500
                `}
              >
                {String.fromCharCode(65 + index)}
              </span>

              {/* 选项文本 */}
              <div className="flex-1">
                <p className="text-white/90 text-base leading-relaxed">
                  {option.textCn}
                </p>
              </div>
            </div>

            {/* 情绪标签 */}
            {option.mood && (
              <div className="mt-2 ml-10">
                <span className="text-xs text-pink-300/60 bg-pink-500/10 px-2 py-0.5 rounded-full">
                  {option.mood}
                </span>
              </div>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
