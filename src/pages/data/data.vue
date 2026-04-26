<script setup lang="ts">
/**
 * 骑行数据页面
 * 展示骑行统计、记录，支持海报分享
 */
import type { RecordFilter } from '@/types'
import { LineChart } from 'echarts/charts'
import { DatasetComponent, GridComponent, LegendComponent, TooltipComponent } from 'echarts/components'
import * as echarts from 'echarts/core'
import { CanvasRenderer } from 'echarts/renderers'

echarts.use([
  GridComponent,
  LegendComponent,
  TooltipComponent,
  DatasetComponent,
  LineChart,
  CanvasRenderer,
])

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
  formatDuration,
  formatDate,
  formatFullDate,
} = useRideStats()

// ================================================
// 图表配置
// ================================================

const chartOption = computed(() => {
  const monthlyData = monthlyStats.value || []
  const sortedData = [...monthlyData].sort((a, b) => a.month.localeCompare(b.month))
  
  return {
    tooltip: {
      trigger: 'axis',
      backgroundColor: 'rgba(18, 18, 18, 0.9)',
      borderColor: '#2ED573',
      textStyle: {
        color: '#FFFFFF'
      }
    },
    legend: {
      data: ['骑行距离', '骑行次数'],
      top: 10,
      textStyle: {
        color: '#8D99AE'
      }
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: sortedData.map(item => item.month),
      axisLine: {
        lineStyle: {
          color: '#333333'
        }
      },
      axisLabel: {
        color: '#8D99AE'
      }
    },
    yAxis: [
      {
        type: 'value',
        name: '距离(km)',
        position: 'left',
        axisLine: {
          lineStyle: {
            color: '#2ED573'
          }
        },
        axisLabel: {
          color: '#8D99AE'
        },
        splitLine: {
          lineStyle: {
            color: '#333333'
          }
        }
      },
      {
        type: 'value',
        name: '次数',
        position: 'right',
        axisLine: {
          lineStyle: {
            color: '#FF7A00'
          }
        },
        axisLabel: {
          color: '#8D99AE'
        },
        splitLine: {
          show: false
        }
      }
    ],
    series: [
      {
        name: '骑行距离',
        type: 'line',
        stack: 'Total',
        data: sortedData.map(item => item.totalDistance),
        smooth: true,
        itemStyle: {
          color: '#2ED573'
        },
        areaStyle: {
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              {
                offset: 0,
                color: 'rgba(46, 213, 115, 0.3)'
              },
              {
                offset: 1,
                color: 'rgba(46, 213, 115, 0.1)'
              }
            ]
          }
        }
      },
      {
        name: '骑行次数',
        type: 'line',
        yAxisIndex: 1,
        data: sortedData.map(item => item.totalRides),
        smooth: true,
        itemStyle: {
          color: '#FF7A00'
        },
        areaStyle: {
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              {
                offset: 0,
                color: 'rgba(255, 122, 0, 0.3)'
              },
              {
                offset: 1,
                color: 'rgba(255, 122, 0, 0.1)'
              }
            ]
          }
        }
      }
    ]
  }
})

// ================================================
// 骑行记录
// ================================================

const {
  isRiding,
  formattedDuration,
  removeRecord,
} = useRideRecord()

// ================================================
// 海报
// ================================================

const showPoster = ref(false)
const selectedRecord = ref<any>(null)

function handleShare(record: any) {
  selectedRecord.value = record
  showPoster.value = true
}

function handleDelete(id: string) {
  removeRecord(id)
  uni.showToast({
    title: '已删除',
    icon: 'success',
  })
}

function handleClosePoster() {
  showPoster.value = false
  selectedRecord.value = null
}

// ================================================
// 筛选
// ================================================

const filters: { key: RecordFilter; label: string }[] = [
  { key: 'week', label: '本周' },
  { key: 'month', label: '本月' },
  { key: 'all', label: '全部' },
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
        <view class="flex items-center gap-[8rpx] rounded-[10rpx] bg-card/50 px-[16rpx] py-[10rpx]">
          <text class="i-carbon:information text-[24rpx] text-primary" />
          <text class="text-[22rpx] text-white/80 font-500">数据统计</text>
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
          <uni-echarts custom-class="h-[400rpx] w-full" :option="chartOption" />
        </view>
      </view>

      <!-- 筛选 -->
      <view class="px-[24rpx] mt-[16rpx]">
        <view class="flex gap-[12rpx]">
          <wd-button
            v-for="f in filters"
            :key="f.key"
            :type="currentFilter === f.key ? 'primary' : 'info'"
            size="medium"
            :custom-class="`flex-1 rounded-[28rpx] font-500 ${currentFilter === f.key ? 'bg-primary text-white' : 'bg-card text-gray border border-white/10'}`"
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

        <view class="flex flex-col gap-[12rpx]">
          <ride-RideRecordCard
            v-for="record in records"
            :key="record.id"
            :record="record"
            @delete="handleDelete"
            @share="handleShare"
          />
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
