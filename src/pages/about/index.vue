<script setup lang="ts">
definePage({
  name: 'about',
  layout: 'tabbar',
  style: {
    navigationBarTitleText: '关于',
  },
})

import { mockAdminContact } from '@/api/mock/activityMock'

const { success: showToast } = useGlobalToast()

const adminInfo = {
  nickname: '明辰',
  avatar: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=野生摄影师%20摩托车骑士%20穿着复古皮衣%20戴墨镜%20文艺青年%20襄阳&image_size=square',
  wechatId: mockAdminContact.wechatId,
  wechatDescription: mockAdminContact.description,
  qrCodeImage: '/static/qrcode.JPG',
  description: '野生摄影师 | 巡航车主 | 机电/软件/AI工程师',
  intro: `在襄阳骑了2年车，拍过无数日出日落。

喜欢用镜头记录摩友们的帅气身影，
也喜欢在汉江边蹲守夕阳下的机车大片。

如果你也爱摄影、爱骑行，
欢迎来聊~ 🏍️📷`,
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
          <view class="i-carbon:bookmark text-[48rpx] text-white" />
        </view>
        <view class="text-center mb-[48rpx]">
          <text class="text-[40rpx] font-800 text-white tracking-[3px]">ABOUT ME</text>
          <view class="flex justify-center mt-[12rpx]">
            <view class="h-[3rpx] w-[80rpx] bg-gradient-to-r from-transparent via-primary to-transparent rounded-full" />
          </view>
        </view>

        <!-- 头像区域：去掉"襄阳摩友"文字 -->
        <view class="flex justify-center mb-[48rpx] z-10 relative">
          <view class="w-[200rpx] h-[200rpx] rounded-[40rpx] border-2 border-primary/30 bg-primary/10 flex items-center justify-center overflow-hidden shadow-[0_0_60rpx_rgba(46,213,115,0.2)]">
            <image
              :src="adminInfo.avatar"
              class="w-full h-full"
              mode="aspectFill"
            />
          </view>
        </view>

        <view class="bg-card/80 backdrop-blur-xl rounded-[32rpx] border border-white/10 p-[32rpx] shadow-xl">
          <view class="text-center mb-[24rpx]">
            <text class="text-[44rpx] font-800 text-white tracking-[2px]">{{ adminInfo.nickname }}</text>
            <view class="flex justify-center mt-[8rpx]">
              <text class="text-[24rpx] text-white tracking-widest">{{ adminInfo.description }}</text>
            </view>
          </view>
          <text class="text-[24rpx] text-white/90 leading-[1.8] whitespace-pre-line">{{ adminInfo.intro }}</text>
        </view>

          <!-- 标签区域：图标/文字改为白色 -->
          <view class="flex justify-center gap-[16rpx] mb-[32rpx] flex-wrap">
            <view class="px-[20rpx] py-[10rpx] rounded-[12rpx] border border-primary/30 bg-primary/10 flex items-center gap-[6rpx]">
              <text class="text-[20rpx] text-white">📷</text>
              <text class="text-[22rpx] text-white">野生摄影师</text>
            </view>
            <view class="px-[20rpx] py-[10rpx] rounded-[12rpx] border border-primary/30 bg-primary/10 flex items-center gap-[6rpx]">
              <text class="text-[20rpx] text-white">🏍️</text>
              <text class="text-[22rpx] text-white">巡航车主</text>
            </view>
          </view>

          <!-- 个人签名 -->
          <view class="bg-bg-hover rounded-[20rpx] p-[28rpx] mb-[24rpx]">
            <view class="flex items-center gap-[8rpx] mb-[16rpx]">
              <view class="i-carbon:quote text-[24rpx] text-white" />
              <text class="text-[22rpx] text-white">个人签名</text>
            </view>
            <text class="text-[24rpx] text-white/90 leading-[1.8] whitespace-pre-line">{{ adminInfo.intro }}</text>
          </view>

          <!-- 微信号 -->
          <view class="bg-bg-hover rounded-[20rpx] p-[28rpx]">
            <view class="flex items-center justify-between">
              <view class="flex items-center gap-[16rpx]">
              <view class="w-[56rpx] h-[56rpx] rounded-[14rpx] bg-primary/20 flex items-center justify-center">
                <text class="i-carbon:logo-wechat text-[28rpx] text-white" />
              </view>
                <view>
                  <text class="text-[20rpx] text-white block mb-[4rpx]">微信号</text>
                  <text class="text-[26rpx] font-600 text-white">{{ adminInfo.wechatId }}</text>
                </view>
              </view>
              <view>
                <text class="text-[20rpx] text-gray block mb-[4rpx]">微信号</text>
                <text class="text-[26rpx] font-600 text-white">{{ adminInfo.wechatId }}</text>
              </view>
            </view>
            <!-- 管理员联系方式说明 -->
            <view class="mt-[16rpx] pt-[16rpx] border-t border-white/10">
              <text class="text-[20rpx] text-white/70">{{ adminInfo.wechatDescription }}</text>
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
          <text class="text-[18rpx] text-white/30 text-center block mt-[8rpx]">非盈利 · 无交易 · 本地存储</text>
        </view>

        <!-- 合规声明 -->
        <view class="mt-[24rpx] mb-[40rpx] bg-card/50 rounded-[16rpx] border border-white/10 p-[20rpx]">
          <view class="flex items-start gap-[12rpx]">
            <text class="i-carbon:information text-[24rpx] text-white mt-[4rpx]" />
            <view>
              <text class="text-[22rpx] text-white font-600 block mb-[8rpx]">合规声明</text>
              <text class="text-[18rpx] text-white/50 leading-[1.6] block">
                本小程序为工具类应用，仅在您主动骑行时采集位置信息用于记录轨迹。所有数据保存在设备本地，不上传服务器。您可以在"隐私协议"中了解详细信息。
              </text>
            </view>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>
