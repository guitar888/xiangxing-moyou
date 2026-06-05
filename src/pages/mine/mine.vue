<script setup lang="ts">
/**
 * 我的页面 - 无登录版
 * 展示骑行统计、功能入口
 */
definePage({
  name: 'mine',
  layout: 'tabbar',
  style: {
    navigationBarTitleText: '我的',
    navigationStyle: 'custom',
  },
})

const { statusBarHeight } = useSystemInfo()

const { stats } = useRideStats()

const { isDark, toggleTheme: toggleThemeFromComposable } = useManualTheme()

const isDarkRef = ref(isDark.value ? 'Y' : 'N')

watch(() => isDark.value, (val) => {
  isDarkRef.value = val ? 'Y' : 'N'
})

function onSwitchChange(val: string) {
  if (val !== isDarkRef.value) {
    toggleThemeFromComposable()
  }
}

const router = useRouter()

function handleFeatureClick(feature: any) {
  if (feature.action === 'about') {
    router.push('/pages/about/index')
  }
  else if (feature.action === 'privacy') {
    router.push('/pages/about/privacy')
  }
  else if (feature.path) {
    router.push(feature.path)
  }
}

const features = computed(() => [
  {
    id: 'privacy',
    name: '隐私协议',
    icon: 'i-carbon:locked',
    show: true,
    action: 'privacy',
  },
  {
    id: 'about',
    name: '关于我',
    icon: 'i-carbon:cafe',
    show: true,
    action: 'about',
  },
  {
    id: 'help',
    name: '帮助中心',
    icon: 'i-carbon:chat',
    show: true,
    path: '/subPages/help/help',
  },
])

function handleClearData() {
  uni.showModal({
    title: '清除数据',
    content: '确定要清除所有骑行数据吗？此操作不可恢复。',
    success: (res) => {
      if (res.confirm) {
        uni.removeStorageSync('ride_records')
        uni.removeStorageSync('active_ride')
        uni.showToast({ title: '数据已清除', icon: 'success' })
      }
    },
  })
}
</script>

<template>
  <view class="relative min-h-screen overflow-hidden from-base via-[var(--wot-color-bg-hover)] to-[var(--wot-color-bg-card)] bg-gradient-to-br">
    <view class="pointer-events-none absolute inset-x-0 top-0 z-0 h-[240rpx]" :style="{ background: 'linear-gradient(to bottom, rgba(46, 213, 115, 0.2), transparent 100%)' }" />
    <view class="pointer-events-none absolute inset-0 z-0 opacity-2" :style="{ background: 'repeating-linear-gradient(45deg, transparent, transparent 40rpx, #2ED573 40rpx, #2ED573 80rpx), repeating-linear-gradient(-45deg, transparent, transparent 40rpx, #2ED573 40rpx, #2ED573 80rpx)' }" />

    <view class="relative z-10">
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
          <text class="text-[32rpx] font-700 tracking-[1px]" :style="{ color: '#2ED573' }">
            我的
          </text>
        </view>
      </view>

      <common-ComplianceBanner />

      <view class="relative mt-[20rpx] px-[24rpx]">
        <view class="relative w-full overflow-hidden border border-white/10 rounded-[24rpx]">
          <view class="from-gray-900 via-gray-800 to-gray-900 absolute inset-0 bg-gradient-to-br" />
          <view class="absolute inset-0" :style="{ background: 'linear-gradient(135deg, rgba(46, 213, 115, 0.1) 0%, transparent 50%, rgba(46, 213, 115, 0.05) 100%)' }" />
          <view class="absolute left-0 top-0 h-full w-full overflow-hidden">
            <view class="absolute left-[20rpx] top-[20rpx] h-[200rpx] w-[200rpx] rounded-full bg-primary/5 blur-[80rpx]" />
            <view class="absolute bottom-[10rpx] right-[30rpx] h-[150rpx] w-[150rpx] rounded-full bg-primary/10 blur-[60rpx]" />
          </view>
          <view class="relative px-[32rpx] py-[36rpx]">
            <view class="mb-[16rpx] flex items-center gap-[20rpx]">
              <view class="h-[72rpx] w-[72rpx] flex items-center justify-center border border-primary/30 rounded-[18rpx] bg-primary/20 shadow-[0_0_20rpx_rgba(46,213,115,0.3)]">
                <text class="i-fluent:vehicle-motorcycle-28-filled text-[36rpx] text-white" />
              </view>
              <view>
                <text class="text-[34rpx] text-white font-800 tracking-[2px]">
                  襄阳摩友
                </text>
                <text class="mt-[2rpx] block text-[18rpx] text-primary/80 tracking-wider">
                  XIANGYANG RIDER
                </text>
              </view>
            </view>
            <view class="flex items-center gap-[12rpx]">
              <view class="h-[4rpx] w-[60rpx] rounded-full from-primary to-transparent bg-gradient-to-r" />
              <text class="text-[22rpx] text-white/60 tracking-wide">
                追风之路 · 自由骑行
              </text>
            </view>
          </view>
        </view>
      </view>

      <view class="mt-[24rpx] px-[24rpx]">
        <view class="border border-white/10 rounded-[24rpx] bg-card p-[28rpx] shadow-lg">
          <view class="mb-[24rpx] flex items-center justify-between">
            <text class="flex items-center gap-[8rpx] text-[26rpx] text-white font-600">
              <text class="i-carbon:analytics text-[24rpx] text-primary" />
              骑行数据总览
            </text>
          </view>

          <view class="grid grid-cols-3 gap-[12rpx]">
            <view class="flex flex-col items-center rounded-[16rpx] p-[16rpx]" :style="{ background: 'rgba(46, 213, 115, 0.08)' }">
              <text class="text-[38rpx] text-primary font-700">
                {{ stats.totalRides }}
              </text>
              <text class="mt-[8rpx] text-[22rpx] text-white">
                骑行次数
              </text>
            </view>
            <view class="flex flex-col items-center rounded-[16rpx] p-[16rpx]" :style="{ background: 'rgba(46, 213, 115, 0.08)' }">
              <text class="text-[38rpx] text-primary font-700">
                {{ stats.totalDistance }}
              </text>
              <text class="mt-[8rpx] text-[22rpx] text-white">
                总里程
              </text>
            </view>
            <view class="flex flex-col items-center rounded-[16rpx] p-[16rpx]" :style="{ background: 'rgba(46, 213, 115, 0.08)' }">
              <text class="text-[38rpx] text-primary font-700">
                {{ Math.round(stats.totalDuration / 60 * 10) / 10 }}
              </text>
              <text class="mt-[8rpx] text-[22rpx] text-white">
                总时长
              </text>
            </view>
          </view>

          <view class="grid grid-cols-2 mt-[20rpx] gap-[16rpx] border-t border-white/10 pt-[20rpx]">
            <view class="flex items-center gap-[8rpx]">
              <text class="i-carbon:delta text-[20rpx] text-primary" />
              <text class="text-[20rpx] text-gray">
                均距
              </text>
              <text class="text-[22rpx] text-white font-600">
                {{ stats.avgDistance || 0 }}km
              </text>
            </view>
            <view class="flex items-center gap-[8rpx]">
              <text class="i-carbon:speedometer text-[20rpx] text-primary" />
              <text class="text-[20rpx] text-gray">
                均速
              </text>
              <text class="text-[22rpx] text-white font-600">
                {{ stats.avgSpeed || 0 }}km/h
              </text>
            </view>
          </view>
        </view>
      </view>

      <view class="mt-[24rpx] px-[24rpx]">
        <view class="mb-[16rpx] flex items-center gap-[8rpx]">
          <text class="i-carbon:app-launcher text-[24rpx] text-primary" />
          <text class="text-[26rpx] text-white font-600">
            功能中心
          </text>
        </view>

        <view class="overflow-hidden border border-white/10 rounded-[24rpx] bg-card shadow-lg">
          <view
            v-for="(feature, index) in features.filter(f => f.show)"
            :key="feature.id"
            class="flex items-center justify-between p-[28rpx] transition-all duration-100 active:bg-black/5"
            :style="index < features.filter(f => f.show).length - 1 ? { borderBottom: '1rpx solid rgba(255,255,255,0.1)' } : {}"
            @click="handleFeatureClick(feature)"
          >
            <view class="flex items-center gap-[16rpx]">
              <view class="h-[56rpx] w-[56rpx] flex items-center justify-center rounded-[14rpx]" :style="{ background: 'rgba(46, 213, 115, 0.1)' }">
                <text :class="feature.icon" class="text-[26rpx]" style="color: #2ED573" />
              </view>
              <text class="text-[24rpx] text-white">
                {{ feature.name }}
              </text>
            </view>
            <text class="i-carbon:chevron-right text-[24rpx] text-gray" />
          </view>
        </view>
      </view>

      <view class="mt-[24rpx] px-[24rpx]">
        <view class="mb-[16rpx] flex items-center gap-[8rpx]">
          <text class="i-carbon:settings text-[24rpx] text-primary" />
          <text class="text-[26rpx] text-white font-600">
            设置
          </text>
        </view>

        <view class="overflow-hidden border border-white/10 rounded-[24rpx] bg-card shadow-lg">
          <view class="flex items-center justify-between p-[28rpx]">
            <view class="flex items-center gap-[16rpx]">
              <view class="h-[56rpx] w-[56rpx] flex items-center justify-center rounded-[14rpx]" :style="{ background: 'rgba(46, 213, 115, 0.1)' }">
                <text :class="isDarkRef === 'Y' ? 'i-carbon:moon' : 'i-carbon:sun'" class="text-[26rpx]" style="color: #2ED573" />
              </view>
              <text class="text-[24rpx] text-white">
                深色模式
              </text>
            </view>
            <wd-switch v-model="isDarkRef" active-value="Y" inactive-value="N" size="40rpx" active-color="#2ED573" inactive-color="#b9b9b9" @change="onSwitchChange" />
          </view>

          <view
            class="flex items-center justify-between border-t border-white/10 p-[28rpx]"
            @click="handleClearData"
          >
            <view class="flex items-center gap-[16rpx]">
              <view class="h-[56rpx] w-[56rpx] flex items-center justify-center rounded-[14rpx] bg-red-500/15">
                <text class="i-carbon:renew text-[28rpx] text-red-500" />
              </view>
              <text class="text-[24rpx] text-white">
                清除本地数据
              </text>
            </view>
            <text class="i-carbon:chevron-right text-[24rpx] text-gray" />
          </view>
        </view>
      </view>

      <view class="mt-[24rpx] px-[24rpx] pb-[40rpx]">
        <view class="border border-white/10 rounded-[24rpx] bg-card p-[24rpx] text-center">
          <text class="mb-[8rpx] block text-[20rpx] text-gray/60">
            非盈利项目 · 本地存储 · 无数据上传
          </text>
          <text class="text-[18rpx] text-gray/40">
            襄阳摩友助手 v2.0
          </text>
        </view>
      </view>
    </view>
  </view>
</template>
