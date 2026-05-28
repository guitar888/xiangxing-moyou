<script setup lang="ts">
/**
 * 全局合规提示横幅
 * 用于显示安全温馨提示，避免在每个页面重复编写
 */
const { visible, closeComplianceBanner } = useComplianceBanner()
</script>

<template>
  <view v-if="visible" class="compliance-banner">
    <view class="mx-[24rpx] mt-[16rpx] flex items-center gap-[12rpx] border border-warning/30 rounded-[16rpx] bg-warning/10 px-[16rpx] py-[12rpx] shadow-sm">
      <text class="i-carbon:warning mt-[2rpx] flex-shrink-0 text-[26rpx] text-primary" />
      <text class="text-[20rpx] text-white/90 leading-[1.4]">
        温馨提示：路线信息由摩友分享，出行请遵守交通规则，安全骑行
      </text>
      <text class="i-carbon:close mt-[2rpx] flex-shrink-0 text-[24rpx] text-gray" @click="closeComplianceBanner" />
    </view>
  </view>
</template>

<style scoped>
.compliance-banner {
  z-index: 999;
}
</style>
