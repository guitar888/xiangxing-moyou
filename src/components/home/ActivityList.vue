<script setup lang="ts">
import type { ActivityItem } from '@/types/activity'

defineProps<{
  activityList: ActivityItem[]
}>()

const emit = defineEmits<{
  activityClick: [activity: ActivityItem]
  goToActivity: []
}>()

function handleActivityClick(activity: ActivityItem) {
  emit('activityClick', activity)
}

function handleGoToActivity() {
  emit('goToActivity')
}
</script>

<template>
  <view class="relative z-10 animate-fade-in-up px-[24rpx] py-[16rpx]">
    <view class="mb-[16rpx] flex items-center justify-between">
      <text class="text-[28rpx] text-white font-600">
        活动公告
      </text>
      <text class="text-[22rpx] text-gray" @click="handleGoToActivity">
        更多活动
      </text>
    </view>
    <view class="flex flex-col gap-[16rpx]">
      <view
        v-for="(activity, index) in activityList"
        :key="index"
        class="relative flex animate-fade-in-up items-start gap-[20rpx] rounded-[16rpx] bg-card p-[16rpx] shadow-card transition-all duration-100"
        :style="{ animationDelay: `${index * 100}ms` }"
        :class="{ 'border-[1.5rpx] border-[rgba(46,213,115,0.5)]': activity.isUpcoming }"
        @click="handleActivityClick(activity)"
      >
        <view v-if="activity.isUpcoming && activity.countdownText" class="absolute right-[16rpx] top-[16rpx] z-2 flex animate-pulse items-center gap-[4rpx] rounded-[8rpx] bg-primary px-[12rpx] py-[6rpx]">
          <text class="text-[18rpx]">
            ⏰
          </text>
          <text class="text-[18rpx] text-base font-600">
            {{ activity.countdownText }}
          </text>
        </view>
        <view v-else-if="!activity.isUpcoming" class="animate-float-slow absolute right-[16rpx] top-[16rpx] z-2 flex items-center gap-[4rpx] rounded-[8rpx] bg-warning px-[12rpx] py-[6rpx]">
          <text class="text-[18rpx]">
            ✅
          </text>
          <text class="text-[18rpx] text-base font-600">
            已结束
          </text>
        </view>
        <image class="h-[120rpx] w-[120rpx] flex-shrink-0 rounded-[12rpx] bg-hover" :src="activity.image" mode="aspectFill" />
        <view class="flex flex-1 flex-col gap-[8rpx] overflow-hidden pr-[40rpx]">
          <text class="truncate text-[26rpx] text-white font-600">
            {{ activity.title }}
          </text>
          <view class="flex items-center gap-[8rpx]">
            <text class="text-[22rpx] text-gray">
              {{ activity.date }} {{ activity.time }}
            </text>
          </view>
          <text class="truncate text-[22rpx] text-muted">
            {{ activity.info }}
          </text>
          <view class="flex gap-[8rpx]">
            <text v-for="(tag, tIndex) in activity.tags" :key="tIndex" class="rounded-[6rpx] bg-[rgba(255,122,0,0.15)] px-[10rpx] py-[2rpx] text-[18rpx] text-warning">
              {{ tag }}
            </text>
          </view>
          <text class="text-[20rpx] text-gray">
            本地摩友自发·非商业
          </text>
        </view>
      </view>
    </view>
    <view v-if="activityList.length === 0" class="py-[80rpx] text-center">
      <wd-icon name="info-outline" size="80rpx" color="var(--wot-color-text-gray)" />
      <text class="mt-[20rpx] block text-[24rpx] text-gray">
        暂无活动公告
      </text>
    </view>
  </view>
</template>
