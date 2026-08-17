import { fetchOrders } from '../../../services/order/orderList';
import { fetchCloudFeedback, getCloudSession, updateCloudRecordStatus } from '../../../utils/cloud-sync';
import { updatePersonaOrder } from '../../../utils/persona-orders';
import { syncPersonaPage } from '../../../utils/personas';
import { getPersonaPageCopy } from '../../../utils/persona-pages';

const formatDate = (value) => {
  const date = new Date(Number(value) || Date.now());
  const pad = (part) => `${part}`.padStart(2, '0');
  return `${date.getFullYear()}.${pad(date.getMonth() + 1)}.${pad(date.getDate())} ${pad(date.getHours())}:${pad(
    date.getMinutes(),
  )}`;
};

const getProgressIndex = (status) => {
  const statusMap = { 5: 0, 10: 1, 40: 2, 50: 3, 60: 3 };
  return statusMap[Number(status)] ?? 0;
};

const getStatusAction = (persona, status) => {
  const actions = {
    baby: {
      5: { status: 10, text: '宝宝收到了' },
      10: { status: 40, text: '宝宝开始做' },
      40: { status: 50, text: '宝宝做好啦' },
    },
    princess: {
      5: { status: 10, text: '仆人收到了' },
      10: { status: 40, text: '仆人开始准备' },
      40: { status: 50, text: '仆人准备好了' },
    },
    teacher: {
      5: { status: 10, text: '小狗收到了' },
      10: { status: 40, text: '小狗开始做' },
      40: { status: 50, text: '小狗完成了' },
    },
  };
  return actions[persona]?.[Number(status)] || null;
};

Page({
  data: {
    currentPersona: '',
    pageCopy: {},
    orderNo: '',
    order: null,
    goodsList: [],
    createdAt: '',
    progressIndex: 0,
    orderNote: '',
    changeNote: null,
    feedbackSummary: null,
    loading: true,
    cloudSession: null,
    statusAction: null,
    statusUpdating: false,
  },

  onLoad(query = {}) {
    this.orderNo = query.orderNo || '';
    this.syncPage();
    this.loadOrder();
  },

  onShow() {
    if (!this.data.currentPersona) return;
    if (this.hasShown) {
      this.loadOrder();
    }
    this.hasShown = true;
    this.startCloudPolling();
  },

  onHide() {
    this.stopCloudPolling();
  },

  onUnload() {
    this.stopCloudPolling();
  },

  syncPage() {
    const persona = syncPersonaPage(this);
    const pageCopy = getPersonaPageCopy(persona.key, 'detail');
    this.setData({
      currentPersona: persona.key,
      pageCopy,
      orderNo: this.orderNo,
    });
    wx.setNavigationBarTitle({ title: pageCopy.navTitle });
  },

  async loadOrder(silent = false) {
    if (!silent) this.setData({ loading: true });
    try {
      const [result, cloudSession] = await Promise.all([
        fetchOrders(
          {
            parameter: {
              pageNum: 1,
              pageSize: 100,
            },
          },
          this.data.currentPersona,
        ),
        getCloudSession(),
      ]);
      const orders = result?.data?.orders || [];
      const order = this.orderNo
        ? orders.find((item) => item.orderNo === this.orderNo) || null
        : orders[0] || null;
      const goodsList = (order?.orderItemVOs || []).map((item) => ({
        spuId: item.spuId,
        title: item.goodsName,
        image: item.goodsPictureUrl,
        specs: (item.specifications || []).map((spec) => spec.specValue).join(' · '),
      }));
      this.orderNo = order?.orderNo || this.orderNo;
      this.setData({
        order,
        orderNo: this.orderNo,
        goodsList,
        createdAt: formatDate(order?.createTime),
        progressIndex: getProgressIndex(order?.orderStatus),
        orderNote: order?.remark || '',
        cloudSession,
        statusAction:
          cloudSession.connected && cloudSession.role === 'responder' && order?.isCloudRecord
            ? getStatusAction(this.data.currentPersona, order.orderStatus)
            : null,
        loading: false,
      });
      this.loadChangeNote();
      this.loadFeedbackSummary();
    } catch (error) {
      if (!silent) this.setData({ loading: false });
    }
  },

  startCloudPolling() {
    this.stopCloudPolling();
    this.cloudTimer = setInterval(() => {
      if (!this.data.loading && !this.data.statusUpdating) this.loadOrder(true);
    }, 6000);
  },

  stopCloudPolling() {
    if (!this.cloudTimer) return;
    clearInterval(this.cloudTimer);
    this.cloudTimer = null;
  },

  async updateCloudStatus() {
    const action = this.data.statusAction;
    if (!action || this.data.statusUpdating) return;
    this.setData({ statusUpdating: true });
    try {
      const order = await updateCloudRecordStatus(
        this.data.currentPersona,
        this.data.orderNo,
        action.status,
      );
      updatePersonaOrder(this.data.currentPersona, this.data.orderNo, order);
      this.setData({
        order,
        progressIndex: getProgressIndex(order.orderStatus),
        statusAction: getStatusAction(this.data.currentPersona, order.orderStatus),
      });
      wx.showToast({ title: action.text, icon: 'none' });
    } catch (error) {
      wx.showToast({ title: error.message || '刚才没有更新成功', icon: 'none' });
    } finally {
      this.setData({ statusUpdating: false });
    }
  },

  loadChangeNote() {
    if (!this.data.orderNo) return;
    const key = `love.orderChange.${this.data.currentPersona}.${this.data.orderNo}`;
    this.setData({ changeNote: wx.getStorageSync(key) || this.data.order?.changeNote || null });
  },

  async loadFeedbackSummary() {
    const localFeedback = wx.getStorageSync(`love.feedback.${this.data.currentPersona}`) || [];
    const cloudFeedback = await fetchCloudFeedback(this.data.currentPersona, this.data.orderNo);
    const feedbackList = cloudFeedback.concat(localFeedback);
    this.setData({
      feedbackSummary: feedbackList.find((item) => item.orderNo === this.data.orderNo) || null,
    });
  },

  openGoods(e) {
    wx.navigateTo({
      url: `/pages/goods/details/index?spuId=${e.currentTarget.dataset.id}`,
    });
  },

  openProgress() {
    wx.navigateTo({
      url: `/pages/order/delivery-detail/index?orderNo=${this.data.orderNo}&status=${this.data.order?.orderStatus || 5}`,
    });
  },

  openChange() {
    wx.navigateTo({
      url: `/pages/order/apply-service/index?orderNo=${this.data.orderNo}`,
    });
  },

  openFeedback() {
    const goods = this.data.goodsList[0] || {};
    wx.navigateTo({
      url: `/pages/goods/comments/create/index?orderNo=${encodeURIComponent(
        this.data.orderNo,
      )}&spuId=${goods.spuId || ''}&title=${encodeURIComponent(
        goods.title || this.data.pageCopy.contentTitle,
      )}&imgUrl=${encodeURIComponent(goods.image || '')}`,
    });
  },
});
