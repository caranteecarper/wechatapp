import { getGoodsList } from '../../../model/goods';
import { hasPersonaContent } from '../../../model/persona-content';

export function getSearchHistory() {
  return {
    historyWords: ['抱抱', '陪伴', '夸夸', '想念', '约会', '惊喜'],
  };
}

export function getSearchPopular() {
  return {
    popularWords: ['抱抱', '语音', '晚安', '约会', '小愿望', '悄悄话'],
  };
}

export function getSearchResult(params = {}) {
  const { persona = '', groupId = '' } = params;
  const spuList = hasPersonaContent(persona) ? getGoodsList(0, 100, persona, groupId) : getGoodsList(7);
  return {
    saasId: null,
    storeId: null,
    pageNum: 1,
    pageSize: 100,
    totalCount: spuList.length,
    spuList,
    algId: 0,
  };
}
