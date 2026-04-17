/**
 * 地图导航 composable
 * 职责：封装第三方地图导航逻辑
 * 全端兼容：小程序使用 uni.openLocation，H5 跳转网页版
 */
export interface NavigationOptions {
  latitude: number
  longitude: number
  name?: string
  address?: string
}

export type MapProvider = 'amap' | 'tencent' | 'baidu'

export function useMapNavigation() {
  /**
   * 获取高德地图 URL
   */
  function getAmapUrl(options: NavigationOptions): string {
    const { longitude, latitude, name } = options
    const dest = `${longitude},${latitude},${name || '目标位置'}`
    return `https://uri.amap.com/navigation?to=${dest}&mode=car&src=moyou&callnative=1`
  }

  /**
   * 获取腾讯地图 URL
   */
  function getTencentMapUrl(options: NavigationOptions): string {
    const { latitude, longitude, name, address } = options
    const title = encodeURIComponent(name || '目标位置')
    const desc = encodeURIComponent(address || name || '目标位置')
    return `https://apis.map.qq.com/uri/v1/marker?lat=${latitude}&lng=${longitude}&title=${title}&desc=${desc}&refer=moyou`
  }

  /**
   * 获取百度地图 URL
   */
  function getBaiduMapUrl(options: NavigationOptions): string {
    const { latitude, longitude, name, address } = options
    const title = encodeURIComponent(name || '目标位置')
    const content = encodeURIComponent(address || name || '目标位置')
    return `https://api.map.baidu.com/marker?location=${latitude},${longitude}&title=${title}&content=${content}&output=html&src=moyou`
  }

  /**
   * 显示导航选择器（微信小程序）
   */
  function showNavigationSelector(options: NavigationOptions) {
    uni.showActionSheet({
      itemList: ['高德地图', '腾讯地图', '百度地图', '微信内置导航'],
      success: (res) => {
        switch (res.tapIndex) {
          case 0:
            openAmapNavigation(options)
            break
          case 1:
            openTencentMapNavigation(options)
            break
          case 2:
            openBaiduMapNavigation(options)
            break
          case 3:
            openWechatLocation(options)
            break
        }
      },
      fail: () => {
        uni.showToast({ title: '取消选择', icon: 'none' })
      },
    })
  }

  /**
   * 打开微信内置导航（使用腾讯地图底层）
   */
  function openWechatLocation(options: NavigationOptions): void {
    uni.openLocation({
      latitude: options.latitude,
      longitude: options.longitude,
      name: options.name || '目标位置',
      address: options.address || options.name || '目标位置',
      fail: (err) => {
        if (!err.errMsg?.includes('cancel')) {
          uni.showToast({ title: '打开导航失败', icon: 'none' })
        }
      },
    })
  }

  /**
   * 打开高德地图导航
   */
  function openAmapNavigation(options: NavigationOptions): void {
    // #ifdef MP-WEIXIN
    const url = getAmapUrl(options)
    // 小程序环境：直接打开网页版高德
    window.location.href = url
    // #endif

    // #ifdef H5
    const url = getAmapUrl(options)
    window.open(url, '_blank')
    // #endif
  }

  /**
   * 打开腾讯地图导航
   */
  function openTencentMapNavigation(options: NavigationOptions): void {
    // #ifdef MP-WEIXIN
    const url = getTencentMapUrl(options)
    window.location.href = url
    // #endif

    // #ifdef H5
    const url = getTencentMapUrl(options)
    window.open(url, '_blank')
    // #endif
  }

  /**
   * 打开百度地图导航
   */
  function openBaiduMapNavigation(options: NavigationOptions): void {
    // #ifdef MP-WEIXIN
    const url = getBaiduMapUrl(options)
    window.location.href = url
    // #endif

    // #ifdef H5
    const url = getBaiduMapUrl(options)
    window.open(url, '_blank')
    // #endif
  }

  /**
   * 统一导航入口
   */
  function openMapNavigation(options: NavigationOptions): void {
    // #ifdef MP-WEIXIN
    showNavigationSelector(options)
    // #endif

    // #ifdef H5
    window.open(getAmapUrl(options), '_blank')
    // #endif
  }

  return {
    getAmapUrl,
    getTencentMapUrl,
    getBaiduMapUrl,
    showNavigationSelector,
    openWechatLocation,
    openAmapNavigation,
    openTencentMapNavigation,
    openBaiduMapNavigation,
    openMapNavigation,
  }
}
