<script setup lang="ts">
interface Props {
  activity: ActivityItem
}

const props = defineProps<Props>()

const emit = defineEmits<{
  click: [activity: ActivityItem]
  viewRoute: [activity: ActivityItem]
  triggerShare: [activity: ActivityItem]
}>()

const imageError = ref(false)

function getStatusText(status: string) {
  if (status === 'upcoming')
    return '即将开始'
  if (status === 'ongoing')
    return '进行中'
  return '已结束'
}

function getStatusColor(status: string) {
  if (status === 'upcoming')
    return 'bg-primary'
  if (status === 'ongoing')
    return 'bg-warning'
  return 'bg-[#FF7A00]'
}

function handleClick() {
  emit('click', props.activity)
}

function handleViewRoute() {
  emit('viewRoute', props.activity)
}

function handleShare(e: any) {
  e.stopPropagation()
  emit('triggerShare', props.activity)
}
</script>

<template>
  <view
    class="overflow-hidden rounded-[16rpx] bg-card transition-all duration-100 active:scale-98"
    @click="handleClick"
  >
    <!-- 活动图片 -->
    <view class="relative h-[560rpx] w-full">
      <image
        v-if="activity.image && !imageError"
        :src="activity.image"
        class="h-full w-full object-cover"
        mode="aspectFill"
        @error="imageError = true"
      />
      <view v-else class="h-full w-full flex items-center justify-center from-[rgba(46,213,115,0.2)] to-[rgba(46,213,115,0.05)] bg-gradient-to-br">
        <text class="text-[120rpx] opacity-60">
          🏍️
        </text>
      </view>

      <!-- 状态标签 -->
      <view
        class="absolute left-[16rpx] top-[16rpx] rounded-[8rpx] px-[16rpx] py-[8rpx] text-[20rpx] text-white"
        :class="getStatusColor(activity.status)"
      >
        {{ getStatusText(activity.status) }}
      </view>
    </view>

    <!-- 活动信息 -->
    <view class="p-[20rpx]">
      <!-- 标题 + 分享按钮 -->
      <view class="mb-[12rpx] flex items-center justify-between">
        <text class="line-clamp-1 mr-[12rpx] flex-1 text-[28rpx] text-white font-600">
          {{ activity.title }}
        </text>
        <button
          class="flex flex-shrink-0 items-center gap-[4rpx] border-0 rounded-[6rpx] bg-primary px-[10rpx] py-[4rpx] text-[18rpx] text-white font-500 outline-none active:opacity-80"
          @click="handleShare"
        >
          <text class="i-carbon:share text-[16rpx]" />
          <text>分享</text>
        </button>
      </view>

      <!-- 组织者 -->
      <view v-if="activity.organizer" class="mb-[10rpx] flex items-center gap-[6rpx]">
        <text class="i-carbon:user text-[20rpx] text-primary" />
        <text class="text-[22rpx] text-primary font-500">
          {{ activity.organizer }}
        </text>
      </view>

      <!-- 时间地点 -->
      <view class="mb-[12rpx] flex items-center gap-[20rpx]">
        <view class="flex items-center gap-[6rpx]">
          <text class="i-carbon:calendar text-[22rpx] text-gray" />
          <text class="text-[22rpx] text-gray">
            {{ activity.date }} {{ activity.time }}
          </text>
        </view>
      </view>

      <view class="mb-[12rpx] flex items-center gap-[6rpx]">
        <text class="i-carbon:location text-[22rpx] text-gray" />
        <text class="text-[22rpx] text-gray">
          {{ activity.location }}
        </text>
      </view>

      <!-- 标签 -->
      <view class="mb-[12rpx] flex flex-wrap gap-[8rpx]">
        <view
          v-for="tag in activity.tags"
          :key="tag"
          class="rounded-[6rpx] px-[12rpx] py-[6rpx] text-[18rpx]"
          :style="{
            backgroundColor: `${ACTIVITY_TAG_CONFIG[tag as keyof typeof ACTIVITY_TAG_CONFIG]?.color || '#8D99AE'}20`,
            color: ACTIVITY_TAG_CONFIG[tag as keyof typeof ACTIVITY_TAG_CONFIG]?.color || '#8D99AE',
          }"
        >
          {{ ACTIVITY_TAG_CONFIG[tag as keyof typeof ACTIVITY_TAG_CONFIG]?.label || tag }}
        </view>
      </view>

      <!-- 描述 -->
      <text class="line-clamp-2 mb-[16rpx] block text-[22rpx] text-gray">
        {{ activity.description }}
      </text>

      <!-- 人数信息 -->
      <view v-if="activity.participantCount !== undefined || activity.maxParticipants !== undefined" class="mb-[12rpx] flex items-center gap-[6rpx]">
        <text class="i-carbon:group text-[22rpx] text-primary" />
        <text class="text-[22rpx] text-gray">
          已报名 <text class="text-primary font-500">
            {{ activity.participantCount ?? 0 }}
          </text> / <text class="text-primary font-500">
            {{ activity.maxParticipants ?? '--' }}
          </text> 人
        </text>
      </view>

      <!-- 底部：查看路线 -->
      <view
        v-if="activity.routeId"
        class="ml-auto flex items-center gap-[4rpx] text-primary"
        @click="handleViewRoute"
      >
        <text class="i-carbon:map text-[22rpx]" />
        <text class="text-[22rpx]">
          查看路线
        </text>
      </view>
    </view>
  </view>
</template>
