import { buildCategoryTree } from './persona-system';

const assetBase = '/assets/teacher';

const teacherAssets = {
  hero: `${assetBase}/teacher-hero.jpg`,
  report: `${assetBase}/report-card.jpg`,
  reward: `${assetBase}/reward-card.jpg`,
  nightTalk: `${assetBase}/night-talk-card.jpg`,
  task: `${assetBase}/task-card.jpg`,
};

const clone = (data) => JSON.parse(JSON.stringify(data));

const createGood = ({ id, group, title, image, price, linePrice, tags, etitle, specList }) => ({
  spuId: id,
  group,
  title,
  primaryImage: image,
  images: [image],
  minSalePrice: price,
  minLinePrice: linePrice,
  maxSalePrice: price,
  maxLinePrice: linePrice,
  spuStockQuantity: 999,
  soldNum: 1,
  isPutOnSale: 1,
  available: 1,
  limitInfo: [{ text: '' }],
  specList,
  skuList: [
    {
      skuId: `${id}-default`,
      skuImage: image,
      specInfo: specList.map((item) => ({
        specId: item.specId,
        specValueId: item.specValueList[0].specValueId,
        specValue: item.specValueList[0].specValue,
      })),
      priceInfo: [{ priceType: 1, price, priceTypeName: '姐姐指令' }],
      stockInfo: { stockQuantity: 999, safeStockQuantity: 0, soldQuantity: 0 },
    },
  ],
  spuTagList: tags.map((title, index) => ({ id: `${id}-tag-${index}`, title })),
  desc: [image],
  etitle,
});

const teacherGoods = [
  createGood({
    id: 'teacher-0',
    group: 'report',
    title: '检查我今天有没有乖',
    image: teacherAssets.report,
    price: '000',
    linePrice: '520',
    tags: ['小狗表现', '认真看看'],
    etitle: '今天的表现，想先交给小狗认真看看。',
    specList: [
      {
        specId: 'report-mode',
        title: '汇报方式',
        specValueList: [
          { specValueId: 'voice', specValue: '语音汇报', image: null },
          { specValueId: 'video', specValue: '视频汇报', image: null },
          { specValueId: 'text', specValue: '文字汇报', image: null },
        ],
      },
      {
        specId: 'report-time',
        title: '时间',
        specValueList: [
          { specValueId: 'now', specValue: '现在', image: null },
          { specValueId: 'night', specValue: '睡前', image: null },
        ],
      },
    ],
  }),
  createGood({
    id: 'teacher-1',
    group: 'task',
    title: '给我安排一个小任务',
    image: teacherAssets.task,
    price: '520',
    linePrice: '999',
    tags: ['专属任务', '听话一点'],
    etitle: '今天想把一点点安排，认真完成给小狗看。',
    specList: [
      {
        specId: 'task-topic',
        title: '任务方向',
        specValueList: [
          { specValueId: 'care', specValue: '照顾好自己', image: null },
          { specValueId: 'meal', specValue: '认真吃饭', image: null },
          { specValueId: 'rest', specValue: '早点休息', image: null },
        ],
      },
      {
        specId: 'task-deadline',
        title: '完成时间',
        specValueList: [
          { specValueId: 'today', specValue: '今天之内', image: null },
          { specValueId: 'night', specValue: '睡前汇报', image: null },
        ],
      },
    ],
  }),
  createGood({
    id: 'teacher-2',
    group: 'praise',
    title: '表扬我一下',
    image: teacherAssets.reward,
    price: '000',
    linePrice: '520',
    tags: ['表扬', '给点偏爱'],
    etitle: '我会把小狗的每一句肯定，都好好收起来。',
    specList: [
      {
        specId: 'praise-style',
        title: '表扬方式',
        specValueList: [
          { specValueId: 'soft', specValue: '温柔夸夸', image: null },
          { specValueId: 'serious', specValue: '认真表扬', image: null },
          { specValueId: 'private', specValue: '只对我说', image: null },
        ],
      },
    ],
  }),
  createGood({
    id: 'teacher-3',
    group: 'reward',
    title: '给我一个专属奖励',
    image: teacherAssets.reward,
    price: '1314',
    linePrice: '2024',
    tags: ['专属奖励', '仪式感'],
    etitle: '一点点被偏爱的仪式感，也会让我开心很久。',
    specList: [
      {
        specId: 'reward-level',
        title: '奖励方式',
        specValueList: [
          { specValueId: 'message', specValue: '一段夸奖', image: null },
          { specValueId: 'surprise', specValue: '一个惊喜', image: null },
          { specValueId: 'date', specValue: '一次专属时间', image: null },
        ],
      },
    ],
  }),
  createGood({
    id: 'teacher-4',
    group: 'talk',
    title: '陪我复盘今天',
    image: teacherAssets.nightTalk,
    price: '520',
    linePrice: '999',
    tags: ['情绪复盘', '陪我聊聊'],
    etitle: '今天的开心和委屈，都想慢慢讲给小狗听。',
    specList: [
      {
        specId: 'talk-topic',
        title: '想聊什么',
        specValueList: [
          { specValueId: 'mood', specValue: '汇报今天的心情', image: null },
          { specValueId: 'miss', specValue: '说说今天有多想姐姐', image: null },
          { specValueId: 'plan', specValue: '交代明天的计划', image: null },
        ],
      },
    ],
  }),
  createGood({
    id: 'teacher-5',
    group: 'talk',
    title: '今晚和我说说话',
    image: teacherAssets.nightTalk,
    price: '000',
    linePrice: '520',
    tags: ['深夜谈话', '只给我们'],
    etitle: '今晚想把外面的声音关小一点，只听小狗说话。',
    specList: [
      {
        specId: 'talk-time',
        title: '开始时间',
        specValueList: [
          { specValueId: 'after-work', specValue: '忙完以后', image: null },
          { specValueId: 'bedtime', specValue: '睡前', image: null },
        ],
      },
      {
        specId: 'talk-mode',
        title: '说话方式',
        specValueList: [
          { specValueId: 'voice', specValue: '语音', image: null },
          { specValueId: 'video', specValue: '视频', image: null },
        ],
      },
    ],
  }),
];

const teacherHome = {
  eyebrow: 'PRIVATE HOURS',
  title: '姐姐上线',
  subtitle: '今天我会乖一点~',
  searchPlaceholder: '今天让小狗做什么好呢？',
  tabs: [
    { text: '全部', key: 0 },
    { text: '小狗表现', key: 1 },
    { text: '姐姐指令', key: 2 },
    { text: '表现评价', key: 3 },
    { text: '专属奖励', key: 4 },
    { text: '私密谈话', key: 5 },
  ],
  swiper: [teacherAssets.hero],
};

const teacherCategoryList = buildCategoryTree([
  [
    'teacher-report',
    '小狗表现',
    teacherAssets.report,
    [
      [
        'teacher-report-main',
        '先看看我今天',
        teacherAssets.report,
        [
          ['report', '检查小狗表现', teacherAssets.report],
          ['report', '今天有没有乖', teacherAssets.report],
          ['task', '有没有吃好', teacherAssets.task],
          ['task', '有没有早睡', teacherAssets.nightTalk],
          ['talk', '汇报今天的心情', teacherAssets.nightTalk],
          ['report', '睡前汇报', teacherAssets.report],
        ],
      ],
      [
        'teacher-report-feedback',
        '姐姐的反馈',
        teacherAssets.reward,
        [
          ['praise', '表扬我一下', teacherAssets.reward],
          ['report', '指出小问题', teacherAssets.report],
          ['task', '温柔提醒', teacherAssets.task],
          ['report', '给个今日评价', teacherAssets.report],
          ['task', '明日小建议', teacherAssets.task],
          ['talk', '留一句私评', teacherAssets.nightTalk],
        ],
      ],
    ],
  ],
  [
    'teacher-task',
    '专属任务',
    teacherAssets.task,
    [
      [
        'teacher-task-main',
        '今天给小狗的指令',
        teacherAssets.task,
        [
          ['task', '布置小任务', teacherAssets.task],
          ['task', '喝水任务', teacherAssets.report],
          ['task', '吃饭任务', teacherAssets.reward],
          ['task', '早睡任务', teacherAssets.nightTalk],
          ['task', '运动任务', teacherAssets.task],
          ['task', '想姐姐任务', teacherAssets.reward],
        ],
      ],
      [
        'teacher-task-check',
        '完成以后来汇报',
        teacherAssets.report,
        [
          ['report', '文字汇报', teacherAssets.report],
          ['report', '语音汇报', teacherAssets.nightTalk],
          ['report', '视频验收', teacherAssets.report],
          ['task', '限时完成', teacherAssets.task],
          ['report', '完成打卡', teacherAssets.reward],
          ['talk', '申请延期', teacherAssets.nightTalk],
        ],
      ],
    ],
  ],
  [
    'teacher-reward',
    '奖励时刻',
    teacherAssets.reward,
    [
      [
        'teacher-reward-main',
        '完成后的专属奖励',
        teacherAssets.reward,
        [
          ['praise', '温柔夸夸', teacherAssets.reward],
          ['reward', '专属奖励', teacherAssets.reward],
          ['praise', '语音表扬', teacherAssets.nightTalk],
          ['reward', '一次约会', teacherAssets.task],
          ['reward', '惊喜投递', teacherAssets.reward],
          ['reward', '特别许可', teacherAssets.report],
        ],
      ],
      [
        'teacher-reward-extra',
        '偏爱可以再加一点',
        teacherAssets.nightTalk,
        [
          ['praise', '只对我说', teacherAssets.nightTalk],
          ['talk', '留段悄悄话', teacherAssets.nightTalk],
          ['reward', '完整半小时', teacherAssets.task],
          ['reward', '主动抱抱', teacherAssets.reward],
          ['praise', '点名表扬', teacherAssets.report],
          ['reward', '下次兑现', teacherAssets.task],
        ],
      ],
    ],
  ],
  [
    'teacher-talk',
    '深夜谈话',
    teacherAssets.nightTalk,
    [
      [
        'teacher-talk-main',
        '今晚认真说说话',
        teacherAssets.nightTalk,
        [
          ['talk', '今晚说说话', teacherAssets.nightTalk],
          ['talk', '听我碎碎念', teacherAssets.nightTalk],
          ['talk', '汇报今天的心情', teacherAssets.report],
          ['talk', '今天有点想小狗', teacherAssets.reward],
          ['talk', '一颗小委屈', teacherAssets.report],
          ['talk', '交代明天的计划', teacherAssets.task],
        ],
      ],
      [
        'teacher-talk-private',
        '只给我们的私密时间',
        teacherAssets.report,
        [
          ['talk', '只听小狗说', teacherAssets.nightTalk],
          ['talk', '认真回答', teacherAssets.report],
          ['talk', '交换秘密', teacherAssets.reward],
          ['talk', '复盘小争执', teacherAssets.task],
          ['talk', '约定新暗号', teacherAssets.report],
          ['talk', '陪到睡着', teacherAssets.nightTalk],
        ],
      ],
    ],
  ],
]);

const getGoodById = (id) => teacherGoods.find((item) => item.spuId === id) || teacherGoods[0];

const cartLine = (id, specInfo) => {
  const good = getGoodById(id);
  return {
    uid: 'teacher-uid',
    saasId: 'teacher',
    storeId: 'teacher-room',
    storeName: '姐姐的指令',
    spuId: good.spuId,
    skuId: good.skuList[0].skuId,
    isSelected: 1,
    thumb: good.primaryImage,
    title: good.title,
    primaryImage: good.primaryImage,
    quantity: 1,
    stockStatus: true,
    stockQuantity: 999,
    price: good.minSalePrice,
    originPrice: good.maxLinePrice,
    tagPrice: null,
    titlePrefixTags: [{ text: good.spuTagList[0].title }],
    specInfo: specInfo || good.skuList[0].specInfo.map((item) => ({ specTitle: '指令', specValue: item.specValue })),
    joinCartTime: '2026-07-29T21:00:00.000+0800',
    available: 1,
    putOnSale: 1,
    etitle: null,
  };
};

const teacherCartData = {
  isNotEmpty: true,
  storeGoods: [
    {
      storeId: 'teacher-room',
      storeName: '姐姐的指令',
      storeStatus: 1,
      totalDiscountSalePrice: '0',
      promotionGoodsList: [
        {
          title: '今晚的指令',
          promotionCode: 'TEACHER',
          promotionSubCode: 'PRIVATE',
          promotionId: 'teacher-evening',
          tagText: ['只给我们看的指令'],
          promotionStatus: 3,
          tag: '已选',
          description: '今天想让小狗认真完成这三件事',
          doorSillRemain: null,
          isNeedAddOnShop: 0,
          goodsPromotionList: [
            cartLine('teacher-0', [
              { specTitle: '汇报方式', specValue: '语音汇报' },
              { specTitle: '时间', specValue: '睡前' },
            ]),
            cartLine('teacher-3', [{ specTitle: '奖励方式', specValue: '一次专属时间' }]),
            cartLine('teacher-5', [
              { specTitle: '开始时间', specValue: '睡前' },
              { specTitle: '说话方式', specValue: '语音' },
            ]),
          ],
          lastJoinTime: '2026-07-29T21:05:00.000+0800',
        },
      ],
      lastJoinTime: '2026-07-29T21:05:00.000+0800',
      postageFreePromotionVo: {},
    },
  ],
  invalidGoodItems: [],
  isAllSelected: true,
  selectedGoodsCount: 3,
  totalAmount: '1314',
  totalDiscountAmount: '0',
};

const teacherUsercenter = {
  userInfo: {
    avatarUrl: teacherAssets.reward,
    nickName: '小狗的姐姐',
    phoneNumber: '',
    gender: 2,
  },
  countsData: [
    { num: 2, name: '待检查', type: 'point' },
    { num: 3, name: '已奖励', type: 'coupon' },
  ],
  orderTagInfos: [
    { orderNum: 1, tabType: 5 },
    { orderNum: 1, tabType: 10 },
    { orderNum: 0, tabType: 40 },
    { orderNum: 1, tabType: 50 },
  ],
  customerServiceInfo: {
    servicePhone: '',
    serviceTimeDuration: '今晚的指令，只给我们看',
  },
};

const teacherOrders = [
  {
    storeId: 'teacher-room',
    storeName: '姐姐的指令',
    orderId: 'teacher-order-01',
    orderNo: 'TL-0729-01',
    parentOrderNo: 'TL-0729-01',
    orderStatus: 5,
    orderStatusName: '待小狗执行',
    totalAmount: '0',
    paymentAmount: '0',
    freightFee: '0',
    createTime: '1785333600000',
    logisticsVO: { logisticsNo: '' },
    buttonVOs: [],
    orderItemVOs: [
      {
        id: 'teacher-order-01-item',
        spuId: 'teacher-0',
        skuId: 'teacher-0-default',
        goodsName: '检查我今天有没有乖',
        goodsPictureUrl: teacherAssets.report,
        actualPrice: '0',
        buyQuantity: 1,
        specifications: [{ specTitle: '时间', specValue: '睡前' }],
      },
    ],
  },
  {
    storeId: 'teacher-room',
    storeName: '姐姐的指令',
    orderId: 'teacher-order-02',
    orderNo: 'TL-0729-02',
    parentOrderNo: 'TL-0729-02',
    orderStatus: 10,
    orderStatusName: '小狗已领命',
    totalAmount: '520',
    paymentAmount: '520',
    freightFee: '0',
    createTime: '1785330000000',
    logisticsVO: { logisticsNo: '' },
    buttonVOs: [],
    orderItemVOs: [
      {
        id: 'teacher-order-02-item',
        spuId: 'teacher-1',
        skuId: 'teacher-1-default',
        goodsName: '给我安排一个小任务',
        goodsPictureUrl: teacherAssets.task,
        actualPrice: '520',
        buyQuantity: 1,
        specifications: [{ specTitle: '完成时间', specValue: '睡前汇报' }],
      },
    ],
  },
  {
    storeId: 'teacher-room',
    storeName: '姐姐的指令',
    orderId: 'teacher-order-03',
    orderNo: 'TL-0728-01',
    parentOrderNo: 'TL-0728-01',
    orderStatus: 50,
    orderStatusName: '姐姐已验收',
    totalAmount: '1314',
    paymentAmount: '1314',
    freightFee: '0',
    createTime: '1785247200000',
    logisticsVO: { logisticsNo: '' },
    buttonVOs: [],
    orderItemVOs: [
      {
        id: 'teacher-order-03-item',
        spuId: 'teacher-3',
        skuId: 'teacher-3-default',
        goodsName: '给我一个专属奖励',
        goodsPictureUrl: teacherAssets.reward,
        actualPrice: '1314',
        buyQuantity: 1,
        specifications: [{ specTitle: '奖励方式', specValue: '一次专属时间' }],
      },
    ],
  },
];

export function getTeacherAssets() {
  return { ...teacherAssets };
}

export function getTeacherHome() {
  return clone(teacherHome);
}

export function getTeacherGood(id, available = 1) {
  const item = teacherGoods.find((good) => good.spuId === `${id}`) || teacherGoods[0];
  return { ...clone(item), available };
}

export function getTeacherGoodsList(baseID = 0, length = 10, tabKey = 0) {
  const groupByTab = { 1: 'report', 2: 'task', 3: 'praise', 4: 'reward', 5: 'talk' };
  const group = typeof tabKey === 'string' ? tabKey : groupByTab[tabKey];
  const source = group ? teacherGoods.filter((item) => item.group === group) : teacherGoods;
  return clone(source.slice(baseID, baseID + length));
}

export function getTeacherCategoryList() {
  return clone(teacherCategoryList);
}

export function getTeacherCartData() {
  return clone(teacherCartData);
}

export function getTeacherCartLine(id, specInfo) {
  return clone(cartLine(id, specInfo));
}

export function getTeacherUsercenter() {
  return clone(teacherUsercenter);
}

export function getTeacherMenuData() {
  return [
    [
      { title: '小狗表现', tit: '', url: '', type: 'address' },
      { title: '奖励记录', tit: '', url: '', type: 'coupon' },
      { title: '专属暗号', tit: '', url: '', type: 'point' },
    ],
    [
      { title: '私密谈话', tit: '', url: '', type: 'help-center' },
      { title: '给小狗留一句话', tit: '', url: '', type: 'service', icon: 'service' },
    ],
  ];
}

export function getTeacherOrderTags() {
  return [
    { title: '待执行', iconName: 'wallet', orderNum: 0, tabType: 5, status: 1 },
    { title: '小狗已领命', iconName: 'deliver', orderNum: 0, tabType: 10, status: 1 },
    { title: '执行中', iconName: 'package', orderNum: 0, tabType: 40, status: 1 },
    { title: '姐姐已验收', iconName: 'comment', orderNum: 0, tabType: 50, status: 1 },
  ];
}

export function getTeacherOrders(params = {}) {
  const { pageNum = 1, pageSize = 10, orderStatus } = params.parameter || {};
  const filtered =
    orderStatus > -1 ? teacherOrders.filter((order) => order.orderStatus === orderStatus) : teacherOrders;
  return {
    pageNum,
    pageSize,
    totalCount: filtered.length,
    orders: clone(filtered.slice((pageNum - 1) * pageSize, pageNum * pageSize)),
  };
}

export function getTeacherOrdersCount() {
  return [
    { tabType: 5, orderNum: 1 },
    { tabType: 10, orderNum: 1 },
    { tabType: 40, orderNum: 0 },
    { tabType: 50, orderNum: 1 },
  ];
}
