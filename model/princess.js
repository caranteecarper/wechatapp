import { buildCategoryTree, createPersonaSystem } from './persona-system';

const assetBase = '/assets/princess';

const assets = {
  hero: `${assetBase}/princess-hero.jpg`,
  wish: `${assetBase}/wish.jpg`,
  favor: `${assetBase}/favor.jpg`,
  ritual: `${assetBase}/ritual.jpg`,
  surprise: `${assetBase}/surprise.jpg`,
};

const goods = [
  {
    id: 'princess-0',
    group: 'wish',
    title: '这个愿望不许拒绝',
    image: assets.wish,
    price: '520',
    linePrice: '1314',
    tags: ['公主愿望', '认真兑现'],
    etitle: '愿望不必很大，被仆人认真记住就很珍贵。',
    specList: [
      {
        specId: 'wish-kind',
        title: '愿望类型',
        specValueList: [
          { specValueId: 'today', specValue: '今天就能实现', image: null },
          { specValueId: 'date', specValue: '下次见面实现', image: null },
          { specValueId: 'secret', specValue: '先保密', image: null },
        ],
      },
      {
        specId: 'wish-reply',
        title: '回应方式',
        specValueList: [
          { specValueId: 'accept', specValue: '郑重接下', image: null },
          { specValueId: 'plan', specValue: '给我一份计划', image: null },
        ],
      },
    ],
  },
  {
    id: 'princess-1',
    group: 'favor',
    title: '现在就认真夸我',
    image: assets.favor,
    price: '000',
    linePrice: '520',
    tags: ['今日偏爱', '只夸我'],
    etitle: '不要顺便，不要敷衍，今天请认真看见我的好。',
    specList: [
      {
        specId: 'favor-style',
        title: '夸奖方式',
        specValueList: [
          { specValueId: 'voice', specValue: '当面说给我听', image: null },
          { specValueId: 'letter', specValue: '写一段给我', image: null },
          { specValueId: 'detail', specValue: '说三个细节', image: null },
        ],
      },
    ],
  },
  {
    id: 'princess-2',
    group: 'ritual',
    title: '普通日子也要给我仪式感',
    image: assets.ritual,
    price: '1314',
    linePrice: '2024',
    tags: ['仪式感', '为我准备'],
    etitle: '普通的一天，也可以因为仆人的认真变得特别。',
    specList: [
      {
        specId: 'ritual-kind',
        title: '仪式内容',
        specValueList: [
          { specValueId: 'date', specValue: '云约会', image: null },
          { specValueId: 'cake', specValue: '甜点与祝福', image: null },
          { specValueId: 'letter', specValue: '一封正式情书', image: null },
        ],
      },
      {
        specId: 'ritual-time',
        title: '准备时间',
        specValueList: [
          { specValueId: 'tonight', specValue: '今晚', image: null },
          { specValueId: 'weekend', specValue: '这个周末', image: null },
        ],
      },
    ],
  },
  {
    id: 'princess-3',
    group: 'surprise',
    title: '惊喜必须只为我准备',
    image: assets.surprise,
    price: '2024',
    linePrice: '5200',
    tags: ['专属惊喜', '不许随便'],
    etitle: '贵重不是重点，重点是这份心思只为我准备。',
    specList: [
      {
        specId: 'surprise-size',
        title: '惊喜程度',
        specValueList: [
          { specValueId: 'tiny', specValue: '小小惊喜', image: null },
          { specValueId: 'careful', specValue: '认真准备', image: null },
          { specValueId: 'secret', specValue: '完全保密', image: null },
        ],
      },
      {
        specId: 'surprise-time',
        title: '揭晓时间',
        specValueList: [
          { specValueId: 'soon', specValue: '最近几天', image: null },
          { specValueId: 'meet', specValue: '下次见面', image: null },
        ],
      },
    ],
  },
  {
    id: 'princess-4',
    group: 'favor',
    title: '今天第一顺位必须是我',
    image: assets.favor,
    price: '520',
    linePrice: '1314',
    tags: ['第一顺位', '专属时间'],
    etitle: '忙完世界以后，请把最完整的一点时间留给我。',
    specList: [
      {
        specId: 'priority-time',
        title: '专属时间',
        specValueList: [
          { specValueId: 'half-hour', specValue: '完整半小时', image: null },
          { specValueId: 'evening', specValue: '今晚留给我', image: null },
          { specValueId: 'weekend', specValue: '周末专属场', image: null },
        ],
      },
      {
        specId: 'priority-mode',
        title: '陪伴方式',
        specValueList: [
          { specValueId: 'voice', specValue: '语音', image: null },
          { specValueId: 'video', specValue: '视频', image: null },
        ],
      },
    ],
  },
  {
    id: 'princess-5',
    group: 'wish',
    title: '公主的话不许漏看',
    image: assets.wish,
    price: '000',
    linePrice: '999',
    tags: ['私密愿望', '仅仆人可见'],
    etitle: '这封愿望只交给仆人，也只等仆人的回答。',
    specList: [
      {
        specId: 'private-wish',
        title: '阅读方式',
        specValueList: [
          { specValueId: 'now', specValue: '现在认真读', image: null },
          { specValueId: 'night', specValue: '今晚慢慢读', image: null },
        ],
      },
      {
        specId: 'private-reply',
        title: '答复方式',
        specValueList: [
          { specValueId: 'promise', specValue: '给我一个承诺', image: null },
          { specValueId: 'letter', specValue: '回一封信', image: null },
        ],
      },
    ],
  },
];

const categories = buildCategoryTree([
  [
    'princess-favor',
    '偏爱',
    assets.favor,
    [
      [
        'princess-favor-main',
        '把公主放在第一顺位',
        assets.favor,
        [
          ['favor', '认真夸我', assets.favor],
          ['favor', '第一顺位', assets.favor],
          ['favor', '专属时间', assets.ritual],
          ['favor', '只偏心我', assets.favor],
          ['favor', '先回公主', assets.wish],
          ['favor', '站在我这边', assets.surprise],
        ],
      ],
      [
        'princess-favor-care',
        '公主今日礼遇',
        assets.ritual,
        [
          ['favor', '正式早安', assets.ritual],
          ['favor', '晚安仪式', assets.wish],
          ['favor', '认真道歉', assets.surprise],
          ['favor', '接住情绪', assets.favor],
          ['favor', '今日称赞', assets.favor],
          ['favor', '专属称呼', assets.wish],
        ],
      ],
    ],
  ],
  [
    'princess-wish',
    '愿望',
    assets.wish,
    [
      [
        'princess-wish-main',
        '每个愿望都要有回音',
        assets.wish,
        [
          ['wish', '今日愿望', assets.wish],
          ['wish', '本周愿望', assets.wish],
          ['wish', '见面清单', assets.ritual],
          ['wish', '想去的地方', assets.surprise],
          ['wish', '想要的礼物', assets.favor],
          ['wish', '悄悄愿望', assets.wish],
        ],
      ],
      [
        'princess-wish-promise',
        '等仆人郑重兑现',
        assets.favor,
        [
          ['wish', '今天实现', assets.favor],
          ['wish', '下次见面', assets.ritual],
          ['wish', '周末安排', assets.surprise],
          ['wish', '一起完成', assets.wish],
          ['wish', '替我保密', assets.surprise],
          ['wish', '认真答复', assets.favor],
        ],
      ],
    ],
  ],
  [
    'princess-ritual',
    '仪式',
    assets.ritual,
    [
      [
        'princess-ritual-daily',
        '普通日子也值得庆祝',
        assets.ritual,
        [
          ['ritual', '早安仪式', assets.ritual],
          ['ritual', '晚安仪式', assets.wish],
          ['ritual', '云约会', assets.favor],
          ['ritual', '一起看电影', assets.surprise],
          ['ritual', '一封情书', assets.wish],
          ['ritual', '今日合照', assets.favor],
        ],
      ],
      [
        'princess-ritual-special',
        '重要日子郑重收藏',
        assets.favor,
        [
          ['ritual', '纪念日', assets.ritual],
          ['ritual', '生日计划', assets.surprise],
          ['ritual', '节日约会', assets.favor],
          ['ritual', '倒数见面', assets.wish],
          ['ritual', '月度回忆', assets.ritual],
          ['ritual', '年度愿望', assets.wish],
        ],
      ],
    ],
  ],
  [
    'princess-surprise',
    '惊喜',
    assets.surprise,
    [
      [
        'princess-surprise-main',
        '只为我准备的心思',
        assets.surprise,
        [
          ['surprise', '小小惊喜', assets.surprise],
          ['surprise', '见面礼物', assets.favor],
          ['surprise', '隐藏彩蛋', assets.wish],
          ['surprise', '一束花', assets.ritual],
          ['surprise', '甜点投递', assets.ritual],
          ['surprise', '手写卡片', assets.wish],
        ],
      ],
      [
        'princess-surprise-open',
        '公主专属揭晓方式',
        assets.favor,
        [
          ['surprise', '今晚揭晓', assets.favor],
          ['surprise', '周末开启', assets.ritual],
          ['surprise', '下次见面', assets.surprise],
          ['surprise', '语音线索', assets.wish],
          ['surprise', '视频开箱', assets.favor],
          ['surprise', '完全保密', assets.surprise],
        ],
      ],
    ],
  ],
]);

const orderTags = [
  { title: '待回应', iconName: 'wallet', orderNum: 0, tabType: 5, status: 1 },
  { title: '仆人已接旨', iconName: 'deliver', orderNum: 0, tabType: 10, status: 1 },
  { title: '准备中', iconName: 'package', orderNum: 0, tabType: 40, status: 1 },
  { title: '已兑现', iconName: 'comment', orderNum: 0, tabType: 50, status: 1 },
];

const system = createPersonaSystem({
  key: 'princess',
  storeId: 'princess-room',
  orderPrefix: 'PR-0730',
  priceName: '偏爱值',
  assets,
  goods,
  home: {
    eyebrow: 'ROYAL FAVOR',
    title: '公主的偏爱礼册',
    subtitle: '今天也请把我放在第一顺位',
    searchPlaceholder: '挑一件今天想让仆人为我完成的事',
    tabs: [
      { text: '全部', key: 0 },
      { text: '偏爱', key: 1, group: 'favor' },
    { text: '公主要求', key: 2, group: 'wish' },
      { text: '仪式', key: 3, group: 'ritual' },
      { text: '惊喜', key: 4, group: 'surprise' },
    ],
  },
  categories,
  cart: {
    storeName: '公主的愿望礼册',
    title: '今天要认真偏爱公主',
    tagText: '每个愿望都要有回音',
    tag: '已收录',
    description: '三份心意已盖章，等仆人一件件郑重兑现',
    itemIds: ['princess-0', 'princess-2', 'princess-3'],
    discountAmount: '1314',
    joinTime: '2026-07-30T21:05:00.000+0800',
  },
  usercenter: {
    userInfo: {
      avatarUrl: assets.favor,
      nickName: '被仆人偏爱的公主',
      phoneNumber: '',
      gender: 2,
    },
    countsData: [
      { num: 6, name: '偏爱印章', type: 'point' },
      { num: 12, name: '纪念日', type: 'coupon' },
    ],
    orderTagInfos: [
      { orderNum: 1, tabType: 5 },
      { orderNum: 1, tabType: 10 },
      { orderNum: 0, tabType: 40 },
      { orderNum: 1, tabType: 50 },
    ],
    customerServiceInfo: {
      servicePhone: '',
      serviceTimeDuration: '公主的愿望，永远拥有优先级',
    },
  },
  menuData: [
    [
      { title: '今日偏爱', tit: '', url: '', type: 'address' },
      { title: '愿望收藏', tit: '', url: '', type: 'coupon' },
      { title: '专属印章', tit: '', url: '', type: 'point' },
    ],
    [
      { title: '纪念日礼册', tit: '', url: '', type: 'help-center' },
      { title: '写给仆人', tit: '', url: '', type: 'service', icon: 'service' },
    ],
  ],
  orderTags,
  orders: [
    {
      goodId: 'princess-0',
      status: 5,
      statusName: '等待仆人的郑重答复',
      amount: '520',
      createTime: '1785420000000',
      specifications: [{ specTitle: '回应方式', specValue: '郑重接下' }],
    },
    {
      goodId: 'princess-2',
      status: 10,
      statusName: '仆人已接下这份仪式',
      amount: '1314',
      createTime: '1785416400000',
      specifications: [{ specTitle: '准备时间', specValue: '这个周末' }],
    },
    {
      goodId: 'princess-3',
      status: 50,
      statusName: '惊喜已被认真兑现',
      amount: '2024',
      createTime: '1785330000000',
      specifications: [{ specTitle: '惊喜程度', specValue: '认真准备' }],
    },
  ],
});

export const getPrincessAssets = system.getAssets;
export const getPrincessHome = system.getHome;
export const getPrincessGood = system.getGood;
export const getPrincessGoodsList = system.getGoodsList;
export const getPrincessCategoryList = system.getCategoryList;
export const getPrincessCartData = system.getCartData;
export const getPrincessCartLine = system.getCartLine;
export const getPrincessUsercenter = system.getUsercenter;
export const getPrincessMenuData = system.getMenuData;
export const getPrincessOrderTags = system.getOrderTags;
export const getPrincessOrders = system.getOrders;
export const getPrincessOrdersCount = system.getOrdersCount;
