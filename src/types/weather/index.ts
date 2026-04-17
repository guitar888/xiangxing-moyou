/**
 * 天气相关类型定义
 */

/**
 * 天气类型
 */
export type WeatherType = 'sunny' | 'cloudy' | 'rainy' | 'stormy' | 'snowy' | 'foggy'

/**
 * 实时天气数据
 */
export interface WeatherData {
  temperature: number
  feelsLike: number
  humidity: number
  windSpeed: number
  windDirection: string
  aqi: number
  aqiLevel: string
  weatherType: WeatherType
  weatherText: string
  updateTime: string
}

/**
 * 天气预报
 */
export interface WeatherForecast {
  date: string
  day: string
  weatherType: WeatherType
  weatherText: string
  tempHigh: number
  tempLow: number
  windSpeed: string
  windDirection: string
}

/**
 * 骑行指数
 */
export interface RideIndex {
  level: number
  text: string
  desc: string
  color: string
}

/**
 * 天气配置
 */
export const WEATHER_CONFIG: Record<WeatherType, { icon: string; label: string }> = {
  sunny: { icon: 'i-carbon:sun', label: '晴天' },
  cloudy: { icon: 'i-carbon:cloud', label: '多云' },
  rainy: { icon: 'i-carbon:rain', label: '雨天' },
  stormy: { icon: 'i-carbon:thunder-storm', label: '暴雨' },
  snowy: { icon: 'i-carbon:snow', label: '雪天' },
  foggy: { icon: 'i-carbon:fog', label: '雾天' },
}
