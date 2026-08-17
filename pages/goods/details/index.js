import Toast from 'tdesign-miniprogram/toast/index';
import { fetchGood } from '../../../services/good/fetchGood';

import { cdnBase } from '../../../config/index';
import { isInteractionPersona, syncPersonaPage } from '../../../utils/personas';
import { addPersonaCartItem } from '../../../utils/persona-cart';

const imgPrefix = `${cdnBase}/`;

const recLeftImg = `${imgPrefix}common/rec-left.png`;
const recRightImg = `${imgPrefix}common/rec-right.png`;
const obj2Params = (obj = {}, encode = false) => {
  const result = [];
  Object.keys(obj).forEach((key) => result.push(`${key}=${encode ? encodeURIComponent(obj[key]) : obj[key]}`));

  return result.join('&');
};

Page({
  data: {
    commentsList: [],
    commentsStatistics: {
      badCount: 0,
      commentCount: 0,
      goodCount: 0,
      goodRate: 0,
      hasImageCount: 0,
      middleCount: 0,
    },
    isShowPromotionPop: false,
    activityList: [],
    recLeftImg,
    recRightImg,
    details: {},
    intro: '',
    goodsTabArray: [
      {
        name: '内容',
        value: '', // 空字符串代表置顶
      },
      {
        name: '详情',
        value: 'goods-page',
      },
    ],
    storeLogo: `${imgPrefix}common/store-logo.png`,
    storeName: '我们的小屋',
    jumpArray: [
      {
        title: '小屋',
        url: '/pages/home/home',
        iconName: 'home',
      },
      {
        title: '清单',
        url: '/pages/cart/index',
        iconName: 'cart',
        showCartNum: true,
      },
    ],
    isStock: true,
    cartNum: 0,
    soldout: false,
    buttonType: 1,
    buyNum: 1,
    selectedAttrStr: '',
    selectedSpecInfo: [],
    selectItem: null,
    skuArray: [],
    primaryImage: '',
    specImg: '',
    isSpuSelectPopupShow: false,
    isAllSelectedSku: false,
    buyType: 0,
    outOperateStatus: false, // 是否外层加入购物车
    operateType: 0,
    selectSkuSellsPrice: 0,
    maxLinePrice: 0,
    minSalePrice: 0,
    maxSalePrice: 0,
    list: [],
    spuId: '',
    navigation: { type: 'fraction' },
    current: 0,
    autoplay: true,
    duration: 500,
    interval: 5000,
    soldNum: 0,
    currentPersona: '',
    isTeacher: false,
    isInteractionPersona: false,
    personaUi: {},
  },

  handlePopupHide() {
    this.setData({
      isSpuSelectPopupShow: false,
    });
  },

  showSkuSelectPopup(type) {
    this.setData({
      buyType: type || 0,
      outOperateStatus: type >= 1,
      isSpuSelectPopupShow: true,
    });
  },

  buyItNow() {
    this.showSkuSelectPopup(1);
  },

  toAddCart() {
    this.showSkuSelectPopup(2);
  },

  toNav(e) {
    const { url } = e.detail;
    wx.switchTab({
      url: url,
    });
  },

  showCurImg(e) {
    const { index } = e.detail;
    const { images } = this.data.details;
    wx.previewImage({
      current: images[index],
      urls: images, // 需要预览的图片http链接列表
    });
  },

  onPageScroll({ scrollTop }) {
    const goodsTab = this.selectComponent('#goodsTab');
    goodsTab && goodsTab.onScroll(scrollTop);
  },

  chooseSpecItem(e) {
    const { specList } = this.data.details;
    const { selectedSku, isAllSelectedSku } = e.detail;
    if (!isAllSelectedSku) {
      this.setData({
        selectSkuSellsPrice: 0,
      });
    }
    this.setData({
      isAllSelectedSku,
    });
    this.getSkuItem(specList, selectedSku);
  },

  getSkuItem(specList, selectedSku) {
    const { skuArray, primaryImage } = this.data;
    const normalizedSelection = selectedSku || {};
    const selectedSkuValues = this.getSelectedSkuValues(specList, normalizedSelection);
    const selectedAttrStr = selectedSkuValues.length
      ? ` 件，${selectedSkuValues.map((item) => item.specValue).join('，')}`
      : '';
    const skuItem = skuArray.find((item) =>
      (item.specInfo || []).every(
        (subItem) => normalizedSelection[subItem.specId] === subItem.specValueId,
      ),
    );
    const selectedSpecInfo = selectedSkuValues.map((item) => ({
      specId: item.specId,
      specTitle: item.specTitle,
      specValueId: item.specValueId,
      specValue: item.specValue,
    }));
    this.selectSpecsName(selectedSkuValues.length > 0 ? selectedAttrStr : '');
    if (skuItem) {
      this.setData({
        selectItem: skuItem,
        selectSkuSellsPrice: skuItem.price || 0,
        selectedSpecInfo,
      });
    } else {
      this.setData({
        selectItem: null,
        selectSkuSellsPrice: 0,
        selectedSpecInfo: [],
      });
    }
    this.setData({
      specImg: skuItem && skuItem.skuImage ? skuItem.skuImage : primaryImage,
    });
  },

  // 获取已选择的sku名称
  getSelectedSkuValues(skuTree, selectedSku) {
    const normalizedTree = this.normalizeSkuTree(skuTree);
    return Object.keys(selectedSku).reduce((selectedValues, skuKeyStr) => {
      const skuValues = normalizedTree[skuKeyStr];
      const skuValueId = selectedSku[skuKeyStr];
      if (skuValueId !== '') {
        const skuValue = (skuValues || []).find((value) => value.specValueId === skuValueId);
        const spec = skuTree.find((item) => item.specId === skuKeyStr);
        if (skuValue) {
          selectedValues.push({
            ...skuValue,
            specId: skuKeyStr,
            specTitle: spec ? spec.title : '',
          });
        }
      }
      return selectedValues;
    }, []);
  },

  normalizeSkuTree(skuTree) {
    const normalizedTree = {};
    skuTree.forEach((treeItem) => {
      normalizedTree[treeItem.specId] = treeItem.specValueList;
    });
    return normalizedTree;
  },

  selectSpecsName(selectSpecsName) {
    if (selectSpecsName) {
      this.setData({
        selectedAttrStr: selectSpecsName,
      });
    } else {
      this.setData({
        selectedAttrStr: '',
      });
    }
  },

  addCart() {
    const { isAllSelectedSku } = this.data;
    if (isAllSelectedSku && this.data.isInteractionPersona) {
      addPersonaCartItem(
        this.data.currentPersona,
        this.data.spuId,
        this.data.buyNum,
        this.data.selectedSpecInfo,
      );
      this.handlePopupHide();
    }
    Toast({
      context: this,
      selector: '#t-toast',
      message: isAllSelectedSku
        ? this.data.isInteractionPersona
          ? this.data.personaUi.addCartToast
          : '已加入清单'
        : this.data.isInteractionPersona
          ? this.data.personaUi.chooseOptionToast
          : '请选择规格',
      icon: '',
      duration: 1000,
    });
  },

  gotoBuy() {
    const { isAllSelectedSku, buyNum } = this.data;
    if (!isAllSelectedSku) {
      Toast({
        context: this,
        selector: '#t-toast',
        message: this.data.isInteractionPersona ? this.data.personaUi.chooseOptionToast : '请选择规格',
        icon: '',
        duration: 1000,
      });
      return;
    }
    if (this.data.isInteractionPersona) {
      addPersonaCartItem(
        this.data.currentPersona,
        this.data.spuId,
        buyNum,
        this.data.selectedSpecInfo,
      );
      this.handlePopupHide();
      wx.switchTab({ url: '/pages/cart/index' });
      return;
    }
    this.handlePopupHide();
    const query = {
      quantity: buyNum,
      storeId: '1',
      spuId: this.data.spuId,
      goodsName: this.data.details.title,
      skuId: this.data.selectItem ? this.data.selectItem.skuId : this.data.details.skuList[0].skuId,
      available: this.data.details.available,
      price: this.data.details.minSalePrice,
      specInfo: this.data.selectedSpecInfo,
      primaryImage: this.data.details.primaryImage,
      spuId: this.data.details.spuId,
      thumb: this.data.details.primaryImage,
      title: this.data.details.title,
    };
    let urlQueryStr = obj2Params({
      goodsRequestList: JSON.stringify([query]),
    });
    urlQueryStr = urlQueryStr ? `?${urlQueryStr}` : '';
    const path = `/pages/order/order-confirm/index${urlQueryStr}`;
    wx.navigateTo({
      url: path,
    });
  },

  specsConfirm() {
    const { buyType } = this.data;
    if (buyType === 1) {
      this.gotoBuy();
    } else {
      this.addCart();
    }
    // this.handlePopupHide();
  },

  changeNum(e) {
    this.setData({
      buyNum: e.detail.buyNum,
    });
  },

  closePromotionPopup() {
    this.setData({
      isShowPromotionPop: false,
    });
  },

  promotionChange(e) {
    const { index } = e.detail;
    wx.navigateTo({
      url: `/pages/promotion/promotion-detail/index?promotion_id=${index}`,
    });
  },

  showPromotionPopup() {
    this.setData({
      isShowPromotionPop: true,
    });
  },

  getDetail(spuId) {
    fetchGood(spuId, this.data.currentPersona).then((details) => {
      const skuArray = [];
      const { skuList, primaryImage, isPutOnSale, minSalePrice, maxSalePrice, maxLinePrice, soldNum } = details;
      skuList.forEach((item) => {
        const priceInfo = (item.priceInfo || []).find((priceItem) => priceItem.priceType === 1);
        skuArray.push({
          skuId: item.skuId,
          quantity: item.stockInfo ? item.stockInfo.stockQuantity : 0,
          specInfo: item.specInfo,
          price: priceInfo ? priceInfo.price : minSalePrice,
          skuImage: item.skuImage,
        });
      });
      this.setData({
        details,
        intro: details.etitle || '',
        activityList: [],
        isStock: details.spuStockQuantity > 0,
        maxSalePrice: maxSalePrice ? parseInt(maxSalePrice) : 0,
        maxLinePrice: maxLinePrice ? parseInt(maxLinePrice) : 0,
        minSalePrice: minSalePrice ? parseInt(minSalePrice) : 0,
        list: [],
        skuArray: skuArray,
        primaryImage,
        soldout: isPutOnSale === 0,
        soldNum,
        selectedAttrStr: '',
        selectedSpecInfo: [],
        selectItem: null,
      });
    });
  },

  onShareAppMessage() {
    // 自定义的返回信息
    const { selectedAttrStr } = this.data;
    let shareSubTitle = '';
    if (selectedAttrStr.indexOf('件') > -1) {
      const count = selectedAttrStr.indexOf('件');
      shareSubTitle = selectedAttrStr.slice(count + 1, selectedAttrStr.length);
    }
    const customInfo = {
      imageUrl: this.data.details.primaryImage,
      title: this.data.details.title + shareSubTitle,
      path: `/pages/goods/details/index?spuId=${this.data.spuId}`,
    };
    return customInfo;
  },

  /** 跳转到评价列表 */
  navToCommentsListPage() {
    wx.navigateTo({
      url: `/pages/goods/comments/index?spuId=${this.data.spuId}&title=${encodeURIComponent(
        this.data.details.title || '',
      )}&imgUrl=${encodeURIComponent(this.data.primaryImage || '')}`,
    });
  },

  onLoad(query) {
    const { spuId } = query;
    const persona = syncPersonaPage(this);
    wx.setNavigationBarTitle({ title: persona.ui.detailTitle });
    const interactionMode = isInteractionPersona(persona.key);
    this.setData({
      spuId: spuId,
      currentPersona: persona.key,
      isTeacher: persona.key === 'teacher',
      isInteractionPersona: interactionMode,
      personaUi: persona.ui,
      jumpArray:
        interactionMode
          ? [
              { title: '小屋', url: '/pages/home/home', iconName: 'home' },
              { title: persona.ui.basketName, url: '/pages/cart/index', iconName: 'cart', showCartNum: true },
            ]
          : this.data.jumpArray,
    });
    this.getDetail(spuId);
  },
});
