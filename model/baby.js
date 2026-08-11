import { buildBabyCatalog } from './baby-catalog';
import { buildCategoryTree, createPersonaSystem } from './persona-system';

const assetBase = '/assets/baby';

const assets = {
  hero: `${assetBase}/baby-hero.jpg`,
  cuddle: `${assetBase}/cuddle.jpg`,
  treat: `${assetBase}/treat.jpg`,
  call: `${assetBase}/call.jpg`,
  secret: `${assetBase}/secret.jpg`,
};

const { goods, categoryDefinitions, tabs } = buildBabyCatalog(assets);
const categories = buildCategoryTree(categoryDefinitions);

const orderTags = [
  { title: '等宝宝回应', iconName: 'wallet', orderNum: 0, tabType: 5, status: 1 },
  { title: '宝宝已收到', iconName: 'deliver', orderNum: 0, tabType: 10, status: 1 },
  { title: '正在抱好', iconName: 'package', orderNum: 0, tabType: 40, status: 1 },
  { title: '已经抱好', iconName: 'comment', orderNum: 0, tabType: 50, status: 1 },
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
    eyebrow: 'SOFT MODE',
    title: '宝宝的软软小屋',
    subtitle: '今天想让宝宝怎么陪我呀',
    searchPlaceholder: '搜一搜今天想让宝宝做什么',
    tabs,
  },
  categories,
  cart: {
    storeName: '宝宝的软软清单',
    title: '今天想让宝宝做这些',
    tagText: '每一件都要认真回应',
    tag: '软软心愿',
    description: '这里装着准备告诉宝宝的小心愿',
    itemIds: ['baby-now-hug', 'baby-ten-minutes', 'baby-answer-me'],
    discountAmount: '0',
    joinTime: '2026-08-03T21:05:00.000+0800',
  },
  usercenter: {
    userInfo: {
      avatarUrl: assets.cuddle,
      nickName: '想被宝宝抱好的我',
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
      goodId: 'baby-now-hug',
      status: 5,
      statusName: '等宝宝来抱抱',
      amount: '0',
      createTime: '1785776400000',
      specifications: [{ specTitle: '完成方式', specValue: '语音抱抱' }],
    },
    {
      goodId: 'baby-ten-minutes',
      status: 10,
      statusName: '宝宝已经收到',
      amount: '0',
      createTime: '1785772800000',
      specifications: [{ specTitle: '完成方式', specValue: '语音通话' }],
    },
    {
      goodId: 'baby-bedtime-story',
      status: 40,
      statusName: '正在认真抱好',
      amount: '520',
      createTime: '1785686400000',
      specifications: [{ specTitle: '故事长度', specValue: '十分钟' }],
    },
    {
      goodId: 'baby-mini-love-letter',
      status: 50,
      statusName: '已经甜甜收好',
      amount: '999',
      createTime: '1785600000000',
      specifications: [{ specTitle: '完成方式', specValue: '手写照片' }],
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
