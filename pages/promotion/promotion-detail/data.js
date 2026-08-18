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
    navTitle: '宝宝的特别日子',
    eyebrow: '特别日子',
    title: '把我们的特别日子记下来',
    subtitle: '纪念日、生日和下次见面，都不要忘记',
    heroImage: '/pages/promotion/assets/baby-hero.jpg',
    countdownLabel: '距离下一个特别日子',
    pendingDateLabel: '日期等我们一起写下',
    dateSectionEyebrow: '我们的日历',
    dateSectionTitle: '我们的日历',
    dateSectionDesc: '重要日子都放在这里',
    preparationEyebrow: '提前想好',
    preparationTitle: '那天想做什么',
    preparationDesc: '那天想说什么、想让宝宝怎么陪，都先记下来',
    actionText: '记住这一天',
    actionToast: '宝宝记住这一天啦~',
    tapPrefix: '宝宝记得，',
    pendingState: '等我们一起写下日期',
    dateTitles: {
      anniversary: '我们的纪念日',
      birthday: '宝宝的生日',
      meeting: '下一次抱抱',
    },
    preparations: [
      { icon: 'chat-heart', title: '写给彼此的一段话', desc: '等到那一天再慢慢打开' },
      { icon: 'gift', title: '一张抱抱券', desc: '把当天最想要的回应留给宝宝' },
      { icon: 'heart', title: '一个藏好的小惊喜', desc: '在倒数结束以后悄悄出现' },
    ],
  },
  princess: {
    navTitle: '公主的纪念日',
    eyebrow: '公主的日子',
    title: '公主的重要日子',
    subtitle: '纪念日、生日和见面时间，仆人都要记好',
    heroImage: '/assets/princess/princess-hero.jpg',
    countdownLabel: '距离下一次特别纪念',
    pendingDateLabel: '等公主选一个喜欢的日期',
    dateSectionEyebrow: '公主的日期',
    dateSectionTitle: '公主在意的日期',
    dateSectionDesc: '这些日子，仆人一个都不能忘',
    preparationEyebrow: '那天想要',
    preparationTitle: '当天想收到的偏爱',
    preparationDesc: '花、礼物和惊喜，公主可以提前选好',
    actionText: '记住这一天',
    actionToast: '仆人替公主记好了',
    tapPrefix: '仆人记得，',
    pendingState: '等公主定下日期',
    dateTitles: {
      anniversary: '公主的纪念日',
      birthday: '公主的生日',
      meeting: '下一次正式见面',
    },
    preparations: [
      { icon: 'heart', title: '一封写给公主的信', desc: '到了那一天再慢慢打开' },
      { icon: 'gift', title: '一份给公主的礼物', desc: '不用很贵，但要让公主喜欢' },
      { icon: 'star', title: '一个隐藏的小惊喜', desc: '最后一个惊喜先不告诉公主' },
    ],
  },
  teacher: {
    navTitle: '姐姐的私藏日期',
    eyebrow: '姐姐定的日子',
    title: '姐姐定下的日子',
    subtitle: '姐姐定好的日子，小狗都要记住',
    heroImage: '/assets/teacher/teacher-hero.jpg',
    countdownLabel: '距离姐姐定的日子',
    pendingDateLabel: '等姐姐定日期',
    dateSectionEyebrow: '姐姐的日期簿',
    dateSectionTitle: '姐姐的日期簿',
    dateSectionDesc: '小狗要提前记好',
    preparationEyebrow: '当天安排',
    preparationTitle: '那天给小狗的指令',
    preparationDesc: '内容先不告诉小狗，到了时间再说',
    actionText: '替姐姐留好这一天',
    actionToast: '小狗记住这一天了，姐姐',
    tapPrefix: '小狗记得，',
    pendingState: '等姐姐定下时间',
    dateTitles: {
      anniversary: '姐姐的特别日',
      birthday: '姐姐的生日',
      meeting: '下一次专属见面',
    },
    preparations: [
      { icon: 'edit-1', title: '一条只在当天生效的指令', desc: '时间到了，小狗会看见完整内容' },
      { icon: 'gift', title: '一份专属奖励', desc: '由姐姐决定什么时候揭晓' },
      { icon: 'lock-on', title: '一段给小狗的话', desc: '到了那一天再让小狗看' },
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
  if (daysUntil < 0) return '已经过去';
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
