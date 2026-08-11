import updateManager from './common/updateManager';
import { getActivePersona } from './utils/personas';

App({
  onLaunch: function () {
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
  },
});
