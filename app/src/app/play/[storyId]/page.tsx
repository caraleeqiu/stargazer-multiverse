'use client';

import { use, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { StoryReader } from '@/components/StoryReader';
import { useGameStore } from '@/stores/game-store';
import { getStoryEntry } from '@/data/stories';

interface Props {
  params: Promise<{ storyId: string }>;
}

export default function PlayStoryPage({ params }: Props) {
  const { storyId } = use(params);
  const router = useRouter();
  const { loadStory, story } = useGameStore();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const entry = getStoryEntry(storyId);

    if (!entry) {
      setError('Story not found');
      setIsLoading(false);
      return;
    }

    loadStory(entry.story, entry.sceneFlow);
    setIsLoading(false);
  }, [storyId, loadStory]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-2 border-violet-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-white/60">Loading story...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-4">Story Not Found</h1>
          <p className="text-white/60 mb-8">The story you&apos;re looking for doesn&apos;t exist.</p>
          <button
            onClick={() => router.push('/universes')}
            className="px-6 py-3 bg-violet-600 text-white rounded-full hover:bg-violet-500 transition-colors"
          >
            Browse Stories
          </button>
        </div>
      </div>
    );
  }

  if (!story) {
    return null;
  }

  return <StoryReader />;
}
