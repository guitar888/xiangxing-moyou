<script setup lang="ts">
/**
 * 我的页面
 * 用户中心，展示骑行统计、联系管理员等功能
 */
definePage({
  name: 'mine',
  layout: 'tabbar',
  style: {
    navigationBarTitleText: '我的',
    navigationBarBackgroundColor: '#121212',
    navigationBarTextStyle: 'white',
  },
})

// ================================================
// 用户信息（预留 Bmob 用户系统）
// ================================================

const userInfo = ref({
  nickname: '摩友骑士',
  avatar: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=摩托车骑士头像%20卡通风格&image_size=square',
  level: 'Lv.3',
  points: 1280,
  joinDate: '2026-01-15',
})

// ================================================
// 骑行统计
// ================================================

const { stats } = useRideStats()

// ================================================
// 管理员联系
// ================================================

const { showContactModal, showContact } = useAdminContact()

// ================================================
// 功能列表
// ================================================

const features = computed(() => [
  {
    id: 'group',
    name: '联系管理员',
    icon: 'i-carbon:chat',
    show: true,
    action: 'contact',
  },
  {
    id: 'favorites',
    name: '我的收藏',
    icon: 'i-carbon:star',
    show: true,
    path: '/subPages/help/help',
  },
  {
    id: 'activities',
    name: '我的活动',
    icon: 'i-carbon:calendar',
    show: true,
    path: '/subPages/help/help',
  },
  {
    id: 'messages',
    name: '我的消息',
    icon: 'i-carbon:chat-bot',
    show: true,
    path: '/subPages/help/help',
  },
  {
    id: 'settings',
    name: '设置',
    icon: 'i-carbon:settings',
    show: true,
    path: '/subPages/help/help',
  },
  {
    id: 'about',
    name: '关于我们',
    icon: 'i-carbon:information',
    show: true,
    path: '/pages/about/index',
  },
  {
    id: 'feedback',
    name: '意见反馈',
    icon: 'i-carbon:warning',
    show: true,
    path: '/subPages/feedback/feedback',
  },
  {
    id: 'help',
    name: '帮助中心',
    icon: 'i-carbon:help',
    show: true,
    path: '/subPages/help/help',
  },
  {
    id: 'compliance',
    name: '使用须知',
    icon: 'i-carbon:document',
    show: true,
    path: '/subPages/help/help',
  },
])

// ================================================
// 路由
// ================================================

const router = useRouter()

function handleFeatureClick(feature: any) {
  if (feature.action === 'contact') {
    showContact()
  } else if (feature.path) {
    router.push(feature.path)
  }
}

function handleEditProfile() {
  uni.showToast({
    title: '功能开发中',
    icon: 'none',
  })
}
</script>

<template>
  <view class="min-h-screen bg-base pb-[40rpx]">
    <!-- 用户信息卡片 -->
    <view class="relative">
      <!-- 背景 -->
      <view class="h-[200rpx] w-full bg-gradient-to-r from-primary to-primary/80" />

      <!-- 用户信息 -->
      <view class="absolute top-[80rpx] left-[24rpx] right-[24rpx] bg-card rounded-[16rpx] p-[24rpx] shadow-lg flex items-center gap-[24rpx]">
        <!-- 头像 -->
        <view class="relative">
          <image :src="userInfo.avatar" class="h-[120rpx] w-[120rpx] rounded-full border-2 border-primary/30" mode="aspectFit" />
        </view>

        <!-- 信息 -->
        <view class="flex-1">
          <view class="flex items-center gap-[12rpx]">
            <text class="text-[28rpx] font-600 text-white">{{ userInfo.nickname }}</text>
            <view class="bg-primary/20 text-primary text-[18rpx] px-[12rpx] py-[4rpx] rounded-[8rpx]">{{ userInfo.level }}</view>
          </view>
          <text class="text-[20rpx] text-gray mt-[8rpx] block">加入时间：{{ userInfo.joinDate }}</text>
          <text class="text-[20rpx] text-gray mt-[4rpx] block">积分：{{ userInfo.points }}</text>
        </view>

        <!-- 编辑按钮 -->
        <view class="p-[12rpx]" @click="handleEditProfile">
          <text class="i-carbon:edit text-[28rpx] text-gray" />
        </view>
      </view>
    </view>

    <!-- 骑行统计 -->
    <view class="px-[24rpx] mt-[80rpx]">
      <text class="text-[28rpx] font-600 text-white mb-[16rpx] block">骑行统计</text>

      <view class="bg-card rounded-[16rpx] p-[24rpx]">
        <view class="grid grid-cols-3 gap-[20rpx]">
          <view class="flex flex-col items-center">
            <text class="text-[36rpx] font-700 text-primary">{{ stats.totalRides }}</text>
            <text class="text-[20rpx] text-gray mt-[4rpx]">骑行次数</text>
          </view>
          <view class="flex flex-col items-center">
            <text class="text-[36rpx] font-700 text-white">{{ stats.totalDistance }}</text>
            <text class="text-[20rpx] text-gray mt-[4rpx]">总里程(km)</text>
          </view>
          <view class="flex flex-col items-center">
            <text class="text-[36rpx] font-700 text-white">{{ stats.totalDuration }}</text>
            <text class="text-[20rpx] text-gray mt-[4rpx]">总时长(分钟)</text>
          </view>
        </view>
      </view>
    </view>

    <!-- 功能列表 -->
    <view class="px-[24rpx] mt-[24rpx]">
      <text class="text-[28rpx] font-600 text-white mb-[16rpx] block">功能中心</text>

      <view class="bg-card rounded-[16rpx] overflow-hidden">
        <view
          v-for="(feature, index) in features"
          :key="feature.id"
          class="flex items-center justify-between p-[24rpx] transition-all duration-100 active:bg-white/5"
          :style="index < features.length - 1 ? { borderBottom: '1rpx solid var(--wot-color-border)' } : {}"
          @click="handleFeatureClick(feature)"
        >
          <view class="flex items-center gap-[16rpx]">
            <text :class="feature.icon + ' text-[32rpx] text-primary'" />
            <text class="text-[24rpx] text-white">{{ feature.name }}</text>
          </view>
          <text class="i-carbon:chevron-right text-[24rpx] text-gray" />
        </view>
      </view>
    </view>

    <!-- 合规声明 -->
    <view class="px-[24rpx] mt-[40rpx]">
      <text class="text-[18rpx] text-gray text-center block">
        襄阳本地摩友公益工具 · 非盈利 · 无交易 · 无社交
      </text>
    </view>

    <!-- 联系管理员弹窗 -->
    <common-ContactAdminModal />
  </view>
</template>
