import { genGoodsByPersona } from './good';

export function getGoodsList(baseID = 0, length = 10, persona = '', tabKey = 0) {
  return genGoodsByPersona(baseID, length, persona, tabKey);
}

export const goodsList = getGoodsList();
