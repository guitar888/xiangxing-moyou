/**
 * 数字滚动动画 composable
 * 功能：将数字从 0 滚动到目标值
 * 平台差异：
 * - H5：使用 requestAnimationFrame 实现流畅动画
 * - 非 H5（小程序）：直接显示最终值，跳过动画
 */
export function useAnimateNumber(initialValue: number = 0) {
  const display = ref(initialValue)

  let animFrameId: number | null = null

  /**
   * 启动数字动画
   * @param targetValue - 目标数值
   */
  function animate(targetValue: number) {
    // 停止之前的动画
    if (animFrameId) {
      cancelAnimationFrame(animFrameId)
      animFrameId = null
    }

    // #ifdef H5
    // H5 平台：使用 requestAnimationFrame 动画
    display.value = 0
    const duration = 1500
    const start = Date.now()

    function step() {
      const elapsed = Date.now() - start
      const progress = Math.min(elapsed / duration, 1)
      display.value = Math.floor(targetValue * progress)

      if (progress < 1) {
        animFrameId = requestAnimationFrame(step)
      }
    }

    step()
    // #endif

    // #ifndef H5
    // 非 H5 平台（小程序）：直接显示最终值
    display.value = targetValue
    // #endif
  }

  /**
   * 停止动画
   */
  function stop() {
    if (animFrameId) {
      cancelAnimationFrame(animFrameId)
      animFrameId = null
    }
  }

  onUnmounted(() => {
    stop()
  })

  return {
    display,
    animate,
    stop,
  }
}
