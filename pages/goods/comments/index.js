import { syncPersonaPage } from '../../../utils/personas';
import { getPersonaPageCopy } from '../../../utils/persona-pages';

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

  loadFeedback() {
    const feedbackList = wx.getStorageSync(getFeedbackKey(this.data.currentPersona)) || [];
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
