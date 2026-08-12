import { buildCategoryTree } from './persona-system';

const assetBase = '/assets/teacher';
const productBase = `${assetBase}/products`;

export const teacherAssets = {
  hero: `${assetBase}/teacher-hero.webp`,
  avatar: `${assetBase}/teacher-avatar.webp`,
  products: {},
};

const chatSpecs = {
  directive: [
    ['完成方式', ['文字回复', '语音回复', '视频回复']],
    ['完成时间', ['现在', '今晚', '姐姐指定']],
  ],
  daily: [
    ['汇报方式', ['文字报到', '语音报到', '照片报到']],
    ['完成时间', ['今天', '睡前', '姐姐指定']],
  ],
  report: [
    ['汇报方式', ['文字汇报', '语音汇报', '视频汇报']],
    ['验收方式', ['姐姐看过', '姐姐回复', '视频确认']],
  ],
  performance: [
    ['提交方式', ['文字说明', '照片打卡', '语音说明']],
    ['姐姐评价', ['通过', '补充一下', '重新完成']],
  ],
  reward: [
    ['领取方式', ['姐姐发语音', '聊天里兑现', '视频时兑现']],
    ['领取时间', ['现在', '今晚', '姐姐决定']],
  ],
  questions: [
    ['回答方式', ['文字回答', '语音回答', '视频回答']],
    ['回答时间', ['现在回答', '今晚回答', '姐姐指定']],
  ],
  training: [
    ['完成方式', ['语音完成', '视频完成', '当面完成']],
    ['验收结果', ['姐姐满意', '再来一次', '追加一项']],
  ],
  discipline: [
    ['执行方式', ['语音确认', '视频完成', '当面完成']],
    ['安全约定', ['随时可以说停', '先确认再开始']],
  ],
};

const catalog = [
  {
    key: 'directive',
    name: '姐姐指令',
    section: '今天听姐姐安排',
    products: [
      ['check-in', '现在来报到', '小狗现在在哪、在做什么，说清楚', '立即回复'],
      ['obey-today', '今天听姐姐的', '姐姐安排一件今天必须完成的事', '姐姐安排'],
      ['punctual-tonight', '今晚准时出现', '到了姐姐定的时间，不许迟到', '不许迟到'],
      ['tomorrow-plan', '明天照这个做', '把姐姐安排好的计划收好', '明日计划'],
      ['random-order', '抽一条随机指令', '由姐姐从指令库随机挑选', '随机抽取'],
    ],
  },
  {
    key: 'daily',
    name: '日常安排',
    section: '日常也要让姐姐放心',
    products: [
      ['eat-well', '先去好好吃饭', '吃完以后回来告诉姐姐', '认真吃饭'],
      ['sleep-on-time', '今晚早点睡', '到点报道，给姐姐说晚安', '睡前报到'],
      ['come-back', '忙完马上来找姐姐', '别忘了你的主人是谁', '不许消失'],
      ['finish-goal', '把今天的小目标做完', '完成以后让姐姐检查', '完成打卡'],
      ['report-safe', '出门记得报平安', '到了以后告诉姐姐一声', '报个平安'],
    ],
  },
  {
    key: 'report',
    name: '汇报检查',
    section: '说清楚，再等姐姐检查',
    products: [
      ['report-route', '向姐姐汇报行程', '今天去了哪里、做了什么', '行程汇报'],
      ['report-mood', '说说今天的心情', '姐姐听听小狗今天乖不乖', '心情汇报'],
      ['show-yourself', '让姐姐看看你', '发一张此刻的照片', '照片检查'],
      ['bedtime-summary', '交一份睡前总结', '睡前告诉姐姐今天的三件事', '睡前总结'],
      ['explain-tomorrow', '把明天计划说清楚', '什么时候忙，什么时候来找姐姐', '计划汇报'],
    ],
  },
  {
    key: 'performance',
    name: '小狗表现',
    section: '今天的表现交给姐姐',
    products: [
      ['good-today', '今天乖不乖', '自己先说，再等姐姐评分', '姐姐评分'],
      ['good-list', '完成乖乖清单', '把姐姐选好的三件小事完成', '三件小事'],
      ['make-happy', '主动哄姐姐开心', '自己想办法', '主动表现'],
      ['request-score', '申请姐姐打分', '让姐姐评价今天的表现', '表现打分'],
      ['make-up', '把没做好的补回来', '选一件遗漏的事情认真补好', '认真补做'],
    ],
  },
  {
    key: 'reward',
    name: '专属奖励',
    section: '乖小狗才可以领取',
    products: [
      ['sister-praise', '姐姐夸你一下', '表现好的小狗才能领取', '姐姐夸奖'],
      ['voice-reward', '奖励一段专属语音', '姐姐亲自录给小狗听', '专属语音'],
      ['more-time', '今晚多陪你一会', '奖励一段只属于小狗的时间', '专属时间'],
      ['make-wish', '允许小狗提愿望', '姐姐决定要不要答应', '愿望许可'],
      ['mystery-reward', '奖励由姐姐决定', '打开以后才知道是什么', '隐藏奖励'],
    ],
  },
  {
    key: 'questions',
    name: '姐姐问话',
    section: '姐姐问，小狗认真回答',
    products: [
      ['answer-sister', '回答姐姐', '姐姐准备三个问题，小狗逐个回答', '认真回答'],
      ['call-sister', '叫姐姐听听', '用语音认真叫一声姐姐', '语音回答'],
      ['miss-sister', '今天想姐姐了吗', '把最想姐姐的那个时刻说出来', '想念报告'],
      ['tell-secret', '把秘密告诉姐姐', '只有姐姐才知道', '悄悄回答'],
      ['look-and-answer', '看着姐姐说', '视频通话里看着姐姐回答', '视频回答'],
    ],
  },
  {
    key: 'training',
    name: '听话训练',
    section: '听清楚姐姐的话',
    products: [
      ['bark-twice', '小狗，叫两声~', '用姐姐喜欢的声音，叫到姐姐满意', '语音训练'],
      ['whose-puppy', '说，你是谁的小狗', '用语音好好回答姐姐', '身份问答'],
      ['sit-and-wait', '坐好，等姐姐问话', '视频接通以后先乖乖等着', '等待指令'],
      ['let-sister-check', '让姐姐检查', '照片还是视频，由姐姐决定', '姐姐检查'],
      ['try-again', '姐姐不满意，重来', '刚才那一项重新认真完成', '重新完成'],
    ],
  },
  {
    key: 'discipline',
    name: '姐姐管教',
    section: '姐姐说了才算完成',
    products: [
      ['kneel', '小狗，跪好~', '视频或当面完成，等姐姐开口', '等候问话'],
      ['tonight-belongs', '今晚你是姐姐的', '今晚接下来的安排听姐姐的', '今晚听话'],
      ['wait-stop', '等姐姐说可以', '姐姐不说停就不能停下来哦~', '等姐姐开口'],
      ['accept-punishment', '自己来认罚', '从补做、重录和追加任务中选一项', '主动认罚'],
      ['hidden-order', '接受隐藏指令', '打开后才看到姐姐的自定义要求', '隐藏内容'],
    ],
  },
];

const prices = ['000', '520', '1314', '520', '000'];

const makeSpecList = (group, slug) =>
  chatSpecs[group].map(([title, values], specIndex) => ({
    specId: `${slug}-spec-${specIndex + 1}`,
    title,
    specValueList: values.map((value, valueIndex) => ({
      specValueId: `${slug}-value-${specIndex + 1}-${valueIndex + 1}`,
      specValue: value,
      image: null,
    })),
  }));

let productNumber = 0;

export const teacherGoodsDefinitions = catalog.flatMap((category) =>
  category.products.map(([slug, title, etitle, tag], index) => {
    productNumber += 1;
    const id = `teacher-${slug}`;
    const image = `${productBase}/${`${productNumber}`.padStart(2, '0')}-${slug}.webp`;
    teacherAssets.products[id] = image;
    return {
      id,
      group: category.key,
      title,
      image,
      price: prices[index],
      linePrice: index % 2 === 0 ? '1314' : '2024',
      tags: [category.name, tag],
      etitle,
      specList: makeSpecList(category.key, slug),
    };
  }),
);

const definitionById = Object.fromEntries(teacherGoodsDefinitions.map((item) => [item.id, item]));

export const teacherHome = {
  eyebrow: 'PRIVATE HOURS',
  title: '姐姐上线',
  subtitle: '今天我会乖一点~',
  searchPlaceholder: '今天让小狗做什么好呢？',
  tabs: [
    { text: '全部', key: 0 },
    ...catalog.map((category, index) => ({ text: category.name, key: index + 1, group: category.key })),
  ],
  swiper: [teacherAssets.hero],
};

export const teacherCategoryList = buildCategoryTree(
  catalog.map((category) => {
    const first = definitionById[`teacher-${category.products[0][0]}`];
    const items = category.products.map(([slug, title]) => {
      const item = definitionById[`teacher-${slug}`];
      return [item.id, title, item.image];
    });
    return [
      `teacher-${category.key}`,
      category.name,
      first.image,
      [[`teacher-${category.key}-main`, category.section, first.image, items]],
    ];
  }),
);
