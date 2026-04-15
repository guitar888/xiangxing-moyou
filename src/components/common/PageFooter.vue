<script setup lang="ts">
const emit = defineEmits<{
  complianceInfo: []
}>()

function showComplianceInfo() {
  emit('complianceInfo')
}
</script>

<template>
  <view class="relative animate-fade-in-up">
    <view
      class="relative overflow-hidden rounded-t-[16rpx] shadow-[0_4rpx_16rpx_rgba(46,213,115,0.08)]"
      :style="{
        background: 'radial-gradient(circle at 50% 0%, rgba(var(--wot-color-theme-rgb),0.18) 0%, var(--wot-color-bg-base) 55%)',
      }"
    >
      <!-- 科技感双层流光：一快一慢 + 主题色光 -->
      <view class="pointer-events-none absolute inset-0">
        <!-- 慢速宽幅底光 -->
        <view class="animate-sheen-sweep h-full w-[60rpx] from-transparent via-primary-light/10 to-transparent bg-gradient-to-r" />
        <!-- 快速细锐高光 -->
        <view class="animate-sheen-sweep-fast h-full w-[15rpx] from-transparent via-primary/20 to-transparent bg-gradient-to-r" />
      </view>

      <view class="relative z-10 px-[32rpx] py-[24rpx] backdrop-blur-xl">
        <view class="flex flex-col items-center">
          <text class="text-[32rpx] text-white font-600 leading-[44rpx]">
            襄行摩友 · 伴你骑行每一段旅程
          </text>

          <view class="relative mt-[8rpx] h-[4rpx] w-[56rpx] overflow-hidden rounded-[2rpx]">
            <view class="absolute inset-0 from-primary to-warning bg-gradient-to-r" />
          </view>

          <text class="mt-[16rpx] text-[18rpx] text-muted leading-[26rpx]">
            © 2026 襄行摩友 公益工具
          </text>
        </view>

        <view class="absolute bottom-[24rpx] right-[24rpx]">
          <text
            class="rounded-[8rpx] from-primary to-primary-dark bg-gradient-to-r px-[16rpx] py-[6rpx] text-[20rpx] text-white font-600 opacity-90 transition-all active:scale-95"
            @click="showComplianceInfo"
          >
            使用须知
          </text>
        </view>
      </view>
    </view>
  </view>
</template>
