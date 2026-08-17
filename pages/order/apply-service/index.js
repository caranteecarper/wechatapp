import Toast from 'tdesign-miniprogram/toast/index';
import { saveCloudRecordChange } from '../../../utils/cloud-sync';
import { updatePersonaOrder } from '../../../utils/persona-orders';
import { syncPersonaPage } from '../../../utils/personas';
import { getPersonaPageCopy } from '../../../utils/persona-pages';

Page({
  data: {
    currentPersona: '',
    pageCopy: {},
    orderNo: '',
    selectedKey: '',
    note: '',
  },

  onLoad(options = {}) {
    const persona = syncPersonaPage(this);
    const pageCopy = getPersonaPageCopy(persona.key, 'change');
    this.setData({
      currentPersona: persona.key,
      pageCopy,
      orderNo: options.orderNo || '',
    });
    wx.setNavigationBarTitle({ title: pageCopy.navTitle });
  },

  selectOption(e) {
    this.setData({ selectedKey: e.currentTarget.dataset.key });
  },

  onNoteInput(e) {
    this.setData({ note: e.detail.value });
  },

  submitChange() {
    const option = this.data.pageCopy.options.find((item) => item.key === this.data.selectedKey);
    if (!option) {
      Toast({
        context: this,
        selector: '#t-toast',
        message: this.data.personaUi.chooseOptionToast,
      });
      return;
    }

    const orderNo = this.data.orderNo || 'latest';
    const key = `love.orderChange.${this.data.currentPersona}.${orderNo}`;
    const changeNote = {
      optionKey: option.key,
      optionTitle: option.title,
      optionDescription: option.description,
      note: this.data.note.trim(),
      updatedAt: Date.now(),
    };
    wx.setStorageSync(key, changeNote);
    updatePersonaOrder(this.data.currentPersona, orderNo, { changeNote });
    saveCloudRecordChange(this.data.currentPersona, orderNo, changeNote).catch(() => {});
    Toast({
      context: this,
      selector: '#t-toast',
      message: this.data.pageCopy.success,
      icon: 'check-circle',
    });
    setTimeout(() => wx.navigateBack(), 600);
  },
});
