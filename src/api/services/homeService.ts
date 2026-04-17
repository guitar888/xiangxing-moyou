import bmob from '@/utils/bmob'
import type { BannerData, QuickEntry, RideData, ActivityItem } from '@/types'

// 首页数据 API 服务
export class HomeService {
  // 获取轮播图数据
  static async getBanners(): Promise<BannerData[]> {
    try {
      // 实际项目中使用 Bmob API
      // const result = await bmob.request<BannerData[]>('/classes/Banner')
      // return result.results

      // 模拟数据
      return [
        {
          id: '1',
          title: '唐城追焦夜骑',
          desc: '每周六晚 唐城城墙下 骑行&摄影活动',
          tag: '热门',
          url: '/pages/activity/activity',
        },
        {
          id: '2',
          title: '古城环线晨骑',
          desc: '襄阳古城墙环线，全程约25公里',
          tag: '周末',
          url: '/pages/activity/activity',
        },
        {
          id: '3',
          title: '汉江沿岸骑行',
          desc: '沿汉江绿道，尽享江风拂面',
          tag: '推荐',
          url: '/pages/map/map',
        },
        {
          id: '4',
          title: '隆中至武当山',
          desc: '襄阳至武当山摩旅路线，约180公里',
          tag: '长途',
          url: '/pages/map/map',
        },
      ]
    } catch (error) {
      console.error('Failed to get banners:', error)
      // 返回默认数据作为降级方案
      return []
    }
  }

  // 获取快捷入口数据
  static async getQuickEntries(): Promise<QuickEntry[]> {
    try {
      // 实际项目中使用 Bmob API
      // const result = await bmob.request<QuickEntry[]>('/classes/QuickEntry')
      // return result.results

      // 模拟数据
      return [
        {
          id: 'map',
          name: '骑行地图',
          subname: '襄阳本地路线',
          icon: 'i-carbon:map',
          highlight: true,
          path: '/pages/map/map',
          isTab: true,
        },
        {
          id: 'data',
          name: '骑行数据',
          subname: '我的骑行轨迹',
          icon: 'chart',
          highlight: true,
          path: '/pages/data/data',
          isTab: true,
        },
        {
          id: 'activity',
          name: '活动接龙',
          subname: '本地活动报名',
          icon: 'calendar',
          path: '/pages/activity/activity',
          isTab: true,
        },
        {
          id: 'weather',
          name: '天气查询',
          subname: '出行天气参考',
          icon: 'i-carbon:cloud',
          path: '/subPages/weather/weather',
        },
        {
          id: 'traffic',
          name: '禁摩限行',
          subname: '安全出行指南',
          icon: 'warning',
          path: '/subPages/traffic/traffic',
        },
        {
          id: 'shop',
          name: '口碑店铺',
          subname: '摩友推荐商家',
          icon: 'shop',
          path: '/subPages/shop/shop',
        },
      ]
    } catch (error) {
      console.error('Failed to get quick entries:', error)
      return []
    }
  }

  // 获取骑行数据
  static async getRideData(): Promise<RideData> {
    try {
      // 实际项目中使用 Bmob API
      // const result = await bmob.request<RideData>('/classes/RideData')
      // return result

      // 模拟数据
      return {
        totalDistance: 1286,
        totalDays: 45,
        totalRoutes: 12,
      }
    } catch (error) {
      console.error('Failed to get ride data:', error)
      // 返回默认数据
      return {
        totalDistance: 0,
        totalDays: 0,
        totalRoutes: 0,
      }
    }
  }

  // 获取活动列表
  static async getActivities(): Promise<ActivityItem[]> {
    try {
      // 实际项目中使用 Bmob API
      // const result = await bmob.request<ActivityItem[]>('/classes/Activity')
      // return result.results

      // 模拟数据
      return [
        {
          id: '1',
          title: '唐城追焦夜骑',
          date: '4月20日',
          time: '19:00',
          info: '穿越盛唐夜景，襄阳唐城夜间骑行&摄影活动',
          tags: ['夜骑', '摄影'],
          image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=襄阳唐城夜景%20摩托车骑行%20古建筑灯光&image_size=square_hd',
          isUpcoming: true,
          countdownText: '距开始 3天',
        },
        {
          id: '2',
          title: '古城环线晨骑',
          date: '4月27日',
          time: '06:30',
          info: '襄阳古城墙环线，全程约25公里',
          tags: ['晨骑', '免费'],
          image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=襄阳古城墙%20摩托车%20清晨骑行&image_size=square_hd',
          isUpcoming: true,
          countdownText: '距开始 10天',
        },
        {
          id: '3',
          title: '摩友交流会',
          date: '5月1日',
          time: '14:00',
          info: '襄阳摩友俱乐部月度聚会',
          tags: ['聚会', '交流'],
          image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=摩托车俱乐部聚会%20摩友交流&image_size=square_hd',
          isUpcoming: false,
        },
        {
          id: '4',
          title: '汉江沿岸骑行',
          date: '5月3日',
          time: '08:00',
          info: '沿汉江绿道，尽享江风拂面',
          tags: ['绿道', '休闲'],
          image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=汉江沿岸%20摩托车骑行%20江景&image_size=square_hd',
          isUpcoming: false,
        },
      ]
    } catch (error) {
      console.error('Failed to get activities:', error)
      return []
    }
  }

  // 切换城市
  static async switchCity(city: string): Promise<boolean> {
    try {
      // 实际项目中可以记录用户城市偏好到 Bmob
      // await bmob.request('/classes/UserPreference', 'POST', { city })
      return true
    } catch (error) {
      console.error('Failed to switch city:', error)
      return false
    }
  }
}

export default HomeService
