<script setup lang="ts">
import type { RideRoute, SpotType, RouteTag } from '@/types'
import { DIFFICULTY_CONFIG, SPOT_TYPE_CONFIG, ROUTE_TAG_CONFIG, REGION_CONFIG } from '@/types'

interface Props {
  modelValue: boolean
  route: RideRoute | null
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: false,
  route: null,
})

const emit = defineEmits<{
  'update:modelValue': [value: boolean]
  close: []
  navigate: [route: RideRoute]
}>()

const visible = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value),
})

function handleClose() {
  emit('update:modelValue', false)
  emit('close')
}

function handleNavigate() {
  if (props.route) {
    emit('navigate', props.route)
  }
}

const difficultyConfig = computed(() => {
  return props.route ? DIFFICULTY_CONFIG[props.route.difficulty] : null
})

// 海拔信息格式化
const elevationInfo = computed(() => {
  if (!props.route?.elevation) return null
  return {
    max: `${props.route.elevation.max}m`,
    gain: `+${props.route.elevation.gain}m`,
    min: `${props.route.elevation.min}m`,
  }
})

// 路线标签
const routeTags = computed(() => {
  if (!props.route?.tags || props.route.tags.length === 0) return []
  return props.route.tags.map(tag => ROUTE_TAG_CONFIG[tag])
})

// 格式化时长
const formattedDuration = computed(() => {
  if (!props.route) return ''
  const hours = Math.floor(props.route.duration / 60)
  const mins = props.route.duration % 60
  if (hours > 0) {
    return `${hours}小时${mins > 0 ? mins : ''}`
  }
  return `${mins}分钟`
})

// 区域标签
const regionLabel = computed(() => {
  if (!props.route?.region) return ''
  return REGION_CONFIG[props.route.region as keyof typeof REGION_CONFIG]?.label || ''
})
</script>

<template>
  <wd-popup
    :model-value="visible"
    position="bottom"
    :close-on-click-modal="true"
    custom-class="rounded-t-[24rpx]"
    @update:model-value="handleClose"
  >
    <view v-if="route" class="max-h-[85vh] overflow-y-auto bg-[#0f0f1a] px-[24rpx] pb-[24rpx] pt-[20rpx]">
      <!-- 关闭指示条 -->
      <view class="mx-auto mb-[16rpx] h-[8rpx] w-[80rpx] rounded-full bg-white/20" @click="handleClose" />

      <!-- 路线标题 -->
      <view class="mb-[16rpx]">
        <view class="mb-[10rpx] flex items-center justify-between">
          <text class="text-[32rpx] text-white font-700">
            {{ route.name }}
          </text>
          <view
            v-if="difficultyConfig"
            class="rounded-[8rpx] px-[12rpx] py-[6rpx] text-[18rpx] font-600"
            :style="{ backgroundColor: difficultyConfig.bgColor, color: difficultyConfig.color }"
          >
            {{ difficultyConfig.label }}
          </view>
        </view>

        <!-- 基础信息 -->
        <view class="flex flex-wrap gap-[16rpx] text-[22rpx] text-white/80">
          <view class="flex items-center gap-[6rpx]">
            <text class="i-carbon:distance text-[20rpx]" />
            <text>{{ route.distance }}km</text>
          </view>
          <view class="flex items-center gap-[6rpx]">
            <text class="i-carbon:time text-[20rpx]" />
            <text>{{ formattedDuration }}</text>
          </view>
          <view v-if="elevationInfo" class="flex items-center gap-[6rpx]">
            <text class="i-carbon:earth text-[20rpx]" />
            <text>最高{{ elevationInfo.max }} / 爬升{{ elevationInfo.gain }}</text>
          </view>
        </view>
      </view>

      <!-- 集合点信息 -->
      <view v-if="route.meetupPoint" class="mb-[16rpx] rounded-[12rpx] bg-[rgba(51,133,255,0.1)] px-[16rpx] py-[12rpx]">
        <view class="mb-[8rpx] flex items-center gap-[8rpx]">
          <text class="i-carbon:pin text-[24rpx]" :style="{ color: '#3385FF' }" />
          <text class="text-[22rpx] text-white font-600">集合点</text>
        </view>
        <view class="text-[20rpx] text-white/80">
          <text>{{ route.meetupPoint.time }} {{ route.meetupPoint.name }}</text>
        </view>
        <view class="mt-[6rpx] text-[18rpx] text-white/60">
          {{ route.meetupPoint.address }}
        </view>
      </view>

      <!-- 路线标签 -->
      <view v-if="routeTags.length > 0" class="mb-[16rpx] flex flex-wrap gap-[8rpx]">
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

      <!-- 路线描述 -->
      <view class="mb-[16rpx] rounded-[12rpx] bg-card px-[16rpx] py-[12rpx]">
        <view class="mb-[8rpx] flex items-center gap-[8rpx]">
          <text class="i-carbon:information text-[20rpx] text-primary" />
          <text class="text-[20rpx] text-white font-600">路线说明</text>
        </view>
        <text class="text-[18rpx] text-white/70 leading-[1.8]">
          {{ route.description }}
        </text>
      </view>

      <!-- 核心亮点 -->
      <view v-if="route.highlights && route.highlights.length > 0" class="mb-[16rpx] rounded-[12rpx] bg-card px-[16rpx] py-[12rpx]">
        <view class="mb-[10rpx] flex items-center gap-[8rpx]">
          <text class="i-carbon:star text-[20rpx] text-primary" />
          <text class="text-[20rpx] text-white font-600">推荐理由</text>
        </view>
        <view class="space-y-[8rpx]">
          <view v-for="(highlight, index) in route.highlights" :key="index" class="flex items-start gap-[8rpx]">
            <text class="i-carbon:checkmark-outline text-[18rpx] text-primary flex-shrink-0 mt-[4rpx]" />
            <text class="text-[18rpx] text-white/70 flex-1">{{ highlight }}</text>
          </view>
        </view>
      </view>

      <!-- 路况信息 -->
      <view v-if="route.roadCondition" class="mb-[16rpx] rounded-[12rpx] bg-card px-[16rpx] py-[12rpx]">
        <view class="mb-[8rpx] flex items-center gap-[8rpx]">
          <text class="i-carbon:road text-[20rpx] text-primary" />
          <text class="text-[20rpx] text-white font-600">路况信息</text>
        </view>
        <text class="text-[18rpx] text-white/70 leading-[1.8]">
          {{ route.roadCondition }}
        </text>
      </view>

      <!-- 最佳季节 -->
      <view v-if="route.bestSeason" class="mb-[16rpx] rounded-[12rpx] bg-card px-[16rpx] py-[12rpx]">
        <view class="mb-[8rpx] flex items-center gap-[8rpx]">
          <text class="i-carbon:calendar text-[20rpx] text-primary" />
          <text class="text-[20rpx] text-white font-600">最佳季节</text>
        </view>
        <text class="text-[18rpx] text-white/70">
          {{ route.bestSeason }}
        </text>
      </view>

      <!-- 路线分段信息（对接 Bmob 用） -->
      <view v-if="route.segments && route.segments.length > 0" class="mb-[16rpx] rounded-[12rpx] bg-card px-[16rpx] py-[12rpx]">
        <view class="mb-[10rpx] flex items-center gap-[8rpx]">
          <text class="i-carbon:road text-[20rpx] text-primary" />
          <text class="text-[20rpx] text-white font-600">路线分段</text>
        </view>
        <view class="space-y-[12rpx]">
          <view v-for="(segment, index) in route.segments" :key="index" class="rounded-[8rpx] bg-white/5 px-[12rpx] py-[10rpx]">
            <view class="mb-[6rpx] flex items-center justify-between">
              <view class="flex items-center gap-[6rpx]">
                <view class="flex h-[24rpx] w-[24rpx] items-center justify-center rounded-full bg-primary text-[14rpx] text-white font-700">
                  {{ index + 1 }}
                </view>
                <text class="text-[18rpx] text-white font-600">{{ segment.name }}</text>
              </view>
              <view class="flex items-center gap-[8rpx] text-[16rpx] text-white/60">
                <text>{{ segment.distance }}km / {{ segment.duration }}分钟</text>
              </view>
            </view>
            <text class="text-[16rpx] text-white/70 leading-[1.6]">{{ segment.description }}</text>
            <view v-if="segment.highlights && segment.highlights.length > 0" class="mt-[8rpx] flex flex-wrap gap-[6rpx]">
              <text v-for="highlight in segment.highlights" :key="highlight" class="text-[14rpx] text-primary">#{{ highlight }}</text>
            </view>
            <view v-if="segment.roadType" class="mt-[6rpx] flex items-center gap-[6rpx]">
              <text class="text-[14rpx] text-white/50">路面：</text>
              <view class="rounded-[4rpx] px-[6rpx] py-[2rpx] text-[14rpx]" :style="{ 
                backgroundColor: segment.roadType === 'paved' ? 'rgba(46, 213, 115, 0.15)' : segment.roadType === 'unpaved' ? 'rgba(255, 71, 87, 0.15)' : 'rgba(255, 122, 0, 0.15)',
                color: segment.roadType === 'paved' ? '#2ED573' : segment.roadType === 'unpaved' ? '#FF4757' : '#FF7A00'
              }">
                {{ segment.roadType === 'paved' ? '铺装路面' : segment.roadType === 'unpaved' ? '非铺装' : '混合路面' }}
              </view>
            </view>
          </view>
        </view>
      </view>

      <!-- 探险区域 -->
      <view v-if="route.adventureAreas && route.adventureAreas.length > 0" class="mb-[16rpx] rounded-[12rpx] bg-card px-[16rpx] py-[12rpx]">
        <view class="mb-[10rpx] flex items-center gap-[8rpx]">
          <text class="i-carbon:mountain text-[20rpx]" :style="{ color: '#FF4757' }" />
          <text class="text-[20rpx] text-white font-600">探险区域</text>
        </view>
        <view v-for="area in route.adventureAreas" :key="area.name" class="mb-[10rpx] rounded-[8rpx] bg-[rgba(255,71,87,0.1)] px-[12rpx] py-[10rpx]">
          <view class="mb-[6rpx] flex items-center justify-between">
            <text class="text-[18rpx] text-white font-600">{{ area.name }}</text>
            <view v-if="area.difficulty" class="rounded-[4rpx] px-[8rpx] py-[2rpx] text-[14rpx]" :style="{ backgroundColor: DIFFICULTY_CONFIG[area.difficulty].bgColor, color: DIFFICULTY_CONFIG[area.difficulty].color }">
              {{ DIFFICULTY_CONFIG[area.difficulty].label }}
            </view>
          </view>
          <text class="text-[16rpx] text-white/70">{{ area.description }}</text>
        </view>
      </view>

      <!-- 沿途打卡点 -->
      <view v-if="route.spots && route.spots.length > 0" class="mb-[20rpx] rounded-[12rpx] bg-card px-[16rpx] py-[12rpx]">
        <view class="mb-[10rpx] flex items-center gap-[8rpx]">
          <text class="i-carbon:location text-[20rpx] text-primary" />
          <text class="text-[20rpx] text-white font-600">沿途打卡点（{{ route.spots.length }}）</text>
        </view>
        <view class="space-y-[10rpx]">
          <view v-for="spot in route.spots" :key="spot.id" class="flex items-start gap-[10rpx] rounded-[8rpx] bg-white/5 px-[12rpx] py-[10rpx]">
            <view class="mt-[4rpx] h-[16rpx] w-[16rpx] rounded-full" :style="{ backgroundColor: SPOT_TYPE_CONFIG[spot.type as SpotType].color }" />
            <view class="flex-1">
              <view class="mb-[4rpx] flex items-center justify-between">
                <text class="text-[18rpx] text-white font-600">{{ spot.name }}</text>
                <text class="text-[14rpx] text-white/50" :style="{ color: SPOT_TYPE_CONFIG[spot.type as SpotType].color }">
                  {{ SPOT_TYPE_CONFIG[spot.type as SpotType].label }}
                </text>
              </view>
              <text class="text-[16rpx] text-white/70 leading-[1.6]">{{ spot.description }}</text>
              <view v-if="spot.tags && spot.tags.length > 0" class="mt-[6rpx] flex flex-wrap gap-[6rpx]">
                <text v-for="tag in spot.tags" :key="tag" class="text-[14rpx] text-white/50">#{{ tag }}</text>
              </view>
            </view>
          </view>
        </view>
      </view>

      <!-- 导航按钮 -->
      <view class="flex items-center justify-center">
        <wd-button
          type="primary"
          size="large"
          custom-class="w-full h-[88rpx] rounded-[20rpx] text-[30rpx] font-600 shadow-lg shadow-primary/30"
          @click="handleNavigate"
        >
          <view class="flex items-center justify-center gap-[8rpx]">
            <text class="i-carbon:map text-[32rpx]" />
            <text>开始导航</text>
          </view>
        </wd-button>
      </view>
    </view>
  </wd-popup>
</template>

<style scoped>
/* 防止内容溢出 */
.max-h-\[85vh\] {
  max-height: 85vh;
}
</style>
