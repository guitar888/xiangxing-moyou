<script setup lang="ts">
/**
 * 路线卡片组件
 * 紧凑设计，方便手机浏览
 */
import type { RideRoute } from '@/types'
import { DIFFICULTY_CONFIG, SPOT_TYPE_CONFIG, ROUTE_FEATURES } from '@/types'

interface Props {
  route: RideRoute
  isSelected?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  isSelected: false,
})

const emit = defineEmits<{
  select: [route: RideRoute]
  navigate: [route: RideRoute]
}>()

function handleNavigate(e: Event) {
  e.stopPropagation()
  emit('navigate', props.route)
}

function handleSelect() {
  emit('select', props.route)
}

function getSpotTypeLabel(type: string) {
  return SPOT_TYPE_CONFIG[type as keyof typeof SPOT_TYPE_CONFIG]?.label || type
}

function getSpotTypeColor(type: string) {
  return SPOT_TYPE_CONFIG[type as keyof typeof SPOT_TYPE_CONFIG]?.color || '#8D99AE'
}

function getFeatureLabel(key: string) {
  const feature = ROUTE_FEATURES.find(f => f.key === key)
  return feature?.label || key
}

const difficultyConfig = computed(() => {
  return DIFFICULTY_CONFIG[props.route.difficulty]
})
</script>

<template>
  <view
    class="bg-card rounded-[12rpx] px-[24rpx] py-[16rpx] transition-all duration-100"
    :class="[
      isSelected ? 'border border-primary shadow-[0_0_12rpx_rgba(46,213,115,0.3)]' : 'border border-transparent',
      // #ifdef H5
      'active:scale-98',
      // #endif
      // #ifndef H5
      'active:scale-98',
      // #endif
    ]"
    @click="handleSelect"
  >
    <!-- 标题行 -->
    <view class="flex justify-between items-center">
      <text class="text-[26rpx] font-600 text-white flex-shrink-1 pr-[16rpx] truncate max-w-[400rpx]">{{ route.name }}</text>
      <wd-button
        type="primary"
        size="small"
        custom-class="min-w-[120rpx] w-[120rpx] h-[80rpx] rounded-[12rpx] flex-shrink-0 active:scale-95"
        @click="handleNavigate"
      >
        <view class="flex items-center justify-center gap-[4rpx]">
          <text class="i-carbon:navigation text-[26rpx]" />
          <text class="text-[26rpx]">导航</text>
        </view>
      </wd-button>
    </view>

    <!-- 基本信息 -->
    <view class="flex items-center gap-[16rpx] mb-[12rpx]">
      <text class="text-[22rpx] text-gray">{{ route.distance }}km</text>
      <text class="text-[22rpx] text-gray">|</text>
      <text class="text-[22rpx] text-gray">{{ route.duration }}分钟</text>
      <view
        class="px-[10rpx] py-[4rpx] rounded-[6rpx] text-[20rpx]"
        :style="{ backgroundColor: difficultyConfig.bgColor, color: difficultyConfig.color }"
      >
        {{ difficultyConfig.label }}
      </view>
    </view>

    <!-- 路线特色 -->
    <view class="flex flex-wrap gap-[8rpx] mb-[12rpx]">
      <view
        v-for="feature in route.features.slice(0, 4)"
        :key="feature"
        class="flex items-center gap-[4rpx] px-[8rpx] py-[4rpx] bg-base rounded-[6rpx]"
      >
        <text class="text-[18rpx] text-gray">{{ getFeatureLabel(feature) }}</text>
      </view>
    </view>

    <!-- 打卡点预览 -->
    <view class="flex gap-[8rpx] overflow-x-auto">
      <view
        v-for="spot in route.spots.slice(0, 5)"
        :key="spot.id"
        class="flex items-center gap-[4rpx] px-[10rpx] py-[6rpx] rounded-[6rpx] flex-shrink-0"
        :style="{ backgroundColor: getSpotTypeColor(spot.type) + '20' }"
      >
        <text class="text-[18rpx]" :style="{ color: getSpotTypeColor(spot.type) }">
          📍
        </text>
        <text class="text-[18rpx]" :style="{ color: getSpotTypeColor(spot.type) }">
          {{ spot.name.length > 6 ? spot.name.slice(0, 6) + '...' : spot.name }}
        </text>
      </view>
      <view v-if="route.spots.length > 5" class="flex items-center px-[8rpx]">
        <text class="text-[18rpx] text-gray">+{{ route.spots.length - 5 }}</text>
      </view>
    </view>
  </view>
</template>
