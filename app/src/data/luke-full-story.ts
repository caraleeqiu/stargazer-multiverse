import { Story } from '@/types/story';

/**
 * 《未名情诗》完整版 - 含三结局
 * Based on: Tears of Themis - An Unnamed Love Poem
 */

const IMG = '/images/luke-pearce/Main-Story';

export const lukeFullStory: Story = {
  id: 'unnamed-love-poem',
  title: 'An Unnamed Love Poem',
  titleCn: '未名情诗',
  character: 'Luke Pearce',
  characterCn: '左然',
  cover: `${IMG}/01-opening.png`,
  estimatedTime: '5 min',
  scenes: [
    // ============ 开场引用 ============
    {
      id: 'opening-quote',
      type: 'narration',
      panels: [
        {
          id: 'quote-1',
          image: `${IMG}/01-opening.png`,
          narration: '在人生的案卷里，你是那个让我愿意打破一切规则的变量。',
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
          image: `${IMG}/02-wakeup.png`,
          narration: '深夜。未名市中心医院 VIP 病房。',
        },
        {
          id: 'wake-2',
          image: `${IMG}/02-wakeup.png`,
          narration: '你是 NXX 调查组的初级律师，也是著名律师左然的青梅竹马——他口中的「小妹妹」。',
        },
        {
          id: 'wake-3',
          image: `${IMG}/03-Luke-worried.png`,
          narration: '空气中弥漫着消毒水的气味。你缓缓睁开眼睛，映入眼帘的是左然布满疲惫和担忧的面容。',
        },
        {
          id: 'wake-4',
          image: `${IMG}/03-Luke-worried.png`,
          narration: '淡淡的胡茬爬上他棱角分明的下颌，平日里一丝不苟的衬衫也皱皱巴巴。',
        },
        {
          id: 'wake-5',
          image: `${IMG}/04-Flashback.png`,
          narration: '在一次秘密调查走私团伙的行动中，你为了掩护他被坠落的集装箱砸伤，昏迷至今。',
        },
        {
          id: 'wake-6',
          image: `${IMG}/05-eye-contact.png`,
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
            textCn: '「左律师……你再这么盯着我看，我可要按小时收费了……」',
            mood: '调侃',
            nextSceneId: 'branch-teasing',
          },
          {
            id: 'choice-1-b',
            text: 'Comforting',
            textCn: '「别担心……我没事的……」',
            mood: '安慰',
            nextSceneId: 'branch-comfort',
          },
          {
            id: 'choice-1-c',
            text: 'Confused',
            textCn: '「左然……发生什么了？我怎么在这里？」',
            mood: '困惑',
            nextSceneId: 'branch-confused',
          },
        ],
      },
    },

    // ============ 分支场景：调侃线 ============
    {
      id: 'branch-teasing',
      type: 'narration',
      panels: [
        {
          id: 'teasing-1',
          image: `${IMG}/a1-dont-joke.png`,
          narration: '他眨了眨眼，紧绷的嘴角软化了一瞬。他凑近你，声音沙哑而严肃。',
          dialogue: {
            character: '左然',
            text: '别开玩笑。这不是我们能辩论的案子。',
            position: 'right',
          },
        },
        {
          id: 'teasing-2',
          image: `${IMG}/a2-water.png`,
          narration: '他笨拙地想给你倒杯水，杯沿碰到你的嘴唇时发出轻响。你看到他眼中的慌乱，意识到他钢铁般的冷静终于出现了裂痕。',
        },
      ],
    },

    // ============ 分支场景：安慰线 ============
    {
      id: 'branch-comfort',
      type: 'narration',
      panels: [
        {
          id: 'comfort-1',
          image: `${IMG}/a1-dont-joke.png`,
          narration: '你的指尖还没碰到他，他就握住了你的手。他的掌心滚烫，微微颤抖。',
        },
        {
          id: 'comfort-2',
          image: `${IMG}/a2-water.png`,
          narration: '他将你的手贴在他的脸颊上，闭上了眼睛。',
          dialogue: {
            character: '左然',
            text: '……别再这样了。',
            position: 'right',
          },
        },
        {
          id: 'comfort-3',
          image: `${IMG}/05-eye-contact.png`,
          narration: '他的声音几不可闻。你能感觉到他皮肤下压抑的恐惧。第一次，你真切地感受到他平静外表下汹涌的暗潮。',
        },
      ],
    },

    // ============ 分支场景：困惑线 ============
    {
      id: 'branch-confused',
      type: 'narration',
      panels: [
        {
          id: 'confused-1',
          image: `${IMG}/a1-dont-joke.png`,
          narration: '他立刻切换成「律师模式」，条理清晰地解释事情的来龙去脉。但他紧握的拳头出卖了他。',
        },
        {
          id: 'confused-2',
          image: `${IMG}/a2-water.png`,
          narration: '当说到「你把我推开」这一段时，他的声音断了一瞬。',
        },
        {
          id: 'confused-3',
          image: `${IMG}/07-peeling.png`,
          narration: '他故作镇定地开始给你削苹果。当他把苹果递给你时，你注意到他指尖上有一道新鲜的小伤口。',
        },
      ],
    },

    // ============ 汇聚场景：削苹果 ============
    {
      id: 'convergence',
      type: 'narration',
      panels: [
        {
          id: 'conv-1',
          image: `${IMG}/07-peeling.png`,
          narration: '病房里很安静，只有他削苹果时轻柔而有节奏的声音。',
        },
        {
          id: 'conv-2',
          image: `${IMG}/07-peeling.png`,
          narration: '你望着他专注而笨拙的侧脸，意识到你们之间那堵标着「青梅竹马」的无形之墙，已经因为这次事件而布满裂痕。',
        },
        {
          id: 'conv-3',
          image: `${IMG}/08-moonlight.png`,
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
            textCn: '「左然，我不想再当你的『妹妹』了。」',
            mood: '告白',
            nextSceneId: 'ending-he',
          },
          {
            id: 'choice-2-b',
            text: 'Thanks',
            textCn: '「谢谢你，左然。这几天辛苦你了。」',
            mood: '感谢',
            nextSceneId: 'ending-ne',
          },
          {
            id: 'choice-2-c',
            text: 'Question',
            textCn: '「我们……只是搭档和青梅竹马，对吧？」',
            mood: '试探',
            nextSceneId: 'ending-oe',
          },
        ],
      },
    },

    // ============ HE 结局：告白 ============
    {
      id: 'ending-he',
      type: 'ending',
      panels: [
        {
          id: 'he-1',
          image: `${IMG}/he1-knife-stop.png`,
          narration: '他手中的刀骤然停住，割破了指尖。一滴鲜血涌出，但他似乎毫无察觉。',
        },
        {
          id: 'he-2',
          image: `${IMG}/he2-disbelief.png`,
          narration: '他就那样看着你，眼中满是难以置信。沉默漫长得让你的心脏开始因后悔而狂跳。',
        },
        {
          id: 'he-3',
          image: `${IMG}/he3-eight-years.png`,
          narration: '终于，他放下手中的一切。他锁定你的目光，声音沙哑，却带着一种如释重负的颤抖。',
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
        image: `${IMG}/he3-eight-years.png`,
      },
    },

    // ============ NE 结局：感谢 ============
    {
      id: 'ending-ne',
      type: 'ending',
      panels: [
        {
          id: 'ne-1',
          image: `${IMG}/07-peeling.png`,
          narration: '他抬起头，露出一个温柔而疲惫的微笑。',
          dialogue: {
            character: '左然',
            text: '傻瓜。照顾你本来就是我分内的事。',
            position: 'right',
          },
        },
        {
          id: 'ne-2',
          image: `${IMG}/07-peeling.png`,
          narration: '他把削好的苹果递给你，一切又回到了那个安全、温暖、却有些疏远的空间。',
        },
        {
          id: 'ne-3',
          image: `${IMG}/08-moonlight.png`,
          narration: '你知道，他已经悄悄地、细致地，修补好了你们之间墙上的裂痕。窗外的城市灯火依旧璀璨，但你心中的某盏小灯，却悄然熄灭了。',
        },
      ],
      ending: {
        type: 'NE',
        title: 'Normal Ending',
        titleCn: '普通结局 · 安全距离',
        description: '一切回归原位。他依然是那个温柔守护你的「哥哥」，而你们之间的墙，又恢复了原样。',
        image: `${IMG}/08-moonlight.png`,
      },
    },

    // ============ OE 结局：试探 ============
    {
      id: 'ending-oe',
      type: 'ending',
      panels: [
        {
          id: 'oe-1',
          image: `${IMG}/07-peeling.png`,
          narration: '他停下削苹果的动作，抬起头。镜片后的眼神复杂而深邃。',
        },
        {
          id: 'oe-2',
          image: `${IMG}/05-eye-contact.png`,
          narration: '他没有直接回答你的问题。相反，他反问了你。',
          dialogue: {
            character: '左然',
            text: '……那你觉得，我们应该是什么？',
            position: 'right',
          },
        },
        {
          id: 'oe-3',
          image: `${IMG}/08-moonlight.png`,
          narration: '他把问题抛回给你，像是一份精心准备的案卷。月光洒进病房，你看到他嘴角若有若无的笑意。你们的故事，还没有结束。',
        },
      ],
      ending: {
        type: 'OE',
        title: 'Open Ending',
        titleCn: '开放结局 · 未完待续',
        description: '他把选择权交给了你。在这个平行世界里，你们的故事还有无限可能。',
        image: `${IMG}/08-moonlight.png`,
      },
    },
  ],
};

// 场景流转
export const fullSceneFlow: Record<string, string> = {
  'opening-quote': 'opening-scene',
  'opening-scene': 'choice-1',
  'branch-teasing': 'convergence',
  'branch-comfort': 'convergence',
  'branch-confused': 'convergence',
  'convergence': 'choice-2',
};
