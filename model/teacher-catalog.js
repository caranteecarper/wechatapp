import { buildCategoryTree } from './persona-system';

const assetBase = '/assets/teacher';
const productBase = `${assetBase}/products`;

export const teacherAssets = {
  hero: `${assetBase}/teacher-hero-persona.jpg`,
  avatar: `${assetBase}/teacher-avatar.jpg`,
  products: {},
};

const choices = (firstTitle, firstValues, secondTitle, secondValues) => [
  [firstTitle, firstValues],
  [secondTitle, secondValues],
];

const privateAgreement = ['两个人都同意', '姐姐和小狗都能叫停'];

const catalog = [
  {
    key: 'directive',
    name: '姐姐指令',
    section: '今天听姐姐安排',
    products: [
      ['check-in', '现在来报到', '小狗现在在哪、在做什么，说清楚', '立即回复', choices('怎么报到', ['发条消息', '录段语音', '开视频'], '什么时候', ['现在', '忙完马上', '姐姐来定'])],
      ['obey-today', '今天听姐姐的', '姐姐安排一件今天必须完成的事', '姐姐安排', choices('姐姐要小狗', ['做一件事', '完成三件小事', '等临时安排'], '做完以后', ['告诉姐姐', '发照片给姐姐', '等姐姐检查'])],
      ['punctual-tonight', '今晚准时出现', '到了姐姐定的时间，别迟到', '准时出现', choices('怎么出现', ['发消息报到', '打给姐姐', '开视频'], '几点到', ['今晚九点', '今晚十点', '姐姐来定'])],
      ['tomorrow-plan', '明天照这个做', '把姐姐安排好的计划收好', '明日计划', choices('怎么收好', ['回复知道了', '写进备忘录', '复述给姐姐'], '明天什么时候', ['起床后', '白天完成', '姐姐来定'])],
      ['random-order', '抽一条随机指令', '这次由姐姐来选', '随机抽取', choices('怎么抽', ['姐姐直接选', '三选一', '随机抽一条'], '抽到以后', ['马上做', '今晚做', '先听姐姐说'])],
    ],
  },
  {
    key: 'daily',
    name: '日常安排',
    section: '日常也要让姐姐放心',
    products: [
      ['eat-well', '先去好好吃饭', '吃完以后回来告诉姐姐', '好好吃饭', choices('吃完告诉姐姐', ['发条消息', '拍张照片', '录段语音'], '吃哪一顿', ['午饭', '晚饭', '姐姐来定'])],
      ['sleep-on-time', '今晚早点睡', '到点来找姐姐说晚安', '睡前报到', choices('怎么说晚安', ['发消息', '录段语音', '打给姐姐'], '几点睡', ['十一点前', '十二点前', '姐姐来定'])],
      ['come-back', '忙完马上来找姐姐', '忙完别一声不响地消失', '忙完来找姐姐', choices('忙完以后', ['马上发消息', '打给姐姐', '开视频'], '最晚什么时候', ['今晚九点', '睡前', '姐姐来定'])],
      ['finish-goal', '把今天的小目标做完', '做完以后给姐姐看', '完成小目标', choices('做完给姐姐看', ['发消息', '发照片', '开视频'], '什么时候交', ['今天下午', '今晚', '姐姐来定'])],
      ['report-safe', '出门记得报平安', '到了以后告诉姐姐一声', '报个平安', choices('怎么报平安', ['发消息', '发定位', '拍张照片'], '什么时候说', ['出门时', '到了以后', '回来以后'])],
    ],
  },
  {
    key: 'report',
    name: '汇报检查',
    section: '把话说清楚，让姐姐看看',
    products: [
      ['report-route', '向姐姐汇报行程', '今天去了哪里、做了什么', '行程汇报', choices('怎么说', ['发消息', '录段语音', '打给姐姐'], '说到哪里', ['只说现在', '说说一整天', '姐姐来问'])],
      ['report-mood', '说说今天的心情', '开心和不开心的都告诉姐姐', '心情汇报', choices('怎么告诉姐姐', ['发消息', '录段语音', '开视频'], '先说什么', ['今天最开心的', '今天最累的', '最想姐姐的时候'])],
      ['show-yourself', '让姐姐看看你', '发一张此刻的照片', '给姐姐看看', choices('给姐姐看', ['现在拍一张', '开视频', '晚点补一张'], '姐姐看完', ['等姐姐回复', '再说说在做什么', '让姐姐继续问'])],
      ['bedtime-summary', '交一份睡前总结', '睡前告诉姐姐今天的三件事', '睡前总结', choices('说哪三件事', ['最开心的', '最累的', '最想姐姐的'], '怎么告诉姐姐', ['发消息', '录段语音', '打给姐姐'])],
      ['explain-tomorrow', '把明天计划说清楚', '什么时候忙，什么时候来找姐姐', '明天计划', choices('先说清楚', ['什么时候忙', '什么时候休息', '什么时候找姐姐'], '怎么说', ['发消息', '录段语音', '写成清单'])],
    ],
  },
  {
    key: 'performance',
    name: '小狗表现',
    section: '让姐姐看看今天乖不乖',
    products: [
      ['good-today', '今天乖不乖', '自己先说，再等姐姐打分', '姐姐打分', choices('先怎么说', ['发消息认领', '录语音说', '开视频说'], '姐姐来评', ['很乖', '还可以', '要补一下'])],
      ['good-list', '完成乖乖清单', '把姐姐选好的三件小事做完', '三件小事', choices('这次做哪三件', ['姐姐来选', '从清单里选', '随机三件'], '做完给姐姐', ['发消息', '发照片', '录段语音'])],
      ['make-happy', '主动哄姐姐开心', '这次由小狗自己想办法', '主动哄姐姐', choices('怎么哄姐姐', ['说点好听的', '准备小惊喜', '陪姐姐一会'], '姐姐说', ['哄好了', '还差一点', '再来一次'])],
      ['request-score', '申请姐姐打分', '让姐姐看看今天的表现', '请姐姐打分', choices('想让姐姐看', ['今天有多乖', '完成了什么', '哪里没做好'], '姐姐给分', ['五分', '四分', '先不及格'])],
      ['make-up', '把没做好的补回来', '选一件漏掉的事重新做好', '补回来', choices('补哪一件', ['漏掉的', '做得不好的', '姐姐指定'], '补完以后', ['重新交给姐姐', '等姐姐检查', '再做一遍'])],
    ],
  },
  {
    key: 'reward',
    name: '专属奖励',
    section: '乖小狗才可以领取',
    products: [
      ['sister-praise', '姐姐夸你一下', '表现好的小狗才能领', '姐姐夸奖', choices('姐姐怎么夸', ['发段语音', '聊天里夸', '视频时夸'], '什么时候听', ['现在', '今晚', '姐姐想夸时'])],
      ['voice-reward', '奖励一段专属语音', '姐姐亲自录给小狗听', '专属语音', choices('想听什么', ['一句表扬', '一段悄悄话', '姐姐随口说'], '什么时候发', ['现在', '今晚', '姐姐来定'])],
      ['more-time', '今晚多陪你一会', '这段时间奖励给小狗', '多陪一会', choices('怎么陪', ['打语音', '开视频', '一起做点事'], '陪多久', ['十分钟', '半小时', '姐姐来定'])],
      ['make-wish', '允许小狗提愿望', '姐姐听完再决定答不答应', '提个愿望', choices('小狗想要', ['一个抱抱', '一段陪伴', '一个小愿望'], '什么时候说', ['现在', '今晚', '见面时'])],
      ['mystery-reward', '奖励由姐姐决定', '打开以后才知道是什么', '隐藏奖励', choices('什么时候揭晓', ['现在', '今晚', '姐姐想说时'], '打开以前', ['不给提示', '给一点提示', '让小狗猜'])],
    ],
  },
  {
    key: 'questions',
    name: '姐姐问话',
    section: '姐姐问什么，小狗就好好回答',
    products: [
      ['answer-sister', '回答姐姐', '姐姐准备三个问题，小狗一个个回答', '回答姐姐', choices('怎么回答', ['发消息', '录段语音', '开视频'], '什么时候答', ['现在', '今晚', '姐姐来定'])],
      ['call-sister', '叫姐姐听听', '用姐姐喜欢的声音叫一声', '叫姐姐', choices('叫给姐姐听', ['录段语音', '视频里叫', '当面叫'], '姐姐没听够', ['再叫一次', '换个语气', '等姐姐教'])],
      ['miss-sister', '今天想姐姐了吗', '把最想姐姐的那个时刻说出来', '想姐姐了', choices('说给姐姐听', ['发消息', '录段语音', '开视频'], '说哪一个', ['刚醒来的时候', '忙完的时候', '现在'])],
      ['tell-secret', '把秘密告诉姐姐', '这件事只让姐姐知道', '悄悄告诉姐姐', choices('怎么告诉姐姐', ['发消息', '录段语音', '见面说'], '什么时候说', ['现在', '睡前', '见面时'])],
      ['look-and-answer', '看着姐姐说', '视频接通以后看着姐姐回答', '看着姐姐', choices('在哪里回答', ['视频里', '见面时'], '姐姐问几句', ['一句', '三句', '姐姐来定'])],
    ],
  },
  {
    key: 'training',
    name: '听话训练',
    section: '听清楚姐姐的话',
    products: [
      ['bark-twice', '小狗，叫两声~', '用姐姐喜欢的声音，叫到姐姐满意', '叫给姐姐听', choices('怎么叫', ['发段语音', '视频里叫', '当面叫'], '姐姐没听够', ['再叫一次', '换个语气', '等姐姐教'])],
      ['whose-puppy', '说，你是谁的小狗', '好好回答姐姐', '说清楚', choices('怎么回答', ['发段语音', '视频里说', '当面说'], '姐姐不满意', ['重新说', '说完整一点', '等姐姐教'])],
      ['sit-and-wait', '坐好，等姐姐问话', '视频接通以后先乖乖等着', '等姐姐开口', choices('在哪里等', ['视频里', '见面时'], '姐姐没开口前', ['先安静等', '看着姐姐', '听姐姐安排'])],
      ['let-sister-check', '让姐姐检查', '照片还是视频，由姐姐决定', '给姐姐检查', choices('给姐姐看', ['发照片', '开视频', '当面检查'], '看完以后', ['等姐姐说可以', '不够就补', '按姐姐说的改'])],
      ['try-again', '姐姐不满意，重来', '刚才那一项重新做好', '重新来一次', choices('哪一项重来', ['重新说', '重新录', '重新做'], '做到什么时候', ['姐姐满意', '姐姐说可以', '先停下来商量'])],
    ],
  },
  {
    key: 'discipline',
    name: '姐姐管教',
    section: '先说好，再听姐姐安排',
    products: [
      ['kneel', '小狗，跪好~', '视频或见面时完成，先等姐姐开口', '等姐姐开口', choices('在哪里', ['视频里', '见面时'], '先说好', privateAgreement)],
      ['tonight-belongs', '今晚你是姐姐的', '今晚接下来的安排听姐姐的', '今晚听话', choices('今晚怎么听', ['语音里听姐姐', '视频里听姐姐', '见面时听姐姐'], '先说好', privateAgreement)],
      ['wait-stop', '等姐姐说可以', '姐姐说停要立刻停，小狗也随时可以说停', '等姐姐开口', choices('小狗要等', ['姐姐说继续', '姐姐说可以', '姐姐确认完成'], '先说好', privateAgreement)],
      ['accept-punishment', '自己来认罚', '从补做、重录和追加任务里选一项', '主动认罚', choices('小狗选一个', ['重新做', '重新录', '再加一项'], '先说好', privateAgreement)],
      ['hidden-order', '接受隐藏指令', '打开以后才看到姐姐的要求', '隐藏指令', choices('怎么收到', ['聊天里打开', '语音里听', '见面时听'], '先说好', privateAgreement)],
    ],
  },
];

const prices = ['000', '520', '1314', '520', '000'];

const makeSpecList = (definitions, slug) =>
  definitions.map(([title, values], specIndex) => ({
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
  category.products.map(([slug, title, etitle, tag, specs], index) => {
    productNumber += 1;
    const id = `teacher-${slug}`;
    const image = `${productBase}/${`${productNumber}`.padStart(2, '0')}-${slug}.jpg`;
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
      specList: makeSpecList(specs, slug),
    };
  }),
);

const definitionById = Object.fromEntries(teacherGoodsDefinitions.map((item) => [item.id, item]));

export const teacherHome = {
  eyebrow: '今天听姐姐的',
  title: '姐姐上线',
  subtitle: '今天小狗会乖乖的',
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
