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
  delete: [id: string]
  share: [record: RideRecord]
}>()

const { formatDuration, formatDate, formatTime } = useRideStats()

function handleDelete() {
  uni.showModal({
    title: '确认删除',
    content: '确定要删除这条骑行记录吗？',
    success: (res) => {
      if (res.confirm) {
        emit('delete', props.record.id)
      }
    },
  })
}

function handleShare() {
  emit('share', props.record)
}
</script>

<template>
  <view class="bg-card rounded-[12rpx] p-[16rpx]">
    <!-- 顶部：日期和操作 -->
    <view class="flex justify-between items-center mb-[12rpx]">
      <view>
        <text class="text-[24rpx] text-white font-600">{{ formatDate(record.startTime) }}</text>
        <text class="text-[20rpx] text-gray ml-[12rpx]">{{ formatTime(record.startTime) }}</text>
      </view>
      <view class="flex gap-[8rpx]">
        <button
          class="w-[48rpx] h-[48rpx] rounded-full bg-base flex items-center justify-center"
          @click="handleShare"
        >
          <text class="i-carbon:share text-[24rpx] text-gray" />
        </button>
        <button
          class="w-[48rpx] h-[48rpx] rounded-full bg-base flex items-center justify-center"
          @click="handleDelete"
        >
          <text class="i-carbon:trash-can text-[24rpx] text-gray" />
        </button>
      </view>
    </view>

    <!-- 路线名称 -->
    <view class="flex items-center gap-[8rpx] mb-[12rpx]">
      <text class="i-carbon:location text-[24rpx] text-primary" />
      <text class="text-[26rpx] text-white font-500">{{ record.routeName || '自由骑行' }}</text>
    </view>

    <!-- 数据统计 -->
    <view class="flex gap-[24rpx]">
      <view class="flex items-center gap-[6rpx]">
        <text class="i-carbon:distance text-[22rpx] text-gray" />
        <text class="text-[24rpx] text-white">{{ record.distance || 0 }}</text>
        <text class="text-[20rpx] text-gray">km</text>
      </view>
      <view class="flex items-center gap-[6rpx]">
        <text class="i-carbon:time text-[22rpx] text-gray" />
        <text class="text-[24rpx] text-white">{{ formatDuration(record.duration) }}</text>
      </view>
      <view v-if="record.avgSpeed" class="flex items-center gap-[6rpx]">
        <text class="i-carbon:speedometer text-[22rpx] text-gray" />
        <text class="text-[24rpx] text-white">{{ record.avgSpeed.toFixed(1) }}</text>
        <text class="text-[20rpx] text-gray">km/h</text>
      </view>
    </view>
  </view>
</template>
