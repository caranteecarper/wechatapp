const PERSONAS = [
  {
    key: 'baby',
    label: '宝宝~',
    interaction: true,
    homeTitle: '宝宝的软软小屋',
    navigationBar: { backgroundColor: '#fff7f9', frontColor: '#000000' },
    tabBar: {
      background: '#fffdfd',
      border: '#f3d6dc',
      color: '#a67f88',
      activeColor: '#df6f89',
      activeBackground: '#fff0f3',
    },
    ui: {
      receiverName: '宝宝',
      switchToast: '宝宝~亲亲~',
      addCartToast: '已经放进宝宝的软软篮',
      categoryTitle: '宝宝互动',
      cartTitle: '宝宝的软软篮',
      listTitle: '宝宝的抱抱清单',
      detailTitle: '宝宝互动',
      orderPageTitle: '宝宝的抱抱记录',
      tabLabels: ['软软屋', '抱抱', '宝宝篮', '我们'],
      searchToast: '今天想要的抱抱，都在下面这些卡里',
      basketName: '宝宝篮',
      valueName: '软糖值',
      sendText: '告诉宝宝',
      sentToast: '心愿已经告诉宝宝，等宝宝来抱好',
      receivedText: '宝宝已收到',
      recordTitle: '宝宝的抱抱记录',
      recordDesc: '全部回应',
      emptyText: '还没有宝宝的小心愿',
      noteTitle: '想悄悄对宝宝说',
      notePlaceholder: '比如：今天想先被宝宝好好抱一下',
    },
  },
  {
    key: 'princess',
    label: '公主~',
    interaction: true,
    homeTitle: '公主的偏爱橱窗',
    navigationBar: { backgroundColor: '#f8f3f1', frontColor: '#000000' },
    tabBar: {
      background: '#fffbff',
      border: '#ead7ef',
      color: '#8c748f',
      activeColor: '#b85e91',
      activeBackground: '#f7e5f2',
    },
    ui: {
      receiverName: '仆人',
      switchToast: '我的小公主~',
      addCartToast: '已经放进公主想要的',
      categoryTitle: '公主想要的',
      cartTitle: '公主想要的',
      listTitle: '公主的偏爱橱窗',
      detailTitle: '公主想要这个',
      orderPageTitle: '被偏爱的记录',
      tabLabels: ['橱窗', '想要', '偏爱单', '我们'],
      searchToast: '奶茶、外卖、花和惊喜都在这里啦',
      basketName: '公主想要的',
      valueName: '心意预算',
      sendText: '让仆人知道~',
      sentToast: '已经让仆人知道啦，等他来宠公主',
      receivedText: '他记住啦',
      recordTitle: '被偏爱的记录',
      recordDesc: '全部心意',
      emptyText: '公主还没有把想要的放进来',
      noteTitle: '公主还想补充什么',
      notePlaceholder: '比如：奶茶要少冰三分糖，花想要粉色的~',
    },
  },
  {
    key: 'teacher',
    label: '姐姐~',
    interaction: true,
    homeTitle: '姐姐的专属时间',
    navigationBar: { backgroundColor: '#321820', frontColor: '#ffffff' },
    tabBar: {
      background: '#fffdfb',
      border: '#e4d6d9',
      color: '#9b8389',
      activeColor: '#7d3048',
      activeBackground: '#f4e9ea',
    },
    ui: {
      receiverName: '小狗',
      switchToast: '姐姐~想我了吗？',
      addCartToast: '已收进姐姐的指令册',
      categoryTitle: '姐姐指令',
      cartTitle: '姐姐的指令册',
      listTitle: '姐姐的指令',
      detailTitle: '姐姐指令',
      orderPageTitle: '姐姐的记录',
      tabLabels: ['专属', '指令', '指令册', '我们'],
      searchToast: '姐姐的指令都在下面这几张卡里',
      basketName: '指令册',
      valueName: '听话值',
      sendText: '吩咐小狗',
      sentToast: '指令已经交给小狗，等小狗认真执行',
      receivedText: '小狗已领命',
      recordTitle: '姐姐的记录',
      recordDesc: '全部指令',
      emptyText: '还没有姐姐的指令',
      noteTitle: '姐姐给小狗的补充要求',
      notePlaceholder: '比如：今晚十点前，小狗要认真来回应',
    },
  },
];

const DEFAULT_PERSONA = 'teacher';

function getPersona(key) {
  return PERSONAS.find((item) => item.key === key) || PERSONAS.find((item) => item.key === DEFAULT_PERSONA);
}

function getActivePersona() {
  if (typeof wx === 'undefined') {
    return getPersona(DEFAULT_PERSONA);
  }
  const storedKey = wx.getStorageSync('love.currentPersona');
  const persona = getPersona(storedKey);
  if (storedKey !== persona.key) {
    wx.setStorageSync('love.currentPersona', persona.key);
  }
  return persona;
}

function isInteractionPersona(key) {
  return Boolean(getPersona(key).interaction);
}

function getPersonaUi(key) {
  return getPersona(key).ui;
}

function syncPersonaPage(page) {
  const persona = getActivePersona();
  if (page && typeof page.setData === 'function') {
    page.setData({
      currentPersona: persona.key,
      isInteractionPersona: persona.interaction,
      personaUi: persona.ui,
      receiverName: persona.ui.receiverName,
    });
  }
  if (typeof wx !== 'undefined') {
    wx.setNavigationBarColor({
      backgroundColor: persona.navigationBar.backgroundColor,
      frontColor: persona.navigationBar.frontColor,
    });
  }
  const tabBar = page && typeof page.getTabBar === 'function' ? page.getTabBar() : null;
  if (tabBar && typeof tabBar.applyTheme === 'function') {
    tabBar.applyTheme(persona.key);
  }
  return persona;
}

export { DEFAULT_PERSONA, PERSONAS, getPersona, getActivePersona, getPersonaUi, isInteractionPersona, syncPersonaPage };
