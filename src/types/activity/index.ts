/**
 * 活动相关类型定义
 */

/**
 * 活动状态
 */
export type ActivityStatus = 'upcoming' | 'ongoing' | 'ended'

/**
 * 活动标签/筛选条件
 * 统一使用相同类型，避免类型不匹配
 */
export type ActivityTag = 'night' | 'photo' | 'morning' | 'free' | 'gather' | 'scenic' | 'greenway'

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
  participantCount?: number
  maxParticipants?: number
  contact?: string
  notice?: string
  routeId?: string
  routeName?: string
}

/**
 * 活动筛选条件
 */
export type ActivityFilter = ActivityTag | 'all'

/**
 * 活动列表项（用于首页展示）
 */
export interface ActivityItem {
  id: string
  title: string
  date: string
  time: string
  info: string
  tags: string[]
  image: string
  isUpcoming: boolean
  countdownText?: string
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
export const ACTIVITY_TAG_CONFIG: Record<ActivityTag, { color: string; bgColor: string }> = {
  'night': { color: '#3385FF', bgColor: 'rgba(51, 133, 255, 0.15)' },
  'photo': { color: '#9945FF', bgColor: 'rgba(153, 69, 255, 0.15)' },
  'morning': { color: '#2ED573', bgColor: 'rgba(46, 213, 115, 0.15)' },
  'free': { color: '#FF7A00', bgColor: 'rgba(255, 122, 0, 0.15)' },
  'gather': { color: '#FF4757', bgColor: 'rgba(255, 71, 87, 0.15)' },
  'scenic': { color: '#00BCD4', bgColor: 'rgba(0, 188, 212, 0.15)' },
  'greenway': { color: '#4CAF50', bgColor: 'rgba(76, 175, 80, 0.15)' },
}
