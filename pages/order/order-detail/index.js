import { fetchOrders } from '../../../services/order/orderList';
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
      return;
    }
    this.hasShown = true;
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

  async loadOrder() {
    this.setData({ loading: true });
    try {
      const result = await fetchOrders(
        {
          parameter: {
            pageNum: 1,
            pageSize: 100,
          },
        },
        this.data.currentPersona,
      );
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
        loading: false,
      });
      this.loadChangeNote();
      this.loadFeedbackSummary();
    } catch (error) {
      this.setData({ loading: false });
    }
  },

  loadChangeNote() {
    if (!this.data.orderNo) return;
    const key = `love.orderChange.${this.data.currentPersona}.${this.data.orderNo}`;
    this.setData({ changeNote: wx.getStorageSync(key) || this.data.order?.changeNote || null });
  },

  loadFeedbackSummary() {
    const feedbackList = wx.getStorageSync(`love.feedback.${this.data.currentPersona}`) || [];
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
