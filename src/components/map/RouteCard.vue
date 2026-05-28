<script setup lang="ts">
import type { RideRoute, SpotType } from '@/types'
import { DIFFICULTY_CONFIG, REGION_CONFIG, SPOT_TYPE_CONFIG } from '@/types'

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
    class="border rounded-[12rpx] bg-card px-[24rpx] py-[16rpx] transition-all duration-100 active:scale-98"
    :class="[
      isSelected ? 'border-primary shadow-[0_0_12rpx_rgba(46,213,115,0.3)]' : 'border-transparent',
    ]"
    @click="handleSelect"
  >
    <!-- 标题行 -->
    <view class="flex items-center justify-between">
      <view class="min-w-0 flex-1">
        <view class="mb-[6rpx] flex flex-wrap items-center gap-[8rpx]">
          <text class="truncate text-[26rpx] text-white font-600">
            {{ route.name }}
          </text>
          <view
            class="flex-shrink-0 rounded-[6rpx] px-[10rpx] py-[4rpx] text-[18rpx]"
            :style="{ backgroundColor: difficultyConfig.bgColor, color: difficultyConfig.color }"
          >
            {{ difficultyConfig.label }}
          </view>
        </view>
        <view v-if="regionLabel" class="flex items-center gap-[8rpx]">
          <text class="i-carbon:location text-[22rpx] text-gray" />
          <text class="text-[22rpx] text-gray">
            {{ regionLabel }}
          </text>
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
    <view class="mt-[12rpx] flex items-center gap-[16rpx]">
      <text class="text-[22rpx] text-gray">
        {{ route.distance }}km
      </text>
      <text class="text-[22rpx] text-gray">
        |
      </text>
      <text class="text-[22rpx] text-gray">
        {{ route.duration }}分钟
      </text>
    </view>

    <!-- 打卡点类型标签 -->
    <view v-if="spotTypeStats.length > 0" class="mt-[12rpx] flex flex-wrap gap-[8rpx]">
      <view
        v-for="stat in spotTypeStats"
        :key="stat.type"
        class="flex items-center gap-[4rpx] rounded-[16rpx] px-[12rpx] py-[6rpx]"
        :style="{ backgroundColor: stat.bgColor }"
      >
        <text :class="stat.icon" class="text-[20rpx]" :style="{ color: stat.color }" />
        <text class="text-[20rpx]" :style="{ color: stat.color }">
          {{ stat.label }}×{{ stat.count }}
        </text>
      </view>
    </view>

    <!-- 打卡点列表 -->
    <view class="mt-[12rpx]">
      <view
        v-for="spot in displaySpots"
        :key="spot.id"
        class="mb-[8rpx] mr-[12rpx] inline-flex items-center gap-[4rpx] rounded-[8rpx] px-[12rpx] py-[6rpx]"
        :style="{ backgroundColor: getSpotTypeConfig(spot.type as SpotType).bgColor }"
      >
        <text :class="getSpotTypeConfig(spot.type as SpotType).icon" class="text-[18rpx]" :style="{ color: getSpotTypeConfig(spot.type as SpotType).color }" />
        <text class="text-[20rpx]" :style="{ color: getSpotTypeConfig(spot.type as SpotType).color }">
          {{ spot.name }}
        </text>
      </view>
    </view>
  </view>
</template>
