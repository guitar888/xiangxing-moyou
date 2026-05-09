<script setup lang="ts">
/**
 * 活动页面
 * 实现摩友匿名报名、AA计算器功能
 * 活动由管理员从后台发布
 */
import type { Activity, ActivityFilter, ActivityTag } from '@/types'
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
  loadActivities,
  setFilter,
} = useActivityData()

// 标签页切换
const activeTab = ref('activities')

// 搜索
const searchQuery = ref('')

// 活动筛选
const filteredActivities = computed(() => {
  if (!searchQuery.value) return activities.value

  const query = searchQuery.value.toLowerCase()
  return activities.value.filter(a =>
    a.title.toLowerCase().includes(query) ||
    a.description.toLowerCase().includes(query) ||
    a.location.toLowerCase().includes(query)
  )
})

// 筛选标签
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
// 活动提示
// ================================================

function openSignupModal(activity: Activity) {
  const { info: showInfo } = useGlobalToast()
  showInfo({
    msg: '活动详情请留意群公告，如需帮助请联系管理员',
  })
}

// ================================================
// AA计算器
// ================================================

const aaTotal = ref(0)
const aaParticipants = ref(1)

// 限制输入为正数
function handleTotalInput(value: number | undefined) {
  if (value !== undefined && value < 0) {
    aaTotal.value = 0
  }
}

function handleParticipantsInput(value: number | undefined) {
  if (value !== undefined) {
    if (value <= 0) {
      aaParticipants.value = 1
    }
  }
}

const aaResult = computed(() => {
  if (aaParticipants.value <= 0 || aaTotal.value < 0) return 0
  const result = aaTotal.value / aaParticipants.value
  // 避免科学计数法，确保结果为正数
  return result >= 0 ? result : 0
})

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
  <view class="relative min-h-screen overflow-hidden bg-gradient-to-br from-base via-[var(--wot-color-bg-hover)] to-[var(--wot-color-bg-card)]">
    <!-- 背景装饰 -->
    <!-- #ifdef H5 -->
    <view class="pointer-events-none absolute inset-x-0 top-0 z-0 h-[240rpx]" :style="{ background: 'radial-gradient(circle at top, rgba(var(--wot-color-theme-rgb),0.18), transparent 55%)' }" />
    <view class="pointer-events-none absolute inset-0 z-0 opacity-5" :style="{ background: `repeating-linear-gradient(45deg, transparent, transparent 40rpx, var(--wot-color-theme) 40rpx, var(--wot-color-theme) 80rpx), repeating-linear-gradient(-45deg, transparent, transparent 40rpx, var(--wot-color-theme) 40rpx, var(--wot-color-theme) 80rpx)` }" />
    <!-- #endif -->
    <!-- #ifndef H5 -->
    <view class="pointer-events-none absolute inset-x-0 top-0 z-0 h-[240rpx]" :style="{ background: 'linear-gradient(to bottom, rgba(46, 213, 115, 0.25), transparent 100%)' }" />
    <view class="pointer-events-none absolute inset-0 z-0 opacity-3" :style="{ background: 'repeating-linear-gradient(45deg, transparent, transparent 40rpx, #2ED573 40rpx, #2ED573 80rpx), repeating-linear-gradient(-45deg, transparent, transparent 40rpx, #2ED573 40rpx, #2ED573 80rpx)' }" />
    <!-- #endif -->

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
          <text class="i-carbon:calendar text-[36rpx] text-primary" />
          <text class="text-[32rpx] font-700 tracking-[1px]" :style="{ color: '#2ED573' }">活动工具</text>
        </view>
        <view class="flex items-center gap-[8rpx] rounded-[10rpx] bg-card/50 px-[16rpx] py-[10rpx]">
          <text class="i-carbon:shield text-[24rpx] text-primary" />
          <text class="text-[22rpx] text-white/80 font-500">匿名报名</text>
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

        <!-- 筛选标签 - 多行布局 -->
        <view class="px-[24rpx] pb-[16rpx]">
          <view class="flex flex-wrap gap-[12rpx]">
            <view
              v-for="f in filters"
              :key="f.key"
              class="px-[20rpx] py-[8rpx] rounded-[20rpx] text-[22rpx] font-500 transition-all duration-200"
              :class="currentFilter === f.key ? 'bg-primary text-base' : 'bg-card text-gray border border-white/5'"
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
              v-for="activity in filteredActivities"
              :key="activity.id"
              class="bg-card rounded-[16rpx] overflow-hidden"
            >
              <activity-ActivityCard
                :activity="activity"
                @click="handleActivityClick"
                @view-route="handleViewRoute"
              />
              <!-- 报名按钮 -->
              <view class="p-[20rpx] border-t border-border">
                <button
                  class="w-full py-[20rpx] rounded-[12rpx] text-[24rpx] font-500 transition-all duration-200"
                  :class="activity.status === 'ended' ? 'bg-gradient-to-r from-[#FF7A00]/80 to-[#FF6B00]/80 text-white cursor-not-allowed' : 'bg-gradient-to-r from-primary to-[#27C468] text-white active:opacity-90'"
                  @click.stop="openSignupModal(activity)"
                  :disabled="activity.status === 'ended'"
                >
                  {{ activity.status === 'ended' ? '活动已结束' : '立即报名' }}
                </button>
              </view>
            </view>
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
              class="text-[32rpx] font-500"
              @input="handleTotalInput"
            />
          </view>
          <view class="bg-card rounded-[16rpx] p-[24rpx]">
            <text class="block text-[24rpx] text-white mb-[16rpx]">参与人数</text>
            <wd-input
              v-model.number="aaParticipants"
              type="number"
              placeholder="输入参与人数"
              class="text-[32rpx] font-500"
              @input="handleParticipantsInput"
            />
          </view>
          <view class="bg-card rounded-[16rpx] p-[24rpx]">
            <text class="block text-[24rpx] text-white mb-[16rpx]">人均费用</text>
            <text class="text-[40rpx] font-600 text-primary">{{ aaResult.toFixed(2) }} 元</text>
          </view>
        </view>
      </view>



      <!-- 底部合规声明 -->
      <view class="px-[20rpx] py-[12rpx]">
        <text class="text-[18rpx] text-gray/50 text-center block">
          活动信息仅作参考 · 遵守交通法规 · 安全骑行
        </text>
      </view>
    </view>
  </view>
</template>
