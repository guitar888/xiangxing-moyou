/**
 * 活动模块 Mock 数据
 * 注意：status 字段已废弃，由前端根据 date 动态计算
 *
 * 骑行类型说明：
 * - city: 市区短途休闲骑（一日往返，机车俱乐部组织）
 * - long: 跨市跨省长途摩旅（多日，襄骑大队组织）
 */
import type { Activity } from '@/types'

export const mockActivities: Activity[] = [
  // ================================================
  // 即将开始的活动（5 月 28 日之后）
  // ================================================

  {
    id: '1',
    title: '端午汉江骑行',
    date: '2026-05-30',
    time: '19:00',
    location: '汉江大桥北岸',
    organizer: '襄行摩友',
    description: '端午节前骑行活动，沿汉江大桥两岸骑行，欣赏汉江美景。全程 20 公里，难度简单，适合所有车友。',
    tags: ['greenway', 'free', 'scenic'],
    rideType: 'city',
    participantCount: 8,
    maxParticipants: 10,
    gatherTime: '19:00 准时出发',
    gatherLocation: '汉江大桥北岸停车场',
    route: '汉江大桥北岸 → 长虹大桥 → 东津大桥 → 返回',
    mealInfo: '活动结束后自愿聚餐 AA',
    safetyNotice: '请确保车灯完好，佩戴头盔，文明驾驶',
    disclaimer: '本小程序仅展示襄阳地区俱乐部或团体自发组织的娱乐性骑行活动，供摩友参考。参加活动前请自行购买意外保险，确保佩戴头盔及必要防护用品。参与者需对自身安全负责，出现任何安全事故，本小程序及开发者不承担任何责任。请根据自身体能、技术水平和防护能力，谨慎评估风险后再参与。',
    coverImage: '',
  },

  {
    id: '3',
    title: '南漳春秋寨骑行',
    date: '2026-06-14',
    time: '08:30',
    location: '摩方机车俱乐部',
    organizer: '摩方机车俱乐部',
    description: '摩方机车俱乐部组织的南漳春秋寨骑行活动，沿途风景秀丽，适合中级骑手。',
    tags: ['scenic', 'gather', 'photo'],
    rideType: 'city',
    gatherTime: '上午 8:30 集合，准时出发',
    gatherLocation: '摩方机车俱乐部',
    route: '摩方机车俱乐部 → 胜利街 → 宜城 → 春秋寨 → 南漳 → 襄阳',
    mealInfo: '中餐 AA，每人预估 50 元',
    safetyNotice: '注意安全，遵守交规',
    disclaimer: '本小程序仅展示襄阳地区俱乐部或团体自发组织的娱乐性骑行活动，供摩友参考。参加活动前请自行购买意外保险，确保佩戴头盔及必要防护用品。参与者需对自身安全负责，出现任何安全事故，本小程序及开发者不承担任何责任。请根据自身体能、技术水平和防护能力，谨慎评估风险后再参与。',
    coverImage: '',
  },

  {
    id: '4',
    title: '赵湾天路挑战赛',
    date: '2026-06-21',
    time: '07:00',
    location: '谷城县赵湾乡',
    organizer: '襄行摩友',
    description: '高山公路挑战，海拔落差大，连续弯道驾驶乐趣。适合进阶骑手，全程 52 公里，难度较高。需自备护具，购买保险。',
    tags: ['scenic', 'morning', 'gather'],
    rideType: 'city',
    participantCount: 6,
    maxParticipants: 10,
    routeId: '8',
    routeName: '赵湾天路挑战线',
    coverImage: '',
  },

  {
    id: '18',
    title: '夏至汉江夜骑',
    date: '2026-06-21',
    time: '19:00',
    location: '汉江大桥北岸',
    organizer: '摩方机车俱乐部',
    description: '夏至日晚骑行活动，沿汉江绿道骑行，享受夏日凉风。全程 18 公里，路况平坦，适合所有车友。',
    tags: ['greenway', 'free', 'photo'],
    rideType: 'city',
    gatherTime: '19:00 准时出发',
    gatherLocation: '汉江大桥北岸停车场',
    route: '汉江大桥北岸 → 长虹大桥 → 返回',
    mealInfo: '活动结束后自愿聚餐 AA',
    safetyNotice: '请确保车灯完好，佩戴头盔，文明驾驶',
    disclaimer: '本小程序仅展示襄阳地区俱乐部或团体自发组织的娱乐性骑行活动，供摩友参考。参加活动前请自行购买意外保险，确保佩戴头盔及必要防护用品。参与者需对自身安全负责，出现任何安全事故，本小程序及开发者不承担任何责任。请根据自身体能、技术水平和防护能力，谨慎评估风险后再参与。',
    coverImage: '',
  },

  {
    id: '19',
    title: '端午节骑行',
    date: '2026-06-25',
    time: '09:00',
    location: '襄阳古城墙',
    organizer: 'DC 机车俱乐部',
    description: '端午节特别活动，古城墙环线骑行。全程约 25 公里，感受古城魅力，路况平坦，适合新手。',
    tags: ['morning', 'free', 'scenic'],
    rideType: 'city',
    routeId: '1',
    routeName: '古城环线',
    coverImage: '',
  },

  {
    id: '20',
    title: '建党节红色骑行',
    date: '2026-07-01',
    time: '08:00',
    location: '襄阳市体育馆',
    organizer: '襄行摩友',
    description: '建党节特别活动，参观红色景点，全程 30 公里。沿途参观襄阳革命纪念馆，了解革命历史。',
    tags: ['gather', 'scenic', 'morning'],
    rideType: 'city',
    gatherTime: '上午 8 点集合，准时出发',
    gatherLocation: '襄阳市体育馆集合',
    route: '体育馆 → 革命纪念馆 → 古城墙 → 返回',
    mealInfo: '中餐 AA，每人预估 40 元',
    safetyNotice: '请着统一服装，佩戴头盔，遵守交规',
    disclaimer: '本小程序仅展示襄阳地区俱乐部或团体自发组织的娱乐性骑行活动，供摩友参考。参加活动前请自行购买意外保险，确保佩戴头盔及必要防护用品。参与者需对自身安全负责，出现任何安全事故，本小程序及开发者不承担任何责任。请根据自身体能、技术水平和防护能力，谨慎评估风险后再参与。',
    coverImage: '',
  },

  {
    id: '21',
    title: '周末绿道休闲骑',
    date: '2026-07-05',
    time: '15:00',
    location: '汉江湿地公园',
    organizer: '襄行摩友',
    description: '周末休闲骑行活动，沿汉江绿道骑行。全程 15 公里，难度简单，适合全家参与。',
    tags: ['greenway', 'free', 'gather'],
    rideType: 'city',
    participantCount: 6,
    maxParticipants: 10,
    gatherTime: '下午 3 点集合',
    gatherLocation: '汉江湿地公园入口',
    route: '湿地公园 → 鱼梁洲 → 返回',
    mealInfo: '活动结束后自愿聚餐',
    coverImage: '',
  },

  {
    id: '22',
    title: '摄影主题骑行',
    date: '2026-07-12',
    time: '16:00',
    location: '东津新区',
    organizer: '摩方机车俱乐部',
    description: '摄影爱好者专场骑行，沿途打卡拍照。全程 20 公里，终点有摄影作品分享环节。',
    tags: ['photo', 'gather', 'scenic'],
    rideType: 'city',
    gatherTime: '下午 4 点集合',
    gatherLocation: '东津新区会展中心',
    route: '会展中心 → 汉江大桥 → 鱼梁洲 → 返回',
    mealInfo: '活动现场有茶歇，结束后自愿聚餐',
    safetyNotice: '骑行途中注意安全，拍照时靠边停车',
    coverImage: '',
  },

  {
    id: '16',
    title: '川藏线 G318 摩旅',
    date: '2026-07-15',
    time: '08:00',
    location: '襄阳体育馆集合',
    organizer: '襄行摩友',
    description: '襄行摩友年度川藏线摩旅活动，成都→拉萨，全程 2100 公里，历时 15 天。翻越折多山、东达山等 14 座高山垭口，体验 318 国道的壮美与艰辛。需大排量 ADV，购买专业保险，有高原骑行经验。',
    tags: ['scenic', 'gather'],
    rideType: 'long',
    participantCount: 8,
    maxParticipants: 10,
    gatherTime: '出发前 1 小时集合',
    gatherLocation: '襄阳市体育馆',
    route: '襄阳 → 成都 → 雅安 → 康定 → 理塘 → 巴塘 → 八宿 → 波密 → 林芝 → 拉萨',
    mealInfo: '沿途住宿 + 餐饮 AA，预估费用 8000 元/人',
    safetyNotice: '高原骑行风险高，需准备氧气瓶、抗高反药物，全程佩戴护具',
    disclaimer: '本小程序仅展示襄阳地区俱乐部或团体自发组织的娱乐性骑行活动，供摩友参考。参加活动前请自行购买意外保险，确保佩戴头盔及必要防护用品。参与者需对自身安全负责，出现任何安全事故，本小程序及开发者不承担任何责任。请根据自身体能、技术水平和防护能力，谨慎评估风险后再参与。',
    coverImage: '',
  },

  {
    id: '17',
    title: '西北大环线摩旅',
    date: '2026-08-10',
    time: '06:00',
    location: '襄阳体育馆集合',
    organizer: '襄行摩友',
    description: '襄行摩友西北大环线 7 日摩旅，穿越青海、甘肃两省。途经青海湖、茶卡盐湖、敦煌莫高窟、嘉峪关等著名景点，体验大西北的苍茫与壮阔。全程约 2800 公里，适合大排量机车。',
    tags: ['scenic', 'photo'],
    rideType: 'long',
    participantCount: 6,
    maxParticipants: 10,
    gatherTime: '早上 6 点准时出发',
    gatherLocation: '襄阳市体育馆',
    route: '襄阳 → 西安 → 兰州 → 西宁 → 青海湖 → 茶卡 → 大柴旦 → 敦煌 → 嘉峪关 → 张掖 → 西安 → 襄阳',
    mealInfo: '沿途住宿 + 餐饮 AA，预估费用 6000 元/人',
    safetyNotice: '西北昼夜温差大，请准备保暖衣物，注意防晒和补水',
    disclaimer: '本小程序仅展示襄阳地区俱乐部或团体自发组织的娱乐性骑行活动，供摩友参考。参加活动前请自行购买意外保险，确保佩戴头盔及必要防护用品。参与者需对自身安全负责，出现任何安全事故，本小程序及开发者不承担任何责任。请根据自身体能、技术水平和防护能力，谨慎评估风险后再参与。',
    coverImage: '',
  },

  // ================================================
  // 历史记录 - 5 月
  // ================================================

  {
    id: '5',
    title: '五四青年节骑行',
    date: '2026-05-04',
    time: '09:00',
    location: '襄阳古城墙',
    organizer: 'DC 机车俱乐部',
    description: '青年节特别活动，古城墙环线骑行。全程约 25 公里，感受古城魅力，路况平坦，适合新手。',
    tags: ['morning', 'free', 'scenic'],
    rideType: 'city',
    isFeatured: true,
    routeId: '1',
    routeName: '古城环线',
    coverImage: '',
  },

  {
    id: '7',
    title: '520 骑行',
    date: '2026-05-20',
    time: '16:00',
    location: '东津新区',
    organizer: '摩方机车俱乐部',
    description: '520 特别活动，东津新区骑行。沿途打卡拍照，终点有惊喜。',
    tags: ['scenic', 'gather', 'photo'],
    rideType: 'city',
    coverImage: '',
  },

  // ================================================
  // 历史记录 - 4 月
  // ================================================

  {
    id: '9',
    title: '谷雨茶叙骑行',
    date: '2026-04-19',
    time: '12:00',
    location: '扁山西侧荷花草堂',
    organizer: '襄行摩友',
    description: '谷雨有雨，风调雨顺。春天的最后一个节气，寻一处安静，沏一壶新茶，听一场雨落。',
    tags: ['scenic', 'free', 'photo'],
    rideType: 'city',
    participantCount: 8,
    maxParticipants: 10,
    gatherTime: '午时三刻（12:00）',
    gatherLocation: '襄城车管所路口集合',
    route: '襄城车管所路口 → 扁山西侧荷花草堂',
    mealInfo: '现场品茶，自备茶点',
    coverImage: '',
  },

  {
    id: '10',
    title: '春季古城环线',
    date: '2026-04-26',
    time: '08:00',
    location: '襄阳古城墙',
    organizer: 'DC 机车俱乐部',
    description: '春季古城墙环线，全程约 25 公里。感受古城魅力，路况平坦，适合新手。',
    tags: ['morning', 'free', 'greenway'],
    rideType: 'city',
    routeId: '1',
    routeName: '古城环线',
    coverImage: '',
  },

  // ================================================
  // 历史记录 - 3 月
  // ================================================

  {
    id: '11',
    title: '植树节公益骑行',
    date: '2026-03-12',
    time: '09:00',
    location: '汉江湿地公园',
    organizer: '襄行摩友',
    description: '植树节特别活动，骑行 + 植树公益行动。全程 20 公里，适合全家参与。',
    tags: ['greenway', 'gather', 'free'],
    rideType: 'city',
    participantCount: 8,
    maxParticipants: 10,
    coverImage: '',
  },

  {
    id: '12',
    title: '女神节骑行',
    date: '2026-03-08',
    time: '10:00',
    location: '襄阳市体育馆',
    organizer: '摩方机车俱乐部',
    description: '女神节特别活动，邀请女性车友参与。全程 15 公里，休闲骑，终点有礼品。',
    tags: ['gather', 'free', 'photo'],
    rideType: 'city',
    coverImage: '',
  },

  // ================================================
  // 历史记录 - 2 月
  // ================================================

  {
    id: '14',
    title: '二月休闲骑',
    date: '2026-02-14',
    time: '14:00',
    location: '汉江大桥',
    organizer: 'DC 机车俱乐部',
    description: '早春骑行活动，沿汉江大桥骑行。全程 18 公里，沿途打卡拍照。',
    tags: ['scenic', 'gather', 'photo'],
    rideType: 'city',
    coverImage: '',
  },

  {
    id: '15',
    title: '春节团拜会',
    date: '2026-02-08',
    time: '10:00',
    location: '襄阳市体育馆',
    organizer: '襄行摩友',
    description: '春节后首场团拜活动，摩友聚会，分享新年计划。现场有抽奖环节。',
    tags: ['gather', 'free'],
    rideType: 'city',
    participantCount: 8,
    maxParticipants: 10,
    coverImage: '',
  },
]

/** 管理员联系方式 Mock */
export const mockAdminContact = {
  wechatId: 'MingChen202Y',
  description: '加群请注明"摩友加群"，管理员会邀请您加入微信群',
  available: true,
}
