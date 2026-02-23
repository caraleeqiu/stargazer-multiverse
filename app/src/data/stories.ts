import { Story } from '@/types/story';
import { lukeFullStory, fullSceneFlow } from './luke-full-story';

// 故事注册表
export interface StoryEntry {
  story: Story;
  sceneFlow: Record<string, string>;
}

const storyRegistry: Record<string, StoryEntry> = {
  'unnamed-love-poem': {
    story: lukeFullStory,
    sceneFlow: fullSceneFlow,
  },
};

export function getStoryEntry(storyId: string): StoryEntry | undefined {
  return storyRegistry[storyId];
}

export function getAllStoryIds(): string[] {
  return Object.keys(storyRegistry);
}
