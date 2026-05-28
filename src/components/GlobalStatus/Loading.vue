<script setup lang="ts">
defineOptions({
  options: {
    virtualHost: true,
  },
})

withDefaults(defineProps<Props>(), {
  progress: 0,
  text: '加载中...'
})

interface Props {
  visible: boolean
  progress?: number
  text?: string
}
</script>

<template>
  <!-- #ifdef H5 -->
  <view v-if="visible" class="fixed inset-0 z-[99999] flex items-center justify-center bg-base/90 backdrop-blur-sm">
    <view class="text-center">
      <view class="animate-bounce mb-[20rpx] text-[80rpx] drop-shadow-[0_0_20px_var(--wot-color-theme)] filter">
        🏍️
      </view>
      <view class="mb-[30rpx] text-[28rpx] text-primary font-600">
        {{ text }}
      </view>
      <view class="mx-auto h-[6rpx] w-[300rpx] overflow-hidden rounded-[3rpx] bg-card shadow-[inset_0_1rpx_2px_rgba(0,0,0,0.3)]">
        <view
          class="h-full rounded-[3rpx] from-primary to-[var(--wot-color-theme-dark)] bg-gradient-to-r shadow-[0_0_12px_var(--wot-color-theme)] transition-all duration-300"
          :style="{ width: `${progress}%` }"
        />
      </view>
    </view>
  </view>
  <!-- #endif -->

  <!-- #ifndef H5 -->
  <view v-if="visible" class="mini-loading-page fixed inset-0 z-[9999] flex items-center justify-center">
    <view class="text-center">
      <view class="mini-loading-icon mb-[20rpx] text-[80rpx]">
        🏍️
      </view>
      <view class="mini-loading-text mb-[30rpx]">
        {{ text }}
      </view>
      <view class="mini-loading-progress mx-auto">
        <view
          class="mini-loading-progress-bar"
          :style="{ width: `${progress}%` }"
        />
      </view>
    </view>
  </view>
  <!-- #endif -->
</template>

<style lang="scss" scoped>
.mini-loading-page {
  background: rgba(18, 18, 18, 0.9);
}

.mini-loading-icon {
  text-shadow: 0 0 20px rgba(46, 213, 115, 0.6);
}

.mini-loading-text {
  color: #2ED573;
  font-size: 28rpx;
  font-weight: 600;
}

.mini-loading-progress {
  height: 6rpx;
  width: 300rpx;
  overflow: hidden;
  border-radius: 3rpx;
  background: #1E1E1E;
  box-shadow: inset 0 1rpx 2px rgba(0, 0, 0, 0.3);
}

.mini-loading-progress-bar {
  height: 100%;
  border-radius: 3rpx;
  background: linear-gradient(90deg, #2ED573 0%, #27C468 100%);
  box-shadow: 0 0 12px rgba(46, 213, 115, 0.4);
  transition: all 0.3s ease;
}
</style>
