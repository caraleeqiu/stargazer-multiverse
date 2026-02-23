'use client';

import { use, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { getStoryEntry } from '@/data/stories';

interface Props {
  params: Promise<{ storyId: string }>;
}

const PERSONALITY_TAGS = [
  { id: 'gentle', label: '温柔', labelEn: 'Gentle' },
  { id: 'brave', label: '勇敢', labelEn: 'Brave' },
  { id: 'playful', label: '俏皮', labelEn: 'Playful' },
  { id: 'reserved', label: '内敛', labelEn: 'Reserved' },
  { id: 'passionate', label: '热情', labelEn: 'Passionate' },
  { id: 'mysterious', label: '神秘', labelEn: 'Mysterious' },
];

export default function SetupPage({ params }: Props) {
  const { storyId } = use(params);
  const router = useRouter();
  const entry = getStoryEntry(storyId);

  const [playerName, setPlayerName] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [isStarting, setIsStarting] = useState(false);

  if (!entry) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <p className="text-white/60">Story not found</p>
      </div>
    );
  }

  const { story } = entry;

  const toggleTag = (tagId: string) => {
    if (selectedTags.includes(tagId)) {
      setSelectedTags(selectedTags.filter((t) => t !== tagId));
    } else if (selectedTags.length < 2) {
      setSelectedTags([...selectedTags, tagId]);
    }
  };

  const handleStart = () => {
    setIsStarting(true);
    // 保存玩家设定到 localStorage
    localStorage.setItem(
      'player-profile',
      JSON.stringify({
        name: playerName || '你',
        tags: selectedTags,
      })
    );
    setTimeout(() => {
      router.push(`/play/${storyId}`);
    }, 800);
  };

  return (
    <div className="min-h-screen bg-black">
      {/* Background */}
      <div className="fixed inset-0">
        <Image
          src={story.cover}
          alt=""
          fill
          className="object-cover opacity-20 blur-sm"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/80 to-black" />
      </div>

      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-black/50 backdrop-blur-md">
        <div className="max-w-lg mx-auto px-6 py-4 flex items-center gap-4">
          <Link
            href="/universes/modern-mystery"
            className="text-white/60 hover:text-white transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </Link>
          <div>
            <h1 className="text-white font-medium">{story.titleCn}</h1>
            <p className="text-white/50 text-sm">{story.characterCn} 线</p>
          </div>
        </div>
      </header>

      {/* Main */}
      <main className="relative z-10 pt-24 pb-12 px-6">
        <div className="max-w-lg mx-auto">
          {/* Story intro */}
          <div className="text-center mb-10">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-violet-500 to-pink-500 mx-auto mb-6 flex items-center justify-center overflow-hidden">
              <Image
                src="/images/luke-pearce/Main-Story/03-Luke-worried.png"
                alt={story.characterCn}
                width={80}
                height={80}
                className="object-cover"
              />
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">进入故事前...</h2>
            <p className="text-white/60">设定你在这个世界里的身份</p>
          </div>

          {/* Player name */}
          <div className="mb-8">
            <label className="block text-white/80 text-sm mb-3">你的名字</label>
            <input
              type="text"
              value={playerName}
              onChange={(e) => setPlayerName(e.target.value)}
              placeholder="留空则使用「你」"
              maxLength={10}
              className="w-full px-4 py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/30 focus:outline-none focus:border-violet-500 transition-colors text-center text-lg"
            />
          </div>

          {/* Personality tags */}
          <div className="mb-10">
            <label className="block text-white/80 text-sm mb-3">
              选择你的性格标签 <span className="text-white/40">(最多2个)</span>
            </label>
            <div className="grid grid-cols-3 gap-3">
              {PERSONALITY_TAGS.map((tag) => (
                <button
                  key={tag.id}
                  onClick={() => toggleTag(tag.id)}
                  className={`py-3 px-4 rounded-xl border transition-all ${
                    selectedTags.includes(tag.id)
                      ? 'bg-violet-500/20 border-violet-500 text-violet-300'
                      : 'bg-white/5 border-white/10 text-white/60 hover:border-white/30'
                  }`}
                >
                  <div className="font-medium">{tag.label}</div>
                  <div className="text-xs opacity-60">{tag.labelEn}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Story preview */}
          <div className="mb-8 p-4 rounded-xl bg-white/5 border border-white/10">
            <div className="flex items-start gap-4">
              <div className="w-16 h-20 rounded-lg bg-white/10 overflow-hidden flex-shrink-0">
                <Image
                  src={story.cover}
                  alt=""
                  width={64}
                  height={80}
                  className="object-cover w-full h-full"
                />
              </div>
              <div>
                <h3 className="text-white font-medium mb-1">{story.titleCn}</h3>
                <p className="text-white/50 text-sm mb-2">{story.title}</p>
                <div className="flex items-center gap-3 text-white/40 text-xs">
                  <span>约 {story.estimatedTime}</span>
                  <span>·</span>
                  <span>3 个结局</span>
                </div>
              </div>
            </div>
          </div>

          {/* Start button */}
          <button
            onClick={handleStart}
            disabled={isStarting}
            className="w-full py-4 bg-gradient-to-r from-violet-600 to-pink-600 text-white rounded-xl font-medium text-lg hover:from-violet-500 hover:to-pink-500 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {isStarting ? (
              <>
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                进入故事...
              </>
            ) : (
              <>
                开始旅程
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </>
            )}
          </button>

          {/* Skip option */}
          <button
            onClick={() => router.push(`/play/${storyId}`)}
            className="w-full mt-4 py-3 text-white/40 hover:text-white/60 transition-colors text-sm"
          >
            跳过设定，直接开始
          </button>
        </div>
      </main>
    </div>
  );
}
