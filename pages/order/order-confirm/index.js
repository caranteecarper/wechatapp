import Toast from 'tdesign-miniprogram/toast/index';
import { fetchSettleDetail } from '../../../services/order/orderConfirm';
import { removePersonaCartItems } from '../../../utils/persona-cart';
import { createPersonaOrder } from '../../../utils/persona-orders';
import { syncPersonaPage } from '../../../utils/personas';

const parseGoods = (value) => {
  if (Array.isArray(value)) return value;
  try {
    return JSON.parse(value || '[]');
  } catch (error) {
    return [];
  }
};

Page({
  data: {
    loading: true,
    currentPersona: '',
    personaUi: {},
    orderCardList: [],
    totalCount: 0,
    totalValue: '0',
    note: '',
    submitting: false,
  },

  onLoad(options = {}) {
    const persona = syncPersonaPage(this);
    this.setData({
      currentPersona: persona.key,
      personaUi: persona.ui,
    });
    wx.setNavigationBarTitle({ title: persona.ui.sendText });
    this.loadSettle(options);
  },

  async loadSettle(options) {
    let goodsRequestList = [];
    if (options.type === 'cart') {
      goodsRequestList = parseGoods(
        wx.getStorageSync(`order.goodsRequestList.${this.data.currentPersona}`) ||
          wx.getStorageSync('order.goodsRequestList'),
      );
    } else {
      goodsRequestList = parseGoods(options.goodsRequestList);
    }
    this.goodsRequestList = goodsRequestList;

    const storeMap = {};
    const storeInfoList = [];
    goodsRequestList.forEach((goods) => {
      if (!storeMap[goods.storeId]) {
        storeInfoList.push({
          storeId: goods.storeId,
          storeName: goods.storeName,
        });
        storeMap[goods.storeId] = true;
      }
    });

    try {
      const result = await fetchSettleDetail(
        {
          goodsRequestList,
          storeInfoList,
          userAddressReq: null,
          couponList: [],
        },
        this.data.currentPersona,
      );
      const settle = result.data || {};
      const orderCardList = (settle.storeGoodsList || []).map((store) => ({
        id: store.storeId,
        title: store.storeName,
        goodsList: (store.skuDetailVos || []).map((goods) => ({
          id: goods.skuId,
          image: goods.image,
          title: goods.goodsName,
          specs: (goods.skuSpecLst || []).map((spec) => spec.specValue).join(' · '),
          quantity: goods.quantity,
          value: goods.tagPrice || goods.settlePrice || '0',
        })),
      }));
      this.setData({
        loading: false,
        orderCardList,
        totalCount: settle.totalGoodsCount || goodsRequestList.length,
        totalValue: settle.totalPayAmount || settle.totalSalePrice || '0',
      });
    } catch (error) {
      this.setData({ loading: false, orderCardList: [] });
      Toast({
        context: this,
        selector: '#t-toast',
        message: '这份心愿暂时没有整理好',
      });
    }
  },

  onNoteInput(e) {
    this.setData({ note: e.detail.value });
  },

  submitOrder() {
    if (this.data.submitting) return;
    if (!this.goodsRequestList?.length) {
      Toast({
        context: this,
        selector: '#t-toast',
        message: '先选一件想告诉对方的事',
      });
      return;
    }

    this.setData({ submitting: true });
    const note = this.data.note.trim();
    let order;
    try {
      order = createPersonaOrder(this.data.currentPersona, this.goodsRequestList, note);
      if (!order) throw new Error('empty order');
      if (note) {
        wx.setStorageSync(`love.latestNote.${this.data.currentPersona}`, note);
      }
      removePersonaCartItems(this.data.currentPersona, this.goodsRequestList);
      wx.removeStorageSync(`order.goodsRequestList.${this.data.currentPersona}`);
      wx.removeStorageSync('order.goodsRequestList');
    } catch (error) {
      this.setData({ submitting: false });
      Toast({
        context: this,
        selector: '#t-toast',
        message: '这条记录暂时没有保存好，请再试一次',
        icon: '',
      });
      return;
    }
    Toast({
      context: this,
      selector: '#t-toast',
      message: this.data.personaUi.sentToast,
      icon: 'check-circle',
    });
    setTimeout(() => {
      wx.redirectTo({
        url: `/pages/order/pay-result/index?orderNo=${encodeURIComponent(order.orderNo)}`,
      });
    }, 600);
  },
});
