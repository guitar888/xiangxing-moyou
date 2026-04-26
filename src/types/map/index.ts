/**
 * 地图相关类型定义
 */

/**
 * 坐标点
 */
export interface Coordinate {
  latitude: number
  longitude: number
}

/**
 * 打卡点类型
 */
export type SpotType = 'scenic' | 'food' | 'coffee' | 'photo' | 'drone' | 'camp'

/**
 * 路线难度
 */
export type RouteDifficulty = 'easy' | 'medium' | 'hard'

/**
 * 地图标记
 */
export interface MapMarker {
  id: number
  latitude: number
  longitude: number
  iconPath?: string
  width?: number
  height?: number
}

/**
 * 路线筛选条件
 */
export interface RouteFilter {
  spotTypes?: SpotType[]
  difficulty?: RouteDifficulty
  region?: string
}

/**
 * 区域类型
 */
export type RegionType = 'all' | 'xiangcheng' | 'fancheng' | 'guangcheng' | 'yicheng' | 'nanzhang' | 'baokang' | 'gucheng' | 'laohekou' | 'zaoyang'

/**
 * 打卡点
 */
export interface CheckInSpot {
  id: string
  name: string
  type: SpotType
  description: string
  coordinates: Coordinate
  address?: string
  images?: string[]
  tags?: string[]
}

/**
 * 骑行路线
 */
export interface RideRoute {
  id: string
  name: string
  description: string
  path: Coordinate[]
  distance: number
  duration: number
  difficulty: RouteDifficulty
  region?: string
  spots: CheckInSpot[]
  coverImage?: string
}

/**
 * 打卡点类型配置
 */
export const SPOT_TYPE_CONFIG: Record<SpotType, { label: string; icon: string; color: string; bgColor: string }> = {
  scenic: { label: '风景', icon: 'i-carbon:palm-tree', color: '#2ED573', bgColor: 'rgba(46, 213, 115, 0.15)' },
  food: { label: '美食', icon: 'i-carbon:restaurant', color: '#FF7A00', bgColor: 'rgba(255, 122, 0, 0.15)' },
  coffee: { label: '咖啡', icon: 'i-carbon:cafe', color: '#8D99AE', bgColor: 'rgba(141, 153, 174, 0.15)' },
  photo: { label: '摄影', icon: 'i-carbon:camera', color: '#3385FF', bgColor: 'rgba(51, 133, 255, 0.15)' },
  drone: { label: '航拍', icon: 'i-carbon:drone', color: '#9945FF', bgColor: 'rgba(153, 69, 255, 0.15)' },
  camp: { label: '露营', icon: 'i-carbon:military-camp', color: '#F9CA24', bgColor: 'rgba(249, 202, 36, 0.15)' },
}

/**
 * 难度配置
 */
export const DIFFICULTY_CONFIG: Record<RouteDifficulty, { label: string; color: string; bgColor: string }> = {
  easy: { label: '简单', color: '#2ED573', bgColor: 'rgba(46, 213, 115, 0.15)' },
  medium: { label: '中等', color: '#FF7A00', bgColor: 'rgba(255, 122, 0, 0.15)' },
  hard: { label: '困难', color: '#FF4757', bgColor: 'rgba(255, 71, 87, 0.15)' },
}

/**
 * 区域配置
 */
export const REGION_CONFIG: Record<RegionType, { label: string }> = {
  all: { label: '全部区域' },
  xiangcheng: { label: '襄城区' },
  fancheng: { label: '樊城区' },
  guangcheng: { label: '襄州区' },
  yicheng: { label: '宜城市' },
  nanzhang: { label: '南漳县' },
  baokang: { label: '保康县' },
  gucheng: { label: '谷城县' },
  laohekou: { label: '老河口市' },
  zaoyang: { label: '枣阳市' },
}
