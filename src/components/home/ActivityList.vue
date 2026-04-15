<script setup lang="ts">
import type { ActivityItem } from '@/types/activity'

defineProps<{
  activityList: ActivityItem[]
  isLoadingMore: boolean
  hasMore: boolean
}>()

const emit = defineEmits<{
  activityClick: [activity: ActivityItem]
  goToActivity: []
  loadMore: []
}>()

function handleActivityClick(activity: ActivityItem) {
  emit('activityClick', activity)
}

function handleGoToActivity() {
  emit('goToActivity')
}

function handleLoadMore() {
  emit('loadMore')
}
</script>

<template>
  <view class="relative z-10 px-[24rpx] py-[16rpx]">
    <view class="mb-[16rpx] flex items-center justify-between">
      <text class="text-[28rpx] text-white font-600">
        活动公告
      </text>
      <text class="text-[22rpx] text-gray" @click="handleGoToActivity">
        更多活动
      </text>
    </view>
    <scroll-view class="max-h-[800rpx]" scroll-y :scroll-with-animation="true" @scrolltolower="handleLoadMore">
      <view class="flex flex-col gap-[16rpx]">
        <view
          v-for="(activity, index) in activityList"
          :key="index"
          class="bg-card flex items-start gap-[20rpx] rounded-[16rpx] p-[16rpx] shadow-card transition-all duration-100 relative"
          :class="{ 'border-[1.5rpx] border-[rgba(46,213,115,0.5)]': activity.isUpcoming }"
          @click="handleActivityClick(activity)"
        >
          <view v-if="activity.isUpcoming && activity.countdownText" class="absolute right-[16rpx] top-[16rpx] flex items-center gap-[4rpx] rounded-[8rpx] bg-primary px-[12rpx] py-[6rpx] animate-[pulse_2s_ease-in-out_infinite] z-2">
            <text class="text-[18rpx]">
              ⏰
            </text>
            <text class="text-[18rpx] text-base font-600">
              {{ activity.countdownText }}
            </text>
          </view>
          <image class="h-[120rpx] w-[120rpx] rounded-[12rpx] flex-shrink-0 bg-hover" :src="activity.image" mode="aspectFill" />
          <view class="flex-1 flex flex-col gap-[8rpx] overflow-hidden pr-[40rpx]">
            <text class="text-[26rpx] font-600 text-white truncate">
              {{ activity.title }}
            </text>
            <view class="flex items-center gap-[8rpx]">
              <text class="text-[22rpx] text-gray">
                {{ activity.date }} {{ activity.time }}
              </text>
            </view>
            <text class="text-[22rpx] text-muted truncate">
              {{ activity.info }}
            </text>
            <view class="flex gap-[8rpx]">
              <text v-for="(tag, tIndex) in activity.tags" :key="tIndex" class="text-[18rpx] text-warning bg-[rgba(255,122,0,0.15)] px-[10rpx] py-[2rpx] rounded-[6rpx]">
                {{ tag }}
              </text>
            </view>
            <text class="text-[20rpx] text-gray">
              本地摩友自发·非商业
            </text>
          </view>
        </view>
      </view>
      <view v-if="isLoadingMore" class="flex items-center justify-center gap-[12rpx] py-[20rpx]">
        <view class="h-[24rpx] w-[24rpx] border-[3rpx] border-primary border-t-transparent rounded-full animate-[spin_1s_linear_infinite]" />
        <text class="text-[22rpx] text-gray">
          加载中...
        </text>
      </view>
      <view v-if="!hasMore && activityList.length > 0" class="py-[20rpx] text-center">
        <text class="text-[22rpx] text-gray">
          没有更多活动了
        </text>
      </view>
    </scroll-view>
    <view v-if="activityList.length === 0" class="py-[80rpx] text-center">
      <wd-icon name="info-outline" size="80rpx" color="var(--wot-color-text-gray)" />
      <text class="block mt-[20rpx] text-[24rpx] text-gray">
        暂无活动公告
      </text>
    </view>
  </view>
</template>