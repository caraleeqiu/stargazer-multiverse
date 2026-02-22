import { Story } from '@/types/story';

export const unnamedLovePoem: Story = {
  id: 'unnamed-love-poem',
  title: 'An Unnamed Love Poem',
  titleCn: '未名情诗',
  character: 'Luke Pearce',
  characterCn: '左然',
  cover: '/images/placeholder/cover.jpg',
  estimatedTime: '5+ minutes',
  scenes: [
    // ============ 开场 ============
    {
      id: 'opening-quote',
      type: 'narration',
      panels: [
        {
          id: 'quote-1',
          image: '/images/placeholder/quote-bg.jpg',
          narration: 'In the case file of life, you are the one variable for whom I\'m willing to break all the rules.',
          effect: 'fade',
        },
      ],
    },
    {
      id: 'opening-scene',
      type: 'narration',
      panels: [
        {
          id: 'hospital-1',
          image: '/images/placeholder/hospital-room.jpg',
          narration: '深夜。未名市中心医院 VIP 病房。',
        },
        {
          id: 'hospital-2',
          image: '/images/placeholder/wakeup.jpg',
          narration: '空气中弥漫着消毒水的气息。你缓缓睁开眼睛，映入眼帘的是左然布满疲惫和担忧的面容。',
        },
        {
          id: 'hospital-3',
          image: '/images/placeholder/luke-worried.jpg',
          narration: '淡淡的胡茬爬上他棱角分明的下颌，一向整洁的衬衫也有些褶皱。',
        },
        {
          id: 'hospital-4',
          image: '/images/placeholder/flashback.jpg',
          narration: '在一次秘密调查走私团伙的行动中，你为了掩护他被坠落的集装箱砸伤，昏迷至今。',
        },
        {
          id: 'hospital-5',
          image: '/images/placeholder/eye-contact.jpg',
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
            text: '(Whispering, with a hint of teasing)',
            textCn: '（低声，带着一丝调侃）"左律师……你再这么盯着我看，我可要按小时收费了……"',
            mood: 'teasing',
            nextSceneId: 'branch-a',
          },
          {
            id: 'choice-1-b',
            text: '(Weakly raising a hand)',
            textCn: '（虚弱地抬起手，想要触碰他的脸）"别担心……我没事的……"',
            mood: 'comforting',
            nextSceneId: 'branch-b',
          },
          {
            id: 'choice-1-c',
            text: '(Looking around, confused)',
            textCn: '（环顾四周，一脸困惑）"左然……发生什么了？我怎么会在这里？"',
            mood: 'confused',
            nextSceneId: 'branch-c',
          },
        ],
      },
    },

    // ============ 分支 A: 调侃路线 ============
    {
      id: 'branch-a',
      type: 'narration',
      panels: [
        {
          id: 'branch-a-1',
          image: '/images/placeholder/luke-blink.jpg',
          narration: '他眨了眨眼，紧绷的嘴角软化了一瞬。',
        },
        {
          id: 'branch-a-2',
          image: '/images/placeholder/luke-close.jpg',
          dialogue: {
            character: '左然',
            text: '别开玩笑。这不是我们能辩论的案子。',
            position: 'right',
          },
        },
        {
          id: 'branch-a-3',
          image: '/images/placeholder/luke-water.jpg',
          narration: '他说着，笨拙地想给你倒杯水，杯沿碰到你的嘴唇时发出轻响。你看到他眼中的慌乱，意识到他钢铁般的冷静终于出现了裂痕。',
        },
      ],
    },

    // ============ 分支 B: 安慰路线 ============
    {
      id: 'branch-b',
      type: 'narration',
      panels: [
        {
          id: 'branch-b-1',
          image: '/images/placeholder/hand-catch.jpg',
          narration: '你的指尖还没触及他，他便握住了你的手。他的掌心滚烫，微微颤抖着。',
        },
        {
          id: 'branch-b-2',
          image: '/images/placeholder/luke-eyes-closed.jpg',
          narration: '他将你的手贴在自己脸颊上，闭上眼睛。',
          dialogue: {
            character: '左然',
            text: '……别再这样了。',
            position: 'right',
          },
        },
        {
          id: 'branch-b-3',
          image: '/images/placeholder/luke-emotion.jpg',
          narration: '他的声音几不可闻。你能感受到他皮肤下压抑着的恐惧。这一刻，你真正触碰到了他平静外表下那片汹涌的海洋。',
        },
      ],
    },

    // ============ 分支 C: 困惑路线 ============
    {
      id: 'branch-c',
      type: 'narration',
      panels: [
        {
          id: 'branch-c-1',
          image: '/images/placeholder/luke-attorney-mode.jpg',
          narration: '他立刻切换到"律师模式"，清晰而有条理地向你解释事情的经过。但他紧握的拳头出卖了他。',
        },
        {
          id: 'branch-c-2',
          image: '/images/placeholder/luke-voice-crack.jpg',
          narration: '当他说到"你推开了我"的时候，声音破碎了一瞬。',
        },
        {
          id: 'branch-c-3',
          image: '/images/placeholder/luke-peeling-apple.jpg',
          narration: '他很快恢复了镇定，开始强装平静地给你削苹果。当他把苹果递给你时，你注意到他指尖上有一道新鲜的小伤口。',
        },
      ],
    },

    // ============ 汇聚场景 ============
    {
      id: 'convergence',
      type: 'narration',
      panels: [
        {
          id: 'conv-1',
          image: '/images/placeholder/apple-peeling.jpg',
          narration: '病房里很安静，只有他削苹果时轻柔而有节奏的声音。',
        },
        {
          id: 'conv-2',
          image: '/images/placeholder/luke-profile.jpg',
          narration: '你望着他专注而笨拙的侧脸，意识到你们之间那堵标着"青梅竹马"的无形之墙，已经因为这次事件而布满裂痕。',
        },
        {
          id: 'conv-3',
          image: '/images/placeholder/moonlight.jpg',
          narration: '是否要彻底打碎它，现在取决于你。',
        },
      ],
    },

    // ============ 第二选择（核心选择）============
    {
      id: 'choice-2',
      type: 'choice',
      choice: {
        prompt: '你决定对他说……',
        options: [
          {
            id: 'choice-2-a',
            text: '(A courageous confession)',
            textCn: `（鼓起勇气告白）"左然，我不想再当你的'妹妹'了。"`,
            mood: 'confession',
            nextSceneId: 'ending-he',
          },
          {
            id: 'choice-2-b',
            text: '(A quiet thanks)',
            textCn: '（轻声道谢）"谢谢你，左然。这几天辛苦你了。"',
            mood: 'grateful',
            nextSceneId: 'ending-ne',
          },
          {
            id: 'choice-2-c',
            text: '(A tentative question)',
            textCn: '（试探性地问）"我们……只是搭档和青梅竹马，对吧？"',
            mood: 'questioning',
            nextSceneId: 'ending-oe',
          },
        ],
      },
    },

    // ============ HE: 告白成功 ============
    {
      id: 'ending-he',
      type: 'ending',
      panels: [
        {
          id: 'he-1',
          image: '/images/placeholder/knife-stop.jpg',
          narration: '他手中的刀骤然停住，割破了指尖。一滴鲜血涌出，但他似乎毫无察觉。',
        },
        {
          id: 'he-2',
          image: '/images/placeholder/luke-disbelief.jpg',
          narration: '他就那样看着你，眼中满是难以置信。沉默漫长得让你的心脏开始因后悔而狂跳。',
        },
        {
          id: 'he-3',
          image: '/images/placeholder/luke-relief.jpg',
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
        image: '/images/placeholder/ending-he.jpg',
      },
    },

    // ============ NE: 回到原点 ============
    {
      id: 'ending-ne',
      type: 'ending',
      panels: [
        {
          id: 'ne-1',
          image: '/images/placeholder/luke-gentle-smile.jpg',
          narration: '他抬起头，露出一个温柔而疲惫的微笑。',
          dialogue: {
            character: '左然',
            text: '别傻了。照顾你是我的责任。',
            position: 'right',
          },
        },
        {
          id: 'ne-2',
          image: '/images/placeholder/apple-given.jpg',
          narration: '他把削好的苹果递给你，一切又回到了那个安全、温暖却保持距离的空间。',
        },
        {
          id: 'ne-3',
          image: '/images/placeholder/city-lights.jpg',
          narration: '你知道，他已经悄悄地、细致地修补好了你们之间墙上的裂缝。窗外的城市灯火依旧璀璨，但你心里有一盏小灯，刚刚熄灭了。',
        },
      ],
      ending: {
        type: 'NE',
        title: 'Normal Ending',
        titleCn: '普通结局 · 安全距离',
        description: '有些话说不出口，有些墙无法跨越。你们依然是最亲密的陌生人。',
        image: '/images/placeholder/ending-ne.jpg',
      },
    },

    // ============ OE: 开放式结局 ============
    {
      id: 'ending-oe',
      type: 'ending',
      panels: [
        {
          id: 'oe-1',
          image: '/images/placeholder/luke-stop-look.jpg',
          narration: '他停下削苹果的动作，抬起头，镜片后闪烁着复杂的光芒。',
        },
        {
          id: 'oe-2',
          image: '/images/placeholder/luke-question.jpg',
          dialogue: {
            character: '左然',
            text: '……那你觉得，我们应该是什么？',
            position: 'center',
          },
        },
        {
          id: 'oe-3',
          image: '/images/placeholder/moonlight-smile.jpg',
          narration: '他把问题抛回给你，像一份精心准备的案件卷宗。月光洒落，你看到他嘴角挂着一丝若有若无的期待。你们的故事，还没有结束。',
        },
      ],
      ending: {
        type: 'OE',
        title: 'Open Ending',
        titleCn: '开放结局 · 未完待续',
        description: '他没有给出答案，而是给了你一个选择的权利。故事的下一章，由你书写。',
        image: '/images/placeholder/ending-oe.jpg',
      },
    },
  ],
};

// 场景流转逻辑
export const sceneFlow: Record<string, string> = {
  'opening-quote': 'opening-scene',
  'opening-scene': 'choice-1',
  // choice-1 的跳转由选项决定
  'branch-a': 'convergence',
  'branch-b': 'convergence',
  'branch-c': 'convergence',
  'convergence': 'choice-2',
  // choice-2 的跳转由选项决定，直接到结局
};
