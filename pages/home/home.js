import { fetchHome } from '../../services/home/home';
import { fetchGoodsList } from '../../services/good/fetchGoods';
import Toast from 'tdesign-miniprogram/toast/index';
import { DEFAULT_PERSONA, PERSONAS, getPersona, isInteractionPersona } from '../../utils/personas';
import { addPersonaCartItem } from '../../utils/persona-cart';

Page({
  data: {
    imgSrcs: [],
    tabList: [],
    goodsList: [],
    goodsListLoadStatus: 0,
    pageLoading: false,
    current: 1,
    autoplay: true,
    duration: '500',
    interval: 5000,
    navigation: { type: 'dots' },
    swiperImageProps: { mode: 'scaleToFill' },
    personas: PERSONAS,
    currentPersona: DEFAULT_PERSONA,
    currentNickname: getPersona(DEFAULT_PERSONA).label,
    personaUi: getPersona(DEFAULT_PERSONA).ui,
    homeCopy: {},
  },

  goodListPagination: {
    index: 0,
    num: 20,
  },

  privateData: {
    tabIndex: 0,
  },

  onShow() {
    this.getTabBar().init();
  },

  onLoad() {
    const persona = getPersona(wx.getStorageSync('love.currentPersona'));
    this.setData({
      currentPersona: persona.key,
      currentNickname: persona.label,
      personaUi: persona.ui,
    });
    this.applyPersona(persona);
    this.ensurePersonaAssets(persona).then(() => this.init());
  },

  onReachBottom() {
    if (this.data.goodsListLoadStatus === 0) {
      this.loadGoodsList();
    }
  },

  onPullDownRefresh() {
    this.init();
  },

  init() {
    this.loadHomePage();
  },

  loadHomePage() {
    wx.stopPullDownRefresh();

    this.setData({
      pageLoading: true,
    });
    fetchHome(this.data.currentPersona).then(({ swiper, tabList, homeCopy }) => {
      this.setData({
        tabList,
        imgSrcs: swiper,
        homeCopy,
        pageLoading: false,
      });
      this.loadGoodsList(true);
    });
  },

  tabChangeHandle(e) {
    this.privateData.tabIndex = e.detail;
    this.loadGoodsList(true);
  },

  onReTry() {
    this.loadGoodsList();
  },

  async loadGoodsList(fresh = false) {
    if (fresh) {
      wx.pageScrollTo({
        scrollTop: 0,
      });
    }

    this.setData({ goodsListLoadStatus: 1 });

    const pageSize = this.goodListPagination.num;
    const pageIndex = fresh ? 0 : this.goodListPagination.index;

    try {
      const nextList = await fetchGoodsList(pageIndex, pageSize, this.data.currentPersona, this.privateData.tabIndex);
      this.setData({
        goodsList: fresh ? nextList : this.data.goodsList.concat(nextList),
        goodsListLoadStatus: nextList.length < pageSize ? 2 : 0,
      });

      this.goodListPagination.index = pageIndex + nextList.length;
      this.goodListPagination.num = pageSize;
    } catch (err) {
      this.setData({ goodsListLoadStatus: 3 });
    }
  },

  goodListClickHandle(e) {
    const { index } = e.detail;
    const { spuId } = this.data.goodsList[index];
    wx.navigateTo({
      url: `/pages/goods/details/index?spuId=${spuId}`,
    });
  },

  goodListAddCartHandle(e) {
    const { index } = e.detail;
    const good = this.data.goodsList[index];
    if (isInteractionPersona(this.data.currentPersona) && good) {
      addPersonaCartItem(this.data.currentPersona, good.spuId);
    }
    Toast({
      context: this,
      selector: '#t-toast',
      message: this.data.personaUi.addCartToast,
    });
  },

  switchPersona(e) {
    const { key } = e.currentTarget.dataset;
    const persona = getPersona(key);
    wx.setStorageSync('love.currentPersona', persona.key);
    this.setData({
      currentPersona: persona.key,
      currentNickname: persona.label,
      personaUi: persona.ui,
      goodsList: [],
      tabList: [],
      homeCopy: {},
      pageLoading: true,
    });
    this.applyPersona(persona);
    this.privateData.tabIndex = 0;
    this.goodListPagination.index = 0;
    this.ensurePersonaAssets(persona).then(() => this.init());
    Toast({
      context: this,
      selector: '#t-toast',
      message: persona.ui.switchToast,
      icon: '',
    });
  },

  applyPersona(persona) {
    wx.setNavigationBarColor({
      backgroundColor: persona.navigationBar.backgroundColor,
      frontColor: persona.navigationBar.frontColor,
    });
    wx.setNavigationBarTitle({
      title: persona.homeTitle,
    });

    const tabBar = this.getTabBar();
    if (tabBar && typeof tabBar.applyTheme === 'function') {
      tabBar.applyTheme(persona.key);
    }
  },

  ensurePersonaAssets(persona) {
    if (persona.key !== 'baby' || typeof wx.loadSubPackage !== 'function') {
      return Promise.resolve();
    }

    return new Promise((resolve) => {
      wx.loadSubPackage({
        name: 'goods',
        success: resolve,
        fail: resolve,
      });
    });
  },

  navToSearchPage() {
    wx.navigateTo({ url: '/pages/goods/search/index' });
  },

  navToActivityDetail() {
    if (isInteractionPersona(this.data.currentPersona)) {
      wx.navigateTo({
        url: `/pages/promotion/promotion-detail/index?persona=${this.data.currentPersona}`,
      });
      return;
    }
    wx.navigateTo({
      url: '/pages/promotion/promotion-detail/index',
    });
  },
});
