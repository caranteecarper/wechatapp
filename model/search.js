import { getGoodsList } from './goods';
import { hasPersonaContent } from './persona-content';

/**
 * @param {number} sort
 * @param {number} pageNum
 * @param {number} pageSize
 * @param {number} minPrice
 * @param {number} maxPrice
 * @param {string} keyword
 */

export function getSearchHistory() {
  return {
    historyWords: [
      '鸡',
      '电脑',
      'iPhone12',
      '车载手机支架',
      '自然堂',
      '小米10',
      '原浆古井贡酒',
      '欧米伽',
      '华为',
      '针织半身裙',
      '氢跑鞋',
      '三盒处理器',
    ],
  };
}

export function getSearchPopular() {
  return {
    popularWords: [
      '鸡',
      '电脑',
      'iPhone12',
      '车载手机支架',
      '自然堂',
      '小米10',
      '原浆古井贡酒',
      '欧米伽',
      '华为',
      '针织半身裙',
      '氢跑鞋',
      '三盒处理器',
    ],
  };
}

export function getSearchResult(params = {}) {
  const { persona = '', groupId = '' } = params;
  const spuList = hasPersonaContent(persona) ? getGoodsList(0, 30, persona, groupId) : getGoodsList(7);
  return {
    saasId: null,
    storeId: null,
    pageNum: 1,
    pageSize: 30,
    totalCount: spuList.length,
    spuList,
    algId: 0,
  };
}
