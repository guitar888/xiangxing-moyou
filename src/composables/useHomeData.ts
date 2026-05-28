import type { ActivityItem, QuickEntry } from '@/types'
import HomeService from '@/api/services/homeService'
import { getRideStats } from '@/api/services/rideService'

export function useHomeData() {
  const bannerList = ref<ActivityItem[]>([])
  const quickEntries = ref<QuickEntry[]>([])
  const rideData = ref({ totalDistance: 0, totalDays: 0, totalRoutes: 0 })
  const activityList = ref<ActivityItem[]>([])

  const displayDistance = useAnimateNumber(0)
  const displayDays = useAnimateNumber(0)
  const displayRoutes = useAnimateNumber(0)
  const showBadge = ref(false)
  const isLoaded = ref(false)

  async function loadHomeData() {
    const pageStatus = usePageStatus()
    pageStatus.startLoading()

    try {
      const [entries, stats, activities, featuredActivities] = await Promise.all([
        HomeService.getQuickEntries(),
        getRideStats(),
        HomeService.getActivities(),
        HomeService.getFeaturedActivities(),
      ])

      quickEntries.value = entries
      rideData.value = {
        totalDistance: stats.totalDistance,
        totalDays: 0,
        totalRoutes: stats.totalRides,
      }
      // 首页活动列表只展示精品活动
      activityList.value = featuredActivities

      bannerList.value = activities.filter(act => act.status === 'upcoming')

      pageStatus.finishLoading()
      displayDistance.animate(stats.totalDistance)
      displayDays.animate(0)
      displayRoutes.animate(stats.totalRides)

      setTimeout(() => {
        showBadge.value = true
      }, 300)

      isLoaded.value = true
    }
    catch (err) {
      console.error('Failed to load home data:', err)
      pageStatus.showError({
        title: '加载失败',
        buttonText: '重新加载',
        onRetry: loadHomeData,
      })
    }
  }

  onMounted(() => {
    loadHomeData()
  })

  return {
    isLoaded,
    bannerList,
    quickEntries,
    rideData,
    activityList,
    displayDistance: displayDistance.display,
    displayDays: displayDays.display,
    displayRoutes: displayRoutes.display,
    showBadge,
    loadHomeData,
  }
}
