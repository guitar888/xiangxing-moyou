/**
 * 全局页面状态管理 composable
 * 职责：管理全局页面级别的 loading 和 error 状态
 * 特性：
 * - 全局单例，任何页面都可以调用
 * - 支持 loading 进度展示
 * - 支持 error 状态和重试回调
 * - 自动响应到 GlobalPageStatus 组件显示
 */

// ================================================
// 单例状态（模块级别，所有调用共享同一个实例）
// ================================================

/** 页面 loading 状态 */
const loading = ref(false)

/** loading 进度值（0-100） */
const loadingProgress = ref(0)

/** 页面错误状态 */
const error = ref(false)

/** 错误信息标题 */
const errorTitle = ref('加载失败')

/** 重试按钮文字 */
const errorButtonText = ref('重新加载')

/** 重试回调函数 */
let retryCallback: (() => void) | null = null

/** loading 定时器 */
let loadingTimer: ReturnType<typeof setInterval> | null = null

export function usePageStatus() {
  // ================================================
  // Loading 控制
  // ================================================

  /**
   * 开始 loading（带进度动画）
   * @param progress - 初始进度值，默认为 0
   */
  function startLoading(progress = 0) {
    if (loadingTimer) {
      clearInterval(loadingTimer)
    }

    loading.value = true
    error.value = false
    loadingProgress.value = progress

    loadingTimer = setInterval(() => {
      loadingProgress.value = Math.min(loadingProgress.value + Math.random() * 15, 100)
    }, 100)
  }

  /**
   * 设置 loading 进度（用于真实进度展示）
   * @param progress - 进度值（0-100）
   */
  function setLoadingProgress(progress: number) {
    loadingProgress.value = Math.min(progress, 100)
  }

  /**
   * 完成 loading（进度达到100%后隐藏）
   */
  function finishLoading() {
    loadingProgress.value = 100
    if (loadingTimer) {
      clearInterval(loadingTimer)
      loadingTimer = null
    }
    setTimeout(() => {
      loading.value = false
      loadingProgress.value = 0
    }, 300)
  }

  /**
   * 立即隐藏 loading（不等待进度）
   */
  function hideLoading() {
    if (loadingTimer) {
      clearInterval(loadingTimer)
      loadingTimer = null
    }
    loading.value = false
    loadingProgress.value = 0
  }

  // ================================================
  // Error 控制
  // ================================================

  /**
   * 显示错误页面
   * @param options - 错误配置
   */
  function showError(options?: {
    title?: string
    buttonText?: string
    onRetry?: () => void
  }) {
    if (loadingTimer) {
      clearInterval(loadingTimer)
      loadingTimer = null
    }

    loading.value = false
    error.value = true
    errorTitle.value = options?.title || '加载失败'
    errorButtonText.value = options?.buttonText || '重新加载'
    retryCallback = options?.onRetry || null
  }

  /**
   * 隐藏错误页面
   */
  function hideError() {
    error.value = false
    retryCallback = null
  }

  /**
   * 触发重试（由 GlobalPageStatus 组件调用）
   */
  function handleRetry() {
    hideError()
    if (retryCallback) {
      retryCallback()
    }
  }

  // ================================================
  // 清理
  // ================================================

  onUnmounted(() => {
    if (loadingTimer) {
      clearInterval(loadingTimer)
      loadingTimer = null
    }
  })

  // ================================================
  // 导出
  // ================================================

  return {
    loading,
    loadingProgress,
    error,
    errorTitle,
    errorButtonText,
    startLoading,
    setLoadingProgress,
    finishLoading,
    hideLoading,
    showError,
    hideError,
    handleRetry,
  }
}
