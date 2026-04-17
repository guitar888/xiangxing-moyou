<script setup lang="ts">
/**
 * 天气页面
 * 为摩友提供出行天气参考
 */
import { WEATHER_CONFIG } from '@/types'

definePage({
  name: 'weather',
  style: {
    navigationBarTitleText: '天气查询',
    navigationBarBackgroundColor: '#121212',
    navigationBarTextStyle: 'white',
  },
})

// ================================================
// 数据
// ================================================

const weather = ref({
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
})

const forecasts = ref([
  { date: '2026-04-17', day: '今天', weatherType: 'sunny', weatherText: '晴', tempHigh: 26, tempLow: 16, windSpeed: '12', windDirection: '东南风' },
  { date: '2026-04-18', day: '明天', weatherType: 'cloudy', weatherText: '多云', tempHigh: 25, tempLow: 17, windSpeed: '15', windDirection: '东南风' },
  { date: '2026-04-19', day: '后天', weatherType: 'rainy', weatherText: '小雨', tempHigh: 22, tempLow: 15, windSpeed: '18', windDirection: '北风' },
])

const rideIndex = ref({
  level: 4,
  text: '非常适合',
  desc: '今日天气晴朗，空气清新，非常适合骑行',
  color: '#2ED573',
})

// ================================================
// 加载数据
// ================================================

async function loadWeather() {
  uni.showLoading({ title: '加载中' })
  try {
    const [w, f, r] = await Promise.all([
      getWeather(),
      getWeatherForecast(),
      getRideIndex(),
    ])
    weather.value = w
    forecasts.value = f
    rideIndex.value = r
  } catch (err) {
    console.error('加载天气失败:', err)
  } finally {
    uni.hideLoading()
  }
}

// ================================================
// 工具函数
// ================================================

function getWeatherIcon(type: string) {
  return WEATHER_CONFIG[type as keyof typeof WEATHER_CONFIG]?.icon || 'i-carbon:weather'
}

function getAQIColor(level: string) {
  if (level === '优') return '#00E676'
  if (level === '良') return '#FFEB3B'
  return '#F44336'
}

onMounted(() => {
  loadWeather()
})
</script>

<template>
  <view class="min-h-screen bg-base pb-[40rpx]">
    <!-- 实时天气卡片 -->
    <view class="px-[24rpx] pt-[20rpx]">
      <view class="bg-card rounded-[24rpx] p-[32rpx]">
        <!-- 温度和天气 -->
        <view class="flex items-center justify-between mb-[24rpx]">
          <view>
            <text class="text-[100rpx] font-300 text-white leading-[1]">{{ weather.temperature }}</text>
            <text class="text-[36rpx] text-gray ml-[8rpx]">°C</text>
          </view>
          <view class="flex flex-col items-end">
            <text :class="getWeatherIcon(weather.weatherType) + ' text-[80rpx] text-warning'" />
            <text class="text-[26rpx] text-gray mt-[8rpx]">{{ weather.weatherText }}</text>
          </view>
        </view>

        <!-- 详细信息 -->
        <view class="grid grid-cols-4 gap-[16rpx]">
          <view class="flex flex-col items-center">
            <text class="i-carbon:water text-[28rpx] text-gray mb-[4rpx]" />
            <text class="text-[22rpx] text-gray">湿度</text>
            <text class="text-[24rpx] text-white font-500">{{ weather.humidity }}%</text>
          </view>
          <view class="flex flex-col items-center">
            <text class="i-carbon:strong-wind text-[28rpx] text-gray mb-[4rpx]" />
            <text class="text-[22rpx] text-gray">风速</text>
            <text class="text-[24rpx] text-white font-500">{{ weather.windSpeed }}km/h</text>
          </view>
          <view class="flex flex-col items-center">
            <text class="i-carbon:temperature text-[28rpx] text-gray mb-[4rpx]" />
            <text class="text-[22rpx] text-gray">体感</text>
            <text class="text-[24rpx] text-white font-500">{{ weather.feelsLike }}°</text>
          </view>
          <view class="flex flex-col items-center">
            <text class="i-carbon:drought text-[28rpx] text-gray mb-[4rpx]" />
            <text class="text-[22rpx] text-gray">AQI</text>
            <text class="text-[24rpx] font-500" :style="{ color: getAQIColor(weather.aqiLevel) }">{{ weather.aqi }} {{ weather.aqiLevel }}</text>
          </view>
        </view>
      </view>
    </view>

    <!-- 骑行指数 -->
    <view class="px-[24rpx] mt-[20rpx]">
      <view class="bg-card rounded-[24rpx] p-[32rpx]">
        <view class="flex items-center justify-between mb-[16rpx]">
          <text class="text-[28rpx] font-600 text-white">骑行指数</text>
          <view class="flex items-center gap-[8rpx]">
            <view
              v-for="i in 5"
              :key="i"
              class="w-[32rpx] h-[32rpx] rounded-full"
              :style="{ backgroundColor: i <= rideIndex.level ? rideIndex.color : '#333' }"
            />
          </view>
        </view>
        <text class="text-[32rpx] font-600 mb-[8rpx]" :style="{ color: rideIndex.color }">{{ rideIndex.text }}</text>
        <text class="text-[24rpx] text-gray">{{ rideIndex.desc }}</text>
      </view>
    </view>

    <!-- 天气预报 -->
    <view class="px-[24rpx] mt-[20rpx]">
      <text class="text-[28rpx] font-600 text-white mb-[16rpx] block">未来预报</text>
      <view class="bg-card rounded-[24rpx] overflow-hidden">
        <view
          v-for="(item, index) in forecasts"
          :key="item.date"
          class="flex items-center justify-between p-[24rpx]"
          :style="index < forecasts.length - 1 ? { borderBottom: '1rpx solid var(--wot-color-border)' } : {}"
        >
          <text class="text-[24rpx] text-gray w-[100rpx]">{{ item.day }}</text>
          <view class="flex items-center gap-[8rpx]">
            <text :class="getWeatherIcon(item.weatherType) + ' text-[32rpx] text-gray'" />
            <text class="text-[24rpx] text-white">{{ item.weatherText }}</text>
          </view>
          <view class="flex items-center gap-[16rpx]">
            <text class="text-[24rpx] text-white">{{ item.tempHigh }}°</text>
            <text class="text-[24rpx] text-gray">/</text>
            <text class="text-[24rpx] text-gray">{{ item.tempLow }}°</text>
          </view>
        </view>
      </view>
    </view>

    <!-- 骑行建议 -->
    <view class="px-[24rpx] mt-[20rpx]">
      <view class="bg-card rounded-[24rpx] p-[32rpx]">
        <view class="flex items-center gap-[12rpx] mb-[16rpx]">
          <text class="i-carbon:idea text-[32rpx] text-primary" />
          <text class="text-[28rpx] font-600 text-white">骑行建议</text>
        </view>
        <view class="space-y-[12rpx]">
          <view class="flex items-start gap-[12rpx]">
            <text class="i-carbon:checkmark text-[24rpx] text-primary mt-[4rpx]" />
            <text class="text-[24rpx] text-gray flex-1">今日天气晴朗，适合长途骑行</text>
          </view>
          <view class="flex items-start gap-[12rpx]">
            <text class="i-carbon:checkmark text-[24rpx] text-primary mt-[4rpx]" />
            <text class="text-[24rpx] text-gray flex-1">早晚温差较大，建议携带外套</text>
          </view>
          <view class="flex items-start gap-[12rpx]">
            <text class="i-carbon:checkmark text-[24rpx] text-primary mt-[4rpx]" />
            <text class="text-[24rpx] text-gray flex-1">注意防晒，涂抹防晒霜</text>
          </view>
        </view>
      </view>
    </view>

    <!-- 更新时间 -->
    <view class="px-[24rpx] mt-[20rpx] text-center">
      <text class="text-[20rpx] text-gray">更新时间：{{ weather.updateTime }}</text>
    </view>
  </view>
</template>
