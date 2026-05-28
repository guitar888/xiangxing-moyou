/**
 * 活动相关类型定义
 */

/**
 * 活动状态
 */
export type ActivityStatus = 'upcoming' | 'ongoing' | 'ended'

/**
 * 活动状态筛选 Tab
 */
export type ActivityStatusTab = 'upcoming' | 'ongoing' | 'ended' | 'all'

/**
 * 活动标签/筛选条件
 * 统一使用相同类型，避免类型不匹配
 */
export type ActivityTag = 'photo' | 'morning' | 'free' | 'gather' | 'scenic' | 'greenway'

/**
 * 活动详情
 */
export interface Activity {
  id: string
  title: string
  date: string
  time: string
  location: string
  description: string
  tags: ActivityTag[]
  coverImage: string
  status: ActivityStatus
  isFeatured?: boolean
  organizer?: string
  participantCount?: number
  maxParticipants?: number
  contact?: string
  notice?: string
  routeId?: string
  routeName?: string
  gatherTime?: string
  gatherLocation?: string
  route?: string
  mealInfo?: string
  safetyNotice?: string
  disclaimer?: string
}

/**
 * 活动筛选条件
 */
export type ActivityFilter = ActivityTag | 'all'

/**
 * 活动列表项（用于首页和活动页展示，统一数据源）
 */
export interface ActivityItem {
  id: string
  title: string
  date: string
  time: string
  location: string
  info: string
  description: string
  tags: string[]
  image: string
  status: ActivityStatus
  isFeatured: boolean
  organizer?: string
  routeId?: string
  routeName?: string
  isUpcoming: boolean
  countdownText?: string
  gatherTime?: string
  gatherLocation?: string
  route?: string
  mealInfo?: string
  safetyNotice?: string
  disclaimer?: string
  participantCount?: number
  maxParticipants?: number
}

/**
 * 管理员联系方式
 */
export interface AdminContact {
  wechatId?: string
  description?: string
  available?: boolean
}

/**
 * 活动标签配置
 */
export const ACTIVITY_TAG_CONFIG: Record<ActivityTag, { color: string, bgColor: string, label: string }> = {
  photo: { color: '#9945FF', bgColor: 'rgba(153, 69, 255, 0.15)', label: '摄影' },
  morning: { color: '#2ED573', bgColor: 'rgba(46, 213, 115, 0.15)', label: '晨骑' },
  free: { color: '#FF7A00', bgColor: 'rgba(255, 122, 0, 0.15)', label: '免费' },
  gather: { color: '#FF4757', bgColor: 'rgba(255, 71, 87, 0.15)', label: '聚会' },
  scenic: { color: '#00BCD4', bgColor: 'rgba(0, 188, 212, 0.15)', label: '景区' },
  greenway: { color: '#4CAF50', bgColor: 'rgba(76, 175, 80, 0.15)', label: '绿道' }
}
