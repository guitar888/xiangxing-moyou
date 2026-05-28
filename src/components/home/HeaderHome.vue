<script setup lang="ts">
defineOptions({
  options: {
    addGlobalClass: true,
    virtualHost: true,
    styleIsolation: 'shared',
  }
})

defineProps<{
  statusBarHeight: number
}>()

const { isDark } = useManualTheme()
</script>

<template>
  <!-- #ifdef H5 -->
  <view class="relative z-50 flex items-center justify-between border-b border-border bg-base px-[24rpx] pb-[16rpx] shadow-[0_4rpx_16rpx_rgba(46,213,115,0.08)]" :style="{ paddingTop: `${statusBarHeight + 16}px`, background: 'radial-gradient(circle at 50% 0%, rgba(var(--wot-color-theme-rgb),0.18) 0%, var(--wot-color-bg-base) 55%)' }">
    <!-- #endif -->
    <!-- #ifndef H5 -->
    <view class="relative z-50 flex items-center justify-between border-b border-border bg-base px-[32rpx] pb-[16rpx] shadow-[0_4rpx_16rpx_rgba(46,213,115,0.08)]" :style="{ paddingTop: `${statusBarHeight + 16}px`, background: 'linear-gradient(to bottom, rgba(46, 213, 115, 0.18) 0%, #121212 100%)' }">
      <!-- #endif -->
      <view class="relative z-10 w-[120rpx] flex items-center">
        <image
          class="h-[120rpx] w-[120rpx] rounded-[14rpx]"
          src="/static/logo.png"
          mode="aspectFit"
          :style="!isDark ? { filter: 'brightness(0.35) contrast(1.2)' } : {}"
        />
      </view>
      <view class="relative z-10 flex flex-1 flex-col items-center">
        <text class="text-[36rpx] font-700 tracking-[1px]" :style="{ color: '#2ED573' }">
          襄行摩友
        </text>
        <view class="mt-[8rpx] h-[4rpx] w-[56rpx] rounded-[2rpx]" :style="{ background: 'linear-gradient(to right, #2ED573, #FF7A00)' }" />
      </view>
      <view class="relative z-10 flex items-center gap-[8rpx]">
        <wd-icon name="location" size="32rpx" color="#2ED573" />
        <text class="text-[26rpx] text-white font-500">
          襄阳
        </text>
      </view>
      <!-- #ifdef H5 -->
    </view>
  <!-- #endif -->
  <!-- #ifndef H5 -->
  </view>
  <!-- #endif -->
</template>
