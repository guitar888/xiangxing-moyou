<script setup lang="ts">
defineOptions({
  options: {
    virtualHost: true,
  },
})

interface Props {
  title?: string
  subtitle?: string
  icon?: string
  showBack?: boolean
}

withDefaults(defineProps<Props>(), {
  title: '页面建设中',
  subtitle: '该功能正在开发中，敬请期待',
  icon: '🛠️',
  showBack: true,
})

const emit = defineEmits<{
  back: []
}>()

function handleBack() {
  emit('back')
  uni.navigateBack()
}
</script>

<template>
  <!-- #ifdef H5 -->
  <view class="relative min-h-screen flex flex-col items-center justify-center bg-base p-[40rpx]">
    <view class="pointer-events-none absolute inset-0 opacity-5">
      <view class="absolute left-0 top-0 h-full w-full bg-[repeating-linear-gradient(45deg,transparent,transparent_40rpx,var(--wot-color-theme)40rpx,var(--wot-color-theme)80rpx)]" />
    </view>

    <view class="max-w-[80%] animate-fade-in-up text-center">
      <view class="mb-[40rpx] animate-float-slow text-[120rpx]">
        {{ icon }}
      </view>

      <text class="mb-[20rpx] block text-[36rpx] text-white font-700">
        {{ title }}
      </text>

      <text class="mb-[40rpx] block text-[24rpx] text-gray leading-[1.5]">
        {{ subtitle }}
      </text>

      <wd-button
        v-if="showBack"
        type="primary"
        size="large"
        class="animate-scale-in"
        @click="handleBack"
      >
        返回上一页
      </wd-button>
    </view>

    <view class="absolute bottom-[40rpx] left-0 right-0 flex justify-center">
      <text class="text-[20rpx] text-muted">
        襄行摩友 · 公益工具
      </text>
    </view>
  </view>
  <!-- #endif -->

  <!-- #ifndef H5 -->
  <view class="mini-empty-page relative min-h-screen flex flex-col items-center justify-center p-[40rpx]">
    <view class="pointer-events-none absolute inset-0 mini-empty-bg" />

    <view class="max-w-[80%] text-center">
      <view class="mb-[40rpx] text-[120rpx]">
        {{ icon }}
      </view>

      <text class="mb-[20rpx] block mini-empty-title">
        {{ title }}
      </text>

      <text class="mb-[40rpx] block mini-empty-subtitle">
        {{ subtitle }}
      </text>

      <wd-button
        v-if="showBack"
        type="primary"
        size="large"
        @click="handleBack"
      >
        返回上一页
      </wd-button>
    </view>

    <view class="absolute bottom-[40rpx] left-0 right-0 flex justify-center">
      <text class="mini-empty-footer">
        襄行摩友 · 公益工具
      </text>
    </view>
  </view>
  <!-- #endif -->
</template>

<style lang="scss" scoped>
.mini-empty-page {
  background: #121212;
}

.mini-empty-bg {
  opacity: 0.05;
  background: repeating-linear-gradient(45deg, transparent, transparent 40rpx, #2ED573 40rpx, #2ED573 80rpx);
}

.mini-empty-title {
  font-size: 36rpx;
  color: #FFFFFF;
  font-weight: 700;
}

.mini-empty-subtitle {
  font-size: 24rpx;
  color: #8D99AE;
  line-height: 1.5;
}

.mini-empty-footer {
  font-size: 20rpx;
  color: #CCCCCC;
}
</style>
