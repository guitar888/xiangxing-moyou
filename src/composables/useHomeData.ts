import type { ActivityItem, QuickEntry } from '@/types'
import HomeService from '@/api/services/homeService'
import { getRideStats } from '@/api/services/rideService'

export function useHomeData() {
  const currentCity = ref('襄阳')
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
      const [entries, stats, activities] = await Promise.all([
        HomeService.getQuickEntries(),
        getRideStats(),
        HomeService.getActivities(),
      ])

      quickEntries.value = entries
      rideData.value = {
        totalDistance: stats.totalDistance,
        totalDays: 0,
        totalRoutes: stats.totalRides,
      }
      activityList.value = activities

      bannerList.value = activities.filter(act => act.status === 'upcoming')

      pageStatus.finishLoading()
      displayDistance.animate(stats.totalDistance)
      displayDays.animate(0)
      displayRoutes.animate(stats.totalRides)

      setTimeout(() => {
        showBadge.value = true
      }, 300)

      isLoaded.value = true
    } catch (err) {
      console.error('Failed to load home data:', err)
      pageStatus.showError({
        title: '加载失败',
        buttonText: '重新加载',
        onRetry: loadHomeData,
      })
    }
  }

  async function handleCityChange(city: string) {
    currentCity.value = city
  }

  onMounted(() => {
    loadHomeData()
  })

  return {
    currentCity,
    isLoaded,
    bannerList,
    quickEntries,
    rideData,
    activityList,
    displayDistance: displayDistance.display,
    displayDays: displayDays.display,
    displayRoutes: displayRoutes.display,
    showBadge,
    handleCityChange,
    loadHomeData,
  }
}
