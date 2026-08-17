/* eslint-disable no-param-reassign */
import { config } from '../../../config/index';

/** 获取互动清单 */
function mockFetchGoodsList(params) {
  const { delay } = require('../../../services/_utils/delay');
  const { getSearchResult } = require('../model/search');

  const data = getSearchResult(params);

  if (data.spuList.length) {
    data.spuList.forEach((item) => {
      item.spuId = item.spuId;
      item.thumb = item.primaryImage;
      item.title = item.title;
      item.price = item.minSalePrice;
      item.originPrice = item.maxLinePrice;
      item.desc = item.etitle || '';
      item.currency = item.currency || '¥';
      if (item.spuTagList) {
        item.tags = item.spuTagList.map((tag) => tag.title);
      } else {
        item.tags = [];
      }
    });
  }
  return delay().then(() => data);
}

export function fetchGoodsList(params) {
  if (config.useMock) {
    return mockFetchGoodsList(params);
  }
  return new Promise((resolve) => {
    resolve('real api');
  });
}
