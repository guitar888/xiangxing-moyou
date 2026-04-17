<script setup lang="ts">
/**
 * 骑行海报组件
 */
import type { RideRecord } from '@/types'

interface Props {
  record: RideRecord | null
  visible: boolean
}

const props = defineProps<Props>()

const emit = defineEmits<{
  close: []
}>()

const { generating, posterPath, generatePoster, savePoster, sharePoster } = usePoster()

watch(() => props.visible, async (val) => {
  if (val && props.record) {
    try {
      await generatePoster({
        record: props.record,
        routeName: props.record.routeName,
      })
    } catch (err) {
      console.error('生成海报失败:', err)
    }
  }
})

async function handleSave() {
  if (posterPath.value) {
    try {
      await savePoster(posterPath.value)
    } catch (err) {
      console.error('保存失败:', err)
    }
  }
}

async function handleShare() {
  if (posterPath.value) {
    try {
      await sharePoster(posterPath.value)
    } catch (err) {
      console.error('分享失败:', err)
    }
  }
}

function handleClose() {
  emit('close')
}
</script>

<template>
  <!-- 遮罩 -->
  <view v-if="visible" class="fixed inset-0 z-[998] bg-black/80" @click="handleClose" />

  <!-- 海报弹窗 -->
  <view v-if="visible && record" class="fixed inset-0 z-[999] flex flex-col items-center justify-center p-[40rpx]">
    <!-- 海报预览 -->
    <view class="relative bg-card rounded-[24rpx] p-[8rpx] shadow-lg">
      <!-- 海报画布 -->
      <canvas
        canvas-id="posterCanvas"
        class="w-[560rpx]"
        :style="{ height: '830rpx' }"
      />

      <!-- 生成中 -->
      <view v-if="generating" class="absolute inset-0 bg-card/90 flex flex-col items-center justify-center rounded-[24rpx]">
        <wd-loading type="ring" />
        <text class="text-[26rpx] text-gray mt-[16rpx]">正在生成海报...</text>
      </view>
    </view>

    <!-- 操作按钮 -->
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

    <!-- 关闭 -->
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
