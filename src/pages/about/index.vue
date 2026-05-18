<script setup lang="ts">
definePage({
  name: 'about',
  layout: 'tabbar',
  style: {
    navigationBarTitleText: '关于',
  },
})

const { success: showToast } = useGlobalToast()

const adminInfo = {
  nickname: '明辰',
  avatar: 'https://img.cdn1.vip/i/6a016f610ed6a_1778478945.webp',
  wechatId: 'MingChen202Y',
  qrCodeImage: '/static/qrcode.JPG',
  description: '野生摄影师 | 巡航车主 | AI打螺丝',
  intro: `在襄阳骑了2年车，拍过无数日出日落。

喜欢用镜头记录摩友们的帅气身影，
也喜欢在汉江边蹲守夕阳下的机车大片。

如果你也爱摄影、爱骑行，
欢迎来聊~ 📷`,
}

function copyWechatId() {
  uni.setClipboardData({
    data: adminInfo.wechatId,
    success: () => {
      showToast({ msg: '微信号已复制' })
    },
  })
}
</script>

<template>
  <view class="min-h-screen overflow-hidden">
    <view class="relative min-h-screen">
      <view class="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900" />
      <view class="absolute inset-0 opacity-20" :style="{ background: 'linear-gradient(135deg, rgba(46, 213, 115, 0.1) 0%, transparent 50%, rgba(46, 213, 115, 0.05) 100%)' }" />
      <view class="absolute left-0 top-0 w-full h-full overflow-hidden">
        <view class="absolute left-[-100rpx] top-[100rpx] w-[300rpx] h-[300rpx] rounded-full bg-primary/5 blur-[100rpx]" />
        <view class="absolute right-[-80rpx] top-[300rpx] w-[250rpx] h-[250rpx] rounded-full bg-primary/10 blur-[80rpx]" />
      </view>

      <view class="relative px-[32rpx] pt-[60rpx]">
        <view class="flex justify-center mb-[16rpx]">
          <view class="i-carbon:bookmark text-[48rpx] text-primary" />
        </view>
        <view class="text-center mb-[48rpx]">
          <text class="text-[40rpx] font-800 text-white tracking-[3px]">ABOUT ME</text>
          <view class="flex justify-center mt-[12rpx]">
            <view class="h-[3rpx] w-[80rpx] bg-gradient-to-r from-transparent via-primary to-transparent rounded-full" />
          </view>
        </view>

        <view class="flex flex-col items-center mb-[32rpx]">
          <!-- 圆形头像（简洁、无嵌套框） -->
          <view class="w-[200rpx] h-[200rpx] rounded-full border-2 border-primary/30 shadow-[0_0_60rpx_rgba(46,213,115,0.2)] overflow-hidden">
            <wd-img
              :src="adminInfo.avatar"
              class="w-full h-full"
              mode="aspectFill"
            />
          </view>
          <!-- 昵称（直接放在头像下，清晰） -->
          <text class="mt-[20rpx] text-[32rpx] font-700 text-white">{{ adminInfo.nickname }}</text>
          <!-- 一句话简介（简洁，无多余装饰） -->
          <text class="mt-[8rpx] text-[24rpx] text-primary/80">{{ adminInfo.description }}</text>
        </view>

        <view class="flex justify-center gap-[16rpx] mb-[32rpx] flex-wrap">
          <view class="px-[20rpx] py-[10rpx] rounded-[12rpx] border border-primary/30 bg-primary/10 flex items-center justify-center">
            <text class="text-[22rpx] text-white">📷 野生摄影师</text>
          </view>
          <view class="px-[20rpx] py-[10rpx] rounded-[12rpx] border border-primary/30 bg-primary/10 flex items-center justify-center">
            <text class="text-[22rpx] text-white">🏍️ 巡航车主</text>
          </view>
        </view>

        <view class="bg-bg-hover rounded-[20rpx] p-[28rpx] mb-[24rpx]">
          <view class="flex items-center gap-[8rpx] mb-[16rpx]">
            <text class="text-[22rpx] text-gray">个人签名</text>
          </view>
          <text class="text-[24rpx] text-white/90 leading-[1.8] whitespace-pre-line">{{ adminInfo.intro }}</text>
        </view>

        <view class="bg-bg-hover rounded-[20rpx] p-[28rpx]">
          <view class="flex items-center justify-between">
            <view class="flex items-center gap-[16rpx]">
              <view class="w-[56rpx] h-[56rpx] rounded-[14rpx] bg-primary/20 flex items-center justify-center">
                <text class="i-carbon:logo-wechat text-[28rpx] text-white" />
              </view>
              <view>
                <text class="text-[20rpx] text-gray block mb-[4rpx]">微信号</text>
                <text class="text-[26rpx] font-600 text-white">{{ adminInfo.wechatId }}</text>
              </view>
            </view>
            <view
              class="px-[28rpx] py-[14rpx] rounded-[14rpx] bg-primary flex items-center gap-[8rpx] active:opacity-80"
              @click="copyWechatId"
            >
              <text class="i-carbon-copy text-[22rpx] text-white" />
              <text class="text-[22rpx] text-white font-500">复制</text>
            </view>
          </view>
        </view>

        <view class="mt-[32rpx] flex justify-center">
          <view class="w-[200rpx] h-[200rpx] rounded-[24rpx] border border-white/10 overflow-hidden shadow-lg">
            <image
              :src="adminInfo.qrCodeImage"
              class="w-full h-full"
              mode="aspectFill"
            />
          </view>
        </view>

        <view class="mt-[48rpx] mb-[60rpx]">
          <view class="flex justify-center gap-[8rpx] mb-[12rpx]">
            <view class="h-[2rpx] w-[40rpx] bg-gradient-to-r from-transparent to-primary/50 rounded-full" />
            <view class="h-[2rpx] w-[40rpx] bg-gradient-to-l from-transparent to-primary/50 rounded-full" />
          </view>
          <text class="text-[20rpx] text-white/40 text-center block">襄阳本地摩友公益工具</text>
          <text class="text-[18rpx] text-white/30 text-center block mt-[8rpx]">非盈利 · 无交易 · 无社交</text>
        </view>
      </view>
    </view>
  </view>
</template>
