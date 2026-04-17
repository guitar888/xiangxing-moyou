<script setup lang="ts">
/**
 * 全局页面状态组件
 * 功能：显示全局 loading 和 error 页面
 * 说明：
 * - 监听 usePageStatus 的状态变化，自动显示/隐藏
 * - 使用 GlobalStatus/Loading.vue 和 GlobalStatus/Error.vue 的设计
 */
defineOptions({
  options: {
    virtualHost: true,
  },
})

const {
  loading,
  loadingProgress,
  error,
  errorTitle,
  errorButtonText,
  handleRetry,
} = usePageStatus()
</script>

<template>
  <GlobalStatus-Loading
    :visible="loading"
    :progress="loadingProgress"
    text="加载中..."
  />
  <GlobalStatus-Error
    :visible="error"
    :title="errorTitle"
    :button-text="errorButtonText"
    @retry="handleRetry"
  />
</template>
