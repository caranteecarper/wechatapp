import { config } from '../../../config/index';

/** 获取互动详情 */
function mockFetchGood(ID = 0, persona = '') {
  const { delay } = require('../../../services/_utils/delay');
  const { genGood } = require('../../../model/good');
  return delay().then(() => genGood(ID, 1, persona));
}

export function fetchGood(ID = 0, persona = '') {
  if (config.useMock) {
    return mockFetchGood(ID, persona);
  }
  return new Promise((resolve) => {
    resolve('real api');
  });
}
