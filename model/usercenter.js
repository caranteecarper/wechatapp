import { getPersonaContent } from './persona-content';

const userInfo = {
  avatarUrl:
    'https://we-retail-static-1300977798.cos.ap-guangzhou.myqcloud.com/retail-ui/components-exp/avatar/avatar-1.jpg',
  nickName: '宝宝的小屋主人',
  phoneNumber: '',
  gender: 2,
};
const countsData = [
  {
    num: 2,
    name: '专属暗号',
    type: 'point',
  },
  {
    num: 10,
    name: '纪念日',
    type: 'coupon',
  },
];

const orderTagInfos = [
  {
    orderNum: 1,
    tabType: 5,
  },
  {
    orderNum: 1,
    tabType: 10,
  },
  {
    orderNum: 1,
    tabType: 40,
  },
  {
    orderNum: 0,
    tabType: 0,
  },
];

const customerServiceInfo = {
  servicePhone: '10086',
  serviceTimeDuration: '想我的时候，优先级最高',
};

export const genSimpleUserInfo = () => ({ ...userInfo });

export const genUsercenter = (persona = '') => {
  const system = getPersonaContent(persona);
  if (system) {
    return system.getUsercenter();
  }
  return {
    userInfo,
    countsData,
    orderTagInfos,
    customerServiceInfo,
  };
};
