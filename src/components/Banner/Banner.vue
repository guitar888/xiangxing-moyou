<script setup lang="ts">
import type { BannerData } from '@/types/banner'

defineProps<Props>()

const emit = defineEmits<{
  click: [item: BannerData]
}>()

interface Props {
  list: BannerData[]
}

const currentIndex = ref(0)

function handleClick(item: BannerData) {
  emit('click', item)
}

function onSwiperChange(e: any) {
  currentIndex.value = e.detail.current
}
</script>

<script lang="ts">
export default {
  options: {
    virtualHost: true,
  },
}
</script>

<template>
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
        class="h-[8rpx] rounded-[4rpx] bg-gray transition-all duration-300"
        :class="index === currentIndex ? 'w-[40rpx] bg-primary' : 'w-[16rpx]'"
      />
    </view>
  </view>
</template>

<style scoped>
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
  background: linear-gradient(135deg, #1a1a1a 0%, #2a3a2a 50%, #1a2a1a 100%);
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
</style>
