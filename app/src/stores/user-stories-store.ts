import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Story } from '@/types/story';
import { StoryStructure } from '@/lib/generate-story';

// 用户创建的故事元数据
export interface UserStoryMeta {
  id: string;
  title: string;
  titleCn: string;
  character: string;
  characterCn: string;
  universeId: string;
  themeId: string;
  createdAt: number;
  lastPlayedAt?: number;
  unlockedEndings: string[];
}

// 完整的用户故事数据（包括 sceneFlow）
export interface UserStoryData {
  meta: UserStoryMeta;
  story: Story;
  structure: StoryStructure;
  sceneFlow: Record<string, string>;
}

interface UserStoriesStore {
  // 用户创建的故事列表
  stories: UserStoryData[];

  // Actions
  saveStory: (data: Omit<UserStoryData, 'meta'> & { meta: Omit<UserStoryMeta, 'createdAt' | 'unlockedEndings'> }) => string;
  getStory: (id: string) => UserStoryData | undefined;
  deleteStory: (id: string) => void;
  updateLastPlayed: (id: string) => void;
  updateUnlockedEndings: (id: string, endings: string[]) => void;
}

export const useUserStoriesStore = create<UserStoriesStore>()(
  persist(
    (set, get) => ({
      stories: [],

      saveStory: (data) => {
        const id = `user-story-${Date.now()}`;
        const newStory: UserStoryData = {
          ...data,
          meta: {
            ...data.meta,
            id,
            createdAt: Date.now(),
            unlockedEndings: [],
          },
        };

        set((state) => ({
          stories: [newStory, ...state.stories],
        }));

        console.log('[UserStoriesStore] Saved story:', id, data.meta.titleCn);
        return id;
      },

      getStory: (id) => {
        return get().stories.find((s) => s.meta.id === id);
      },

      deleteStory: (id) => {
        set((state) => ({
          stories: state.stories.filter((s) => s.meta.id !== id),
        }));
      },

      updateLastPlayed: (id) => {
        set((state) => ({
          stories: state.stories.map((s) =>
            s.meta.id === id
              ? { ...s, meta: { ...s.meta, lastPlayedAt: Date.now() } }
              : s
          ),
        }));
      },

      updateUnlockedEndings: (id, endings) => {
        set((state) => ({
          stories: state.stories.map((s) =>
            s.meta.id === id
              ? { ...s, meta: { ...s.meta, unlockedEndings: endings } }
              : s
          ),
        }));
      },
    }),
    {
      name: 'stargazer-user-stories',
    }
  )
);
