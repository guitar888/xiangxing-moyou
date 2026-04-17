/**
 * 活动数据 composable
 * 职责：管理活动列表数据
 */
import type { Activity, ActivityFilter } from '@/types'
import { getActivities, getActivityById } from '@/api/services/activityService'

export function useActivityData() {
  // ================================================
  // 状态
  // ================================================

  const activities = ref<Activity[]>([])
  const currentActivity = ref<Activity | null>(null)
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
      activities.value = await getActivities(filterToUse)
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
      currentActivity.value = await getActivityById(id)
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
