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
   * 获取高德地图 Schema URL
   */
  function getAmapSchemaUrl(options: NavigationOptions): string {
    const { latitude, longitude, name } = options
    return `amapuri://route/plan?sourceApplication=moyou&dname=${encodeURIComponent(name || '目标位置')}&dlat=${latitude}&dlon=${longitude}&dev=0&t=0`
  }

  /**
   * 获取腾讯地图 Schema URL
   */
  function getTencentMapSchemaUrl(options: NavigationOptions): string {
    const { latitude, longitude, name } = options
    return `qqmap://map/routeplan?type=drive&from=我的位置&fromcoord=CurrentLocation&to=${encodeURIComponent(name || '目标位置')}&tocoord=${latitude},${longitude}&referer=moyou`
  }

  /**
   * 获取百度地图 Schema URL
   */
  function getBaiduMapSchemaUrl(options: NavigationOptions): string {
    const { latitude, longitude, name } = options
    return `baidumap://map/direction?origin=我的位置&destination=name:${encodeURIComponent(name || '目标位置')}|latlng:${latitude},${longitude}&mode=driving&coord_type=wgs84`
  }

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
    const schemaUrl = getAmapSchemaUrl(options)
    // 尝试打开高德地图
    uni.getSystemInfo({
      success: (sysInfo) => {
        if (sysInfo.platform === 'ios') {
          // iOS 直接使用 schema URL
          uni.showToast({ title: '正在打开高德地图...', icon: 'none' })
          setTimeout(() => {
            window.location.href = schemaUrl
          }, 500)
        } else {
          // Android 使用 uni.openLocation
          uni.openLocation({
            latitude: options.latitude,
            longitude: options.longitude,
            name: options.name || '目标位置',
            address: options.address || options.name || '目标位置',
            success: () => {
              console.log('打开地图成功')
            },
            fail: (err) => {
              console.error('打开地图失败:', err)
              uni.showToast({ title: '打开地图失败', icon: 'none' })
            }
          })
        }
      },
      fail: (err) => {
        console.error('获取系统信息失败:', err)
        uni.showToast({ title: '打开导航失败', icon: 'none' })
      }
    })
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
    const schemaUrl = getTencentMapSchemaUrl(options)
    // 尝试打开腾讯地图
    uni.getSystemInfo({
      success: (sysInfo) => {
        if (sysInfo.platform === 'ios') {
          // iOS 直接使用 schema URL
          uni.showToast({ title: '正在打开腾讯地图...', icon: 'none' })
          setTimeout(() => {
            window.location.href = schemaUrl
          }, 500)
        } else {
          // Android 使用 uni.openLocation
          uni.openLocation({
            latitude: options.latitude,
            longitude: options.longitude,
            name: options.name || '目标位置',
            address: options.address || options.name || '目标位置',
            success: () => {
              console.log('打开地图成功')
            },
            fail: (err) => {
              console.error('打开地图失败:', err)
              uni.showToast({ title: '打开地图失败', icon: 'none' })
            }
          })
        }
      },
      fail: (err) => {
        console.error('获取系统信息失败:', err)
        uni.showToast({ title: '打开导航失败', icon: 'none' })
      }
    })
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
    const schemaUrl = getBaiduMapSchemaUrl(options)
    // 尝试打开百度地图
    uni.getSystemInfo({
      success: (sysInfo) => {
        if (sysInfo.platform === 'ios') {
          // iOS 直接使用 schema URL
          uni.showToast({ title: '正在打开百度地图...', icon: 'none' })
          setTimeout(() => {
            window.location.href = schemaUrl
          }, 500)
        } else {
          // Android 使用 uni.openLocation
          uni.openLocation({
            latitude: options.latitude,
            longitude: options.longitude,
            name: options.name || '目标位置',
            address: options.address || options.name || '目标位置',
            success: () => {
              console.log('打开地图成功')
            },
            fail: (err) => {
              console.error('打开地图失败:', err)
              uni.showToast({ title: '打开地图失败', icon: 'none' })
            }
          })
        }
      },
      fail: (err) => {
        console.error('获取系统信息失败:', err)
        uni.showToast({ title: '打开导航失败', icon: 'none' })
      }
    })
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
