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
  <view class="relative overflow-hidden border border-white/10 rounded-[16rpx] bg-card">
    <view class="pointer-events-none absolute inset-0 opacity-10">
      <view class="absolute right-0 top-0 h-[120rpx] w-[120rpx] rounded-full bg-primary/30 blur-[60rpx]" />
      <view class="absolute bottom-0 left-0 h-[80rpx] w-[80rpx] rounded-full bg-primary/20 blur-[40rpx]" />
    </view>

    <view class="relative p-[20rpx]">
      <view class="mb-[16rpx] flex items-start justify-between">
        <view class="flex items-center gap-[12rpx]">
          <view>
            <text class="block text-[26rpx] text-white font-600">
              {{ record.routeName || '自由骑行' }}
            </text>
            <text class="mt-[2rpx] text-[20rpx] text-gray">
              {{ formattedDate }} {{ formatTime(record.startTime) }}
            </text>
          </view>
        </view>

        <view
          class="h-[48rpx] w-[48rpx] flex items-center justify-center rounded-full bg-primary"
          @click="handleShare"
        >
          <text class="i-carbon:share text-[22rpx] text-[#ffffff]" />
        </view>
      </view>

      <view class="flex items-center gap-[32rpx]">
        <view class="flex flex-col">
          <text class="text-[32rpx] text-primary font-700">
            {{ record.distance || 0 }}
          </text>
          <text class="text-[18rpx] text-gray">
            公里
          </text>
        </view>

        <view class="h-[48rpx] w-[2rpx] bg-white/10" />

        <view class="flex flex-col">
          <text class="text-[32rpx] text-white font-700">
            {{ formatDuration(record.duration) }}
          </text>
          <text class="text-[18rpx] text-gray">
            时长
          </text>
        </view>

        <view class="h-[48rpx] w-[2rpx] bg-white/10" />

        <view class="flex flex-col">
          <text class="text-[32rpx] text-white font-700">
            {{ record.avgSpeed?.toFixed(1) || '0' }}
          </text>
          <text class="text-[18rpx] text-gray">
            均速km/h
          </text>
        </view>
      </view>

      <view class="mt-[16rpx] flex items-center gap-[8rpx]">
        <view class="h-[4rpx] flex-1 rounded-full from-primary to-transparent bg-gradient-to-r" />
        <text class="i-carbon:flag text-[20rpx] text-primary" />
      </view>
    </view>
  </view>
</template>
