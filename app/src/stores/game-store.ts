import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Story, Scene } from '@/types/story';
import { lukeDemoStory, demoSceneFlow } from '@/data/luke-demo';

interface GameStore {
  // 当前故事
  story: Story;

  // 玩家状态
  currentSceneId: string;
  choices: Record<string, string>;
  unlockedEndings: string[];

  // 阅读进度
  currentPanelIndex: number;
  isTransitioning: boolean;

  // Actions
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
      story: lukeDemoStory,
      currentSceneId: 'opening-quote',
      choices: {},
      unlockedEndings: [],
      currentPanelIndex: 0,
      isTransitioning: false,

      getCurrentScene: () => {
        const { story, currentSceneId } = get();
        return story.scenes.find((s) => s.id === currentSceneId);
      },

      nextPanel: () => {
        const scene = get().getCurrentScene();
        if (!scene?.panels) return;

        const { currentPanelIndex } = get();
        if (currentPanelIndex < scene.panels.length - 1) {
          set({ currentPanelIndex: currentPanelIndex + 1 });
        } else {
          // 当前场景的 panels 已经看完，进入下一场景
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

        // 短暂延迟后取消过渡状态
        setTimeout(() => {
          set({ isTransitioning: false });
        }, 500);
      },

      goToNextScene: () => {
        const { currentSceneId, unlockedEndings } = get();
        const nextSceneId = demoSceneFlow[currentSceneId];

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

        // 如果是结局场景，记录解锁
        const scene = get().getCurrentScene();
        if (scene?.type === 'ending' && scene.ending) {
          if (!unlockedEndings.includes(scene.ending.type)) {
            set({ unlockedEndings: [...unlockedEndings, scene.ending.type] });
          }
        }
      },

      restartStory: () => {
        set({
          currentSceneId: 'opening-quote',
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
      name: 'stargazer-luke-demo',
      partialize: (state) => ({
        choices: state.choices,
        unlockedEndings: state.unlockedEndings,
      }),
    }
  )
);
