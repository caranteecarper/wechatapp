import Toast from 'tdesign-miniprogram/toast/index';
import {
  cancelCloudPair,
  createCloudPair,
  getCloudSession,
  joinCloudPair,
  syncPendingPersonaOrders,
} from '../../../utils/cloud-sync';
import { syncPersonaPage } from '../../../utils/personas';

const COPY = {
  baby: {
    eyebrow: '只属于我们',
    title: '把宝宝和我连起来',
    description: '连好以后，我发出的想要和宝宝的回应会出现在两部手机里。',
    responder: '我是宝宝，负责回应',
  },
  princess: {
    eyebrow: '公主专属',
    title: '把公主和仆人连起来',
    description: '连好以后，公主想要的和仆人的准备进度会同步到两部手机。',
    responder: '我是仆人，负责回应',
  },
  teacher: {
    eyebrow: '姐姐专属',
    title: '把姐姐和小狗连起来',
    description: '连好以后，姐姐的指令和小狗的执行进度会同步到两部手机。',
    responder: '我是小狗，负责回应',
  },
};

const ERROR_COPY = {
  INVITE_NOT_FOUND: '没有找到这个连接码，再检查一下',
  ROLE_TAKEN: '这个身份已经有人用了，换另一个身份',
  PAIR_CONNECTED: '两个人已经连上，不能在这里重新选择身份',
  INVALID_ROLE: '先选一下你在小屋里的身份',
  CLOUD_UNAVAILABLE: '当前还不能连接云端',
};

Page({
  data: {
    currentPersona: '',
    pageCopy: {},
    session: null,
    selectedRole: 'requester',
    joinCode: '',
    loading: true,
    submitting: false,
  },

  onLoad() {
    const persona = syncPersonaPage(this);
    this.setData({
      currentPersona: persona.key,
      pageCopy: COPY[persona.key] || COPY.teacher,
    });
    wx.setNavigationBarTitle({ title: '我们的连接' });
    this.loadSession();
  },

  onShow() {
    if (this.hasShown) this.loadSession(true);
    this.hasShown = true;
    this.startConnectionPolling();
  },

  onHide() {
    this.stopConnectionPolling();
  },

  onUnload() {
    this.stopConnectionPolling();
  },

  async loadSession(force = false) {
    this.setData({ loading: true });
    const session = await getCloudSession({ force });
    this.setData({ session, loading: false });
    if (session.connected) syncPendingPersonaOrders().catch(() => {});
  },

  startConnectionPolling() {
    this.stopConnectionPolling();
    this.connectionTimer = setInterval(() => {
      const { session, submitting } = this.data;
      if (session?.paired && !session.connected && !submitting) this.loadSession(true);
    }, 5000);
  },

  stopConnectionPolling() {
    if (!this.connectionTimer) return;
    clearInterval(this.connectionTimer);
    this.connectionTimer = null;
  },

  chooseRole(e) {
    this.setData({ selectedRole: e.currentTarget.dataset.role });
  },

  onCodeInput(e) {
    this.setData({ joinCode: `${e.detail.value || ''}`.toUpperCase().slice(0, 6) });
  },

  async createLink() {
    if (this.data.submitting) return;
    this.setData({ submitting: true });
    try {
      const session = await createCloudPair(this.data.selectedRole);
      this.setData({ session });
      if (session.connected) syncPendingPersonaOrders().catch(() => {});
      Toast({
        context: this,
        selector: '#t-toast',
        message: '连接码准备好了',
        icon: 'check-circle',
      });
    } catch (error) {
      this.showError(error);
    } finally {
      this.setData({ submitting: false });
    }
  },

  async joinLink() {
    if (this.data.submitting) return;
    if (this.data.joinCode.length !== 6) {
      Toast({ context: this, selector: '#t-toast', message: '请输入 6 位连接码', icon: '' });
      return;
    }
    this.setData({ submitting: true });
    try {
      const session = await joinCloudPair(this.data.joinCode, this.data.selectedRole);
      this.setData({ session });
      if (session.connected) syncPendingPersonaOrders().catch(() => {});
      Toast({
        context: this,
        selector: '#t-toast',
        message: session.connected ? '我们已经连上啦' : '连接码收好了',
        icon: 'check-circle',
      });
    } catch (error) {
      this.showError(error);
    } finally {
      this.setData({ submitting: false });
    }
  },

  resetLink() {
    if (this.data.submitting) return;
    wx.showModal({
      title: '重新选择身份',
      content: '当前连接码会失效，之后可以重新创建或加入连接。',
      confirmText: '重新选择',
      success: async ({ confirm }) => {
        if (!confirm) return;
        this.setData({ submitting: true });
        try {
          const session = await cancelCloudPair();
          this.setData({ session, joinCode: '' });
          Toast({
            context: this,
            selector: '#t-toast',
            message: '现在可以重新选择身份了',
            icon: 'check-circle',
          });
        } catch (error) {
          this.showError(error);
        } finally {
          this.setData({ submitting: false });
        }
      },
    });
  },

  copyInviteCode() {
    const code = this.data.session?.inviteCode;
    if (!code) return;
    wx.setClipboardData({
      data: code,
      success: () => {
        Toast({ context: this, selector: '#t-toast', message: '连接码复制好了', icon: '' });
      },
    });
  },

  showError(error) {
    Toast({
      context: this,
      selector: '#t-toast',
      message: ERROR_COPY[error.code] || error.message || '云端暂时没有回应',
      icon: '',
    });
  },
});
