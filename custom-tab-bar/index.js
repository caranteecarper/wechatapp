import TabMenu from './data';
import { DEFAULT_PERSONA, getPersona } from '../utils/personas';

const getThemedMenu = (key) => {
  const persona = getPersona(key);
  return TabMenu.map((item, index) => ({
    ...item,
    text: persona.ui.tabLabels[index] || item.text,
  }));
};

Component({
  data: {
    active: 0,
    list: getThemedMenu(DEFAULT_PERSONA),
    theme: getPersona(DEFAULT_PERSONA).tabBar,
  },

  methods: {
    onChange(event) {
      this.setData({ active: event.detail.value });
      wx.switchTab({
        url: this.data.list[event.detail.value].url.startsWith('/')
          ? this.data.list[event.detail.value].url
          : `/${this.data.list[event.detail.value].url}`,
      });
    },

    init() {
      const page = getCurrentPages().pop();
      const route = page ? page.route.split('?')[0] : '';
      const active = this.data.list.findIndex(
        (item) =>
          (item.url.startsWith('/') ? item.url.substr(1) : item.url) ===
          `${route}`,
      );
      this.setData({ active });
      this.applyTheme(wx.getStorageSync('love.currentPersona'));
    },

    applyTheme(key) {
      const persona = getPersona(key);
      this.setData({
        theme: persona.tabBar,
        list: getThemedMenu(persona.key),
      });
    },
  },
});
