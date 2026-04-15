<script setup lang="ts">
interface Props {
  visible: boolean
  progress?: number
  text?: string
}

withDefaults(defineProps<Props>(), {
  progress: 0,
  text: '加载中...',
})
</script>

<script lang="ts">
export default {
  options: {
    virtualHost: true,
  },
}
</script>

<template>
  <view v-if="visible" class="bg-base/90 fixed inset-0 z-[9999] flex items-center justify-center backdrop-blur-sm">
    <view class="text-center">
      <view class="mb-[20rpx] animate-bounce text-[80rpx] drop-shadow-[0_0_20px_var(--wot-color-theme)] filter">
        🏍️
      </view>
      <view class="text-primary mb-[30rpx] text-[28rpx] font-600">
        {{ text }}
      </view>
      <view class="bg-card mx-auto h-[6rpx] w-[300rpx] overflow-hidden rounded-[3rpx] shadow-[inset_0_1rpx_2px_rgba(0,0,0,0.3)]">
        <view
          class="from-primary h-full rounded-[3rpx] to-[var(--wot-color-theme-dark)] bg-gradient-to-r shadow-[0_0_12px_var(--wot-color-theme)] transition-all duration-300"
          :style="{ width: `${progress}%` }"
        />
      </view>
    </view>
  </view>
</template>
