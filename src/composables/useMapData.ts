/**
 * 地图数据管理 composable
 * 职责：管理骑行地图全部业务逻辑
 * 包含：路线管理、定位导航、骑行记录、筛选、导航控制
 */
import type { RideRoute, CheckInSpot, RouteFilter, SpotType, Coordinate, RideRecord, ActiveRide, MapMarker } from '@/types'
import { getRoutes, getRouteById } from '@/api/services/mapService'

export function useMapData() {
  // ================================================
  // 路由/打卡点/筛选状态
  // ================================================

  const routes = ref<RideRoute[]>([])
  const currentRoute = ref<RideRoute | null>(null)
  const currentSpot = ref<CheckInSpot | null>(null)
  const loading = ref(false)
  const error = ref(false)
  const selectedSpotTypes = ref<SpotType[]>([])
  const selectedDifficulty = ref<string>('')
  const selectedRegion = ref<string>('')

  // ================================================
  // 定位状态
  // ================================================

  const currentLocation = ref<Coordinate>({
    latitude: 32.0603,
    longitude: 112.1401,
  })
  const locationLoading = ref(false)
  const locationError = ref('')
  const isAuthorized = ref(false)

  // ================================================
  // 骑行记录状态
  // ================================================

  const activeRide = ref<ActiveRide>({
    status: 'idle',
    startTime: 0,
    duration: 0,
  })
  const rideLoading = ref(false)

  let rideTimer: ReturnType<typeof setInterval> | null = null

  const STORAGE_KEY = 'ride_records'
  const ACTIVE_RIDE_KEY = 'active_ride'

  // ================================================
  // 海报状态
  // ================================================

  const showPoster = ref(false)
  const completedRecord = ref<RideRecord | null>(null)



  // ================================================
  // 地图视图高度
  // ================================================

  const mapViewHeight = computed(() => {
    return isRiding.value ? '40vh' : '55vh'
  })

  const listHeight = computed(() => {
    return isRiding.value ? '30vh' : '35vh'
  })



  // ================================================
  // 骑行计算属性
  // ================================================

  const isRiding = computed(() => activeRide.value.status === 'recording')

  const formattedDuration = computed(() => {
    const seconds = activeRide.value.duration
    const h = Math.floor(seconds / 3600)
    const m = Math.floor((seconds % 3600) / 60)
    const s = seconds % 60
    return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`
  })

  // 热门路线（取前4条）
  const hotRoutes = computed(() => {
    return routes.value.slice(0, 4)
  })

  // 智能分类（包含露营）
  const spotTypes: SpotType[] = ['scenic', 'food', 'coffee', 'photo', 'drone', 'camp']

  // ================================================
  // 定位方法
  // ================================================

  function getLocation(): Promise<Coordinate> {
    return new Promise((resolve) => {
      locationLoading.value = true
      locationError.value = ''

      // #ifdef MP-WEIXIN
      uni.getLocation({
        type: 'gcj02',
        success: (res) => {
          currentLocation.value = {
            latitude: res.latitude,
            longitude: res.longitude,
          }
          isAuthorized.value = true
          locationLoading.value = false
          resolve(currentLocation.value)
        },
        fail: (err) => {
          locationLoading.value = false
          isAuthorized.value = false
          locationError.value = err.errMsg || '获取位置失败'

          if (err.errMsg?.includes('auth deny')) {
            locationError.value = '定位权限未开启，请在设置中授权'
          }

          resolve(currentLocation.value)
        },
      })
      // #endif
      // #ifndef MP-WEIXIN
      locationLoading.value = false
      isAuthorized.value = true
      resolve(currentLocation.value)
      // #endif
    })
  }

  async function checkAndRequestLocation(): Promise<Coordinate> {
    // #ifdef MP-WEIXIN
    try {
      const setting = await uni.getSetting()
      if (!setting.authSetting['scope.userLocation']) {
        await uni.authorize({ scope: 'scope.userLocation' })
      }
    } catch (err) {
      console.error('请求定位权限失败:', err)
    }
    // #endif

    return getLocation()
  }





  // ================================================
  // 路线/打卡点选择
  // ================================================

  function selectRoute(route: RideRoute) {
    currentRoute.value = route
    currentSpot.value = null
  }

  function selectSpot(spot: CheckInSpot) {
    currentSpot.value = spot
  }

  function clearSelection() {
    currentRoute.value = null
    currentSpot.value = null
  }

  // ================================================
  // 筛选操作
  // ================================================

  function toggleSpotType(type: SpotType) {
    const index = selectedSpotTypes.value.indexOf(type)
    if (index > -1) {
      selectedSpotTypes.value.splice(index, 1)
    } else {
      selectedSpotTypes.value.push(type)
    }
    loadRoutes()
  }

  function setDifficulty(difficulty: string) {
    if (selectedDifficulty.value === difficulty) {
      selectedDifficulty.value = ''
    } else {
      selectedDifficulty.value = difficulty
    }
    loadRoutes()
  }

  function setRegion(region: string) {
    if (selectedRegion.value === region) {
      selectedRegion.value = ''
    } else {
      selectedRegion.value = region
    }
    loadRoutes()
  }

  function clearFilters() {
    selectedSpotTypes.value = []
    selectedDifficulty.value = ''
    selectedRegion.value = ''
    loadRoutes()
  }

  // ================================================
  // 数据加载
  // ================================================

  async function loadRoutes() {
    loading.value = true
    error.value = false

    try {
      const filter: RouteFilter = {}

      if (selectedSpotTypes.value.length > 0) {
        filter.spotTypes = selectedSpotTypes.value
      }
      if (selectedDifficulty.value) {
        filter.difficulty = selectedDifficulty.value as RouteFilter['difficulty']
      }
      if (selectedRegion.value) {
        filter.region = selectedRegion.value
      }

      routes.value = await getRoutes(filter)
    } catch (err) {
      console.error('加载路线失败:', err)
      error.value = true
    } finally {
      loading.value = false
    }
  }

  async function loadRouteDetail(id: string) {
    loading.value = true

    try {
      currentRoute.value = await getRouteById(id)
    } catch (err) {
      console.error('加载路线详情失败:', err)
    } finally {
      loading.value = false
    }
  }

  // ================================================
  // 骑行记录 - 本地存储
  // ================================================

  function loadActiveRideFromStorage() {
    try {
      const stored = uni.getStorageSync(ACTIVE_RIDE_KEY)
      if (stored) {
        activeRide.value = JSON.parse(stored)
        if (activeRide.value.status === 'recording') {
          startRideTimer()
        }
      }
    } catch (err) {
      console.error('加载骑行记录失败:', err)
      activeRide.value = {
        status: 'idle',
        startTime: 0,
        duration: 0,
      }
      saveActiveRideToStorage()
    }
  }

  function saveActiveRideToStorage() {
    uni.setStorageSync(ACTIVE_RIDE_KEY, JSON.stringify(activeRide.value))
  }

  function saveRideRecord(record: RideRecord) {
    try {
      const storedRecords = uni.getStorageSync(STORAGE_KEY)
      const records: RideRecord[] = storedRecords ? JSON.parse(storedRecords) : []
      records.unshift(record) // 新记录放在最前面
      // 只保留最近100条记录
      if (records.length > 100) {
        records.splice(100)
      }
      uni.setStorageSync(STORAGE_KEY, JSON.stringify(records))
    } catch (err) {
      console.error('保存骑行记录失败:', err)
    }
  }

  // ================================================
  // 骑行记录 - 计时器
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
  // 骑行记录 - 操作
  // ================================================

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

  async function endRide(): Promise<RideRecord | null> {
    if (activeRide.value.status !== 'recording') return null

    stopRideTimer()

    const now = Date.now()
    const duration = Math.round((now - activeRide.value.startTime) / 60000)
    const distance = currentRoute.value?.distance || 0
    const avgSpeed = distance > 0 && duration > 0 ? Math.round((distance / (duration / 60)) * 10) / 10 : 0

    const record: RideRecord = {
      id: `ride_${now}`,
      startTime: activeRide.value.startTime,
      endTime: now,
      duration,
      distance,
      avgSpeed,
      maxSpeed: 0,
      routeId: activeRide.value.routeId,
      routeName: activeRide.value.routeName,
      startLocation: activeRide.value.startLocation!,
      endLocation: currentLocation.value,
      createdAt: now,
    }

    activeRide.value = {
      status: 'idle',
      startTime: 0,
      duration: 0,
    }

    saveActiveRideToStorage()
    saveRideRecord(record)

    return record
  }

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
  // 对话框操作
  // ================================================

  function confirmStartRide() {
    if (isRiding.value) return

    uni.showModal({
      title: '开始骑行记录',
      content: `${currentRoute.value?.name || '当前位置'}出发，开始记录骑行？`,
      confirmText: '开始',
      success: (res) => {
        if (res.confirm) {
          handleStartRide()
        }
      },
    })
  }

  function confirmEndRide() {
    uni.showModal({
      title: '结束骑行',
      content: '确定要结束本次骑行吗？',
      confirmText: '结束',
      success: async (res) => {
        if (res.confirm) {
          const record = await handleEndRide()
          if (record) {
            openPoster(record)
          }
        }
      },
    })
  }

  function confirmCancelRide() {
    uni.showModal({
      title: '确认取消',
      content: '确定要取消本次骑行记录吗？',
      success: (res) => {
        if (res.confirm) {
          cancelRide()
          uni.showToast({
            title: '已取消',
            icon: 'none',
          })
        }
      },
    })
  }

  // ================================================
  // 业务入口（由页面事件调用）
  // ================================================

  function handleStartRide() {
    startRide(currentLocation.value, currentRoute.value?.id, currentRoute.value?.name)
    uni.showToast({
      title: '骑行记录已开始',
      icon: 'success',
    })
  }

  async function handleEndRide(): Promise<RideRecord | null> {
    const record = await endRide()
    return record
  }

  function handleCancelRide() {
    confirmCancelRide()
  }



  function handleRouteSelect(route: RideRoute) {
    selectRoute(route)
  }



  function handleSpotClose() {
    currentSpot.value = null
  }

  // ================================================
  // 地图标记（小程序map组件用）
  // ================================================

  const markers = computed(() => {
    const allMarkers: MapMarker[] = []
    routes.value.forEach((route) => {
      route.spots?.forEach((spot) => {
        allMarkers.push({
          id: allMarkers.length,
          latitude: spot.coordinates.latitude,
          longitude: spot.coordinates.longitude,
          width: 32,
          height: 32,
        })
      })
    })
    return allMarkers
  })

  function handleMapMarkertap(markerId: number) {
    let targetSpot: CheckInSpot | null = null
    let currentIndex = 0

    for (const route of routes.value) {
      for (const spot of route.spots || []) {
        if (currentIndex === markerId) {
          targetSpot = spot
          break
        }
        currentIndex++
      }
      if (targetSpot) break
    }

    if (targetSpot) {
      currentSpot.value = targetSpot
    }
  }

  // ================================================
  // 海报控制
  // ================================================

  function openPoster(record: RideRecord) {
    completedRecord.value = record
    showPoster.value = true
  }

  function closePoster() {
    showPoster.value = false
    completedRecord.value = null
  }

  // ================================================
  // 生命周期
  // ================================================

  onMounted(() => {
    loadRoutes()
    getLocation()
    loadActiveRideFromStorage()
  })

  onUnmounted(() => {
    stopRideTimer()
  })

  // ================================================
  // 导出
  // ================================================

  return {
    // 状态 - 路线/筛选
    routes,
    currentRoute,
    currentSpot,
    loading,
    error,
    selectedSpotTypes,
    selectedDifficulty,
    selectedRegion,
    // 状态 - 定位
    currentLocation,
    locationLoading,
    locationError,
    isAuthorized,
    // 状态 - 骑行
    activeRide,
    isRiding,
    formattedDuration,
    rideLoading,
    // 状态 - 海报
    showPoster,
    completedRecord,
    // 状态 - 视图
    mapViewHeight,
    listHeight,
    // 热门路线
    hotRoutes,
    // 地图标记
    markers,
    // 定位方法
    getLocation,
    checkAndRequestLocation,
    // 路线/筛选方法
    loadRoutes,
    loadRouteDetail,
    toggleSpotType,
    setDifficulty,
    setRegion,
    clearFilters,
    selectRoute,
    selectSpot,
    clearSelection,
    // 骑行方法
    startRide,
    endRide,
    cancelRide,
    // 业务入口
    handleStartRide,
    handleEndRide,
    handleCancelRide,
    handleRouteSelect,
    handleSpotClose,
    handleMapMarkertap,
    // 对话框
    confirmStartRide,
    confirmEndRide,
    confirmCancelRide,
    // 海报
    openPoster,
    closePoster,
  }
}
