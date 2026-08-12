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
      switchToast: '宝宝来啦，亲亲你~',
      addCartToast: '宝宝先替你收进抱抱清单啦~',
      removeToast: '宝宝替你拿掉啦~',
      selectToast: '宝宝看到你选的啦~',
      unselectToast: '宝宝知道这次先不要啦~',
      selectAllToast: '宝宝把这些都记下啦~',
      unselectAllToast: '宝宝知道这次先不选啦~',
      avatarSavedToast: '宝宝记住你的新头像啦~',
      avatarFailedToast: '宝宝这次没换好，再选一张好不好~',
      chooseOptionToast: '宝宝还不知道你想要哪一种呀~',
      emptySubmitToast: '宝宝还没看到你选的小心愿呀~',
      loadFailedToast: '宝宝这次没打开，再试一下好不好~',
      saveFailedToast: '宝宝这次没记好，再告诉我一次好不好~',
      feedbackRequiredToast: '宝宝想听你说说真实感受~',
      voucherComingToast: '宝宝还在准备新的抱抱券~',
      quantityLimitToast: '宝宝今天先做这么多个一样的心愿，好不好~',
      quantityLimitTitle: '宝宝先记到这里啦~',
      quantityLimitContent: '今天先放 {count} 个一样的心愿',
      quantityLimitConfirm: '就先这些',
      removeConfirmText: '宝宝替你从抱抱清单里拿掉吗？',
      removeConfirmButton: '拿掉吧',
      removeCancelButton: '先留着',
      categoryTitle: '宝宝想要的',
      cartTitle: '宝宝的抱抱清单',
      listTitle: '宝宝的抱抱清单',
      detailTitle: '宝宝的小心愿',
      orderPageTitle: '宝宝的抱抱记录',
      tabLabels: ['软软屋', '想要', '抱抱清单', '我们'],
      searchToast: '想让宝宝做的，都在下面啦',
      basketName: '抱抱清单',
      valueName: '软糖值',
      sendText: '告诉宝宝',
      sentToast: '宝宝知道啦，马上来抱抱你~',
      receivedText: '宝宝知道啦',
      recordTitle: '宝宝的抱抱记录',
      recordDesc: '全部回应',
      emptyText: '还没有放进来的小心愿',
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
      switchToast: '仆人来啦，我的小公主~',
      addCartToast: '仆人先替公主收进想要清单啦~',
      removeToast: '仆人替公主拿掉啦~',
      selectToast: '仆人看到公主选的啦~',
      unselectToast: '仆人知道公主这次先不要啦~',
      selectAllToast: '仆人都替公主选好啦~',
      unselectAllToast: '仆人知道公主这次先不选啦~',
      avatarSavedToast: '仆人记住公主的新头像啦~',
      avatarFailedToast: '仆人这次没换好，公主再选一张吧~',
      chooseOptionToast: '仆人还不知道公主要哪一种呀~',
      emptySubmitToast: '仆人还没看到公主选了什么呀~',
      loadFailedToast: '仆人这次没打开，公主再试一下~',
      saveFailedToast: '仆人这次没记好，公主再告诉我一次~',
      feedbackRequiredToast: '仆人想听公主说说真实感受~',
      voucherComingToast: '仆人还在准备新的偏爱券~',
      quantityLimitToast: '仆人今天先替公主准备这么多，好不好~',
      quantityLimitTitle: '想要清单先放到这里~',
      quantityLimitContent: '这次先准备 {count} 个一样的想要',
      quantityLimitConfirm: '就先这些',
      removeConfirmText: '仆人替公主从想要清单里拿掉吗？',
      removeConfirmButton: '拿掉吧',
      removeCancelButton: '先留着',
      categoryTitle: '公主想要的',
      cartTitle: '公主的想要清单',
      listTitle: '公主的偏爱橱窗',
      detailTitle: '公主想要这个',
      orderPageTitle: '公主的偏爱记录',
      tabLabels: ['橱窗', '想要', '偏爱单', '我们'],
      searchToast: '公主想要的，都在下面啦',
      basketName: '想要清单',
      valueName: '心意预算',
      sendText: '告诉仆人',
      sentToast: '仆人知道啦，公主等我~',
      receivedText: '仆人记住啦',
      recordTitle: '公主的偏爱记录',
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
      switchToast: '小狗来啦，姐姐~',
      addCartToast: '小狗先替姐姐收进指令册了~',
      removeToast: '小狗替姐姐拿掉了~',
      selectToast: '小狗看到姐姐选的指令了~',
      unselectToast: '小狗知道这条先不执行~',
      selectAllToast: '小狗把这些指令都记下了，姐姐~',
      unselectAllToast: '小狗知道这次先不选了，姐姐~',
      avatarSavedToast: '小狗记住姐姐的新头像了~',
      avatarFailedToast: '小狗这次没换好，姐姐再选一张吧~',
      chooseOptionToast: '小狗还不知道姐姐选哪一种，姐姐~',
      emptySubmitToast: '小狗还没看到姐姐选的指令~',
      loadFailedToast: '小狗这次没打开，姐姐再试一次~',
      saveFailedToast: '小狗这次没记好，姐姐再吩咐一次~',
      feedbackRequiredToast: '小狗在等姐姐写下验收~',
      voucherComingToast: '小狗还在替姐姐准备新的专属券~',
      quantityLimitToast: '小狗这次先记这么多，姐姐~',
      quantityLimitTitle: '小狗先记到这里了~',
      quantityLimitContent: '这次先执行 {count} 条一样的指令',
      quantityLimitConfirm: '就这样',
      removeConfirmText: '小狗把这条指令从指令册拿掉吗，姐姐？',
      removeConfirmButton: '拿掉',
      removeCancelButton: '先留着',
      categoryTitle: '姐姐指令',
      cartTitle: '姐姐的指令册',
      listTitle: '姐姐的指令',
      detailTitle: '姐姐指令',
      orderPageTitle: '姐姐的指令记录',
      tabLabels: ['专属', '指令', '指令册', '我们'],
      searchToast: '姐姐想吩咐的，都在下面',
      basketName: '指令册',
      valueName: '听话值',
      sendText: '吩咐小狗',
      sentToast: '小狗知道了，姐姐~',
      receivedText: '小狗已领命',
      recordTitle: '姐姐的指令记录',
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
      personaLabel: persona.label,
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
