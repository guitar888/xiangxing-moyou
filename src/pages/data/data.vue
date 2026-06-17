<script setup lang="ts">
/**
 * 骑行数据页面
 * 展示骑行统计、记录，支持海报分享
 */
import type { RecordFilter, RideRecord } from '@/types'
import { EXPAND_MONTH_EVENT, POSTER_OPEN_EVENT, RECORD_UPDATED_EVENT, rideEvents } from '@/composables/rideEvents'

defineOptions({
  componentPlaceholder: {
  },
})

definePage({
  name: 'data',
  layout: 'tabbar',
  style: {
    navigationBarTitleText: '骑行数据',
    navigationStyle: 'custom'
  },
})

// 系统信息
const { statusBarHeight } = useSystemInfo()

// ================================================
// 统计数据
// ================================================

const {
  stats,
  records,
  monthlyStats,
  currentFilter,
  loading,
  loadRecords,
  setFilter
} = useRideStats()

// ================================================
// 骑行记录
// ================================================

const {
  isRiding,
  formattedDuration
} = useRideRecord()

// ================================================
// 记录分组（按月份）
// ================================================

interface RecordGroup {
  month: string
  monthKey: string
  records: typeof records.value
  expanded: boolean
}

const expandedMonths = ref<Set<string>>(new Set())

watch(
  () => records.value,
  () => {
    const monthKeys = [...expandedMonths.value].filter((k) => {
      const exists = groupedRecords.value.some(g => g.monthKey === k)
      return exists
    })
    expandedMonths.value = new Set(monthKeys)
  },
)

const groupedRecords = computed<RecordGroup[]>(() => {
  const groups: Record<string, typeof records.value> = {}

  records.value.forEach((record) => {
    const date = new Date(record.startTime)
    const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`

    if (!groups[monthKey]) {
      groups[monthKey] = []
    }
    groups[monthKey].push(record)
  })

  return Object.keys(groups)
    .sort((a, b) => b.localeCompare(a))
    .slice(0, 3)
    .map((monthKey) => {
      const date = new Date(`${monthKey}-01`)
      const monthLabel = `${date.getFullYear()}年${date.getMonth() + 1}月`
      return {
        month: monthLabel,
        monthKey,
        records: groups[monthKey],
        expanded: expandedMonths.value.has(monthKey)
      }
    })
})

function toggleMonth(monthKey: string) {
  if (expandedMonths.value.has(monthKey)) {
    expandedMonths.value.delete(monthKey)
  }
  else {
    expandedMonths.value.add(monthKey)
  }
}

// ================================================
// 海报（统一管理）
// ================================================

const showPoster = ref(false)
const selectedRecord = ref<RideRecord | null>(null)

function handlePosterOpen(record: RideRecord) {
  selectedRecord.value = record
  showPoster.value = true
}

function handleShare(record: RideRecord) {
  handlePosterOpen(record)
}

function handleClosePoster() {
  showPoster.value = false
  selectedRecord.value = null
}

// 监听全局事件
function handleRecordUpdated() {
  loadRecords()
}

function handleExpandMonth(monthKey: string) {
  loadRecords().then(() => {
    if (monthKey) {
      expandedMonths.value.add(monthKey)
    }
  })
}

// ================================================
// 筛选
// ================================================

const filters: { key: RecordFilter, label: string }[] = [
  { key: 'all', label: '全部' },
  { key: 'month', label: '本月' },
  { key: 'week', label: '本周' }
]

// ================================================
// 生命周期
// ================================================

onMounted(() => {
  loadRecords().then(() => {
    if (records.value.length > 0) {
      const latest = records.value[0]
      const date = new Date(latest.startTime)
      const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`
      expandedMonths.value.add(monthKey)
    }
  })
  rideEvents.on(POSTER_OPEN_EVENT, handlePosterOpen)
  rideEvents.on(RECORD_UPDATED_EVENT, handleRecordUpdated)
  rideEvents.on(EXPAND_MONTH_EVENT, handleExpandMonth)
})

onUnmounted(() => {
  rideEvents.off(POSTER_OPEN_EVENT, handlePosterOpen)
  rideEvents.off(RECORD_UPDATED_EVENT, handleRecordUpdated)
  rideEvents.off(EXPAND_MONTH_EVENT, handleExpandMonth)
})
</script>

<template>
  <view class="relative min-h-screen overflow-hidden from-base via-[var(--wot-color-bg-hover)] to-[var(--wot-color-bg-card)] bg-gradient-to-br">
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
          <text class="i-carbon:analytics text-[36rpx] text-primary" />
          <text class="text-[32rpx] font-700 tracking-[1px]" :style="{ color: '#2ED573' }">
            骑行数据
          </text>
        </view>
      </view>

      <!-- 骑行中横幅 -->
      <view v-if="isRiding" class="mx-[24rpx] mt-[12rpx] border border-primary/20 rounded-[20rpx] from-primary/25 to-primary/10 bg-gradient-to-r px-[24rpx] py-[14rpx] shadow-lg">
        <view class="flex items-center justify-between">
          <view class="flex items-center gap-[12rpx]">
            <view class="animate-pulse h-[14rpx] w-[14rpx] rounded-full bg-primary" />
            <text class="flex items-center gap-[6rpx] text-[24rpx] text-primary font-600">
              <text class="i-fluent:vehicle-motorcycle-28-filled text-[24rpx]" />
              骑行中
            </text>
            <text class="ml-[8rpx] text-[24rpx] text-white font-600">
              {{ formattedDuration }}
            </text>
          </view>
          <wd-button type="primary" size="small" custom-class="rounded-[24rpx] font-600">
            <view class="flex items-center gap-[4rpx]">
              <text class="i-fluent:vehicle-motorcycle-28-filled text-[20rpx]" />
              <text class="text-[20rpx]">
                结束骑行
              </text>
            </view>
          </wd-button>
        </view>
      </view>

      <!-- 合规提示横幅 -->
      <common-ComplianceBanner />

      <!-- 统计卡片 -->
      <view class="p-[24rpx]">
        <ride-RideStatsCard :stats="stats" />
      </view>

      <!-- 图表区域 -->
      <view class="mt-[16rpx] px-[24rpx]">
        <view class="border border-white/10 rounded-[16rpx] bg-card p-[20rpx] shadow-lg">
          <text class="mb-[16rpx] block flex items-center gap-[8rpx] text-[24rpx] text-white font-600">
            <text class="i-carbon:chart-line text-[24rpx] text-primary" />
            骑行趋势
          </text>
          <!-- 图表区域待实现 -->
          <view class="h-[400rpx] flex items-center justify-center bg-card/50 rounded-[16rpx] border border-white/10">
            <text class="text-gray/60">图表功能开发中</text>
          </view>
        </view>
      </view>

      <!-- 筛选 -->
      <view class="mt-[16rpx] px-[24rpx]">
        <view class="flex justify-between gap-[16rpx]">
          <wd-button
            v-for="f in filters"
            :key="f.key"
            :type="currentFilter === f.key ? 'primary' : 'info'"
            size="small"
            :custom-class="`flex-1 max-w-[200rpx] rounded-[28rpx] font-500 py-[12rpx] ${currentFilter === f.key ? 'bg-primary text-white' : 'bg-card text-gray border border-white/10'}`"
            @click="setFilter(f.key)"
          >
            {{ f.label }}
          </wd-button>
        </view>
      </view>

      <!-- 骑行记录列表 -->
      <view class="mt-[16rpx] flex-1 px-[24rpx] pb-[20rpx]">
        <view class="mb-[16rpx] flex items-center justify-between">
          <text class="flex items-center gap-[6rpx] text-[28rpx] text-white font-600">
            <text class="i-carbon:notebook text-[24rpx] text-primary" />
            骑行记录
          </text>
          <text class="text-[22rpx] text-gray">
            {{ records.length }} 条
          </text>
        </view>

        <view class="flex flex-col gap-[16rpx]">
          <view
            v-for="group in groupedRecords"
            :key="group.monthKey"
            class="overflow-hidden border border-white/10 rounded-[16rpx] bg-card"
          >
            <view
              class="flex items-center justify-between bg-card/80 p-[20rpx]"
              @click="toggleMonth(group.monthKey)"
            >
              <view class="flex items-center gap-[12rpx]">
                <text class="i-carbon:calendar text-[28rpx] text-primary" />
                <text class="text-[26rpx] text-white font-600">
                  {{ group.month }}
                </text>
                <text class="text-[22rpx] text-gray">
                  ({{ group.records.length }}次骑行)
                </text>
              </view>
              <text
                class="i-carbon:chevron-down text-[24rpx] text-gray transition-transform duration-200"
                :class="{ 'rotate-180': group.expanded }"
              />
            </view>

            <view v-if="group.expanded" class="flex flex-col gap-[2rpx] p-[12rpx]">
              <ride-RideRecordCard
                v-for="record in group.records"
                :key="record.id"
                :record="record"
                @share="handleShare"
              />
            </view>
          </view>
        </view>

        <!-- 空状态 -->
        <view v-if="records.length === 0 && !loading" class="flex flex-col items-center justify-center py-[80rpx]">
          <text class="i-carbon:bicycle mb-[16rpx] text-[80rpx] text-gray/40" />
          <text class="text-[26rpx] text-gray/70 font-500">
            暂无骑行记录
          </text>
          <text class="mt-[8rpx] text-[22rpx] text-gray/50">
            去地图页面开始骑行吧
          </text>
        </view>

        <!-- Loading -->
        <view v-if="loading" class="flex items-center justify-center py-[60rpx]">
          <wd-loading type="ring" />
        </view>
      </view>

      <!-- 底部合规声明 -->
      <view class="px-[20rpx] py-[12rpx]">
        <text class="block text-center text-[18rpx] text-gray/50">
          骑行记录仅本地存储 · 数据统计仅供参考 · 安全骑行第一
        </text>
      </view>

      <!-- 海报弹窗 -->
      <ride-RidePoster
        :visible="showPoster"
        :record="selectedRecord"
        @close="handleClosePoster"
      />
    </view>
  </view>
</template>
