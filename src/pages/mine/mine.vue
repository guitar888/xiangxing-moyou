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
import { useThemeStore } from '@/store/themeStore'
import { useManualThemeStore } from '@/store/manualThemeStore'
import { useSystemInfo } from '@/composables/useSystemInfo'

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
// 系统信息
// ================================================

const { statusBarHeight } = useSystemInfo()

// ================================================
// 主题管理
// ================================================

const themeStore = useThemeStore()
const manualThemeStore = useManualThemeStore()
const isDarkMode = computed(() => manualThemeStore.theme === 'dark' || themeStore.isDark)

function toggleTheme() {
  const newTheme = manualThemeStore.theme === 'dark' ? 'light' : 'dark'
  manualThemeStore.setTheme(newTheme)
}

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

// ================================================
// 襄阳元素配置
// ================================================

const xiangyangElements = {
  landmarks: [
    { name: '古隆中', description: '诸葛亮隐居地' },
    { name: '襄阳古城', description: '历史文化名城' },
    { name: '习家池', description: '汉代私家园林' },
  ],
  culture: '三国文化',
  color: '#2ED573', // 绿色象征襄阳的山水
}
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
        <view class="flex items-center gap-[8rpx] rounded-[10rpx] bg-card/50 px-[16rpx] py-[10rpx]">
          <text class="i-carbon:shield text-[24rpx] text-primary" />
          <text class="text-[22rpx] text-white/80 font-500">安全中心</text>
        </view>
      </view>

      <!-- 合规提示横幅 -->
      <common-ComplianceBanner />

      <!-- 用户信息卡片 -->
      <view class="relative px-[24rpx] mt-[20rpx]">
        <!-- 背景 - 融入襄阳元素：绿色渐变象征襄阳的山水 -->
        <view class="h-[160rpx] w-full bg-gradient-to-r from-primary to-primary/80 relative overflow-hidden rounded-[20rpx]">
          <!-- 襄阳特色图案（简化版） -->
          <view class="absolute inset-0 opacity-10">
            <view class="absolute top-[20rpx] left-[20rpx] w-[60rpx] h-[60rpx] rounded-full border-2 border-white"></view>
            <view class="absolute top-[40rpx] right-[40rpx] w-[40rpx] h-[40rpx] rounded-full border-2 border-white"></view>
            <view class="absolute bottom-[20rpx] left-[50%] transform -translate-x-1/2 w-[80rpx] h-[80rpx] rounded-full border-2 border-white"></view>
          </view>
        </view>

        <!-- 用户信息 -->
        <view class="absolute top-[80rpx] left-[44rpx] right-[44rpx] bg-card rounded-[16rpx] p-[24rpx] shadow-lg flex items-center gap-[24rpx] border border-white/10">
          <!-- 头像 -->
          <view class="relative">
            <image :src="userInfo.avatar" class="h-[100rpx] w-[100rpx] rounded-full border-2 border-primary/30" mode="aspectFit" />
            <!-- 襄阳特色标识 -->
            <view class="absolute -bottom-1 -right-1 bg-primary text-white text-[16rpx] rounded-full h-[32rpx] w-[32rpx] flex items-center justify-center">
              <text class="i-carbon:map-pin" />
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
          <view class="p-[12rpx]" @click="handleEditProfile">
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
        </view>

        <view class="bg-card rounded-[16rpx] p-[24rpx] border border-white/10 shadow-lg">
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

          <!-- 额外骑行数据 -->
          <view class="mt-[24rpx] pt-[24rpx] border-t border-border">
            <view class="grid grid-cols-2 gap-[20rpx]">
              <view class="flex flex-col items-center">
                <text class="text-[28rpx] font-600 text-white">{{ stats.avgSpeed || 0 }}</text>
                <text class="text-[18rpx] text-gray mt-[4rpx]">平均速度(km/h)</text>
              </view>
              <view class="flex flex-col items-center">
                <text class="text-[28rpx] font-600 text-white">{{ stats.maxDistance || 0 }}</text>
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
            v-for="(feature, index) in features"
            :key="feature.id"
            class="flex items-center justify-between p-[24rpx] transition-all duration-100 active:bg-white/5"
            :style="index < features.length - 1 ? { borderBottom: '1rpx solid var(--wot-color-border)' } : {}"
            @click="handleFeatureClick(feature)"
          >
            <view class="flex items-center gap-[16rpx]">
              <text :class="feature.icon.includes('chat') ? 'i-carbon:chat text-[32rpx] text-primary' : feature.icon.includes('star') ? 'i-carbon:star text-[32rpx] text-primary' : feature.icon.includes('calendar') ? 'i-carbon:calendar text-[32rpx] text-primary' : feature.icon.includes('bot') ? 'i-carbon:chat-bot text-[32rpx] text-primary' : feature.icon.includes('settings') ? 'i-carbon:settings text-[32rpx] text-primary' : feature.icon.includes('information') ? 'i-carbon:information text-[32rpx] text-primary' : feature.icon.includes('warning') ? 'i-carbon:warning text-[32rpx] text-primary' : feature.icon.includes('help') ? 'i-carbon:help text-[32rpx] text-primary' : 'i-carbon:document text-[32rpx] text-primary'" />
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
              :checked="isDarkMode" 
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

      <!-- 联系管理员弹窗 -->
      <common-ContactAdminModal />
    </view>
  </view>
</template>
