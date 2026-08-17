import { getPersonaContent } from './persona-content';

const wishImageBase = 'https://tdesign.gtimg.com/miniprogram/template/retail/goods';

const wishDetails = [
  'https://tdesign.gtimg.com/miniprogram/template/retail/goods/details-1.png',
];

const loveGoods = [
  {
    spuId: '0',
    title: '今晚睡前陪我聊天 30 分钟',
    primaryImage: `${wishImageBase}/muy-3a.png`,
    images: [`${wishImageBase}/muy-3a.png`],
    minSalePrice: '000',
    minLinePrice: '520',
    maxSalePrice: '000',
    maxLinePrice: '520',
    spuStockQuantity: 999,
    soldNum: 520,
    isPutOnSale: 1,
    available: 1,
    specList: [
      {
        specId: 'mood',
        title: '语气',
        specValueList: [
          { specValueId: 'soft', specValue: '温柔一点', image: null },
          { specValueId: 'cute', specValue: '可爱一点', image: null },
          { specValueId: 'clingy', specValue: '黏人一点', image: null },
        ],
      },
      {
        specId: 'time',
        title: '什么时候兑现',
        specValueList: [
          { specValueId: 'now', specValue: '现在就要', image: null },
          { specValueId: 'night', specValue: '睡前', image: null },
        ],
      },
    ],
    skuList: [
      {
        skuId: 'wish-0-0',
        skuImage: `${wishImageBase}/muy-3a.png`,
        specInfo: [
          { specId: 'mood', specValueId: 'soft', specValue: '温柔一点' },
          { specId: 'time', specValueId: 'night', specValue: '睡前' },
        ],
        priceInfo: [{ priceType: 1, price: '000', priceTypeName: '心动值' }],
        stockInfo: { stockQuantity: 999, safeStockQuantity: 0, soldQuantity: 0 },
      },
    ],
    spuTagList: [{ id: 'tag-0', title: '陪伴' }, { id: 'tag-1', title: '异地必备' }],
    desc: wishDetails,
    etitle: '今天也要听到你的声音。',
  },
  {
    spuId: '1',
    title: '给我点一杯甜甜的奶茶',
    primaryImage: `${wishImageBase}/gh-1a.png`,
    images: [`${wishImageBase}/gh-1a.png`, `${wishImageBase}/gh-1b.png`],
    minSalePrice: '1800',
    minLinePrice: '2600',
    maxSalePrice: '2800',
    maxLinePrice: '3600',
    spuStockQuantity: 99,
    soldNum: 1314,
    isPutOnSale: 1,
    available: 1,
    specList: [
      {
        specId: 'sweet',
        title: '甜度',
        specValueList: [
          { specValueId: '30', specValue: '三分糖', image: null },
          { specValueId: '50', specValue: '五分糖', image: null },
          { specValueId: '70', specValue: '七分糖', image: null },
        ],
      },
      {
        specId: 'ice',
        title: '温度',
        specValueList: [
          { specValueId: 'hot', specValue: '热热的', image: null },
          { specValueId: 'ice', specValue: '少冰', image: null },
        ],
      },
    ],
    skuList: [
      {
        skuId: 'wish-1-0',
        skuImage: `${wishImageBase}/gh-1a.png`,
        specInfo: [
          { specId: 'sweet', specValueId: '50', specValue: '五分糖' },
          { specId: 'ice', specValueId: 'hot', specValue: '热热的' },
        ],
        priceInfo: [{ priceType: 1, price: '1800', priceTypeName: '投喂预算' }],
        stockInfo: { stockQuantity: 99, safeStockQuantity: 0, soldQuantity: 0 },
      },
    ],
    spuTagList: [{ id: 'tag-2', title: '投喂' }, { id: 'tag-3', title: '甜甜的' }],
    desc: wishDetails,
    etitle: '想让你隔着城市照顾我一下。',
  },
  {
    spuId: '2',
    title: '今天想要一个大抱抱',
    primaryImage: `${wishImageBase}/nz-09a.png`,
    images: [`${wishImageBase}/nz-09a.png`, `${wishImageBase}/nz-09b.png`],
    minSalePrice: '000',
    minLinePrice: '520',
    maxSalePrice: '000',
    maxLinePrice: '520',
    spuStockQuantity: 999,
    soldNum: 999,
    isPutOnSale: 1,
    available: 1,
    specList: [
      {
        specId: 'hug',
        title: '抱抱类型',
        specValueList: [
          { specValueId: 'voice', specValue: '语音抱抱', image: null },
          { specValueId: 'video', specValue: '视频抱抱', image: null },
          { specValueId: 'promise', specValue: '见面补上', image: null },
        ],
      },
    ],
    skuList: [
      {
        skuId: 'wish-2-0',
        skuImage: `${wishImageBase}/nz-09a.png`,
        specInfo: [{ specId: 'hug', specValueId: 'voice', specValue: '语音抱抱' }],
        priceInfo: [{ priceType: 1, price: '000', priceTypeName: '心动值' }],
        stockInfo: { stockQuantity: 999, safeStockQuantity: 0, soldQuantity: 0 },
      },
    ],
    spuTagList: [{ id: 'tag-4', title: '撒娇' }, { id: 'tag-5', title: '抱抱' }],
    desc: wishDetails,
    etitle: '异地也可以先把抱抱预定好。',
  },
  {
    spuId: '3',
    title: '安排一场我们的云约会',
    primaryImage: `${wishImageBase}/dz-3a.png`,
    images: [`${wishImageBase}/dz-3a.png`, `${wishImageBase}/dz-3b.png`],
    minSalePrice: '520',
    minLinePrice: '1314',
    maxSalePrice: '520',
    maxLinePrice: '1314',
    spuStockQuantity: 52,
    soldNum: 77,
    isPutOnSale: 1,
    available: 1,
    specList: [
      {
        specId: 'date',
        title: '约会内容',
        specValueList: [
          { specValueId: 'movie', specValue: '一起看电影', image: null },
          { specValueId: 'game', specValue: '一起打游戏', image: null },
          { specValueId: 'walk', specValue: '语音散步', image: null },
        ],
      },
    ],
    skuList: [
      {
        skuId: 'wish-3-0',
        skuImage: `${wishImageBase}/dz-3a.png`,
        specInfo: [{ specId: 'date', specValueId: 'movie', specValue: '一起看电影' }],
        priceInfo: [{ priceType: 1, price: '520', priceTypeName: '仪式感' }],
        stockInfo: { stockQuantity: 52, safeStockQuantity: 0, soldQuantity: 0 },
      },
    ],
    spuTagList: [{ id: 'tag-6', title: '约会' }, { id: 'tag-7', title: '仪式感' }],
    desc: wishDetails,
    etitle: '今晚把距离暂时关小一点。',
  },
  {
    spuId: '4',
    title: '给我写一封悄悄话',
    primaryImage: `${wishImageBase}/mz-20a1.png`,
    images: [`${wishImageBase}/mz-20a1.png`],
    minSalePrice: '000',
    minLinePrice: '999',
    maxSalePrice: '000',
    maxLinePrice: '999',
    spuStockQuantity: 999,
    soldNum: 88,
    isPutOnSale: 1,
    available: 1,
    specList: [
      {
        specId: 'letter',
        title: '信的长度',
        specValueList: [
          { specValueId: 'short', specValue: '一句就好', image: null },
          { specValueId: 'long', specValue: '写长一点', image: null },
        ],
      },
    ],
    skuList: [
      {
        skuId: 'wish-4-0',
        skuImage: `${wishImageBase}/mz-20a1.png`,
        specInfo: [{ specId: 'letter', specValueId: 'long', specValue: '写长一点' }],
        priceInfo: [{ priceType: 1, price: '000', priceTypeName: '心动值' }],
        stockInfo: { stockQuantity: 999, safeStockQuantity: 0, soldQuantity: 0 },
      },
    ],
    spuTagList: [{ id: 'tag-8', title: '私密' }, { id: 'tag-9', title: '悄悄话' }],
    desc: wishDetails,
    etitle: '有些话，只放在我们的小屋里。',
  },
  {
    spuId: '5',
    title: '纪念日惊喜提醒',
    primaryImage: `${wishImageBase}/mz-12b.png`,
    images: [`${wishImageBase}/mz-12b.png`],
    minSalePrice: '1314',
    minLinePrice: '2024',
    maxSalePrice: '1314',
    maxLinePrice: '2024',
    spuStockQuantity: 365,
    soldNum: 100,
    isPutOnSale: 1,
    available: 1,
    specList: [
      {
        specId: 'surprise',
        title: '惊喜等级',
        specValueList: [
          { specValueId: 'tiny', specValue: '小小仪式', image: null },
          { specValueId: 'big', specValue: '用心准备', image: null },
        ],
      },
    ],
    skuList: [
      {
        skuId: 'wish-5-0',
        skuImage: `${wishImageBase}/mz-12b.png`,
        specInfo: [{ specId: 'surprise', specValueId: 'tiny', specValue: '小小仪式' }],
        priceInfo: [{ priceType: 1, price: '1314', priceTypeName: '仪式感' }],
        stockInfo: { stockQuantity: 365, safeStockQuantity: 0, soldQuantity: 0 },
      },
    ],
    spuTagList: [{ id: 'tag-10', title: '纪念日' }, { id: 'tag-11', title: '惊喜' }],
    desc: wishDetails,
    etitle: '重要的日子要记得。',
  },
];

export function genGood(id, available = 1, persona = '') {
  const system = getPersonaContent(persona);
  if (system) {
    return system.getGood(id, available);
  }
  const item = loveGoods.find((good) => good.spuId === `${id}`) || loveGoods[id % loveGoods.length];
  return {
    ...item,
    available,
    desc: item.desc || wishDetails,
    images: item.images || [item.primaryImage],
  };
}

export function genGoodsByPersona(baseID = 0, length = 10, persona = '', tabKey = 0) {
  const system = getPersonaContent(persona);
  if (system) {
    return system.getGoodsList(baseID, length, tabKey);
  }
  return new Array(length).fill(0).map((_, idx) => genGood(idx + baseID));
}
