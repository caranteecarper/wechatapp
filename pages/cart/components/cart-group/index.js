import Toast from 'tdesign-miniprogram/toast/index';
import { isInteractionPersona } from '../../../../utils/personas';

const shortageImg = 'https://tdesign.gtimg.com/miniprogram/template/retail/cart/shortage.png';

Component({
  isSpecsTap: false, // 标记本次点击事件是否因为点击specs触发（由于底层goods-card组件没有catch specs点击事件，只能在此处加状态来避免点击specs时触发跳转商品详情）
  externalClasses: ['wr-class'],
  properties: {
    storeGoods: {
      type: Array,
      observer(storeGoods) {
        for (const store of storeGoods) {
          for (const activity of store.promotionGoodsList) {
            for (const goods of activity.goodsPromotionList) {
              goods.specs = goods.specInfo.map((item) => item.specValue); // 目前仅展示商品已选规格的值
            }
          }
          for (const goods of store.shortageGoodsList) {
            goods.specs = goods.specInfo.map((item) => item.specValue); // 目前仅展示商品已选规格的值
          }
        }

        this.setData({ _storeGoods: storeGoods });
      },
    },
    invalidGoodItems: {
      type: Array,
      observer(invalidGoodItems) {
        invalidGoodItems.forEach((goods) => {
          goods.specs = goods.specInfo.map((item) => item.specValue); // 目前仅展示商品已选规格的值
        });
        this.setData({ _invalidGoodItems: invalidGoodItems });
      },
    },
    thumbWidth: { type: null },
    thumbHeight: { type: null },
    theme: {
      type: String,
      value: '',
    },
  },

  data: {
    shortageImg,
    isShowSpecs: false,
    currentGoods: {},
    isShowToggle: false,
    _storeGoods: [],
    _invalidGoodItems: [],
  },

  methods: {
    // 删除商品
    deleteGoods(e) {
      const { goods } = e.currentTarget.dataset;
      this.triggerEvent('delete', { goods });
    },

    // 清空失效商品
    clearInvalidGoods() {
      this.triggerEvent('clearinvalidgoods');
    },

    // 选中商品
    selectGoods(e) {
      const { goods } = e.currentTarget.dataset;
      this.triggerEvent('selectgoods', {
        goods,
        isSelected: !goods.isSelected,
      });
    },

    changeQuantity(num, goods) {
      this.triggerEvent('changequantity', {
        goods,
        quantity: num,
      });
    },
    changeStepper(e) {
      const { value } = e.detail;
      const { goods } = e.currentTarget.dataset;
      let num = value;
      if (value > goods.stack) {
        num = goods.stack;
      }
      this.changeQuantity(num, goods);
    },

    input(e) {
      const { value } = e.detail;
      const { goods } = e.currentTarget.dataset;
      const num = value;
      this.changeQuantity(num, goods);
    },

    overlimit(e) {
      const copy = {
        teacher: {
          minus: '这一条先留着，姐姐',
          plus: '这些小狗先记住，姐姐想加再加',
        },
        baby: {
          minus: '至少留一个嘛，宝宝想知道你要什么~',
          plus: '这些宝宝先做，想要更多再告诉宝宝~',
        },
        princess: {
          minus: '公主至少留一个，仆人才知道准备什么',
          plus: '这些仆人先准备，公主想加再加',
        },
      }[this.properties.theme] || {
        minus: '至少保留一项',
        plus: '这次先选这么多',
      };
      const text = e.detail.type === 'minus' ? copy.minus : copy.plus;
      Toast({
        context: this,
        selector: '#t-toast',
        message: text,
      });
    },

    // 继续选择内容
    gotoBuyMore(e) {
      if (isInteractionPersona(this.properties.theme)) {
        const message = {
          teacher: '小狗收好了，等姐姐吩咐',
          baby: '宝宝收好啦，等你来要~',
          princess: '仆人收好了，公主想要再来挑',
        }[this.properties.theme];
        Toast({
          context: this,
          selector: '#t-toast',
          message,
        });
        return;
      }
      const { promotion, storeId = '' } = e.currentTarget.dataset;
      this.triggerEvent('gocollect', { promotion, storeId });
    },

    // 选中门店
    selectStore(e) {
      const { storeIndex } = e.currentTarget.dataset;
      const store = this.data.storeGoods[storeIndex];
      const isSelected = !store.isSelected;
      if (store.storeStockShortage && isSelected) {
        Toast({
          context: this,
          selector: '#t-toast',
          message: isInteractionPersona(this.properties.theme)
            ? {
                teacher: '这几条小狗今天接不了，姐姐换几条',
                baby: '这几个想要宝宝今天做不了，换几个好不好~',
                princess: '这几样今天准备不了，公主换几个',
              }[this.properties.theme]
            : '部分商品库存不足',
        });
        return;
      }
      this.triggerEvent('selectstore', {
        store,
        isSelected,
      });
    },

    // 展开/收起切换
    showToggle() {
      this.setData({
        isShowToggle: !this.data.isShowToggle,
      });
    },

    // 展示规格popup
    specsTap(e) {
      this.isSpecsTap = true;
      const { goods } = e.currentTarget.dataset;
      this.setData({
        isShowSpecs: true,
        currentGoods: goods,
      });
    },

    hideSpecsPopup() {
      this.setData({
        isShowSpecs: false,
      });
    },

    goGoodsDetail(e) {
      if (this.isSpecsTap) {
        this.isSpecsTap = false;
        return;
      }
      const { goods } = e.currentTarget.dataset;
      this.triggerEvent('goodsclick', { goods });
    },

    gotoCoupons() {
      if (isInteractionPersona(this.properties.theme)) {
        const message = {
          teacher: '这句暗号，只留给我们知道',
          baby: '这个抱抱暗号，只给我们知道',
          princess: '这一份偏爱，只留在我们两个人这里',
        }[this.properties.theme];
        Toast({
          context: this,
          selector: '#t-toast',
          message,
        });
        return;
      }
      wx.navigateTo({ url: '/pages/coupon/coupon-list/index' });
    },
  },
});
