import { teacherAssets, teacherCategoryList, teacherGoodsDefinitions, teacherHome } from './teacher-catalog';

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
  spuTagList: tags.map((tag, index) => ({ id: `${id}-tag-${index}`, title: tag })),
  desc: [image],
  etitle,
});

const teacherGoods = teacherGoodsDefinitions.map(createGood);
const getGoodById = (id) => teacherGoods.find((item) => item.spuId === `${id}`) || teacherGoods[0];

const cartLine = (id, specInfo) => {
  const good = getGoodById(id);
  return {
    uid: 'teacher-uid',
    saasId: 'teacher',
    storeId: 'teacher-room',
    storeName: '姐姐的指令册',
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
    specInfo:
      specInfo ||
      good.specList.map((item) => ({
        specTitle: item.title,
        specValue: item.specValueList[0].specValue,
      })),
    joinCartTime: '2026-08-03T21:00:00.000+0800',
    available: 1,
    putOnSale: 1,
    etitle: good.etitle,
  };
};

const initialCartLines = [
  cartLine('teacher-check-in'),
  cartLine('teacher-tonight-belongs'),
  cartLine('teacher-voice-reward'),
];

const teacherCartData = {
  isNotEmpty: true,
  storeGoods: [
    {
      storeId: 'teacher-room',
      storeName: '姐姐的指令册',
      storeStatus: 1,
      totalDiscountSalePrice: '0',
      promotionGoodsList: [
        {
          title: '姐姐的专属安排',
          promotionCode: 'TEACHER',
          promotionSubCode: 'PRIVATE',
          promotionId: 'teacher-private',
          tagText: ['只给姐姐和小狗看的安排'],
          promotionStatus: 3,
          tag: '私密',
          description: '今天先让小狗做好这三件事',
          doorSillRemain: null,
          isNeedAddOnShop: 0,
          goodsPromotionList: initialCartLines,
          lastJoinTime: '2026-08-03T21:05:00.000+0800',
        },
      ],
      lastJoinTime: '2026-08-03T21:05:00.000+0800',
      postageFreePromotionVo: {},
    },
  ],
  invalidGoodItems: [],
  isAllSelected: true,
  selectedGoodsCount: initialCartLines.length,
  totalAmount: `${initialCartLines.reduce((total, item) => total + Number(item.price), 0)}`,
  totalDiscountAmount: '0',
};

const teacherUsercenter = {
  userInfo: {
    avatarUrl: teacherAssets.avatar,
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
    serviceTimeDuration: '姐姐的安排，只给我们看',
  },
};

const createOrder = ({ id, goodId, status, statusName, createTime, specifications }) => {
  const good = getGoodById(goodId);
  return {
    storeId: 'teacher-room',
    storeName: '姐姐的指令册',
    orderId: `teacher-order-${id}`,
    orderNo: `TL-0803-${id}`,
    parentOrderNo: `TL-0803-${id}`,
    orderStatus: status,
    orderStatusName: statusName,
    totalAmount: good.minSalePrice,
    paymentAmount: good.minSalePrice,
    freightFee: '0',
    createTime,
    logisticsVO: { logisticsNo: '' },
    buttonVOs: [],
    orderItemVOs: [
      {
        id: `teacher-order-${id}-item`,
        spuId: good.spuId,
        skuId: good.skuList[0].skuId,
        goodsName: good.title,
        goodsPictureUrl: good.primaryImage,
        actualPrice: good.minSalePrice,
        buyQuantity: 1,
        specifications:
          specifications ||
          good.specList.map((item) => ({
            specTitle: item.title,
            specValue: item.specValueList[0].specValue,
          })),
      },
    ],
  };
};

const teacherOrders = [
  createOrder({
    id: '01',
    goodId: 'teacher-report-mood',
    status: 5,
    statusName: '待小狗执行',
    createTime: '1785762000000',
  }),
  createOrder({
    id: '02',
    goodId: 'teacher-whose-puppy',
    status: 10,
    statusName: '小狗已领命',
    createTime: '1785758400000',
  }),
  createOrder({
    id: '03',
    goodId: 'teacher-sister-praise',
    status: 50,
    statusName: '姐姐已验收',
    createTime: '1785672000000',
  }),
];

export function getTeacherAssets() {
  return clone(teacherAssets);
}

export function getTeacherHome() {
  return clone(teacherHome);
}

export function getTeacherGood(id, available = 1) {
  return { ...clone(getGoodById(id)), available };
}

export function getTeacherGoodsList(baseID = 0, length = 10, tabKey = 0) {
  const tab = teacherHome.tabs.find((item) => `${item.key}` === `${tabKey}`);
  const requestedGroup = tab?.group || (typeof tabKey === 'string' && !/^\d+$/.test(tabKey) ? tabKey : '');
  const source = requestedGroup
    ? teacherGoods.filter((item) => item.group === requestedGroup || item.spuId === requestedGroup)
    : teacherGoods;
  const start = baseID > 0 ? baseID * length : 0;
  const pageLength = !requestedGroup && Number(baseID) === 0 && length === 30 ? source.length : length;
  return clone(source.slice(start, start + pageLength));
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
      { title: '专属奖励', tit: '', url: '', type: 'coupon' },
      { title: '姐姐问话', tit: '', url: '', type: 'point' },
    ],
    [
      { title: '姐姐管教', tit: '', url: '', type: 'help-center' },
      { title: '给小狗留一句话', tit: '', url: '', type: 'service', icon: 'service' },
    ],
  ];
}

export function getTeacherOrderTags() {
  return [
    { title: '待小狗执行', iconName: 'wallet', orderNum: 0, tabType: 5, status: 1 },
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
  return getTeacherOrderTags().map((item) => ({
    tabType: item.tabType,
    orderNum: teacherOrders.filter((order) => order.orderStatus === item.tabType).length,
  }));
}
