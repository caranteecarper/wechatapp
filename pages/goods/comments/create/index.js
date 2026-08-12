import Toast from 'tdesign-miniprogram/toast/index';
import { getPersonaContent } from '../../../../model/persona-content';
import { completePersonaOrder } from '../../../../utils/persona-orders';
import { syncPersonaPage } from '../../../../utils/personas';
import { getPersonaPageCopy } from '../../../../utils/persona-pages';

const getFeedbackKey = (persona) => `love.feedback.${persona}`;

const formatDate = (date) => {
  const pad = (value) => `${value}`.padStart(2, '0');
  return `${date.getFullYear()}.${pad(date.getMonth() + 1)}.${pad(date.getDate())} ${pad(date.getHours())}:${pad(
    date.getMinutes(),
  )}`;
};

Page({
  data: {
    currentPersona: '',
    pageCopy: {},
    score: 5,
    understoodScore: 5,
    content: '',
    uploadFiles: [],
    imageProps: { mode: 'aspectFill' },
    gridConfig: { width: 210, height: 210, column: 3 },
    orderNo: '',
    spuId: '',
    title: '',
    imgUrl: '',
  },

  onLoad(options = {}) {
    const persona = syncPersonaPage(this);
    const pageCopy = getPersonaPageCopy(persona.key, 'feedback');
    const system = getPersonaContent(persona.key);
    const fallbackImage = system?.getHome()?.swiper?.[0] || '';
    this.setData({
      currentPersona: persona.key,
      pageCopy,
      orderNo: options.orderNo || '',
      spuId: options.spuId || '',
      title: decodeURIComponent(options.title || '') || pageCopy.interactionLabel,
      imgUrl: decodeURIComponent(options.imgUrl || '') || fallbackImage,
    });
    wx.setNavigationBarTitle({ title: pageCopy.createNavTitle });
  },

  onRateChange(e) {
    this.setData({ [e.currentTarget.dataset.field]: e.detail.value });
  },

  onTextAreaChange(e) {
    this.setData({ content: e.detail.value });
  },

  handleUploadSuccess(e) {
    this.setData({ uploadFiles: e.detail.files || [] });
  },

  handleUploadRemove(e) {
    const uploadFiles = [...this.data.uploadFiles];
    uploadFiles.splice(e.detail.index, 1);
    this.setData({ uploadFiles });
  },

  submitFeedback() {
    const content = this.data.content.trim();
    if (!content) {
      Toast({
        context: this,
        selector: '#t-toast',
        message: this.data.personaUi.feedbackRequiredToast,
      });
      return;
    }

    const key = getFeedbackKey(this.data.currentPersona);
    const feedbackList = wx.getStorageSync(key) || [];
    const images = this.data.uploadFiles
      .map((item) => item.url || item.tempFilePath || item.path || '')
      .filter(Boolean);
    feedbackList.unshift({
      id: `${Date.now()}`,
      orderNo: this.data.orderNo,
      spuId: this.data.spuId,
      title: this.data.title,
      image: this.data.imgUrl,
      score: this.data.score,
      understoodScore: this.data.understoodScore,
      content,
      images,
      createdAt: formatDate(new Date()),
    });
    wx.setStorageSync(key, feedbackList);
    if (this.data.orderNo) {
      completePersonaOrder(this.data.currentPersona, this.data.orderNo);
    }
    Toast({
      context: this,
      selector: '#t-toast',
      message: this.data.pageCopy.success,
      icon: 'check-circle',
    });
    setTimeout(() => wx.navigateBack(), 600);
  },
});
