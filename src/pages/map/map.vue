<script setup lang="ts">
/**
 * 骑行地图页面
 * 合规优先：路线信息由摩友分享，骑行记录仅本地存储
 * 全端兼容：无地图Key依赖，导航跳转第三方APP
 */
import type { SpotType, RideRoute, CheckInSpot, Coordinate } from '@/types'
import { SPOT_TYPE_CONFIG, DIFFICULTY_CONFIG, REGION_CONFIG } from '@/types'

// 合规提示状态
const showComplianceTip = ref(true)

// 关闭合规提示
function closeComplianceTip() {
  showComplianceTip.value = false
}

definePage({
  name: 'map',
  layout: 'tabbar',
  style: {
    navigationBarTitleText: '骑行地图',
    navigationStyle: 'custom',
  },
})

// ================================================
// 系统信息
// ================================================

const { statusBarHeight } = useSystemInfo()

// ================================================
// 地图数据（业务逻辑全部封装）
// ================================================

const {
  routes,
  currentRoute,
  currentSpot,
  loading,
  selectedSpotTypes,
  selectedRegion,
  isRiding,
  formattedDuration,
  showPoster,
  completedRecord,
  hotRoutes,
  toggleSpotType,
  setRegion,
  clearFilters,
  confirmEndRide,
  handleRouteSelect,
  handleSpotClose,
  closePoster,
  markers,
  handleMapMarkertap,
} = useMapData()

// ================================================
// 导航逻辑
// ================================================

const { openMapNavigation } = useMapNavigation()

function handleNavigateToRoute(route: RideRoute | null) {
  if (!route?.spots?.length) return
  const firstSpot = route.spots[0]
  openMapNavigation({
    latitude: firstSpot.coordinates.latitude,
    longitude: firstSpot.coordinates.longitude,
    name: firstSpot.name,
    address: firstSpot.name,
  })
}

function handleNavigateToSpot(spot: CheckInSpot | null) {
  if (!spot) return
  openMapNavigation({
    latitude: spot.coordinates.latitude,
    longitude: spot.coordinates.longitude,
    name: spot.name,
    address: spot.name,
  })
}

// ================================================
// 筛选数据
// ================================================

const spotTypes: SpotType[] = ['scenic', 'food', 'coffee', 'photo', 'drone', 'camp']

const activeSpotTypes = computed(() => selectedSpotTypes.value)

// 襄阳各区县
const regions = computed(() => {
  return Object.entries(REGION_CONFIG).map(([key, config]) => ({
    key,
    ...config,
  }))
})

// ================================================
// 分类图标配置
// ================================================

const SPOT_TYPE_ICONS: Record<SpotType, string> = {
  scenic: 'i-carbon:palm-tree',
  food: 'i-carbon:restaurant',
  coffee: 'i-carbon:cafe',
  photo: 'i-carbon:camera',
  drone: 'i-carbon:drone',
  camp: 'i-carbon:military-camp',
}

// ================================================
// 区域图标配置
// ================================================

const REGION_ICONS: Record<string, string> = {
  all: 'i-carbon:location',
  xiangcheng: 'i-carbon:location',
  fancheng: 'i-carbon:location',
  guangcheng: 'i-carbon:location',
  yicheng: 'i-carbon:location',
  nanzhang: 'i-carbon:location',
  baokang: 'i-carbon:location',
  gucheng: 'i-carbon:location',
  laohekou: 'i-carbon:location',
  zaoyang: 'i-carbon:location',
}

// ================================================
// 筛选弹窗控制
// ================================================

const showTypeFilter = ref(false)
const showRegionFilter = ref(false)

// 是否有类型筛选
const hasTypeFilter = computed(() => selectedSpotTypes.value.length > 0)
// 是否有区域筛选
const hasRegionFilter = computed(() => !!selectedRegion.value && selectedRegion.value !== 'all')

// 打开类型筛选弹窗
function openTypeFilter() {
  showTypeFilter.value = true
}

// 打开区域筛选弹窗
function openRegionFilter() {
  showRegionFilter.value = true
}

// 确认类型筛选
function confirmTypeFilter() {
  showTypeFilter.value = false
}

// 确认区域筛选
function confirmRegionFilter() {
  showRegionFilter.value = false
}

// ================================================
// 地图相关
// ================================================

// 地图中心点（襄阳市区中心）
const mapCenter = ref<Coordinate>({
  latitude: 32.0082,
  longitude: 112.1226,
})

// 地图缩放级别
const mapScale = ref(11)

// 处理地图标记点击
function onMapMarkerTap(e: any) {
  const markerId = e.detail?.markerId
  if (markerId !== undefined) {
    handleMapMarkertap(markerId)
  }
}
</script>

<template>
  <view class="relative min-h-screen overflow-hidden bg-gradient-to-br from-base via-[var(--wot-color-bg-hover)] to-[var(--wot-color-bg-card)]">
    <!-- 背景装饰 -->
    <!-- #ifdef H5 -->
    <view class="pointer-events-none absolute inset-x-0 top-0 z-0 h-[200rpx]" :style="{ background: 'radial-gradient(circle at top, rgba(var(--wot-color-theme-rgb),0.15), transparent 55%)' }" />
    <view class="pointer-events-none absolute inset-0 z-0 opacity-3" :style="{ background: `repeating-linear-gradient(45deg, transparent, transparent 40rpx, var(--wot-color-theme) 40rpx, var(--wot-color-theme) 80rpx), repeating-linear-gradient(-45deg, transparent, transparent 40rpx, var(--wot-color-theme) 40rpx, var(--wot-color-theme) 80rpx)` }" />
    <!-- #endif -->
    <!-- #ifdef MP-WEIXIN -->
    <view class="pointer-events-none absolute inset-x-0 top-0 z-0 h-[200rpx]" :style="{ background: 'linear-gradient(to bottom, rgba(46, 213, 115, 0.2), transparent 100%)' }" />
    <view class="pointer-events-none absolute inset-0 z-0 opacity-2" :style="{ background: 'repeating-linear-gradient(45deg, transparent, transparent 40rpx, #2ED573 40rpx, #2ED573 80rpx), repeating-linear-gradient(-45deg, transparent, transparent 40rpx, #2ED573 40rpx, #2ED573 80rpx)' }" />
    <!-- #endif -->

    <!-- 页面内容 -->
    <view class="relative z-10 flex flex-col">
      <!-- 自定义Header头部 -->
      <!-- #ifdef H5 -->
      <view
        class="relative z-50 flex items-center justify-between border-b border-white/10 px-[24rpx] pb-[12rpx]"
        :style="{ paddingTop: `${statusBarHeight + 12}px`, background: 'linear-gradient(to bottom, rgba(46, 213, 115, 0.12) 0%, transparent 100%)' }"
      >
        <view class="flex items-center gap-[12rpx]">
          <text class="i-carbon:map text-[36rpx] text-primary" />
          <text class="text-[32rpx] font-700 tracking-[1px]" :style="{ color: '#2ED573' }">骑行地图</text>
        </view>
        <view class="flex items-center gap-[8rpx] rounded-[10rpx] bg-card/50 px-[16rpx] py-[10rpx]">
          <text class="i-carbon:information text-[24rpx] text-primary" />
          <text class="text-[22rpx] text-white/80 font-500">安全骑行</text>
        </view>
      </view>
      <!-- #endif -->
      <!-- #ifdef MP-WEIXIN -->
      <view
        class="relative z-50 flex items-center justify-between border-b border-white/10 px-[32rpx] pb-[12rpx]"
        :style="{ paddingTop: `${statusBarHeight + 12}px`, background: 'linear-gradient(to bottom, rgba(46, 213, 115, 0.15) 0%, transparent 100%)' }"
      >
        <view class="flex items-center gap-[12rpx]">
          <text class="i-carbon:map text-[36rpx] text-primary" />
          <text class="text-[32rpx] font-700 tracking-[1px]" :style="{ color: '#2ED573' }">骑行地图</text>
        </view>
        <view class="flex items-center gap-[8rpx] rounded-[10rpx] bg-card/50 px-[16rpx] py-[10rpx]">
          <text class="i-carbon:information text-[24rpx] text-primary" />
          <text class="text-[22rpx] text-white/80 font-500">安全骑行</text>
        </view>
      </view>
      <!-- #endif -->

      <!-- 安全温馨提示横幅 -->
      <view v-if="showComplianceTip" class="mx-[24rpx] mt-[12rpx]">
        <view class="bg-warning/10 border border-warning/30 rounded-[16rpx] px-[20rpx] py-[12rpx] flex items-start gap-[12rpx] shadow-sm">
          <text class="i-carbon:warning text-[26rpx] text-primary flex-shrink-0 mt-[2rpx]" />
          <view class="flex-1">
            <text class="text-[20rpx] text-white/90 leading-[1.4]">温馨提示：路线信息由摩友分享，出行请遵守交通规则</text>
          </view>
          <text class="i-carbon:close text-[24rpx] text-gray flex-shrink-0 mt-[2rpx]" @click="closeComplianceTip" />
        </view>
      </view>

      <!-- 骑行中横幅 -->
      <view v-if="isRiding" class="mx-[24rpx] mt-[12rpx] bg-gradient-to-r from-primary/25 to-primary/10 px-[24rpx] py-[14rpx] rounded-[20rpx] border border-primary/20 shadow-lg">
        <view class="flex items-center justify-between">
          <view class="flex items-center gap-[12rpx]">
            <!-- #ifdef H5 -->
            <view class="w-[14rpx] h-[14rpx] bg-primary rounded-full animate-pulse" />
            <!-- #endif -->
            <!-- #ifdef MP-WEIXIN -->
            <view class="w-[14rpx] h-[14rpx] bg-primary rounded-full" />
            <!-- #endif -->
            <!-- #ifdef H5 -->
            <text class="text-[24rpx] text-primary font-600 animate-pulse flex items-center gap-[6rpx]">
              <text class="i-carbon:car text-[24rpx]" />
              骑行中
            </text>
            <!-- #endif -->
            <!-- #ifdef MP-WEIXIN -->
            <text class="text-[24rpx] text-primary font-600 flex items-center gap-[6rpx]">
              <text class="i-carbon:car text-[24rpx]" />
              骑行中
            </text>
            <!-- #endif -->
            <text class="text-[24rpx] text-white font-600 ml-[8rpx]">{{ formattedDuration }}</text>
          </view>
          <wd-button type="primary" size="small" custom-class="rounded-[24rpx] font-600" @click="confirmEndRide">
            <view class="flex items-center gap-[4rpx]">
              <text class="i-carbon:car text-[20rpx]" />
              <text class="text-[20rpx]">结束骑行</text>
            </view>
          </wd-button>
        </view>
      </view>

      <!-- ================================================ -->
      <!-- 微信小程序地图模块（免费无Key） -->
      <!-- ================================================ -->
      <!-- #ifdef MP-WEIXIN -->
      <view class="mx-[24rpx] mt-[12rpx] rounded-[20rpx] overflow-hidden border border-white/10 shadow-lg">
        <map
          class="w-full"
          :style="{ height: '320rpx' }"
          :latitude="mapCenter.latitude"
          :longitude="mapCenter.longitude"
          :scale="mapScale"
          :markers="markers"
          :show-location="true"
          @markertap="onMapMarkerTap"
        />
        <view class="bg-[var(--wot-color-bg-card)] px-[16rpx] py-[10rpx] flex items-center justify-between">
          <view class="flex items-center gap-[8rpx]">
            <text class="i-carbon:location text-[22rpx] text-primary" />
            <text class="text-[20rpx] text-white/80">点击标记跳转导航</text>
          </view>
          <view class="flex items-center gap-[6rpx]">
            <text class="i-carbon:drone text-[20rpx] text-gray" />
            <text class="text-[18rpx] text-gray">{{ markers?.length || 0 }}个打卡点</text>
          </view>
        </view>
      </view>
      <!-- #endif -->
      <!-- #ifndef MP-WEIXIN -->
      <!-- H5端地图占位 -->
      <view class="mx-[24rpx] mt-[12rpx] rounded-[20rpx] overflow-hidden border border-white/10 shadow-lg bg-[var(--wot-color-bg-card)]">
        <view class="flex flex-col items-center justify-center" :style="{ height: '280rpx' }">
          <text class="i-carbon:map text-[80rpx] text-primary/50 mb-[12rpx]" />
          <text class="text-[24rpx] text-white/60 font-500">地图预览</text>
          <text class="text-[20rpx] text-gray/60 mt-[8rpx]">小程序内可查看完整地图</text>
        </view>
        <view class="bg-[var(--wot-color-bg-card)] px-[16rpx] py-[10rpx] flex items-center justify-between border-t border-white/5">
          <view class="flex items-center gap-[8rpx]">
            <text class="i-carbon:information text-[22rpx] text-primary" />
            <text class="text-[20rpx] text-white/80">请在微信小程序中查看地图</text>
          </view>
        </view>
      </view>
      <!-- #endif -->

      <!-- 热门路线推荐（顶部横向小卡片） -->
      <view class="mt-[16rpx] px-[24rpx]">
        <view class="flex justify-between items-center mb-[10rpx]">
          <text class="text-[28rpx] font-600 text-white flex items-center gap-[6rpx]">
            <text class="i-carbon:fire text-[24rpx] text-primary" />
            热门推荐
          </text>
        </view>
        <!-- #ifdef H5 -->
        <view class="overflow-x-auto whitespace-nowrap pb-[4rpx] [&::-webkit-scrollbar]:hidden">
          <view
            v-for="route in hotRoutes"
            :key="route.id"
            class="inline-block w-[280rpx] mr-[16rpx] bg-[var(--wot-color-bg-card)] rounded-[20rpx] p-[16rpx] shadow-lg border border-white/5 align-top overflow-hidden"
            @click="handleRouteSelect(route)"
          >
            <view class="flex items-start justify-between mb-[8rpx]">
              <text class="text-[26rpx] font-600 text-white flex-1 line-clamp-1">{{ route.name }}</text>
              <view
                class="px-[10rpx] py-[4rpx] rounded-[8rpx] text-[16rpx] font-500 flex-shrink-0 ml-[8rpx]"
                :style="{ backgroundColor: DIFFICULTY_CONFIG[route.difficulty]?.bgColor, color: DIFFICULTY_CONFIG[route.difficulty]?.color }"
              >
                {{ DIFFICULTY_CONFIG[route.difficulty]?.label }}
              </view>
            </view>
            <view class="flex items-center gap-[8rpx] mb-[10rpx]">
              <text class="i-carbon:distance text-[16rpx] text-gray" />
              <text class="text-[18rpx] text-gray">{{ route.distance }}km</text>
              <text class="text-[18rpx] text-gray/50">|</text>
              <text class="i-carbon:location text-[16rpx] text-gray" />
              <text class="text-[18rpx] text-gray">{{ route.spots?.length || 0 }}点</text>
            </view>
            <view class="w-full h-[48rpx]">
              <wd-button
                type="primary"
                size="small"
                custom-class="w-full rounded-[18rpx] font-600"
                @click.stop="handleNavigateToRoute(route)"
              >
                <view class="flex items-center justify-center gap-[6rpx]">
                  <text class="i-carbon:direction-straight-right text-[20rpx]" />
                  <text class="text-[22rpx]">导航</text>
                </view>
              </wd-button>
            </view>
          </view>
        </view>
        <!-- #endif -->
        <!-- #ifndef H5 -->
        <scroll-view scroll-x enable-flex page-scroll-y="false"  class="flex gap-[16rpx] pb-[4rpx] whitespace-nowrap h-[80rpx]">
          <view
            v-for="route in hotRoutes"
            :key="route.id"
            class="flex-shrink-0 w-[280rpx] bg-[var(--wot-color-bg-card)] rounded-[20rpx] p-[16rpx] shadow-lg border border-white/5 overflow-hidden"
            @click="handleRouteSelect(route)"
          >
            <view class="flex items-start justify-between mb-[8rpx]">
              <text class="text-[26rpx] font-600 text-white flex-1 line-clamp-1">{{ route.name }}</text>
              <view
                class="px-[10rpx] py-[4rpx] rounded-[8rpx] text-[16rpx] font-500 flex-shrink-0 ml-[8rpx]"
                :style="{ backgroundColor: DIFFICULTY_CONFIG[route.difficulty]?.bgColor, color: DIFFICULTY_CONFIG[route.difficulty]?.color }"
              >
                {{ DIFFICULTY_CONFIG[route.difficulty]?.label }}
              </view>
            </view>
            <view class="flex items-center gap-[8rpx] mb-[10rpx]">
              <text class="i-carbon:distance text-[16rpx] text-gray" />
              <text class="text-[18rpx] text-gray">{{ route.distance }}km</text>
              <text class="text-[18rpx] text-gray/50">|</text>
              <text class="i-carbon:location text-[16rpx] text-gray" />
              <text class="text-[18rpx] text-gray">{{ route.spots?.length || 0 }}点</text>
            </view>
            <view class="w-full">
              <wd-button
                type="primary"
                size="small"
                custom-class="w-full rounded-[18rpx] font-600"
                @click.stop="handleNavigateToRoute(route)"
              >
                <view class="flex items-center justify-center gap-[6rpx]">
                  <text class="i-carbon:direction-straight-right text-[20rpx]" />
                  <text class="text-[22rpx]">导航</text>
                </view>
              </wd-button>
            </view>
          </view>
        </scroll-view>
        <!-- #endif -->
      </view>

      <!-- 筛选入口按钮 -->
      <view class="mt-[16rpx] px-[24rpx] flex gap-[16rpx]">
        <!-- 类型筛选 -->
        <view class="relative flex-1" @click="openTypeFilter">
          <wd-button
            type="info"
            size="medium"
            custom-class="w-full rounded-[20rpx] font-500 border border-white/10"
          >
            <view class="flex items-center justify-center gap-[8rpx]">
              <text class="i-carbon:tag text-[24rpx]" />
              <text class="text-[24rpx]">类型筛选</text>
              <text v-if="hasTypeFilter" class="i-carbon:checkmark text-[20rpx] text-success" />
            </view>
          </wd-button>
          <view
            v-if="hasTypeFilter"
            class="absolute -top-[8rpx] -right-[8rpx] w-[28rpx] h-[28rpx] bg-red-500 rounded-full flex items-center justify-center"
          >
            <text class="text-[16rpx] text-white font-600">{{ selectedSpotTypes.length }}</text>
          </view>
        </view>
        <!-- 区域筛选 -->
        <view class="relative flex-1" @click="openRegionFilter">
          <wd-button
            type="info"
            size="medium"
            custom-class="w-full rounded-[20rpx] font-500 border border-white/10"
          >
            <view class="flex items-center justify-center gap-[8rpx]">
              <text class="i-carbon:map text-[24rpx]" />
              <text class="text-[24rpx]">区域筛选</text>
              <text v-if="hasRegionFilter" class="i-carbon:checkmark text-[20rpx] text-success" />
            </view>
          </wd-button>
          <view
            v-if="hasRegionFilter"
            class="absolute -top-[8rpx] -right-[8rpx] w-[28rpx] h-[28rpx] bg-red-500 rounded-full flex items-center justify-center"
          >
            <text class="text-[16rpx] text-white font-600">1</text>
          </view>
        </view>
      </view>

      <!-- 类型筛选弹窗 -->
      <wd-popup
      lazy-render
        v-model="showTypeFilter"
        position="bottom"
        custom-class="rounded-t-[32rpx] overflow-hidden"
        :close-on-click-modal="true"
      >
        <view class="bg-[var(--wot-color-bg-card)] px-[32rpx] py-[24rpx]">
          <!-- 弹窗标题 -->
          <view class="flex items-center justify-between mb-[24rpx]">
            <text class="text-[32rpx] font-700 text-white">选择类型</text>
            <view class="flex items-center gap-[16rpx]">
              <text
                v-if="hasTypeFilter"
                class="text-[24rpx] text-gray"
                @click="clearFilters"
              >
                一键清空
              </text>
              <text class="i-carbon:close text-[32rpx] text-gray" @click="showTypeFilter = false" />
            </view>
          </view>
          <!-- 类型选项 -->
          <view class="flex flex-wrap gap-[16rpx]">
            <wd-button
              v-for="type in spotTypes"
              :key="type"
              :type="activeSpotTypes.includes(type) ? 'primary' : 'info'"
              size="medium"
              custom-class="rounded-[24rpx] font-500 px-[24rpx] py-[16rpx]"
              @click="toggleSpotType(type)"
            >
              <view class="flex items-center gap-[8rpx]">
                <text :class="SPOT_TYPE_ICONS[type]" class="text-[24rpx]" />
                <text class="text-[24rpx]">{{ SPOT_TYPE_CONFIG[type as SpotType]?.label }}</text>
              </view>
            </wd-button>
          </view>
          <!-- 确认按钮 -->
          <view class="mt-[32rpx]">
            <wd-button
              type="primary"
              size="large"
              custom-class="w-full rounded-[24rpx] font-600"
              @click="confirmTypeFilter"
            >
              <text class="text-[28rpx]">确定</text>
            </wd-button>
          </view>
        </view>
      </wd-popup>

      <!-- 区域筛选弹窗 -->
      <wd-popup
      lazy-render
        v-model="showRegionFilter"
        position="bottom"
        custom-class="rounded-t-[32rpx] overflow-hidden"
        :close-on-click-modal="true"
      >
        <view class="bg-[var(--wot-color-bg-card)] px-[32rpx] py-[24rpx]">
          <!-- 弹窗标题 -->
          <view class="flex items-center justify-between mb-[24rpx]">
            <text class="text-[32rpx] font-700 text-white">选择区域</text>
            <view class="flex items-center gap-[16rpx]">
              <text
                v-if="hasRegionFilter"
                class="text-[24rpx] text-gray"
                @click="clearFilters"
              >
                一键清空
              </text>
              <text class="i-carbon:close text-[32rpx] text-gray" @click="showRegionFilter = false" />
            </view>
          </view>
          <!-- 区域选项 -->
          <view class="flex flex-wrap gap-[16rpx]">
            <wd-button
              v-for="region in regions"
              :key="region.key"
              :type="selectedRegion === region.key ? 'warning' : 'info'"
              size="medium"
              custom-class="rounded-[24rpx] font-500 px-[24rpx] py-[16rpx]"
              @click="setRegion(region.key); confirmRegionFilter()"
            >
              <view class="flex items-center gap-[8rpx]">
                <text :class="REGION_ICONS[region.key] || 'i-carbon:location'" class="text-[24rpx]" />
                <text class="text-[24rpx]">{{ region.label }}</text>
              </view>
            </wd-button>
          </view>
        </view>
      </wd-popup>

      <!-- 路线列表 -->
      <view class="mt-[14rpx] flex-1 px-[24rpx] pb-[20rpx]">
        <view class="flex justify-between items-center mb-[10rpx]">
          <text class="text-[28rpx] font-600 text-white flex items-center gap-[6rpx]">
            <text class="i-carbon:list text-[24rpx] text-primary" />
            路线列表
          </text>
          <wd-button
            v-if="selectedSpotTypes.length > 0 || selectedRegion"
            type="info"
            size="small"
            custom-class="rounded-[18rpx] font-500"
            @click="clearFilters"
          >
            <view class="flex items-center gap-[4rpx]">
              <text class="i-carbon:close text-[18rpx]" />
              <text class="text-[18rpx]">清除</text>
            </view>
          </wd-button>
        </view>
        <view class="space-y-[12rpx]">
          <map-RouteCard
            v-for="route in routes"
            :key="route.id"
            :route="route"
            :is-selected="currentRoute?.id === route.id"
            @select="handleRouteSelect"
            @navigate="handleNavigateToRoute"
          />
        </view>

        <!-- 空状态 -->
        <view v-if="routes.length === 0 && !loading" class="flex flex-col items-center justify-center py-[60rpx]">
          <text class="i-carbon:search text-[80rpx] text-gray/40 mb-[12rpx]" />
          <text class="text-[24rpx] text-gray/70 font-500">暂无符合条件的路线</text>
          <text class="text-[20rpx] text-gray/50 mt-[6rpx]">切换筛选条件试试</text>
        </view>
      </view>

      <!-- 打卡点详情底部弹出 -->
      <map-SpotSheet
        :visible="!!currentSpot"
        :spot="currentSpot"
        @close="handleSpotClose"
        @navigate="handleNavigateToSpot"
      />

      <!-- 海报弹窗 -->
      <ride-RidePoster
        :visible="showPoster"
        :record="completedRecord"
        @close="closePoster"
      />

      <!-- 底部合规声明 -->
      <view class="px-[20rpx] py-[12rpx]">
        <text class="text-[18rpx] text-gray/50 text-center block">
          骑行记录仅本地存储 · 地图仅作路线参考 · 遵守交通法规
        </text>
      </view>
    </view>
  </view>
</template>
