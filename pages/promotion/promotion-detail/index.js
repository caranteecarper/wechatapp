import Toast from 'tdesign-miniprogram/toast/index';
import { syncPersonaPage } from '../../../utils/personas';
import { getSpecialDatePage } from './data';

Page({
  data: {
    currentPersona: 'teacher',
    pageCopy: {},
    hero: {},
    eventCards: [],
    preparations: [],
  },

  onLoad() {
    this.applyPersona();
  },

  onShow() {
    if (this.data.pageCopy.navTitle) {
      this.applyPersona();
    }
  },

  applyPersona() {
    const persona = syncPersonaPage(this);
    const page = getSpecialDatePage(persona.key);
    wx.setNavigationBarTitle({ title: page.copy.navTitle });
    this.setData({
      currentPersona: persona.key,
      pageCopy: page.copy,
      hero: page.hero,
      eventCards: page.eventCards,
      preparations: page.copy.preparations,
    });
  },

  onDateTap(e) {
    const { index } = e.currentTarget.dataset;
    const event = this.data.eventCards[Number(index)];
    Toast({
      context: this,
      selector: '#t-toast',
      message: event ? event.stateText : this.data.pageCopy.pendingDateLabel,
      icon: '',
    });
  },

  onCollectDate() {
    Toast({
      context: this,
      selector: '#t-toast',
      message: this.data.pageCopy.actionToast,
      icon: '',
    });
  },
});
