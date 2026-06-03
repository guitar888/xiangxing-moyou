/**
 * 地图导航 composable
 * 职责：封装第三方地图导航逻辑
 * 全端兼容：小程序使用 uni.openLocation，H5 跳转网页版
 * 无需注册 API Key，完全免费
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
   * 获取高德地图 Web URL
   */
  function getAmapUrl(options: NavigationOptions): string {
    const { longitude, latitude, name } = options
    const dest = `${longitude},${latitude},${name || '目标位置'}`
    return `https://uri.amap.com/navigation?to=${dest}&mode=car&src=moyou&callnative=1`
  }

  /**
   * 获取腾讯地图 Web URL
   */
  function getTencentMapUrl(options: NavigationOptions): string {
    const { latitude, longitude, name, address } = options
    const title = encodeURIComponent(name || '目标位置')
    const desc = encodeURIComponent(address || name || '目标位置')
    return `https://apis.map.qq.com/uri/v1/marker?lat=${latitude}&lng=${longitude}&title=${title}&desc=${desc}&refer=moyou`
  }

  /**
   * 获取百度地图 Web URL
   */
  function getBaiduMapUrl(options: NavigationOptions): string {
    const { latitude, longitude, name, address } = options
    const title = encodeURIComponent(name || '目标位置')
    const content = encodeURIComponent(address || name || '目标位置')
    return `https://api.map.baidu.com/marker?location=${latitude},${longitude}&title=${title}&content=${content}&output=html&src=moyou`
  }

  /**
   * 显示导航选择器（微信小程序）
   * 注：微信小程序无法直接打开第三方地图 APP
   * 统一使用 uni.openLocation，用户点击导航后会自动调用手机安装的地图 APP
   */
  function showNavigationSelector(options: NavigationOptions) {
    uni.showActionSheet({
      itemList: ['腾讯地图', '微信内置导航'],
      success: (res) => {
        // 微信小程序统一使用 uni.openLocation
        // 微信会自动根据用户手机安装的地图 APP 提供导航选项
        openWechatLocation(options)
      },
      fail: () => {
        uni.showToast({ title: '取消选择', icon: 'none' })
      },
    })
  }

  /**
   * 打开微信内置导航（推荐）
   * 微信小程序：使用 uni.openLocation，微信会自动调用腾讯地图
   * 用户点击"到这去"后，可以选择使用高德/百度/腾讯等地图 APP 导航
   */
  function openWechatLocation(options: NavigationOptions): void {
    uni.openLocation({
      latitude: options.latitude,
      longitude: options.longitude,
      name: options.name || '目标位置',
      address: options.address || options.name || '目标位置',
      success: () => {
        console.log('打开地图成功')
      },
      fail: (err) => {
        if (!err.errMsg?.includes('cancel')) {
          console.error('打开地图失败:', err)
          uni.showToast({ title: '打开导航失败', icon: 'none' })
        }
      },
    })
  }

  /**
   * 打开高德地图导航（H5 专用）
   */
  function openAmapNavigation(options: NavigationOptions): void {
    // #ifdef H5
    const url = getAmapUrl(options)
    window.open(url, '_blank')
    // #endif
  }

  /**
   * 打开腾讯地图导航（H5 专用）
   */
  function openTencentMapNavigation(options: NavigationOptions): void {
    // #ifdef H5
    const url = getTencentMapUrl(options)
    window.open(url, '_blank')
    // #endif
  }

  /**
   * 打开百度地图导航（H5 专用）
   */
  function openBaiduMapNavigation(options: NavigationOptions): void {
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
    // 微信小程序：直接使用 uni.openLocation
    // 微信会自动调用腾讯地图，用户可以选择导航方式
    openWechatLocation(options)
    // #endif

    // #ifdef H5
    // H5：弹出选择框让用户选择地图
    uni.showActionSheet({
      itemList: ['高德地图', '腾讯地图', '百度地图'],
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
        }
      },
    })
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
