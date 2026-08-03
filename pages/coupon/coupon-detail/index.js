import Toast from 'tdesign-miniprogram/toast/index';
import { syncPersonaPage } from '../../../utils/personas';
import { getPersonaPageCopy } from '../../../utils/persona-pages';

Page({
  data: {
    currentPersona: '',
    pageCopy: {},
    voucher: {},
  },

  onLoad(query = {}) {
    const persona = syncPersonaPage(this);
    const pageCopy = getPersonaPageCopy(persona.key, 'vouchers');
    const voucher = (pageCopy.items || []).find((item) => item.key === query.id) || pageCopy.items?.[0] || {};
    this.setData({
      currentPersona: persona.key,
      pageCopy,
      voucher,
    });
    wx.setNavigationBarTitle({ title: pageCopy.detailNavTitle });
  },

  collectVoucher() {
    const key = `love.vouchers.${this.data.currentPersona}`;
    const saved = wx.getStorageSync(key) || [];
    if (!saved.includes(this.data.voucher.key)) {
      saved.unshift(this.data.voucher.key);
      wx.setStorageSync(key, saved);
    }
    Toast({
      context: this,
      selector: '#t-toast',
      message: this.data.pageCopy.actionToast,
      icon: 'check-circle',
    });
  },
});
