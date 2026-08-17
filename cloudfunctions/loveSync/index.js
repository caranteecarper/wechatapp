const cloud = require('wx-server-sdk');

cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV });

const db = cloud.database();
const PAIRS = 'love_pairs';
const RECORDS = 'love_records';
const FEEDBACK = 'love_feedback';
const VALID_ROLES = ['requester', 'responder'];
const VALID_PERSONAS = ['baby', 'princess', 'teacher'];
const STATUS_NAMES = {
  baby: { 5: '等宝宝回应', 10: '宝宝收到了', 40: '宝宝正在做', 50: '宝宝做好啦' },
  princess: { 5: '等仆人回应', 10: '仆人收到了', 40: '仆人正在准备', 50: '公主收到了' },
  teacher: { 5: '待小狗执行', 10: '小狗收到了', 40: '小狗正在做', 50: '姐姐验收了' },
};

let collectionsReady = false;

const success = (data) => ({ ok: true, data });
const fail = (code, message) => ({ ok: false, code, message });
const makeError = (code, message) => Object.assign(new Error(message), { code });
const cleanText = (value, length = 300) => `${value || ''}`.trim().slice(0, length);
const clone = (value) => JSON.parse(JSON.stringify(value));

async function ensureCollections() {
  if (collectionsReady) return;
  if (typeof db.createCollection === 'function') {
    for (const name of [PAIRS, RECORDS, FEEDBACK]) {
      try {
        await db.createCollection(name);
      } catch (error) {
        // Existing collections report an error; they are ready to use.
      }
    }
  }
  collectionsReady = true;
}

async function findPairByMember(openid) {
  const pairs = db.collection(PAIRS);
  const requester = await pairs.where({ requesterOpenid: openid }).limit(1).get();
  if (requester.data[0]) return requester.data[0];
  const responder = await pairs.where({ responderOpenid: openid }).limit(1).get();
  return responder.data[0] || null;
}

const getRole = (pair, openid) => {
  if (pair?.requesterOpenid === openid) return 'requester';
  if (pair?.responderOpenid === openid) return 'responder';
  return '';
};

const publicSession = (pair, openid) => ({
  pairId: pair?._id || '',
  inviteCode: pair?.inviteCode || '',
  role: getRole(pair, openid),
  connected: Boolean(pair?.requesterOpenid && pair?.responderOpenid),
  counterpartConnected: Boolean(
    getRole(pair, openid) === 'requester' ? pair?.responderOpenid : pair?.requesterOpenid,
  ),
});

async function requirePair(openid, role = '', requireConnected = true) {
  const pair = await findPairByMember(openid);
  if (!pair) throw makeError('PAIR_REQUIRED', '请先建立两个人的连接');
  const currentRole = getRole(pair, openid);
  if (role && currentRole !== role) throw makeError('FORBIDDEN_ROLE', '当前身份不能进行这个操作');
  if (requireConnected && !(pair.requesterOpenid && pair.responderOpenid)) {
    throw makeError('PAIR_NOT_CONNECTED', '等另一个人加入以后再试');
  }
  return { pair, role: currentRole };
}

const inviteAlphabet = '23456789ABCDEFGHJKLMNPQRSTUVWXYZ';
const randomInviteCode = () =>
  Array.from({ length: 6 }, () => inviteAlphabet[Math.floor(Math.random() * inviteAlphabet.length)]).join('');

async function createUniqueInviteCode() {
  for (let attempt = 0; attempt < 8; attempt += 1) {
    const inviteCode = randomInviteCode();
    const result = await db.collection(PAIRS).where({ inviteCode }).limit(1).get();
    if (!result.data.length) return inviteCode;
  }
  throw makeError('INVITE_CODE_FAILED', '连接码生成失败，请再试一次');
}

async function createPair(openid, role) {
  if (!VALID_ROLES.includes(role)) throw makeError('INVALID_ROLE', '请选择你在小屋里的身份');
  const existing = await findPairByMember(openid);
  if (existing) return publicSession(existing, openid);
  const now = Date.now();
  const data = {
    inviteCode: await createUniqueInviteCode(),
    requesterOpenid: role === 'requester' ? openid : '',
    responderOpenid: role === 'responder' ? openid : '',
    createdAt: now,
    updatedAt: now,
  };
  const result = await db.collection(PAIRS).add({ data });
  return publicSession({ _id: result._id, ...data }, openid);
}

async function joinPair(openid, inviteCode, role) {
  if (!VALID_ROLES.includes(role)) throw makeError('INVALID_ROLE', '请选择你在小屋里的身份');
  const existing = await findPairByMember(openid);
  if (existing) return publicSession(existing, openid);
  const normalizedCode = cleanText(inviteCode, 6).toUpperCase();
  const result = await db.collection(PAIRS).where({ inviteCode: normalizedCode }).limit(1).get();
  const pair = result.data[0];
  if (!pair) throw makeError('INVITE_NOT_FOUND', '没有找到这个连接码');
  const field = role === 'requester' ? 'requesterOpenid' : 'responderOpenid';
  if (pair[field]) throw makeError('ROLE_TAKEN', '这个身份已经有人使用了');
  await db.collection(PAIRS).doc(pair._id).update({
    data: { [field]: openid, updatedAt: Date.now() },
  });
  return publicSession({ ...pair, [field]: openid }, openid);
}

async function cancelPair(openid) {
  const pair = await findPairByMember(openid);
  if (!pair) return publicSession(null, openid);
  if (pair.requesterOpenid && pair.responderOpenid) {
    throw makeError('PAIR_CONNECTED', '两个人已经连上，不能在这里重新选择身份');
  }
  await db.collection(PAIRS).doc(pair._id).remove();
  return publicSession(null, openid);
}

const cleanSpecifications = (items) =>
  (Array.isArray(items) ? items : []).slice(0, 12).map((item) => ({
    specTitle: cleanText(item.specTitle, 40),
    specValue: cleanText(item.specValue, 80),
  }));

const cleanOrderItems = (items) =>
  (Array.isArray(items) ? items : []).slice(0, 30).map((item, index) => ({
    id: cleanText(item.id, 100) || `${Date.now()}-${index}`,
    spuId: cleanText(item.spuId, 100),
    skuId: cleanText(item.skuId, 100),
    goodsName: cleanText(item.goodsName, 100),
    goodsPictureUrl: cleanText(item.goodsPictureUrl, 500),
    originPrice: cleanText(item.originPrice, 30),
    actualPrice: cleanText(item.actualPrice, 30),
    buyQuantity: Math.max(1, Math.min(99, Number(item.buyQuantity || 1))),
    specifications: cleanSpecifications(item.specifications),
    tagText: cleanText(item.tagText, 40) || null,
  }));

function normalizeOrder(pair, openid, persona, order) {
  if (!VALID_PERSONAS.includes(persona)) throw makeError('INVALID_PERSONA', '没有找到当前主题');
  const orderNo = cleanText(order?.orderNo, 100);
  if (!orderNo) throw makeError('INVALID_ORDER', '这条记录缺少编号');
  const now = Date.now();
  return {
    pairId: pair._id,
    persona,
    orderId: cleanText(order.orderId, 120) || `${persona}-${now}`,
    orderNo,
    parentOrderNo: cleanText(order.parentOrderNo, 100) || orderNo,
    storeId: cleanText(order.storeId, 100),
    storeName: cleanText(order.storeName, 100),
    orderStatus: 5,
    orderStatusName: STATUS_NAMES[persona][5],
    totalAmount: cleanText(order.totalAmount, 30),
    paymentAmount: cleanText(order.paymentAmount, 30),
    freightFee: '0',
    createTime: cleanText(order.createTime, 30) || `${now}`,
    updateTime: `${now}`,
    remark: cleanText(order.remark, 300),
    logisticsVO: { logisticsNo: '' },
    buttonVOs: [],
    orderItemVOs: cleanOrderItems(order.orderItemVOs),
    changeNote: null,
    createdBy: openid,
    updatedBy: openid,
    createdAt: now,
    updatedAt: now,
  };
}

const publicRecord = (record) => {
  const next = clone(record);
  delete next.pairId;
  delete next.createdBy;
  delete next.updatedBy;
  delete next._openid;
  next.isCloudRecord = true;
  return next;
};

async function getRecord(pairId, orderNo) {
  const result = await db.collection(RECORDS).where({ pairId }).limit(100).get();
  return result.data.find((item) => item.orderNo === orderNo) || null;
}

async function createRecord(openid, persona, order) {
  const { pair } = await requirePair(openid, 'requester');
  const normalized = normalizeOrder(pair, openid, persona, order || {});
  const existing = await getRecord(pair._id, normalized.orderNo);
  if (existing) return publicRecord(existing);
  const result = await db.collection(RECORDS).add({ data: normalized });
  return publicRecord({ _id: result._id, ...normalized });
}

async function listRecords(openid, persona, status) {
  const { pair } = await requirePair(openid);
  const result = await db.collection(RECORDS).where({ pairId: pair._id }).limit(100).get();
  return result.data
    .filter((item) => !persona || item.persona === persona)
    .filter((item) => status === undefined || Number(status) < 0 || Number(item.orderStatus) === Number(status))
    .sort((left, right) => Number(right.createTime || 0) - Number(left.createTime || 0))
    .map(publicRecord);
}

async function updateRecordStatus(openid, persona, orderNo, requestedStatus) {
  const { pair } = await requirePair(openid, 'responder');
  const record = await getRecord(pair._id, cleanText(orderNo, 100));
  if (!record || record.persona !== persona) throw makeError('RECORD_NOT_FOUND', '没有找到这条记录');
  const status = Number(requestedStatus);
  const nextStatus = { 5: 10, 10: 40, 40: 50 }[Number(record.orderStatus)];
  if (status !== Number(record.orderStatus) && status !== nextStatus) {
    throw makeError('INVALID_STATUS', '请按收到、进行中、完成的顺序更新');
  }
  const patch = {
    orderStatus: status,
    orderStatusName: STATUS_NAMES[persona][status],
    updateTime: `${Date.now()}`,
    updatedAt: Date.now(),
    updatedBy: openid,
  };
  await db.collection(RECORDS).doc(record._id).update({ data: patch });
  return publicRecord({ ...record, ...patch });
}

async function saveRecordChange(openid, persona, orderNo, changeNote) {
  const { pair } = await requirePair(openid, 'requester');
  const record = await getRecord(pair._id, cleanText(orderNo, 100));
  if (!record || record.persona !== persona) throw makeError('RECORD_NOT_FOUND', '没有找到这条记录');
  const patch = {
    changeNote: {
      optionKey: cleanText(changeNote?.optionKey, 40),
      optionTitle: cleanText(changeNote?.optionTitle, 80),
      optionDescription: cleanText(changeNote?.optionDescription, 160),
      note: cleanText(changeNote?.note, 300),
      updatedAt: Date.now(),
    },
    updateTime: `${Date.now()}`,
    updatedAt: Date.now(),
    updatedBy: openid,
  };
  await db.collection(RECORDS).doc(record._id).update({ data: patch });
  return publicRecord({ ...record, ...patch });
}

const publicFeedback = (feedback) => {
  const next = clone(feedback);
  next.id = next.clientId || next.id || next._id;
  next.createdAtTimestamp = Number(next.createdAt || 0);
  next.createdAt = next.createdAtText || '';
  delete next.pairId;
  delete next.authorOpenid;
  delete next._openid;
  delete next.clientId;
  delete next.createdAtText;
  next.isCloudFeedback = true;
  return next;
};

async function addFeedback(openid, persona, feedback) {
  const { pair, role } = await requirePair(openid);
  if (!VALID_PERSONAS.includes(persona)) throw makeError('INVALID_PERSONA', '没有找到当前主题');
  const now = Date.now();
  const clientId = cleanText(feedback?.id, 100) || `${now}`;
  const data = {
    pairId: pair._id,
    clientId,
    persona,
    orderNo: cleanText(feedback?.orderNo, 100),
    spuId: cleanText(feedback?.spuId, 100),
    title: cleanText(feedback?.title, 100),
    image: cleanText(feedback?.image, 500),
    score: Math.max(1, Math.min(5, Number(feedback?.score || 5))),
    understoodScore: Math.max(1, Math.min(5, Number(feedback?.understoodScore || 5))),
    content: cleanText(feedback?.content, 1000),
    images: (Array.isArray(feedback?.images) ? feedback.images : []).slice(0, 9).map((item) => cleanText(item, 500)),
    createdAt: now,
    createdAtText: cleanText(feedback?.createdAt, 40),
    authorRole: role,
    authorOpenid: openid,
  };
  const existingResult = await db.collection(FEEDBACK).where({ pairId: pair._id }).limit(100).get();
  const existing = existingResult.data.find((item) => item.clientId === clientId);
  if (existing) {
    await db.collection(FEEDBACK).doc(existing._id).update({ data });
    return publicFeedback({ _id: existing._id, ...data });
  }
  const result = await db.collection(FEEDBACK).add({ data });
  return publicFeedback({ _id: result._id, ...data });
}

async function listFeedback(openid, persona, orderNo) {
  const { pair } = await requirePair(openid);
  const result = await db.collection(FEEDBACK).where({ pairId: pair._id }).limit(100).get();
  return result.data
    .filter((item) => !persona || item.persona === persona)
    .filter((item) => !orderNo || item.orderNo === orderNo)
    .sort((left, right) => Number(right.createdAt || 0) - Number(left.createdAt || 0))
    .map(publicFeedback);
}

exports.main = async (event = {}) => {
  try {
    await ensureCollections();
    const { OPENID } = cloud.getWXContext();
    switch (event.action) {
      case 'getSession': {
        const pair = await findPairByMember(OPENID);
        return success(publicSession(pair, OPENID));
      }
      case 'createPair':
        return success(await createPair(OPENID, event.role));
      case 'joinPair':
        return success(await joinPair(OPENID, event.inviteCode, event.role));
      case 'cancelPair':
        return success(await cancelPair(OPENID));
      case 'createRecord':
        return success(await createRecord(OPENID, event.persona, event.order));
      case 'listRecords':
        return success(await listRecords(OPENID, event.persona, event.status));
      case 'updateRecordStatus':
        return success(await updateRecordStatus(OPENID, event.persona, event.orderNo, event.status));
      case 'saveRecordChange':
        return success(await saveRecordChange(OPENID, event.persona, event.orderNo, event.changeNote));
      case 'addFeedback':
        return success(await addFeedback(OPENID, event.persona, event.feedback));
      case 'listFeedback':
        return success(await listFeedback(OPENID, event.persona, event.orderNo));
      default:
        return fail('UNKNOWN_ACTION', '没有找到这个云端操作');
    }
  } catch (error) {
    console.error('[loveSync]', event.action, error);
    return fail(error.code || 'CLOUD_ERROR', error.message || '云端暂时没有回应');
  }
};
