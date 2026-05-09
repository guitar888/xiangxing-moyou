<script setup lang="ts">
definePage({
  name: 'about',
  layout: 'tabbar',
  style: {
    navigationBarTitleText: '关于',
  },
})

// 使用全局消息组件
const { alert } = useGlobalMessage()

// 管理员信息
const adminInfo = {
  nickname: '不如摸鱼去',
  wechatId: 'your_wechat_id', // 请替换为你的微信号
}

// 显示联系方式
function showContact() {
  alert({
    title: '联系管理员',
    content: `
      <view style="text-align: center; padding: 10rpx;">
        <view style="font-size: 32rpx; margin-bottom: 20rpx;">${adminInfo.nickname}</view>
        <view style="font-size: 28rpx; color: var(--wot-color-text);">
          微信号：${adminInfo.wechatId}
        </view>
      </view>
    `,
    showCancelButton: false,
    confirmButtonText: '复制微信号',
    confirmButtonProps: {
      round: true,
    },
    success: () => {
      // 复制微信号
      uni.setClipboardData({
        data: adminInfo.wechatId,
        // 隐藏默认提示，只显示自定义提示
        showToast: false,
        success: () => {
          const { success: showSuccess } = useGlobalToast()
          showSuccess({
            msg: '微信号已复制',
          })
        },
        fail: () => {
          const { warning: showWarning } = useGlobalToast()
          showWarning({
            msg: '复制失败',
          })
        },
      })
    },
  })
}
</script>

<template>
  <view class="min-h-screen bg-gradient-to-br from-base via-[var(--wot-color-bg-hover)] to-[var(--wot-color-bg-card)]">
    <!-- 页面内容 -->
    <view class="px-[24rpx] pt-[40rpx]">
      <!-- 标题 -->
      <view class="mb-[24rpx]">
        <text class="text-[32rpx] font-700 text-white flex items-center gap-[8rpx]">
          <text class="i-carbon:information text-[28rpx] text-primary" />
          关于我们
        </text>
      </view>

      <!-- 应用介绍 -->
      <view class="bg-card rounded-[16rpx] p-[24rpx] border border-white/10 shadow-lg mb-[24rpx]">
        <view class="text-[24rpx] text-white/90 leading-relaxed">
          襄阳摩友助手是一个专为襄阳本地摩友打造的公益工具，提供活动信息查询、路线推荐、AA 计算等实用功能。
        </view>
      </view>

      <!-- 功能入口 -->
      <view class="bg-card rounded-[16rpx] overflow-hidden border border-white/10 shadow-lg">
        <view
          class="flex items-center justify-between p-[24rpx] transition-all duration-100 active:bg-white/5"
          @click="showContact"
        >
          <view class="flex items-center gap-[16rpx]">
            <text class="i-carbon:user-avatar text-[32rpx] text-primary" />
            <text class="text-[24rpx] text-white">联系管理员</text>
          </view>
          <text class="i-carbon:chevron-right text-[24rpx] text-gray" />
        </view>
      </view>

      <!-- 合规声明 -->
      <view class="mt-[40rpx] mb-[60rpx]">
        <text class="text-[18rpx] text-gray text-center block">
          襄阳本地摩友公益工具 · 非盈利 · 无交易 · 无社交
        </text>
      </view>
    </view>
  </view>
</template>

<style scoped>
</style>
