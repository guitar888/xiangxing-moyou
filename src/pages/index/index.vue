<script setup lang="ts">
/**
 * 首页页面
 */
definePage({
  name: 'home',
  layout: 'tabbar',
  style: {
    navigationBarTitleText: '襄行摩友',
    navigationStyle: 'custom',
  },
})

// 系统信息
const { statusBarHeight } = useSystemInfo()

// 首页数据
const {
  currentCity,
  bannerList,
  quickEntries,
  rideData,
  displayDistance,
  displayDays,
  displayRoutes,
  showBadge,
  isLoaded,
  activityList,
} = useHomeData()


</script>

<template>
  <view class="relative min-h-screen overflow-hidden from-base via-[var(--wot-color-bg-hover)] to-[var(--wot-color-bg-card)] bg-gradient-to-br">
    <!-- 背景装饰 -->
    <!-- #ifdef H5 -->
    <view class="animate-breathe pointer-events-none absolute inset-x-0 top-0 z-0 h-[240rpx]" :style="{ background: 'radial-gradient(circle at top, rgba(var(--wot-color-theme-rgb),0.18), transparent 55%)' }" />
    <view class="pointer-events-none absolute inset-0 z-0 opacity-5" :style="{ background: `repeating-linear-gradient(45deg, transparent, transparent 40rpx, var(--wot-color-theme) 40rpx, var(--wot-color-theme) 80rpx), repeating-linear-gradient(-45deg, transparent, transparent 40rpx, var(--wot-color-theme) 40rpx, var(--wot-color-theme) 80rpx)` }" />
    <!-- #endif -->
    <!-- #ifndef H5 -->
    <view class="pointer-events-none absolute inset-x-0 top-0 z-0 h-[240rpx]" :style="{ background: 'linear-gradient(to bottom, rgba(46, 213, 115, 0.25), transparent 100%)' }" />
    <view class="pointer-events-none absolute inset-0 z-0 opacity-3" :style="{ background: 'repeating-linear-gradient(45deg, transparent, transparent 40rpx, #2ED573 40rpx, #2ED573 80rpx), repeating-linear-gradient(-45deg, transparent, transparent 40rpx, #2ED573 40rpx, #2ED573 80rpx)' }" />
    <!-- #endif -->

    <!-- 页面内容（GlobalPageStatus 组件控制 loading/error 叠加层显示） -->
    <view class="relative z-10">
      <home-HeaderHome :status-bar-height="statusBarHeight" :current-city="currentCity" />
      <Banner :list="bannerList" />
      <home-QuickEntry :entries="quickEntries" />
      <home-RideDataCard
        :loading="!isLoaded"
        :ride-data="rideData"
        :display-distance="displayDistance"
        :display-days="displayDays"
        :display-routes="displayRoutes"
        :show-badge="showBadge"
      />
      <home-ActivityList :activity-list="activityList" />
      <common-PageFooter />
    </view>
  </view>
</template>
