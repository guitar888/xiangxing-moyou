<script setup lang="ts">
defineOptions({
  options: {
    addGlobalClass: true,
    virtualHost: true,
    styleIsolation: 'shared'
  }
})

const message = useGlobalMessage()

function showComplianceInfo() {
  message.show({
    title: '使用须知',
    msg: '本小程序为襄阳摩友公益工具，所有功能免费使用。我们承诺：不收集用户敏感信息，不涉及商业广告，仅供摩友交流学习使用。骑行请注意安全，遵守交通规则。',
  })
}
</script>

<template>
  <!-- #ifdef H5 -->
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

      <view 
        class="relative z-10 px-[32rpx] py-[24rpx] backdrop-blur-xl"
      >
  <!-- #endif -->
  <!-- #ifndef H5 -->
  <view class="relative">
    <view
      class="relative overflow-hidden rounded-t-[16rpx] shadow-[0_4rpx_16rpx_rgba(46,213,115,0.08)]"
      :style="{
        background: 'linear-gradient(to bottom, rgba(46, 213, 115, 0.3) 0%, rgba(46, 213, 115, 0.1) 100%)',
      }"
    >
      <view class="relative z-10 px-[32rpx] py-[24rpx]">
  <!-- #endif -->
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
          <!-- #ifdef H5 -->
          <text
            class="rounded-[8rpx] from-primary to-primary-dark bg-gradient-to-r px-[16rpx] py-[6rpx] text-[20rpx] text-white font-600 opacity-90 transition-all active:scale-95"
            @click="showComplianceInfo"
          >
            使用须知
          </text>
          <!-- #endif -->
          <!-- #ifndef H5 -->
          <text
            class="rounded-[8rpx] bg-gradient-to-r from-[#2ED573] to-[#27C468] px-[16rpx] py-[6rpx] text-[20rpx] text-white font-600 opacity-90"
            @click="showComplianceInfo"
          >
            使用须知
          </text>
          <!-- #endif -->
        </view>
      <!-- #ifdef H5 -->
      </view>
    </view>
  </view>
  <!-- #endif -->
  <!-- #ifndef H5 -->
      </view>
    </view>
  </view>
  <!-- #endif -->
</template>
