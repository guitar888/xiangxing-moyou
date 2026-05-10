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
    canvasKey.value++
    await nextTick()
    await generatePoster({
      record: props.record,
      routeName: props.record.routeName,
    })
  }
})

async function handleSave() {
  if (!posterPath.value) return
  await savePoster(posterPath.value)
}

async function handleShare() {
  if (!posterPath.value) return
  await sharePoster(posterPath.value)
}

function handleClose() {
  emit('close')
}
</script>

<template>
  <view v-if="visible" class="fixed inset-0 z-[998] bg-black/80" @click="handleClose" />

  <view v-if="visible && record" class="fixed inset-0 z-[999] flex flex-col items-center justify-center p-[40rpx]">
    <!-- 关键：外层固定为 280x415，canvas 绘制尺寸 560x830，再用 CSS 缩放 0.5 -->
    <view
      class="relative bg-card rounded-[24rpx] p-[8rpx] shadow-lg overflow-hidden"
      style="width: 280px; height: 415px;"
      :key="canvasKey"
    >
      <canvas
        canvas-id="posterCanvas"
        style="width: 560px; height: 830px; transform: scale(0.5); transform-origin: top left;"
      />
      <view v-if="generating" class="absolute inset-0 bg-card/90 flex flex-col items-center justify-center rounded-[24rpx]">
        <wd-loading type="ring" />
        <text class="text-[26rpx] text-gray mt-[16rpx]">正在生成海报...</text>
      </view>
    </view>

    <view class="flex gap-[24rpx] mt-[32rpx]">
      <wd-button
        type="info"
        size="medium"
        custom-class="rounded-[24rpx] px-[48rpx]"
        @click="handleSave"
      >
        保存图片
      </wd-button>
      <wd-button
        type="primary"
        size="medium"
        custom-class="rounded-[24rpx] px-[48rpx]"
        @click="handleShare"
      >
        分享朋友圈
      </wd-button>
    </view>

    <wd-button
      type="info"
      size="small"
      custom-class="mt-[24rpx] rounded-[24rpx]"
      @click="handleClose"
    >
      关闭
    </wd-button>
  </view>
</template>
