/**
 * 骑行统计 composable
 * 职责：计算骑行统计数据
 */
import type { RideRecord, RideStats, MonthlyStats, RecordFilter } from '@/types'
import { getRideRecords, getRideStats } from '@/api/services/rideService'

export function useRideStats() {
  // ================================================
  // 状态
  // ================================================

  /** 骑行记录 */
  const records = ref<RideRecord[]>([])

  /** 统计数据 */
  const stats = ref<RideStats>({
    totalRides: 0,
    totalDistance: 0,
    totalDuration: 0,
    avgDistance: 0,
    avgDuration: 0,
    avgSpeed: 0,
    maxSpeed: 0,
    monthlyStats: [],
  })

  /** 月度统计 */
  const monthlyStatsData = ref<MonthlyStats[]>([])

  /** 当前筛选 */
  const currentFilter = ref<RecordFilter>('all')

  /** 加载状态 */
  const loading = ref(false)

  // ================================================
  // 数据加载
  // ================================================

  /**
   * 加载骑行记录
   * @param filter 筛选条件
   */
  async function loadRecords(filter?: RecordFilter) {
    loading.value = true
    try {
      records.value = await getRideRecords(filter || currentFilter.value)
      calculateStats()
      calculateMonthlyStats()
    } catch (err) {
      console.error('加载骑行记录失败:', err)
    } finally {
      loading.value = false
    }
  }

  /**
   * 加载统计数据
   */
  async function loadStats() {
    try {
      stats.value = await getRideStats()
    } catch (err) {
      console.error('加载统计数据失败:', err)
    }
  }

  /**
   * 切换筛选
   * @param filter 筛选条件
   */
  async function setFilter(filter: RecordFilter) {
    currentFilter.value = filter
    await loadRecords(filter)
  }

  // ================================================
  // 统计计算
  // ================================================

  /**
   * 计算统计数据
   */
  function calculateStats() {
    const allRecords = records.value
    if (allRecords.length === 0) {
      stats.value = {
        totalRides: 0,
        totalDistance: 0,
        totalDuration: 0,
        avgDistance: 0,
        avgDuration: 0,
        avgSpeed: 0,
        maxSpeed: 0,
        monthlyStats: [],
      }
      return
    }

    const totalRides = allRecords.length
    const totalDistance = allRecords.reduce((sum, r) => sum + (r.distance || 0), 0)
    const totalDuration = allRecords.reduce((sum, r) => sum + r.duration, 0)

    stats.value = {
      totalRides,
      totalDistance: Math.round(totalDistance),
      totalDuration: Math.round(totalDuration),
      avgDistance: Math.round(totalDistance / totalRides),
      avgDuration: Math.round(totalDuration / totalRides),
      avgSpeed: totalDuration > 0 ? Math.round((totalDistance / (totalDuration / 60)) * 10) / 10 : 0,
      maxSpeed: Math.max(...allRecords.map(r => r.maxSpeed || 0)),
      monthlyStats: monthlyStatsData.value,
    }
  }

  /**
   * 计算月度统计
   */
  function calculateMonthlyStats() {
    const monthlyMap = new Map<string, { rides: number; distance: number; duration: number }>()

    for (const record of records.value) {
      const date = new Date(record.startTime)
      const monthKey = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}`

      const existing = monthlyMap.get(monthKey) || { rides: 0, distance: 0, duration: 0 }
      existing.rides++
      existing.distance += record.distance || 0
      existing.duration += record.duration

      monthlyMap.set(monthKey, existing)
    }

    monthlyStatsData.value = Array.from(monthlyMap.entries())
      .map(([month, data]) => ({
        month,
        totalRides: data.rides,
        totalDistance: Math.round(data.distance),
        totalDuration: Math.round(data.duration),
        avgSpeed: data.duration > 0 ? Math.round((data.distance / (data.duration / 60)) * 10) / 10 : 0,
      }))
      .sort((a, b) => b.month.localeCompare(a.month))
  }

  // ================================================
  // 格式化
  // ================================================

  /**
   * 格式化时长
   * @param minutes 分钟
   */
  function formatDuration(minutes: number): string {
    if (minutes < 60) {
      return `${minutes}分钟`
    }
    const h = Math.floor(minutes / 60)
    const m = minutes % 60
    return m > 0 ? `${h}小时${m}分钟` : `${h}小时`
  }

  /**
   * 格式化日期
   * @param timestamp 时间戳
   */
  function formatDate(timestamp: number): string {
    const date = new Date(timestamp)
    const month = date.getMonth() + 1
    const day = date.getDate()
    return `${month}月${day}日`
  }

  /**
   * 格式化完整日期
   * @param timestamp 时间戳
   */
  function formatFullDate(timestamp: number): string {
    const date = new Date(timestamp)
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const day = date.getDate()
    return `${year}年${month}月${day}日`
  }

  /**
   * 格式化时间为 HH:MM
   * @param timestamp 时间戳
   */
  function formatTime(timestamp: number): string {
    const date = new Date(timestamp)
    const h = date.getHours().toString().padStart(2, '0')
    const m = date.getMinutes().toString().padStart(2, '0')
    return `${h}:${m}`
  }

  // ================================================
  // 生命周期
  // ================================================

  onMounted(() => {
    loadRecords()
    loadStats()
  })

  return {
    records,
    stats,
    monthlyStats: monthlyStatsData,
    currentFilter,
    loading,
    loadRecords,
    loadStats,
    setFilter,
    formatDuration,
    formatDate,
    formatFullDate,
    formatTime,
  }
}
