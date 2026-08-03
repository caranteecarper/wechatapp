import { syncPersonaPage } from '../../../utils/personas';
import { getPersonaPageCopy } from '../../../utils/persona-pages';
import { readPersonaOrders } from '../../../utils/persona-orders';

const getProgressIndex = (status) => {
  const statusMap = { 5: 0, 10: 1, 40: 2, 50: 3, 60: 3 };
  return statusMap[Number(status)] ?? 0;
};

Page({
  data: {
    currentPersona: '',
    pageCopy: {},
    orderNo: '',
    progressIndex: 0,
  },

  onLoad(options = {}) {
    const persona = syncPersonaPage(this);
    const pageCopy = getPersonaPageCopy(persona.key, 'progress');
    const localOrder = readPersonaOrders(persona.key).find((item) => item.orderNo === options.orderNo);
    this.setData({
      currentPersona: persona.key,
      pageCopy,
      orderNo: options.orderNo || '',
      progressIndex: getProgressIndex(localOrder?.orderStatus ?? options.status),
    });
    wx.setNavigationBarTitle({ title: pageCopy.navTitle });
  },
});
