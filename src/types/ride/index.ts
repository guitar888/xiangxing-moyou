/**
 * 骑行相关类型定义
 */

/**
 * 坐标点
 */
export interface Coordinate {
  latitude: number
  longitude: number
}

/**
 * 骑行状态
 */
export type RideStatus = 'idle' | 'riding' | 'paused' | 'recording'

/**
 * 骑行记录
 */
export interface RideRecord {
  id: string
  startTime: number
  endTime: number
  duration: number
  distance: number
  avgSpeed: number
  maxSpeed: number
  routeId?: string
  routeName?: string
  startLocation?: Coordinate
  endLocation?: Coordinate
  createdAt?: number
}

/**
 * 月度统计数据
 */
export interface MonthlyStats {
  month: string
  totalDistance: number
  totalDuration: number
  totalRides: number
  avgSpeed: number
}

/**
 * 骑行统计
 */
export interface RideStats {
  totalDistance: number
  totalDuration: number
  totalRides: number
  avgSpeed: number
  maxSpeed: number
  avgDistance?: number
  avgDuration?: number
  monthlyStats: MonthlyStats[]
}

/**
 * 记录筛选条件
 */
export type RecordFilter = 'week' | 'month' | 'all'

/**
 * 正在进行的骑行
 */
export interface ActiveRide {
  status: RideStatus
  startTime: number
  duration: number
  routeId?: string
  routeName?: string
  startLocation?: Coordinate
}

/**
 * 快捷入口数据类型
 */
export interface QuickEntry {
  /** 入口ID */
  id: string
  /** 名称 */
  name: string
  /** 子名称 */
  subname: string
  /** 图标 */
  icon: string
  /** 是否高亮 */
  highlight?: boolean
  /** 跳转路径 */
  path: string
  /** 是否为Tab页面 */
  isTab?: boolean
}

/**
 * 骑行数据类型
 */
export interface RideData {
  /** 总骑行距离（公里） */
  totalDistance: number
  /** 总骑行天数 */
  totalDays: number
  /** 总骑行路线数 */
  totalRoutes: number
}
