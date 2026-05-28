<script setup lang="ts">
import type { BannerData } from '@/types'

defineOptions({
  options: {
    virtualHost: true,
  },
})

defineProps<Props>()

interface Props {
  list: BannerData[]
}

const router = useRouter()
const currentIndex = ref(0)

// 图片加载状态管理
const imageLoadStatus = ref<Record<string, boolean>>({})

function handleImageLoad(id: string) {
  imageLoadStatus.value[id] = true
}

function handleImageError(id: string) {
  imageLoadStatus.value[id] = false
}

function handleClick(item: BannerData) {
  if (item.url) {
    router.push(item.url)
  }
  else {
    router.pushTab('/pages/activity/activity')
  }
}

function onSwiperChange(e: any) {
  currentIndex.value = e.detail.current
}
</script>

<template>
  <!-- #ifdef H5 -->
  <view class="animate-float-slow animate-scale-in relative z-1 px-[24rpx] pt-[20rpx]">
    <swiper
      class="h-[480rpx] overflow-hidden rounded-[16rpx]"
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
          class="banner-item h-full cursor-pointer overflow-hidden rounded-[16rpx] transition-all duration-300 active:translate-y-[-2rpx]"
          :class="`banner-${banner.id}`"
          @click="handleClick(banner)"
        >
          <!-- 封面图片 -->
          <image
            v-if="banner.image"
            class="absolute inset-0 h-full w-full object-cover"
            :src="banner.image"
            mode="aspectFill"
          />
          <!-- 渐变叠加层 -->
          <view class="pointer-events-none absolute inset-0 from-black/40 via-black/20 to-black/60 bg-gradient-to-t" />
          <!-- 文字内容 -->
          <view class="absolute bottom-0 left-0 right-0 z-2 flex flex-col gap-[8rpx] p-[32rpx]">
            <text class="text-[36rpx] text-[#FFFFFF] font-700 text-shadow">
              {{ banner.title }}
            </text>
            <text v-if="banner.desc" class="text-[24rpx] text-[#E0E0E0] text-shadow-sm">
              {{ banner.desc }}
            </text>
          </view>
          <!-- 标签 -->
          <view v-if="banner.tag" class="absolute right-[20rpx] top-[20rpx] z-2 rounded-[8rpx] from-primary to-[var(--wot-color-theme-dark)] bg-gradient-to-r px-[16rpx] py-[6rpx] text-[20rpx] text-base font-600 shadow-[0_2rpx_8rpx_rgba(46,213,115,0.3)]">
            <text v-if="banner.tag.includes('/')" class="mr-[4rpx]">
              👥
            </text>
            {{ banner.tag }}
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
      class="h-[480rpx] overflow-hidden rounded-[16rpx]"
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
          class="mini-banner-item h-full overflow-hidden rounded-[16rpx]"
          :class="`mini-banner-${banner.id}`"
          @click="handleClick(banner)"
        >
          <!-- 封面图片 -->
          <image
            v-if="banner.image"
            class="absolute inset-0 h-full w-full object-cover"
            :src="banner.image"
            mode="aspectFill"
          />
          <!-- 渐变叠加层 -->
          <view class="mini-banner-gradient pointer-events-none absolute inset-0" />
          <!-- 文字内容 -->
          <view class="absolute bottom-0 left-0 right-0 z-2 flex flex-col gap-[8rpx] p-[32rpx]">
            <text class="mini-banner-title">
              {{ banner.title }}
            </text>
            <text v-if="banner.desc" class="mini-banner-desc">
              {{ banner.desc }}
            </text>
          </view>
          <!-- 标签 -->
          <view v-if="banner.tag" class="mini-banner-tag">
            <text v-if="banner.tag.includes('/')" class="mr-[4rpx]">
              👥
            </text>
            {{ banner.tag }}
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
.banner-item {
  background: var(--banner-bg, linear-gradient(135deg, #1E1E1E 0%, #2A2A2A 100%));
  display: flex;
  flex-direction: column;
  position: relative;
  overflow: hidden;
  box-shadow: 0 8rpx 32rpx rgba(46, 213, 115, 0.08), inset 0 1rpx 0 rgba(255, 255, 255, 0.05);
}

.text-shadow {
  text-shadow: 0 2rpx 8rpx rgba(0, 0, 0, 0.5);
}
.text-shadow-sm {
  text-shadow: 0 1rpx 4rpx rgba(0, 0, 0, 0.5);
}

.mini-banner-item {
  background: linear-gradient(135deg, #2A2A2A 0%, #1E1E1E 100%);
  display: flex;
  flex-direction: column;
  position: relative;
  overflow: hidden;
  box-shadow: 0 8rpx 32rpx rgba(46, 213, 115, 0.15), inset 0 1rpx 0 rgba(255, 255, 255, 0.1);
}
.mini-banner-gradient {
  background: linear-gradient(180deg, transparent 0%, rgba(0, 0, 0, 0.3) 50%, rgba(0, 0, 0, 0.7) 100%);
}
.mini-banner-title {
  font-size: 36rpx;
  color: var(--wot-color-text-white);
  font-weight: 700;
  text-shadow: 0 2rpx 8rpx rgba(0, 0, 0, 0.6);
}
.mini-banner-desc {
  font-size: 24rpx;
  color: var(--wot-color-text-muted);
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
  color: var(--wot-color-bg-base);
  font-weight: 600;
  box-shadow: 0 2rpx 8rpx rgba(46, 213, 115, 0.3);
}
.mini-indicator {
  height: 8rpx;
  width: 16rpx;
  border-radius: 4rpx;
  background: var(--wot-color-text-gray);
}
.mini-indicator-active {
  width: 40rpx;
  background: #2ED573;
}
</style>
