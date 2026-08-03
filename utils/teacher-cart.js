import { getTeacherCartData, getTeacherCartLine } from '../model/teacher';

const cacheKey = 'love.cart.teacher';

function getCartData() {
  return wx.getStorageSync(cacheKey) || getTeacherCartData();
}

export function addTeacherCartItem(spuId, quantity = 1, specInfo) {
  const cartData = getCartData();
  const store = cartData.storeGoods[0];
  const promotion = store.promotionGoodsList[0];
  const current = promotion.goodsPromotionList.find((item) => item.spuId === spuId);

  if (current) {
    current.quantity += quantity;
    current.isSelected = 1;
  } else {
    const next = getTeacherCartLine(spuId, specInfo);
    next.quantity = quantity;
    promotion.goodsPromotionList.push(next);
  }

  cartData.isNotEmpty = true;
  wx.setStorageSync(cacheKey, cartData);
  return cartData;
}
