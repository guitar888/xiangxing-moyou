<script setup lang="ts">
import type { ActivityItem } from '@/types/activity'
import type { BannerData } from '@/types/banner'
import type { QuickEntry, RideData } from '@/types/rideData'

definePage({
  name: 'home',
  layout: 'tabbar',
  style: {
    navigationBarTitleText: '襄行摩友',
    navigationBarBackgroundColor: '#121212',
    navigationBarTextStyle: 'white',
    navigationStyle: 'custom',
  },
})

const router = useRouter()
const { success: showSuccess } = useGlobalToast()

const loading = ref(true)
const error = ref(false)
const loadingProgress = ref(0)
const statusBarHeight = ref(0)
const currentCity = ref('襄阳')

let loadingTimer: ReturnType<typeof setInterval> | null = null

const bannerList = ref<BannerData[]>([
  {
    id: '1',
    title: '唐城追焦夜骑',
    desc: '每周六晚 唐城城墙下 骑行&摄影活动',
    tag: '热门',
    url: '/pages/activity/activity',
  },
  {
    id: '2',
    title: '古城环线晨骑',
    desc: '襄阳古城墙环线，全程约25公里',
    tag: '周末',
    url: '/pages/activity/activity',
  },
  {
    id: '3',
    title: '汉江沿岸骑行',
    desc: '沿汉江绿道，尽享江风拂面',
    tag: '推荐',
    url: '/pages/map/map',
  },
  {
    id: '4',
    title: '隆中至武当山',
    desc: '襄阳至武当山摩旅路线，约180公里',
    tag: '长途',
    url: '/pages/map/map',
  },
])

const quickEntries = ref<QuickEntry[]>([
  {
    id: 'map',
    name: '骑行地图',
    subname: '襄阳本地路线',
    icon: 'carbon:map', // 标记：carbon 前缀
    highlight: true,
    path: '/pages/map/map',
    isTab: true,
  },
  {
    id: 'data',
    name: '骑行数据',
    subname: '我的骑行轨迹',
    icon: 'chart', // 内置
    highlight: true,
    path: '/pages/data/data',
    isTab: true,
  },
  {
    id: 'activity',
    name: '活动接龙',
    subname: '本地活动报名',
    icon: 'calendar', // 内置
    path: '/pages/activity/activity',
    isTab: true,
  },
  {
    id: 'weather',
    name: '天气查询',
    subname: '出行天气参考',
    icon: 'carbon:cloud', // 标记：carbon 前缀
    path: '/pages/weather/weather',
  },
  {
    id: 'traffic',
    name: '禁摩限行',
    subname: '安全出行指南',
    icon: 'warning', // 内置
    path: '/pages/traffic/traffic',
  },
  {
    id: 'shop',
    name: '口碑店铺',
    subname: '摩友推荐商家',
    icon: 'shop', // 内置
    path: '/pages/shop/shop',
  },
])

const rideData = ref<RideData>({
  totalDistance: 1286,
  totalDays: 45,
  totalRoutes: 12,
})

const displayDistance = ref(0)
const displayDays = ref(0)
const displayRoutes = ref(0)

const activityList = ref<ActivityItem[]>([
  {
    id: '1',
    title: '唐城追焦夜骑',
    date: '4月20日',
    time: '19:00',
    info: '穿越盛唐夜景，襄阳唐城夜间骑行&摄影活动',
    tags: ['夜骑', '摄影'],
    image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=襄阳唐城夜景%20摩托车骑行%20古建筑灯光&image_size=square_hd',
    isUpcoming: true,
    countdownText: '距开始 3天',
  },
  {
    id: '2',
    title: '古城环线晨骑',
    date: '4月27日',
    time: '06:30',
    info: '襄阳古城墙环线，全程约25公里',
    tags: ['晨骑', '免费'],
    image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=襄阳古城墙%20摩托车%20清晨骑行&image_size=square_hd',
    isUpcoming: true,
    countdownText: '距开始 10天',
  },
  {
    id: '3',
    title: '摩友交流会',
    date: '5月1日',
    time: '14:00',
    info: '襄阳摩友俱乐部月度聚会',
    tags: ['聚会', '交流'],
    image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=摩托车俱乐部聚会%20摩友交流&image_size=square_hd',
    isUpcoming: false,
  },
  {
    id: '4',
    title: '汉江沿岸骑行',
    date: '5月3日',
    time: '08:00',
    info: '沿汉江绿道，尽享江风拂面',
    tags: ['绿道', '休闲'],
    image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=汉江沿岸%20摩托车骑行%20江景&image_size=square_hd',
    isUpcoming: false,
  },
])

const showBadge = ref(false)

function getSystemInfo() {
  const systemInfo = uni.getSystemInfoSync()
  statusBarHeight.value = systemInfo.statusBarHeight || 20
}

function handleCityChange() {
  uni.showActionSheet({
    itemList: ['襄阳', '随州', '荆门', '宜城', '枣阳'],
    success: (res) => {
      const cities = ['襄阳', '随州', '荆门', '宜城', '枣阳']
      currentCity.value = cities[res.tapIndex]
      showSuccess({ msg: `已切换至${currentCity.value}` })
    },
  })
}

function handleBannerClick(banner: BannerData) {
  if (banner.url) {
    if (banner.url.includes('/pages/map/map') || banner.url.includes('/pages/activity/activity')) {
      router.pushTab(banner.url)
    }
    else {
      router.push(banner.url)
    }
  }
}

function handleEntryClick(entry: QuickEntry) {
  uni.vibrateShort({ type: 'light' })
  if (entry.isTab) {
    router.pushTab(entry.path)
  }
  else {
    router.push(entry.path)
  }
}

function handleGoToData() {
  router.pushTab('/pages/data/data')
}

function handleGoToActivity() {
  router.pushTab('/pages/activity/activity')
}

function handleActivityClick(activity: ActivityItem) {
  router.push({
    path: '/pages/activity/detail',
    query: { id: activity.id },
  })
}

function showComplianceInfo() {
  uni.showModal({
    title: '使用须知',
    content: '本小程序为襄阳摩友公益工具，所有功能免费使用。我们承诺：不收集用户敏感信息，不涉及商业广告，仅供摩友交流学习使用。骑行请注意安全，遵守交通规则。',
    showCancel: false,
    confirmText: '我知道了',
  })
}

function animateNumber(target: number, display: Ref<number>) {
  const duration = 1500
  const start = Date.now()
  const startValue = 0

  const animate = () => {
    const elapsed = Date.now() - start
    const progress = Math.min(elapsed / duration, 1)
    display.value = Math.floor(startValue + (target - startValue) * progress)

    if (progress < 1) {
      requestAnimationFrame(animate)
    }
  }
  animate()
}

function loadRideData() {
  animateNumber(rideData.value.totalDistance, displayDistance)
  animateNumber(rideData.value.totalDays, displayDays)
  animateNumber(rideData.value.totalRoutes, displayRoutes)
}

function loadPage() {
  try {
    loading.value = true
    error.value = false
    loadingProgress.value = 0

    loadingTimer = setInterval(() => {
      loadingProgress.value += Math.random() * 15
      if (loadingProgress.value >= 100) {
        loadingProgress.value = 100
        setTimeout(() => {
          loading.value = false
          setTimeout(() => {
            loadRideData()
            setTimeout(() => {
              showBadge.value = true
            }, 300)
          }, 100)
        }, 300)
        if (loadingTimer)
          clearInterval(loadingTimer)
      }
    }, 100)
  }
  catch {
    error.value = true
    loading.value = false
  }
}

function retryLoad() {
  loadPage()
}

onMounted(() => {
  getSystemInfo()
  loadPage()
})

onUnmounted(() => {
  if (loadingTimer)
    clearInterval(loadingTimer)
})
</script>

<template>
  <view class="relative min-h-screen overflow-hidden from-base via-[var(--wot-color-bg-hover)] to-[var(--wot-color-bg-card)] bg-gradient-to-br">
    <view class="animate-breathe pointer-events-none absolute inset-x-0 top-0 z-0 h-[240rpx]" :style="{ background: 'radial-gradient(circle at top, rgba(var(--wot-color-theme-rgb),0.18), transparent 55%)' }" />
    <view class="pointer-events-none absolute inset-0 z-0 opacity-5" :style="{ background: `repeating-linear-gradient(45deg, transparent, transparent 40rpx, var(--wot-color-theme) 40rpx, var(--wot-color-theme) 80rpx), repeating-linear-gradient(-45deg, transparent, transparent 40rpx, var(--wot-color-theme) 40rpx, var(--wot-color-theme) 80rpx)` }" />

    <GlobalStatusLoading :visible="loading" :progress="loadingProgress" text="加载中..." />

    <GlobalStatusError :visible="error" title="加载失败" button-text="重新加载" @retry="retryLoad" />

    <view v-if="!loading && !error" class="relative z-10">
      <home-HeaderHome :status-bar-height="statusBarHeight" :current-city="currentCity" @city-change="handleCityChange" />

      <Banner :list="bannerList" @click="handleBannerClick" />

      <home-QuickEntry :entries="quickEntries" @entry-click="handleEntryClick" />

      <home-RideDataCard
        :ride-data="rideData"
        :display-distance="displayDistance"
        :display-days="displayDays"
        :display-routes="displayRoutes"
        :loading="loading"
        :show-badge="showBadge"
        @go-to-data="handleGoToData"
      />

      <home-ActivityList
        :activity-list="activityList"
        @activity-click="handleActivityClick"
        @go-to-activity="handleGoToActivity"
      />

      <common-PageFooter @compliance-info="showComplianceInfo" />
    </view>
  </view>
</template>
