import { getPersonaContent } from '../model/persona-content';

const CART_CACHE_VERSIONS = {
  baby: 4,
  princess: 5,
  teacher: 5,
};
const getCacheKey = (persona) => `love.cart.${persona}`;
const getCacheVersionKey = (persona) => `love.cart.version.${persona}`;
const getCacheVersion = (persona) => CART_CACHE_VERSIONS[persona] || 3;

export function readPersonaCartCache(persona) {
  if (wx.getStorageSync(getCacheVersionKey(persona)) !== getCacheVersion(persona)) {
    return null;
  }
  return wx.getStorageSync(getCacheKey(persona)) || null;
}

export function writePersonaCartCache(persona, cartData) {
  wx.setStorageSync(getCacheKey(persona), cartData);
  wx.setStorageSync(getCacheVersionKey(persona), getCacheVersion(persona));
}

function getCartData(persona) {
  const system = getPersonaContent(persona);
  if (!system) return null;
  return readPersonaCartCache(persona) || system.getCartData();
}

export function addPersonaCartItem(persona, spuId, quantity = 1, specInfo) {
  const system = getPersonaContent(persona);
  const cartData = getCartData(persona);
  if (!system || !cartData) return null;

  const store = cartData.storeGoods[0];
  const promotion = store.promotionGoodsList[0];
  const next = system.getCartLine(spuId, specInfo);
  const current = promotion.goodsPromotionList.find(
    (item) => item.spuId === spuId && item.skuId === next.skuId,
  );

  if (current) {
    current.quantity += quantity;
    current.isSelected = 1;
  } else {
    next.quantity = quantity;
    promotion.goodsPromotionList.push(next);
  }

  cartData.isNotEmpty = true;
  writePersonaCartCache(persona, cartData);
  return cartData;
}

export function removePersonaCartItems(persona, goodsList = []) {
  const cartData = getCartData(persona);
  if (!cartData || !Array.isArray(goodsList) || goodsList.length === 0) return cartData;

  const submittedItems = new Set(
    goodsList.map((goods) => `${goods.spuId || ''}:${goods.skuId || ''}`),
  );
  cartData.storeGoods.forEach((store) => {
    store.promotionGoodsList.forEach((promotion) => {
      promotion.goodsPromotionList = promotion.goodsPromotionList.filter(
        (goods) => !submittedItems.has(`${goods.spuId || ''}:${goods.skuId || ''}`),
      );
    });
  });
  cartData.isNotEmpty = cartData.storeGoods.some((store) =>
    store.promotionGoodsList.some((promotion) => promotion.goodsPromotionList.length > 0),
  );
  writePersonaCartCache(persona, cartData);
  return cartData;
}
