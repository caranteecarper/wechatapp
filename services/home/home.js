import { config, cdnBase } from '../../config/index';
import { getPersonaContent } from '../../model/persona-content';

const defaultHomeCopy = {
  eyebrow: 'ONLY FOR US',
  title: '宝宝的心情小屋~',
  subtitle: '今天也想把温柔放进我们的小屋',
  searchPlaceholder: '搜一搜今天想要的陪伴',
};

/** 获取首页数据 */
function mockFetchHome(persona = '') {
  const { delay } = require('../_utils/delay');
  const { genSwiperImageList } = require('../../model/swiper');
  const system = getPersonaContent(persona);
  const homeCopy = system ? system.getHome() : defaultHomeCopy;
  return delay().then(() => {
    return {
      swiper: genSwiperImageList(persona),
      tabList: homeCopy.tabs || [
        {
          text: '今日想要',
          key: 0,
        },
        {
          text: '投喂',
          key: 1,
        },
        {
          text: '撒娇',
          key: 2,
        },
        {
          text: '陪伴',
          key: 3,
        },
        {
          text: '惊喜',
          key: 4,
        },
        {
          text: '纪念日',
          key: 5,
        },
        {
          text: '悄悄话',
          key: 6,
        },
      ],
      homeCopy,
      activityImg: `${cdnBase}/activity/banner.png`,
    };
  });
}

/** 获取首页数据 */
export function fetchHome(persona = '') {
  if (config.useMock) {
    return mockFetchHome(persona);
  }
  return new Promise((resolve) => {
    resolve('real api');
  });
}
