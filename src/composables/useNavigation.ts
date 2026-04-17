/**
 * 导航 composable
 * 封装腾讯地图导航功能
 */
import type { Coordinate } from '@/types'

export function useNavigation() {
  // ================================================
  // 状态
  // ================================================

  /** 导航加载状态 */
  const loading = ref(false)

  /** 错误信息 */
  const errorMsg = ref('')

  // ================================================
  // 导航方法
  // ================================================

  /**
   * 一键导航到指定位置
   * @param destination 目标坐标
   * @param name 目标名称（可选，用于显示）
   */
  function navigateTo(destination: Coordinate, name?: string) {
    loading.value = true
    errorMsg.value = ''

    const destinationName = name || '目的地'

    // #ifdef MP-WEIXIN
    // 微信小程序：使用微信内置地图导航
    uni.openLocation({
      latitude: destination.latitude,
      longitude: destination.longitude,
      name: destinationName,
      address: destinationName,
      success: () => {
        loading.value = false
      },
      fail: (err) => {
        loading.value = false
        errorMsg.value = '打开地图失败'
        console.error('导航失败:', err)
        uni.showToast({
          title: '打开地图失败',
          icon: 'none',
        })
      },
    })
    // #endif

    // #ifdef H5
    // H5：使用腾讯地图 web API 打开网页版地图
    const url = `https://apis.map.qq.com/tools/routeplan/?epointlat=${destination.latitude}&epointlng=${destination.longitude}&ename=${encodeURIComponent(destinationName)}&referer=襄行摩友`
    // #ifdef MP-WEIXIN
    // #endif
    window.location.href = url
    loading.value = false
    // #endif
  }

  /**
   * 导航到打卡点
   * @param spot 打卡点对象
   */
  function navigateToSpot(spot: { coordinates: Coordinate; name: string }) {
    navigateTo(spot.coordinates, spot.name)
  }

  /**
   * 在地图中显示位置
   * @param mapContext 地图上下文
   * @param coordinate 坐标
   */
  function moveToLocation(mapContext: any, coordinate: Coordinate) {
    mapContext?.moveToLocation({
      latitude: coordinate.latitude,
      longitude: coordinate.longitude,
    })
  }

  return {
    loading,
    errorMsg,
    navigateTo,
    navigateToSpot,
    moveToLocation,
  }
}
