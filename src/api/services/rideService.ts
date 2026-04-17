/**
 * 骑行服务 API
 * 预留 Bmob 接口，方便后续对接后端
 */
import type { RideRecord, RecordFilter, RideStats } from '@/types'
import { mockRideRecords } from '@/api/mock/rideMock'

/**
 * 获取骑行记录列表
 * @param filter 筛选条件
 */
export async function getRideRecords(filter?: RecordFilter): Promise<RideRecord[]> {
  // TODO: 对接 Bmob（本地存储）
  // return alovaInstance.Get<RideRecord[]>('/api/ride/records', { params: { filter } })

  return new Promise((resolve) => {
    setTimeout(() => {
      let records = [...mockRideRecords]

      const now = Date.now()
      const weekAgo = now - 7 * 24 * 60 * 60 * 1000
      const monthAgo = now - 30 * 24 * 60 * 60 * 1000

      if (filter === 'week') {
        records = records.filter(r => r.startTime >= weekAgo)
      } else if (filter === 'month') {
        records = records.filter(r => r.startTime >= monthAgo)
      }

      resolve(records.sort((a, b) => b.startTime - a.startTime))
    }, 300)
  })
}

/**
 * 获取骑行统计
 */
export async function getRideStats(): Promise<RideStats> {
  // TODO: 对接 Bmob

  return new Promise((resolve) => {
    setTimeout(() => {
      const records = mockRideRecords
      const totalRides = records.length
      const totalDistance = records.reduce((sum, r) => sum + (r.distance || 0), 0)
      const totalDuration = records.reduce((sum, r) => sum + r.duration, 0)

      resolve({
        totalRides,
        totalDistance: Math.round(totalDistance),
        totalDuration: Math.round(totalDuration),
        avgDistance: Math.round(totalDistance / totalRides),
        avgDuration: Math.round(totalDuration / totalRides),
        avgSpeed: Math.round((totalDistance / (totalDuration / 60)) * 10) / 10,
        maxSpeed: Math.max(...records.map(r => r.maxSpeed || 0)),
        monthlyStats: []
      })
    }, 200)
  })
}

/**
 * 保存骑行记录
 * @param record 骑行记录
 */
export async function saveRideRecord(record: RideRecord): Promise<void> {
  // TODO: 对接 Bmob（本地存储）
  // return alovaInstance.Post('/api/ride/records', record)

  return new Promise((resolve) => {
    setTimeout(() => {
      mockRideRecords.unshift(record)
      resolve()
    }, 100)
  })
}

/**
 * 删除骑行记录
 * @param id 记录ID
 */
export async function deleteRideRecord(id: string): Promise<void> {
  // TODO: 对接 Bmob
  // return alovaInstance.Delete(`/api/ride/records/${id}`)

  return new Promise((resolve) => {
    setTimeout(() => {
      const index = mockRideRecords.findIndex(r => r.id === id)
      if (index > -1) {
        mockRideRecords.splice(index, 1)
      }
      resolve()
    }, 100)
  })
}
