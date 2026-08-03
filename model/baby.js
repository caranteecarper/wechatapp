import { buildCategoryTree, createPersonaSystem } from './persona-system';

const assetBase = '/assets/baby';

const assets = {
  hero: `${assetBase}/baby-hero.jpg`,
  cuddle: `${assetBase}/cuddle.jpg`,
  treat: `${assetBase}/treat.jpg`,
  call: `${assetBase}/call.jpg`,
  secret: `${assetBase}/secret.jpg`,
};

const goods = [
  {
    id: 'baby-0',
    group: 'cuddle',
    title: '先给我一个云朵抱抱',
    image: assets.cuddle,
    price: '000',
    linePrice: '520',
    tags: ['软软抱抱', '马上生效'],
    etitle: '距离有点远，也要先把今天的我抱好。',
    specList: [
      {
        specId: 'cuddle-mode',
        title: '抱抱方式',
        specValueList: [
          { specValueId: 'voice', specValue: '语音抱抱', image: null },
          { specValueId: 'video', specValue: '视频抱抱', image: null },
          { specValueId: 'reserve', specValue: '见面补上', image: null },
        ],
      },
      {
        specId: 'cuddle-time',
        title: '什么时候',
        specValueList: [
          { specValueId: 'now', specValue: '现在就要', image: null },
          { specValueId: 'night', specValue: '睡前抱好', image: null },
        ],
      },
    ],
  },
  {
    id: 'baby-1',
    group: 'soothe',
    title: '认真哄我五分钟',
    image: assets.call,
    price: '520',
    linePrice: '999',
    tags: ['哄哄模式', '不许敷衍'],
    etitle: '今天的小情绪，想被宝宝好好接住。',
    specList: [
      {
        specId: 'soothe-style',
        title: '怎么哄',
        specValueList: [
          { specValueId: 'soft', specValue: '温柔讲道理', image: null },
          { specValueId: 'cute', specValue: '陪我幼稚一下', image: null },
          { specValueId: 'listen', specValue: '只听我说', image: null },
        ],
      },
      {
        specId: 'soothe-mode',
        title: '回应方式',
        specValueList: [
          { specValueId: 'voice', specValue: '打个语音', image: null },
          { specValueId: 'message', specValue: '认真回消息', image: null },
        ],
      },
    ],
  },
  {
    id: 'baby-2',
    group: 'company',
    title: '睡前陪我说一会儿晚安',
    image: assets.call,
    price: '000',
    linePrice: '520',
    tags: ['睡前陪伴', '只听宝宝说'],
    etitle: '今天最后一点时间，想留给我们两个。',
    specList: [
      {
        specId: 'company-time',
        title: '陪伴时长',
        specValueList: [
          { specValueId: 'ten', specValue: '十分钟', image: null },
          { specValueId: 'thirty', specValue: '半小时', image: null },
          { specValueId: 'sleep', specValue: '陪到睡着', image: null },
        ],
      },
      {
        specId: 'company-mode',
        title: '陪伴方式',
        specValueList: [
          { specValueId: 'voice', specValue: '语音', image: null },
          { specValueId: 'video', specValue: '视频', image: null },
        ],
      },
    ],
  },
  {
    id: 'baby-3',
    group: 'treat',
    title: '给我准备一份甜甜补给',
    image: assets.treat,
    price: '1314',
    linePrice: '2024',
    tags: ['甜甜补给', '被照顾'],
    etitle: '不一定要很贵，认真记得我喜欢什么就好。',
    specList: [
      {
        specId: 'treat-kind',
        title: '补给类型',
        specValueList: [
          { specValueId: 'drink', specValue: '甜甜饮料', image: null },
          { specValueId: 'cake', specValue: '小蛋糕', image: null },
          { specValueId: 'choice', specValue: '宝宝来替我选', image: null },
        ],
      },
      {
        specId: 'treat-time',
        title: '送达时间',
        specValueList: [
          { specValueId: 'today', specValue: '今天', image: null },
          { specValueId: 'surprise', specValue: '偷偷安排', image: null },
        ],
      },
    ],
  },
  {
    id: 'baby-4',
    group: 'secret',
    title: '打开今天的宝宝悄悄话',
    image: assets.secret,
    price: '000',
    linePrice: '999',
    tags: ['悄悄话', '仅宝宝可见'],
    etitle: '有些小心思，只想偷偷交给宝宝。',
    specList: [
      {
        specId: 'secret-mode',
        title: '打开方式',
        specValueList: [
          { specValueId: 'message', specValue: '认真读完', image: null },
          { specValueId: 'voice', specValue: '听我说完', image: null },
        ],
      },
      {
        specId: 'secret-reply',
        title: '回应方式',
        specValueList: [
          { specValueId: 'soft', specValue: '温柔回应', image: null },
          { specValueId: 'secret', specValue: '也留一句秘密', image: null },
        ],
      },
    ],
  },
  {
    id: 'baby-5',
    group: 'cuddle',
    title: '把我今天的小委屈接住',
    image: assets.cuddle,
    price: '520',
    linePrice: '1314',
    tags: ['情绪接住', '慢慢听'],
    etitle: '不用马上解决，先站到我这一边。',
    specList: [
      {
        specId: 'feeling-mode',
        title: '先做什么',
        specValueList: [
          { specValueId: 'listen', specValue: '先听我说', image: null },
          { specValueId: 'hug', specValue: '先哄抱抱', image: null },
          { specValueId: 'solve', specValue: '陪我想办法', image: null },
        ],
      },
    ],
  },
];

const categories = buildCategoryTree([
  [
    'baby-cuddle',
    '抱抱',
    assets.cuddle,
    [
      [
        'baby-cuddle-main',
        '先把宝宝抱好',
        assets.cuddle,
        [
          ['cuddle', '云朵抱抱', assets.cuddle],
          ['soothe', '认真哄哄', assets.call],
          ['cuddle', '接住委屈', assets.secret],
          ['company', '语音贴贴', assets.call],
          ['cuddle', '见面补抱', assets.cuddle],
          ['soothe', '站在我这边', assets.secret],
        ],
      ],
      [
        'baby-cuddle-mood',
        '小情绪照顾站',
        assets.secret,
        [
          ['soothe', '先听我说', assets.secret],
          ['soothe', '陪我幼稚', assets.cuddle],
          ['company', '温柔复盘', assets.call],
          ['cuddle', '夸我可爱', assets.treat],
          ['company', '陪我发呆', assets.cuddle],
          ['company', '睡前安抚', assets.call],
        ],
      ],
    ],
  ],
  [
    'baby-company',
    '陪伴',
    assets.call,
    [
      [
        'baby-company-main',
        '异地也要一起',
        assets.call,
        [
          ['company', '睡前晚安', assets.call],
          ['company', '语音散步', assets.call],
          ['company', '云看电影', assets.cuddle],
          ['company', '一起吃饭', assets.treat],
          ['company', '视频贴贴', assets.cuddle],
          ['company', '陪我通勤', assets.call],
        ],
      ],
      [
        'baby-company-time',
        '把时间留给我',
        assets.cuddle,
        [
          ['company', '十分钟专属', assets.call],
          ['company', '半小时电话', assets.call],
          ['company', '周末云约会', assets.treat],
          ['soothe', '听我碎碎念', assets.secret],
          ['company', '一起打游戏', assets.cuddle],
          ['company', '陪到睡着', assets.call],
        ],
      ],
    ],
  ],
  [
    'baby-treat',
    '甜甜',
    assets.treat,
    [
      [
        'baby-treat-main',
        '今天也要甜一点',
        assets.treat,
        [
          ['treat', '奶茶投递', assets.treat],
          ['treat', '小蛋糕', assets.treat],
          ['treat', '甜品时间', assets.treat],
          ['treat', '水果补给', assets.cuddle],
          ['treat', '夜宵申请', assets.treat],
          ['treat', '替我挑选', assets.secret],
        ],
      ],
      [
        'baby-treat-care',
        '认真照顾宝宝',
        assets.cuddle,
        [
          ['treat', '早餐提醒', assets.cuddle],
          ['treat', '认真吃饭', assets.treat],
          ['treat', '喝水监督', assets.call],
          ['treat', '特殊期补给', assets.secret],
          ['treat', '外卖惊喜', assets.treat],
          ['treat', '见面投喂', assets.cuddle],
        ],
      ],
    ],
  ],
  [
    'baby-secret',
    '秘密',
    assets.secret,
    [
      [
        'baby-secret-main',
        '只给宝宝看的心事',
        assets.secret,
        [
          ['secret', '今日心情', assets.secret],
          ['secret', '宝宝悄悄话', assets.secret],
          ['company', '想宝宝的暗号', assets.call],
          ['secret', '一颗小委屈', assets.cuddle],
          ['secret', '偷偷表白', assets.treat],
          ['secret', '只说给宝宝', assets.secret],
        ],
      ],
      [
        'baby-secret-memory',
        '我们的软软收藏',
        assets.cuddle,
        [
          ['secret', '今日照片', assets.cuddle],
          ['secret', '语音胶囊', assets.call],
          ['secret', '纪念日', assets.treat],
          ['company', '见面清单', assets.secret],
          ['company', '想做的事', assets.cuddle],
          ['company', '下次约定', assets.call],
        ],
      ],
    ],
  ],
]);

const orderTags = [
  { title: '等宝宝抱', iconName: 'wallet', orderNum: 0, tabType: 5, status: 1 },
  { title: '宝宝已收到', iconName: 'deliver', orderNum: 0, tabType: 10, status: 1 },
  { title: '哄哄中', iconName: 'package', orderNum: 0, tabType: 40, status: 1 },
  { title: '已抱好', iconName: 'comment', orderNum: 0, tabType: 50, status: 1 },
];

const system = createPersonaSystem({
  key: 'baby',
  storeId: 'baby-room',
  orderPrefix: 'BB-0730',
  priceName: '心动软糖',
  assets,
  goods,
  home: {
    eyebrow: 'SOFT MODE',
    title: '宝宝的软软小屋',
    subtitle: '今天也要被温柔接住',
    searchPlaceholder: '找一找今天想怎么被哄',
    tabs: [
      { text: '全部', key: 0 },
      { text: '抱抱', key: 1, group: 'cuddle' },
      { text: '哄哄', key: 2, group: 'soothe' },
      { text: '陪伴', key: 3, group: 'company' },
      { text: '甜甜', key: 4, group: 'treat' },
      { text: '悄悄话', key: 5, group: 'secret' },
    ],
  },
  categories,
  cart: {
    storeName: '宝宝的软软清单',
    title: '今天先把宝宝照顾好',
    tagText: '每一件都要认真回应',
    tag: '软软心愿',
    description: '已经装好今天想让宝宝做的三件小事',
    itemIds: ['baby-0', 'baby-2', 'baby-4'],
    discountAmount: '520',
    joinTime: '2026-07-30T21:05:00.000+0800',
  },
  usercenter: {
    userInfo: {
      avatarUrl: assets.cuddle,
      nickName: '被宝宝抱好的我',
      phoneNumber: '',
      gender: 2,
    },
    countsData: [
      { num: 5, name: '抱抱券', type: 'point' },
      { num: 8, name: '晚安卡', type: 'coupon' },
    ],
    orderTagInfos: [
      { orderNum: 1, tabType: 5 },
      { orderNum: 1, tabType: 10 },
      { orderNum: 0, tabType: 40 },
      { orderNum: 1, tabType: 50 },
    ],
    customerServiceInfo: {
      servicePhone: '',
      serviceTimeDuration: '想抱抱的时候，宝宝要优先出现',
    },
  },
  menuData: [
    [
      { title: '今天的心情', tit: '', url: '', type: 'address' },
      { title: '抱抱收藏', tit: '', url: '', type: 'coupon' },
      { title: '想宝宝的暗号', tit: '', url: '', type: 'point' },
    ],
    [
      { title: '睡前小话', tit: '', url: '', type: 'help-center' },
      { title: '给宝宝留个抱抱', tit: '', url: '', type: 'service', icon: 'service' },
    ],
  ],
  orderTags,
  orders: [
    {
      goodId: 'baby-0',
      status: 5,
      statusName: '等宝宝来抱好',
      amount: '0',
      createTime: '1785420000000',
      specifications: [{ specTitle: '什么时候', specValue: '现在就要' }],
    },
    {
      goodId: 'baby-2',
      status: 10,
      statusName: '晚安已被宝宝收到',
      amount: '0',
      createTime: '1785416400000',
      specifications: [{ specTitle: '陪伴方式', specValue: '语音' }],
    },
    {
      goodId: 'baby-4',
      status: 50,
      statusName: '宝宝已温柔回应',
      amount: '0',
      createTime: '1785330000000',
      specifications: [{ specTitle: '回应方式', specValue: '温柔回应' }],
    },
  ],
});

export const getBabyAssets = system.getAssets;
export const getBabyHome = system.getHome;
export const getBabyGood = system.getGood;
export const getBabyGoodsList = system.getGoodsList;
export const getBabyCategoryList = system.getCategoryList;
export const getBabyCartData = system.getCartData;
export const getBabyCartLine = system.getCartLine;
export const getBabyUsercenter = system.getUsercenter;
export const getBabyMenuData = system.getMenuData;
export const getBabyOrderTags = system.getOrderTags;
export const getBabyOrders = system.getOrders;
export const getBabyOrdersCount = system.getOrdersCount;
