/**
 * 骑行事件总线
 * 用于跨组件/页面通信，统一骑行记录相关事件
 */
import type { RideRecord } from '@/types'

type RideEventHandler = (data: any) => void

interface RideEvents {
  listeners: Map<string, RideEventHandler[]>
  emit: (event: string, data: any) => void
  on: (event: string, handler: RideEventHandler) => void
  off: (event: string, handler: RideEventHandler) => void
}

export const rideEvents: RideEvents = {
  listeners: new Map(),

  emit(event: string, data: any) {
    const handlers = this.listeners.get(event)
    if (handlers) {
      handlers.forEach(handler => handler(data))
    }
  },

  on(event: string, handler: RideEventHandler) {
    if (!this.listeners.has(event)) {
      this.listeners.set(event, [])
    }
    this.listeners.get(event)!.push(handler)
  },

  off(event: string, handler: RideEventHandler) {
    const handlers = this.listeners.get(event)
    if (handlers) {
      const index = handlers.indexOf(handler)
      if (index > -1) {
        handlers.splice(index, 1)
      }
    }
  }
}

/**
 * 海报弹窗打开事件
 * data: RideRecord
 */
export const POSTER_OPEN_EVENT = 'poster:open'

/**
 * 骑行记录更新事件
 * data: { record: RideRecord, action: 'add' | 'delete' }
 */
export const RECORD_UPDATED_EVENT = 'record:updated'

/**
 * 展开月份分组事件
 * data: monthKey (e.g. "2026-05")
 */
export const EXPAND_MONTH_EVENT = 'month:expand'

/**
 * 触发海报弹窗
 */
export function openPosterDialog(record: RideRecord) {
  console.log('[rideEvents] openPosterDialog 发出事件:', {
    id: record.id,
    distance: record.distance,
    duration: record.duration,
    avgSpeed: record.avgSpeed
  })
  rideEvents.emit(POSTER_OPEN_EVENT, record)
}

/**
 * 触发记录更新
 */
export function emitRecordUpdated(record: RideRecord, action: 'add' | 'delete' = 'add') {
  rideEvents.emit(RECORD_UPDATED_EVENT, { record, action })
}

/**
 * 触发展开月份
 */
export function emitExpandMonth(monthKey: string) {
  rideEvents.emit(EXPAND_MONTH_EVENT, monthKey)
}
