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
  close: []
  navigate: [spot: CheckInSpot]
}>()

const spotConfig = computed(() => {
  if (!props.spot) return SPOT_TYPE_CONFIG.scenic
  return SPOT_TYPE_CONFIG[props.spot.type] || SPOT_TYPE_CONFIG.scenic
})

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
  <!-- 遮罩层 -->
  <view
    v-if="visible"
    class="fixed inset-0 z-[998] bg-black/50"
    @click="handleClose"
  />

  <!-- 底部弹出面板 -->
  <view
    v-if="visible && spot"
    class="fixed left-0 right-0 z-[999] bg-card rounded-t-[24rpx] p-[24rpx] safe-area-bottom"
    style="max-height: 60vh;"
  >
    <!-- 拖动条 -->
    <view class="flex justify-center mb-[16rpx]">
      <view class="w-[80rpx] h-[6rpx] bg-gray rounded-[3rpx]" />
    </view>

    <!-- 合规提示 -->
    <view class="bg-warning/10 rounded-[12rpx] px-[16rpx] py-[10rpx] mb-[16rpx] flex items-center gap-[8rpx]">
      <text class="i-carbon:warning text-[24rpx] text-warning flex-shrink-0" />
      <text class="text-[18rpx] text-warning flex-1">目的地信息仅供参考，导航仅作路线参考</text>
    </view>

    <!-- 打卡点信息 -->
    <view class="flex gap-[16rpx]">
      <view
        class="w-[80rpx] h-[80rpx] rounded-[16rpx] flex items-center justify-center flex-shrink-0"
        :style="{ backgroundColor: spotConfig.color + '20' }"
      >
        <text class="text-[40rpx]">{{ spotConfig.label }}</text>
      </view>

      <view class="flex-1">
        <view class="flex justify-between items-start">
          <text class="text-[28rpx] font-600 text-white flex-1 pr-[12rpx]">{{ spot.name }}</text>
          <view
            class="px-[12rpx] py-[6rpx] rounded-[8rpx] text-[20rpx] flex-shrink-0"
            :style="{ backgroundColor: spotConfig.color + '20', color: spotConfig.color }"
          >
            {{ spotConfig.label }}
          </view>
        </view>

        <text class="text-[24rpx] text-gray mt-[8rpx] line-clamp-2">{{ spot.description }}</text>

        <!-- 标签 -->
        <view class="flex flex-wrap gap-[8rpx] mt-[12rpx]">
          <text
            v-for="tag in spot.tags"
            :key="tag"
            class="text-[20rpx] px-[10rpx] py-[6rpx] bg-base rounded-[6rpx] text-gray"
          >
            {{ tag }}
          </text>
        </view>
      </view>
    </view>

    <!-- 导航按钮 -->
    <button
      class="mt-[20rpx] w-full bg-primary text-white rounded-[12rpx] py-[24rpx] text-[28rpx] font-600 active:scale-98 transition-transform"
      @click="handleNavigate"
    >
      一键导航
    </button>

    <!-- 底部合规声明 -->
    <text class="text-[16rpx] text-gray text-center block mt-[12rpx]">
      遵守交通法规，安全文明骑行
    </text>
  </view>
</template>

<style scoped>
.safe-area-bottom {
  padding-bottom: constant(safe-area-inset-bottom);
  padding-bottom: env(safe-area-inset-bottom);
}
</style>
