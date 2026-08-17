import { config } from '../../../config/index';
import { mockIp, mockReqId } from '../../../utils/mock';

/** 获取提交页数据 */
function mockFetchSettleDetail(params, persona = '') {
  const { delay } = require('../../../services/_utils/delay');
  const { genSettleDetail } = require('../model/orderConfirm');

  return delay().then(() => genSettleDetail(params, persona));
}

/** 提交互动记录 */
function mockDispatchCommitPay() {
  const { delay } = require('../../../services/_utils/delay');

  return delay().then(() => ({
    data: {
      isSuccess: true,
      tradeNo: '350930961469409099',
      payInfo: '{}',
      code: null,
      transactionId: 'E-200915180100299000',
      msg: null,
      interactId: '15145',
      channel: 'wechat',
      limitGoodsList: null,
    },
    code: 'Success',
    msg: null,
    requestId: mockReqId(),
    clientIp: mockIp(),
    rt: 891,
    success: true,
  }));
}

export function fetchSettleDetail(params, persona = '') {
  if (config.useMock) {
    return mockFetchSettleDetail(params, persona);
  }

  return new Promise((resolve) => {
    resolve('real api');
  });
}

export function dispatchCommitPay(params) {
  if (config.useMock) {
    return mockDispatchCommitPay(params);
  }

  return new Promise((resolve) => {
    resolve('real api');
  });
}

export function dispatchSupplementInvoice() {
  if (config.useMock) {
    const { delay } = require('../../../services/_utils/delay');
    return delay();
  }

  return new Promise((resolve) => {
    resolve('real api');
  });
}
