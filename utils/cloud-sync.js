import { CLOUD_ENV_ID, LOVE_SYNC_FUNCTION } from '../config/cloud';
import { readPersonaOrders, writePersonaOrders } from './persona-orders';

const SESSION_TTL = 30000;
const RECORD_CACHE_TTL = 3000;
const SESSION_STORAGE_KEY = 'love.cloud.session.v1';
const PENDING_RECORDS_KEY = 'love.cloud.pendingRecords.v1';

const EMPTY_SESSION = {
  available: false,
  paired: false,
  connected: false,
  role: '',
  pairId: '',
  inviteCode: '',
};

let sessionCache = null;
let sessionExpiresAt = 0;
let sessionRequest = null;
const recordCache = {};
const recordRequests = {};

const clone = (value) => JSON.parse(JSON.stringify(value));
const hasCloud = () =>
  typeof wx !== 'undefined' && wx.cloud && typeof wx.cloud.callFunction === 'function';

const createCloudError = (code, message) => {
  const error = new Error(message || code || '云端暂时没有回应');
  error.code = code || 'CLOUD_ERROR';
  return error;
};

async function callLoveSync(action, payload = {}) {
  if (!hasCloud()) throw createCloudError('CLOUD_UNAVAILABLE', '当前环境不支持云开发');
  const response = await wx.cloud.callFunction({
    name: LOVE_SYNC_FUNCTION,
    data: { action, ...payload },
  });
  const result = response?.result || {};
  if (!result.ok) throw createCloudError(result.code, result.message);
  return result.data;
}

const normalizeSession = (session, available = true) => ({
  ...EMPTY_SESSION,
  ...(session || {}),
  available,
  paired: Boolean(session?.pairId),
  connected: Boolean(session?.connected),
});

const readStoredSession = () => {
  if (typeof wx === 'undefined' || typeof wx.getStorageSync !== 'function') return null;
  const session = wx.getStorageSync(SESSION_STORAGE_KEY);
  return session?.pairId ? normalizeSession(session) : null;
};

const rememberSession = (session) => {
  if (typeof wx !== 'undefined' && typeof wx.setStorageSync === 'function') {
    wx.setStorageSync(SESSION_STORAGE_KEY, session);
  }
  return session;
};

export function initLoveCloud() {
  if (typeof wx === 'undefined' || !wx.cloud || typeof wx.cloud.init !== 'function') return false;
  wx.cloud.init({
    env: CLOUD_ENV_ID,
    traceUser: true,
  });
  return true;
}

export function clearCloudSessionCache() {
  sessionCache = null;
  sessionExpiresAt = 0;
  sessionRequest = null;
}

export async function getCloudSession(options = {}) {
  const now = Date.now();
  if (!sessionCache) sessionCache = readStoredSession();
  if (!options.force && sessionCache && sessionExpiresAt > now) return clone(sessionCache);
  if (!hasCloud()) return clone(EMPTY_SESSION);
  if (sessionRequest) return clone(await sessionRequest);
  sessionRequest = callLoveSync('getSession')
    .then((session) => {
      const normalized = normalizeSession(session);
      sessionCache = rememberSession(normalized);
      sessionExpiresAt = Date.now() + SESSION_TTL;
      return normalized;
    })
    .catch((error) => ({
      ...(sessionCache || EMPTY_SESSION),
      available: true,
      errorCode: error.code || 'CLOUD_ERROR',
    }));
  try {
    return clone(await sessionRequest);
  } finally {
    sessionRequest = null;
  }
}

export async function createCloudPair(role) {
  const session = normalizeSession(await callLoveSync('createPair', { role }));
  sessionCache = rememberSession(session);
  sessionExpiresAt = Date.now() + SESSION_TTL;
  return clone(session);
}

export async function joinCloudPair(inviteCode, role) {
  const session = normalizeSession(
    await callLoveSync('joinPair', {
      inviteCode: `${inviteCode || ''}`.trim().toUpperCase(),
      role,
    }),
  );
  sessionCache = rememberSession(session);
  sessionExpiresAt = Date.now() + SESSION_TTL;
  return clone(session);
}

export async function cancelCloudPair() {
  const session = normalizeSession(await callLoveSync('cancelPair'));
  sessionCache = rememberSession(session);
  sessionExpiresAt = Date.now() + SESSION_TTL;
  return clone(session);
}

const readPendingRecords = () => {
  const records = wx.getStorageSync(PENDING_RECORDS_KEY);
  return Array.isArray(records) ? records : [];
};

const writePendingRecords = (records) => {
  wx.setStorageSync(PENDING_RECORDS_KEY, Array.isArray(records) ? records : []);
};

const queuePendingRecord = (persona, order) => {
  const pending = readPendingRecords().filter((item) => item.order?.orderNo !== order.orderNo);
  pending.push({ persona, order, queuedAt: Date.now() });
  writePendingRecords(pending.slice(-50));
};

const removePendingRecord = (orderNo) => {
  writePendingRecords(readPendingRecords().filter((item) => item.order?.orderNo !== orderNo));
};

const cacheCloudOrders = (persona, cloudOrders) => {
  if (!Array.isArray(cloudOrders) || !cloudOrders.length) return;
  const merged = new Map();
  readPersonaOrders(persona).forEach((order) => merged.set(order.orderNo, order));
  cloudOrders.forEach((order) => merged.set(order.orderNo, { ...order, isCloudRecord: true }));
  writePersonaOrders(
    persona,
    [...merged.values()].sort((left, right) => Number(right.createTime || 0) - Number(left.createTime || 0)),
  );
};

export async function syncPersonaOrderToCloud(persona, order) {
  if (!order?.orderNo) return { synced: false, reason: 'EMPTY_ORDER' };
  const session = await getCloudSession({ force: true });
  if (!session.connected || session.role !== 'requester') {
    queuePendingRecord(persona, order);
    return { synced: false, reason: session.connected ? 'WRONG_ROLE' : 'PAIR_REQUIRED' };
  }
  try {
    const cloudOrder = await callLoveSync('createRecord', { persona, order });
    removePendingRecord(order.orderNo);
    cacheCloudOrders(persona, [cloudOrder]);
    recordCache[persona] = null;
    return { synced: true, order: cloudOrder };
  } catch (error) {
    queuePendingRecord(persona, order);
    return { synced: false, reason: error.code || 'CLOUD_ERROR' };
  }
}

export async function syncPendingPersonaOrders() {
  if (typeof wx === 'undefined') return { synced: 0, pending: 0 };
  const pending = readPendingRecords();
  if (!pending.length) return { synced: 0, pending: 0 };
  const session = await getCloudSession({ force: true });
  if (!session.connected || session.role !== 'requester') {
    return { synced: 0, pending: pending.length };
  }

  let synced = 0;
  const remaining = [];
  for (const item of pending) {
    try {
      const cloudOrder = await callLoveSync('createRecord', item);
      cacheCloudOrders(item.persona, [cloudOrder]);
      recordCache[item.persona] = null;
      synced += 1;
    } catch (error) {
      remaining.push(item);
    }
  }
  writePendingRecords(remaining);
  return { synced, pending: remaining.length };
}

export async function fetchCloudRecords(persona, options = {}) {
  const cached = recordCache[persona];
  if (!options.force && cached && cached.expiresAt > Date.now()) return clone(cached.records);
  if (recordRequests[persona]) return clone(await recordRequests[persona]);
  const session = await getCloudSession();
  if (!session.connected) return [];
  recordRequests[persona] = callLoveSync('listRecords', { persona })
    .then((records) => records || [])
    .catch(() => []);
  try {
    const records = await recordRequests[persona];
    cacheCloudOrders(persona, records);
    recordCache[persona] = {
      records,
      expiresAt: Date.now() + RECORD_CACHE_TTL,
    };
    return clone(records);
  } finally {
    recordRequests[persona] = null;
  }
}

export async function updateCloudRecordStatus(persona, orderNo, status) {
  const order = await callLoveSync('updateRecordStatus', { persona, orderNo, status });
  cacheCloudOrders(persona, [order]);
  recordCache[persona] = null;
  return clone(order);
}

export async function saveCloudRecordChange(persona, orderNo, changeNote) {
  const session = await getCloudSession();
  if (!session.connected || session.role !== 'requester') return null;
  try {
    const order = await callLoveSync('saveRecordChange', { persona, orderNo, changeNote });
    cacheCloudOrders(persona, [order]);
    recordCache[persona] = null;
    return clone(order);
  } catch (error) {
    return null;
  }
}

const isUploadableLocalPath = (path) =>
  Boolean(path) && !/^cloud:\/\//.test(path) && !/^https?:\/\//.test(path) && !/^\/assets\//.test(path);

async function uploadFeedbackImages(session, persona, feedback, imagePaths) {
  const paths = (imagePaths || []).filter(isUploadableLocalPath);
  if (!paths.length) return imagePaths || [];
  const uploaded = [];
  for (let index = 0; index < paths.length; index += 1) {
    const filePath = paths[index];
    const extension = (filePath.match(/\.([a-zA-Z0-9]+)(?:\?|$)/) || [])[1] || 'jpg';
    const cloudPath = `love-feedback/${session.pairId}/${persona}/${feedback.orderNo || 'whisper'}/${Date.now()}-${index}.${extension}`;
    const result = await wx.cloud.uploadFile({ cloudPath, filePath });
    uploaded.push(result.fileID);
  }
  return (imagePaths || []).map((path) => {
    if (!isUploadableLocalPath(path)) return path;
    return uploaded.shift() || path;
  });
}

export async function syncFeedbackToCloud(persona, feedback) {
  const session = await getCloudSession({ force: true });
  if (!session.connected) return { synced: false, reason: 'PAIR_REQUIRED' };
  try {
    const images = await uploadFeedbackImages(session, persona, feedback, feedback.images || []);
    const cloudFeedback = await callLoveSync('addFeedback', {
      persona,
      feedback: { ...feedback, images },
    });
    return { synced: true, feedback: cloudFeedback };
  } catch (error) {
    return { synced: false, reason: error.code || 'CLOUD_ERROR' };
  }
}

export async function fetchCloudFeedback(persona, orderNo = '') {
  const session = await getCloudSession();
  if (!session.connected) return [];
  try {
    return (await callLoveSync('listFeedback', { persona, orderNo })) || [];
  } catch (error) {
    return [];
  }
}
