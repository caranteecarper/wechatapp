import { OrderStatus } from '../config';
import { fetchOrders, fetchOrdersCount } from '../../../services/order/orderList';
import { getPersonaUi, isInteractionPersona, syncPersonaPage } from '../../../utils/personas';

const getOrderTabs = (persona = '') => [
  { key: -1, text: '全部' },
  { key: OrderStatus.PENDING_PAYMENT, text: '待回应', info: '' },
  {
    key: OrderStatus.PENDING_DELIVERY,
    text: getPersonaUi(persona).receivedText,
    info: '',
  },
  {
    key: OrderStatus.PENDING_RECEIPT,
    text: { teacher: '执行中', baby: '哄哄中', princess: '准备偏爱' }[persona] || '兑现中',
    info: '',
  },
  {
    key: OrderStatus.COMPLETE,
    text: { teacher: '已完成', baby: '已抱好', princess: '公主收到啦' }[persona] || '已兑现',
    info: '',
  },
];

Page({
  page: {
    size: 5,
    num: 1,
  },

  data: {
    tabs: getOrderTabs(),
    curTab: -1,
    orderList: [],
    listLoading: 0,
    pullDownRefreshing: false,
    emptyImg: 'https://tdesign.gtimg.com/miniprogram/template/retail/order/empty-order-list.png',
    backRefresh: false,
    status: -1,
    currentPersona: '',
    isTeacher: false,
    isInteractionPersona: false,
    personaUi: {},
  },

  onLoad(query) {
    const persona = syncPersonaPage(this);
    wx.setNavigationBarTitle({ title: persona.ui.orderPageTitle });
    const tabs = getOrderTabs(persona.key);
    let status = parseInt(query.status);
    status = tabs.map((t) => t.key).includes(status) ? status : -1;
    this.setData(
      {
        tabs,
        currentPersona: persona.key,
        isTeacher: persona.key === 'teacher',
        isInteractionPersona: isInteractionPersona(persona.key),
        personaUi: persona.ui,
      },
      () => this.init(status),
    );
    this.pullDownRefresh = this.selectComponent('#wr-pull-down-refresh');
  },

  onShow() {
    const previousPersona = this.data.currentPersona;
    const persona = syncPersonaPage(this);
    wx.setNavigationBarTitle({ title: persona.ui.orderPageTitle });
    if (previousPersona && previousPersona !== persona.key) {
      this.setData(
        {
          tabs: getOrderTabs(persona.key),
          currentPersona: persona.key,
          isTeacher: persona.key === 'teacher',
          isInteractionPersona: isInteractionPersona(persona.key),
          personaUi: persona.ui,
        },
        () => this.init(-1),
      );
      return;
    }
    if (!this.data.backRefresh) return;
    this.onRefresh();
    this.setData({ backRefresh: false });
  },

  onReachBottom() {
    if (this.data.listLoading === 0) {
      this.getOrderList(this.data.curTab);
    }
  },

  onPageScroll(e) {
    this.pullDownRefresh && this.pullDownRefresh.onPageScroll(e);
  },

  onPullDownRefresh_() {
    this.setData({ pullDownRefreshing: true });
    this.refreshList(this.data.curTab)
      .then(() => {
        this.setData({ pullDownRefreshing: false });
      })
      .catch((err) => {
        this.setData({ pullDownRefreshing: false });
        Promise.reject(err);
      });
  },

  init(status) {
    status = status !== undefined ? status : this.data.curTab;
    this.setData({
      status,
    });
    this.refreshList(status);
  },

  getOrderList(statusCode = -1, reset = false) {
    const params = {
      parameter: {
        pageSize: this.page.size,
        pageNum: this.page.num,
      },
    };
    if (statusCode !== -1) params.parameter.orderStatus = statusCode;
    this.setData({ listLoading: 1 });
    return fetchOrders(params, this.data.currentPersona)
      .then((res) => {
        this.page.num++;
        let orderList = [];
        if (res && res.data && res.data.orders) {
          orderList = (res.data.orders || []).map((order) => {
            return {
              id: order.orderId,
              orderNo: order.orderNo,
              parentOrderNo: order.parentOrderNo,
              storeId: order.storeId,
              storeName: order.storeName,
              status: order.orderStatus,
              statusDesc: order.orderStatusName,
              amount: order.paymentAmount,
              totalAmount: order.totalAmount,
              logisticsNo: order.logisticsVO?.logisticsNo || '',
              createTime: order.createTime,
              goodsList: (order.orderItemVOs || []).map((goods) => ({
                id: goods.id,
                thumb: goods.goodsPictureUrl,
                title: goods.goodsName,
                skuId: goods.skuId,
                spuId: goods.spuId,
                specs: (goods.specifications || []).map((spec) => spec.specValue),
                price: goods.tagPrice ? goods.tagPrice : goods.actualPrice,
                num: goods.buyQuantity,
                titlePrefixTags: goods.tagText ? [{ text: goods.tagText }] : [],
              })),
              buttons: order.buttonVOs || [],
              groupInfoVo: order.groupInfoVo,
              freightFee: order.freightFee,
            };
          });
        }
        return new Promise((resolve) => {
          if (reset) {
            this.setData({ orderList: [] }, () => resolve());
          } else resolve();
        }).then(() => {
          this.setData({
            orderList: this.data.orderList.concat(orderList),
            listLoading: orderList.length > 0 ? 0 : 2,
          });
        });
      })
      .catch((err) => {
        this.setData({ listLoading: 3 });
        return Promise.reject(err);
      });
  },

  onReTryLoad() {
    this.getOrderList(this.data.curTab);
  },

  onTabChange(e) {
    const { value } = e.detail;
    this.setData({
      status: value,
    });
    this.refreshList(value);
  },

  getOrdersCount() {
    return fetchOrdersCount(null, this.data.currentPersona).then((res) => {
      const tabsCount = res.data || [];
      const { tabs } = this.data;
      tabs.forEach((tab) => {
        const tabCount = tabsCount.find((c) => c.tabType === tab.key);
        if (tabCount) {
          tab.info = tabCount.orderNum;
        }
      });
      this.setData({ tabs });
    });
  },

  refreshList(status = -1) {
    this.page = {
      size: this.page.size,
      num: 1,
    };
    this.setData({ curTab: status, orderList: [] });

    return Promise.all([this.getOrderList(status, true), this.getOrdersCount()]);
  },

  onRefresh() {
    this.refreshList(this.data.curTab);
  },

  onOrderCardTap(e) {
    const { order } = e.currentTarget.dataset;
    this.setData({ backRefresh: true });
    wx.navigateTo({
      url: `/pages/order/order-detail/index?orderNo=${order.orderNo}`,
    });
  },
});
