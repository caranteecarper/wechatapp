import updateManager from './common/updateManager';
import { initLoveCloud, syncPendingPersonaOrders } from './utils/cloud-sync';
import { getActivePersona } from './utils/personas';

App({
  onLaunch: function () {
    this.globalData.cloudEnabled = initLoveCloud();
    const persona = getActivePersona();
    if (persona.key === 'baby' && typeof wx.loadSubPackage === 'function') {
      wx.loadSubPackage({
        name: 'goods',
        fail: () => {},
      });
    }
  },
  onShow: function () {
    updateManager();
    if (this.globalData.cloudEnabled) {
      syncPendingPersonaOrders().catch(() => {});
    }
  },
  globalData: {
    cloudEnabled: false,
  },
});
