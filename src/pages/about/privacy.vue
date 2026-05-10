<script setup lang="ts">
/**
 * 隐私协议页面
 * 合规必需：明确告知用户数据使用方式
 */
definePage({
  name: 'privacy',
  style: {
    navigationBarTitleText: '隐私协议',
    navigationStyle: 'custom',
  },
})

const { statusBarHeight } = useSystemInfo()

const sections = [
  {
    title: '信息收集与使用',
    content: `我们仅在您主动使用骑行记录功能时申请定位权限，用于：
• 记录您的骑行轨迹
• 计算骑行距离和时长
• 生成骑行统计数据

定位数据仅保存在您的设备本地，不会上传至任何服务器。`,
  },
  {
    title: '数据存储',
    content: `您的骑行数据（包括骑行记录、统计数据）仅存储在您设备的本地存储中。我们不会将您的任何数据上传、传输或分享给第三方。`,
  },
  {
    title: '数据删除',
    content: `您可以随时通过"我的 - 清除本地数据"功能删除全部骑行数据。删除后数据将无法恢复。`,
  },
  {
    title: '联系我们',
    content: `如果您对本隐私协议有任何疑问，欢迎通过小程序内的"联系管理员"功能与我们沟通。`,
  },
]

const lastUpdate = '2026年5月'
</script>

<template>
  <view class="min-h-screen bg-base">
    <!-- 自定义Header -->
    <view
      class="relative z-50 flex items-center border-b border-white/10 bg-base/80 backdrop-blur-xl"
      :style="{ paddingTop: `${statusBarHeight + 12}px` }"
    >
      <view class="flex items-center gap-[12rpx] px-[24rpx] pb-[12rpx]">
        <text class="i-carbon:document text-[32rpx] text-primary" />
        <text class="text-[32rpx] font-700 tracking-[1px]" :style="{ color: '#2ED573' }">隐私协议</text>
      </view>
    </view>

    <!-- 内容 -->
    <view class="p-[24rpx]">
      <!-- 声明 -->
      <view class="mb-[24rpx] rounded-[16rpx] border border-white/10 p-[20rpx]" :style="{ background: 'rgba(46, 213, 115, 0.08)' }">
        <view class="flex items-start gap-[12rpx]">
          <text class="i-carbon:shield text-[36rpx] text-primary mt-[4rpx]" />
          <view>
            <text class="text-[26rpx] text-white font-600">数据安全承诺</text>
            <text class="text-[22rpx] text-white/70 mt-[8rpx] block leading-[1.6]">
              您的骑行数据仅保存在本地设备，我们严格遵守相关法规，保护您的隐私安全
            </text>
          </view>
        </view>
      </view>

      <!-- 协议内容 -->
      <view class="flex flex-col gap-[16rpx]">
        <view
          v-for="(section, index) in sections"
          :key="index"
          class="rounded-[16rpx] bg-card border border-white/10 p-[20rpx]"
        >
          <view class="flex items-center gap-[8rpx] mb-[12rpx]">
            <text class="i-carbon:policy text-[24rpx] text-primary" />
            <text class="text-[26rpx] text-white font-600">{{ section.title }}</text>
          </view>
          <text class="text-[22rpx] text-white/60 leading-[1.8] whitespace-pre-line">{{ section.content }}</text>
        </view>
      </view>

      <!-- 底部 -->
      <view class="mt-[32rpx] text-center">
        <text class="text-[20rpx] text-white/40">最后更新：{{ lastUpdate }}</text>
      </view>
    </view>
  </view>
</template>
