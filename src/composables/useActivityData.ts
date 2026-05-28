/**
 * 活动数据 composable
 * 职责：管理活动列表数据（统一使用 HomeService），支持按状态筛选 + 历史活动月份分组
 */
import type { ActivityFilter, ActivityItem, ActivityStatusTab } from '@/types'
import { HomeService } from '@/api/services/homeService'

export interface ActivityGroup {
  month: string
  monthKey: string
  activities: ActivityItem[]
  expanded: boolean
}

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
  const currentStatusTab = ref<ActivityStatusTab>('upcoming')

  // 英文 -> 中文映射
  const filterMap: Record<ActivityFilter, string> = {
    all: 'all',
    morning: '晨骑',
    gather: '聚会',
    scenic: '景区',
    greenway: '绿道',
    free: '免费',
    photo: '摄影'
  }

  // ================================================
  // 历史活动月份展开状态跟踪
  // ================================================
  const expandedMonths = ref<Set<string>>(new Set())

  // 监听活动变化，同步展开状态（只保留存在的月份）
  watch(
    () => activities.value,
    () => {
      const monthKeys = [...expandedMonths.value].filter((k) => {
        const exists = groupedHistoryActivities.value.some(g => g.monthKey === k)
        return exists
      })
      expandedMonths.value = new Set(monthKeys)
    },
  )

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
    }
    catch (err) {
      console.error('加载活动失败:', err)
      error.value = true
    }
    finally {
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

  function setStatusTab(tab: ActivityStatusTab) {
    currentStatusTab.value = tab
  }

  function toggleMonth(monthKey: string) {
    if (expandedMonths.value.has(monthKey)) {
      expandedMonths.value.delete(monthKey)
    }
    else {
      expandedMonths.value.add(monthKey)
    }
  }

  // ================================================
  // 辅助函数：从活动列表提取月份 Key
  // ================================================
  function getMonthKeysFromActivities(acts: ActivityItem[]): string[] {
    const monthSet = new Set<string>()
    acts.forEach((a) => {
      const date = new Date(a.date)
      const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`
      monthSet.add(monthKey)
    })
    return Array.from(monthSet).sort((a, b) => b.localeCompare(a))
  }

  // ================================================
  // 计算属性 - 按状态分组
  // ================================================

  const upcomingActivities = computed(() =>
    activities.value.filter(a => a.status === 'upcoming'),
  )

  const ongoingActivities = computed(() =>
    activities.value.filter(a => a.status === 'ongoing'),
  )

  const endedActivities = computed(() =>
    activities.value.filter(a => a.status === 'ended'),
  )

  /** 当前 Tab 对应的活动列表（未分组） */
  const filteredByStatus = computed(() => {
    switch (currentStatusTab.value) {
      case 'upcoming':
        return upcomingActivities.value
      case 'ongoing':
        return ongoingActivities.value
      case 'ended':
        return endedActivities.value
      case 'all':
      default:
        return activities.value
    }
  })

  /** 历史活动按月份分组（用于"历史记录"Tab） */
  const groupedHistoryActivities = computed<ActivityGroup[]>(() => {
    const groups: Record<string, ActivityItem[]> = {}

    endedActivities.value.forEach((activity) => {
      const date = new Date(activity.date)
      const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`

      if (!groups[monthKey]) {
        groups[monthKey] = []
      }
      groups[monthKey].push(activity)
    })

    return Object.keys(groups)
      .sort((a, b) => b.localeCompare(a))
      .map((monthKey) => {
        const date = new Date(`${monthKey}-01`)
        const monthLabel = `${date.getFullYear()}年${date.getMonth() + 1}月`
        return {
          month: monthLabel,
          monthKey,
          activities: groups[monthKey],
          expanded: expandedMonths.value.has(monthKey)
        }
      })
  })

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
    currentStatusTab,
    upcomingActivities,
    ongoingActivities,
    endedActivities,
    filteredByStatus,
    groupedHistoryActivities,
    expandedMonths,
    loadActivities,
    setFilter,
    setStatusTab,
    toggleMonth
  }
}
