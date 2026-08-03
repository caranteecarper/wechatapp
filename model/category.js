import { getPersonaContent } from './persona-content';

const img = 'https://tdesign.gtimg.com/miniprogram/template/retail';

export function getCategoryList(persona = '') {
  const system = getPersonaContent(persona);
  if (system) {
    return system.getCategoryList();
  }
  return [
    {
      groupId: 'feed',
      name: '投喂',
      thumbnail: `${img}/category/category-default.png`,
      children: [
        {
          groupId: 'feed-main',
          name: '想吃什么',
          thumbnail: `${img}/category/category-default.png`,
          children: [
            { groupId: 'feed-1', name: '奶茶甜甜', thumbnail: `${img}/goods/gh-1a.png` },
            { groupId: 'feed-2', name: '晚饭安排', thumbnail: `${img}/goods/gh-2b.png` },
            { groupId: 'feed-3', name: '夜宵申请', thumbnail: `${img}/goods/dz-2a.png` },
            { groupId: 'feed-4', name: '水果零食', thumbnail: `${img}/goods/mz-11a1.png` },
            { groupId: 'feed-5', name: '生理期照顾', thumbnail: `${img}/goods/muy-3a.png` },
            { groupId: 'feed-6', name: '今天随便宠', thumbnail: `${img}/goods/mz-20a1.png` },
          ],
        },
      ],
    },
    {
      groupId: 'clingy',
      name: '撒娇',
      thumbnail: `${img}/category/category-default.png`,
      children: [
        {
          groupId: 'clingy-main',
          name: '想被怎么哄',
          thumbnail: `${img}/category/category-default.png`,
          children: [
            { groupId: 'clingy-1', name: '抱抱我', thumbnail: `${img}/goods/nz-09a.png` },
            { groupId: 'clingy-2', name: '夸夸我', thumbnail: `${img}/goods/nz-08b.png` },
            { groupId: 'clingy-3', name: '哄睡我', thumbnail: `${img}/goods/muy-3a.png` },
            { groupId: 'clingy-4', name: '立刻回我', thumbnail: `${img}/goods/dz-3a.png` },
            { groupId: 'clingy-5', name: '认错专用', thumbnail: `${img}/goods/mz-12b.png` },
            { groupId: 'clingy-6', name: '补偿申请', thumbnail: `${img}/goods/mz-20a1.png` },
          ],
        },
      ],
    },
    {
      groupId: 'company',
      name: '陪伴',
      thumbnail: `${img}/category/category-default.png`,
      children: [
        {
          groupId: 'company-main',
          name: '异地也要一起',
          thumbnail: `${img}/category/category-default.png`,
          children: [
            { groupId: 'company-1', name: '睡前聊天', thumbnail: `${img}/goods/muy-3a.png` },
            { groupId: 'company-2', name: '云看电影', thumbnail: `${img}/goods/dz-3b.png` },
            { groupId: 'company-3', name: '语音散步', thumbnail: `${img}/goods/gh-1b.png` },
            { groupId: 'company-4', name: '一起打游戏', thumbnail: `${img}/goods/dz-2a.png` },
            { groupId: 'company-5', name: '听我碎碎念', thumbnail: `${img}/goods/mz-12b.png` },
            { groupId: 'company-6', name: '视频贴贴', thumbnail: `${img}/goods/nz-09b.png` },
          ],
        },
      ],
    },
    {
      groupId: 'secret',
      name: '私密',
      thumbnail: `${img}/category/category-default.png`,
      children: [
        {
          groupId: 'secret-main',
          name: '只给我们看',
          thumbnail: `${img}/category/category-default.png`,
          children: [
            { groupId: 'secret-1', name: '悄悄话', thumbnail: `${img}/goods/mz-20a1.png` },
            { groupId: 'secret-2', name: '今日心情', thumbnail: `${img}/goods/mz-12b.png` },
            { groupId: 'secret-3', name: '想你按钮', thumbnail: `${img}/goods/nz-17a.png` },
            { groupId: 'secret-4', name: '专属暗号', thumbnail: `${img}/goods/gh-2a.png` },
            { groupId: 'secret-5', name: '纪念日', thumbnail: `${img}/goods/mz-11a1.png` },
            { groupId: 'secret-6', name: '见面清单', thumbnail: `${img}/goods/gh-1a.png` },
          ],
        },
      ],
    },
  ];
}
