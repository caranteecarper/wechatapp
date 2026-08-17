const ORDER_STORAGE_VERSION = 1;

const PERSONA_ORDER_COPY = {
  baby: {
    prefix: 'BB',
    storeId: 'baby-room',
    storeName: '想要清单',
    statusNames: {
      5: '等宝宝回应',
      10: '宝宝收到了',
      40: '宝宝正在做',
      50: '宝宝做好啦',
    },
  },
  princess: {
    prefix: 'PR',
    storeId: 'princess-room',
    storeName: '想要清单',
    statusNames: {
      5: '等仆人回应',
      10: '仆人收到了',
      40: '仆人正在准备',
      50: '公主收到了',
    },
  },
  teacher: {
    prefix: 'TL',
    storeId: 'teacher-room',
    storeName: '指令册',
    statusNames: {
      5: '待小狗执行',
      10: '小狗收到了',
      40: '小狗正在做',
      50: '姐姐验收了',
    },
  },
};

const getStorageKey = (persona) => `love.orders.v${ORDER_STORAGE_VERSION}.${persona}`;
const clone = (value) => JSON.parse(JSON.stringify(value));
const hasStorage = () => typeof wx !== 'undefined' && typeof wx.getStorageSync === 'function';
const pad = (value, size = 2) => `${value}`.padStart(size, '0');

const getPersonaCopy = (persona) => PERSONA_ORDER_COPY[persona] || PERSONA_ORDER_COPY.teacher;

const createOrderNo = (persona, now) => {
  const copy = getPersonaCopy(persona);
  const date = new Date(now);
  const datePart = `${date.getFullYear()}${pad(date.getMonth() + 1)}${pad(date.getDate())}`;
  const timePart = `${pad(date.getHours())}${pad(date.getMinutes())}${pad(date.getSeconds())}`;
  const suffix = pad(now % 1000, 3);
  return `${copy.prefix}-${datePart}-${timePart}-${suffix}`;
};

const normalizeSpecifications = (goods) =>
  (goods.specInfo || goods.specifications || []).map((item) => ({
    specTitle: item.specTitle || item.title || '选择',
    specValue: item.specValue || item.value || '',
  }));

const normalizeGoodsItem = (goods, orderNo, index) => {
  const quantity = Math.max(1, Number(goods.quantity || goods.buyQuantity || 1));
  const price = `${goods.price ?? goods.actualPrice ?? goods.settlePrice ?? 0}`;
  return {
    id: `${orderNo}-item-${index + 1}`,
    spuId: `${goods.spuId || ''}`,
    skuId: `${goods.skuId || `${goods.spuId || 'interaction'}-default`}`,
    goodsName: goods.title || goods.goodsName || '我们的小安排',
    goodsPictureUrl: goods.primaryImage || goods.thumb || goods.image || goods.goodsPictureUrl || '',
    originPrice: `${goods.originPrice ?? price}`,
    actualPrice: price,
    buyQuantity: quantity,
    specifications: normalizeSpecifications(goods),
    tagText: goods.titlePrefixTags?.[0]?.text || null,
  };
};

export function getPersonaOrderStatusName(persona, status) {
  const copy = getPersonaCopy(persona);
  return copy.statusNames[Number(status)] || copy.statusNames[5];
}

export function readPersonaOrders(persona) {
  if (!hasStorage()) return [];
  const records = wx.getStorageSync(getStorageKey(persona));
  return Array.isArray(records) ? clone(records) : [];
}

export function writePersonaOrders(persona, records) {
  if (!hasStorage()) return;
  wx.setStorageSync(getStorageKey(persona), clone(Array.isArray(records) ? records : []));
}

export function createPersonaOrder(persona, goodsList, note = '') {
  if (!Array.isArray(goodsList) || goodsList.length === 0) return null;

  const now = Date.now();
  const copy = getPersonaCopy(persona);
  const orderNo = createOrderNo(persona, now);
  const orderItems = goodsList.map((goods, index) => normalizeGoodsItem(goods, orderNo, index));
  const totalAmount = orderItems.reduce(
    (total, item) => total + Number(item.actualPrice || 0) * Number(item.buyQuantity || 0),
    0,
  );
  const firstGoods = goodsList[0] || {};
  const order = {
    storeId: firstGoods.storeId || copy.storeId,
    storeName: firstGoods.storeName || copy.storeName,
    orderId: `${persona}-local-${now}`,
    orderNo,
    parentOrderNo: orderNo,
    orderStatus: 10,
    orderStatusName: getPersonaOrderStatusName(persona, 10),
    totalAmount: `${totalAmount}`,
    paymentAmount: `${totalAmount}`,
    freightFee: '0',
    createTime: `${now}`,
    updateTime: `${now}`,
    remark: `${note || ''}`.trim(),
    logisticsVO: { logisticsNo: '' },
    buttonVOs: [],
    orderItemVOs: orderItems,
    isLocalRecord: true,
  };

  const records = readPersonaOrders(persona);
  records.unshift(order);
  writePersonaOrders(persona, records);
  return clone(order);
}

export function updatePersonaOrder(persona, orderNo, patch) {
  const records = readPersonaOrders(persona);
  const index = records.findIndex((item) => item.orderNo === orderNo);
  if (index < 0) return null;

  const nextPatch = typeof patch === 'function' ? patch(clone(records[index])) : patch;
  const nextOrder = {
    ...records[index],
    ...(nextPatch || {}),
    updateTime: `${Date.now()}`,
  };
  if (nextPatch?.orderStatus && !nextPatch.orderStatusName) {
    nextOrder.orderStatusName = getPersonaOrderStatusName(persona, nextPatch.orderStatus);
  }
  records[index] = nextOrder;
  writePersonaOrders(persona, records);
  return clone(nextOrder);
}

export function completePersonaOrder(persona, orderNo) {
  return updatePersonaOrder(persona, orderNo, { orderStatus: 50 });
}

export function mergePersonaOrders(persona, seedOrders = []) {
  const merged = [];
  const knownOrderNos = new Set();
  readPersonaOrders(persona)
    .concat(Array.isArray(seedOrders) ? seedOrders : [])
    .forEach((order) => {
      if (!order || !order.orderNo || knownOrderNos.has(order.orderNo)) return;
      knownOrderNos.add(order.orderNo);
      merged.push(order);
    });
  return merged.sort((left, right) => Number(right.createTime || 0) - Number(left.createTime || 0));
}
