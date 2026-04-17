<script setup lang="ts">
/**
 * 活动页面
 * 展示摩友活动公告，纯信息展示，无报名功能
 */
import type { Activity, ActivityFilter } from '@/types'
import { ACTIVITY_TAG_CONFIG } from '@/types'

definePage({
  name: 'activity',
  layout: 'tabbar',
  style: {
    navigationBarTitleText: '活动公告',
    navigationBarBackgroundColor: '#121212',
    navigationBarTextStyle: 'white',
  },
})

// ================================================
// 数据
// ================================================

const {
  activities,
  loading,
  currentFilter,
  loadActivities,
  setFilter,
} = useActivityData()

// ================================================
// 搜索
// ================================================

const searchQuery = ref('')

const filteredActivities = computed(() => {
  if (!searchQuery.value) return activities.value

  const query = searchQuery.value.toLowerCase()
  return activities.value.filter(a =>
    a.title.toLowerCase().includes(query) ||
    a.description.toLowerCase().includes(query) ||
    a.location.toLowerCase().includes(query)
  )
})

// ================================================
// 筛选标签
// ================================================

const filters: { key: ActivityFilter; label: string }[] = [
  { key: 'all', label: '全部' },
  { key: 'night', label: '夜骑' },
  { key: 'morning', label: '晨骑' },
  { key: 'gather', label: '聚会' },
  { key: 'scenic', label: '景区' },
  { key: 'greenway', label: '绿道' },
  { key: 'free', label: '免费' },
]

// ================================================
// 路由
// ================================================

const router = useRouter()

function handleActivityClick(activity: Activity) {
  if (activity.routeId) {
    router.push({
      path: '/pages/map/map',
      query: { routeId: activity.routeId },
    })
  }
}

function handleViewRoute(activity: Activity) {
  if (activity.routeId) {
    router.push({
      path: '/pages/map/map',
      query: { routeId: activity.routeId },
    })
  }
}

// ================================================
// 生命周期
// ================================================

onMounted(() => {
  loadActivities()
})
</script>

<template>
  <view class="min-h-screen bg-base pb-[20rpx]">
    <!-- 搜索栏 -->
    <view class="p-[24rpx]">
      <view class="relative">
        <text class="i-carbon:search absolute left-[20rpx] top-1/2 -translate-y-1/2 text-[28rpx] text-gray" />
        <input
          v-model="searchQuery"
          type="text"
          placeholder="搜索活动"
          placeholder-class="text-gray"
          class="w-full bg-card rounded-[12rpx] pl-[60rpx] pr-[20rpx] py-[20rpx] text-white text-[24rpx]"
        />
      </view>
    </view>

    <!-- 筛选标签 -->
    <view class="px-[24rpx] pb-[16rpx]">
      <scroll-view scroll-x show-scrollbar="false" class="flex gap-[12rpx]">
        <button
          v-for="f in filters"
          :key="f.key"
          class="flex-shrink-0 px-[24rpx] py-[10rpx] rounded-[28rpx] text-[22rpx] font-500 transition-all"
          :class="currentFilter === f.key ? 'bg-primary text-white' : 'bg-card text-gray'"
          @click="setFilter(f.key)"
        >
          {{ f.label }}
        </button>
      </scroll-view>
    </view>

    <!-- 活动列表 -->
    <view class="px-[24rpx]">
      <view class="space-y-[20rpx]">
        <activity-ActivityCard
          v-for="activity in filteredActivities"
          :key="activity.id"
          :activity="activity"
          @click="handleActivityClick"
          @view-route="handleViewRoute"
        />
      </view>

      <!-- 空状态 -->
      <view v-if="filteredActivities.length === 0 && !loading" class="flex flex-col items-center justify-center py-[100rpx]">
        <text class="i-carbon:calendar text-[80rpx] text-gray mb-[16rpx]" />
        <text class="text-[26rpx] text-gray">暂无活动</text>
        <text class="text-[22rpx] text-gray mt-[8rpx]">关注更多摩友活动</text>
      </view>

      <!-- Loading -->
      <view v-if="loading" class="flex items-center justify-center py-[60rpx]">
        <wd-loading type="ring" />
      </view>
    </view>

    <!-- 合规提示 -->
    <view class="px-[24rpx] py-[20rpx]">
      <text class="text-[18rpx] text-gray text-center block">
        本平台仅展示活动信息，如需参与请联系管理员
      </text>
    </view>
  </view>
</template>
