'use client';

import { use } from 'react';
import Link from 'next/link';
import { getUniverse } from '@/data/universes';
import { notFound } from 'next/navigation';

interface Props {
  params: Promise<{ id: string }>;
}

export default function UniverseDetailPage({ params }: Props) {
  const { id } = use(params);
  const universe = getUniverse(id);

  if (!universe) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-black">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md border-b border-white/10">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link
              href="/universes"
              className="text-white/60 hover:text-white transition-colors"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </Link>
            <div>
              <h1 className="text-white font-semibold">{universe.nameCn}</h1>
              <p className="text-white/50 text-sm">{universe.name}</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main */}
      <main className="pt-24 pb-12 px-6">
        <div className="max-w-6xl mx-auto">
          {/* Title */}
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Choose Your Character
            </h2>
            <p className="text-white/60 text-lg max-w-2xl mx-auto">
              {universe.description}
            </p>
          </div>

          {/* Character Cards */}
          <div className="grid md:grid-cols-2 gap-8">
            {universe.characters.map((character) => {
              const availableStory = character.stories.find(
                (s) => s.status === 'available'
              );
              const hasAvailable = !!availableStory;

              return (
                <div
                  key={character.id}
                  className={`rounded-2xl overflow-hidden border transition-all duration-300 ${
                    hasAvailable
                      ? 'border-white/20 hover:border-violet-500/50'
                      : 'border-white/10 opacity-50'
                  }`}
                >
                  {/* Character header */}
                  <div
                    className={`p-6 bg-gradient-to-r ${universe.color} bg-opacity-20`}
                  >
                    <div className="flex items-center gap-4">
                      {/* Avatar placeholder */}
                      <div className="w-20 h-20 rounded-full bg-white/10 flex items-center justify-center text-3xl">
                        {character.nameCn.charAt(0)}
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-white">
                          {character.nameCn}
                        </h3>
                        <p className="text-white/60">{character.name}</p>
                      </div>
                    </div>
                    <p className="mt-4 text-white/70 text-sm">
                      {character.description}
                    </p>
                  </div>

                  {/* Stories list */}
                  <div className="p-6 bg-white/5">
                    <h4 className="text-white/40 text-sm mb-4 uppercase tracking-wider">
                      Stories
                    </h4>
                    <div className="space-y-3">
                      {character.stories.map((story) => (
                        <div key={story.id}>
                          {story.status === 'available' ? (
                            <Link
                              href={`/setup/${story.id}`}
                              className="block p-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-violet-500/50 transition-all group"
                            >
                              <div className="flex items-center justify-between">
                                <div>
                                  <h5 className="text-white font-medium">
                                    {story.titleCn}
                                  </h5>
                                  <p className="text-white/50 text-sm">
                                    {story.title}
                                  </p>
                                </div>
                                <div className="flex items-center gap-3">
                                  <span className="text-white/40 text-sm">
                                    {story.estimatedTime}
                                  </span>
                                  <div className="w-8 h-8 rounded-full bg-violet-500/20 flex items-center justify-center group-hover:bg-violet-500/40 transition-colors">
                                    <svg
                                      className="w-4 h-4 text-violet-400"
                                      fill="currentColor"
                                      viewBox="0 0 24 24"
                                    >
                                      <path d="M8 5v14l11-7z" />
                                    </svg>
                                  </div>
                                </div>
                              </div>
                            </Link>
                          ) : (
                            <div className="p-4 rounded-xl bg-white/5 border border-white/5">
                              <div className="flex items-center justify-between">
                                <div>
                                  <h5 className="text-white/50 font-medium">
                                    {story.titleCn}
                                  </h5>
                                  <p className="text-white/30 text-sm">
                                    {story.title}
                                  </p>
                                </div>
                                <span className="px-3 py-1 text-xs bg-white/10 rounded-full text-white/40">
                                  Coming Soon
                                </span>
                              </div>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </main>
    </div>
  );
}
