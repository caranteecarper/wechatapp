import { syncPersonaPage } from '../../../utils/personas';
import { getPersonaPageCopy } from '../../../utils/persona-pages';

const getHistoryKey = (persona) => `love.searchHistory.${persona}`;

Page({
  data: {
    currentPersona: '',
    pageCopy: {},
    searchValue: '',
    historyWords: [],
  },

  onLoad() {
    this.syncPage();
  },

  onShow() {
    this.syncPage();
  },

  syncPage() {
    const persona = syncPersonaPage(this);
    const pageCopy = getPersonaPageCopy(persona.key, 'search');
    this.setData({
      currentPersona: persona.key,
      pageCopy,
      historyWords: wx.getStorageSync(getHistoryKey(persona.key)) || [],
    });
    wx.setNavigationBarTitle({ title: pageCopy.navTitle });
  },

  onInput(e) {
    this.setData({ searchValue: e.detail.value });
  },

  clearInput() {
    this.setData({ searchValue: '' });
  },

  clearHistory() {
    wx.removeStorageSync(getHistoryKey(this.data.currentPersona));
    this.setData({ historyWords: [] });
  },

  chooseWord(e) {
    this.search(e.currentTarget.dataset.value || '');
  },

  handleSubmit(e) {
    this.search(e.detail.value?.keyword || this.data.searchValue);
  },

  search(rawValue) {
    const value = `${rawValue || ''}`.trim();
    if (!value) return;
    const historyWords = [value, ...this.data.historyWords.filter((item) => item !== value)].slice(0, 8);
    wx.setStorageSync(getHistoryKey(this.data.currentPersona), historyWords);
    this.setData({ historyWords, searchValue: value });
    wx.navigateTo({
      url: `/pages/goods/result/index?searchValue=${encodeURIComponent(value)}`,
    });
  },
});
