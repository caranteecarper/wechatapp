import { fetchUserCenter } from '../../services/usercenter/fetchUsercenter';
import { fetchOrdersCount } from '../../services/order/orderList';
import Toast from 'tdesign-miniprogram/toast/index';
import { getPersonaContent } from '../../model/persona-content';
import { isInteractionPersona, syncPersonaPage } from '../../utils/personas';

const menuData = [
  [
    {
      title: '我的小档案',
      tit: '',
      url: '',
      type: 'address',
    },
    {
      title: '纪念日',
      tit: '',
      url: '',
      type: 'coupon',
    },
    {
      title: '专属暗号',
      tit: '',
      url: '',
      type: 'point',
    },
  ],
  [
    {
      title: '悄悄话说明',
      tit: '',
      url: '',
      type: 'help-center',
    },
    {
      title: '联系我',
      tit: '',
      url: '',
      type: 'service',
      icon: 'service',
    },
  ],
];

const orderTagInfos = [
  {
    title: '待回应',
    iconName: 'wallet',
    orderNum: 0,
    tabType: 5,
    status: 1,
  },
  {
    title: '已收到',
    iconName: 'deliver',
    orderNum: 0,
    tabType: 10,
    status: 1,
  },
  {
    title: '兑现中',
    iconName: 'package',
    orderNum: 0,
    tabType: 40,
    status: 1,
  },
  {
    title: '已兑现',
    iconName: 'comment',
    orderNum: 0,
    tabType: 60,
    status: 1,
  },
  {
    title: '补偿',
    iconName: 'exchang',
    orderNum: 0,
    tabType: 0,
    status: 1,
  },
];

const clone = (data) => JSON.parse(JSON.stringify(data));
const getDefaultMenuData = () => clone(menuData);
const getDefaultOrderTags = () => clone(orderTagInfos);

const getDefaultData = () => ({
  showMakePhone: false,
  userInfo: {
    avatarUrl: '',
    nickName: '宝宝的小屋主人',
    phoneNumber: '',
  },
  menuData: getDefaultMenuData(),
  orderTagInfos: getDefaultOrderTags(),
  customerServiceInfo: {},
  currAuthStep: 1,
  showKefu: true,
  versionNo: '',
  currentPersona: '',
  isTeacher: false,
  isInteractionPersona: false,
  personaUi: {},
});

Page({
  data: getDefaultData(),

  onLoad() {
    this.getVersionInfo();
  },

  onShow() {
    const persona = syncPersonaPage(this);
    const tabBar = this.getTabBar();
    if (tabBar) tabBar.init();
    this.init(persona.key);
  },
  onPullDownRefresh() {
    this.init();
  },

  init(persona = this.data.currentPersona) {
    this.fetUseriInfoHandle(persona);
  },

  fetUseriInfoHandle(persona = this.data.currentPersona) {
    Promise.all([fetchUserCenter(persona), fetchOrdersCount(null, persona)]).then((results) => {
      const [{ userInfo, countsData, orderTagInfos: orderInfo, customerServiceInfo }, orderCountResult] = results;
      const currentOrderInfo = orderCountResult?.data || orderInfo;
      const system = getPersonaContent(persona);
      const activeMenuData = system ? system.getMenuData() : getDefaultMenuData();
      const activeOrderTags = system ? system.getOrderTags() : getDefaultOrderTags();
      const primaryMenu = activeMenuData[0] || [];
      primaryMenu.forEach((v) => {
        countsData.forEach((counts) => {
          if (counts.type === v.type) {
            v.tit = counts.num;
          }
        });
      });
      const info = activeOrderTags.map((v, index) => ({
        ...v,
        ...(currentOrderInfo.find((item) => item.tabType === v.tabType) || currentOrderInfo[index] || {}),
      }));
      this.setData({
        userInfo,
        menuData: activeMenuData,
        orderTagInfos: info,
        customerServiceInfo,
        currAuthStep: 2,
        currentPersona: persona,
        isTeacher: persona === 'teacher',
        isInteractionPersona: isInteractionPersona(persona),
      });
      wx.stopPullDownRefresh();
    });
  },

  onClickCell({ currentTarget }) {
    const { type, groupId = '' } = currentTarget.dataset;

    if (this.data.isInteractionPersona) {
      if (type === 'catalog') {
        wx.navigateTo({ url: `/pages/goods/list/index?groupId=${groupId}` });
        return;
      }
      if (type === 'vouchers') {
        wx.navigateTo({ url: '/pages/coupon/coupon-list/index' });
        return;
      }
      if (type === 'dates') {
        wx.navigateTo({ url: '/pages/promotion/promotion-detail/index' });
        return;
      }
      const message =
        {
          teacher: '小狗在，姐姐想吩咐什么？',
          baby: '宝宝在，今天想要什么抱抱？',
          princess: '仆人在，公主今天想要什么？',
        }[this.data.currentPersona] || this.data.personaUi.receivedText;
      Toast({
        context: this,
        selector: '#t-toast',
        message,
        icon: '',
        duration: 1200,
      });
      return;
    }

    switch (type) {
      case 'address': {
        wx.navigateTo({ url: '/pages/user/person-info/index' });
        break;
      }
      case 'service': {
        this.openMakePhone();
        break;
      }
      case 'help-center': {
        Toast({
          context: this,
          selector: '#t-toast',
          message: '悄悄话只放在我们的小屋里',
          icon: '',
          duration: 1000,
        });
        break;
      }
      case 'point': {
        Toast({
          context: this,
          selector: '#t-toast',
          message: '我们的暗号都放在这里',
          icon: '',
          duration: 1000,
        });
        break;
      }
      case 'coupon': {
        wx.navigateTo({ url: '/pages/coupon/coupon-list/index' });
        break;
      }
      default: {
        Toast({
          context: this,
          selector: '#t-toast',
          message: '这个入口暂时还没准备好',
          icon: '',
          duration: 1000,
        });
        break;
      }
    }
  },

  jumpNav(e) {
    const status = e.detail.tabType;

    if (status === 0) {
      wx.navigateTo({ url: '/pages/order/order-list/index' });
    } else {
      wx.navigateTo({ url: `/pages/order/order-list/index?status=${status}` });
    }
  },

  jumpAllOrder() {
    wx.navigateTo({ url: '/pages/order/order-list/index' });
  },

  openMakePhone() {
    if (this.data.isInteractionPersona) {
      Toast({
        context: this,
        selector: '#t-toast',
        message: this.data.personaUi.noteTitle,
      });
      return;
    }
    this.setData({ showMakePhone: true });
  },

  closeMakePhone() {
    this.setData({ showMakePhone: false });
  },

  call() {
    if (!this.data.customerServiceInfo.servicePhone) {
      Toast({
        context: this,
        selector: '#t-toast',
        message: '这里不用打电话',
      });
      return;
    }
    wx.makePhoneCall({
      phoneNumber: this.data.customerServiceInfo.servicePhone,
    });
  },

  gotoUserEditPage() {
    const { currAuthStep } = this.data;
    if (currAuthStep === 2) {
      wx.navigateTo({ url: '/pages/user/person-info/index' });
    } else {
      this.fetUseriInfoHandle();
    }
  },

  getVersionInfo() {
    const versionInfo = wx.getAccountInfoSync();
    const { version, envVersion = __wxConfig } = versionInfo.miniProgram;
    this.setData({
      versionNo: envVersion === 'release' ? version : envVersion,
    });
  },
});
