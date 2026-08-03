import Toast from 'tdesign-miniprogram/toast/index';
import { getPersonaContent } from '../../../model/persona-content';
import { syncPersonaPage } from '../../../utils/personas';
import { getPersonaPageCopy } from '../../../utils/persona-pages';

const getProfileKey = (persona) => `love.profile.${persona}`;

Page({
  data: {
    currentPersona: '',
    personaUi: {},
    pageCopy: {},
    profile: {
      avatarUrl: '',
      nickName: '',
    },
  },

  onLoad() {
    this.syncPage();
  },

  onShow() {
    this.syncPage();
  },

  syncPage() {
    const persona = syncPersonaPage(this);
    const pageCopy = getPersonaPageCopy(persona.key, 'profile');
    const system = getPersonaContent(persona.key);
    const stored = wx.getStorageSync(getProfileKey(persona.key)) || {};
    const fallbackInfo = system ? system.getUsercenter().userInfo : {};
    const profile = {
      avatarUrl: stored.avatarUrl || fallbackInfo.avatarUrl || '',
      nickName: stored.nickName || pageCopy.defaultName,
    };

    this.setData({
      currentPersona: persona.key,
      pageCopy,
      profile,
    });
    wx.setNavigationBarTitle({ title: pageCopy.navTitle });
  },

  editName() {
    wx.navigateTo({
      url: `/pages/user/name-edit/index?persona=${this.data.currentPersona}&name=${encodeURIComponent(
        this.data.profile.nickName,
      )}`,
    });
  },

  async editAvatar() {
    try {
      const result = await new Promise((resolve, reject) => {
        wx.chooseMedia({
          count: 1,
          mediaType: ['image'],
          sizeType: ['compressed'],
          sourceType: ['album', 'camera'],
          success: resolve,
          fail: reject,
        });
      });
      const avatarUrl = result.tempFiles?.[0]?.tempFilePath;
      if (!avatarUrl) return;
      const profile = { ...this.data.profile, avatarUrl };
      wx.setStorageSync(getProfileKey(this.data.currentPersona), profile);
      this.setData({ profile });
      Toast({
        context: this,
        selector: '#t-toast',
        message: '头像已经换好',
        theme: 'success',
      });
    } catch (error) {
      if (`${error?.errMsg || ''}`.includes('cancel')) return;
      Toast({
        context: this,
        selector: '#t-toast',
        message: '这次没有选好头像',
      });
    }
  },
});
