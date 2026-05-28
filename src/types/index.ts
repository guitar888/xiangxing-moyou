/**
 * 类型统一导出入口
 * 使用方式：import type { xxx } from '@/types'
 */

// 活动模块
export type { Activity, ActivityFilter, ActivityItem, ActivityStatus, ActivityStatusTab, ActivityTag, AdminContact } from './activity'
export { ACTIVITY_TAG_CONFIG } from './activity'

// 轮播图模块
export type { BannerData } from './banner'

// 地图模块
export type { CheckInSpot, Coordinate as MapCoordinate, MapMarker, RegionType, RideRoute, RouteDifficulty, RouteFilter, SpotType } from './map'
export { DIFFICULTY_CONFIG, REGION_CONFIG, SPOT_TYPE_CONFIG } from './map'

// 店铺模块（已移除）
// export type { Shop, ShopType } from './shop'
// export { SHOP_TYPE_CONFIG } from './shop'

// 骑行模块
export type { ActiveRide, Coordinate, MonthlyStats, QuickEntry, RecordFilter, RideData, RideRecord, RideStats, RideStatus } from './ride'

// 交通模块
export type { RestrictedArea, TimeRestriction, TrafficPolicy } from './traffic'
