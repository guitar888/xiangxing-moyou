/**
 * 位置定位 composable
 * 封装腾讯地图定位功能
 */
import type { Coordinate } from '@/types'

export function useLocation() {
  // ================================================
  // 状态
  // ================================================

  /** 当前位置坐标 */
  const currentLocation = ref<Coordinate>({
    latitude: 32.0603,
    longitude: 112.1401,
  })

  /** 定位加载状态 */
  const loading = ref(false)

  /** 定位错误信息 */
  const errorMsg = ref('')

  /** 是否已授权定位 */
  const isAuthorized = ref(false)

  // ================================================
  // 获取当前位置
  // ================================================

  /**
   * 获取当前位置
   */
  function getLocation(): Promise<Coordinate> {
    return new Promise((resolve, reject) => {
      loading.value = true
      errorMsg.value = ''

      uni.getLocation({
        type: 'gcj02',
        success: (res) => {
          currentLocation.value = {
            latitude: res.latitude,
            longitude: res.longitude,
          }
          isAuthorized.value = true
          loading.value = false
          resolve(currentLocation.value)
        },
        fail: (err) => {
          loading.value = false
          isAuthorized.value = false
          errorMsg.value = err.errMsg || '获取位置失败'

          // 如果是授权问题，给予提示
          if (err.errMsg?.includes('auth deny')) {
            errorMsg.value = '定位权限未开启，请在设置中授权'
          }

          // 返回默认位置（襄阳中心）
          resolve(currentLocation.value)
        },
      })
    })
  }

  /**
   * 检查并请求定位权限
   */
  async function checkAndRequestLocation(): Promise<Coordinate> {
    // #ifdef MP-WEIXIN
    try {
      const setting = await uni.getSetting()
      if (!setting.authSetting['scope.userLocation']) {
        await uni.authorize({ scope: 'scope.userLocation' })
      }
    } catch (err) {
      console.error('请求定位权限失败:', err)
    }
    // #endif

    return getLocation()
  }

  /**
   * 打开定位设置页面
   */
  function openLocationSetting() {
    // #ifdef MP-WEIXIN
    uni.openSetting({
      success: (res) => {
        if (res.authSetting['scope.userLocation']) {
          getLocation()
        }
      },
    })
    // #endif

    // #ifndef MP-WEIXIN
    uni.showToast({
      title: '请开启手机定位服务',
      icon: 'none',
    })
    // #endif
  }

  return {
    currentLocation,
    loading,
    errorMsg,
    isAuthorized,
    getLocation,
    checkAndRequestLocation,
    openLocationSetting,
  }
}
