<script setup lang="ts">
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
</template>
