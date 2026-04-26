<script setup lang="ts">
/**
 * 骑行地图页面
 * 合规优先：路线信息由摩友分享，骑行记录仅本地存储
 * 全端兼容：无地图Key依赖，导航跳转第三方APP
 */
import type { SpotType, RideRoute, CheckInSpot, Coordinate } from '@/types'
import { SPOT_TYPE_CONFIG, DIFFICULTY_CONFIG, REGION_CONFIG } from '@/types'

// 辅助函数：获取打卡点类型配置
function getSpotTypeConfigForHot(type: SpotType) {
  return SPOT_TYPE_CONFIG[type] || { label: type, icon: 'i-carbon:location', color: '#8D99AE', bgColor: 'rgba(141, 153, 174, 0.15)' }
}

// 热门卡片统计打卡点类型
function getHotSpotTypeStats(route: RideRoute) {
  const stats: Record<SpotType, number> = {} as Record<SpotType, number>
  route.spots?.forEach((spot) => {
    const type = spot.type as SpotType
    stats[type] = (stats[type] || 0) + 1
  })
  return Object.entries(stats).map(([type, count]) => ({
    type: type as SpotType,
    count,
    ...getSpotTypeConfigForHot(type as SpotType),
  })).slice(0, 4)
}

// 热门卡片获取区域标签
function getHotRegionLabel(region?: string) {
  if (!region) return ''
  return REGION_CONFIG[region as keyof typeof REGION_CONFIG]?.label || ''
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
  loadRoutes,
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

// 更新类型筛选值
function updateTypeFilterValues(values: string[]) {
  selectedSpotTypes.value.splice(0, selectedSpotTypes.value.length, ...values as SpotType[])
  loadRoutes()
}

// 实时更新类型筛选
function changeTypeFilter(values: string[]) {
  selectedSpotTypes.value.splice(0, selectedSpotTypes.value.length, ...values as SpotType[])
  loadRoutes()
}

// 更新区域筛选值
function updateRegionFilterValues(values: string[]) {
  selectedRegion.value = values[0] || 'all'
  loadRoutes()
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
      <view
        class="relative z-50 flex items-center justify-between border-b border-white/10 pb-[12rpx]"
        :style="{
          paddingTop: `${statusBarHeight + 12}px`,
          paddingLeft: '24rpx',
          paddingRight: '32rpx',
          background: 'linear-gradient(to bottom, rgba(46, 213, 115, 0.15) 0%, transparent 100%)',
        }"
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



      <!-- 骑行中横幅 -->
      <view v-if="isRiding" class="mx-[24rpx] mt-[12rpx] bg-gradient-to-r from-primary/25 to-primary/10 px-[24rpx] py-[14rpx] rounded-[20rpx] border border-primary/20 shadow-lg">
        <view class="flex items-center justify-between">
          <view class="flex items-center gap-[12rpx]">
            <view class="w-[14rpx] h-[14rpx] bg-primary rounded-full" />
            <text class="text-[24rpx] text-primary font-600 flex items-center gap-[6rpx]">
              <text class="i-fluent:vehicle-motorcycle-28-filled text-[24rpx]" />
              骑行中
            </text>
            <text class="text-[24rpx] text-white font-600 ml-[8rpx]">{{ formattedDuration }}</text>
          </view>
          <wd-button type="primary" size="small" custom-class="rounded-[24rpx] font-600" @click="confirmEndRide">
            <view class="flex items-center gap-[4rpx]">
              <text class="i-fluent:vehicle-motorcycle-28-filled text-[20rpx]" />
              <text class="text-[20rpx]">结束骑行</text>
            </view>
          </wd-button>
        </view>
      </view>

      <!-- 合规提示横幅 -->
      <common-ComplianceBanner />

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
        <view class="bg-[#1E1E1E] px-[16rpx] py-[10rpx] flex items-center justify-between">
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
      <view class="mx-[24rpx] mt-[12rpx] rounded-[20rpx] overflow-hidden border border-white/10 shadow-lg bg-[#1E1E1E]">
        <view class="flex flex-col items-center justify-center" :style="{ height: '280rpx' }">
          <text class="i-carbon:map text-[80rpx] text-primary/50 mb-[12rpx]" />
          <text class="text-[24rpx] text-white/60 font-500">地图预览</text>
          <text class="text-[20rpx] text-gray/60 mt-[8rpx]">小程序内可查看完整地图</text>
        </view>
        <view class="bg-[#1E1E1E] px-[16rpx] py-[10rpx] flex items-center justify-between border-t border-white/5">
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
            <view class="flex items-start justify-between mb-[6rpx]">
              <text class="text-[26rpx] font-600 text-white flex-1 line-clamp-1">{{ route.name }}</text>
              <view
                class="px-[10rpx] py-[4rpx] rounded-[8rpx] text-[16rpx] font-500 flex-shrink-0 ml-[8rpx]"
                :style="{ backgroundColor: DIFFICULTY_CONFIG[route.difficulty]?.bgColor, color: DIFFICULTY_CONFIG[route.difficulty]?.color }"
              >
                {{ DIFFICULTY_CONFIG[route.difficulty]?.label }}
              </view>
            </view>
            <view v-if="getHotRegionLabel(route.region)" class="flex items-center gap-[4rpx] mb-[8rpx]">
              <text class="i-carbon:location text-[16rpx] text-gray" />
              <text class="text-[16rpx] text-gray">{{ getHotRegionLabel(route.region) }}</text>
            </view>
            <view class="flex flex-wrap gap-[6rpx] mb-[10rpx]">
              <view
                v-for="stat in getHotSpotTypeStats(route)"
                :key="stat.type"
                class="flex items-center gap-[2rpx] px-[8rpx] py-[3rpx] rounded-[6rpx]"
                :style="{ backgroundColor: stat.bgColor }"
              >
                <text :class="stat.icon" class="text-[14rpx]" :style="{ color: stat.color }" />
              </view>
            </view>
            <view class="w-full flex justify-center">
              <wd-button
                type="primary"
                size="small"
                custom-class="w-[160rpx] rounded-[18rpx] font-600"
                @click.stop="handleNavigateToRoute(route)"
              >导航</wd-button>
            </view>
          </view>
        </view>
        <!-- #endif -->
        <!-- #ifndef H5 -->
        <view class="flex gap-[16rpx] overflow-x-auto whitespace-nowrap pb-[4rpx] min-h-[200rpx]">
          <view
            v-for="route in hotRoutes"
            :key="route.id"
            class="flex-shrink-0 w-[280rpx] bg-[#1E1E1E] rounded-[20rpx] p-[16rpx] shadow-lg border border-white/5 overflow-hidden"
            @click="handleRouteSelect(route)"
          >
            <view class="flex items-start justify-between mb-[6rpx]">
              <text class="text-[26rpx] font-600 text-white flex-1 line-clamp-1">{{ route.name }}</text>
              <view
                class="px-[10rpx] py-[4rpx] rounded-[8rpx] text-[16rpx] font-500 flex-shrink-0 ml-[8rpx]"
                :style="{ backgroundColor: DIFFICULTY_CONFIG[route.difficulty]?.bgColor, color: DIFFICULTY_CONFIG[route.difficulty]?.color }"
              >
                {{ DIFFICULTY_CONFIG[route.difficulty]?.label }}
              </view>
            </view>
            <view v-if="getHotRegionLabel(route.region)" class="flex items-center gap-[4rpx] mb-[8rpx]">
              <text class="i-carbon:location text-[16rpx] text-gray" />
              <text class="text-[16rpx] text-gray">{{ getHotRegionLabel(route.region) }}</text>
            </view>
            <view class="flex flex-wrap gap-[6rpx] mb-[10rpx]">
              <view
                v-for="stat in getHotSpotTypeStats(route)"
                :key="stat.type"
                class="flex items-center gap-[2rpx] px-[8rpx] py-[3rpx] rounded-[6rpx]"
                :style="{ backgroundColor: stat.bgColor }"
              >
                <text :class="stat.icon" class="text-[14rpx]" :style="{ color: stat.color }" />
              </view>
            </view>
            <view class="w-full flex justify-center">
              <wd-button
                type="primary"
                size="small"
                custom-class="w-[160rpx] rounded-[18rpx] font-600"
                @click.stop="handleNavigateToRoute(route)"
              >导航</wd-button>
            </view>
          </view>
        </view>
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
      <common-FilterPopup
        v-model="showTypeFilter"
        type="type"
        :active-values="selectedSpotTypes"
        @change="changeTypeFilter"
        @clear="clearFilters"
        @confirm="confirmTypeFilter"
      />

      <!-- 区域筛选弹窗 -->
      <common-FilterPopup
        v-model="showRegionFilter"
        type="region"
        :active-values="[selectedRegion]"
        single
        @confirm="confirmRegionFilter"
        @clear="clearFilters"
        @confirm-values="updateRegionFilterValues"
      />

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
        <view class="flex flex-col gap-[12rpx]">
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
