/**
 * 活动模块 Mock 数据
 * 注意：status 字段已废弃，由前端根据 date 动态计算
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
    tags: ['greenway', 'free'],
    participantCount: 12,
    maxParticipants: 30,
    gatherTime: '19:00 准时出发',
    gatherLocation: '汉江大桥北岸停车场',
    route: '汉江大桥北岸 → 长虹大桥 → 东津大桥 → 返回',
    mealInfo: '活动结束后自愿聚餐 AA',
    safetyNotice: '请确保车灯完好，佩戴头盔，文明驾驶',
    disclaimer: '本次活动非盈利，安全责任自负，建议购买保险',
    coverImage: ''
  },

  {
    id: '2',
    title: '六月避暑薤山行',
    date: '2026-06-07',
    time: '08:00',
    location: '谷城县薤山森林公园',
    organizer: '襄阳摩协',
    description: '夏季避暑专线，森林覆盖率 95%，天然氧吧。山路平缓适合休闲骑，山顶避暑山庄品茶休息。全程 32 公里，难度简单。',
    tags: ['scenic', 'morning', 'free'],
    participantCount: 18,
    maxParticipants: 50,
    routeId: '9',
    routeName: '薤山森林公园线',
    coverImage: ''
  },

  {
    id: '3',
    title: '南漳春秋寨骑行',
    date: '2026-06-14',
    time: '08:30',
    location: '摩方机车俱乐部',
    organizer: '摩方机车俱乐部',
    description: '摩方机车俱乐部组织的南漳春秋寨骑行活动，沿途风景秀丽，适合中级骑手。',
    tags: ['scenic', 'gather'],
    participantCount: 25,
    maxParticipants: 50,
    gatherTime: '上午 8:30 集合，准时出发',
    gatherLocation: '摩方机车俱乐部',
    route: '摩方机车俱乐部 → 胜利街 → 宜城 → 春秋寨 → 南漳 → 襄阳',
    mealInfo: '中餐 AA，每人预估 50 元',
    safetyNotice: '注意安全，遵守交规',
    disclaimer: '非盈利活动，安全责任自负',
    coverImage: ''
  },

  {
    id: '4',
    title: '赵湾天路挑战赛',
    date: '2026-06-21',
    time: '07:00',
    location: '谷城县赵湾乡',
    organizer: '襄骑大队',
    description: '高山公路挑战，海拔落差大，连续弯道驾驶乐趣。适合进阶骑手，全程 52 公里，难度较高。需自备护具，购买保险。',
    tags: ['scenic'],
    participantCount: 15,
    maxParticipants: 30,
    routeId: '8',
    routeName: '赵湾天路挑战线',
    coverImage: ''
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
    tags: ['morning', 'free'],
    isFeatured: true,
    participantCount: 38,
    maxParticipants: 80,
    routeId: '1',
    routeName: '古城环线',
    coverImage: ''
  },

  // 5 月 10 日活动已删除（绿道休闲骑更像自行车活动）

  {
    id: '7',
    title: '520 骑行',
    date: '2026-05-20',
    time: '16:00',
    location: '东津新区',
    organizer: '摩方机车俱乐部',
    description: '520 特别活动，东津新区骑行。沿途打卡拍照，终点有惊喜。',
    tags: ['scenic', 'gather'],
    participantCount: 52,
    maxParticipants: 60,
    coverImage: ''
  },

  // ================================================
  // 历史记录 - 4 月
  // ================================================

  {
    id: '8',
    title: '清明踏青骑行',
    date: '2026-04-05',
    time: '09:00',
    location: '隆中景区',
    organizer: '襄阳摩协',
    description: '清明节踏青活动，前往隆中景区的经典路线，山路风景秀丽。全程 35 公里，难度中等。',
    tags: ['scenic', 'morning'],
    participantCount: 56,
    maxParticipants: 80,
    routeId: '3',
    routeName: '隆中探幽',
    coverImage: ''
  },

  {
    id: '9',
    title: '谷雨茶叙骑行',
    date: '2026-04-19',
    time: '12:00',
    location: '扁山西侧荷花草堂',
    organizer: '襄行摩友',
    description: '谷雨有雨，风调雨顺。春天的最后一个节气，寻一处安静，沏一壶新茶，听一场雨落。',
    tags: ['scenic', 'free'],
    participantCount: 22,
    maxParticipants: 30,
    gatherTime: '午时三刻（12:00）',
    gatherLocation: '襄城车管所路口集合',
    route: '襄城车管所路口 → 扁山西侧荷花草堂',
    mealInfo: '现场品茶，自备茶点',
    coverImage: ''
  },

  {
    id: '10',
    title: '春季古城环线',
    date: '2026-04-26',
    time: '08:00',
    location: '襄阳古城墙',
    organizer: 'DC 机车俱乐部',
    description: '春季古城墙环线，全程约 25 公里。感受古城魅力，路况平坦，适合新手。',
    tags: ['morning', 'free'],
    participantCount: 34,
    maxParticipants: 80,
    routeId: '1',
    routeName: '古城环线',
    coverImage: ''
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
    tags: ['greenway', 'gather'],
    participantCount: 68,
    maxParticipants: 100,
    coverImage: ''
  },

  {
    id: '12',
    title: '女神节骑行',
    date: '2026-03-08',
    time: '10:00',
    location: '襄阳市体育馆',
    organizer: '摩方机车俱乐部',
    description: '女神节特别活动，邀请女性车友参与。全程 15 公里，休闲骑，终点有礼品。',
    tags: ['gather', 'free'],
    participantCount: 42,
    maxParticipants: 50,
    coverImage: ''
  },

  // ================================================
  // 历史记录 - 2 月
  // ================================================

  {
    id: '13',
    title: '元宵灯会骑行',
    date: '2026-02-22',
    time: '18:00',
    location: '襄阳古城墙环城路',
    organizer: '襄阳摩协',
    description: '元宵节特别活动，环襄阳古城墙骑行赏灯会。全程 12 公里，休闲骑，适合全家参与。',
    tags: ['gather'],
    participantCount: 85,
    maxParticipants: 120,
    coverImage: ''
  },

  {
    id: '14',
    title: '二月休闲骑',
    date: '2026-02-14',
    time: '14:00',
    location: '汉江大桥',
    organizer: 'DC 机车俱乐部',
    description: '早春骑行活动，沿汉江大桥骑行。全程 18 公里，沿途打卡拍照。',
    tags: ['scenic', 'gather'],
    participantCount: 36,
    maxParticipants: 40,
    coverImage: ''
  },

  {
    id: '15',
    title: '春节团拜会',
    date: '2026-02-08',
    time: '10:00',
    location: '襄阳市体育馆',
    organizer: '襄行摩友',
    description: '春节后首场团拜活动，摩友聚会，分享新年计划。现场有抽奖环节。',
    tags: ['gather'],
    participantCount: 95,
    maxParticipants: 150,
    coverImage: ''
  },
]

/** 管理员联系方式 Mock */
export const mockAdminContact = {
  wechatId: 'MingChen202Y',
  description: '加群请注明"摩友加群"，管理员会邀请您加入微信群',
  available: true
}
