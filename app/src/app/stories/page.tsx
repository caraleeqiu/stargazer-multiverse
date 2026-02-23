'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useUserStoriesStore } from '@/stores/user-stories-store';

// 世界观和主题映射
const UNIVERSE_NAMES: Record<string, string> = {
  'modern-city': '现代都市',
  'campus-youth': '校园青春',
  'ancient-jianghu': '古风江湖',
  'apocalypse': '末世危机',
};

const THEME_NAMES: Record<string, string> = {
  'confession': '告白抉择',
  'reunion': '久别重逢',
  'crisis': '生死危机',
  'misunderstanding': '误会冰释',
};

// 官方故事列表
const officialStories = [
  {
    id: 'unnamed-love-poem',
    title: '未名情诗',
    character: '左然',
    cover: '/images/luke-pearce/Main-Story/01-opening.png',
    tags: ['青梅竹马', '告白'],
    endings: 3,
    status: 'available' as const,
  },
  {
    id: 'coming-soon-1',
    title: '即将上线',
    character: '夏彦',
    cover: '',
    tags: [],
    endings: 0,
    status: 'coming' as const,
  },
];

export default function StoriesPage() {
  const { stories: userStories, deleteStory } = useUserStoriesStore();

  return (
    <div className="min-h-screen bg-black">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md border-b border-white/10">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/" className="text-white/60 hover:text-white transition-colors">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </Link>
            <h1 className="text-white font-semibold">故事库</h1>
          </div>
          <Link
            href="/create"
            className="flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-pink-600 to-violet-600 text-white rounded-full text-sm font-medium"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            创建
          </Link>
        </div>
      </header>

      {/* Main */}
      <main className="pt-16 pb-8 px-4">
        <div className="max-w-6xl mx-auto">

          {/* User Stories Section */}
          {userStories.length > 0 && (
            <section className="mb-8">
              <div className="flex items-center gap-2 mb-4">
                <h2 className="text-lg font-bold text-white">我的故事</h2>
                <span className="px-2 py-0.5 bg-pink-500/20 rounded text-pink-400 text-xs">
                  {userStories.length}
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
                {userStories.map((userStory) => (
                  <div
                    key={userStory.meta.id}
                    className="group relative rounded-xl overflow-hidden bg-gradient-to-br from-pink-900/30 to-violet-900/30 border border-white/10 hover:border-pink-500/50 transition-all"
                  >
                    {/* Delete button */}
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        if (confirm('删除这个故事？')) {
                          deleteStory(userStory.meta.id);
                        }
                      }}
                      className="absolute top-2 right-2 z-10 w-6 h-6 rounded-full bg-black/50 text-white/50 hover:text-red-400 hover:bg-black/70 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all"
                    >
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>

                    <Link href={`/play/${userStory.meta.id}`}>
                      {/* Cover placeholder */}
                      <div className="aspect-[3/4] relative">
                        <div className="absolute inset-0 flex flex-col items-center justify-center p-3">
                          <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-lg mb-2">
                            {userStory.meta.characterCn?.charAt(0) || '?'}
                          </div>
                          <p className="text-white text-sm font-medium text-center line-clamp-2">
                            {userStory.meta.titleCn}
                          </p>
                          <p className="text-white/50 text-xs mt-1">
                            {userStory.meta.characterCn}
                          </p>
                        </div>

                        {/* Ending progress */}
                        <div className="absolute bottom-2 left-2 right-2 flex justify-center gap-1">
                          {['HE', 'NE', 'OE'].map((type) => (
                            <div
                              key={type}
                              className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-medium
                                ${userStory.meta.unlockedEndings?.includes(type)
                                  ? type === 'HE' ? 'bg-pink-500/50 text-pink-200'
                                    : type === 'OE' ? 'bg-purple-500/50 text-purple-200'
                                    : 'bg-blue-500/50 text-blue-200'
                                  : 'bg-white/10 text-white/30'
                                }
                              `}
                            >
                              {type[0]}
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Tags */}
                      <div className="p-2 pt-0">
                        <div className="flex flex-wrap gap-1">
                          <span className="px-1.5 py-0.5 bg-white/5 rounded text-white/40 text-[10px]">
                            {UNIVERSE_NAMES[userStory.meta.universeId] || ''}
                          </span>
                          <span className="px-1.5 py-0.5 bg-white/5 rounded text-white/40 text-[10px]">
                            {THEME_NAMES[userStory.meta.themeId] || ''}
                          </span>
                        </div>
                      </div>
                    </Link>
                  </div>
                ))}

                {/* Create new card */}
                <Link
                  href="/create"
                  className="rounded-xl border-2 border-dashed border-white/10 hover:border-pink-500/30 transition-all flex flex-col items-center justify-center aspect-[3/4] bg-white/[0.02] hover:bg-white/[0.05]"
                >
                  <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center mb-2">
                    <svg className="w-5 h-5 text-white/30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                  </div>
                  <p className="text-white/30 text-xs">创建新故事</p>
                </Link>
              </div>
            </section>
          )}

          {/* Official Stories Section */}
          <section>
            <h2 className="text-lg font-bold text-white mb-4">官方故事</h2>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
              {officialStories.map((story) => (
                <div
                  key={story.id}
                  className={`rounded-xl overflow-hidden border transition-all ${
                    story.status === 'available'
                      ? 'border-white/10 hover:border-violet-500/50 bg-white/5'
                      : 'border-white/5 bg-white/[0.02] opacity-50'
                  }`}
                >
                  {story.status === 'available' ? (
                    <Link href={`/play/${story.id}`}>
                      <div className="aspect-[3/4] relative">
                        {/* Cover */}
                        <div className="absolute inset-0 bg-gradient-to-br from-violet-900/50 to-pink-900/50">
                          {story.cover && (
                            <Image
                              src={story.cover}
                              alt={story.title}
                              fill
                              className="object-cover"
                            />
                          )}
                        </div>

                        {/* Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                        {/* Badge */}
                        <div className="absolute top-2 right-2 px-1.5 py-0.5 bg-green-500/80 rounded text-[10px] text-white font-medium">
                          可玩
                        </div>

                        {/* Bottom info */}
                        <div className="absolute bottom-0 left-0 right-0 p-3">
                          <p className="text-white font-medium text-sm mb-0.5">{story.title}</p>
                          <p className="text-white/60 text-xs mb-2">{story.character}</p>
                          <div className="flex items-center justify-between">
                            <div className="flex gap-1">
                              {story.tags.slice(0, 2).map((tag) => (
                                <span
                                  key={tag}
                                  className="px-1.5 py-0.5 bg-white/10 rounded text-white/50 text-[10px]"
                                >
                                  {tag}
                                </span>
                              ))}
                            </div>
                            {story.endings > 0 && (
                              <span className="text-white/40 text-[10px]">{story.endings}结局</span>
                            )}
                          </div>
                        </div>
                      </div>
                    </Link>
                  ) : (
                    <div className="aspect-[3/4] relative bg-gradient-to-br from-gray-900/50 to-slate-900/50">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-3xl opacity-30">🔒</span>
                      </div>
                      <div className="absolute bottom-0 left-0 right-0 p-3">
                        <p className="text-white/30 font-medium text-sm">{story.title}</p>
                        <p className="text-white/20 text-xs">{story.character}</p>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>

          {/* Empty state for no user stories */}
          {userStories.length === 0 && (
            <div className="mt-8 p-6 rounded-2xl border border-dashed border-white/10 bg-white/[0.02] text-center">
              <div className="w-12 h-12 rounded-full bg-pink-500/10 flex items-center justify-center mx-auto mb-3">
                <svg className="w-6 h-6 text-pink-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <p className="text-white/60 text-sm mb-4">还没有创建过故事</p>
              <Link
                href="/create"
                className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-pink-600 to-violet-600 text-white rounded-full text-sm font-medium"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                AI 创建故事
              </Link>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
