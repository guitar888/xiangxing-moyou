<script setup lang="ts">
defineProps<{
  statusBarHeight: number
  currentCity: string
}>()

const emit = defineEmits<{
  cityChange: []
}>()

function handleCityChange() {
  emit('cityChange')
}
</script>

<template>
  <view class="border-border bg-base relative flex items-center justify-between border-b px-[24rpx] pb-[16rpx] pt-[var(--status-bar-height)] shadow-[0_4rpx_16rpx_rgba(46,213,115,0.08)]" :style="{ paddingTop: `${statusBarHeight + 16}px`, background: 'radial-gradient(circle at 50% 0%, rgba(var(--wot-color-theme-rgb),0.18) 0%, var(--wot-color-bg-base) 55%)' }">
    <view class="w-[120rpx] flex items-center">
      <image class="h-[64rpx] w-[64rpx] rounded-[14rpx]" src="/static/icons/logo.png" mode="aspectFit" />
    </view>
    <view class="flex flex-1 flex-col items-center">
      <text class="text-[36rpx] text-[var(--wot-color-theme)] font-700 tracking-[1px]">
        襄行摩友
      </text>
      <view class="mt-[8rpx] h-[4rpx] w-[56rpx] rounded-[2rpx] from-[var(--wot-color-theme)] to-[var(--wot-color-warning)] bg-gradient-to-r" />
    </view>
    <view class="bg-card active:bg-hover flex cursor-pointer items-center gap-[8rpx] rounded-[10rpx] px-[18rpx] py-[12rpx] transition-all duration-100 active:scale-95" @click="handleCityChange">
      <wd-icon name="location" size="32rpx" color="var(--wot-color-theme)" />
      <text class="text-[26rpx] text-white font-500">
        {{ currentCity }}
      </text>
      <wd-icon name="arrow-down" size="20rpx" color="var(--wot-color-text-gray)" />
    </view>
  </view>
</template>