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
  compact: false
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
    class="rounded-[12rpx] bg-card p-[16rpx] transition-all duration-100 active:scale-98"
    @click="handleSelect"
  >
    <!-- 紧凑模式 -->
    <template v-if="compact">
      <view class="flex items-center gap-[8rpx]">
        <text class="text-[24rpx]" :style="{ color: spotConfig.color }">
          📍
        </text>
        <text class="flex-1 text-[24rpx] text-white">
          {{ spot.name }}
        </text>
        <button
          class="rounded-[6rpx] bg-primary px-[16rpx] py-[6rpx] text-[20rpx] text-white active:scale-95"
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
          class="h-[64rpx] w-[64rpx] flex flex-shrink-0 items-center justify-center rounded-[12rpx]"
          :style="{ backgroundColor: `${spotConfig.color}20` }"
        >
          <text class="text-[32rpx]">
            {{ spotConfig.label }}
          </text>
        </view>

        <view class="min-w-0 flex-1">
          <view class="flex items-start justify-between">
            <text class="text-[26rpx] text-white font-600">
              {{ spot.name }}
            </text>
            <view
              class="rounded-[6rpx] px-[10rpx] py-[4rpx] text-[18rpx]"
              :style="{ backgroundColor: `${spotConfig.color}20`, color: spotConfig.color }"
            >
              {{ spotConfig.label }}
            </view>
          </view>

          <text class="line-clamp-2 mt-[8rpx] text-[22rpx] text-gray">
            {{ spot.description }}
          </text>

          <view class="mt-[10rpx] flex flex-wrap gap-[8rpx]">
            <text
              v-for="tag in spot.tags.slice(0, 3)"
              :key="tag"
              class="rounded-[4rpx] bg-base px-[8rpx] py-[4rpx] text-[18rpx] text-gray"
            >
              {{ tag }}
            </text>
          </view>

          <button
            class="mt-[12rpx] w-full rounded-[8rpx] bg-primary py-[16rpx] text-[26rpx] text-white font-600 active:scale-95"
            @click="handleNavigate"
          >
            一键导航
          </button>
        </view>
      </view>
    </template>
  </view>
</template>
