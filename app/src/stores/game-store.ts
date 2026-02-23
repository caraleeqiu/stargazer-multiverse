import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Story, Scene } from '@/types/story';

interface GameStore {
  // 当前故事
  story: Story | null;
  sceneFlow: Record<string, string>;

  // 玩家状态
  currentSceneId: string;
  choices: Record<string, string>;
  unlockedEndings: string[];

  // 阅读进度
  currentPanelIndex: number;
  isTransitioning: boolean;

  // Actions
  loadStory: (story: Story, sceneFlow: Record<string, string>) => void;
  getCurrentScene: () => Scene | undefined;
  nextPanel: () => void;
  prevPanel: () => void;
  makeChoice: (choiceId: string, optionId: string, nextSceneId: string) => void;
  goToNextScene: () => void;
  restartStory: () => void;
  resetToScene: (sceneId: string) => void;
}

export const useGameStore = create<GameStore>()(
  persist(
    (set, get) => ({
      story: null,
      sceneFlow: {},
      currentSceneId: '',
      choices: {},
      unlockedEndings: [],
      currentPanelIndex: 0,
      isTransitioning: false,

      loadStory: (story: Story, sceneFlow: Record<string, string>) => {
        const firstSceneId = story.scenes[0]?.id || '';
        set({
          story,
          sceneFlow,
          currentSceneId: firstSceneId,
          currentPanelIndex: 0,
          choices: {},
          isTransitioning: false,
        });
      },

      getCurrentScene: () => {
        const { story, currentSceneId } = get();
        if (!story) return undefined;
        return story.scenes.find((s) => s.id === currentSceneId);
      },

      nextPanel: () => {
        const scene = get().getCurrentScene();
        if (!scene?.panels) return;

        const { currentPanelIndex } = get();
        if (currentPanelIndex < scene.panels.length - 1) {
          set({ currentPanelIndex: currentPanelIndex + 1 });
        } else {
          get().goToNextScene();
        }
      },

      prevPanel: () => {
        const { currentPanelIndex } = get();
        if (currentPanelIndex > 0) {
          set({ currentPanelIndex: currentPanelIndex - 1 });
        }
      },

      makeChoice: (choiceId: string, optionId: string, nextSceneId: string) => {
        set((state) => ({
          choices: { ...state.choices, [choiceId]: optionId },
          currentSceneId: nextSceneId,
          currentPanelIndex: 0,
          isTransitioning: true,
        }));

        setTimeout(() => {
          set({ isTransitioning: false });
        }, 500);
      },

      goToNextScene: () => {
        const { currentSceneId, sceneFlow, unlockedEndings } = get();
        const nextSceneId = sceneFlow[currentSceneId];

        if (nextSceneId) {
          set({
            currentSceneId: nextSceneId,
            currentPanelIndex: 0,
            isTransitioning: true,
          });

          setTimeout(() => {
            set({ isTransitioning: false });
          }, 500);
        }

        const scene = get().getCurrentScene();
        if (scene?.type === 'ending' && scene.ending) {
          if (!unlockedEndings.includes(scene.ending.type)) {
            set({ unlockedEndings: [...unlockedEndings, scene.ending.type] });
          }
        }
      },

      restartStory: () => {
        const { story } = get();
        const firstSceneId = story?.scenes[0]?.id || '';
        set({
          currentSceneId: firstSceneId,
          currentPanelIndex: 0,
          choices: {},
          isTransitioning: false,
        });
      },

      resetToScene: (sceneId: string) => {
        set({
          currentSceneId: sceneId,
          currentPanelIndex: 0,
          isTransitioning: false,
        });
      },
    }),
    {
      name: 'stargazer-game',
      partialize: (state) => ({
        choices: state.choices,
        unlockedEndings: state.unlockedEndings,
      }),
    }
  )
);
