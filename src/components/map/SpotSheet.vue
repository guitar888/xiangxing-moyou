<script setup lang="ts">
/**
 * 打卡点底部弹出面板
 * 点击地图标记或路线内打卡点时显示
 */
import type { CheckInSpot } from '@/types'
import { SPOT_TYPE_CONFIG } from '@/types'

interface Props {
  visible: boolean
  spot: CheckInSpot | null
}

const props = defineProps<Props>()

const emit = defineEmits<{
  'close': []
  'navigate': [spot: CheckInSpot]
  'update:visible': [value: boolean]
}>()

// 本地visible状态
const visible = ref(props.visible)

// 监听props.visible变化
watch(() => props.visible, (newValue) => {
  visible.value = newValue
})

// 监听本地visible变化
watch(visible, (newValue) => {
  if (newValue === false) {
    emit('close')
  }
})

function hexToRgba(hex: string | undefined, alpha: number): string {
  if (!hex || typeof hex !== 'string' || !hex.startsWith('#') || hex.length < 7) {
    return `rgba(141, 153, 174, ${alpha})`
  }
  try {
    const r = Number.parseInt(hex.slice(1, 3), 16)
    const g = Number.parseInt(hex.slice(3, 5), 16)
    const b = Number.parseInt(hex.slice(5, 7), 16)
    if (isNaN(r) || isNaN(g) || isNaN(b)) {
      return `rgba(141, 153, 174, ${alpha})`
    }
    return `rgba(${r}, ${g}, ${b}, ${alpha})`
  }
  catch {
    return `rgba(141, 153, 174, ${alpha})`
  }
}

const spotConfig = computed(() => {
  if (!props.spot)
    return SPOT_TYPE_CONFIG.scenic
  return SPOT_TYPE_CONFIG[props.spot.type as keyof typeof SPOT_TYPE_CONFIG] || SPOT_TYPE_CONFIG.scenic
})

const spotBgColor = computed(() => hexToRgba(spotConfig.value.color, 0.12))
const spotBadgeBgColor = computed(() => hexToRgba(spotConfig.value.color, 0.12))

function handleNavigate() {
  if (props.spot) {
    emit('navigate', props.spot)
  }
}

function handleClose() {
  emit('close')
}
</script>

<template>
  <wd-root-portal>
    <wd-popup
      v-model="visible"
      position="bottom"
      custom-class="rounded-t-[24rpx] overflow-hidden"
      :close-on-click-modal="true"
      :z-index="9999"
      :safe-area-inset-bottom="true"
      lazy-render
    >
      <view class="bg-[#1E1E1E] p-[24rpx]" style="max-height: 60vh;">
        <!-- 拖动条 -->
        <view class="mb-[16rpx] flex justify-center">
          <view class="h-[6rpx] w-[80rpx] rounded-[3rpx]" style="background-color: #8D99AE;" />
        </view>

        <!-- 合规提示 -->
        <view v-if="spot" class="mb-[16rpx] flex items-center gap-[8rpx] rounded-[12rpx] px-[16rpx] py-[10rpx]" style="background-color: rgba(255, 122, 0, 0.1);">
          <text class="i-carbon:warning flex-shrink-0 text-[24rpx]" style="color: #FF7A00;" />
          <text class="flex-1 text-[18rpx]" style="color: #FF7A00;">
            目的地信息仅供参考，导航仅作路线参考
          </text>
        </view>

        <!-- 打卡点信息 -->
        <view v-if="spot" class="flex gap-[16rpx]">
          <view
            class="h-[80rpx] w-[80rpx] flex flex-shrink-0 items-center justify-center rounded-[16rpx]"
            :style="{ backgroundColor: spotBgColor }"
          >
            <text :class="spotConfig.icon" class="text-[40rpx]" :style="{ color: spotConfig.color }" />
          </view>

          <view class="flex-1">
            <view class="flex items-start justify-between">
              <text class="flex-1 pr-[12rpx] text-[28rpx] text-white font-600">
                {{ spot.name }}
              </text>
              <view
                class="flex-shrink-0 rounded-[8rpx] px-[12rpx] py-[6rpx] text-[20rpx]"
                :style="{ backgroundColor: spotBadgeBgColor, color: spotConfig.color }"
              >
                {{ spotConfig.label }}
              </view>
            </view>

            <text class="line-clamp-2 mt-[8rpx] text-[24rpx]" style="color: #8D99AE;">
              {{ spot.description }}
            </text>

            <!-- 标签 -->
            <view class="mt-[12rpx] flex flex-wrap gap-[8rpx]">
              <text
                v-for="tag in spot.tags"
                :key="tag"
                class="rounded-[6rpx] px-[10rpx] py-[6rpx] text-[20rpx]"
                style="background-color: #121212; color: #8D99AE;"
              >
                {{ tag }}
              </text>
            </view>
          </view>
        </view>

        <!-- 导航按钮 -->
        <button
          v-if="spot"
          class="mt-[20rpx] w-full rounded-[12rpx] py-[24rpx] text-[28rpx] font-600 transition-transform active:scale-98"
          style="background-color: #2ED573; color: #FFFFFF;"
          @click="handleNavigate"
        >
          一键导航
        </button>

        <!-- 底部合规声明 -->
        <text v-if="spot" class="mt-[12rpx] block text-center text-[16rpx]" style="color: #8D99AE;">
          遵守交通法规，安全文明骑行
        </text>
      </view>
    </wd-popup>
  </wd-root-portal>
</template>
