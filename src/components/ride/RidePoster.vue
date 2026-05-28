<script setup lang="ts">
import type { RideRecord } from '@/types'

interface Props {
  record: RideRecord | null
  visible: boolean
}

const props = defineProps<Props>()
const emit = defineEmits<{ close: [] }>()

const { generating, posterPath, generatePoster, savePoster, sharePoster } = usePoster()
const canvasKey = ref(0)

watch(() => props.visible, async (val) => {
  if (val && props.record) {
    console.log('[RidePoster] 接收到 record:', {
      distance: props.record.distance,
      duration: props.record.duration,
      avgSpeed: props.record.avgSpeed,
      pathLength: props.record.path?.length,
      routeName: props.record.routeName,
    })
    canvasKey.value++
    await nextTick()
    await generatePoster({
      record: props.record,
      routeName: props.record.routeName,
      routePath: props.record.path,
      startLocationName: props.record.startLocationName || '起点',
      endLocationName: props.record.endLocationName || '目的地',
    })
  }
})

async function handleSave() {
  if (!posterPath.value)
    return
  await savePoster(posterPath.value)
}

async function handleShare() {
  if (!posterPath.value)
    return
  await sharePoster(posterPath.value)
}

function handleClose() {
  emit('close')
}
</script>

<template>
  <!-- 遮罩层 -->
  <view v-if="visible" class="fixed inset-0 z-[998] bg-black/80" @click="handleClose" />

  <!-- 弹窗内容 -->
  <view v-if="visible && record" class="fixed inset-0 z-[999] flex flex-col items-center justify-center px-[32rpx]">
    <view class="max-w-[320px] w-full flex flex-col items-center">
      <!-- 海报容器：固定尺寸防止缩放影响布局 -->
      <view
        :key="canvasKey"
        class="relative flex-shrink-0 overflow-hidden rounded-[24rpx] bg-card shadow-lg"
        style="width: 280px; height: 415px;"
      >
        <!-- Canvas 使用 2 倍尺寸绘制，CSS 缩放至显示尺寸 -->
        <view class="absolute inset-0 origin-top-left" style="transform: scale(0.5); width: 200%; height: 200%;">
          <canvas
            canvas-id="posterCanvas"
            style="width: 560px; height: 830px;"
          />
        </view>

        <!-- 生成中遮罩 -->
        <view v-if="generating" class="absolute inset-0 flex flex-col items-center justify-center rounded-[24rpx] bg-black/60 backdrop-blur-sm">
          <wd-loading type="ring" />
          <text class="mt-[16rpx] text-[24rpx] text-white">
            正在生成海报...
          </text>
        </view>
      </view>

      <!-- 按钮组：增加间距，防止与海报重叠 -->
      <view class="mt-[48rpx] w-full flex flex-shrink-0 justify-center gap-[16rpx]">
        <wd-button
          type="info"
          size="small"
          custom-class="flex-1 rounded-[24rpx]"
          @click="handleSave"
        >
          保存图片
        </wd-button>
        <wd-button
          type="primary"
          size="small"
          custom-class="flex-1 rounded-[24rpx]"
          @click="handleShare"
        >
          分享朋友圈
        </wd-button>
      </view>

      <wd-button
        type="info"
        size="small"
        custom-class="mt-[24rpx] rounded-[24rpx] flex-shrink-0"
        @click="handleClose"
      >
        关闭
      </wd-button>
    </view>
  </view>
</template>
