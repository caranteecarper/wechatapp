const LINE_PRICES = {
  '000': '520',
  '520': '999',
  '999': '1314',
  '1314': '2024',
};

const PRIVATE_TIERS = [
  { id: 'light', name: '悄悄话' },
  { id: 'clingy', name: '黏人一点' },
  { id: 'ours', name: '更亲密一点' },
];

const METHOD_TITLES = {
  cuddle: '宝宝怎么抱',
  company: '宝宝怎么陪',
  comfort: '宝宝先怎么哄',
  sweet: '宝宝怎么告诉我',
  distance: '宝宝怎么陪我',
  date: '我们怎么约',
  surprise: '宝宝怎么准备',
  private: '宝宝怎么回答',
};

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
      item('now-hug', '现在就抱抱我', '宝宝现在就来，隔着屏幕也要抱一下', ['发消息抱抱', '录段语音'], {
        tags: ['现在就要', '软软抱抱'],
        extraSpecs: [['什么时候', ['现在', '睡前']]],
      }),
      item('voice-kiss', '给我一个亲亲', '录一个亲亲给我听，要有声音哦', ['录段亲亲', '视频里亲亲'], {
        price: '520',
        tags: ['语音亲亲', '要听见哦'],
      }),
      item('hug-until-ready', '抱到我说可以', '下次见面第一件事就是抱紧我', ['见面时抱', '先记着'], {
        price: '999',
        tags: ['见面补上', '抱久一点'],
        extraSpecs: [['抱多久', ['抱到我说可以', '再多抱一分钟']]],
      }),
      item('bedtime-kiss', '睡前亲亲我', '今晚最后一个亲亲留给我', ['录段语音', '打个视频'], {
        price: '520',
        tags: ['睡前限定', '晚安亲亲'],
      }),
      item('hug-owed', '先欠我一个抱抱', '记进抱抱账单，见面以后补给我', ['先记着', '现在先哄我'], {
        tags: ['抱抱账单', '见面补上'],
        extraSpecs: [['什么时候补', ['下次见面', '由我决定']]],
      }),
    ],
  },
  {
    key: 'company',
    name: '陪伴',
    sectionName: '把时间留给我',
    asset: 'call',
    items: [
      item('meal-together', '陪我吃一顿饭', '打开视频，和我一起慢慢吃', ['打个视频', '发张吃饭照片'], {
        price: '520',
        tags: ['一起吃饭', '异地陪伴'],
        extraSpecs: [['哪一顿', ['早餐', '午餐', '晚餐']]],
      }),
      item('ten-minutes', '给我十分钟', '这十分钟就好好陪着我', ['打个语音', '打个视频'], {
        tags: ['十分钟', '留给我'],
      }),
      item('quiet-video', '开着视频陪我待一会', '不用一直说话，让我看见宝宝', ['开着视频', '边做事边陪'], {
        price: '520',
        tags: ['不用说话', '看得见你'],
        extraSpecs: [['陪伴时长', ['十分钟', '半小时']]],
      }),
      item('walk-home', '陪我走完回家的路', '路上不想一个人，陪我聊一会', ['打个语音', '打个视频'], {
        tags: ['回家路上', '一路陪着'],
      }),
      item('fall-asleep', '今晚陪我慢慢睡着', '等我困了以后再轻轻说晚安', ['打个语音', '打个视频'], {
        price: '999',
        tags: ['睡前陪伴', '陪到困了'],
        extraSpecs: [['陪伴时长', ['十分钟', '半小时', '陪到睡着']]],
      }),
    ],
  },
  {
    key: 'comfort',
    name: '哄哄',
    sectionName: '不开心的时候要宝宝哄',
    asset: 'secret',
    items: [
      item('comfort-first', '先哄我再讲道理', '现在不想讲道理，只想让宝宝先哄我', ['发消息哄我', '录段语音'], {
        tags: ['先哄我', '晚点讲道理'],
        extraSpecs: [['先做什么', ['先抱抱', '先听我说']]],
      }),
      item('cheer-me-up', '哄到我开心', '别只说一句“别难过了”', ['发消息哄我', '录段语音', '打个视频'], {
        price: '520',
        tags: ['哄好我', '多说几句'],
      }),
      item('hear-me-out', '陪我把委屈说完', '先听我说，不要着急打断', ['打个语音', '打个视频'], {
        tags: ['听我说', '别打断我'],
        extraSpecs: [['听完以后', ['先抱抱我', '再一起想办法']]],
      }),
      item('bedtime-story', '给我讲个睡前故事', '今晚想听宝宝说晚安', ['打电话讲', '录好发给我'], {
        price: '520',
        tags: ['睡前故事', '专属声音'],
        extraSpecs: [['故事长度', ['五分钟', '十分钟']]],
      }),
      item('no-sad-sleep', '今晚别让我难过着睡', '今天不想带着难过睡觉', ['陪我聊一会', '打个语音'], {
        price: '999',
        tags: ['今晚解决', '哄好再睡'],
        extraSpecs: [['什么时候算哄好', ['我说好一点了', '我安心说晚安']]],
      }),
    ],
  },
  {
    key: 'sweet',
    name: '甜甜',
    sectionName: '今天想听点甜的',
    asset: 'treat',
    items: [
      item('sincere-praise', '好好夸我一次', '要说具体，不能只说一句好看', ['发消息夸我', '录段语音'], {
        tags: ['夸具体点', '多说两句'],
        extraSpecs: [['夸几句', ['三句', '五句']]],
      }),
      item('five-reasons', '说五个喜欢我的理由', '每一个都要是宝宝自己想到的', ['发消息告诉我', '录段语音'], {
        price: '520',
        tags: ['五个理由', '别重复'],
      }),
      item('missed-me-moment', '今天什么时候想我了', '把最想我的那个瞬间告诉我', ['发消息告诉我', '录段语音'], {
        tags: ['想我时刻', '今日限定'],
      }),
      item('mini-love-letter', '写一封迷你情书', '不用很长，只写给我就好', ['发在聊天里', '手写后拍照'], {
        price: '999',
        tags: ['迷你情书', '写给我'],
        extraSpecs: [['写多长', ['三句话', '写一小段']]],
      }),
      item('special-nickname', '给我一个专属昵称', '今天就用这个名字叫我', ['发消息告诉我', '叫给我听'], {
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
      item('current-photo', '发一张此刻的照片', '想看看宝宝现在正在做什么', ['现在拍一张', '开视频给我看'], {
        tags: ['此刻照片', '让我看看'],
      }),
      item('same-sky', '把今天的天空发给我', '想看看宝宝那边今天是什么颜色', ['互相拍一张', '开视频看天空'], {
        tags: ['交换天空', '想看你那边'],
      }),
      item('shared-song', '交换一首正在听的歌', '用一首歌告诉我现在的心情', ['发歌曲链接', '录一小段给我'], {
        price: '520',
        tags: ['交换歌曲', '分享心情'],
      }),
      item('watch-together', '陪我一起看一集', '选好时间，我们同时按下播放', ['打着语音看', '开着视频看'], {
        price: '999',
        tags: ['同步观看', '云陪伴'],
        extraSpecs: [['观看内容', ['一集剧', '一部电影', '一个综艺']]],
      }),
      item('same-little-thing', '和我同时做一件小事', '一起吃东西、散步或者看月亮', ['互相发照片', '发消息告诉我', '开着视频'], {
        tags: ['一起做', '像在身边'],
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
      item('video-date', '和我约一场视频约会', '提前约好，到了时间来找我', ['打个视频', '打个语音'], {
        price: '999',
        tags: ['预约时间', '云约会'],
        extraSpecs: [['约会时长', ['半小时', '一小时']]],
      }),
      item('weekend-evening', '周末留一个晚上给我', '这一晚不赶时间，留给我们', ['选个晚上', '先和我说好'], {
        price: '1314',
        tags: ['周末限定', '我们的晚上'],
      }),
      item('future-restaurant', '选一家以后要去的店', '先放进我们的见面清单', ['发店铺链接', '发图片给我'], {
        tags: ['见面清单', '一起去吃'],
      }),
      item('first-thing-together', '定下见面后的第一件事', '抱抱、吃饭还是一起散步', ['一起选一个', '录语音说好'], {
        price: '520',
        tags: ['见面约定', '第一件事'],
        extraSpecs: [['第一件事', ['先抱抱', '先吃饭', '先散步']]],
      }),
      item('seven-day-greeting', '一起完成七天早晚安', '连续七天，醒来和睡前都来找我', ['每天发消息', '每天录语音'], {
        price: '1314',
        tags: ['连续七天', '早晚安'],
        extraSpecs: [['怎么说', ['发早晚安', '录早晚安']]],
      }),
    ],
  },
  {
    key: 'surprise',
    name: '惊喜',
    sectionName: '藏一点小惊喜',
    asset: 'treat',
    items: [
      item('little-surprise', '给我准备一份小惊喜', '不用很贵，宝宝用心想一个就好', ['宝宝自己想', '准备好再告诉我'], {
        price: '1314',
        tags: ['宝宝来准备', '不要剧透'],
        extraSpecs: [['什么时候', ['今天', '这周', '偷偷安排']]],
      }),
      item('couple-wallpaper', '做一张我们的壁纸', '选张喜欢的合照，做成我们的壁纸', ['做好发给我', '换好后截图'], {
        price: '520',
        tags: ['我们的壁纸', '合照'],
      }),
      item('private-playlist', '建一个我们的歌单', '每首歌都告诉我为什么选它', ['发歌单链接', '列一张歌单'], {
        price: '999',
        tags: ['我们的歌单', '每首有理由'],
        extraSpecs: [['歌曲数量', ['五首', '十首']]],
      }),
      item('surprise-note', '写一张突然出现的小便签', '趁我没想到的时候发给我', ['发在聊天里', '手写后拍照'], {
        tags: ['突然出现', '小小心意'],
      }),
      item('sweet-blind-box', '抽一个甜甜盲盒', '随机决定今天要为我做什么', ['抽一件小事', '做完告诉我'], {
        price: '520',
        tags: ['随机抽取', '打开才知道'],
      }),
    ],
  },
  {
    key: 'private',
    name: '私藏',
    sectionName: '有些话只想和宝宝说',
    asset: 'secret',
    items: [
      item('answer-me', '回答我三个问题', '我问三个，宝宝一个个答', ['发消息回答', '录段语音'], {
        tags: ['三个问题', '一个个答'],
        tier: '悄悄话',
      }),
      item('how-much-miss', '说说有多想我', '把今天最想我的时刻说出来', ['发消息告诉我', '录段语音'], {
        price: '520',
        tags: ['想我了吗', '说具体一点'],
        tier: '悄悄话',
      }),
      item('tell-secret', '把秘密告诉我', '说一个以前没告诉过我的小秘密', ['发在聊天里', '录段语音'], {
        tags: ['只在这里说', '秘密交换'],
        tier: '悄悄话',
      }),
      item('say-love-on-camera', '看着我说喜欢', '别躲镜头，也别笑场', ['打个视频', '录段视频'], {
        price: '520',
        tags: ['看着我说', '别躲'],
        tier: '悄悄话',
      }),
      item('hear-your-voice', '给我听听你的声音', '现在就录一段话给我听', ['录段语音', '打给我'], {
        tags: ['说给我听', '现在就听'],
        tier: '悄悄话',
      }),
      item('baby-kiss-me', '宝宝，亲亲我~', '用我喜欢的声音亲一下', ['录段语音', '打个视频'], {
        price: '520',
        tags: ['亲亲我', '软软一点'],
        tier: '黏人一点',
      }),
      item('hear-you-act-cute', '让我听宝宝撒娇', '害羞也要撒娇给我听', ['录段语音', '打个视频'], {
        price: '999',
        tags: ['撒娇给我听', '别害羞'],
        tier: '黏人一点',
      }),
      item('special-name-comfort', '用专属昵称哄我', '就用我们之间的那个称呼', ['录段语音', '打个视频'], {
        price: '520',
        tags: ['专属称呼', '哄哄我'],
        tier: '黏人一点',
      }),
      item('private-photo', '发一张只给我看的照片', '想拍什么先说好，只发给我看', ['发张照片', '开视频给我看'], {
        price: '999',
        tags: ['只给我看', '私密内容'],
        tier: '黏人一点',
      }),
      item('pillow-as-me', '抱着枕头当作我', '让我看看宝宝想抱我的样子', ['发张照片', '打个视频'], {
        price: '520',
        tags: ['把枕头当我', '给我看看'],
        tier: '黏人一点',
      }),
      item('tonight-only-me', '今晚多陪陪我', '接下来这段时间先不要偷偷跑掉', ['一直陪我聊', '开着视频'], {
        price: '1314',
        tags: ['今晚限定', '多陪陪我'],
        tier: '更亲密一点',
        extraSpecs: [['陪多久', ['半小时', '一小时', '由我决定']]],
      }),
      item('dont-hang-up-first', '睡前先别挂', '等我说完晚安再结束', ['打个语音', '打个视频'], {
        price: '999',
        tags: ['先别挂', '等我晚安'],
        tier: '更亲密一点',
      }),
      item('say-shy-words', '把不好意思的话说出来', '挑一句最不好意思的告诉我', ['录段语音', '打个视频'], {
        price: '1314',
        tags: ['别躲', '说给我听'],
        tier: '更亲密一点',
      }),
      item('intimate-promise', '约一件见面要做的小事', '两个人都愿意，再把它记下来', ['先说好', '下次见面'], {
        price: '1314',
        tags: ['见面完成', '我们说好'],
        tier: '更亲密一点',
      }),
      item('hidden-wish', '看看我藏起来的愿望', '打开以后才知道我想让宝宝做什么', ['我先写下来', '宝宝打开看'], {
        price: '1314',
        tags: ['隐藏内容', '打开才知道'],
        tier: '更亲密一点',
      }),
    ],
  },
];

const toId = (value) => value.replace(/[^a-z0-9]+/gi, '-').replace(/^-|-$/g, '').toLowerCase();

const buildSpecList = (entry, groupKey) => {
  const definitions = [[METHOD_TITLES[groupKey], entry.methods], ...entry.extraSpecs];
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
    group.items.map((entry, itemIndex) => {
      const image =
        productImages[entry.slug] ||
        (assets.products ? `${assets.products}/${entry.slug}.jpg` : assets[group.asset]);
      return {
        id: `baby-${entry.slug}`,
        slug: entry.slug,
        group: group.key,
        tier: entry.tier,
        title: entry.title,
        image,
        detailImage: assets.detailProducts ? `${assets.detailProducts}/${entry.slug}.jpg` : image,
        price: entry.price,
        linePrice: LINE_PRICES[entry.price] || '2024',
        soldNum: [5, 13, 21, 52, 99][itemIndex % 5],
        tags: [group.name, ...entry.tags].slice(0, 3),
        etitle: entry.subtitle,
        completionMethod: entry.methods.join(' / '),
        specList: buildSpecList(entry, group.key),
      };
    }),
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
