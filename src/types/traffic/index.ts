/**
 * 交通相关类型定义
 */

/**
 * 限行时段
 */
export interface TimeRestriction {
  start: string
  end: string
  description?: string
}

/**
 * 限行区域
 */
export interface RestrictedArea {
  name: string
  description: string
  boundaries?: string[]
}

/**
 * 交通政策
 */
export interface TrafficPolicy {
  id: string
  title: string
  content: string
  effectiveDate?: string
  area?: string
  time?: string
  vehicleType?: string
}
