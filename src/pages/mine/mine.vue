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
    navigationStyle: 'custom',
  },
})

// ================================================
// 依赖引入
// ================================================

import { ref, computed } from 'vue'
import { useRouter } from '@wot-ui/router'
import { useRideStats } from '@/composables/useRideStats'
import { useAdminContact } from '@/composables/useAdminContact'
import { useSystemInfo } from '@/composables/useSystemInfo'
import { useUserStore } from '@/store/userStore'

// ================================================
// 用户状态管理
// ================================================

const userStore = useUserStore()

// ================================================
// 骑行统计
// ================================================

const { stats } = useRideStats()

// ================================================
// 系统信息
// ================================================

const { statusBarHeight } = useSystemInfo()

// ================================================
// 主题管理
// ================================================

const { isDark, toggleTheme: toggleThemeFromComposable } = useManualTheme()

function toggleTheme() {
  toggleThemeFromComposable()
}

// ================================================
// 登录处理
// ================================================

const router = useRouter()

function handleLogin() {
  router.push('/pages/login/index')
}

function handleLogout() {
  uni.showModal({
    title: '提示',
    content: '确定要退出登录吗？',
    success: (res) => {
      if (res.confirm) {
        userStore.logout()
        uni.showToast({
          title: '已退出登录',
          icon: 'success',
        })
      }
    },
  })
}

// ================================================
// 功能列表
// ================================================

const features = computed(() => [
  {
    id: 'medals',
    name: '我的勋章',
    icon: 'i-carbon:trophy',
    show: userStore.isLoggedIn,
    action: 'medals',
  },
  {
    id: 'about',
    name: '关于我们',
    icon: 'i-carbon:information',
    show: true,
    action: 'about',
  },
  {
    id: 'help',
    name: '帮助中心',
    icon: 'i-carbon:help',
    show: true,
    path: '/subPages/help/help',
  },
])

// ================================================
// 路由
// ================================================

// 小程序介绍信息（合规：不展示联系方式）
const aboutInfo = {
  name: '襄行摩友',
  version: 'V1.0.0',
  description: '襄阳本地摩友公益工具',
  features: ['骑行地图', '数据记录', '活动信息', '路线推荐'],
}

// 使用全局消息组件
const { alert } = useGlobalMessage()

function handleFeatureClick(feature: any) {
  if (feature.action === 'about') {
    showAbout()
  } else if (feature.action === 'medals') {
    showMedals()
  } else if (feature.path) {
    router.push(feature.path)
  }
}

// 显示勋章弹窗
function showMedals() {
  if (userStore.medals.length === 0) {
    uni.showToast({
      title: '暂无勋章，继续加油！',
      icon: 'none',
    })
    return
  }

  const medalsHtml = userStore.medals.map(m => 
    `<view style="display: flex; align-items: center; gap: 12rpx; margin-bottom: 16rpx;">
      <text style="font-size: 48rpx;">${m.icon}</text>
      <view>
        <view style="font-size: 28rpx; color: #2ED573; font-weight: 600;">${m.name}</view>
        <view style="font-size: 22rpx; color: #8D99AE;">${m.description}</view>
      </view>
    </view>`
  ).join('')

  alert({
    title: `我的勋章 (${userStore.medals.length})`,
    content: `
      <view style="text-align: left; padding: 10rpx;">
        ${medalsHtml}
      </view>
    `,
    showCancelButton: false,
    confirmButtonText: '知道了',
    confirmButtonProps: {
      round: true,
    },
  })
}

// 显示关于我们（合规：仅展示小程序介绍，不展示联系方式）
function showAbout() {
  alert({
    title: '关于襄行摩友',
    content: `
      <view style="text-align: center; padding: 10rpx;">
        <view style="font-size: 36rpx; font-weight: 600; margin-bottom: 16rpx; color: #2ED573;">${aboutInfo.name}</view>
        <view style="font-size: 24rpx; color: #CCCCCC; margin-bottom: 20rpx;">${aboutInfo.version}</view>
        <view style="font-size: 26rpx; color: #FFFFFF; margin-bottom: 16rpx;">${aboutInfo.description}</view>
        <view style="font-size: 22rpx; color: #8D99AE;">
          非盈利 · 无交易 · 无社交
        </view>
      </view>
    `,
    showCancelButton: false,
    confirmButtonText: '知道了',
    confirmButtonProps: {
      round: true,
    },
  })
}

function handleEditProfile() {
  uni.showToast({
    title: '功能开发中',
    icon: 'none',
  })
}

// ================================================
// 襄阳元素配置
// ================================================

const xiangyangElements = {
  landmarks: [
    { name: '古隆中', description: '诸葛亮隐居地' },
    { name: '襄阳古城', description: '历史文化名城' },
    { name: '襄阳牛肉面', description: '地道襄阳美食' },
  ],
  culture: '三国文化',
  color: '#2ED573',
}

// ================================================
// 显示数据（优先使用用户Store）
// ================================================

const displayStats = computed(() => {
  if (userStore.isLoggedIn) {
    return userStore.rideStats
  }
  return stats
})

const displayUserInfo = computed(() => {
  if (userStore.isLoggedIn) {
    return {
      nickname: userStore.nickname,
      level: userStore.level,
      joinDate: userStore.joinDate ? new Date(userStore.joinDate).toLocaleDateString() : '-',
    }
  }
  return {
    nickname: '点击登录',
    level: '未登录',
    joinDate: '-',
  }
})
</script>

<template>
  <view class="relative min-h-screen overflow-hidden bg-gradient-to-br from-base via-[var(--wot-color-bg-hover)] to-[var(--wot-color-bg-card)]">
    <!-- 背景装饰 -->
    <!-- #ifdef H5 -->
    <view class="animate-breathe pointer-events-none absolute inset-x-0 top-0 z-0 h-[240rpx]" :style="{ background: 'radial-gradient(circle at top, rgba(var(--wot-color-theme-rgb),0.18), transparent 55%)' }" />
    <view class="pointer-events-none absolute inset-0 z-0 opacity-5" :style="{ background: `repeating-linear-gradient(45deg, transparent, transparent 40rpx, var(--wot-color-theme) 40rpx, var(--wot-color-theme) 80rpx), repeating-linear-gradient(-45deg, transparent, transparent 40rpx, var(--wot-color-theme) 40rpx, var(--wot-color-theme) 80rpx)` }" />
    <!-- #endif -->
    <!-- #ifndef H5 -->
    <view class="pointer-events-none absolute inset-x-0 top-0 z-0 h-[240rpx]" :style="{ background: 'linear-gradient(to bottom, rgba(46, 213, 115, 0.25), transparent 100%)' }" />
    <view class="pointer-events-none absolute inset-0 z-0 opacity-3" :style="{ background: 'repeating-linear-gradient(45deg, transparent, transparent 40rpx, #2ED573 40rpx, #2ED573 80rpx), repeating-linear-gradient(-45deg, transparent, transparent 40rpx, #2ED573 40rpx, #2ED573 80rpx)' }" />
    <!-- #endif -->

    <!-- 页面内容 -->
    <view class="relative z-10">
      <!-- 自定义Header头部 -->
      <view
        class="relative z-50 flex items-center justify-between border-b border-white/10 pb-[12rpx]"
        :style="{
          paddingTop: `${statusBarHeight + 12}px`,
          paddingLeft: '24rpx',
          paddingRight: '32rpx',
          background: 'linear-gradient(to bottom, rgba(46, 213, 115, 0.15) 0%, transparent 100%)',
        }"
      >
        <view class="flex items-center gap-[12rpx]">
          <text class="i-carbon:user text-[36rpx] text-primary" />
          <text class="text-[32rpx] font-700 tracking-[1px]" :style="{ color: '#2ED573' }">个人中心</text>
        </view>
        <view v-if="userStore.isLoggedIn" class="flex items-center gap-[8rpx] rounded-[10rpx] bg-card/50 px-[16rpx] py-[10rpx]" @click="handleLogout">
          <text class="i-carbon:logout text-[24rpx] text-primary" />
          <text class="text-[22rpx] text-white/80 font-500">退出</text>
        </view>
      </view>

      <!-- 合规提示横幅 -->
      <common-ComplianceBanner />

      <!-- 用户信息卡片 -->
      <view class="relative px-[24rpx] mt-[20rpx]" @click="!userStore.isLoggedIn && handleLogin()">
        <!-- 背景 - 融入襄阳元素：绿色渐变象征襄阳的山水 -->
        <view class="h-[160rpx] w-full bg-gradient-to-r from-primary to-primary/80 relative overflow-hidden rounded-[20rpx]">
          <!-- 襄阳特色图案（简化版） -->
          <view class="absolute inset-0 opacity-10">
            <view class="absolute top-[20rpx] left-[20rpx] w-[60rpx] h-[60rpx] rounded-full border-2 border-white"></view>
            <view class="absolute top-[40rpx] right-[40rpx] w-[40rpx] h-[40rpx] rounded-full border-2 border-white"></view>
            <view class="absolute bottom-[20rpx] left-[50%] transform -translate-x-1/2 w-[80rpx] h-[80rpx] rounded-full border-2 border-white"></view>
          </view>
          <!-- 登录提示 -->
          <view v-if="!userStore.isLoggedIn" class="absolute inset-0 flex items-center justify-center">
            <text class="text-[28rpx] text-white/80">点击此处登录微信号</text>
          </view>
        </view>

        <!-- 用户信息 -->
        <view class="absolute top-[80rpx] left-[44rpx] right-[44rpx] bg-card rounded-[16rpx] p-[24rpx] shadow-lg flex items-center gap-[24rpx] border border-white/10">
          <!-- 头像 -->
          <view class="relative">
            <image :src="userStore.avatar || 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=摩托车骑士头像%20卡通风格&image_size=square'" class="h-[100rpx] w-[100rpx] rounded-full border-2 border-primary/30" mode="aspectFit" />
            <!-- 襄阳特色标识 -->
            <view class="absolute -bottom-1 -right-1 bg-primary text-white text-[16rpx] rounded-full h-[32rpx] w-[32rpx] flex items-center justify-center">
              <text class="i-carbon:map-pin" />
            </view>
          </view>

          <!-- 信息 -->
          <view class="flex-1">
            <view class="flex items-center gap-[12rpx]">
              <text class="text-[28rpx] font-600 text-white">{{ displayUserInfo.nickname }}</text>
              <view class="bg-primary/20 text-primary text-[18rpx] px-[12rpx] py-[4rpx] rounded-[8rpx]">{{ displayUserInfo.level }}</view>
            </view>
            <text class="text-[20rpx] text-gray mt-[8rpx] block">加入时间：{{ displayUserInfo.joinDate }}</text>
            <text v-if="userStore.isLoggedIn" class="text-[20rpx] text-gray mt-[4rpx] block">勋章：{{ userStore.medals.length }} 个</text>
          </view>

          <!-- 登录/编辑按钮 -->
          <view v-if="!userStore.isLoggedIn" class="bg-primary px-[20rpx] py-[10rpx] rounded-[8rpx]">
            <text class="text-[24rpx] text-white font-600">登录</text>
          </view>
          <view v-else class="p-[12rpx]" @click.stop="handleEditProfile">
            <text class="i-carbon:edit text-[28rpx] text-gray" />
          </view>
        </view>
      </view>

      <!-- 骑行统计 -->
      <view class="px-[24rpx] mt-[80rpx]">
        <view class="flex justify-between items-center mb-[16rpx]">
          <text class="text-[28rpx] font-600 text-white flex items-center gap-[6rpx]">
            <text class="i-carbon:analytics text-[24rpx] text-primary" />
            骑行数据总览
          </text>
          <text v-if="!userStore.isLoggedIn" class="text-[20rpx] text-gray">登录后同步数据</text>
        </view>

        <view class="bg-card rounded-[16rpx] p-[24rpx] border border-white/10 shadow-lg">
          <view class="grid grid-cols-3 gap-[20rpx]">
            <view class="flex flex-col items-center">
              <text class="text-[36rpx] font-700 text-primary">{{ displayStats.totalRides }}</text>
              <text class="text-[20rpx] text-gray mt-[4rpx]">骑行次数</text>
            </view>
            <view class="flex flex-col items-center">
              <text class="text-[36rpx] font-700 text-white">{{ displayStats.totalDistance }}</text>
              <text class="text-[20rpx] text-gray mt-[4rpx]">总里程(km)</text>
            </view>
            <view class="flex flex-col items-center">
              <text class="text-[36rpx] font-700 text-white">{{ displayStats.totalDuration }}</text>
              <text class="text-[20rpx] text-gray mt-[4rpx]">总时长(分钟)</text>
            </view>
          </view>

          <!-- 额外骑行数据 -->
          <view class="mt-[24rpx] pt-[24rpx] border-t border-border">
            <view class="grid grid-cols-2 gap-[20rpx]">
              <view class="flex flex-col items-center">
                <text class="text-[28rpx] font-600 text-white">{{ displayStats.avgSpeed || 0 }}</text>
                <text class="text-[18rpx] text-gray mt-[4rpx]">平均速度(km/h)</text>
              </view>
              <view class="flex flex-col items-center">
                <text class="text-[28rpx] font-600 text-white">{{ displayStats.longestRide || 0 }}</text>
                <text class="text-[18rpx] text-gray mt-[4rpx]">最长单次(km)</text>
              </view>
            </view>
          </view>
        </view>
      </view>

      <!-- 功能入口 -->
      <view class="px-[24rpx] mt-[24rpx]">
        <view class="flex justify-between items-center mb-[16rpx]">
          <text class="text-[28rpx] font-600 text-white flex items-center gap-[6rpx]">
            <text class="i-carbon:app-launcher text-[24rpx] text-primary" />
            功能中心
          </text>
        </view>

        <view class="bg-card rounded-[16rpx] overflow-hidden border border-white/10 shadow-lg">
          <view
            v-for="(feature, index) in features.filter(f => f.show)"
            :key="feature.id"
            class="flex items-center justify-between p-[24rpx] transition-all duration-100 active:bg-white/5"
            :style="index < features.filter(f => f.show).length - 1 ? { borderBottom: '1rpx solid var(--wot-color-border)' } : {}"
            @click="handleFeatureClick(feature)"
          >
            <view class="flex items-center gap-[16rpx]">
              <text :class="feature.icon.includes('trophy') ? 'i-carbon:trophy text-[32rpx] text-primary' : feature.icon.includes('information') ? 'i-carbon:information text-[32rpx] text-primary' : feature.icon.includes('help') ? 'i-carbon:help text-[32rpx] text-primary' : 'i-carbon:document text-[32rpx] text-primary'" />
              <text class="text-[24rpx] text-white">{{ feature.name }}</text>
            </view>
            <text class="i-carbon:chevron-right text-[24rpx] text-gray" />
          </view>
        </view>
      </view>

      <!-- 设置功能 -->
      <view class="px-[24rpx] mt-[24rpx]">
        <view class="flex justify-between items-center mb-[16rpx]">
          <text class="text-[28rpx] font-600 text-white flex items-center gap-[6rpx]">
            <text class="i-carbon:settings text-[24rpx] text-primary" />
            设置
          </text>
        </view>

        <view class="bg-card rounded-[16rpx] overflow-hidden border border-white/10 shadow-lg">
          <!-- 暗黑模式切换 -->
          <view class="flex items-center justify-between p-[24rpx] border-b border-border">
            <view class="flex items-center gap-[16rpx]">
              <text class="i-carbon:moon text-[32rpx] text-primary" />
              <text class="text-[24rpx] text-white">暗黑模式</text>
            </view>
            <switch 
              :checked="isDark" 
              @change="toggleTheme" 
              color="#2ED573"
            />
          </view>

          <!-- 其他设置项 -->
          <view class="flex items-center justify-between p-[24rpx]">
            <view class="flex items-center gap-[16rpx]">
              <text class="i-carbon:refresh-cw text-[32rpx] text-primary" />
              <text class="text-[24rpx] text-white">清除缓存</text>
            </view>
            <text class="text-[20rpx] text-gray">12.3 MB</text>
          </view>
        </view>
      </view>

      <!-- 襄阳特色展示 -->
      <view class="px-[24rpx] mt-[24rpx]">
        <view class="flex justify-between items-center mb-[16rpx]">
          <text class="text-[28rpx] font-600 text-white flex items-center gap-[6rpx]">
            <text class="i-carbon:map-pin text-[24rpx] text-primary" />
            襄阳特色
          </text>
        </view>

        <view class="bg-card rounded-[16rpx] p-[24rpx] border border-white/10 shadow-lg">
          <view class="flex items-center gap-[16rpx] mb-[16rpx]">
            <text class="i-carbon:landmark text-[32rpx] text-primary" />
            <text class="text-[24rpx] font-600 text-white">三国文化名城</text>
          </view>
          <view class="grid grid-cols-3 gap-[12rpx]">
            <view v-for="(landmark, index) in xiangyangElements.landmarks" :key="index" class="flex flex-col items-center p-[12rpx] bg-bg-hover rounded-[8rpx] border border-white/5">
              <text class="text-[20rpx] font-600 text-white">{{ landmark.name }}</text>
              <text class="text-[16rpx] text-gray mt-[4rpx] text-center">{{ landmark.description }}</text>
            </view>
          </view>
        </view>
      </view>

      <!-- 合规声明 -->
      <view class="px-[24rpx] mt-[40rpx] mb-[60rpx]">
        <text class="text-[18rpx] text-gray text-center block">
          襄阳本地摩友公益工具 · 非盈利 · 无交易 · 无社交
        </text>
      </view>
    </view>
  </view>
</template>
