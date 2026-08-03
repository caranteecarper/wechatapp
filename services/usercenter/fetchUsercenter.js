import { config } from '../../config/index';

/** 获取个人中心信息 */
function mockFetchUserCenter(persona = '') {
  const { delay } = require('../_utils/delay');
  const { genUsercenter } = require('../../model/usercenter');
  return delay(200).then(() => genUsercenter(persona));
}

/** 获取个人中心信息 */
export function fetchUserCenter(persona = '') {
  if (config.useMock) {
    return mockFetchUserCenter(persona);
  }
  return new Promise((resolve) => {
    resolve('real api');
  });
}
