<script setup lang="ts">
/**
 * 活动卡片组件
 */
import type { Activity } from '@/types'
import { ACTIVITY_TAG_CONFIG } from '@/types'

interface Props {
  activity: Activity
}

const props = defineProps<Props>()

const emit = defineEmits<{
  click: [activity: Activity]
  viewRoute: [activity: Activity]
}>()

const { selectRoute, clearSelection } = useMapData()

function getStatusText(status: string) {
  if (status === 'upcoming') return '即将开始'
  if (status === 'ongoing') return '进行中'
  return '已结束'
}

function getStatusColor(status: string) {
  if (status === 'upcoming') return 'bg-primary'
  if (status === 'ongoing') return 'bg-warning'
  return 'bg-gray'
}

function handleClick() {
  emit('click', props.activity)
}

function handleViewRoute(e: Event) {
  e.stopPropagation()
  emit('viewRoute', props.activity)
}
</script>

<template>
  <view
    class="bg-card rounded-[16rpx] overflow-hidden transition-all duration-100 active:scale-98"
    @click="handleClick"
  >
    <!-- 活动图片 -->
    <view class="relative w-full h-[280rpx]">
      <image
        v-if="activity.image"
        :src="activity.image"
        class="w-full h-full object-cover"
        mode="aspectFill"
      />
      <view v-else class="w-full h-full bg-secondary flex items-center justify-center">
        <text class="i-carbon:calendar text-[80rpx] text-gray" />
      </view>

      <!-- 状态标签 -->
      <view
        class="absolute top-[16rpx] right-[16rpx] px-[16rpx] py-[8rpx] rounded-[8rpx] text-[20rpx] text-white"
        :class="getStatusColor(activity.status)"
      >
        {{ getStatusText(activity.status) }}
      </view>
    </view>

    <!-- 活动信息 -->
    <view class="p-[20rpx]">
      <!-- 标题 -->
      <text class="text-[28rpx] font-600 text-white mb-[12rpx] block line-clamp-1">
        {{ activity.title }}
      </text>

      <!-- 时间地点 -->
      <view class="flex items-center gap-[20rpx] mb-[12rpx]">
        <view class="flex items-center gap-[6rpx]">
          <text class="i-carbon:calendar text-[22rpx] text-gray" />
          <text class="text-[22rpx] text-gray">{{ activity.date }} {{ activity.time }}</text>
        </view>
      </view>

      <view class="flex items-center gap-[6rpx] mb-[12rpx]">
        <text class="i-carbon:location text-[22rpx] text-gray" />
        <text class="text-[22rpx] text-gray">{{ activity.location }}</text>
      </view>

      <!-- 标签 -->
      <view class="flex flex-wrap gap-[8rpx] mb-[12rpx]">
        <view
          v-for="tag in activity.tags"
          :key="tag"
          class="px-[12rpx] py-[6rpx] rounded-[6rpx] text-[18rpx]"
          :style="{
            backgroundColor: ACTIVITY_TAG_CONFIG[tag]?.color + '20',
            color: ACTIVITY_TAG_CONFIG[tag]?.color
          }"
        >
          {{ ACTIVITY_TAG_CONFIG[tag]?.label || tag }}
        </view>
      </view>

      <!-- 描述 -->
      <text class="text-[22rpx] text-gray line-clamp-2 mb-[16rpx] block">
        {{ activity.description }}
      </text>

      <!-- 底部：参与人数 + 查看路线 -->
      <view class="flex justify-between items-center">
        <view class="flex items-center gap-[6rpx]">
          <text class="i-carbon:users text-[22rpx] text-gray" />
          <text class="text-[22rpx] text-gray">{{ activity.participantCount }}/{{ activity.maxParticipants }}人关注</text>
        </view>

        <view
          v-if="activity.routeId"
          class="flex items-center gap-[4rpx] text-primary"
          @click="handleViewRoute"
        >
          <text class="i-carbon:map text-[22rpx]" />
          <text class="text-[22rpx]">查看路线</text>
        </view>
      </view>
    </view>
  </view>
</template>
