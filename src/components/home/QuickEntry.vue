<script setup lang="ts">
import type { QuickEntry } from '@/types/rideData'

defineProps<{
  entries: QuickEntry[]
}>()

const emit = defineEmits<{
  entryClick: [entry: QuickEntry]
}>()

function handleEntryClick(entry: QuickEntry) {
  emit('entryClick', entry)
}
</script>

<template>
  <view class="relative z-1 px-[24rpx] py-[16rpx] pb-[24rpx]">
    <view class="mb-[16rpx] flex items-center justify-between">
      <text class="text-[28rpx] text-white font-600">
        快捷入口
      </text>
    </view>
    <view class="grid grid-cols-3 gap-[16rpx]">
      <view
        v-for="(entry, index) in entries"
        :key="index"
        class="bg-card flex flex-col items-center rounded-[16rpx] p-[24rpx_16rpx] shadow-card shadow-inset transition-all duration-100"
        :class="[
          entry.highlight
            ? 'cursor-pointer border-[1.5rpx] border-primary bg-gradient-to-br from-[rgba(46,213,115,0.08)] to-transparent active:scale-95 active:border-primary active:shadow-glow'
            : 'cursor-pointer active:bg-hover active:scale-95',
        ]"
        @click="handleEntryClick(entry)"
      >
        <view
          class="mb-[12rpx] h-[80rpx] w-[80rpx] flex items-center justify-center rounded-[16rpx] transition-all duration-100"
          :class="entry.highlight ? 'bg-[rgba(46,213,115,0.2)] shadow-[0_2rpx_8rpx_rgba(46,213,115,0.2)]' : 'bg-hover'"
        >
          <wd-icon :name="entry.icon" size="48rpx" :color="entry.highlight ? 'var(--wot-color-theme)' : 'var(--wot-color-warning)'" />
        </view>
        <text class="mb-[4rpx] text-[24rpx] text-white font-500">
          {{ entry.name }}
        </text>
        <text class="text-[20rpx] text-gray">
          {{ entry.subname }}
        </text>
        <view v-if="entry.badge" class="absolute right-[8rpx] top-[8rpx] text-[18rpx] text-base bg-warning px-[8rpx] py-[2rpx] rounded-[6rpx]">
          {{ entry.badge }}
        </view>
      </view>
    </view>
  </view>
</template>