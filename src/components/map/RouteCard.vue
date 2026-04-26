<script setup lang="ts">
/**
 * 路线卡片组件
 * 紧凑设计，方便手机浏览
 */
import type { RideRoute, SpotType } from '@/types'
import { DIFFICULTY_CONFIG, SPOT_TYPE_CONFIG, REGION_CONFIG } from '@/types'

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

function getSpotTypeConfig(type: SpotType) {
  return SPOT_TYPE_CONFIG[type] || { label: type, icon: 'i-carbon:location', color: '#8D99AE', bgColor: 'rgba(141, 153, 174, 0.15)' }
}

const difficultyConfig = computed(() => {
  return DIFFICULTY_CONFIG[props.route.difficulty]
})

const spotTypeStats = computed(() => {
  const stats: Record<SpotType, number> = {} as Record<SpotType, number>
  props.route.spots?.forEach((spot) => {
    const type = spot.type as SpotType
    stats[type] = (stats[type] || 0) + 1
  })
  return Object.entries(stats).map(([type, count]) => ({
    type: type as SpotType,
    count,
    ...getSpotTypeConfig(type as SpotType),
  }))
})

const regionLabel = computed(() => {
  return REGION_CONFIG[props.route.region as keyof typeof REGION_CONFIG]?.label || ''
})

const displaySpots = computed(() => {
  return props.route.spots?.slice(0, 9) || []
})
</script>

<template>
  <view
    class="rounded-[12rpx] px-[24rpx] py-[16rpx] transition-all duration-100"
    :class="[
      isSelected ? 'border border-primary shadow-[0_0_12rpx_rgba(46,213,115,0.3)] bg-[#1E1E1E]' : 'border border-transparent bg-[#1E1E1E]',
      'active:scale-98',
    ]"
    @click="handleSelect"
  >
    <!-- 标题行 -->
    <view class="flex justify-between items-center">
      <view class="flex-1 min-w-0">
        <view class="flex items-center gap-[8rpx] mb-[6rpx] flex-wrap">
          <text class="text-[26rpx] font-600 text-white truncate">{{ route.name }}</text>
          <view
            class="px-[10rpx] py-[4rpx] rounded-[6rpx] text-[18rpx] flex-shrink-0"
            :style="{ backgroundColor: difficultyConfig.bgColor, color: difficultyConfig.color }"
          >
            {{ difficultyConfig.label }}
          </view>
        </view>
        <view v-if="regionLabel" class="flex items-center gap-[8rpx]">
          <text class="i-carbon:location text-[22rpx] text-gray" />
          <text class="text-[22rpx] text-gray">{{ regionLabel }}</text>
        </view>
      </view>
      <wd-button
        type="primary"
        size="small"
        custom-class="w-[160rpx] h-[80rpx] rounded-[12rpx] flex-shrink-0 active:scale-95 ml-[16rpx]"
        @click="handleNavigate"
      >
        导航
      </wd-button>
    </view>

    <!-- 基本信息 -->
    <view class="flex items-center gap-[16rpx] mt-[12rpx]">
      <text class="text-[22rpx] text-gray">{{ route.distance }}km</text>
      <text class="text-[22rpx] text-gray">|</text>
      <text class="text-[22rpx] text-gray">{{ route.duration }}分钟</text>
    </view>

    <!-- 打卡点类型标签 -->
    <view v-if="spotTypeStats.length > 0" class="flex flex-wrap gap-[8rpx] mt-[12rpx]">
      <view
        v-for="stat in spotTypeStats"
        :key="stat.type"
        class="flex items-center gap-[4rpx] px-[12rpx] py-[6rpx] rounded-[16rpx]"
        :style="{ backgroundColor: stat.bgColor }"
      >
        <text :class="stat.icon" class="text-[20rpx]" :style="{ color: stat.color }" />
        <text class="text-[20rpx]" :style="{ color: stat.color }">{{ stat.label }}×{{ stat.count }}</text>
      </view>
    </view>

    <!-- 打卡点列表 -->
    <view class="mt-[12rpx]">
      <view
        v-for="spot in displaySpots"
        :key="spot.id"
        class="inline-flex items-center gap-[4rpx] px-[12rpx] py-[6rpx] rounded-[8rpx] mr-[12rpx] mb-[8rpx]"
        :style="{ backgroundColor: getSpotTypeConfig(spot.type as SpotType).bgColor }"
      >
        <text :class="getSpotTypeConfig(spot.type as SpotType).icon" class="text-[18rpx]" :style="{ color: getSpotTypeConfig(spot.type as SpotType).color }" />
        <text class="text-[20rpx]" :style="{ color: getSpotTypeConfig(spot.type as SpotType).color }">{{ spot.name }}</text>
      </view>
    </view>
  </view>
</template>
