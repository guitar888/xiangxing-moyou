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

const { toHours } = useRideStats()
</script>

<template>
  <view class="rounded-[16rpx] bg-card p-[20rpx]">
    <!-- 标题 -->
    <text class="mb-[16rpx] block text-[24rpx] text-gray">
      {{ title }}
    </text>

    <!-- 数据卡片 -->
    <view class="flex justify-between">
      <view class="flex flex-1 flex-col items-center">
        <text class="text-[48rpx] text-primary font-700">
          {{ props.stats.totalDistance }}
        </text>
        <text class="mt-[4rpx] text-[22rpx] text-gray">
          总里程(km)
        </text>
      </view>

      <view class="w-[2rpx] bg-base" />

      <view class="flex flex-1 flex-col items-center">
        <text class="text-[48rpx] text-white font-700">
          {{ props.stats.totalRides }}
        </text>
        <text class="mt-[4rpx] text-[22rpx] text-gray">
          骑行次数
        </text>
      </view>

      <view class="w-[2rpx] bg-base" />

      <view class="flex flex-1 flex-col items-center">
        <text class="text-[48rpx] text-white font-700">
          {{ toHours(props.stats.totalDuration) }}
        </text>
        <text class="mt-[4rpx] text-[22rpx] text-gray">
          总时长(h)
        </text>
      </view>
    </view>

    <!-- 平均数据 -->
    <view class="mt-[20rpx] flex justify-around border-t border-base pt-[20rpx]">
      <view class="flex items-center gap-[8rpx]">
        <text class="i-carbon:delta text-[24rpx] text-primary" />
        <text class="text-[22rpx] text-gray">
          均距
        </text>
        <text class="text-[24rpx] text-white font-600">
          {{ props.stats.avgDistance }}km
        </text>
      </view>
      <view class="flex items-center gap-[8rpx]">
        <text class="i-carbon:speedometer text-[24rpx] text-primary" />
        <text class="text-[22rpx] text-gray">
          均速
        </text>
        <text class="text-[24rpx] text-white font-600">
          {{ props.stats.avgSpeed }}km/h
        </text>
      </view>
    </view>
  </view>
</template>
