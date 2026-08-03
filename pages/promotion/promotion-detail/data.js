const DAY_MS = 24 * 60 * 60 * 1000;

// Personal dates stay empty until they are confirmed. Both MM-DD and YYYY-MM-DD are supported.
const SPECIAL_DATE_SETTINGS = {
  relationshipStartDate: '',
  milestoneDays: [100, 520],
  dates: [
    { id: 'anniversary', date: '', repeat: 'yearly', enabled: true },
    { id: 'birthday', date: '', repeat: 'yearly', enabled: true },
    { id: 'meeting', date: '', repeat: 'once', enabled: true },
  ],
};

const PERSONA_DATE_COPY = {
  baby: {
    navTitle: '宝宝~的特别日子',
    eyebrow: 'SOFT DATE',
    title: '把特别的日子软软收好',
    subtitle: '每一次想念，都值得被温柔记住',
    heroImage: '/assets/baby/baby-hero.jpg',
    countdownLabel: '距离下一次甜甜的日子',
    pendingDateLabel: '日期等我们一起写下',
    dateSectionEyebrow: 'OUR CALENDAR',
    dateSectionTitle: '软软日历',
    dateSectionDesc: '重要的日子，都在这里留一个位置',
    preparationEyebrow: 'FOR THAT DAY',
    preparationTitle: '那一天会解锁',
    preparationDesc: '把想说的话和想给的偏爱慢慢放进来',
    actionText: '把这一天软软收好',
    actionToast: '这一天已经在宝宝~这里留好位置啦',
    pendingState: '等宝宝~写下日期',
    dateTitles: {
      anniversary: '我们的软软纪念日',
      birthday: '宝宝~的生日',
      meeting: '下一次抱抱',
    },
    preparations: [
      { icon: 'chat-heart', title: '一段只给我们看的话', desc: '等到那一天再慢慢打开' },
      { icon: 'gift', title: '一张甜甜特权券', desc: '把当天最想要的回应留给宝宝~' },
      { icon: 'heart', title: '一个藏好的小惊喜', desc: '在倒数结束以后悄悄出现' },
    ],
  },
  princess: {
    navTitle: '公主~的纪念礼册',
    eyebrow: 'ROYAL CALENDAR',
    title: '值得郑重收藏的日子',
    subtitle: '每一个重要时刻，都要为公主~认真准备',
    heroImage: '/assets/princess/princess-hero.jpg',
    countdownLabel: '距离下一次郑重纪念',
    pendingDateLabel: '日期等待写入礼册',
    dateSectionEyebrow: 'THE ROYAL DATES',
    dateSectionTitle: '礼册里的日期',
    dateSectionDesc: '属于公主~的日子，不会被轻轻带过',
    preparationEyebrow: 'CEREMONY',
    preparationTitle: '为公主~准备的仪式',
    preparationDesc: '偏爱、愿望和惊喜都会在正确的时间揭晓',
    actionText: '收进公主~的礼册',
    actionToast: '这一天已经郑重收进公主~的礼册',
    pendingState: '等待公主~定下日期',
    dateTitles: {
      anniversary: '公主~的纪念日',
      birthday: '公主~的生日',
      meeting: '下一次正式见面',
    },
    preparations: [
      { icon: 'heart', title: '一封郑重写下的信', desc: '只在指定的日期向公主~展开' },
      { icon: 'gift', title: '一份专属礼遇', desc: '当天由仆人认真兑现' },
      { icon: 'star', title: '一个隐藏揭晓环节', desc: '为仪式感保留最后的惊喜' },
    ],
  },
  teacher: {
    navTitle: '姐姐~的私藏日期',
    eyebrow: 'PRIVATE DATE',
    title: '把重要日期留在姐姐这里',
    subtitle: '不必张扬，每一件都会被认真安排',
    heroImage: '/assets/teacher/teacher-hero.jpg',
    countdownLabel: '距离下一次专属时间',
    pendingDateLabel: '日期等姐姐~来定',
    dateSectionEyebrow: 'PRIVATE SCHEDULE',
    dateSectionTitle: '姐姐~的日期簿',
    dateSectionDesc: '需要小狗记住的日子，一件都不会落下',
    preparationEyebrow: 'THE INSTRUCTION',
    preparationTitle: '那天给小狗的指令',
    preparationDesc: '内容先保密，到了时间再让小狗认真完成',
    actionText: '替姐姐~留好这一天',
    actionToast: '这一天已经替姐姐~单独留好了',
    pendingState: '等姐姐~定下时间',
    dateTitles: {
      anniversary: '姐姐~的特别日',
      birthday: '姐姐~的生日',
      meeting: '下一次专属见面',
    },
    preparations: [
      { icon: 'edit-1', title: '一条只在当天生效的指令', desc: '时间到了，小狗会看见完整内容' },
      { icon: 'gift', title: '一份专属奖励', desc: '由姐姐~决定什么时候揭晓' },
      { icon: 'lock-on', title: '一段私密留言', desc: '只留在姐姐~和小狗之间' },
    ],
  },
};

function startOfDay(date) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

function parseDate(value) {
  if (!value || typeof value !== 'string') return null;
  const parts = value.split('-').map((part) => Number(part));
  if (parts.some((part) => !Number.isInteger(part))) return null;
  if (parts.length === 2) {
    return { year: null, month: parts[0], day: parts[1] };
  }
  if (parts.length === 3) {
    return { year: parts[0], month: parts[1], day: parts[2] };
  }
  return null;
}

function createValidDate(year, month, day) {
  const date = new Date(year, month - 1, day);
  if (date.getFullYear() !== year || date.getMonth() !== month - 1 || date.getDate() !== day) {
    return null;
  }
  return date;
}

function getTargetDate(item, now) {
  const parsed = parseDate(item.date);
  if (!parsed) return null;

  if (item.repeat === 'yearly') {
    let target = createValidDate(now.getFullYear(), parsed.month, parsed.day);
    if (!target) return null;
    if (target < startOfDay(now)) {
      target = createValidDate(now.getFullYear() + 1, parsed.month, parsed.day);
    }
    return target;
  }

  if (!parsed.year) return null;
  return createValidDate(parsed.year, parsed.month, parsed.day);
}

function getDaysUntil(target, now) {
  return Math.round((startOfDay(target).getTime() - startOfDay(now).getTime()) / DAY_MS);
}

function formatMonthDay(date) {
  const month = `${date.getMonth() + 1}`.padStart(2, '0');
  const day = `${date.getDate()}`.padStart(2, '0');
  return `${month}.${day}`;
}

function buildMilestones(now) {
  const parsed = parseDate(SPECIAL_DATE_SETTINGS.relationshipStartDate);
  if (!parsed || !parsed.year) return [];
  const startDate = createValidDate(parsed.year, parsed.month, parsed.day);
  if (!startDate) return [];

  return SPECIAL_DATE_SETTINGS.milestoneDays.map((days) => {
    const date = new Date(startDate.getTime());
    date.setDate(date.getDate() + days - 1);
    return {
      id: `milestone-${days}`,
      title: `在一起的第 ${days} 天`,
      date,
      repeat: 'once',
      daysUntil: getDaysUntil(date, now),
    };
  });
}

function getStatusText(daysUntil, pendingState) {
  if (daysUntil === null) return pendingState;
  if (daysUntil < 0) return '已经认真珍藏';
  if (daysUntil === 0) return '就是今天';
  if (daysUntil === 1) return '明天见';
  return `还有 ${daysUntil} 天`;
}

function buildDateCards(personaKey, now) {
  const copy = PERSONA_DATE_COPY[personaKey] || PERSONA_DATE_COPY.teacher;
  const configuredDates = SPECIAL_DATE_SETTINGS.dates
    .filter((item) => item.enabled)
    .map((item) => {
      const target = getTargetDate(item, now);
      const daysUntil = target ? getDaysUntil(target, now) : null;
      return {
        id: item.id,
        title: copy.dateTitles[item.id],
        dateText: target ? formatMonthDay(target) : '--.--',
        repeatText: item.repeat === 'yearly' ? '每年' : '单次',
        stateText: getStatusText(daysUntil, copy.pendingState),
        daysUntil,
        sortValue: daysUntil === null || daysUntil < 0 ? Number.MAX_SAFE_INTEGER : daysUntil,
      };
    });

  const milestones = buildMilestones(now).map((item) => ({
    id: item.id,
    title: item.title,
    dateText: formatMonthDay(item.date),
    repeatText: '纪念',
    stateText: getStatusText(item.daysUntil, copy.pendingState),
    daysUntil: item.daysUntil,
    sortValue: item.daysUntil < 0 ? Number.MAX_SAFE_INTEGER : item.daysUntil,
  }));

  return configuredDates.concat(milestones).sort((left, right) => left.sortValue - right.sortValue);
}

function getSpecialDatePage(personaKey, currentDate = new Date()) {
  const copy = PERSONA_DATE_COPY[personaKey] || PERSONA_DATE_COPY.teacher;
  const eventCards = buildDateCards(personaKey, currentDate);
  const nextEvent = eventCards.find((item) => item.daysUntil !== null && item.daysUntil >= 0);

  return {
    copy,
    eventCards,
    hero: {
      countdownValue: nextEvent ? `${nextEvent.daysUntil}` : '--',
      countdownUnit: '天',
      dateLabel: nextEvent ? `${nextEvent.title} · ${nextEvent.dateText}` : copy.pendingDateLabel,
    },
  };
}

export { SPECIAL_DATE_SETTINGS, getSpecialDatePage };
