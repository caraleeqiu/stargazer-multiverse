'use client';

import Link from 'next/link';
import Image from 'next/image';

// 已有故事列表
const stories = [
  {
    id: 'unnamed-love-poem',
    title: '未名情诗',
    titleEn: 'An Unnamed Love Poem',
    character: '左然',
    characterEn: 'Luke Pearce',
    universe: '未定事件簿',
    cover: '/images/luke-pearce/Main-Story/01-opening.png',
    description: '医院深夜，你从昏迷中醒来。他守在床边，眼中满是疲惫与担忧。八年的青梅竹马，那堵无形的墙，是否该在此刻打破？',
    time: '5 分钟',
    endings: 3,
    tags: ['青梅竹马', '告白抉择', '现代都市'],
    status: 'available',
  },
  {
    id: 'coming-soon-1',
    title: '即将上线',
    titleEn: 'Coming Soon',
    character: '夏彦',
    characterEn: 'Xia Yan',
    universe: '未定事件簿',
    cover: '',
    description: '敬请期待...',
    time: '?',
    endings: 0,
    tags: [],
    status: 'coming',
  },
];

export default function StoriesPage() {
  return (
    <div className="min-h-screen bg-black">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md border-b border-white/10">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center gap-4">
          <Link href="/" className="text-white/60 hover:text-white transition-colors">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </Link>
          <h1 className="text-white font-semibold text-lg">体验故事</h1>
        </div>
      </header>

      {/* Main */}
      <main className="pt-24 pb-12 px-6">
        <div className="max-w-4xl mx-auto">
          {/* Title */}
          <div className="mb-10">
            <h2 className="text-3xl font-bold text-white mb-2">故事库</h2>
            <p className="text-white/60">探索已创作好的互动剧本</p>
          </div>

          {/* Story Cards */}
          <div className="space-y-6">
            {stories.map((story) => (
              <div
                key={story.id}
                className={`rounded-2xl border overflow-hidden transition-all ${
                  story.status === 'available'
                    ? 'border-white/10 hover:border-violet-500/50 bg-white/5'
                    : 'border-white/5 bg-white/[0.02] opacity-50'
                }`}
              >
                <div className="flex flex-col md:flex-row">
                  {/* Cover */}
                  <div className="md:w-48 h-48 md:h-auto bg-gradient-to-br from-violet-900/50 to-pink-900/50 flex-shrink-0 relative">
                    {story.cover ? (
                      <Image
                        src={story.cover}
                        alt={story.title}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-4xl opacity-30">🔒</span>
                      </div>
                    )}
                  </div>

                  {/* Info */}
                  <div className="flex-1 p-6">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <div className="text-white/40 text-sm mb-1">{story.universe}</div>
                        <h3 className="text-xl font-bold text-white">{story.title}</h3>
                        <p className="text-white/50 text-sm">{story.titleEn}</p>
                      </div>
                      {story.status === 'available' && (
                        <div className="px-3 py-1 bg-green-500/20 rounded-full">
                          <span className="text-green-400 text-xs">可体验</span>
                        </div>
                      )}
                    </div>

                    <div className="flex items-center gap-2 mb-4">
                      <div className="w-8 h-8 rounded-full bg-violet-500/20 flex items-center justify-center text-sm">
                        {story.character.charAt(0)}
                      </div>
                      <div>
                        <div className="text-white text-sm">{story.character}</div>
                        <div className="text-white/40 text-xs">{story.characterEn}</div>
                      </div>
                    </div>

                    <p className="text-white/60 text-sm mb-4 line-clamp-2">
                      {story.description}
                    </p>

                    {/* Tags */}
                    {story.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-4">
                        {story.tags.map((tag) => (
                          <span
                            key={tag}
                            className="px-2 py-1 bg-white/5 rounded text-white/50 text-xs"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* Footer */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4 text-white/40 text-sm">
                        <span>约 {story.time}</span>
                        {story.endings > 0 && <span>{story.endings} 个结局</span>}
                      </div>

                      {story.status === 'available' && (
                        <Link
                          href={`/play/${story.id}`}
                          className="px-5 py-2 bg-gradient-to-r from-violet-600 to-pink-600 text-white rounded-full text-sm font-medium hover:from-violet-500 hover:to-pink-500 transition-all"
                        >
                          开始体验
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
