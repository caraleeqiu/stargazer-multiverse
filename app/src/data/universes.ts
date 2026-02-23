import { Universe } from '@/types/story';

// 按氛围/类型分类的世界观
export const universes: Universe[] = [
  {
    id: 'modern-mystery',
    name: 'Modern Mystery',
    nameCn: '现代悬疑',
    description: '都市暗流涌动，真相与谎言交织。在追查案件的过程中，你与他的命运悄然相连……',
    cover: '/images/luke-pearce/Main-Story/01-opening.png',
    color: 'from-slate-800 to-violet-900',
    characters: [
      {
        id: 'luke-pearce',
        name: 'Luke Pearce',
        nameCn: '左然',
        avatar: '/images/luke-pearce/Main-Story/03-Luke-worried.png',
        description: '未名市最年轻的金牌律师，你的青梅竹马。温柔外表下藏着不为人知的秘密，八年前不告而别，如今重逢……',
        stories: [
          {
            id: 'unnamed-love-poem',
            title: 'An Unnamed Love Poem',
            titleCn: '未名情诗',
            cover: '/images/luke-pearce/Main-Story/01-opening.png',
            estimatedTime: '5 min',
            status: 'available',
          },
        ],
      },
    ],
  },
  {
    id: 'fantasy-xianxia',
    name: 'Fantasy Xianxia',
    nameCn: '古风仙侠',
    description: '仙门之上，云海之间。一纸婚约，三世纠葛。你与他的缘分，早在千年前便已注定……',
    cover: '',
    color: 'from-cyan-800 to-teal-900',
    characters: [],
  },
  {
    id: 'campus-youth',
    name: 'Campus Youth',
    nameCn: '校园青春',
    description: '那年夏天的蝉鸣，走廊尽头的身影，课桌上偷偷写下的名字。青春是一场盛大的暗恋……',
    cover: '',
    color: 'from-pink-700 to-orange-600',
    characters: [],
  },
  {
    id: 'idol-romance',
    name: 'Idol Romance',
    nameCn: '偶像恋爱',
    description: '舞台之上万众瞩目，舞台之下他只看向你。当追星女孩遇见她的偶像，故事才刚刚开始……',
    cover: '',
    color: 'from-purple-700 to-pink-600',
    characters: [],
  },
];

export function getUniverse(id: string): Universe | undefined {
  return universes.find((u) => u.id === id);
}

export function getCharacter(universeId: string, characterId: string) {
  const universe = getUniverse(universeId);
  return universe?.characters.find((c) => c.id === characterId);
}
