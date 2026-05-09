import { alovaInstance } from '@/api'

// 谷城地区固定天气 API（腾讯免费，无需KEY）
const fetchGuchengWeather = () =>
  alovaInstance.Get('https://wis.qq.com/weather/common', {
    params: {
      source: 'pc',
      province: '湖北省',
      city: '襄阳市',
      county: '谷城县',
      weather_type: 'observe|forecast_24h|index',
    },
  })

export function useWeather() {
  const weatherData = ref<any>(null)
  const loading = ref(false)

  // 当天缓存键
  const CACHE_KEY = 'gucheng_weather_today'

  // 检查是否是当天
  const isToday = (dateStr: string) => {
    return dateStr === new Date().toDateString()
  }

  // 加载天气（缓存优先）
  const loadWeather = async () => {
    try {
      // 1. 读缓存
      const cache = uni.getStorageSync(CACHE_KEY)
      if (cache && isToday(cache.date)) {
        weatherData.value = cache.data
        return cache.data
      }

      // 2. 无缓存 → 请求
      loading.value = true
      const res = await fetchGuchengWeather()
      const data = res.data?.data
      if (!data) return null

      const observe = data.observe
      weatherData.value = observe

      // 3. 写缓存
      uni.setStorageSync(CACHE_KEY, {
        date: new Date().toDateString(),
        data: observe,
      })

      return observe
    } catch (err) {
      console.error('天气加载失败', err)
      return null
    } finally {
      loading.value = false
    }
  }

  // 骑行建议弹窗
  const showWeatherTip = (data: any) => {
    if (!data) return

    const temp = data.degree
    const weather = data.weather
    const wind = `${data.wind_direction}${data.wind_power}`

    let tip = ''

    if (weather.includes('雨')) {
      tip = `🌧️ 谷城今日${weather}，${temp}℃
骑行建议：路面湿滑，减速慢行，避开水坑
衣物建议：防水骑行服 + 雨衣 + 防水手套`
    } else if (Number(temp) >= 30) {
      tip = `☀️ 谷城今日${weather}，${temp}℃
骑行建议：避开正午，防晒补水
衣物建议：速干衣、冰袖、防晒面罩、头盔`
    } else if (Number(temp) <= 10) {
      tip = `❄️ 谷城今日${weather}，${temp}℃
骑行建议：防风保暖，护膝护肘
衣物建议：防风骑行服、保暖内衣、手套`
    } else {
      tip = `🌤️ 谷城今日${weather}，${temp}℃ | ${wind}
骑行建议：天气舒适，适合骑行
衣物建议：常规骑行服即可`
    }

    // wot-ui 弹窗（使用 useGlobalMessage 的 alert 方法）
    useGlobalMessage().alert({
      title: '今日骑行天气建议',
      msg: tip,
    })
  }

  // 点击天气图标触发
  const onWeatherClick = async () => {
    if (weatherData.value) {
      showWeatherTip(weatherData.value)
    } else {
      const data = await loadWeather()
      if (data) showWeatherTip(data)
    }
  }

  return {
    weatherData,
    loading,
    loadWeather,
    onWeatherClick,
    showWeatherTip,
  }
}
