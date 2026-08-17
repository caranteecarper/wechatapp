import { mockIp, mockReqId } from '../../../utils/mock';
import { getPersonaContent } from '../../../model/persona-content';

export const transformGoodsDataToConfirmData = (goodsDataList) =>
  goodsDataList.map((goodsData) => ({
    storeId: goodsData.storeId,
    spuId: goodsData.spuId,
    skuId: goodsData.skuId,
    goodsName: goodsData.title,
    image: goodsData.primaryImage,
    reminderStock: 119,
    quantity: goodsData.quantity,
    payPrice: goodsData.price,
    totalSkuPrice: goodsData.price,
    discountSettlePrice: goodsData.price,
    realSettlePrice: goodsData.price,
    settlePrice: goodsData.price,
    oriPrice: goodsData.originPrice,
    tagPrice: null,
    tagText: null,
    skuSpecLst: goodsData.specInfo,
    promotionIds: null,
    weight: 0,
    unit: 'KG',
    volume: null,
    masterGoodsType: 0,
    viceGoodsType: 0,
    roomId: goodsData.roomId,
    egoodsName: null,
  }));

export function genSettleDetail(params, persona = '') {
  const { userAddressReq, couponList, goodsRequestList } = params;
  const personaSystem = getPersonaContent(persona);
  const resp = {
    data: {
      settleType: 0,
      userAddress: null,
      totalGoodsCount: 3,
      packageCount: 1,
      totalAmount: '289997',
      totalPayAmount: '',
      totalDiscountAmount: '110000',
      totalPromotionAmount: '1100',
      totalCouponAmount: '0',
      totalSalePrice: '289997',
      totalGoodsAmount: '289997',
      totalDeliveryFee: '0',
      invoiceRequest: null,
      skuImages: null,
      deliveryFeeList: null,
      storeGoodsList: [
        {
          storeId: '1000',
          storeName: '云Mall深圳旗舰店',
          remark: null,
          goodsCount: 1,
          deliveryFee: '0',
          deliveryWords: null,
          storeTotalAmount: '0',
          storeTotalPayAmount: '179997',
          storeTotalDiscountAmount: '110000',
          storeTotalCouponAmount: '0',
          skuDetailVos: [],
          couponList: [{ couponId: 11, storeId: '1000' }],
        },
      ],
      inValidGoodsList: null,
      outOfStockGoodsList: null,
      limitGoodsList: null,
      abnormalDeliveryGoodsList: null,
      invoiceSupport: 1,
    },
    code: 'Success',
    msg: null,
    requestId: mockReqId(),
    clientIp: mockIp(),
    rt: 244,
    success: true,
  };

  const list = transformGoodsDataToConfirmData(goodsRequestList);
  resp.data.storeGoodsList[0].skuDetailVos = list;

  const discountPrice = [];
  if (couponList?.length) {
    couponList.forEach((coupon) => {
      if (coupon.status === 'default') {
        discountPrice.push({ type: coupon.type, value: coupon.value });
      }
    });
  }

  const totalPrice = list.reduce((total, item) => total + item.quantity * Number(item.settlePrice), 0);
  const totalDiscountPrice = discountPrice.reduce((total, discount) => {
    if (discount.type === 1) return total + discount.value;
    if (discount.type === 2) return total + (Number(totalPrice) * discount.value) / 10;
    return total;
  }, 0);

  resp.data.totalSalePrice = totalPrice;
  resp.data.totalCouponAmount = totalDiscountPrice;
  resp.data.totalPayAmount = totalPrice - totalDiscountPrice - Number(resp.data.totalPromotionAmount);

  if (personaSystem) {
    const store = resp.data.storeGoodsList[0];
    const storeName = params.storeInfoList?.[0]?.storeName || personaSystem.getCartData().storeGoods[0].storeName;
    const totalGoodsCount = list.reduce((total, item) => total + Number(item.quantity || 0), 0);
    Object.assign(resp.data, {
      settleType: 1,
      userAddress: null,
      totalGoodsCount,
      totalAmount: totalPrice.toString(),
      totalSalePrice: totalPrice.toString(),
      totalGoodsAmount: totalPrice.toString(),
      totalPayAmount: totalPrice.toString(),
      totalDiscountAmount: '0',
      totalPromotionAmount: '0',
      totalCouponAmount: '0',
      totalDeliveryFee: '0',
      invoiceSupport: 0,
    });
    Object.assign(store, {
      storeName,
      goodsCount: totalGoodsCount,
      storeTotalAmount: totalPrice.toString(),
      storeTotalPayAmount: totalPrice.toString(),
      storeTotalDiscountAmount: '0',
      storeTotalCouponAmount: '0',
      couponList: [],
    });
    return resp;
  }

  if (userAddressReq) {
    resp.data.settleType = 1;
    resp.data.userAddress = userAddressReq;
  }
  return resp;
}
