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
      switchToast: '宝宝来亲亲你啦~',
      addCartToast: '宝宝收好啦，等你来要~',
      removeToast: '这个宝宝帮你拿掉啦',
      selectToast: '宝宝看到啦，这个想要~',
      unselectToast: '好，这个先不要',
      selectAllToast: '这些宝宝都收到了~',
      unselectAllToast: '好，那就先不选',
      avatarSavedToast: '新头像换好啦，好看~',
      avatarFailedToast: '这张没换上，再挑一张吧',
      chooseOptionToast: '想要哪一种？选给宝宝看~',
      emptySubmitToast: '还没选好想要的呢',
      loadFailedToast: '刚才没打开，再试一次吧',
      saveFailedToast: '宝宝没存好，再来一次',
      feedbackRequiredToast: '先告诉宝宝这次感觉怎么样',
      voucherComingToast: '新的抱抱券还没准备好',
      quantityLimitToast: '一样的先放这些，宝宝记住啦',
      quantityLimitTitle: '先放这些',
      quantityLimitContent: '同一个想要先放 {count} 个',
      quantityLimitConfirm: '就先这些',
      removeConfirmText: '这个先不要了吗？',
      removeConfirmButton: '拿掉吧',
      removeCancelButton: '先留着',
      categoryTitle: '想要',
      cartTitle: '想要清单',
      listTitle: '想要清单',
      detailTitle: '想要详情',
      orderPageTitle: '我们的记录',
      tabLabels: ['小屋', '想要', '清单', '我们'],
      searchToast: '想让宝宝做什么，就在这里挑~',
      basketName: '想要清单',
      valueName: '软糖值',
      sendText: '告诉宝宝',
      sentToast: '宝宝知道啦，来抱抱你~',
      receivedText: '宝宝收到了',
      recordTitle: '我们的记录',
      recordDesc: '宝宝的回应',
      emptyText: '还没有告诉宝宝新的想要',
      noteTitle: '还想对宝宝说',
      notePlaceholder: '比如：今天想让宝宝先抱抱我',
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
      switchToast: '仆人来了，我的小公主',
      addCartToast: '仆人收好了，公主要这个',
      removeToast: '公主不想要了，仆人拿掉了',
      selectToast: '仆人看见了，公主要这个',
      unselectToast: '好，这个先不要',
      selectAllToast: '公主选的，仆人都收好了',
      unselectAllToast: '好，那就先不选',
      avatarSavedToast: '公主的新头像换好了',
      avatarFailedToast: '这张没换上，公主再挑一张',
      chooseOptionToast: '公主要哪一种？',
      emptySubmitToast: '公主还没选想要的',
      loadFailedToast: '刚才没打开，公主再试一次',
      saveFailedToast: '仆人没记住，公主再说一次',
      feedbackRequiredToast: '公主还没告诉仆人开不开心',
      voucherComingToast: '新的偏爱券还没准备好',
      quantityLimitToast: '一样的先准备这些，剩下的仆人下次补上',
      quantityLimitTitle: '先要这些',
      quantityLimitContent: '同一个想要先放 {count} 个',
      quantityLimitConfirm: '就先这些',
      removeConfirmText: '公主确定不要这个了？',
      removeConfirmButton: '拿掉吧',
      removeCancelButton: '先留着',
      categoryTitle: '想要',
      cartTitle: '想要清单',
      listTitle: '公主的偏爱橱窗',
      detailTitle: '想要详情',
      orderPageTitle: '偏爱记录',
      tabLabels: ['橱窗', '想要', '偏爱单', '我们'],
      searchToast: '公主喜欢什么，就在这里挑',
      basketName: '想要清单',
      valueName: '心意预算',
      sendText: '告诉仆人',
      sentToast: '仆人知道了，公主等我',
      receivedText: '仆人收到了',
      recordTitle: '偏爱记录',
      recordDesc: '仆人做到哪了',
      emptyText: '公主还没有告诉仆人新的想要',
      noteTitle: '还想吩咐仆人什么',
      notePlaceholder: '比如：奶茶少冰三分糖，花要粉色',
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
      switchToast: '小狗来了，姐姐',
      addCartToast: '小狗收好了，等姐姐吩咐',
      removeToast: '姐姐不想要这条了，小狗拿掉了',
      selectToast: '小狗看到了，姐姐要这条',
      unselectToast: '知道了，这条先不做',
      selectAllToast: '姐姐选的，小狗都记住了',
      unselectAllToast: '知道了，这次先不选',
      avatarSavedToast: '姐姐的新头像换好了',
      avatarFailedToast: '这张没换上，姐姐再选一张',
      chooseOptionToast: '姐姐想让小狗怎么做？',
      emptySubmitToast: '姐姐还没有选指令',
      loadFailedToast: '刚才没打开，姐姐再试一次',
      saveFailedToast: '小狗没记住，姐姐再吩咐一次',
      feedbackRequiredToast: '姐姐还没写下这次表现',
      voucherComingToast: '新的专属券还没准备好',
      quantityLimitToast: '一样的指令先记这些',
      quantityLimitTitle: '先听这些',
      quantityLimitContent: '这条指令先记 {count} 次',
      quantityLimitConfirm: '就这样',
      removeConfirmText: '姐姐要把这条指令拿掉吗？',
      removeConfirmButton: '拿掉',
      removeCancelButton: '先留着',
      categoryTitle: '指令',
      cartTitle: '指令册',
      listTitle: '姐姐的指令',
      detailTitle: '指令详情',
      orderPageTitle: '执行记录',
      tabLabels: ['专属', '指令', '指令册', '我们'],
      searchToast: '姐姐想让小狗做什么，就在这里选',
      basketName: '指令册',
      valueName: '听话值',
      sendText: '吩咐小狗',
      sentToast: '小狗知道了，姐姐',
      receivedText: '小狗收到了',
      recordTitle: '小狗的执行记录',
      recordDesc: '看看小狗做到哪了',
      emptyText: '姐姐还没有下新的指令',
      noteTitle: '姐姐给小狗的补充要求',
      notePlaceholder: '比如：今晚十点前来找姐姐',
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
