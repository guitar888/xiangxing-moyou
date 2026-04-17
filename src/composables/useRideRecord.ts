/**
 * 骑行记录 composable
 * 职责：管理骑行记录、开始/结束骑行、本地存储
 */
import type { RideRecord, ActiveRide, Coordinate } from '@/types'
import { saveRideRecord, deleteRideRecord } from '@/api/services/rideService'

export function useRideRecord() {
  // ================================================
  // 状态
  // ================================================

  /** 骑行记录列表 */
  const records = ref<RideRecord[]>([])

  /** 正在进行的骑行 */
  const activeRide = ref<ActiveRide>({
    status: 'idle',
    startTime: 0,
    duration: 0,
  })

  /** 加载状态 */
  const loading = ref(false)

  /** 骑行计时器 */
  let rideTimer: ReturnType<typeof setInterval> | null = null

  // ================================================
  // 存储键名
  // ================================================

  const STORAGE_KEY = 'ride_records'
  const ACTIVE_RIDE_KEY = 'active_ride'

  // ================================================
  // 本地存储
  // ================================================

  function loadRecordsFromStorage() {
    const stored = uni.getStorageSync(STORAGE_KEY)
    if (stored) {
      records.value = JSON.parse(stored)
    }
  }

  function saveRecordsToStorage() {
    uni.setStorageSync(STORAGE_KEY, JSON.stringify(records.value))
  }

  function loadActiveRideFromStorage() {
    const stored = uni.getStorageSync(ACTIVE_RIDE_KEY)
    if (stored) {
      activeRide.value = JSON.parse(stored)
      if (activeRide.value.status === 'recording') {
        startRideTimer()
      }
    }
  }

  function saveActiveRideToStorage() {
    uni.setStorageSync(ACTIVE_RIDE_KEY, JSON.stringify(activeRide.value))
  }

  // ================================================
  // 骑行操作
  // ================================================

  /**
   * 开始骑行记录
   * @param location 当前位置
   * @param routeId 路线ID（可选）
   * @param routeName 路线名称（可选）
   */
  function startRide(location: Coordinate, routeId?: string, routeName?: string) {
    activeRide.value = {
      status: 'recording',
      startTime: Date.now(),
      routeId,
      routeName,
      startLocation: location,
      duration: 0,
    }

    startRideTimer()
    saveActiveRideToStorage()
  }

  /**
   * 更新当前位置
   * @param location 当前位置
   */
  function updateLocation(location: Coordinate) {
    if (activeRide.value.status === 'recording') {
      activeRide.value.currentLocation = location
    }
  }

  /**
   * 结束骑行
   * @param endLocation 终点位置（可选）
   * @returns 生成的骑行记录
   */
  async function endRide(endLocation?: Coordinate): Promise<RideRecord | null> {
    if (activeRide.value.status !== 'recording') return null

    stopRideTimer()

    const now = Date.now()
    const duration = Math.round((now - activeRide.value.startTime) / 60000)

    const record: RideRecord = {
      id: `ride_${now}`,
      startTime: activeRide.value.startTime,
      endTime: now,
      duration,
      routeId: activeRide.value.routeId,
      routeName: activeRide.value.routeName,
      startLocation: activeRide.value.startLocation!,
      endLocation: endLocation || activeRide.value.currentLocation,
      createdAt: now,
    }

    activeRide.value = {
      status: 'idle',
      startTime: 0,
      duration: 0,
    }

    records.value.unshift(record)
    saveRecordsToStorage()
    saveActiveRideToStorage()

    try {
      await saveRideRecord(record)
    } catch (err) {
      console.error('保存骑行记录失败:', err)
    }

    return record
  }

  /**
   * 取消骑行
   */
  function cancelRide() {
    stopRideTimer()
    activeRide.value = {
      status: 'idle',
      startTime: 0,
      duration: 0,
    }
    saveActiveRideToStorage()
  }

  // ================================================
  // 计时器
  // ================================================

  function startRideTimer() {
    if (rideTimer) return

    rideTimer = setInterval(() => {
      if (activeRide.value.status === 'recording') {
        activeRide.value.duration = Math.round((Date.now() - activeRide.value.startTime) / 1000)
      }
    }, 1000)
  }

  function stopRideTimer() {
    if (rideTimer) {
      clearInterval(rideTimer)
      rideTimer = null
    }
  }

  // ================================================
  // 记录操作
  // ================================================

  /**
   * 删除骑行记录
   * @param id 记录ID
   */
  async function removeRecord(id: string) {
    await deleteRideRecord(id)
    const index = records.value.findIndex(r => r.id === id)
    if (index > -1) {
      records.value.splice(index, 1)
      saveRecordsToStorage()
    }
  }

  /**
   * 清空所有记录
   */
  async function clearAllRecords() {
    records.value = []
    uni.removeStorageSync(STORAGE_KEY)
  }

  // ================================================
  // 计算属性
  // ================================================

  const isRiding = computed(() => activeRide.value.status === 'recording')

  const formattedDuration = computed(() => {
    const seconds = activeRide.value.duration
    const h = Math.floor(seconds / 3600)
    const m = Math.floor((seconds % 3600) / 60)
    const s = seconds % 60
    return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`
  })

  // ================================================
  // 生命周期
  // ================================================

  onMounted(() => {
    loadRecordsFromStorage()
    loadActiveRideFromStorage()
  })

  onUnmounted(() => {
    stopRideTimer()
  })

  return {
    records,
    activeRide,
    loading,
    isRiding,
    formattedDuration,
    startRide,
    updateLocation,
    endRide,
    cancelRide,
    removeRecord,
    clearAllRecords,
  }
}
