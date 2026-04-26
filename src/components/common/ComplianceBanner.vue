<script setup lang="ts">
/**
 * 全局合规提示横幅
 * 用于显示安全温馨提示，避免在每个页面重复编写
 */
const { visible, closeComplianceBanner } = useComplianceBanner()
</script>

<template>
  <view v-if="visible" class="compliance-banner">
    <view class="bg-warning/10 border border-warning/30 rounded-[16rpx] px-[16rpx] py-[12rpx] flex items-center gap-[12rpx] mx-[24rpx] mt-[16rpx] shadow-sm">
      <text class="i-carbon:warning text-[26rpx] text-primary flex-shrink-0 mt-[2rpx]" />
      <text class="text-[20rpx] text-white/90 leading-[1.4]">温馨提示：路线信息由摩友分享，出行请遵守交通规则，安全骑行</text>
      <text class="i-carbon:close text-[24rpx] text-gray flex-shrink-0 mt-[2rpx]" @click="closeComplianceBanner" />
    </view>
  </view>
</template>

<style scoped>
.compliance-banner {
  z-index: 999;
}
</style>
