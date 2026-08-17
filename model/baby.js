import { buildBabyCatalog } from './baby-catalog';
import { buildCategoryTree, createPersonaSystem } from './persona-system';

const productBase = '/pages/goods/assets/baby-thumbnails';
const detailProductBase = '/pages/goods/assets/baby-products';

const assets = {
  hero: `${productBase}/baby-hero.webp`,
  cuddle: `${productBase}/now-hug.webp`,
  treat: `${productBase}/little-surprise.webp`,
  call: `${productBase}/ten-minutes.webp`,
  secret: `${productBase}/answer-me.webp`,
  products: productBase,
  detailProducts: detailProductBase,
};

const { goods, categoryDefinitions, tabs } = buildBabyCatalog(assets);
const categories = buildCategoryTree(categoryDefinitions);

const orderTags = [
  { title: '等宝宝回应', iconName: 'wallet', orderNum: 0, tabType: 5, status: 1 },
  { title: '宝宝收到了', iconName: 'deliver', orderNum: 0, tabType: 10, status: 1 },
  { title: '宝宝正在做', iconName: 'package', orderNum: 0, tabType: 40, status: 1 },
  { title: '宝宝做好啦', iconName: 'comment', orderNum: 0, tabType: 50, status: 1 },
];

const system = createPersonaSystem({
  key: 'baby',
  storeId: 'baby-room',
  orderPrefix: 'BB',
  priceName: '软糖值',
  currency: '♡',
  assets,
  goods,
  home: {
    eyebrow: '软软小屋',
    title: '今天想要什么',
    subtitle: '今天宝宝会好好陪你~',
    searchPlaceholder: '搜一搜今天想让宝宝做什么',
    tabs,
  },
  categories,
  cart: {
    storeName: '想要清单',
    title: '今天想让宝宝做这些',
    tagText: '宝宝都会看到',
    tag: '想要',
    description: '想让宝宝做的，先放在这里',
    itemIds: ['baby-now-hug', 'baby-ten-minutes', 'baby-answer-me'],
    discountAmount: '0',
    joinTime: '2026-08-03T21:05:00.000+0800',
  },
  usercenter: {
    userInfo: {
      avatarUrl: assets.cuddle,
      nickName: '宝宝最喜欢的我',
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
      { orderNum: 1, tabType: 40 },
      { orderNum: 1, tabType: 50 },
    ],
    customerServiceInfo: {
      servicePhone: '',
      serviceTimeDuration: '想抱抱的时候，宝宝要优先出现',
    },
  },
  menuData: [
    [
      { title: '现在想要抱抱', tit: '', url: '', type: 'catalog', groupId: 'cuddle' },
      { title: '我的抱抱券', tit: '', url: '', type: 'vouchers' },
      { title: '我们的悄悄话', tit: '', url: '', type: 'catalog', groupId: 'private' },
    ],
    [
      { title: '我们的特别日子', tit: '', url: '', type: 'dates' },
      { title: '叫宝宝来抱抱', tit: '', url: '', type: 'response', icon: 'service' },
    ],
  ],
  orderTags,
  orders: [
    {
      goodId: 'baby-now-hug',
      status: 5,
      statusName: '等宝宝来抱抱',
      amount: '0',
      createTime: '1785776400000',
      specifications: [{ specTitle: '宝宝怎么抱', specValue: '录段语音' }],
    },
    {
      goodId: 'baby-ten-minutes',
      status: 10,
      statusName: '宝宝收到了',
      amount: '0',
      createTime: '1785772800000',
      specifications: [{ specTitle: '宝宝怎么陪', specValue: '打个语音' }],
    },
    {
      goodId: 'baby-bedtime-story',
      status: 40,
      statusName: '宝宝正在做',
      amount: '520',
      createTime: '1785686400000',
      specifications: [{ specTitle: '故事长度', specValue: '十分钟' }],
    },
    {
      goodId: 'baby-mini-love-letter',
      status: 50,
      statusName: '宝宝做好啦',
      amount: '999',
      createTime: '1785600000000',
      specifications: [{ specTitle: '宝宝怎么告诉我', specValue: '手写后拍照' }],
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
