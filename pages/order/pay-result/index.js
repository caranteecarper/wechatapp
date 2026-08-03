import { syncPersonaPage } from '../../../utils/personas';
import { getPersonaPageCopy } from '../../../utils/persona-pages';

Page({
  data: {
    currentPersona: '',
    pageCopy: {},
    orderNo: '',
  },

  onLoad(options = {}) {
    const persona = syncPersonaPage(this);
    const pageCopy = getPersonaPageCopy(persona.key, 'success');
    this.setData({
      currentPersona: persona.key,
      pageCopy,
      orderNo: options.orderNo || '',
    });
    wx.setNavigationBarTitle({ title: pageCopy.navTitle });
  },

  viewRecords() {
    wx.redirectTo({
      url: `/pages/order/order-list/index${this.data.orderNo ? `?orderNo=${this.data.orderNo}` : ''}`,
    });
  },

  goHome() {
    wx.switchTab({ url: '/pages/home/home' });
  },
});
