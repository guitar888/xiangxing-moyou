/**
 * 天气 API 服务
 */
import type { WeatherData, WeatherForecast, RideIndex } from '@/types'

/** 模拟天气数据 */
const mockWeather: WeatherData = {
  temperature: 22,
  feelsLike: 24,
  humidity: 65,
  windSpeed: 12,
  windDirection: '东南风',
  aqi: 42,
  aqiLevel: '优',
  weatherType: 'sunny',
  weatherText: '晴',
  updateTime: '2026-04-17 10:30',
}

const mockForecasts: WeatherForecast[] = [
  { date: '2026-04-17', day: '今天', weatherType: 'sunny', weatherText: '晴', tempHigh: 26, tempLow: 16, windSpeed: '12', windDirection: '东南风' },
  { date: '2026-04-18', day: '明天', weatherType: 'cloudy', weatherText: '多云', tempHigh: 25, tempLow: 17, windSpeed: '15', windDirection: '东南风' },
  { date: '2026-04-19', day: '后天', weatherType: 'rainy', weatherText: '小雨', tempHigh: 22, tempLow: 15, windSpeed: '18', windDirection: '北风' },
]

const mockRideIndex: RideIndex = {
  level: 4,
  text: '非常适合',
  desc: '今日天气晴朗，空气清新，非常适合骑行',
  color: '#2ED573',
}

/**
 * 获取实时天气
 */
export async function getWeather(): Promise<WeatherData> {
  return new Promise((resolve) => {
    setTimeout(() => resolve(mockWeather), 200)
  })
}

/**
 * 获取天气预报
 */
export async function getWeatherForecast(): Promise<WeatherForecast[]> {
  return new Promise((resolve) => {
    setTimeout(() => resolve(mockForecasts), 200)
  })
}

/**
 * 获取骑行指数
 */
export async function getRideIndex(): Promise<RideIndex> {
  return new Promise((resolve) => {
    setTimeout(() => resolve(mockRideIndex), 200)
  })
}
