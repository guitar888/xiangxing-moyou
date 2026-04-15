<script setup lang="ts">
import type { RideData } from '@/types/rideData'

defineProps<{
  rideData: RideData
  displayDistance: number
  displayDays: number
  displayRoutes: number
  loading: boolean
  showBadge: boolean
}>()

const emit = defineEmits<{
  goToData: []
}>()

function handleGoToData() {
  emit('goToData')
}
</script>

<template>
  <view class="relative z-10 animate-slide-in-left animate-delay-100 px-[24rpx] py-[16rpx]">
    <view class="mb-[16rpx] flex items-center justify-between">
      <text class="text-[28rpx] text-white font-600">
        骑行数据
      </text>
      <text class="text-[22rpx] text-gray" @click="handleGoToData">
        查看更多
      </text>
    </view>
    <view class="flex gap-[16rpx]">
      <view class="relative flex flex-1 flex-col cursor-pointer items-center rounded-[16rpx] bg-card p-[24rpx] shadow-[0_8rpx_32rpx_rgba(46,213,115,0.08),inset_0_1rpx_0_rgba(255,255,255,0.05)] transition-all duration-100 active:scale-95">
        <text
          v-if="rideData.totalDistance >= 1000"
          class="absolute right-[12rpx] top-[12rpx] text-[20rpx] transition-all duration-200"
          :class="showBadge ? 'translate-y-0 opacity-100 scale-100' : '-translate-y-[20rpx] opacity-0 scale-90'"
        >
          🌟
        </text>
        <text
          class="text-[40rpx] text-primary font-700 text-shadow-[0_0_12rpx_rgba(46,213,115,0.5),0_0_24rpx_rgba(46,213,115,0.3)]"
          :class="{ 'animate-pulse': loading }"
        >
          {{ displayDistance }}
        </text>
        <text class="mb-[8rpx] text-[20rpx] text-gray">
          公里
        </text>
        <text class="text-[22rpx] text-muted">
          累计里程
        </text>
      </view>
      <view class="relative flex flex-1 flex-col cursor-pointer items-center rounded-[16rpx] bg-card p-[24rpx] shadow-[0_8rpx_32rpx_rgba(46,213,115,0.08),inset_0_1rpx_0_rgba(255,255,255,0.05)] transition-all duration-100 active:scale-95">
        <text
          v-if="rideData.totalDays >= 30"
          class="absolute right-[12rpx] top-[12rpx] text-[20rpx] transition-all duration-200"
          :class="showBadge ? 'translate-y-0 opacity-100 scale-100' : '-translate-y-[20rpx] opacity-0 scale-90'"
        >
          🔥
        </text>
        <text
          class="text-[40rpx] text-primary font-700 text-shadow-[0_0_12rpx_rgba(46,213,115,0.5),0_0_24rpx_rgba(46,213,115,0.3)]"
          :class="{ 'animate-pulse': loading }"
        >
          {{ displayDays }}
        </text>
        <text class="mb-[8rpx] text-[20rpx] text-gray">
          天
        </text>
        <text class="text-[22rpx] text-muted">
          骑行天数
        </text>
      </view>
      <view class="flex flex-1 flex-col cursor-pointer items-center rounded-[16rpx] bg-card p-[24rpx] shadow-[0_8rpx_32rpx_rgba(46,213,115,0.08),inset_0_1rpx_0_rgba(255,255,255,0.05)] transition-all duration-100 active:scale-95">
        <text
          class="text-[40rpx] text-primary font-700 text-shadow-[0_0_12rpx_rgba(46,213,115,0.5),0_0_24rpx_rgba(46,213,115,0.3)]"
          :class="{ 'animate-pulse': loading }"
        >
          {{ displayRoutes }}
        </text>
        <text class="mb-[8rpx] text-[20rpx] text-gray">
          条
        </text>
        <text class="text-[22rpx] text-muted">
          骑行路线
        </text>
      </view>
    </view>
  </view>
</template>
