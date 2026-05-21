<script setup lang="ts">
/**
 * 骑行数据页面
 * 展示骑行统计、记录，支持海报分享
 */
import type { RecordFilter } from '@/types'
import RideLineChart from '@/subEcharts/echarts/components/RideLineChart.vue'

defineOptions({
  componentPlaceholder: {
    RideLineChart: 'view',
  },
})

definePage({
  name: 'data',
  layout: 'tabbar',
  style: {
    navigationBarTitleText: '骑行数据',
    navigationStyle: 'custom',
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
  setFilter,
} = useRideStats()

// ================================================
// 骑行记录
// ================================================

const {
  isRiding,
  formattedDuration,
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
    const monthKeys = [...expandedMonths.value].filter(k => {
      const exists = groupedRecords.value.some(g => g.monthKey === k)
      return exists
    })
    expandedMonths.value = new Set(monthKeys)
  }
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
      const date = new Date(monthKey + '-01')
      const monthLabel = `${date.getFullYear()}年${date.getMonth() + 1}月`
      return {
        month: monthLabel,
        monthKey,
        records: groups[monthKey],
        expanded: expandedMonths.value.has(monthKey),
      }
    })
})

function toggleMonth(monthKey: string) {
  if (expandedMonths.value.has(monthKey)) {
    expandedMonths.value.delete(monthKey)
  } else {
    expandedMonths.value.add(monthKey)
  }
}

// ================================================
// 海报
// ================================================

const showPoster = ref(false)
const selectedRecord = ref<any>(null)

function handleShare(record: any) {
  selectedRecord.value = record
  showPoster.value = true
}

function handleClosePoster() {
  showPoster.value = false
  selectedRecord.value = null
}

// ================================================
// 筛选
// ================================================

const filters: { key: RecordFilter; label: string }[] = [
  { key: 'all', label: '全部' },
  { key: 'month', label: '本月' },
  { key: 'week', label: '本周' },
]

// ================================================
// 生命周期
// ================================================

onMounted(() => {
  loadRecords()
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
          <text class="i-carbon:analytics text-[36rpx] text-primary" />
          <text class="text-[32rpx] font-700 tracking-[1px]" :style="{ color: '#2ED573' }">骑行数据</text>
        </view>
      </view>

      <!-- 骑行中横幅 -->
      <view v-if="isRiding" class="mx-[24rpx] mt-[12rpx] bg-gradient-to-r from-primary/25 to-primary/10 px-[24rpx] py-[14rpx] rounded-[20rpx] border border-primary/20 shadow-lg">
        <view class="flex items-center justify-between">
          <view class="flex items-center gap-[12rpx]">
            <view class="w-[14rpx] h-[14rpx] bg-primary rounded-full animate-pulse" />
            <text class="text-[24rpx] text-primary font-600 flex items-center gap-[6rpx]">
              <text class="i-fluent:vehicle-motorcycle-28-filled text-[24rpx]" />
              骑行中
            </text>
            <text class="text-[24rpx] text-white font-600 ml-[8rpx]">{{ formattedDuration }}</text>
          </view>
          <wd-button type="primary" size="small" custom-class="rounded-[24rpx] font-600">
            <view class="flex items-center gap-[4rpx]">
              <text class="i-fluent:vehicle-motorcycle-28-filled text-[20rpx]" />
              <text class="text-[20rpx]">结束骑行</text>
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
      <view class="px-[24rpx] mt-[16rpx]">
        <view class="bg-card rounded-[16rpx] p-[20rpx] border border-white/10 shadow-lg">
          <text class="text-[24rpx] font-600 text-white mb-[16rpx] block flex items-center gap-[8rpx]">
            <text class="i-carbon:trending-up text-[24rpx] text-primary" />
            骑行趋势
          </text>
          <RideLineChart :data="monthlyStats" />
        </view>
      </view>

      <!-- 筛选 -->
      <view class="px-[24rpx] mt-[16rpx]">
        <view class="flex gap-[16rpx] justify-between">
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
      <view class="flex-1 px-[24rpx] mt-[16rpx] pb-[20rpx]">
        <view class="flex justify-between items-center mb-[16rpx]">
          <text class="text-[28rpx] font-600 text-white flex items-center gap-[6rpx]">
            <text class="i-carbon:history text-[24rpx] text-primary" />
            骑行记录
          </text>
          <text class="text-[22rpx] text-gray">{{ records.length }} 条</text>
        </view>

        <view class="flex flex-col gap-[16rpx]">
          <view
            v-for="group in groupedRecords"
            :key="group.monthKey"
            class="bg-card rounded-[16rpx] overflow-hidden border border-white/10"
          >
            <view
              class="flex items-center justify-between p-[20rpx] bg-card/80"
              @click="toggleMonth(group.monthKey)"
            >
              <view class="flex items-center gap-[12rpx]">
                <text class="i-carbon:calendar text-[28rpx] text-primary" />
                <text class="text-[26rpx] text-white font-600">{{ group.month }}</text>
                <text class="text-[22rpx] text-gray">({{ group.records.length }}次骑行)</text>
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
          <text class="i-carbon:bicycle text-[80rpx] text-gray/40 mb-[16rpx]" />
          <text class="text-[26rpx] text-gray/70 font-500">暂无骑行记录</text>
          <text class="text-[22rpx] text-gray/50 mt-[8rpx]">去地图页面开始骑行吧</text>
        </view>

        <!-- Loading -->
        <view v-if="loading" class="flex items-center justify-center py-[60rpx]">
          <wd-loading type="ring" />
        </view>
      </view>

      <!-- 底部合规声明 -->
      <view class="px-[20rpx] py-[12rpx]">
        <text class="text-[18rpx] text-gray/50 text-center block">
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
