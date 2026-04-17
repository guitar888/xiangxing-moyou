<script setup lang="ts">
import type { ActivityItem } from '@/types/activity'

defineProps<{
  activityList: ActivityItem[]
}>()

const router = useRouter()

function handleActivityClick(activity: ActivityItem) {
  router.push({
    path: '/subPages/activity/detail',
    query: { id: activity.id },
  })
}

function handleGoToActivity() {
  router.pushTab('/pages/activity/activity')
}
</script>

<template>
  <!-- #ifdef H5 -->
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
  <!-- #endif -->

  <!-- #ifndef H5 -->
  <view class="relative z-10 px-[24rpx] py-[16rpx]">
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
        :class="['mini-activity-card', activity.isUpcoming ? 'mini-activity-upcoming' : '']"
        @click="handleActivityClick(activity)"
      >
        <view v-if="activity.isUpcoming && activity.countdownText" :class="['mini-activity-badge', 'mini-activity-badge-upcoming']">
          <text class="text-[18rpx]">
            ⏰
          </text>
          <text class="mini-activity-badge-text">
            {{ activity.countdownText }}
          </text>
        </view>
        <view v-else-if="!activity.isUpcoming" :class="['mini-activity-badge', 'mini-activity-badge-ended']">
          <text class="text-[18rpx]">
            ✅
          </text>
          <text class="mini-activity-badge-text">
            已结束
          </text>
        </view>
        <image class="mini-activity-image" :src="activity.image" mode="aspectFill" />
        <view class="mini-activity-content">
          <text class="mini-activity-title">
            {{ activity.title }}
          </text>
          <text class="mini-activity-time">
            {{ activity.date }} {{ activity.time }}
          </text>
          <text class="mini-activity-info">
            {{ activity.info }}
          </text>
          <view class="mini-activity-tags">
            <text v-for="(tag, tIndex) in activity.tags" :key="tIndex" class="mini-activity-tag">
              {{ tag }}
            </text>
          </view>
          <text class="mini-activity-note">
            本地摩友自发·非商业
          </text>
        </view>
      </view>
    </view>
    <view v-if="activityList.length === 0" class="py-[80rpx] text-center">
      <wd-icon name="info-outline" size="80rpx" color="#8D99AE" />
      <text class="mt-[20rpx] block text-[24rpx] text-gray">
        暂无活动公告
      </text>
    </view>
  </view>
  <!-- #endif -->
</template>

<style lang="scss" scoped>
.mini-activity-card {
  position: relative;
  display: flex;
  align-items: flex-start;
  gap: 20rpx;
  border-radius: 16rpx;
  padding: 16rpx;
  background: linear-gradient(135deg, #2A2A2A 0%, #1E1E1E 100%);
  box-shadow: 0 8rpx 32rpx rgba(46, 213, 115, 0.15), inset 0 1rpx 0 rgba(255, 255, 255, 0.1);
}

.mini-activity-upcoming {
  border: 0.5rpx solid #2ED573;
  background: linear-gradient(135deg, rgba(46, 213, 115, 0.2) 0%, #1E1E1E 100%);
  box-shadow: 0 8rpx 32rpx rgba(46, 213, 115, 0.25), inset 0 1rpx 0 rgba(255, 255, 255, 0.15);
}

.mini-activity-image {
  width: 120rpx;
  height: 120rpx;
  flex-shrink: 0;
  border-radius: 12rpx;
  background: #333333;
}

.mini-activity-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 8rpx;
  overflow: hidden;
  padding-right: 40rpx;
}

.mini-activity-title {
  font-size: 26rpx;
  font-weight: 600;
  color: #FFFFFF;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.mini-activity-time {
  font-size: 22rpx;
  color: #8D99AE;
}

.mini-activity-info {
  font-size: 22rpx;
  color: #E0E0E0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.mini-activity-tags {
  display: flex;
  gap: 8rpx;
}

.mini-activity-tag {
  border-radius: 6rpx;
  padding: 2rpx 10rpx;
  font-size: 18rpx;
  color: #FF7A00;
  background: rgba(255, 122, 0, 0.2);
}

.mini-activity-note {
  font-size: 20rpx;
  color: #8D99AE;
}

.mini-activity-badge {
  position: absolute;
  right: 16rpx;
  top: 16rpx;
  z-index: 2;
  display: flex;
  align-items: center;
  gap: 4rpx;
  border-radius: 8rpx;
  padding: 6rpx 12rpx;
}

.mini-activity-badge-upcoming {
  background: #2ED573;
}

.mini-activity-badge-ended {
  background: #FF7A00;
}

.mini-activity-badge-text {
  font-size: 18rpx;
  font-weight: 600;
  color: #121212;
}
</style>
