const clone = (data) => JSON.parse(JSON.stringify(data));

export function buildCategoryTree(definitions) {
  return definitions.map(([groupId, name, thumbnail, sections]) => ({
    groupId,
    name,
    thumbnail,
    children: sections.map(([sectionId, sectionName, sectionThumbnail, items]) => ({
      groupId: sectionId,
      name: sectionName,
      thumbnail: sectionThumbnail,
      children: items.map(([itemGroupId, itemName, itemThumbnail, spuId]) => ({
        groupId: itemGroupId,
        name: itemName,
        thumbnail: itemThumbnail,
        spuId: spuId || '',
      })),
    })),
  }));
}

const buildSkuList = ({ id, image, price, specList, priceName }) => {
  const combinations = specList.reduce(
    (result, spec) =>
      result.flatMap((selectedValues) =>
        spec.specValueList.map((value) => [
          ...selectedValues,
          {
            specId: spec.specId,
            specValueId: value.specValueId,
            specValue: value.specValue,
          },
        ]),
      ),
    [[]],
  );

  return combinations.map((specInfo, index) => ({
    skuId: `${id}-sku-${index + 1}`,
    skuImage: image,
    specInfo,
    priceInfo: [{ priceType: 1, price, priceTypeName: priceName }],
    stockInfo: { stockQuantity: 999, safeStockQuantity: 0, soldQuantity: 0 },
  }));
};

const createGood = (definition, priceName, currency) => {
  const {
    id,
    group,
    tier,
    title,
    image,
    price,
    linePrice,
    tags,
    etitle,
    completionMethod,
    soldNum,
    specList = [],
  } = definition;
  return {
    spuId: id,
    group,
    title,
    primaryImage: image,
    images: [image],
    minSalePrice: price,
    minLinePrice: linePrice,
    maxSalePrice: price,
    maxLinePrice: linePrice,
    spuStockQuantity: 999,
    soldNum: soldNum || 1,
    isPutOnSale: 1,
    available: 1,
    limitInfo: [{ text: '' }],
    specList,
    skuList: buildSkuList({ id, image, price, specList, priceName }),
    spuTagList: tags.map((tag, index) => ({ id: `${id}-tag-${index}`, title: tag })),
    desc: [image],
    etitle,
    completionMethod,
    currency: currency || '¥',
    tier,
  };
};

export function createPersonaSystem(config) {
  const goods = config.goods.map((item) => createGood(item, config.priceName, config.currency));
  const getGoodById = (id) => goods.find((item) => item.spuId === `${id}`) || goods[0];

  const cartLine = (id, specInfo) => {
    const good = getGoodById(id);
    const selectedSku = specInfo
      ? good.skuList.find((sku) =>
          specInfo.every((selected) =>
            sku.specInfo.some(
              (value) =>
                value.specValue === selected.specValue &&
                (!selected.specId || value.specId === selected.specId),
            ),
          ),
        )
      : good.skuList[0];
    return {
      uid: `${config.key}-uid`,
      saasId: config.key,
      storeId: config.storeId,
      storeName: config.cart.storeName,
      spuId: good.spuId,
      skuId: (selectedSku || good.skuList[0]).skuId,
      isSelected: 1,
      thumb: good.primaryImage,
      title: good.title,
      primaryImage: good.primaryImage,
      quantity: 1,
      stockStatus: true,
      stockQuantity: 999,
      price: good.minSalePrice,
      originPrice: good.maxLinePrice,
      currency: good.currency,
      tagPrice: null,
      titlePrefixTags: [{ text: good.spuTagList[0].title }],
      specInfo:
        specInfo ||
        good.specList.map((item) => ({
          specTitle: item.title,
          specValue: item.specValueList[0].specValue,
        })),
      joinCartTime: config.cart.joinTime,
      available: 1,
      putOnSale: 1,
      etitle: null,
    };
  };

  const initialCartLines = config.cart.itemIds.map((id) => cartLine(id));
  const totalAmount = initialCartLines.reduce((total, item) => total + Number(item.price) * Number(item.quantity), 0);
  const cartData = {
    isNotEmpty: initialCartLines.length > 0,
    storeGoods: [
      {
        storeId: config.storeId,
        storeName: config.cart.storeName,
        storeStatus: 1,
        totalDiscountSalePrice: config.cart.discountAmount,
        promotionGoodsList: [
          {
            title: config.cart.title,
            promotionCode: config.key.toUpperCase(),
            promotionSubCode: 'PRIVATE',
            promotionId: `${config.key}-private`,
            tagText: [config.cart.tagText],
            promotionStatus: 3,
            tag: config.cart.tag,
            description: config.cart.description,
            doorSillRemain: null,
            isNeedAddOnShop: 0,
            goodsPromotionList: initialCartLines,
            lastJoinTime: config.cart.joinTime,
          },
        ],
        lastJoinTime: config.cart.joinTime,
        postageFreePromotionVo: {},
      },
    ],
    invalidGoodItems: [],
    isAllSelected: true,
    selectedGoodsCount: initialCartLines.length,
    totalAmount: `${totalAmount}`,
    totalDiscountAmount: config.cart.discountAmount,
  };

  const orders = config.orders.map((order, index) => {
    const good = getGoodById(order.goodId);
    return {
      storeId: config.storeId,
      storeName: config.cart.storeName,
      orderId: `${config.key}-order-${index + 1}`,
      orderNo: `${config.orderPrefix}-${index + 1}`,
      parentOrderNo: `${config.orderPrefix}-${index + 1}`,
      orderStatus: order.status,
      orderStatusName: order.statusName,
      totalAmount: order.amount || good.minSalePrice,
      paymentAmount: order.amount || good.minSalePrice,
      freightFee: '0',
      createTime: order.createTime,
      logisticsVO: { logisticsNo: '' },
      buttonVOs: [],
      orderItemVOs: [
        {
          id: `${config.key}-order-${index + 1}-item`,
          spuId: good.spuId,
          skuId: good.skuList[0].skuId,
          goodsName: good.title,
          goodsPictureUrl: good.primaryImage,
          actualPrice: order.amount || good.minSalePrice,
          buyQuantity: 1,
          specifications: order.specifications || [
            {
              specTitle: good.specList[0].title,
              specValue: good.specList[0].specValueList[0].specValue,
            },
          ],
        },
      ],
    };
  });

  return {
    getAssets() {
      return { ...config.assets };
    },
    getHome() {
      return clone({ ...config.home, swiper: [config.assets.hero] });
    },
    getGood(id, available = 1) {
      return { ...clone(getGoodById(id)), available };
    },
    getGoodsList(baseID = 0, length = 10, tabKey = 0) {
      const tab = config.home.tabs.find((item) => `${item.key}` === `${tabKey}`);
      const requestedGroup = tab?.group || (typeof tabKey === 'string' && !/^\d+$/.test(tabKey) ? tabKey : '');
      const source = requestedGroup ? goods.filter((item) => item.group === requestedGroup) : goods;
      return clone(source.slice(baseID, baseID + length));
    },
    getCategoryList() {
      return clone(config.categories);
    },
    getCartData() {
      return clone(cartData);
    },
    getCartLine(id, specInfo) {
      return clone(cartLine(id, specInfo));
    },
    getUsercenter() {
      return clone(config.usercenter);
    },
    getMenuData() {
      return clone(config.menuData);
    },
    getOrderTags() {
      return clone(config.orderTags);
    },
    getOrders(params = {}) {
      const { pageNum = 1, pageSize = 10, orderStatus } = params.parameter || {};
      const filtered = orderStatus > -1 ? orders.filter((order) => order.orderStatus === orderStatus) : orders;
      return {
        pageNum,
        pageSize,
        totalCount: filtered.length,
        orders: clone(filtered.slice((pageNum - 1) * pageSize, pageNum * pageSize)),
      };
    },
    getOrdersCount() {
      return config.orderTags.map((item) => ({
        tabType: item.tabType,
        orderNum: orders.filter((order) => order.orderStatus === item.tabType).length,
      }));
    },
  };
}
