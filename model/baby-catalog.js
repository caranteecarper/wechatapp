const LINE_PRICES = {
  '000': '520',
  '520': '999',
  '999': '1314',
  '1314': '2024',
};

const PRIVATE_TIERS = [
  { id: 'light', name: '悄悄话·轻' },
  { id: 'clingy', name: '黏人互动·中' },
  { id: 'ours', name: '只属于我们·深' },
];

const item = (slug, title, subtitle, methods, options = {}) => ({
  slug,
  title,
  subtitle,
  methods,
  price: options.price || '000',
  tags: options.tags || [],
  extraSpecs: options.extraSpecs || [],
  tier: options.tier || '',
});

const GROUPS = [
  {
    key: 'cuddle',
    name: '贴贴',
    sectionName: '今天想怎么贴贴',
    asset: 'cuddle',
    items: [
      item('now-hug', '现在就抱抱我', '宝宝现在就来，隔着屏幕也要抱一下', ['文字回应', '语音抱抱'], {
        tags: ['现在就要', '软软抱抱'],
        extraSpecs: [['什么时候', ['现在', '睡前']]],
      }),
      item('voice-kiss', '给我一个亲亲', '用声音认真亲一下，不许敷衍', ['亲亲语音', '视频亲亲'], {
        price: '520',
        tags: ['语音亲亲', '不许敷衍'],
      }),
      item('hug-until-ready', '抱到我说可以', '下次见面第一件事就是抱紧我', ['当面完成', '先记约定'], {
        price: '999',
        tags: ['见面兑现', '抱久一点'],
        extraSpecs: [['抱多久', ['抱到我说可以', '再多抱一分钟']]],
      }),
      item('bedtime-kiss', '睡前亲亲我', '今晚最后一个亲亲必须留给我', ['微信语音', '视频通话'], {
        price: '520',
        tags: ['睡前限定', '晚安亲亲'],
      }),
      item('hug-owed', '先欠我一个抱抱', '记进抱抱账单，见面以后兑现', ['记入约定', '现在先哄我'], {
        tags: ['抱抱账单', '见面补上'],
        extraSpecs: [['兑现时间', ['下次见面', '由我决定']]],
      }),
    ],
  },
  {
    key: 'company',
    name: '陪伴',
    sectionName: '把时间留给我',
    asset: 'call',
    items: [
      item('meal-together', '陪我吃一顿饭', '打开视频，和我一起慢慢吃', ['视频通话', '照片打卡'], {
        price: '520',
        tags: ['一起吃饭', '异地陪伴'],
        extraSpecs: [['哪一顿', ['早餐', '午餐', '晚餐']]],
      }),
      item('ten-minutes', '给我十分钟', '这十分钟只许认真陪着我', ['语音通话', '视频通话'], {
        tags: ['十分钟', '专属时间'],
      }),
      item('quiet-video', '视频待着就好', '不用一直说话，让我看见宝宝', ['安静视频', '边做事边陪'], {
        price: '520',
        tags: ['不用说话', '看得见你'],
        extraSpecs: [['陪伴时长', ['十分钟', '半小时']]],
      }),
      item('walk-home', '陪我走完回家的路', '路上不想一个人，陪我聊一会', ['语音通话', '视频通话'], {
        tags: ['回家路上', '一路陪着'],
      }),
      item('fall-asleep', '今晚陪我慢慢睡着', '等我困了以后再轻轻说晚安', ['语音通话', '视频通话'], {
        price: '999',
        tags: ['睡前陪伴', '陪到困了'],
        extraSpecs: [['陪伴时长', ['十分钟', '半小时', '陪到睡着']]],
      }),
    ],
  },
  {
    key: 'comfort',
    name: '哄哄',
    sectionName: '小情绪要被接住',
    asset: 'secret',
    items: [
      item('comfort-first', '先哄我再讲道理', '现在只想被宝宝好好接住', ['文字安慰', '语音安慰'], {
        tags: ['先哄我', '晚点讲道理'],
        extraSpecs: [['先做什么', ['先抱抱', '先听我说']]],
      }),
      item('cheer-me-up', '认真哄到我开心', '不许只说一句“别难过了”', ['文字哄哄', '语音哄哄', '视频哄哄'], {
        price: '520',
        tags: ['认真哄', '不许敷衍'],
      }),
      item('hear-me-out', '陪我把委屈说完', '先认真听，不要着急打断我', ['语音通话', '视频通话'], {
        tags: ['认真倾听', '接住委屈'],
        extraSpecs: [['回应方式', ['先只听', '听完再抱抱']]],
      }),
      item('bedtime-story', '给我讲个睡前故事', '宝宝的声音就是今晚的晚安', ['实时讲给我听', '录好发给我'], {
        price: '520',
        tags: ['睡前故事', '专属声音'],
        extraSpecs: [['故事长度', ['五分钟', '十分钟']]],
      }),
      item('no-sad-sleep', '不许让我难过着睡觉', '今天的坏情绪要一起解决掉', ['连续聊天', '语音通话'], {
        price: '999',
        tags: ['今晚解决', '哄好再睡'],
        extraSpecs: [['完成标准', ['我说好一点了', '我安心说晚安']]],
      }),
    ],
  },
  {
    key: 'sweet',
    name: '甜甜',
    sectionName: '认真说点甜甜的话',
    asset: 'treat',
    items: [
      item('sincere-praise', '认真夸我一次', '要具体，不许只说一句好看', ['文字夸夸', '语音夸夸'], {
        tags: ['具体一点', '认真夸我'],
        extraSpecs: [['夸几句', ['三句', '五句']]],
      }),
      item('five-reasons', '说五个喜欢我的理由', '每一个都要是宝宝认真想的', ['文字回答', '语音回答'], {
        price: '520',
        tags: ['五个理由', '不许重复'],
      }),
      item('missed-me-moment', '今天什么时候想我了', '把最想我的那个瞬间告诉我', ['文字回答', '语音回答'], {
        tags: ['想我时刻', '今日限定'],
      }),
      item('mini-love-letter', '写一封迷你情书', '不用很长，但必须只写给我', ['聊天文字', '手写照片'], {
        price: '999',
        tags: ['迷你情书', '只写给我'],
        extraSpecs: [['情书长度', ['三句话', '认真写一段']]],
      }),
      item('special-nickname', '给我一个限定昵称', '今天只能用这个名字叫我', ['文字告诉我', '语音叫给我听'], {
        price: '520',
        tags: ['专属昵称', '今日限定'],
      }),
    ],
  },
  {
    key: 'distance',
    name: '异地',
    sectionName: '距离远也要在一起',
    asset: 'call',
    items: [
      item('current-photo', '发一张此刻的照片', '想看看宝宝现在正在做什么', ['聊天图片', '视频看一眼'], {
        tags: ['此刻照片', '让我看看'],
      }),
      item('same-sky', '把今天的天空发给我', '虽然不在一起，也要看同一片天', ['交换照片', '视频看天空'], {
        tags: ['同一片天', '异地浪漫'],
      }),
      item('shared-song', '交换一首正在听的歌', '用一首歌告诉我现在的心情', ['音乐链接', '录一小段给我'], {
        price: '520',
        tags: ['交换歌曲', '分享心情'],
      }),
      item('watch-together', '和我同步看一集', '选好时间，我们同时按下播放', ['语音连线', '视频连线'], {
        price: '999',
        tags: ['同步观看', '云陪伴'],
        extraSpecs: [['观看内容', ['一集剧', '一部电影', '一个综艺']]],
      }),
      item('same-little-thing', '和我同时做一件小事', '一起吃东西、散步或者看月亮', ['照片确认', '文字确认', '视频连线'], {
        tags: ['同步一下', '距离变近'],
        extraSpecs: [['一起做什么', ['吃东西', '散步', '看月亮']]],
      }),
    ],
  },
  {
    key: 'date',
    name: '约会',
    sectionName: '把下一次约好',
    asset: 'treat',
    items: [
      item('video-date', '预约一次视频约会', '提前选好时间，不许临时忘记', ['视频通话', '语音约会'], {
        price: '999',
        tags: ['预约时间', '云约会'],
        extraSpecs: [['约会时长', ['半小时', '一小时']]],
      }),
      item('weekend-evening', '周末留一个晚上给我', '这一晚不赶时间，只属于我们', ['日期预约', '文字确认'], {
        price: '1314',
        tags: ['周末限定', '只属于我们'],
      }),
      item('future-restaurant', '选一家以后要去的店', '先放进我们的见面清单', ['店铺链接', '图片分享'], {
        tags: ['见面清单', '一起去吃'],
      }),
      item('first-thing-together', '定下见面后的第一件事', '抱抱、吃饭还是一起散步', ['选项确认', '语音约定'], {
        price: '520',
        tags: ['见面约定', '第一件事'],
        extraSpecs: [['第一件事', ['先抱抱', '先吃饭', '先散步']]],
      }),
      item('seven-day-greeting', '一起完成七天早晚安', '连续七天，把每天的开始和结束留给我', ['连续打卡', '语音打卡'], {
        price: '1314',
        tags: ['连续七天', '早晚安'],
        extraSpecs: [['打卡方式', ['文字早晚安', '语音早晚安']]],
      }),
    ],
  },
  {
    key: 'surprise',
    name: '惊喜',
    sectionName: '藏一点小惊喜',
    asset: 'treat',
    items: [
      item('little-surprise', '给我准备一份小惊喜', '不用很贵，但要让我感受到用心', ['自定义任务', '照片验收'], {
        price: '1314',
        tags: ['认真准备', '不要剧透'],
        extraSpecs: [['出现时间', ['今天', '这周', '偷偷安排']]],
      }),
      item('couple-wallpaper', '做一张我们的专属壁纸', '选一张喜欢的合照认真做好', ['聊天图片', '设置后截图'], {
        price: '520',
        tags: ['专属壁纸', '我们的合照'],
      }),
      item('private-playlist', '建一个只属于我们的歌单', '每首歌都要有放进去的理由', ['歌单链接', '歌曲清单'], {
        price: '999',
        tags: ['专属歌单', '每首有理由'],
        extraSpecs: [['歌曲数量', ['五首', '十首']]],
      }),
      item('surprise-note', '写一张突然出现的小便签', '在我没想到的时候发给我', ['聊天文字', '手写照片'], {
        tags: ['突然出现', '小小心意'],
      }),
      item('sweet-blind-box', '抽一个甜甜盲盒', '随机决定今天要为我做什么', ['随机任务', '完成后确认'], {
        price: '520',
        tags: ['随机抽取', '打开才知道'],
      }),
    ],
  },
  {
    key: 'private',
    name: '私藏',
    sectionName: '只属于我们的悄悄话',
    asset: 'secret',
    items: [
      item('answer-me', '认真回答我', '我准备三个问题，宝宝逐个回答', ['文字回答', '语音回答'], {
        tags: ['三个问题', '认真回答'],
        tier: '悄悄话·轻',
      }),
      item('how-much-miss', '说说有多想我', '把今天最想我的时刻说出来', ['文字回答', '语音回答'], {
        price: '520',
        tags: ['想我了吗', '说具体一点'],
        tier: '悄悄话·轻',
      }),
      item('tell-secret', '把秘密告诉我', '说一个以前没告诉过我的小秘密', ['聊天文字', '微信语音'], {
        tags: ['只在这里说', '秘密交换'],
        tier: '悄悄话·轻',
      }),
      item('say-love-on-camera', '看着我说喜欢', '不许躲开镜头，也不许笑场', ['视频通话', '视频片段'], {
        price: '520',
        tags: ['看着我说', '不许躲'],
        tier: '悄悄话·轻',
      }),
      item('hear-your-voice', '给我听听你的声音', '现在就录一段只说给我听的话', ['微信语音', '实时通话'], {
        tags: ['只说给我', '现在就听'],
        tier: '悄悄话·轻',
      }),
      item('baby-kiss-me', '宝宝，亲亲我~', '用我喜欢的声音认真亲一下', ['微信语音', '视频通话'], {
        price: '520',
        tags: ['亲亲我', '软软一点'],
        tier: '黏人互动·中',
      }),
      item('hear-you-act-cute', '让我听宝宝撒娇', '不许害羞，撒娇到我满意', ['微信语音', '视频通话'], {
        price: '999',
        tags: ['撒娇给我听', '不许害羞'],
        tier: '黏人互动·中',
      }),
      item('special-name-comfort', '用专属昵称哄我', '只能用我们之间的那个称呼', ['微信语音', '视频通话'], {
        price: '520',
        tags: ['专属称呼', '认真哄我'],
        tier: '黏人互动·中',
      }),
      item('private-photo', '发一张只给我看的照片', '内容由我选，照片只留在我们之间', ['聊天图片', '视频看一眼'], {
        price: '999',
        tags: ['只给我看', '私密内容'],
        tier: '黏人互动·中',
      }),
      item('pillow-as-me', '抱着枕头当作我', '让我看看宝宝想抱我的样子', ['聊天图片', '视频通话'], {
        price: '520',
        tags: ['把枕头当我', '给我看看'],
        tier: '黏人互动·中',
      }),
      item('tonight-only-me', '今晚只许陪我', '接下来这段时间不许偷偷跑掉', ['连续陪伴', '视频通话'], {
        price: '1314',
        tags: ['今晚限定', '只陪我'],
        tier: '只属于我们·深',
        extraSpecs: [['陪多久', ['半小时', '一小时', '由我决定']]],
      }),
      item('dont-hang-up-first', '睡前不许先挂', '等我说可以晚安以后才能结束', ['语音通话', '视频通话'], {
        price: '999',
        tags: ['不许先挂', '等我晚安'],
        tier: '只属于我们·深',
      }),
      item('say-shy-words', '把不好意思的话说出来', '越害羞的那句话，越要认真告诉我', ['微信语音', '视频通话'], {
        price: '1314',
        tags: ['不许躲', '认真说出来'],
        tier: '只属于我们·深',
      }),
      item('intimate-promise', '兑现一个亲密约定', '现在约好，下次见面认真完成', ['私密约定', '双方确认'], {
        price: '1314',
        tags: ['见面兑现', '双方约定'],
        tier: '只属于我们·深',
      }),
      item('hidden-wish', '打开隐藏亲密愿望', '打开以后才知道我想让宝宝做什么', ['私密自定义', '完成后确认'], {
        price: '1314',
        tags: ['隐藏内容', '打开才知道'],
        tier: '只属于我们·深',
      }),
    ],
  },
];

const toId = (value) => value.replace(/[^a-z0-9]+/gi, '-').replace(/^-|-$/g, '').toLowerCase();

const buildSpecList = (entry) => {
  const definitions = [['完成方式', entry.methods], ...entry.extraSpecs];
  return definitions.map(([title, values], specIndex) => ({
    specId: `${entry.slug}-spec-${specIndex}`,
    title,
    specValueList: values.map((value, valueIndex) => ({
      specValueId: `${entry.slug}-${specIndex}-${toId(value) || valueIndex}`,
      specValue: value,
      image: null,
    })),
  }));
};

export function buildBabyCatalog(assets, productImages = {}) {
  const goods = GROUPS.flatMap((group) =>
    group.items.map((entry, itemIndex) => ({
      id: `baby-${entry.slug}`,
      slug: entry.slug,
      group: group.key,
      tier: entry.tier,
      title: entry.title,
      image: productImages[entry.slug] || assets[group.asset],
      price: entry.price,
      linePrice: LINE_PRICES[entry.price] || '2024',
      soldNum: [5, 13, 21, 52, 99][itemIndex % 5],
      tags: [group.name, ...entry.tags].slice(0, 3),
      etitle: entry.subtitle,
      completionMethod: entry.methods.join(' / '),
      specList: buildSpecList(entry),
    })),
  );

  const categoryDefinitions = GROUPS.map((group) => {
    const groupGoods = goods.filter((good) => good.group === group.key);
    const sections = group.key === 'private'
      ? PRIVATE_TIERS.map((tier) => [
          `baby-${group.key}-${tier.id}`,
          tier.name,
          assets[group.asset],
          groupGoods
            .filter((good) => good.tier === tier.name)
            .map((good) => [group.key, good.title, good.image, good.id]),
        ])
      : [[
          `baby-${group.key}-main`,
          group.sectionName,
          assets[group.asset],
          groupGoods.map((good) => [group.key, good.title, good.image, good.id]),
        ]];

    return [`baby-${group.key}`, group.name, assets[group.asset], sections];
  });

  return {
    goods,
    categoryDefinitions,
    tabs: [
      { text: '全部', key: 0 },
      ...GROUPS.map((group, index) => ({ text: group.name, key: index + 1, group: group.key })),
    ],
  };
}
