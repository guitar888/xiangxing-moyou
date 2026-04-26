/**
 * 店铺相关类型定义
 */

/**
 * 店铺类型
 */
export type ShopType = 'gas_station' | 'repair' | 'restaurant' | 'cafe' | 'scenic' | 'parking'

/**
 * 口碑店铺
 */
export interface Shop {
  id: string
  name: string
  type: ShopType
  address: string
  description: string
  images?: string[]
  rating?: number
}

/**
 * 店铺类型配置
 */
export const SHOP_TYPE_CONFIG: Record<ShopType, { label: string; icon: string; color: string }> = {
  gas_station: { label: '加油站', icon: 'i-carbon:gas-station', color: '#2ED573' },
  repair: { label: '维修店', icon: 'i-carbon:tool-kit', color: '#3385FF' },
  restaurant: { label: '餐厅', icon: 'i-carbon:restaurant', color: '#FF7A00' },
  cafe: { label: '咖啡馆', icon: 'i-carbon:cafe', color: '#8D99AE' },
  scenic: { label: '景点', icon: 'i-carbon:location', color: '#9945FF' },
  parking: { label: '停车场', icon: 'i-fluent:vehicle-motorcycle-28-filled', color: '#3385FF' },
}
