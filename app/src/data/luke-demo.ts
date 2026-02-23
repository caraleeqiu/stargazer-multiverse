import { Story } from '@/types/story';

/**
 * 《未名情诗》Demo - 只包含 HE 路线
 * 用于快速演示效果
 */
export const lukeDemoStory: Story = {
  id: 'unnamed-love-poem-demo',
  title: 'An Unnamed Love Poem',
  titleCn: '未名情诗',
  character: 'Luke Pearce',
  characterCn: '左然',
  cover: '/images/luke-pearce/cover.jpg',
  estimatedTime: '3 min',
  scenes: [
    // ============ 开场引用 ============
    {
      id: 'opening-quote',
      type: 'narration',
      panels: [
        {
          id: 'quote-1',
          image: 'PAGE_1', // 开场引用图
          narration: '',
          effect: 'fade',
        },
      ],
    },

    // ============ 医院醒来 ============
    {
      id: 'opening-scene',
      type: 'narration',
      panels: [
        {
          id: 'wake-1',
          image: 'PAGE_2', // 第一人称睁眼
          narration: '深夜。未名市中心医院 VIP 病房。',
        },
        {
          id: 'wake-2',
          image: 'PAGE_3', // 左然疲惫特写
          narration: '你缓缓睁开眼睛，映入眼帘的是左然布满疲惫和担忧的面容。淡淡的胡茬爬上他棱角分明的下颌。',
        },
        {
          id: 'wake-3',
          image: 'PAGE_3',
          narration: '望着他布满血丝的双眸，一种陌生而复杂的情绪攫住了你的心。',
        },
      ],
    },

    // ============ 第一选择 ============
    {
      id: 'choice-1',
      type: 'choice',
      choice: {
        prompt: '醒来后，你对他说的第一句话是……',
        options: [
          {
            id: 'choice-1-a',
            text: 'Teasing',
            textCn: '（低声调侃）"左律师……你再这么盯着我看，我可要按小时收费了……"',
            mood: '调侃',
            nextSceneId: 'branch-a',
          },
          {
            id: 'choice-1-b',
            text: 'Comforting',
            textCn: '（虚弱地抬手）"别担心……我没事的……"',
            mood: '安慰',
            nextSceneId: 'branch-a', // Demo 都走同一条线
          },
          {
            id: 'choice-1-c',
            text: 'Confused',
            textCn: '（一脸困惑）"左然……发生什么了？"',
            mood: '困惑',
            nextSceneId: 'branch-a',
          },
        ],
      },
    },

    // ============ 分支场景（调侃线）============
    {
      id: 'branch-a',
      type: 'narration',
      panels: [
        {
          id: 'branch-a-1',
          image: 'PAGE_9', // "别开玩笑"
          narration: '他眨了眨眼，紧绷的嘴角软化了一瞬。',
          dialogue: {
            character: '左然',
            text: '别开玩笑。这不是我们能辩论的案子。',
            position: 'right',
          },
        },
        {
          id: 'branch-a-2',
          image: 'PAGE_5', // 递水
          narration: '他笨拙地想给你倒杯水，杯沿碰到你的嘴唇时发出轻响。你看到他眼中的慌乱，意识到他钢铁般的冷静终于出现了裂痕。',
        },
      ],
    },

    // ============ 汇聚：削苹果 ============
    {
      id: 'convergence',
      type: 'narration',
      panels: [
        {
          id: 'conv-1',
          image: 'PAGE_8', // 削苹果
          narration: '病房里很安静，只有他削苹果时轻柔而有节奏的声音。',
        },
        {
          id: 'conv-2',
          image: 'PAGE_11', // 削苹果全身
          narration: '你望着他专注而笨拙的侧脸，意识到你们之间那堵标着"青梅竹马"的无形之墙，已经因为这次事件而布满裂痕。',
        },
        {
          id: 'conv-3',
          image: 'PAGE_7', // 脸部特写
          narration: '是否要彻底打碎它，现在取决于你。',
        },
      ],
    },

    // ============ 核心选择 ============
    {
      id: 'choice-2',
      type: 'choice',
      choice: {
        prompt: '你决定对他说……',
        options: [
          {
            id: 'choice-2-a',
            text: 'Confess',
            textCn: '（鼓起勇气）"左然，我不想再当你的「妹妹」了。"',
            mood: '告白',
            nextSceneId: 'ending-he',
          },
          {
            id: 'choice-2-b',
            text: 'Thanks',
            textCn: '（轻声道谢）"谢谢你，左然。这几天辛苦你了。"',
            mood: '感谢',
            nextSceneId: 'ending-he', // Demo 都走 HE
          },
          {
            id: 'choice-2-c',
            text: 'Question',
            textCn: '（试探）"我们……只是搭档和青梅竹马，对吧？"',
            mood: '试探',
            nextSceneId: 'ending-he',
          },
        ],
      },
    },

    // ============ HE 结局 ============
    {
      id: 'ending-he',
      type: 'ending',
      panels: [
        {
          id: 'he-1',
          image: 'PAGE_10', // 刀切手指
          narration: '他手中的刀骤然停住，割破了指尖。一滴鲜血涌出，但他似乎毫无察觉。',
        },
        {
          id: 'he-2',
          image: 'PAGE_12', // 含泪
          narration: '他就那样看着你，眼中满是难以置信。沉默漫长得让你的心脏开始因后悔而狂跳。',
        },
        {
          id: 'he-3',
          image: 'PAGE_12',
          dialogue: {
            character: '左然',
            text: '……我等这句话，等了八年。',
            position: 'center',
          },
        },
      ],
      ending: {
        type: 'HE',
        title: 'Happy Ending',
        titleCn: '圆满结局 · 八年之约',
        description: '漫长的等待终于有了答案。从此以后，你们不再是青梅竹马，而是彼此认定的人。',
        image: 'PAGE_12',
      },
    },
  ],
};

// 场景流转
export const demoSceneFlow: Record<string, string> = {
  'opening-quote': 'opening-scene',
  'opening-scene': 'choice-1',
  'branch-a': 'convergence',
  'convergence': 'choice-2',
};
