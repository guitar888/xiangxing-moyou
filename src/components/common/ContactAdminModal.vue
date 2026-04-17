<script setup lang="ts">
/**
 * 联系管理员弹窗组件
 */
const { contact, showContactModal, hideContact, copyWechatId } = useAdminContact()
</script>

<template>
  <!-- 遮罩 -->
  <view
    v-if="showContactModal"
    class="fixed inset-0 z-[998] bg-black/60"
    @click="hideContact"
  />

  <!-- 弹窗 -->
  <view
    v-if="showContactModal"
    class="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-[999] w-[600rpx] bg-card rounded-[24rpx] p-[40rpx]"
  >
    <!-- 图标 -->
    <view class="flex justify-center mb-[24rpx]">
      <view class="w-[100rpx] h-[100rpx] bg-primary/20 rounded-full flex items-center justify-center">
        <text class="i-carbon:chat text-[60rpx] text-primary" />
      </view>
    </view>

    <!-- 标题 -->
    <text class="text-[32rpx] font-600 text-white text-center block mb-[16rpx]">
      加群咨询
    </text>

    <!-- 说明 -->
    <text class="text-[24rpx] text-gray text-center block mb-[32rpx] leading-[36rpx]">
      {{ contact?.description || '请联系管理员，说明"摩友加群"，管理员会邀请您加入微信群' }}
    </text>

    <!-- 微信号 -->
    <view class="bg-base rounded-[16rpx] p-[24rpx] mb-[32rpx]">
      <view class="flex items-center justify-between">
        <view>
          <text class="text-[22rpx] text-gray block mb-[4rpx]">微信号</text>
          <text class="text-[28rpx] text-white font-500">{{ contact?.wechatId || 'XYMoyou_admin' }}</text>
        </view>
        <button
          class="px-[32rpx] py-[16rpx] bg-primary rounded-[12rpx] text-[24rpx] text-white font-500"
          @click="copyWechatId"
        >
          复制
        </button>
      </view>
    </view>

    <!-- 关闭按钮 -->
    <button
      class="w-full py-[20rpx] text-[26rpx] text-gray"
      @click="hideContact"
    >
      我知道了
    </button>
  </view>
</template>
