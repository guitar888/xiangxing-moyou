<script setup lang="ts">
/**
 * 活动页面 - 纯展示版
 * 仅展示活动信息 + 状态 + 路线查看
 * 无社交、无报名、无交互
 */
import type { ActivityItem, ActivityFilter, ActivityTag, ActivityStatusTab } from '@/types'
import { ACTIVITY_TAG_CONFIG } from '@/types'

definePage({
  name: 'activity',
  layout: 'tabbar',
  style: {
    navigationBarTitleText: '活动工具',
    navigationStyle: 'custom',
  },
})

// ================================================
// 系统信息
// ================================================
const { statusBarHeight } = useSystemInfo()

// ================================================
// 数据
// ================================================
const {
  activities,
  loading,
  currentFilter,
  currentStatusTab,
  filteredByStatus,
  upcomingActivities,
  ongoingActivities,
  endedActivities,
  loadActivities,
  setFilter,
  setStatusTab,
} = useActivityData()

// 标签页切换
const activeTab = ref('activities')

// 搜索
const searchQuery = ref('')

// 状态筛选 Tab
const statusTabs: { key: ActivityStatusTab; label: string; icon: string }[] = [
  { key: 'upcoming', label: '即将开始', icon: 'i-carbon:time' },
  { key: 'ongoing', label: '进行中', icon: 'i-carbon:play' },
  { key: 'ended', label: '历史记录', icon: 'i-carbon:document' },
]

// 活动类型筛选标签
const filters: { key: ActivityFilter; label: string }[] = [
  { key: 'all', label: '全部' },
  { key: 'morning', label: '晨骑' },
  { key: 'gather', label: '聚会' },
  { key: 'scenic', label: '景区' },
  { key: 'greenway', label: '绿道' },
  { key: 'free', label: '免费' },
  { key: 'photo', label: '摄影' },
]

// 活动筛选（结合状态 Tab + 类型筛选 + 搜索）
const finalFilteredActivities = computed(() => {
  let data = filteredByStatus.value

  // 搜索过滤
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    data = data.filter(a =>
      a.title.toLowerCase().includes(query) ||
      a.description.toLowerCase().includes(query) ||
      a.location.toLowerCase().includes(query)
    )
  }

  // 类型过滤
  if (currentFilter.value !== 'all') {
    data = data.filter(a => a.tags.includes(currentFilter.value))
  }

  return data
})

// ================================================
// AA计算器 - 彻底修复版
// ================================================
const aaTotal = ref(0)
const aaParticipants = ref(1)

// 监听变量变化，强制修正 NaN
watch(aaTotal, (val) => {
  if (isNaN(val) || val < 0) {
    aaTotal.value = 0
  }
})

watch(aaParticipants, (val) => {
  if (isNaN(val) || val <= 0) {
    aaParticipants.value = 1
  }
})

// 计算结果，去掉不必要的限制，直接计算并兜底
const aaResult = computed(() => {
  // 强制转数字，兜底为 0/1
  const total = Number(aaTotal.value) || 0
  const participants = Number(aaParticipants.value) || 1

  // 直接计算，结果非负
  const result = total / participants
  return Math.max(0, Math.round(result * 100) / 100)
})

// ================================================
// 路线查看
// ================================================
const router = useRouter()

function handleViewRoute(activity: ActivityItem) {
  if (activity.routeId) {
    router.pushTab('/pages/map/map')
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
  <view class="relative min-h-screen overflow-hidden bg-gradient-to-br from-base via-[var(--wot-color-bg-hover)] to-[var(--wot-color-bg-card)]">
    <!-- 背景装饰 -->
    <view class="pointer-events-none absolute inset-x-0 top-0 z-0 h-[240rpx]" :style="{ background: 'linear-gradient(to bottom, rgba(46, 213, 115, 0.25), transparent 100%)' }" />
    <view class="pointer-events-none absolute inset-0 z-0 opacity-3" :style="{ background: 'repeating-linear-gradient(45deg, transparent, transparent 40rpx, #2ED573 40rpx, #2ED573 80rpx), repeating-linear-gradient(-45deg, transparent, transparent 40rpx, #2ED573 40rpx, #2ED573 80rpx)' }" />

    <!-- 页面内容 -->
    <view class="relative z-10 flex flex-col">
      <!-- 自定义Header头部 -->
      <view
        class="relative z-50 flex items-center justify-between border-b border-white/10 pb-[12rpx]"
        :style="{
          paddingTop: `${statusBarHeight + 12}px`,
          paddingLeft: '24rpx',
          paddingRight: '32rpx',
          background: 'linear-gradient(to bottom, rgba(46, 213, 115, 0.15) 0%, transparent 100%)',
        }"
      >
        <view class="flex items-center gap-[12rpx]">
          <text class="i-carbon:calendar text-[36rpx] text-white" />
          <text class="text-[32rpx] font-700 tracking-[1px] text-white">活动工具</text>
        </view>
        <view class="flex items-center gap-[8rpx] rounded-[10rpx] bg-card/50 px-[16rpx] py-[10rpx]">
          <text class="i-carbon:information text-[24rpx] text-white" />
          <text class="text-[22rpx] text-white font-500">活动公示</text>
        </view>
      </view>

      <!-- 标签栏 -->
      <view class="flex items-center justify-between px-[32rpx] py-[20rpx]">
        <view
          class="flex-1 flex items-center justify-center gap-[10rpx] py-[16rpx] rounded-[12rpx] transition-all duration-200 relative"
          :class="activeTab === 'activities' ? 'text-primary' : 'text-gray'"
          @click="activeTab = 'activities'"
        >
          <text class="i-carbon:calendar text-[28rpx]" />
          <text class="text-[26rpx] font-500">活动列表</text>
          <view v-if="activeTab === 'activities'" class="absolute bottom-0 left-1/4 right-1/4 h-[6rpx] bg-primary rounded-full" />
        </view>
        <view
          class="flex-1 flex items-center justify-center gap-[10rpx] py-[16rpx] rounded-[12rpx] transition-all duration-200 relative"
          :class="activeTab === 'aa' ? 'text-primary' : 'text-gray'"
          @click="activeTab = 'aa'"
        >
          <text class="i-carbon:calculator text-[28rpx]" />
          <text class="text-[26rpx] font-500">AA计算器</text>
          <view v-if="activeTab === 'aa'" class="absolute bottom-0 left-1/4 right-1/4 h-[6rpx] bg-primary rounded-full" />
        </view>
      </view>

      <!-- 活动列表标签页 -->
      <view v-if="activeTab === 'activities'">
        <!-- 状态筛选 Tab -->
        <view class="flex gap-[12rpx] px-[24rpx] pt-[16rpx]">
          <view
            v-for="tab in statusTabs"
            :key="tab.key"
            class="flex-1 flex items-center justify-center gap-[8rpx] py-[16rpx] rounded-[12rpx] transition-all duration-200"
            :class="currentStatusTab === tab.key ? 'bg-primary text-base' : 'bg-card text-gray'"
            @click="setStatusTab(tab.key)"
          >
            <text :class="[tab.icon, 'text-[24rpx]']" />
            <text class="text-[24rpx] font-500">{{ tab.label }}</text>
            <text v-if="tab.key === 'upcoming'" class="text-[20rpx] opacity-80">({{ upcomingActivities.length }})</text>
            <text v-else-if="tab.key === 'ongoing'" class="text-[20rpx] opacity-80">({{ ongoingActivities.length }})</text>
            <text v-else-if="tab.key === 'ended'" class="text-[20rpx] opacity-80">({{ endedActivities.length }})</text>
          </view>
        </view>

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

        <!-- 活动类型筛选标签 - 多行布局 -->
        <view class="px-[24rpx] pb-[16rpx]">
          <view class="flex flex-wrap gap-[12rpx]">
            <view
              v-for="f in filters"
              :key="f.key"
              class="px-[20rpx] py-[8rpx] rounded-[20rpx] text-[22rpx] font-500 transition-all duration-200"
              :class="currentFilter === f.key ? 'bg-primary text-white' : 'bg-card text-gray border border-white/5'"
              @click="setFilter(f.key)"
            >
              {{ f.label }}
            </view>
          </view>
        </view>

        <!-- 活动列表 -->
        <view class="px-[24rpx]">
          <view class="space-y-[20rpx]">
            <view
              v-for="activity in finalFilteredActivities"
              :key="activity.id"
              class="bg-card rounded-[16rpx] overflow-hidden"
            >
              <activity-ActivityCard
                :activity="activity"
                @view-route="handleViewRoute"
              />
            </view>
          </view>

          <!-- 空状态 -->
          <view v-if="finalFilteredActivities.length === 0 && !loading" class="flex flex-col items-center justify-center py-[100rpx]">
            <text class="i-carbon:calendar text-[80rpx] text-gray mb-[16rpx]" />
            <text class="text-[26rpx] text-gray">暂无活动</text>
            <text class="text-[22rpx] text-gray mt-[8rpx]">关注更多摩友活动</text>
          </view>

          <!-- Loading -->
          <view v-if="loading" class="flex items-center justify-center py-[60rpx]">
            <wd-loading type="ring" />
          </view>
        </view>
      </view>


  <!-- AA计算器标签页 -->
  <view v-else-if="activeTab === 'aa'" class="p-[24rpx]">
    <view class="space-y-[32rpx]">
      <view class="bg-card rounded-[16rpx] p-[24rpx]">
        <text class="block text-[24rpx] text-white mb-[16rpx]">总费用</text>
        <wd-input
          v-model.number="aaTotal"
          type="digit"
          placeholder="输入总费用"
          class="text-[32rpx] font-500 text-white"
        />
      </view>
      <view class="bg-card rounded-[16rpx] p-[24rpx]">
        <text class="block text-[24rpx] text-white mb-[16rpx]">参与人数</text>
        <wd-input
          v-model.number="aaParticipants"
          type="number"
          placeholder="输入参与人数"
          class="text-[32rpx] font-500 text-white"
        />
      </view>
      <view class="bg-card rounded-[16rpx] p-[24rpx]">
        <text class="block text-[24rpx] text-white mb-[16rpx]">人均费用</text>
        <text class="text-[40rpx] font-600 text-primary">{{ aaResult.toFixed(2) }} 元</text>
      </view>
    </view>
  </view>

      <!-- 底部声明 -->
      <view class="px-[20rpx] py-[12rpx]">
        <text class="text-[18rpx] text-gray/50 text-center block">
          活动信息仅作公示 · 详情请咨询微信群 · 安全骑行
        </text>
      </view>
    </view>
  </view>
</template>
