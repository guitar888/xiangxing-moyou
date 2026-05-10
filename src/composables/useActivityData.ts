/**
 * 活动数据 composable
 * 职责：管理活动列表数据（统一使用 HomeService）
 */
import type { ActivityItem, ActivityFilter } from '@/types'
import { HomeService } from '@/api/services/homeService'

export function useActivityData() {
  // ================================================
  // 状态
  // ================================================

  const activities = ref<ActivityItem[]>([])
  const currentActivity = ref<ActivityItem | null>(null)
  const loading = ref(false)
  const error = ref(false)

  // ================================================
  // 筛选
  // ================================================

  const currentFilter = ref<ActivityFilter>('all')

  // ================================================
  // 数据加载
  // ================================================

  async function loadActivities(filter?: ActivityFilter) {
    loading.value = true
    error.value = false

    try {
      const filterToUse = filter || currentFilter.value
      let data = await HomeService.getActivities()
      if (filterToUse !== 'all') {
        data = data.filter(a => a.tags.includes(filterToUse))
      }
      activities.value = data
    } catch (err) {
      console.error('加载活动失败:', err)
      error.value = true
    } finally {
      loading.value = false
    }
  }

  async function loadActivityDetail(id: string) {
    loading.value = true

    try {
      const allActivities = await HomeService.getActivities()
      currentActivity.value = allActivities.find(a => a.id === id) || null
    } catch (err) {
      console.error('加载活动详情失败:', err)
    } finally {
      loading.value = false
    }
  }

  // ================================================
  // 筛选操作
  // ================================================

  async function setFilter(filter: ActivityFilter) {
    currentFilter.value = filter
    await loadActivities(filter)
  }

  // ================================================
  // 计算属性
  // ================================================

  const upcomingActivities = computed(() =>
    activities.value.filter(a => a.status === 'upcoming')
  )

  const ongoingActivities = computed(() =>
    activities.value.filter(a => a.status === 'ongoing')
  )

  const endedActivities = computed(() =>
    activities.value.filter(a => a.status === 'ended')
  )

  // ================================================
  // 生命周期
  // ================================================

  onMounted(() => {
    loadActivities()
  })

  return {
    activities,
    currentActivity,
    loading,
    error,
    currentFilter,
    upcomingActivities,
    endedActivities,
    loadActivities,
    loadActivityDetail,
    setFilter,
  }
}
