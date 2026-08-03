import { config } from '../../config/index';

/** 获取购物车mock数据 */
function mockFetchCartGroupData(params, persona = '') {
  const { delay } = require('../_utils/delay');
  const { genCartGroupData } = require('../../model/cart');

  return delay().then(() => genCartGroupData(persona));
}

/** 获取购物车数据 */
export function fetchCartGroupData(params, persona = '') {
  if (config.useMock) {
    return mockFetchCartGroupData(params, persona);
  }

  return new Promise((resolve) => {
    resolve('real api');
  });
}
