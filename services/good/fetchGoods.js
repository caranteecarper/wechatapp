import { config } from '../../config/index';

/** 获取商品列表 */
function mockFetchGoodsList(pageIndex = 1, pageSize = 20, persona = '', tabKey = 0) {
  const { delay } = require('../_utils/delay');
  const { getGoodsList } = require('../../model/goods');
  return delay().then(() =>
    getGoodsList(pageIndex, pageSize, persona, tabKey).map((item) => {
      return {
        spuId: item.spuId,
        thumb: item.primaryImage,
        title: item.title,
        price: item.minSalePrice,
        originPrice: item.maxLinePrice,
        tags: item.spuTagList.map((tag) => tag.title),
      };
    }),
  );
}

/** 获取商品列表 */
export function fetchGoodsList(pageIndex = 1, pageSize = 20, persona = '', tabKey = 0) {
  if (config.useMock) {
    return mockFetchGoodsList(pageIndex, pageSize, persona, tabKey);
  }
  return new Promise((resolve) => {
    resolve('real api');
  });
}
