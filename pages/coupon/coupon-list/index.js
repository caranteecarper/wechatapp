import Toast from 'tdesign-miniprogram/toast/index';
import { syncPersonaPage } from '../../../utils/personas';
import { getPersonaPageCopy } from '../../../utils/persona-pages';

Page({
  data: {
    currentPersona: '',
    pageCopy: {},
    activeTab: 0,
    visibleItems: [],
  },

  onLoad() {
    this.syncPage();
  },

  onShow() {
    this.syncPage();
  },

  syncPage() {
    const persona = syncPersonaPage(this);
    const pageCopy = getPersonaPageCopy(persona.key, 'vouchers');
    this.setData(
      {
        currentPersona: persona.key,
        pageCopy,
      },
      () => this.filterItems(),
    );
    wx.setNavigationBarTitle({ title: pageCopy.navTitle });
  },

  changeTab(e) {
    this.setData({ activeTab: Number(e.currentTarget.dataset.index) }, () => this.filterItems());
  },

  filterItems() {
    const visibleItems = (this.data.pageCopy.items || []).filter((item) => Number(item.status) === this.data.activeTab);
    this.setData({ visibleItems });
  },

  openDetail(e) {
    wx.navigateTo({
      url: `/pages/coupon/coupon-detail/index?id=${e.currentTarget.dataset.id}`,
    });
  },

  addVoucher() {
    Toast({
      context: this,
      selector: '#t-toast',
      message: this.data.personaUi.voucherComingToast,
    });
  },
});
