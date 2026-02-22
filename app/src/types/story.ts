// 故事数据类型定义

export interface Story {
  id: string;
  title: string;
  titleCn: string;
  character: string;
  characterCn: string;
  cover: string;
  estimatedTime: string;
  scenes: Scene[];
}

export interface Scene {
  id: string;
  type: 'narration' | 'dialogue' | 'choice' | 'ending';
  panels?: Panel[];
  choice?: ChoiceNode;
  ending?: Ending;
}

export interface Panel {
  id: string;
  image: string;
  narration?: string;
  dialogue?: {
    character: string;
    text: string;
    position?: 'left' | 'right' | 'center';
  };
  effect?: 'fade' | 'shake' | 'flash';
}

export interface ChoiceNode {
  prompt?: string;
  options: ChoiceOption[];
}

export interface ChoiceOption {
  id: string;
  text: string;
  textCn: string;
  mood?: string;
  nextSceneId: string;
}

export interface Ending {
  type: 'HE' | 'NE' | 'OE'; // Happy, Normal, Open
  title: string;
  titleCn: string;
  description: string;
  image: string;
}

export interface PlayerState {
  currentSceneId: string;
  choices: Record<string, string>; // choiceId -> optionId
  unlockedEndings: string[];
}
