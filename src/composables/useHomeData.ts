import type { ActivityItem } from '@/types/activity'
import type { BannerData } from '@/types/banner'
import type { QuickEntry, RideData } from '@/types/rideData'
import HomeService from '@/api/services/homeService'

/**
 * 首页数据管理 composable
 * 职责：管理首页所有数据（轮播图、快捷入口、骑行数据、活动列表）
 */
export function useHomeData() {
  // ================================================
  // 状态定义
  // ================================================

  /** 当前选中城市 */
  const currentCity = ref('襄阳')

  // ================================================
  // 数据列表
  // ================================================

  /** 轮播图列表 */
  const bannerList = ref<BannerData[]>([])

  /** 快捷入口列表 */
  const quickEntries = ref<QuickEntry[]>([])

  /** 骑行数据统计 */
  const rideData = ref<RideData>({ totalDistance: 0, totalDays: 0, totalRoutes: 0 })

  /** 活动公告列表 */
  const activityList = ref<ActivityItem[]>([])

  // ================================================
  // 数字动画（自动处理 H5/小程序平台差异）
  // ================================================

  /** 展示用累计里程 */
  const displayDistance = useAnimateNumber(rideData.value.totalDistance)

  /** 展示用累计天数 */
  const displayDays = useAnimateNumber(rideData.value.totalDays)

  /** 展示用累计路线数 */
  const displayRoutes = useAnimateNumber(rideData.value.totalRoutes)

  /** 是否显示徽章（数据加载完成后显示） */
  const showBadge = ref(false)

  // ================================================
  // 内部状态
  // ================================================

  /** 数据是否加载中（仅用于判断页面内容显示，不控制全局loading） */
  const isLoaded = ref(false)

  // ================================================
  // 数据加载
  // ================================================

  /**
   * 加载首页所有数据
   * - 并行请求轮播图、快捷入口、骑行数据、活动列表
   * - 使用 usePageStatus 管理全局 loading/error 状态
   */
  async function loadHomeData() {
    const pageStatus = usePageStatus()
    pageStatus.startLoading()

    try {
      // 并行请求所有数据
      const [banners, entries, rideInfo, activities] = await Promise.all([
        HomeService.getBanners(),
        HomeService.getQuickEntries(),
        HomeService.getRideData(),
        HomeService.getActivities(),
      ])

      // 更新数据
      bannerList.value = banners
      quickEntries.value = entries
      rideData.value = rideInfo
      activityList.value = activities

      // 数据加载完成，隐藏 loading
      pageStatus.finishLoading()

      // 启动数字动画
      displayDistance.animate(rideData.value.totalDistance)
      displayDays.animate(rideData.value.totalDays)
      displayRoutes.animate(rideData.value.totalRoutes)

      // 动画完成 300ms 后显示徽章
      setTimeout(() => { showBadge.value = true }, 300)

      isLoaded.value = true
    } catch (err) {
      // 请求失败，显示错误页面，传入重试回调
      console.error('Failed to load home data:', err)
      pageStatus.showError({
        title: '加载失败',
        buttonText: '重新加载',
        onRetry: loadHomeData,
      })
    }
  }

  // ================================================
  // 城市切换
  // ================================================

  /**
   * 切换当前城市
   * @param city - 目标城市名称
   */
  async function handleCityChange(city: string) {
    currentCity.value = city
    try {
      await HomeService.switchCity(city)
    } catch (err) {
      console.error('Failed to switch city:', err)
    }
  }

  // ================================================
  // 生命周期
  // ================================================

  onMounted(() => {
    loadHomeData()
  })

  // ================================================
  // 导出
  // ================================================

  return {
    // 状态
    currentCity,
    isLoaded,
    // 数据
    bannerList,
    quickEntries,
    rideData,
    activityList,
    // 展示值（使用 .display 获取数字值）
    displayDistance: displayDistance.display,
    displayDays: displayDays.display,
    displayRoutes: displayRoutes.display,
    showBadge,
    // 方法
    handleCityChange,
    loadHomeData,
  }
}
