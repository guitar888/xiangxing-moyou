<script setup lang="ts">
definePage({
  name: 'mine',
  layout: 'tabbar',
  style: {
    navigationBarTitleText: '我的',
    navigationBarBackgroundColor: '#121212',
    navigationBarTextStyle: 'white',
  },
})

import { ref } from 'vue'
import { useRouter } from '@wot-ui/router'

const router = useRouter()

// 用户信息
const userInfo = ref({
  nickname: '摩友骑士',
  avatar: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=摩托车骑士头像%20卡通风格&image_size=square',
  level: 'Lv.3',
  points: 1280,
  joinDate: '2026-01-15',
})

// 骑行统计
const rideStats = ref({
  totalDistance: 1286,
  totalDays: 45,
  totalRoutes: 12,
  totalActivities: 8,
})

// 功能列表
const features = ref([
  {
    id: 'favorites',
    name: '我的收藏',
    icon: 'star',
    count: 12,
    path: '/subPages/help/help',
  },
  {
    id: 'activities',
    name: '我的活动',
    icon: 'calendar',
    count: 8,
    path: '/subPages/help/help',
  },
  {
    id: 'messages',
    name: '我的消息',
    icon: 'message',
    count: 3,
    path: '/subPages/help/help',
  },
  {
    id: 'settings',
    name: '设置',
    icon: 'settings',
    path: '/subPages/help/help',
  },
  {
    id: 'about',
    name: '关于我们',
    icon: 'info',
    path: '/pages/about/index',
  },
  {
    id: 'feedback',
    name: '意见反馈',
    icon: 'chat',
    path: '/subPages/feedback/feedback',
  },
  {
    id: 'help',
    name: '帮助中心',
    icon: 'help',
    path: '/subPages/help/help',
  },
  {
    id: 'compliance',
    name: '使用须知',
    icon: 'file',
    path: '/subPages/help/help',
  },
])

function handleFeatureClick(feature: any) {
  if (feature.path) {
    router.push(feature.path)
  }
}

function handleEditProfile() {
  console.log('编辑个人资料')
}
</script>

<template>
  <view class="min-h-screen bg-base">
    <!-- 用户信息卡片 -->
    <view class="relative">
      <!-- 背景 -->
      <view class="h-[200rpx] w-full" :style="{ background: 'linear-gradient(135deg, #2ED573, #27C468)' }" />
      
      <!-- 用户信息 -->
      <view class="absolute top-[80rpx] left-[24rpx] right-[24rpx] bg-card rounded-[16rpx] p-[24rpx] shadow-lg flex items-center gap-[24rpx]">
        <!-- 头像 -->
        <view class="relative">
          <image :src="userInfo.avatar" class="h-[120rpx] w-[120rpx] rounded-full border-4 border-white" mode="aspectFit" />
          <view class="absolute bottom-0 right-0 h-[32rpx] w-[32rpx] rounded-full bg-primary flex items-center justify-center">
            <wd-icon name="camera" size="20rpx" color="white" />
          </view>
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
        <view class="p-[12rpx] rounded-[8rpx] border border-border" @click="handleEditProfile">
          <wd-icon name="edit" size="28rpx" color="#8D99AE" />
        </view>
      </view>
    </view>
    
    <!-- 骑行统计 -->
    <view class="p-[24rpx] mt-[80rpx]">
      <text class="text-[32rpx] font-700 text-white mb-[20rpx] block">骑行统计</text>
      
      <view class="bg-card rounded-[16rpx] p-[24rpx] shadow-lg">
        <view class="grid grid-cols-2 gap-5">
          <view class="flex flex-col items-center">
            <text class="text-[32rpx] font-700 text-white">{{ rideStats.totalDistance }}</text>
            <text class="text-[20rpx] text-gray mt-[8rpx]">总骑行距离(km)</text>
          </view>
          <view class="flex flex-col items-center">
            <text class="text-[32rpx] font-700 text-white">{{ rideStats.totalDays }}</text>
            <text class="text-[20rpx] text-gray mt-[8rpx]">总骑行天数</text>
          </view>
          <view class="flex flex-col items-center">
            <text class="text-[32rpx] font-700 text-white">{{ rideStats.totalRoutes }}</text>
            <text class="text-[20rpx] text-gray mt-[8rpx]">总骑行路线</text>
          </view>
          <view class="flex flex-col items-center">
            <text class="text-[32rpx] font-700 text-white">{{ rideStats.totalActivities }}</text>
            <text class="text-[20rpx] text-gray mt-[8rpx]">参与活动数</text>
          </view>
        </view>
      </view>
    </view>
    
    <!-- 功能列表 -->
    <view class="p-[24rpx]">
      <text class="text-[32rpx] font-700 text-white mb-[20rpx] block">功能中心</text>
      
      <view class="bg-card rounded-[16rpx] overflow-hidden shadow-lg">
        <view
          v-for="(feature, index) in features"
          :key="feature.id"
          class="flex items-center justify-between p-[24rpx] transition-all duration-100 active:bg-hover"
          :style="index < features.length - 1 ? { borderBottom: '1rpx solid var(--wot-color-border)' } : {}"
          @click="handleFeatureClick(feature)"
        >
          <view class="flex items-center gap-[20rpx]">
            <wd-icon :name="feature.icon" size="32rpx" color="#2ED573" />
            <text class="text-[24rpx] text-white">{{ feature.name }}</text>
          </view>
          <view class="flex items-center gap-[12rpx]">
            <view v-if="feature.count" class="bg-danger text-white text-[18rpx] px-[12rpx] py-[4rpx] rounded-full min-w-[36rpx] text-center">{{ feature.count }}</view>
            <wd-icon name="arrow-right" size="24rpx" color="#8D99AE" />
          </view>
        </view>
      </view>
    </view>
    
    <!-- 退出登录按钮 -->
    <view class="p-[24rpx] mt-[40rpx]">
      <button
        class="w-full bg-card text-white rounded-[12rpx] py-[20rpx] text-[24rpx] font-600 border border-border"
      >
        退出登录
      </button>
    </view>
  </view>
</template>
