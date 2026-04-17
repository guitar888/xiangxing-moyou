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
  // 展示用的动画数值
  // ================================================

  /** 展示用累计里程（动画滚动到目标值） */
  const displayDistance = ref(0)

  /** 展示用累计天数（动画滚动到目标值） */
  const displayDays = ref(0)

  /** 展示用累计路线数（动画滚动到目标值） */
  const displayRoutes = ref(0)

  /** 是否显示徽章（数据加载完成后显示） */
  const showBadge = ref(false)

  // ================================================
  // 内部状态
  // ================================================

  /** 数据是否加载中（仅用于判断页面内容显示，不控制全局loading） */
  const isLoaded = ref(false)

  // ================================================
  // 内部计时器引用（用于组件卸载时清理）
  // ================================================

  let animFrameId: number | null = null

  // ================================================
  // 数字滚动动画
  // ================================================

  /**
   * 数字滚动动画
   * @param target - 目标数值
   * @param display - 用于展示的响应式变量
   */
  function animateNumber(target: number, display: Ref<number>) {
    const duration = 1500 // 动画持续时间 ms
    const start = Date.now() // 动画开始时间

    function animate() {
      const elapsed = Date.now() - start // 已流逝时间
      const progress = Math.min(elapsed / duration, 1) // 计算进度（0-1）
      display.value = Math.floor(target * progress) // 设置数值（取整）

      // 进度未完成，继续下一帧
      if (progress < 1) {
        animFrameId = requestAnimationFrame(animate)
      }
    }

    animate()
  }

  /**
   * 启动数字动画
   */
  function startNumberAnimation() {
    animateNumber(rideData.value.totalDistance, displayDistance)
    animateNumber(rideData.value.totalDays, displayDays)
    animateNumber(rideData.value.totalRoutes, displayRoutes)

    // 动画完成 300ms 后显示徽章
    setTimeout(() => { showBadge.value = true }, 300)
  }

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
      startNumberAnimation()
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

  onUnmounted(() => {
    // 清理动画帧，防止内存泄漏
    if (animFrameId) {
      cancelAnimationFrame(animFrameId)
      animFrameId = null
    }
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
    // 展示值
    displayDistance,
    displayDays,
    displayRoutes,
    showBadge,
    // 方法
    handleCityChange,
    loadHomeData,
  }
}
