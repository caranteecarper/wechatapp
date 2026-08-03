import { config } from '../../config/index';

/** 获取商品列表 */
function mockFetchGoodCategory(persona = '') {
  const { delay } = require('../_utils/delay');
  const { getCategoryList } = require('../../model/category');
  return delay().then(() => getCategoryList(persona));
}

/** 获取商品列表 */
export function getCategoryList(persona = '') {
  if (config.useMock) {
    return mockFetchGoodCategory(persona);
  }
  return new Promise((resolve) => {
    resolve('real api');
  });
}
