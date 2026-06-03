<script setup lang="ts">
import type { RideRoute, SpotType, RouteTag } from '@/types'
import { DIFFICULTY_CONFIG, REGION_CONFIG, SPOT_TYPE_CONFIG, ROUTE_TAG_CONFIG } from '@/types'

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

// 统计打卡点类型
const spotTypeStats = computed(() => {
  const stats: Record<SpotType, number> = {} as Record<SpotType, number>
  props.route.spots?.forEach((spot) => {
    const type = spot.type as SpotType
    stats[type] = (stats[type] || 0) + 1
  })
  return stats
})

// 计算亮点数量
const highlightsCount = computed(() => {
  const total = props.route.spots?.length || 0
  const food = spotTypeStats.value.food || 0
  const coffee = spotTypeStats.value.coffee || 0
  const scenic = spotTypeStats.value.scenic || 0
  const photo = spotTypeStats.value.photo || 0
  const camp = spotTypeStats.value.camp || 0
  const adventure = spotTypeStats.value.adventure || 0

  return {
    total,
    food: food + coffee, // 餐饮类（农家乐 + 咖啡馆）
    scenic: scenic + photo, // 观光类（景点 + 拍照）
    camp,
    adventure,
  }
})

const regionLabel = computed(() => {
  return REGION_CONFIG[props.route.region as keyof typeof REGION_CONFIG]?.label || ''
})

const displaySpots = computed(() => {
  return props.route.spots?.slice(0, 6) || []
})

// 预计时长（格式化）
const formattedDuration = computed(() => {
  const hours = Math.floor(props.route.duration / 60)
  const mins = props.route.duration % 60
  if (hours > 0) {
    return `${hours}小时${mins > 0 ? mins : ''}`
  }
  return `${mins}分钟`
})

// 海拔信息格式化
const elevationInfo = computed(() => {
  if (!props.route.elevation) return null
  return {
    max: `${props.route.elevation.max}m`,
    gain: `+${props.route.elevation.gain}m`,
  }
})

// 集合点信息
const meetupInfo = computed(() => {
  if (!props.route.meetupPoint) return null
  return {
    name: props.route.meetupPoint.name,
    time: props.route.meetupPoint.time,
  }
})

// 路线标签
const routeTags = computed(() => {
  if (!props.route.tags || props.route.tags.length === 0) return []
  return props.route.tags.slice(0, 4).map(tag => ROUTE_TAG_CONFIG[tag])
})
</script>

<template>
  <view
    class="border rounded-[16rpx] bg-card px-[24rpx] py-[20rpx] transition-all duration-100 active:scale-98"
    :class="[
      isSelected ? 'border-primary shadow-[0_0_12rpx_rgba(46,213,115,0.3)]' : 'border-white/5',
    ]"
    @click="handleSelect"
  >
    <!-- 标题行 -->
    <view class="mb-[10rpx] flex items-start justify-between">
      <view class="min-w-0 flex-1 pr-[16rpx]">
        <view class="mb-[8rpx] flex items-center gap-[8rpx]">
          <text class="truncate text-[28rpx] text-white font-700">
            {{ route.name }}
          </text>
          <view
            class="flex-shrink-0 rounded-[6rpx] px-[10rpx] py-[4rpx] text-[16rpx] font-500"
            :style="{ backgroundColor: difficultyConfig.bgColor, color: difficultyConfig.color }"
          >
            {{ difficultyConfig.label }}
          </view>
        </view>
        <view class="flex flex-wrap items-center gap-[12rpx] text-[20rpx] text-gray">
          <view class="flex items-center gap-[4rpx]">
            <text class="i-carbon:distance text-[18rpx]" />
            <text>{{ route.distance }}km</text>
          </view>
          <view class="flex items-center gap-[4rpx]">
            <text class="i-carbon:time text-[18rpx]" />
            <text>{{ formattedDuration }}</text>
          </view>
          <view v-if="elevationInfo" class="flex items-center gap-[4rpx]">
            <text class="i-carbon:earth text-[18rpx]" />
            <text>{{ elevationInfo.max }} / {{ elevationInfo.gain }}</text>
          </view>
        </view>
      </view>
      <wd-button
        type="primary"
        size="small"
        custom-class="w-[160rpx] h-[80rpx] rounded-[12rpx] flex-shrink-0 active:scale-95"
        @click="handleNavigate"
      >
        导航
      </wd-button>
    </view>

    <!-- 集合点信息 -->
    <view v-if="meetupInfo" class="mb-[10rpx] flex items-center gap-[8rpx] rounded-[10rpx] bg-[rgba(51,133,255,0.1)] px-[12rpx] py-[8rpx]">
      <text class="i-carbon:pin text-[20rpx]" :style="{ color: '#3385FF' }" />
      <text class="text-[20rpx] text-white/90">
        {{ meetupInfo.time }} {{ meetupInfo.name }}集合
      </text>
    </view>

    <!-- 路线标签 -->
    <view v-if="routeTags.length > 0" class="mb-[10rpx] flex flex-wrap gap-[8rpx]">
      <view
        v-for="(tag, index) in routeTags"
        :key="index"
        class="inline-flex items-center gap-[4rpx] rounded-[8rpx] px-[10rpx] py-[4rpx]"
        :style="{ backgroundColor: `${tag.color}15`, color: tag.color }"
      >
        <text :class="tag.icon" class="text-[16rpx]" />
        <text class="text-[18rpx]">{{ tag.label }}</text>
      </view>
    </view>

    <!-- 沿途亮点 -->
    <view class="mt-[14rpx] border-t border-white/5 pt-[14rpx]">
      <view class="mb-[10rpx] flex items-center gap-[8rpx]">
        <text class="i-carbon:star text-[18rpx] text-primary" />
        <text class="text-[20rpx] text-white/90 font-600">
          沿途亮点
        </text>
      </view>
      <view class="flex flex-wrap gap-[12rpx]">
        <view
          v-if="highlightsCount.food > 0"
          class="flex items-center gap-[6rpx] rounded-[12rpx] bg-[rgba(255,159,67,0.15)] px-[14rpx] py-[6rpx]"
        >
          <text class="i-carbon:cafe text-[18rpx]" :style="{ color: '#FF9F43' }" />
          <text class="text-[18rpx] font-500" :style="{ color: '#FF9F43' }">
            {{ highlightsCount.food }}家餐饮
          </text>
        </view>
        <view
          v-if="highlightsCount.scenic > 0"
          class="flex items-center gap-[6rpx] rounded-[12rpx] bg-[rgba(46,213,115,0.15)] px-[14rpx] py-[6rpx]"
        >
          <text class="i-carbon:map-marker text-[18rpx]" :style="{ color: '#2ED573' }" />
          <text class="text-[18rpx] font-500" :style="{ color: '#2ED573' }">
            {{ highlightsCount.scenic }}个打卡点
          </text>
        </view>
        <view
          v-if="highlightsCount.camp > 0"
          class="flex items-center gap-[6rpx] rounded-[12rpx] bg-[rgba(116,185,255,0.15)] px-[14rpx] py-[6rpx]"
        >
          <text class="i-carbon:campsite text-[18rpx]" :style="{ color: '#74B9FF' }" />
          <text class="text-[18rpx] font-500" :style="{ color: '#74B9FF' }">
            {{ highlightsCount.camp }}个露营地
          </text>
        </view>
        <view
          v-if="highlightsCount.adventure > 0"
          class="flex items-center gap-[6rpx] rounded-[12rpx] bg-[rgba(255,71,87,0.15)] px-[14rpx] py-[6rpx]"
        >
          <text class="i-carbon:mountain text-[18rpx]" :style="{ color: '#FF4757' }" />
          <text class="text-[18rpx] font-500" :style="{ color: '#FF4757' }">
            {{ highlightsCount.adventure }}处探险
          </text>
        </view>
      </view>
    </view>

    <!-- 核心亮点列表（新增路线特有） -->
    <view v-if="route.highlights && route.highlights.length > 0" class="mt-[12rpx] border-t border-white/5 pt-[12rpx]">
      <view class="mb-[8rpx] text-[18rpx] text-white/90 font-600">
        推荐理由
      </view>
      <view class="space-y-[6rpx]">
        <view v-for="(highlight, index) in route.highlights" :key="index" class="flex items-start gap-[8rpx]">
          <text class="i-carbon:checkmark-outline text-[16rpx] text-primary flex-shrink-0 mt-[4rpx]" />
          <text class="text-[18rpx] text-white/70 flex-1">{{ highlight }}</text>
        </view>
      </view>
    </view>

    <!-- 简介 -->
    <view class="mt-[12rpx] text-[20rpx] text-white/70 leading-[1.6] line-clamp-2">
      {{ route.shortDescription || route.description }}
    </view>

    <!-- 主要打卡点 -->
    <view v-if="displaySpots.length > 0" class="mt-[12rpx] border-t border-white/5 pt-[12rpx]">
      <view class="mb-[8rpx] text-[18rpx] text-gray">
        途经：
      </view>
      <view class="flex flex-wrap gap-[8rpx]">
        <view
          v-for="spot in displaySpots"
          :key="spot.id"
          class="inline-flex items-center gap-[4rpx] rounded-[6rpx] px-[10rpx] py-[4rpx]"
          :style="{ backgroundColor: getSpotTypeConfig(spot.type as SpotType).bgColor }"
        >
          <text :class="getSpotTypeConfig(spot.type as SpotType).icon" class="text-[16rpx]" :style="{ color: getSpotTypeConfig(spot.type as SpotType).color }" />
          <text class="text-[18rpx] line-clamp-1 max-w-[150rpx]" :style="{ color: getSpotTypeConfig(spot.type as SpotType).color }">
            {{ spot.name }}
          </text>
        </view>
      </view>
    </view>
  </view>
</template>
