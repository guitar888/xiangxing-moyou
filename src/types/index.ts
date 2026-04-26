/**
 * 类型统一导出入口
 * 使用方式：import type { xxx } from '@/types'
 */

// 活动模块
export type { Activity, ActivityItem, ActivityFilter, ActivityStatus, ActivityTag, AdminContact } from './activity'
export { ACTIVITY_TAG_CONFIG } from './activity'

// 骑行模块
export type { Coordinate, RideRecord, RideStats, MonthlyStats, RecordFilter, RideStatus, ActiveRide, QuickEntry, RideData } from './ride'

// 地图模块
export type { Coordinate as MapCoordinate, SpotType, RouteDifficulty, MapMarker, RouteFilter, CheckInSpot, RideRoute, RegionType } from './map'
export { SPOT_TYPE_CONFIG, DIFFICULTY_CONFIG, REGION_CONFIG } from './map'

// 店铺模块
export type { Shop, ShopType } from './shop'
export { SHOP_TYPE_CONFIG } from './shop'

// 交通模块
export type { TrafficPolicy, TimeRestriction, RestrictedArea } from './traffic'

// 天气模块
export type { WeatherType, WeatherData, WeatherForecast, RideIndex } from './weather'
export { WEATHER_CONFIG } from './weather'

// 轮播图模块
export type { BannerData } from './banner'
