import Toast from 'tdesign-miniprogram/toast/index';
import { fetchGoodsList } from '../../../services/good/fetchGoods';
import { addPersonaCartItem } from '../../../utils/persona-cart';
import { syncPersonaPage } from '../../../utils/personas';
import { getPersonaPageCopy } from '../../../utils/persona-pages';

Page({
  data: {
    currentPersona: '',
    personaUi: {},
    pageCopy: {},
    keywords: '',
    goodsList: [],
    hasLoaded: false,
    loading: true,
  },

  onLoad(options = {}) {
    const keywords = decodeURIComponent(options.searchValue || '');
    this.setData({ keywords });
    this.syncPage();
    this.loadResults();
  },

  onShow() {
    const previousPersona = this.data.currentPersona;
    this.syncPage();
    if (previousPersona && previousPersona !== this.data.currentPersona) {
      this.loadResults();
    }
  },

  syncPage() {
    const persona = syncPersonaPage(this);
    const pageCopy = getPersonaPageCopy(persona.key, 'search');
    this.setData({
      currentPersona: persona.key,
      pageCopy,
    });
    wx.setNavigationBarTitle({ title: pageCopy.resultTitle });
  },

  onInput(e) {
    this.setData({ keywords: e.detail.value });
  },

  handleSubmit(e) {
    const keywords = `${e.detail.value?.keyword || this.data.keywords}`.trim();
    this.setData({ keywords }, () => this.loadResults());
  },

  async loadResults() {
    this.setData({ loading: true, hasLoaded: false });
    try {
      const allGoods = await fetchGoodsList(0, 100, this.data.currentPersona, 0);
      const keyword = this.data.keywords.trim().toLowerCase();
      const goodsList = keyword
        ? allGoods.filter((item) => {
            const source = [item.title, ...(item.tags || [])].join(' ').toLowerCase();
            return source.includes(keyword);
          })
        : allGoods;
      this.setData({ goodsList, loading: false, hasLoaded: true });
    } catch (error) {
      this.setData({ goodsList: [], loading: false, hasLoaded: true });
    }
  },

  gotoGoodsDetail(e) {
    const item = this.data.goodsList[e.detail.index];
    if (!item) return;
    wx.navigateTo({
      url: `/pages/goods/details/index?spuId=${item.spuId}`,
    });
  },

  handleAddCart(e) {
    const item = this.data.goodsList[e.detail.index];
    if (!item) return;
    addPersonaCartItem(this.data.currentPersona, item.spuId);
    Toast({
      context: this,
      selector: '#t-toast',
      message: this.data.personaUi.addCartToast,
      icon: 'check-circle',
    });
  },
});
