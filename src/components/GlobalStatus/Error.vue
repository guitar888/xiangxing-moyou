<script setup lang="ts">
defineOptions({
  options: {
    virtualHost: true,
  },
})

interface Props {
  visible: boolean
  title?: string
  buttonText?: string
}

withDefaults(defineProps<Props>(), {
  title: '加载失败',
  buttonText: '重新加载',
})

const emit = defineEmits<{
  retry: []
}>()
</script>

<template>
  <!-- #ifdef H5 -->
  <view v-if="visible" class="bg-base/90 fixed inset-0 z-[9999] flex items-center justify-center backdrop-blur-sm">
    <view class="text-center">
      <view class="mb-[20rpx] text-[80rpx] drop-shadow-[0_0_20px_var(--wot-color-warning)] filter">
        ⚠️
      </view>
      <text class="mb-[40rpx] block text-[32rpx] text-white font-600">
        {{ title }}
      </text>
      <view
        class="from-primary mx-auto cursor-pointer rounded-[12rpx] to-[var(--wot-color-theme-dark)] bg-gradient-to-r px-[40rpx] py-[20rpx] shadow-[0_4rpx_16px_var(--wot-color-theme)] transition-all duration-100 active:scale-95 active:shadow-none"
        @click="emit('retry')"
      >
        <text class="text-[26rpx] text-base font-600">
          {{ buttonText }}
        </text>
      </view>
    </view>
  </view>
  <!-- #endif -->

  <!-- #ifndef H5 -->
  <view v-if="visible" class="mini-error-page fixed inset-0 z-[9999] flex items-center justify-center">
    <view class="text-center">
      <view class="mb-[20rpx] text-[80rpx] mini-error-icon">
        ⚠️
      </view>
      <text class="mb-[40rpx] block mini-error-title">
        {{ title }}
      </text>
      <view class="mini-error-button" @click="emit('retry')">
        <text class="mini-error-button-text">
          {{ buttonText }}
        </text>
      </view>
    </view>
  </view>
  <!-- #endif -->
</template>

<style lang="scss" scoped>
.mini-error-page {
  background: rgba(18, 18, 18, 0.9);
}

.mini-error-icon {
  text-shadow: 0 0 20px rgba(255, 122, 0, 0.6);
}

.mini-error-title {
  font-size: 32rpx;
  color: #FFFFFF;
  font-weight: 600;
}

.mini-error-button {
  margin: 0 auto;
  cursor: pointer;
  border-radius: 12rpx;
  background: linear-gradient(90deg, #2ED573 0%, #27C468 100%);
  padding: 20rpx 40rpx;
  box-shadow: 0 4rpx 16px rgba(46, 213, 115, 0.3);
}

.mini-error-button-text {
  font-size: 26rpx;
  color: #121212;
  font-weight: 600;
}
</style>
