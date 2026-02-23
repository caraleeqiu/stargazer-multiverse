// 故事数据类型定义

// 世界观（IP）
export interface Universe {
  id: string;
  name: string;
  nameCn: string;
  description: string;
  cover: string;
  color: string; // 主题色 gradient
  characters: Character[];
}

// 角色
export interface Character {
  id: string;
  name: string;
  nameCn: string;
  avatar: string;
  description: string;
  stories: StoryMeta[];
}

// 故事元信息（列表展示用）
export interface StoryMeta {
  id: string;
  title: string;
  titleCn: string;
  cover: string;
  estimatedTime: string;
  status: 'available' | 'coming' | 'locked';
}

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
