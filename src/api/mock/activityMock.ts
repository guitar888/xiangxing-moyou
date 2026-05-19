/**
 * 活动模块 Mock 数据
 */
import type { Activity, ActivityTag } from '@/types'

export const mockActivities: Activity[] = [
  // ================================================
  // 谷城县活动（重点服务区域）
  // ================================================

  {
    id: '1',
    title: '樱花谷春季骑行',
    date: '2026-04-05',
    time: '08:30',
    location: '谷城县樱花谷景区',
    description: '春季限定活动！谷城樱花谷景区环线骑行，漫山遍野樱花盛开。专业摄影师随行，记录骑行精彩瞬间。全程 28 公里，难度简单，适合新手。',
    tags: ['scenic', 'morning', 'free'],
    status: 'ongoing',
    participantCount: 38,
    maxParticipants: 60,
    routeId: '6',
    routeName: '樱花谷环线',
    coverImage: '',
  },

  {
    id: '2',
    title: '五山茶园品茶骑行',
    date: '2026-04-12',
    time: '09:00',
    location: '谷城县五山镇',
    description: '高山云雾茶产区骑行，体验采茶、品茶。沿途茶园风光无限，品尝地道茶乡农家菜。全程 35 公里，难度中等。',
    tags: ['scenic', 'free'],
    status: 'upcoming',
    participantCount: 25,
    maxParticipants: 50,
    routeId: '7',
    routeName: '五山茶园品路线',
    coverImage: '',
  },

  {
    id: '3',
    title: '赵湾天路挑战赛',
    date: '2026-04-19',
    time: '07:00',
    location: '谷城县赵湾乡',
    description: '高山公路挑战，海拔落差大，连续弯道驾驶乐趣。适合进阶骑手，全程 52 公里，难度较高。需自备护具，购买保险。',
    tags: ['scenic'],
    status: 'upcoming',
    participantCount: 18,
    maxParticipants: 30,
    routeId: '8',
    routeName: '赵湾天路挑战线',
    coverImage: '',
  },

  {
    id: '4',
    title: '薤山避暑纳凉骑',
    date: '2026-06-15',
    time: '08:00',
    location: '谷城县薤山森林公园',
    description: '夏季避暑专线，森林覆盖率 95%，天然氧吧。山路平缓适合休闲骑，山顶避暑山庄品茶休息。全程 32 公里，难度简单。',
    tags: ['scenic', 'morning', 'free'],
    status: 'upcoming',
    participantCount: 32,
    maxParticipants: 50,
    routeId: '9',
    routeName: '薤山森林公园线',
    coverImage: '',
  },

  // ================================================
  // 市区活动
  // ================================================

  {
    id: '5',
    title: '古城环线夜骑',
    date: '2026-04-26',
    time: '19:00',
    location: '襄阳古城墙',
    description: '襄阳古城墙环线，全程约 25 公里。清晨骑行，感受古城魅力。路况平坦，适合新手。',
    tags: ['morning', 'free'],
    status: 'upcoming',
    participantCount: 28,
    maxParticipants: 80,
    routeId: '1',
    routeName: '古城环线',
    coverImage: '',
  },

  {
    id: '7',
    title: '汉江沿岸绿道骑',
    date: '2026-05-10',
    time: '08:00',
    location: '汉江绿道',
    description: '沿汉江绿道，尽享江风拂面。路况好，适合各种车型。',
    tags: ['greenway', 'scenic'],
    status: 'upcoming',
    participantCount: 35,
    maxParticipants: 100,
    routeId: '2',
    routeName: '汉江绿道',
    coverImage: '',
  },

  {
    id: '8',
    title: '隆中景区骑行',
    date: '2026-03-28',
    time: '09:00',
    location: '隆中景区',
    description: '前往隆中景区的经典路线，山路风景秀丽。',
    tags: ['scenic', 'morning'],
    status: 'ended',
    participantCount: 42,
    maxParticipants: 80,
    routeId: '3',
    routeName: '隆中探幽',
    coverImage: '',
  },

  {
    id: '9',
    title: '鹿门山挑战',
    date: '2026-03-22',
    time: '07:00',
    location: '鹿门山',
    description: '山路有挑战性，风景绝美，适合喜欢刺激的摩友。',
    tags: ['scenic'],
    status: 'ended',
    participantCount: 25,
    maxParticipants: 50,
    routeId: '5',
    routeName: '鹿门山之路',
    coverImage: '',
  },

  {
    id: '10',
    title: '摩友交流会',
    date: '2026-05-01',
    time: '14:00',
    location: '襄阳市体育馆',
    description: '襄阳摩友俱乐部月度聚会，分享骑行故事，交流摩旅经验。',
    tags: ['gather'],
    status: 'upcoming',
    participantCount: 68,
    maxParticipants: 150,
    coverImage: '',
  },
]

/** 管理员联系方式 Mock */
export const mockAdminContact = {
  wechatId: 'MingChen202Y',
  description: '加群请注明"摩友加群"，管理员会邀请您加入微信群',
  available: true,
}
