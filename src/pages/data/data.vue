<script setup lang="ts">
/**
 * 骑行数据页面
 * 展示骑行统计、记录，支持海报分享
 */
import type { RecordFilter } from '@/types'

definePage({
  name: 'data',
  layout: 'tabbar',
  style: {
    navigationBarTitleText: '骑行数据',
    navigationBarBackgroundColor: '#121212',
    navigationBarTextStyle: 'white',
  },
})

// ================================================
// 统计数据
// ================================================

const {
  stats,
  records,
  currentFilter,
  loading,
  loadRecords,
  setFilter,
  formatDuration,
  formatDate,
  formatFullDate,
} = useRideStats()

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
  <view class="min-h-screen bg-base pb-[120rpx]">
    <!-- 骑行中提示 -->
    <view v-if="isRiding" class="bg-primary/20 px-[24rpx] py-[16rpx] mx-[24rpx] mt-[16rpx] rounded-[12rpx]">
      <view class="flex items-center justify-between">
        <view class="flex items-center gap-[12rpx]">
          <view class="w-[16rpx] h-[16rpx] bg-primary rounded-full animate-pulse" />
          <text class="text-[26rpx] text-primary font-600">骑行中</text>
          <text class="text-[26rpx] text-white font-600">{{ formattedDuration }}</text>
        </view>
        <text class="text-[22rpx] text-gray">去结束骑行</text>
      </view>
    </view>

    <!-- 统计卡片 -->
    <view class="p-[24rpx]">
      <ride-StatsCard :stats="stats" />
    </view>

    <!-- 筛选 -->
    <view class="px-[24rpx] mb-[16rpx]">
      <view class="flex gap-[12rpx]">
        <button
          v-for="f in filters"
          :key="f.key"
          class="px-[24rpx] py-[10rpx] rounded-[28rpx] text-[22rpx] font-500 transition-all"
          :class="currentFilter === f.key ? 'bg-primary text-white' : 'bg-card text-gray'"
          @click="setFilter(f.key)"
        >
          {{ f.label }}
        </button>
      </view>
    </view>

    <!-- 骑行记录列表 -->
    <view class="px-[24rpx]">
      <view class="flex justify-between items-center mb-[16rpx]">
        <text class="text-[28rpx] font-600 text-white">骑行记录</text>
        <text class="text-[22rpx] text-gray">{{ records.length }} 条</text>
      </view>

      <view class="space-y-[16rpx]">
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
        <text class="i-carbon:bicycle text-[80rpx] text-gray mb-[16rpx]" />
        <text class="text-[26rpx] text-gray">暂无骑行记录</text>
        <text class="text-[22rpx] text-gray mt-[8rpx]">去地图页面开始骑行吧</text>
      </view>

      <!-- Loading -->
      <view v-if="loading" class="flex items-center justify-center py-[60rpx]">
        <wd-loading type="ring" />
      </view>
    </view>

    <!-- 海报弹窗 -->
    <ride-RidePoster
      :visible="showPoster"
      :record="selectedRecord"
      @close="handleClosePoster"
    />
  </view>
</template>
