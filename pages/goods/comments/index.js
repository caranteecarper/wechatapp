import { syncPersonaPage } from '../../../utils/personas';
import { getPersonaPageCopy } from '../../../utils/persona-pages';
import { fetchCloudFeedback } from '../../../utils/cloud-sync';

const getFeedbackKey = (persona) => `love.feedback.${persona}`;

Page({
  data: {
    currentPersona: '',
    pageCopy: {},
    activeTab: 0,
    feedbackList: [],
    visibleList: [],
    spuId: '',
    title: '',
    imgUrl: '',
  },

  onLoad(options = {}) {
    this.setData({
      spuId: options.spuId || '',
      title: decodeURIComponent(options.title || ''),
      imgUrl: decodeURIComponent(options.imgUrl || ''),
    });
    this.syncPage();
  },

  onShow() {
    this.syncPage();
    this.loadFeedback();
  },

  syncPage() {
    const persona = syncPersonaPage(this);
    const pageCopy = getPersonaPageCopy(persona.key, 'feedback');
    this.setData({ currentPersona: persona.key, pageCopy });
    wx.setNavigationBarTitle({ title: pageCopy.navTitle });
  },

  async loadFeedback() {
    const key = getFeedbackKey(this.data.currentPersona);
    const localFeedback = wx.getStorageSync(key) || [];
    const cloudFeedback = await fetchCloudFeedback(this.data.currentPersona);
    const feedbackMap = new Map();
    localFeedback.forEach((item) => feedbackMap.set(item.id, item));
    cloudFeedback.forEach((item) => feedbackMap.set(item.id, item));
    const feedbackList = [...feedbackMap.values()].sort(
      (left, right) =>
        Number(right.createdAtTimestamp || right.id || 0) - Number(left.createdAtTimestamp || left.id || 0),
    );
    wx.setStorageSync(key, feedbackList);
    this.setData({ feedbackList }, () => this.filterFeedback());
  },

  changeTab(e) {
    this.setData({ activeTab: Number(e.currentTarget.dataset.index) }, () => this.filterFeedback());
  },

  filterFeedback() {
    const { activeTab, feedbackList } = this.data;
    const visibleList = feedbackList.filter((item) => {
      if (activeTab === 1) return Number(item.score) >= 4;
      if (activeTab === 2) return (item.images || []).length > 0;
      if (activeTab === 3) return Number(item.score) < 4;
      return true;
    });
    this.setData({ visibleList });
  },

  createFeedback() {
    const query = [
      `spuId=${this.data.spuId}`,
      `title=${encodeURIComponent(this.data.title)}`,
      `imgUrl=${encodeURIComponent(this.data.imgUrl)}`,
    ].join('&');
    wx.navigateTo({ url: `/pages/goods/comments/create/index?${query}` });
  },
});
