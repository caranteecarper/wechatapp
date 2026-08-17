import { config } from '../../config/index';
import { hasPersonaContent } from '../../model/persona-content';
import { fetchCloudRecords, getCloudSession } from '../../utils/cloud-sync';
import { mergePersonaOrders } from '../../utils/persona-orders';

const getMergedPersonaOrders = async (persona) => {
  const { genOrders } = require('../../model/order/orderList');
  const response = genOrders(
    {
      parameter: {
        pageNum: 1,
        pageSize: 1000,
      },
    },
    persona,
  );
  const cloudSession = await getCloudSession();
  const cloudOrders = cloudSession.connected ? await fetchCloudRecords(persona) : [];
  return {
    response,
    orders: mergePersonaOrders(
      persona,
      cloudSession.connected ? [] : response.data?.orders || [],
      cloudOrders,
    ),
  };
};

const buildPersonaOrdersResponse = async (params, persona) => {
  const { response, orders } = await getMergedPersonaOrders(persona);
  const { pageNum = 1, pageSize = 10, orderStatus } = params?.parameter || {};
  const filtered = orderStatus > -1 ? orders.filter((order) => order.orderStatus === orderStatus) : orders;
  return {
    ...response,
    data: {
      ...response.data,
      pageNum,
      pageSize,
      totalCount: filtered.length,
      orders: filtered.slice((pageNum - 1) * pageSize, pageNum * pageSize),
    },
  };
};

const buildPersonaOrdersCountResponse = async (persona) => {
  const { genOrdersCount } = require('../../model/order/orderList');
  const response = genOrdersCount(persona);
  const { orders } = await getMergedPersonaOrders(persona);
  return {
    ...response,
    data: [5, 10, 40, 50].map((tabType) => ({
      tabType,
      orderNum: orders.filter((order) => Number(order.orderStatus) === tabType).length,
    })),
  };
};

/** 获取订单列表mock数据 */
function mockFetchOrders(params, persona = '') {
  const { delay } = require('../_utils/delay');
  const { genOrders } = require('../../model/order/orderList');

  return delay(200).then(() => {
    if (hasPersonaContent(persona)) return buildPersonaOrdersResponse(params, persona);
    return genOrders(params, persona);
  });
}

/** 获取订单列表数据 */
export function fetchOrders(params, persona = '') {
  if (config.useMock) {
    return mockFetchOrders(params, persona);
  }

  return new Promise((resolve) => {
    resolve('real api');
  });
}

/** 获取订单列表mock数据 */
function mockFetchOrdersCount(params, persona = '') {
  const { delay } = require('../_utils/delay');
  const { genOrdersCount } = require('../../model/order/orderList');

  return delay().then(() => {
    if (hasPersonaContent(persona)) return buildPersonaOrdersCountResponse(persona);
    return genOrdersCount(persona);
  });
}

/** 获取订单列表统计 */
export function fetchOrdersCount(params, persona = '') {
  if (config.useMock) {
    return mockFetchOrdersCount(params, persona);
  }

  return new Promise((resolve) => {
    resolve('real api');
  });
}
