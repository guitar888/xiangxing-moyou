<script setup lang="ts">
import { ACTIVITY_DISCLAIMER, ACTIVITY_SAFETY_NOTICE } from '@/config/activity'
import { ACTIVITY_TAG_CONFIG, RIDE_TYPE_CONFIG } from '@/types'

definePage({
  name: 'activityDetail',
  style: {
    navigationBarTitleText: '活动详情',
  },
})

const detail = ref<ActivityItem | null>(null)
const imageError = ref(false)

onLoad((options: any) => {
  if (options.id) {
    const found = mockActivities.find(a => a.id === options.id)
    if (found) {
      detail.value = {
        ...found,
        info: found.description.slice(0, 60) + (found.description.length > 60 ? '...' : ''),
        image: ACTIVITY_COVER_IMAGES[found.id] || found.coverImage || '',
        isUpcoming: found.status === 'upcoming',
        countdownText: found.status === 'upcoming' ? '距活动开始' : undefined,
        tags: found.tags
      } as unknown as ActivityItem
    }
  }
})

function getStatusText(status: string) {
  if (status === 'upcoming')
    return '即将开始'
  if (status === 'ongoing')
    return '进行中'
  return '已结束'
}

function handleShare() {
  if (!detail.value)
    return
  const text = `【${detail.value.organizer || ''}${detail.value.organizer ? '】' : ''}${detail.value.title}
时间：${detail.value.date} ${detail.value.time}
地点：${detail.value.location}
详情：${detail.value.description}`

  uni.setClipboardData({
    data: text,
    success: () => {
      uni.showToast({ title: '已复制到剪贴板，快去分享吧', icon: 'success' })
    },
  })
}
</script>

<template>
  <view class="min-h-screen bg-base pb-[120rpx]">
    <template v-if="detail">
      <!-- 封面图 -->
      <view class="relative h-[600rpx] w-full">
        <image
          v-if="detail.image && !imageError"
          :src="detail.image"
          class="h-full w-full"
          mode="aspectFill"
          @error="imageError = true"
        />
        <view v-else class="h-full w-full flex items-center justify-center from-[rgba(46,213,115,0.2)] to-[rgba(46,213,115,0.05)] bg-gradient-to-br">
          <text class="text-[160rpx] opacity-60">
            🏍️
          </text>
        </view>

        <!-- 状态标签 -->
        <view
          class="absolute left-[32rpx] top-[32rpx] rounded-[12rpx] px-[24rpx] py-[12rpx] text-[24rpx] text-white font-500"
          :style="{
            backgroundColor: detail.status === 'upcoming' ? '#2ED573' : detail.status === 'ongoing' ? '#FFA502' : '#8D99AE',
          }"
        >
          {{ getStatusText(detail.status) }}
        </view>
      </view>

      <!-- 基本信息 -->
      <view class="relative z-10 mx-[24rpx] mt-[-40rpx] rounded-[24rpx] bg-card p-[32rpx]">
        <!-- 标题 -->
        <text class="line-clamp-2 mb-[16rpx] block text-[36rpx] text-white font-700">
          {{ detail.title }}
        </text>

        <!-- 组织者 -->
        <view v-if="detail.organizer" class="mb-[16rpx] flex items-center gap-[8rpx]">
          <text class="i-carbon:user text-[24rpx] text-primary" />
          <text class="text-[24rpx] text-primary font-500">
            {{ detail.organizer }}
          </text>
        </view>

        <!-- 骑行类型 -->
        <view v-if="detail.rideType" class="mb-[24rpx] flex items-center gap-[12rpx]">
          <text class="text-[32rpx]">
            {{ RIDE_TYPE_CONFIG[detail.rideType]?.icon }}
          </text>
          <view
            class="rounded-[8rpx] px-[16rpx] py-[8rpx] text-[20rpx] font-500"
            :style="{
              backgroundColor: RIDE_TYPE_CONFIG[detail.rideType]?.bgColor,
              color: RIDE_TYPE_CONFIG[detail.rideType]?.color,
            }"
          >
            {{ RIDE_TYPE_CONFIG[detail.rideType]?.label }}
          </view>
        </view>

        <!-- 标签 -->
        <view class="mb-[24rpx] flex flex-wrap gap-[12rpx]">
          <view
            v-for="tag in detail.tags"
            :key="tag"
            class="rounded-[8rpx] px-[16rpx] py-[8rpx] text-[20rpx] font-500"
            :style="{
              backgroundColor: `${ACTIVITY_TAG_CONFIG[tag as keyof typeof ACTIVITY_TAG_CONFIG]?.color || '#8D99AE'}20`,
              color: ACTIVITY_TAG_CONFIG[tag as keyof typeof ACTIVITY_TAG_CONFIG]?.color || '#8D99AE',
            }"
          >
            {{ ACTIVITY_TAG_CONFIG[tag as keyof typeof ACTIVITY_TAG_CONFIG]?.label || tag }}
          </view>
        </view>

        <view class="space-y-[16rpx]">
          <view class="flex items-center gap-[12rpx]">
            <text class="i-carbon:calendar text-[28rpx] text-primary" />
            <text class="text-[26rpx] text-white">
              {{ detail.date }} {{ detail.time }}
            </text>
          </view>
          <view class="flex items-center gap-[12rpx]">
            <text class="i-carbon:location text-[28rpx] text-primary" />
            <text class="text-[26rpx] text-white">
              {{ detail.location }}
            </text>
          </view>
          <view v-if="detail.participantCount !== undefined || detail.maxParticipants !== undefined" class="flex items-center gap-[12rpx]">
            <text class="i-carbon:group text-[28rpx] text-primary" />
            <text class="text-[26rpx] text-white">
              已报名 <text class="text-primary font-500">
                {{ detail.participantCount ?? 0 }}
              </text> / <text class="text-primary font-500">
                {{ detail.maxParticipants ?? '--' }}
              </text> 人
            </text>
          </view>
        </view>
      </view>

      <!-- 活动详情 -->
      <view class="mx-[24rpx] mt-[24rpx] rounded-[24rpx] bg-card p-[32rpx]">
        <text class="mb-[20rpx] block text-[32rpx] text-white font-600">
          活动详情
        </text>
        <text class="whitespace-pre-wrap text-[26rpx] text-gray leading-relaxed">
          {{ detail.description }}
        </text>
      </view>

      <!-- 集合信息 -->
      <view class="mx-[24rpx] mt-[24rpx] rounded-[24rpx] bg-card p-[32rpx]">
        <text class="mb-[20rpx] block text-[32rpx] text-white font-600">
          集合信息
        </text>
        <view class="space-y-[16rpx]">
          <view v-if="detail.gatherTime" class="flex items-start gap-[12rpx]">
            <text class="i-carbon:time mt-[4rpx] text-[24rpx] text-primary" />
            <view>
              <text class="block text-[22rpx] text-gray">
                集合时间
              </text>
              <text class="text-[26rpx] text-white">
                {{ detail.gatherTime }}
              </text>
            </view>
          </view>
          <view v-if="detail.gatherLocation" class="flex items-start gap-[12rpx]">
            <text class="i-carbon:location-filled mt-[4rpx] text-[24rpx] text-primary" />
            <view>
              <text class="block text-[22rpx] text-gray">
                集合地点
              </text>
              <text class="text-[26rpx] text-white">
                {{ detail.gatherLocation }}
              </text>
            </view>
          </view>
          <view v-if="detail.route" class="flex items-start gap-[12rpx]">
            <text class="i-carbon:compass mt-[4rpx] text-[24rpx] text-primary" />
            <view>
              <text class="block text-[22rpx] text-gray">
                活动路线
              </text>
              <text class="text-[26rpx] text-white">
                {{ detail.route }}
              </text>
            </view>
          </view>
        </view>
      </view>

      <!-- 费用与餐饮 -->
      <view class="mx-[24rpx] mt-[24rpx] rounded-[24rpx] bg-card p-[32rpx]">
        <text class="mb-[20rpx] block text-[32rpx] text-white font-600">
          费用说明
        </text>
        <text class="whitespace-pre-wrap text-[26rpx] text-gray leading-relaxed">
          {{ detail.mealInfo || '本次活动免费' }}
        </text>
      </view>

      <!-- 安全须知 -->
      <view class="mx-[24rpx] mt-[24rpx] rounded-[24rpx] bg-card p-[32rpx]">
        <text class="mb-[20rpx] block text-[32rpx] text-primary font-600">
          安全须知
        </text>
        <text class="whitespace-pre-wrap text-[26rpx] text-gray leading-relaxed">
          {{ detail.safetyNotice || ACTIVITY_SAFETY_NOTICE }}
        </text>
      </view>

      <!-- 免责声明（强制显示，优先使用活动自带文案，否则使用全局默认） -->
      <view class="mx-[24rpx] mt-[24rpx] rounded-[24rpx] bg-card p-[32rpx]">
        <text class="mb-[20rpx] block text-[32rpx] text-[#FF4757] font-600">
          免责声明
        </text>
        <text class="whitespace-pre-wrap text-[24rpx] text-gray leading-relaxed">
          {{ detail.disclaimer || ACTIVITY_DISCLAIMER }}
        </text>
      </view>
    </template>

    <view v-else class="h-screen flex items-center justify-center">
      <wd-loading color="#2ED573" />
    </view>

    <!-- 底部按钮 -->
    <view class="fixed bottom-[0] left-[0] right-[0] z-50 border-t border-border bg-card p-[24rpx]">
      <wd-button
        custom-class="w-full"
        type="primary"
        size="large"
        @click="handleShare"
      >
        分享活动
      </wd-button>
    </view>
  </view>
</template>
