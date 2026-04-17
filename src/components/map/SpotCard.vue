<script setup lang="ts">
/**
 * 打卡点卡片组件
 * 点击后显示详情和导航按钮
 */
import type { CheckInSpot } from '@/types'
import { SPOT_TYPE_CONFIG } from '@/types'

interface Props {
  spot: CheckInSpot
  compact?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  compact: false,
})

const emit = defineEmits<{
  navigate: [spot: CheckInSpot]
  select: [spot: CheckInSpot]
}>()

const { navigateToSpot } = useNavigation()

const spotConfig = computed(() => {
  return SPOT_TYPE_CONFIG[props.spot.type] || SPOT_TYPE_CONFIG.scenic
})

function handleNavigate(e: Event) {
  e.stopPropagation()
  emit('navigate', props.spot)
}

function handleSelect() {
  emit('select', props.spot)
}

function getTagLabel(tag: string) {
  return tag
}
</script>

<template>
  <view
    class="bg-card rounded-[12rpx] p-[16rpx] transition-all duration-100 active:scale-98"
    @click="handleSelect"
  >
    <!-- 紧凑模式 -->
    <template v-if="compact">
      <view class="flex items-center gap-[8rpx]">
        <text class="text-[24rpx]" :style="{ color: spotConfig.color }">📍</text>
        <text class="text-[24rpx] text-white flex-1">{{ spot.name }}</text>
        <button
          class="bg-primary text-white rounded-[6rpx] px-[16rpx] py-[6rpx] text-[20rpx] active:scale-95"
          @click="handleNavigate"
        >
          导航
        </button>
      </view>
    </template>

    <!-- 完整模式 -->
    <template v-else>
      <view class="flex items-start gap-[12rpx]">
        <view
          class="w-[64rpx] h-[64rpx] rounded-[12rpx] flex items-center justify-center flex-shrink-0"
          :style="{ backgroundColor: spotConfig.color + '20' }"
        >
          <text class="text-[32rpx]">{{ spotConfig.label }}</text>
        </view>

        <view class="flex-1 min-w-0">
          <view class="flex justify-between items-start">
            <text class="text-[26rpx] font-600 text-white">{{ spot.name }}</text>
            <view
              class="px-[10rpx] py-[4rpx] rounded-[6rpx] text-[18rpx]"
              :style="{ backgroundColor: spotConfig.color + '20', color: spotConfig.color }"
            >
              {{ spotConfig.label }}
            </view>
          </view>

          <text class="text-[22rpx] text-gray mt-[8rpx] line-clamp-2">{{ spot.description }}</text>

          <view class="flex flex-wrap gap-[8rpx] mt-[10rpx]">
            <text
              v-for="tag in spot.tags.slice(0, 3)"
              :key="tag"
              class="text-[18rpx] px-[8rpx] py-[4rpx] bg-base rounded-[4rpx] text-gray"
            >
              {{ tag }}
            </text>
          </view>

          <button
            class="mt-[12rpx] w-full bg-primary text-white rounded-[8rpx] py-[16rpx] text-[26rpx] font-600 active:scale-95"
            @click="handleNavigate"
          >
            一键导航
          </button>
        </view>
      </view>
    </template>
  </view>
</template>
