<script setup lang="ts">
/**
 * 骑行统计数据卡片组件
 */
import type { RideStats } from '@/types'

interface Props {
  stats: RideStats
  title?: string
}

const props = withDefaults(defineProps<Props>(), {
  title: '本月骑行统计',
})

const { formatDuration } = useRideStats()
</script>

<template>
  <view class="bg-card rounded-[16rpx] p-[20rpx]">
    <!-- 标题 -->
    <text class="text-[24rpx] text-gray mb-[16rpx] block">{{ title }}</text>

    <!-- 数据卡片 -->
    <view class="flex justify-between">
      <view class="flex-1 flex flex-col items-center">
        <text class="text-[48rpx] font-700 text-primary">{{ stats.totalRides }}</text>
        <text class="text-[22rpx] text-gray mt-[4rpx]">骑行次数</text>
      </view>

      <view class="w-[2rpx] bg-base" />

      <view class="flex-1 flex flex-col items-center">
        <text class="text-[48rpx] font-700 text-white">{{ stats.totalDistance }}</text>
        <text class="text-[22rpx] text-gray mt-[4rpx]">总里程(km)</text>
      </view>

      <view class="w-[2rpx] bg-base" />

      <view class="flex-1 flex flex-col items-center">
        <text class="text-[48rpx] font-700 text-white">{{ formatDuration(stats.totalDuration) }}</text>
        <text class="text-[22rpx] text-gray mt-[4rpx]">总时长</text>
      </view>
    </view>

    <!-- 平均数据 -->
    <view class="flex justify-around mt-[20rpx] pt-[20rpx] border-t border-base">
      <view class="flex items-center gap-[8rpx]">
        <text class="i-carbon:delta text-[24rpx] text-primary" />
        <text class="text-[22rpx] text-gray">均距</text>
        <text class="text-[24rpx] text-white font-600">{{ stats.avgDistance }}km</text>
      </view>
      <view class="flex items-center gap-[8rpx]">
        <text class="i-carbon:speedometer text-[24rpx] text-primary" />
        <text class="text-[22rpx] text-gray">均速</text>
        <text class="text-[24rpx] text-white font-600">{{ stats.avgSpeed }}km/h</text>
      </view>
    </view>
  </view>
</template>
