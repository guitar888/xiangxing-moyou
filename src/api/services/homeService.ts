import type { ActivityItem, BannerData, QuickEntry, RideData } from '@/types'
import { mockActivities } from '@/api/mock/activityMock'

/** 活动封面图片占位符（统一数据源，图片与活动主题契合） */
export const ACTIVITY_COVER_IMAGES: Record<string, string> = {
  // 樱花谷春季骑行 - 春季樱花风景
  1: 'https://images.unsplash.com/photo-1522383225653-ed111181a951?w=800&h=400&fit=crop',
  // 五山茶园品茶骑行 - 茶园风光
  2: 'https://images.unsplash.com/photo-1564834724105-918b73d1b9e0?w=800&h=400&fit=crop',
  // 赵湾天路挑战赛 - 山路弯道
  3: 'https://images.unsplash.com/photo-1558980394-0a06c4631733?w=800&h=400&fit=crop',
  // 薤山避暑纳凉骑 - 森林公路
  4: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&h=400&fit=crop',
  // 古城环线骑行 - 古城风景
  5: 'https://images.unsplash.com/photo-1548013146-72479768bada?w=800&h=400&fit=crop',
  // 唐城文化骑行 - 唐代建筑风景
  6: 'https://images.unsplash.com/photo-1584646098530-50625b59663e?w=800&h=400&fit=crop',
  // 汉江沿岸绿道骑 - 江边骑行
  7: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=400&fit=crop',
  // 隆中景区骑行 - 景区山路
  8: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=800&h=400&fit=crop',
  // 鹿门山挑战 - 山路风景
  9: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&h=400&fit=crop',
  // 摩友交流会 - 聚会场景
  10: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=400&fit=crop',
}

// 首页数据 API 服务
export class HomeService {
  // 获取轮播图数据（从即将开始的活动派生，统一数据源）
  static async getBanners(): Promise<BannerData[]> {
    try {
      // 筛选即将开始的活动（upcoming）
      const upcomingActivities = mockActivities.filter(a => a.status === 'upcoming')

      // 转换为 BannerData 格式
      return upcomingActivities.slice(0, 5).map(activity => ({
        id: activity.id,
        title: activity.title,
        desc: activity.description.slice(0, 50) + (activity.description.length > 50 ? '...' : ''),
        tag: activity.participantCount && activity.maxParticipants
          ? `${activity.participantCount}/${activity.maxParticipants}人`
          : '即将开始',
        url: `/pages/activity/activity`,
        image: ACTIVITY_COVER_IMAGES[activity.id] || activity.coverImage || '',
      }))
    }
    catch (error) {
      console.error('Failed to get banners:', error)
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
        // {
        //   id: 'weather',
        //   name: '天气查询',
        //   subname: '出行天气参考',
        //   icon: 'i-carbon:cloud',
        //   path: '/subPages/weather/weather',
        // },
        // {
        //   id: 'traffic',
        //   name: '禁摩限行',
        //   subname: '安全出行指南',
        //   icon: 'warning',
        //   path: '/subPages/traffic/traffic',
        // },
        // {
        //   id: 'shop',
        //   name: '口碑店铺',
        //   subname: '摩友推荐商家',
        //   icon: 'shop',
        //   path: '/subPages/shop/shop',
        // },
      ]
    }
    catch (error) {
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
    }
    catch (error) {
      console.error('Failed to get ride data:', error)
      // 返回默认数据
      return {
        totalDistance: 0,
        totalDays: 0,
        totalRoutes: 0,
      }
    }
  }

  // 获取活动列表（统一数据源，从 mockActivities 转换）
  static async getActivities(): Promise<ActivityItem[]> {
    try {
      const today = new Date()
      today.setHours(0, 0, 0, 0)

      return mockActivities.map((activity) => {
        const activityDate = new Date(activity.date)
        activityDate.setHours(0, 0, 0, 0)

        const status = activityDate < today ? 'ended' : 'upcoming'
        // 即将开始的活动自动标记为精品，历史活动使用 mock 中的 isFeatured
        const isFeatured = status === 'upcoming' || activity.isFeatured === true

        return {
          id: activity.id,
          title: activity.title,
          date: activity.date,
          time: activity.time,
          location: activity.location,
          organizer: activity.organizer,
          info: activity.description.slice(0, 60) + (activity.description.length > 60 ? '...' : ''),
          description: activity.description,
          tags: activity.tags,
          image: ACTIVITY_COVER_IMAGES[activity.id] || activity.coverImage || '',
          status,
          isFeatured,
          routeId: activity.routeId,
          routeName: activity.routeName,
          isUpcoming: status === 'upcoming',
          countdownText: status === 'upcoming' ? '距活动开始' : undefined,
          participantCount: activity.participantCount,
          maxParticipants: activity.maxParticipants,
          gatherTime: activity.gatherTime,
          gatherLocation: activity.gatherLocation,
          route: activity.route,
          mealInfo: activity.mealInfo,
          safetyNotice: activity.safetyNotice,
          disclaimer: activity.disclaimer,
          rideType: activity.rideType,
        }
      })
    }
    catch (error) {
      console.error('Failed to get activities:', error)
      return []
    }
  }

  // 获取精品活动列表（用于首页展示）
  static async getFeaturedActivities(): Promise<ActivityItem[]> {
    try {
      const allActivities = await this.getActivities()
      return allActivities.filter(a => a.isFeatured)
    }
    catch (error) {
      console.error('Failed to get featured activities:', error)
      return []
    }
  }

  // 切换城市
  static async switchCity(city: string): Promise<boolean> {
    try {
      // 实际项目中可以记录用户城市偏好到 Bmob
      // await bmob.request('/classes/UserPreference', 'POST', { city })
      return true
    }
    catch (error) {
      console.error('Failed to switch city:', error)
      return false
    }
  }
}

export default HomeService
