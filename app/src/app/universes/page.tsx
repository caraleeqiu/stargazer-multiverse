'use client';

import Link from 'next/link';
import Image from 'next/image';
import { universes } from '@/data/universes';

export default function UniversesPage() {
  return (
    <div className="min-h-screen bg-black">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md border-b border-white/10">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-500 to-pink-500 flex items-center justify-center">
              <span className="text-white font-bold text-sm">IR</span>
            </div>
            <span className="text-white font-semibold text-xl">IdolRift</span>
          </Link>
        </div>
      </header>

      {/* Main */}
      <main className="pt-24 pb-12 px-6">
        <div className="max-w-4xl mx-auto">
          {/* Title */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              选择你的世界
            </h1>
            <p className="text-white/60 text-lg max-w-xl mx-auto">
              每一种氛围，都是一段独特的邂逅
            </p>
          </div>

          {/* Universe Cards - 2x2 Grid */}
          <div className="grid md:grid-cols-2 gap-6">
            {universes.map((universe) => {
              const hasStories = universe.characters.length > 0;
              const storyCount = universe.characters.reduce(
                (acc, c) => acc + c.stories.length,
                0
              );

              return (
                <Link
                  key={universe.id}
                  href={hasStories ? `/universes/${universe.id}` : '#'}
                  className={`group relative rounded-2xl overflow-hidden transition-all duration-300 ${
                    hasStories
                      ? 'cursor-pointer hover:scale-[1.02] hover:shadow-2xl hover:shadow-violet-500/20'
                      : 'cursor-not-allowed opacity-50'
                  }`}
                >
                  {/* Background */}
                  <div className={`aspect-[16/10] bg-gradient-to-br ${universe.color}`}>
                    {universe.cover && (
                      <Image
                        src={universe.cover}
                        alt=""
                        fill
                        className="object-cover opacity-40 group-hover:opacity-50 transition-opacity"
                      />
                    )}
                  </div>

                  {/* Content overlay */}
                  <div className="absolute inset-0 flex flex-col justify-end p-6 bg-gradient-to-t from-black via-black/70 to-transparent">
                    {/* Status badge */}
                    {!hasStories && (
                      <span className="absolute top-4 right-4 px-3 py-1 text-xs bg-white/10 rounded-full text-white/60">
                        即将上线
                      </span>
                    )}

                    {/* Universe name */}
                    <div className="mb-3">
                      <h2 className="text-2xl font-bold text-white mb-1">
                        {universe.nameCn}
                      </h2>
                      <p className="text-white/50 text-sm">{universe.name}</p>
                    </div>

                    {/* Description */}
                    <p className="text-white/70 text-sm line-clamp-2 mb-4">
                      {universe.description}
                    </p>

                    {/* Stats */}
                    {hasStories && (
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 text-white/40 text-sm">
                          <span>{universe.characters.length} 角色</span>
                          <span>·</span>
                          <span>{storyCount} 故事</span>
                        </div>
                        <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-violet-500/50 transition-colors">
                          <svg
                            className="w-5 h-5 text-white"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M9 5l7 7-7 7"
                            />
                          </svg>
                        </div>
                      </div>
                    )}
                  </div>
                </Link>
              );
            })}
          </div>

          {/* Coming soon hint */}
          <p className="text-center text-white/30 text-sm mt-12">
            更多世界观持续更新中...
          </p>
        </div>
      </main>
    </div>
  );
}
