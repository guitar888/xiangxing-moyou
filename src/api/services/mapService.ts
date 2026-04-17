/**
 * 地图服务 API
 * 预留 Bmob 接口，方便后续对接后端
 */
import type { RideRoute, CheckInSpot, RouteFilter } from '@/types'
import { mockRoutes } from '@/api/mock/mapMock'

/**
 * 获取路线列表
 * @param filter 筛选条件
 */
export async function getRoutes(filter?: RouteFilter): Promise<RideRoute[]> {
  // TODO: 对接 Bmob
  // return alovaInstance.Get<RideRoute[]>('/api/routes', { params: filter })

  // Mock 数据
  return new Promise((resolve) => {
    setTimeout(() => {
      let routes = [...mockRoutes]

      // 按筛选条件过滤
      if (filter?.difficulty) {
        routes = routes.filter(r => r.difficulty === filter.difficulty)
      }
      if (filter?.spotTypes?.length) {
        routes = routes.filter(r =>
          r.spots.some(s => filter.spotTypes!.includes(s.type))
        )
      }
      if (filter?.features?.length) {
        routes = routes.filter(r =>
          filter.features!.every(f => r.features.includes(f))
        )
      }

      resolve(routes)
    }, 300)
  })
}

/**
 * 获取路线详情
 * @param id 路线ID
 */
export async function getRouteById(id: string): Promise<RideRoute | null> {
  // TODO: 对接 Bmob
  // return alovaInstance.Get<RideRoute>(`/api/routes/${id}`)

  return new Promise((resolve) => {
    setTimeout(() => {
      const route = mockRoutes.find(r => r.id === id) || null
      resolve(route)
    }, 200)
  })
}

/**
 * 获取打卡点详情
 * @param id 打卡点ID
 */
export async function getSpotById(id: string): Promise<CheckInSpot | null> {
  // TODO: 对接 Bmob
  // return alovaInstance.Get<CheckInSpot>(`/api/spots/${id}`)

  return new Promise((resolve) => {
    setTimeout(() => {
      for (const route of mockRoutes) {
        const spot = route.spots.find(s => s.id === id)
        if (spot) {
          resolve(spot)
          return
        }
      }
      resolve(null)
    }, 200)
  })
}

/**
 * 获取所有打卡点（按类型）
 * @param types 打卡点类型
 */
export async function getSpotsByTypes(types: string[]): Promise<CheckInSpot[]> {
  // TODO: 对接 Bmob
  // return alovaInstance.Get<CheckInSpot[]>('/api/spots', { params: { types } })

  return new Promise((resolve) => {
    setTimeout(() => {
      const spots: CheckInSpot[] = []
      for (const route of mockRoutes) {
        for (const spot of route.spots) {
          if (types.length === 0 || types.includes(spot.type)) {
            spots.push(spot)
          }
        }
      }
      resolve(spots)
    }, 200)
  })
}
