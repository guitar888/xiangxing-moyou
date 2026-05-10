<script setup lang="ts">
/**
 * 骑行记录卡片组件
 */
import type { RideRecord } from '@/types'

interface Props {
  record: RideRecord
}

const props = defineProps<Props>()

const emit = defineEmits<{
  share: [record: RideRecord]
}>()

const { formatDuration, formatTime } = useRideStats()

function handleShare() {
  emit('share', props.record)
}

const formattedDate = computed(() => {
  const date = new Date(props.record.startTime)
  const month = date.getMonth() + 1
  const day = date.getDate()
  return `${month}月${day}日`
})
</script>

<template>
  <view class="relative overflow-hidden rounded-[16rpx] bg-card border border-white/10">
    <view class="absolute inset-0 opacity-10 pointer-events-none">
      <view class="absolute right-0 top-0 w-[120rpx] h-[120rpx] rounded-full bg-primary/30 blur-[60rpx]" />
      <view class="absolute left-0 bottom-0 w-[80rpx] h-[80rpx] rounded-full bg-primary/20 blur-[40rpx]" />
    </view>

    <view class="relative p-[20rpx]">
      <view class="flex items-start justify-between mb-[16rpx]">
        <view class="flex items-center gap-[12rpx]">
          <view>
            <text class="text-[26rpx] text-white font-600 block">{{ record.routeName || '自由骑行' }}</text>
            <text class="text-[20rpx] text-gray mt-[2rpx]">{{ formattedDate }} {{ formatTime(record.startTime) }}</text>
          </view>
        </view>

        <view
          class="w-[48rpx] h-[48rpx] rounded-full bg-primary flex items-center justify-center"
          @click="handleShare"
        >
          <text class="i-carbon:share text-[22rpx] text-[#ffffff]" />
        </view>
      </view>

      <view class="flex items-center gap-[32rpx]">
        <view class="flex flex-col">
          <text class="text-[32rpx] font-700 text-primary">{{ record.distance || 0 }}</text>
          <text class="text-[18rpx] text-gray">公里</text>
        </view>

        <view class="w-[2rpx] h-[48rpx] bg-white/10" />

        <view class="flex flex-col">
          <text class="text-[32rpx] font-700 text-white">{{ formatDuration(record.duration) }}</text>
          <text class="text-[18rpx] text-gray">时长</text>
        </view>

        <view class="w-[2rpx] h-[48rpx] bg-white/10" />

        <view class="flex flex-col">
          <text class="text-[32rpx] font-700 text-white">{{ record.avgSpeed?.toFixed(1) || '0' }}</text>
          <text class="text-[18rpx] text-gray">均速km/h</text>
        </view>
      </view>

      <view class="mt-[16rpx] flex items-center gap-[8rpx]">
        <view class="h-[4rpx] flex-1 rounded-full bg-gradient-to-r from-primary to-transparent" />
        <text class="i-carbon:flag text-[20rpx] text-primary" />
      </view>
    </view>
  </view>
</template>
