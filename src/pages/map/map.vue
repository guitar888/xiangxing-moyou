<script setup lang="ts">
/**
 * 骑行地图页面
 * 合规优先：路线信息由摩友分享，骑行记录仅本地存储
 * 全端兼容：无地图Key依赖，导航跳转第三方APP
 */
import type { CheckInSpot, Coordinate, RideRecord, RideRoute, SpotType } from '@/types'
import { POSTER_OPEN_EVENT, rideEvents } from '@/composables/rideEvents'
import { DIFFICULTY_CONFIG, REGION_CONFIG, SPOT_TYPE_CONFIG } from '@/types'

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
  toggleSpotType,
  setRegion,
  clearFilters,
  confirmStartRide,
  confirmEndRide,
  handleRouteSelect: handleRouteSelectBase,
  handleSpotClose,
  markers,
  handleMapMarkertap,
  loadRoutes,
} = useMapData()

// 包装 handleRouteSelect，添加打开详情弹窗逻辑
function handleRouteSelect(route: RideRoute) {
  handleRouteSelectBase(route)
  currentRouteDetail.value = route
  showRouteDetail.value = true
}

// ================================================
// 海报弹窗（本地状态）
// ================================================

const showPoster = ref(false)
const completedRecord = ref<RideRecord | null>(null)

function handlePosterOpen(record: RideRecord) {
  console.log('[map.vue] handlePosterOpen 接收到:', {
    id: record.id,
    distance: record.distance,
    duration: record.duration,
    avgSpeed: record.avgSpeed,
  })
  completedRecord.value = record
  showPoster.value = true
}

function handleClosePoster() {
  showPoster.value = false
  completedRecord.value = null
}

onMounted(() => {
  rideEvents.on(POSTER_OPEN_EVENT, handlePosterOpen)
})

onUnmounted(() => {
  rideEvents.off(POSTER_OPEN_EVENT, handlePosterOpen)
})

// ================================================
// 导航逻辑
// ================================================

const { openMapNavigation } = useMapNavigation()

// 路线详情弹窗
const showRouteDetail = ref(false)
const currentRouteDetail = ref<RideRoute | null>(null)

function handleCloseRouteDetail() {
  showRouteDetail.value = false
  currentRouteDetail.value = null
}

function handleNavigateFromDetail(route: RideRoute) {
  showRouteDetail.value = false
  const firstSpot = route.spots[0]
  openMapNavigation({
    latitude: firstSpot.coordinates.latitude,
    longitude: firstSpot.coordinates.longitude,
    name: firstSpot.name,
    address: firstSpot.name,
  })
}

function handleNavigateToSpot(spot: CheckInSpot | null) {
  if (!spot)
    return
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
  <view class="relative min-h-screen overflow-hidden from-base via-[var(--wot-color-bg-hover)] to-[var(--wot-color-bg-card)] bg-gradient-to-br">
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
        class="relative z-50 flex items-center border-b border-white/10 pb-[12rpx]"
        :style="{
          paddingTop: `${statusBarHeight + 12}px`,
          paddingLeft: '24rpx',
          background: 'linear-gradient(to bottom, rgba(46, 213, 115, 0.15) 0%, transparent 100%)',
        }"
      >
        <view class="flex items-center gap-[12rpx]">
          <text class="i-carbon:map text-[36rpx] text-primary" />
          <text class="text-[32rpx] font-700 tracking-[1px]" :style="{ color: '#2ED573' }">
            骑行地图
          </text>
        </view>
      </view>

      <!-- 骑行中横幅 -->
      <view v-if="isRiding" class="mx-[24rpx] mt-[12rpx] border border-primary/20 rounded-[20rpx] from-primary to-primary/80 bg-gradient-to-r px-[24rpx] py-[14rpx] shadow-lg">
        <view class="flex items-center justify-between">
          <view class="flex items-center gap-[12rpx]">
            <view class="animate-pulse h-[14rpx] w-[14rpx] rounded-full bg-white" />
            <text class="flex items-center gap-[6rpx] text-[24rpx] text-white font-600">
              <text class="i-fluent:vehicle-motorcycle-28-filled text-[24rpx]" />
              骑行中
            </text>
            <text class="ml-[8rpx] text-[24rpx] text-white font-600">
              {{ formattedDuration }}
            </text>
          </view>
          <view class="flex items-center gap-[4rpx] rounded-[24rpx] bg-white px-[16rpx] py-[8rpx]" @click="confirmEndRide">
            <text class="i-carbon:stop-filled text-[20rpx] text-primary" />
            <text class="text-[20rpx] text-primary font-600">
              结束骑行
            </text>
          </view>
        </view>
      </view>

      <!-- 合规提示横幅 -->
      <common-ComplianceBanner />

      <!-- 开始骑行按钮（非骑行状态时显示） -->
      <view v-if="!isRiding" class="mx-[24rpx] mt-[12rpx]">
        <view
          class="relative h-[120rpx] w-full overflow-hidden rounded-[20rpx]"
          @click="confirmStartRide"
        >
          <view class="absolute inset-0 from-primary via-primary/90 to-primary/80 bg-gradient-to-r" />
          <view class="absolute inset-0 opacity-15">
            <view class="absolute h-[160rpx] w-[160rpx] border-[50rpx] border-white/20 rounded-full -right-[30rpx] -top-[30rpx]" />
            <view class="absolute h-[140rpx] w-[140rpx] border-[40rpx] border-white/10 rounded-full -bottom-[40rpx] -left-[40rpx]" />
          </view>
          <view class="relative h-full flex items-center px-[32rpx]" @click="confirmStartRide">
            <view class="flex flex-1 items-center justify-between">
              <view>
                <text class="block text-[28rpx] text-white font-600">
                  开始骑行
                </text>
                <text class="mt-[2rpx] text-[20rpx] text-white/70">
                  记录你的骑行轨迹
                </text>
              </view>
              <text class="i-carbon:play-filled text-[36rpx] text-white" />
            </view>
          </view>
        </view>
      </view>

      <!-- ================================================ -->
      <!-- 微信小程序地图模块（免费无Key） -->
      <!-- ================================================ -->
      <!-- #ifdef MP-WEIXIN -->
      <view class="mx-[24rpx] mt-[12rpx] overflow-hidden border border-white/10 rounded-[20rpx] bg-card shadow-lg">
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
        <view class="flex items-center justify-between bg-card px-[16rpx] py-[12rpx]">
          <view class="flex items-center gap-[8rpx]">
            <text class="i-carbon:location text-[22rpx] text-white" />
            <text class="text-[20rpx] text-white font-500">
              点击标记跳转导航
            </text>
          </view>
          <view class="flex items-center gap-[6rpx]">
            <text class="i-carbon:map text-[20rpx] text-white/80" />
            <text class="text-[18rpx] text-white/80">
              {{ markers?.length || 0 }}个打卡点
            </text>
          </view>
        </view>
      </view>
      <!-- #endif -->
      <!-- #ifndef MP-WEIXIN -->
      <!-- H5端地图占位 -->
      <view class="mx-[24rpx] mt-[12rpx] overflow-hidden border border-white/10 rounded-[20rpx] bg-card shadow-lg">
        <view class="flex flex-col items-center justify-center" :style="{ height: '280rpx' }">
          <text class="i-carbon:map mb-[12rpx] text-[80rpx] text-primary/50" />
          <text class="text-[24rpx] text-white/60 font-500">
            地图预览
          </text>
          <text class="mt-[8rpx] text-[20rpx] text-gray/60">
            小程序内可查看完整地图
          </text>
        </view>
        <view class="flex items-center justify-between border-t border-white/10 bg-card px-[16rpx] py-[12rpx]">
          <view class="flex items-center gap-[8rpx]">
            <text class="i-carbon:information text-[22rpx] text-white" />
            <text class="text-[20rpx] text-white font-500">
              请在微信小程序中查看地图
            </text>
          </view>
        </view>
      </view>
      <!-- #endif -->

      <!-- 筛选入口按钮 -->
      <view class="mt-[16rpx] flex gap-[16rpx] px-[24rpx]">
        <!-- 类型筛选 -->
        <view class="relative flex-1" @click="openTypeFilter">
          <wd-button
            type="info"
            size="medium"
            custom-class="w-full rounded-[20rpx] font-500 border border-white/10"
          >
            <view class="flex items-center justify-center gap-[8rpx]">
              <text class="i-carbon:tag text-[24rpx]" />
              <text class="text-[24rpx]">
                类型筛选
              </text>
              <text v-if="hasTypeFilter" class="i-carbon:checkmark text-[20rpx] text-success" />
            </view>
          </wd-button>
          <view
            v-if="hasTypeFilter"
            class="absolute h-[28rpx] w-[28rpx] flex items-center justify-center rounded-full bg-red-500 -right-[8rpx] -top-[8rpx]"
          >
            <text class="text-[16rpx] text-white font-600">
              {{ selectedSpotTypes.length }}
            </text>
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
              <text class="text-[24rpx]">
                区域筛选
              </text>
              <text v-if="hasRegionFilter" class="i-carbon:checkmark text-[20rpx] text-success" />
            </view>
          </wd-button>
          <view
            v-if="hasRegionFilter"
            class="absolute h-[28rpx] w-[28rpx] flex items-center justify-center rounded-full bg-red-500 -right-[8rpx] -top-[8rpx]"
          >
            <text class="text-[16rpx] text-white font-600">
              1
            </text>
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
        <view class="mb-[10rpx] flex items-center justify-between">
          <text class="flex items-center gap-[6rpx] text-[28rpx] text-white font-600">
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
              <text class="text-[18rpx]">
                清除
              </text>
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
          />
        </view>

        <!-- 空状态 -->
        <view v-if="routes.length === 0 && !loading" class="flex flex-col items-center justify-center py-[60rpx]">
          <text class="i-carbon:search mb-[12rpx] text-[80rpx] text-gray/40" />
          <text class="text-[24rpx] text-gray/70 font-500">
            暂无符合条件的路线
          </text>
          <text class="mt-[6rpx] text-[20rpx] text-gray/50">
            切换筛选条件试试
          </text>
        </view>
      </view>

      <!-- 打卡点详情底部弹出 -->
      <map-SpotSheet
        :visible="!!currentSpot"
        :spot="currentSpot"
        @close="handleSpotClose"
        @navigate="handleNavigateToSpot"
      />

      <!-- 路线详情弹窗 -->
      <map-RouteDetail
        v-model="showRouteDetail"
        :route="currentRouteDetail"
        @close="handleCloseRouteDetail"
        @navigate="handleNavigateFromDetail"
      />

      <!-- 海报弹窗 -->
      <ride-RidePoster
        :visible="showPoster"
        :record="completedRecord"
        @close="handleClosePoster"
      />

      <!-- 底部合规声明 -->
      <view class="px-[20rpx] py-[12rpx]">
        <text class="block text-center text-[18rpx] text-gray/50">
          骑行记录仅本地存储 · 地图仅作路线参考 · 遵守交通法规
        </text>
      </view>
    </view>
  </view>
</template>
