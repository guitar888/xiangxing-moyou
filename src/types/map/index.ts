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
export type SpotType = 'scenic' | 'food' | 'coffee' | 'photo' | 'camp' | 'adventure'

/**
 * 路线难度
 */
export type RouteDifficulty = 'easy' | 'medium' | 'hard'

/**
 * 路线标签
 */
export type RouteTag = 
  | 'mountain'         // 山路
  | 'coastal'          // 沿海/沿江
  | 'forest'           // 森林
  | 'countryside'      // 田园
  | 'photo'            // 摄影友好
  | 'adventure'        // 探险
  | 'leisure'          // 休闲
  | 'challenge'        // 挑战
  | 'camping'          // 露营
  | 'offroad'          // 越野

/**
 * 集合点信息
 */
export interface MeetupPoint {
  name: string
  address: string
  coordinates: Coordinate
  time?: string  // 集合时间，如 "09:30"
}

/**
 * 海拔信息
 */
export interface ElevationInfo {
  min: number  // 最低海拔（米）
  max: number  // 最高海拔（米）
  gain: number // 累计爬升（米）
}

/**
 * 越野/探险区域信息
 */
export interface AdventureArea {
  name: string
  type: 'ski_slope' | 'offroad_park' | 'hiking_trail' | 'climbing'
  description: string
  coordinates: Coordinate
  difficulty?: RouteDifficulty
}

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
 * 路线分段信息
 */
export interface RouteSegment {
  name: string  // 分段名称，如"谷栗路 segment"
  description: string  // 分段描述
  path: Coordinate[]  // 分段路径点
  distance: number  // 分段距离（km）
  duration: number  // 分段预计时长（分钟）
  roadType?: 'paved' | 'unpaved' | 'mixed'  // 路面类型
  highlights?: string[]  // 分段亮点
}

/**
 * 骑行路线
 */
export interface RideRoute {
  id: string
  name: string
  description: string  // 完整描述（用于详情页）
  shortDescription?: string  // 简短描述（用于卡片展示，限 60 字）
  path: Coordinate[]  // 完整路径点（用于地图绘制）
  distance: number
  duration: number
  difficulty: RouteDifficulty
  region?: string
  spots: CheckInSpot[]
  coverImage?: string
  meetupPoint?: MeetupPoint  // 集合点信息
  tags?: RouteTag[]  // 路线标签
  elevation?: ElevationInfo  // 海拔信息
  adventureAreas?: AdventureArea[]  // 越野/探险区域
  roadCondition?: string  // 路况描述
  bestSeason?: string  // 最佳季节
  highlights?: string[]  // 核心亮点（用于卡片展示）
  segments?: RouteSegment[]  // 路线分段（对接 Bmob 用）
  loopType?: 'loop' | 'oneway' | 'roundtrip'  // 路线类型：环线/单程/往返
}

/**
 * 打卡点类型配置
 */
export const SPOT_TYPE_CONFIG: Record<SpotType, { label: string, icon: string, color: string, bgColor: string }> = {
  scenic: { label: '风景', icon: 'i-carbon:palm-tree', color: '#2ED573', bgColor: 'rgba(46, 213, 115, 0.15)' },
  food: { label: '美食', icon: 'i-carbon:restaurant', color: '#FF7A00', bgColor: 'rgba(255, 122, 0, 0.15)' },
  coffee: { label: '咖啡', icon: 'i-carbon:cafe', color: '#8D99AE', bgColor: 'rgba(141, 153, 174, 0.15)' },
  photo: { label: '摄影', icon: 'i-carbon:camera', color: '#3385FF', bgColor: 'rgba(51, 133, 255, 0.15)' },
  camp: { label: '露营', icon: 'i-carbon:military-camp', color: '#F9CA24', bgColor: 'rgba(249, 202, 36, 0.15)' },
  adventure: { label: '探险', icon: 'i-carbon:mountain', color: '#FF4757', bgColor: 'rgba(255, 71, 87, 0.15)' }
}

/**
 * 路线标签配置
 */
export const ROUTE_TAG_CONFIG: Record<RouteTag, { label: string, icon: string, color: string }> = {
  mountain: { label: '山路', icon: 'i-carbon:mountain', color: '#8D99AE' },
  coastal: { label: '沿江', icon: 'i-carbon:wave-direction', color: '#3385FF' },
  forest: { label: '森林', icon: 'i-carbon:palm-tree', color: '#2ED573' },
  countryside: { label: '田园', icon: 'i-carbon:sprout', color: '#FF7A00' },
  photo: { label: '摄影', icon: 'i-carbon:camera', color: '#3385FF' },
  adventure: { label: '探险', icon: 'i-carbon:mountain', color: '#FF4757' },
  leisure: { label: '休闲', icon: 'i-carbon:pause', color: '#2ED573' },
  challenge: { label: '挑战', icon: 'i-carbon:flag', color: '#FF4757' },
  camping: { label: '露营', icon: 'i-carbon:military-camp', color: '#F9CA24' },
  offroad: { label: '越野', icon: 'i-carbon:road', color: '#FF7A00' }
}

/**
 * 难度配置
 */
export const DIFFICULTY_CONFIG: Record<RouteDifficulty, { label: string, color: string, bgColor: string, description: string }> = {
  easy: { label: '简单', color: '#2ED573', bgColor: 'rgba(46, 213, 115, 0.15)', description: '路面平坦，坡度小，适合新手' },
  medium: { label: '中等', color: '#FF7A00', bgColor: 'rgba(255, 122, 0, 0.15)', description: '部分山路，有一定坡度' },
  hard: { label: '困难', color: '#FF4757', bgColor: 'rgba(255, 71, 87, 0.15)', description: '连续弯道，海拔落差大' }
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
  zaoyang: { label: '枣阳市' }
}
