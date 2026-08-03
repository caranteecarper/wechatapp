import { getCategoryList } from '../../services/good/fetchCategoryList';
import { syncPersonaPage } from '../../utils/personas';

Page({
  data: {
    list: [],
    currentPersona: '',
    loadedPersona: '',
  },
  async init(persona = this.data.currentPersona) {
    this.setData({ loadedPersona: persona });
    try {
      const result = await getCategoryList(persona);
      this.setData({
        list: result,
      });
    } catch (error) {
      console.error('err:', error);
    }
  },

  onShow() {
    const persona = syncPersonaPage(this);
    wx.setNavigationBarTitle({ title: persona.ui.categoryTitle });
    const tabBar = this.getTabBar();
    if (tabBar) tabBar.init();
    if (this.data.loadedPersona !== persona.key) {
      this.init(persona.key);
    }
  },
  onChange(e) {
    const { item } = e.detail || {};
    if (!item) return;
    wx.navigateTo({
      url: `/pages/goods/list/index?groupId=${item.groupId || ''}`,
    });
  },
  onLoad() {
    const persona = syncPersonaPage(this);
    wx.setNavigationBarTitle({ title: persona.ui.categoryTitle });
    this.init(persona.key);
  },
});
