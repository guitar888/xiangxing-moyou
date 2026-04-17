export function useSystemInfo() {
  const statusBarHeight = ref(0)

  function getSystemInfo() {
    try {
      const windowInfo = uni.getWindowInfo()
      statusBarHeight.value = windowInfo.statusBarHeight || 20
    } catch (e) {
      const systemInfo = uni.getSystemInfoSync()
      statusBarHeight.value = systemInfo.statusBarHeight || 20
    }
  }

  onMounted(() => {
    getSystemInfo()
  })

  return {
    statusBarHeight,
    getSystemInfo,
  }
}
