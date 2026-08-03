Component({
  properties: {
    imgUrl: {
      type: String,
      value: 'https://tdesign.gtimg.com/miniprogram/template/retail/template/empty-cart.png',
    },
    tip: {
      type: String,
      value: '今日心愿篮还是空的',
    },
    btnText: {
      type: String,
      value: '去写心愿',
    },
    theme: {
      type: String,
      value: '',
    },
  },
  data: {},
  methods: {
    handleClick() {
      this.triggerEvent('handleClick');
    },
  },
});
