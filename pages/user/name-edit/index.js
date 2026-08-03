import { getPersona, syncPersonaPage } from '../../../utils/personas';
import { getPersonaPageCopy } from '../../../utils/persona-pages';

const getProfileKey = (persona) => `love.profile.${persona}`;

Page({
  data: {
    currentPersona: '',
    pageCopy: {},
    nameValue: '',
  },

  onLoad(options = {}) {
    const activePersona = syncPersonaPage(this);
    const persona = getPersona(options.persona || activePersona.key);
    const pageCopy = getPersonaPageCopy(persona.key, 'nameEdit');
    this.setData({
      currentPersona: persona.key,
      pageCopy,
      nameValue: decodeURIComponent(options.name || ''),
    });
    wx.setNavigationBarTitle({ title: pageCopy.navTitle });
  },

  onInput(e) {
    this.setData({ nameValue: e.detail.value });
  },

  clearContent() {
    this.setData({ nameValue: '' });
  },

  onSubmit() {
    const nameValue = this.data.nameValue.trim();
    if (!nameValue) return;
    const key = getProfileKey(this.data.currentPersona);
    const stored = wx.getStorageSync(key) || {};
    wx.setStorageSync(key, { ...stored, nickName: nameValue });
    wx.showToast({ title: this.data.pageCopy.success, icon: 'none' });
    setTimeout(() => wx.navigateBack(), 500);
  },
});
