/**
 * 活动数据 composable - 精简版
 * 职责：管理活动列表数据（统一使用 HomeService）
 */
import type { ActivityItem, ActivityFilter } from '@/types'
import { HomeService } from '@/api/services/homeService'

export function useActivityData() {
  // ================================================
  // 状态
  // ================================================
  const activities = ref<ActivityItem[]>([])
  const loading = ref(false)
  const error = ref(false)

  // ================================================
  // 筛选
  // ================================================
  const currentFilter = ref<ActivityFilter>('all')

  // 英文 -> 中文映射（修复TS类型 + 修复筛选）
  const filterMap: Record<ActivityFilter, string> = {
    all: 'all',
    night: '夜骑',
    morning: '晨骑',
    gather: '聚会',
    scenic: '景区',
    greenway: '绿道',
    free: '免费',
    photo: '摄影',
  }

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
        const tagName = filterMap[filterToUse]
        data = data.filter(a => a.tags.includes(tagName))
      }

      activities.value = data
    } catch (err) {
      console.error('加载活动失败:', err)
      error.value = true
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
  // 生命周期
  // ================================================
  onMounted(() => {
    loadActivities()
  })

  return {
    activities,
    loading,
    error,
    currentFilter,
    loadActivities,
    setFilter,
  }
}
