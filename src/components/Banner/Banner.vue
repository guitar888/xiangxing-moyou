<script setup lang="ts">
import type { BannerData } from '@/types'

defineOptions({
  options: {
    virtualHost: true,
  },
})

interface Props {
  list: BannerData[]
}

defineProps<Props>()

const router = useRouter()
const currentIndex = ref(0)

function handleClick(item: BannerData) {
  if (item.url) {
    if (item.url.includes('/pages/map/map') || item.url.includes('/pages/activity/activity')) {
      router.pushTab(item.url)
    }
    else {
      router.push(item.url)
    }
  }
}

function onSwiperChange(e: any) {
  currentIndex.value = e.detail.current
}
</script>

<template>
  <!-- #ifdef H5 -->
  <view class="relative z-1 animate-float-slow animate-scale-in px-[24rpx] pt-[20rpx]">
    <swiper
      class="h-[320rpx] overflow-hidden rounded-[16rpx]"
      :indicator-dots="false"
      :autoplay="true"
      :interval="4000"
      :duration="300"
      :circular="true"
      :fade="true"
      previous-margin="0"
      next-margin="0"
      @change="onSwiperChange"
    >
      <swiper-item v-for="(banner, index) in list" :key="index">
        <view
          class="banner-item h-full cursor-pointer rounded-[16rpx] p-[32rpx] transition-all duration-300 active:translate-y-[-2rpx]"
          :class="`banner-${banner.id}`"
          @click="handleClick(banner)"
        >
          <view class="pointer-events-none absolute inset-0 from-transparent via-[rgba(46,213,115,0.05)] to-[rgba(46,213,115,0.15)] bg-gradient-to-b" />
          <view class="relative z-2 flex flex-col gap-[8rpx]">
            <text class="text-[36rpx] text-white font-700 text-shadow">
              {{ banner.title }}
            </text>
            <text class="text-[24rpx] text-muted text-shadow-sm">
              {{ banner.desc }}
            </text>
          </view>
          <view v-if="banner.tag" class="absolute right-[20rpx] top-[20rpx] z-2 rounded-[8rpx] from-primary to-[var(--wot-color-theme-dark)] bg-gradient-to-r px-[16rpx] py-[6rpx] text-[20rpx] text-base font-600 shadow-[0_2rpx_8rpx_rgba(46,213,115,0.3)]">
            <text v-if="banner.tag === '热门'" class="mr-[4rpx]">
              🔥
            </text>
            {{ banner.tag }}
          </view>
          <view class="absolute left-1/2 top-1/2 z-1 text-[156rpx] opacity-35 brightness-150 drop-shadow-[0_0_20rpx_rgba(46,213,115,0.6)] filter -translate-x-1/2 -translate-y-[80%]">
            🏍️
          </view>
        </view>
      </swiper-item>
    </swiper>
    <view class="absolute bottom-[20rpx] left-1/2 z-10 flex gap-[12rpx] -translate-x-1/2">
      <view
        v-for="(banner, index) in list"
        :key="index"
        class="h-[8rpx] rounded-[4rpx] transition-all duration-300"
        :class="index === currentIndex ? 'w-[40rpx] bg-[#2ED573]' : 'w-[16rpx] bg-[#8D99AE]'"
      />
    </view>
  </view>
  <!-- #endif -->

  <!-- #ifndef H5 -->
  <view class="relative z-1 px-[24rpx] pt-[20rpx]">
    <swiper
      class="h-[320rpx] overflow-hidden rounded-[16rpx]"
      :indicator-dots="false"
      :autoplay="true"
      :interval="4000"
      :duration="300"
      :circular="true"
      :fade="true"
      previous-margin="0"
      next-margin="0"
      @change="onSwiperChange"
    >
      <swiper-item v-for="(banner, index) in list" :key="index">
        <view
          class="mini-banner-item h-full rounded-[16rpx] p-[32rpx]"
          :class="`mini-banner-${banner.id}`"
          @click="handleClick(banner)"
        >
          <view class="pointer-events-none absolute inset-0 mini-banner-gradient" />
          <view class="relative z-2 flex flex-col gap-[8rpx]">
            <text class="mini-banner-title">
              {{ banner.title }}
            </text>
            <text class="mini-banner-desc">
              {{ banner.desc }}
            </text>
          </view>
          <view v-if="banner.tag" class="mini-banner-tag">
            <text v-if="banner.tag === '热门'" class="mr-[4rpx]">
              🔥
            </text>
            {{ banner.tag }}
          </view>
          <view class="mini-banner-icon">
            🏍️
          </view>
        </view>
      </swiper-item>
    </swiper>
    <view class="absolute bottom-[20rpx] left-1/2 z-10 flex gap-[12rpx] -translate-x-1/2">
      <view
        v-for="(banner, index) in list"
        :key="index"
        class="mini-indicator"
        :class="index === currentIndex ? 'mini-indicator-active' : ''"
      />
    </view>
  </view>
  <!-- #endif -->
</template>

<style lang="scss" scoped>
/* H5 版本样式 */
.banner-item {
  background: linear-gradient(135deg, #1E1E1E 0%, #2A2A2A 100%);
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  position: relative;
  overflow: hidden;
  box-shadow: 0 8rpx 32rpx rgba(46, 213, 115, 0.08), inset 0 1rpx 0 rgba(255, 255, 255, 0.05);
}

.banner-item.banner-1 {
  background: linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%);
}

.banner-item.banner-2 {
  background: linear-gradient(135deg, #1E1E1E 0%, #2d2d2d 50%, #1E1E1E 100%);
}

.banner-item.banner-3 {
  background: linear-gradient(135deg, #1a1a1a 0%, #2a3a2a 50%, #1a1a1a 100%);
}

.banner-item.banner-4 {
  background: linear-gradient(135deg, #1E1E1E 0%, #2a2a1a 50%, #1E1E1E 100%);
}

.text-shadow {
  text-shadow: 0 2rpx 8rpx rgba(0, 0, 0, 0.5);
}

.text-shadow-sm {
  text-shadow: 0 1rpx 4rpx rgba(0, 0, 0, 0.5);
}

/* 小程序版本原生样式 */
.mini-banner-item {
  background: linear-gradient(135deg, #2A2A2A 0%, #1E1E1E 100%);
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  position: relative;
  overflow: hidden;
  box-shadow: 0 8rpx 32rpx rgba(46, 213, 115, 0.15), inset 0 1rpx 0 rgba(255, 255, 255, 0.1);
}

.mini-banner-gradient {
  background: linear-gradient(180deg, transparent 0%, rgba(46, 213, 115, 0.05) 50%, rgba(46, 213, 115, 0.15) 100%);
}

.mini-banner-title {
  font-size: 36rpx;
  color: #FFFFFF;
  font-weight: 700;
  text-shadow: 0 2rpx 8rpx rgba(0, 0, 0, 0.6);
}

.mini-banner-desc {
  font-size: 24rpx;
  color: #CCCCCC;
  text-shadow: 0 1rpx 4rpx rgba(0, 0, 0, 0.6);
}

.mini-banner-tag {
  position: absolute;
  right: 20rpx;
  top: 20rpx;
  z-index: 2;
  border-radius: 8rpx;
  background: linear-gradient(90deg, #2ED573 0%, #27C468 100%);
  padding: 6rpx 16rpx;
  font-size: 20rpx;
  color: #121212;
  font-weight: 600;
  box-shadow: 0 2rpx 8rpx rgba(46, 213, 115, 0.3);
}

.mini-banner-icon {
  position: absolute;
  left: 50%;
  top: 50%;
  z-index: 1;
  font-size: 156rpx;
  opacity: 0.35;
  transform: translateX(-50%) translateY(-80%);
  text-shadow: 0 0 20rpx rgba(46, 213, 115, 0.4);
}

.mini-indicator {
  height: 8rpx;
  width: 16rpx;
  border-radius: 4rpx;
  background: #8D99AE;
}

.mini-indicator-active {
  width: 40rpx;
  background: #2ED573;
}

.mini-banner-1 {
  background: linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%);
}

.mini-banner-2 {
  background: linear-gradient(135deg, #1E1E1E 0%, #2d2d2d 50%, #1E1E1E 100%);
}

.mini-banner-3 {
  background: linear-gradient(135deg, #1a1a1a 0%, #2a3a2a 50%, #1a1a1a 100%);
}

.mini-banner-4 {
  background: linear-gradient(135deg, #1E1E1E 0%, #2a2a1a 50%, #1E1E1E 100%);
}
</style>
