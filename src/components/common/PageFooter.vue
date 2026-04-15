<script setup lang="ts">
const emit = defineEmits<{
  complianceInfo: []
}>()

function showComplianceInfo() {
  emit('complianceInfo')
}
</script>

<template>
  <view class="relative z-10">
    <view class="h-[2rpx] bg-border" />
    <text class="block py-[32rpx] text-center text-[24rpx] text-muted">
      襄行摩友 · 伴你骑行每一段旅程
    </text>
    <view class="mb-[32rpx] flex items-center justify-center gap-[24rpx]">
      <text class="text-[20rpx] text-gray">
        © 2024 襄行摩友 公益工具
      </text>
      <text class="text-[20rpx] text-[var(--wot-color-theme)] transition-colors duration-200 active:text-[var(--wot-color-theme)]" @click="showComplianceInfo">
        使用须知
      </text>
    </view>
    <view class="flex flex-wrap justify-center gap-[4rpx] px-[24rpx]">
      <view v-for="i in 20" :key="i" class="h-[20rpx] w-[40rpx] rounded-[2rpx] bg-hover" />
    </view>
  </view>
</template>
