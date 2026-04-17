<script setup lang="ts">
/**
 * 骑行地图页面
 * 合规优先：路线信息由摩友分享，骑行记录仅本地存储
 * 全端兼容：无地图Key依赖，导航跳转第三方APP
 */
import type { SpotType, RideRoute, CheckInSpot } from '@/types'
import { SPOT_TYPE_CONFIG, DIFFICULTY_CONFIG } from '@/types'

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
  selectedDifficulty,
  mapViewHeight,
  listHeight,
  isRiding,
  formattedDuration,
  showPoster,
  completedRecord,
  toggleSpotType,
  setDifficulty,
  clearFilters,
  confirmStartRide,
  confirmEndRide,
  handleRouteSelect,
  handleSpotClose,
  closePoster,
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

const spotTypes: SpotType[] = ['scenic', 'food', 'coffee', 'photo', 'drone']

const activeSpotTypes = computed(() => selectedSpotTypes.value)

const difficultyList = computed(() => {
  return Object.entries(DIFFICULTY_CONFIG).map(([key, config]) => ({
    key,
    ...config,
  }))
})
</script>

<template>
  <view class="relative min-h-screen overflow-hidden bg-gradient-to-br from-base via-[var(--wot-color-bg-hover)] to-[var(--wot-color-bg-card)]">
    <!-- 背景装饰 -->
    <!-- #ifdef H5 -->
    <view class="animate-breathe pointer-events-none absolute inset-x-0 top-0 z-0 h-[240rpx]" :style="{ background: 'radial-gradient(circle at top, rgba(var(--wot-color-theme-rgb),0.18), transparent 55%)' }" />
    <view class="pointer-events-none absolute inset-0 z-0 opacity-5" :style="{ background: `repeating-linear-gradient(45deg, transparent, transparent 40rpx, var(--wot-color-theme) 40rpx, var(--wot-color-theme) 80rpx), repeating-linear-gradient(-45deg, transparent, transparent 40rpx, var(--wot-color-theme) 40rpx, var(--wot-color-theme) 80rpx)` }" />
    <!-- #endif -->
    <!-- #ifdef MP-WEIXIN -->
    <view class="pointer-events-none absolute inset-x-0 top-0 z-0 h-[240rpx]" :style="{ background: 'linear-gradient(to bottom, rgba(46, 213, 115, 0.25), transparent 100%)' }" />
    <view class="pointer-events-none absolute inset-0 z-0 opacity-3" :style="{ background: 'repeating-linear-gradient(45deg, transparent, transparent 40rpx, #2ED573 40rpx, #2ED573 80rpx), repeating-linear-gradient(-45deg, transparent, transparent 40rpx, #2ED573 40rpx, #2ED573 80rpx)' }" />
    <!-- #endif -->

    <!-- 合规提示横幅 -->
    <view class="px-[24rpx] pt-[16rpx]">
      <view class="bg-warning/10 border border-warning/30 rounded-[12rpx] px-[20rpx] py-[12rpx] flex items-center gap-[12rpx]">
        <text class="i-carbon:warning text-[28rpx] text-white flex-shrink-0" />
        <text class="text-[20rpx] text-white flex-1 leading-[1.4]">温馨提示：路线信息由摩友分享，出行请遵守交通规则，安全骑行</text>
      </view>
    </view>

    <!-- 页面内容 -->
    <view class="relative z-10 flex flex-col" :style="{ paddingTop: `${statusBarHeight}px` }">
      <!-- 骑行中横幅 -->
      <view v-if="isRiding" class="mx-[24rpx] mt-[16rpx] bg-primary/20 px-[24rpx] py-[16rpx] rounded-[12rpx]">
        <view class="flex items-center justify-between">
          <view class="flex items-center gap-[12rpx]">
            <!-- #ifdef H5 -->
            <view class="w-[16rpx] h-[16rpx] bg-primary rounded-full animate-pulse" />
            <!-- #endif -->
            <!-- #ifdef MP-WEIXIN -->
            <view class="w-[16rpx] h-[16rpx] bg-primary rounded-full" />
            <!-- #endif -->
            <!-- #ifdef H5 -->
            <text class="text-[26rpx] text-primary font-600 animate-pulse">骑行中</text>
            <!-- #endif -->
            <!-- #ifdef MP-WEIXIN -->
            <text class="text-[26rpx] text-primary font-600">骑行中</text>
            <!-- #endif -->
            <text class="text-[26rpx] text-white font-600">{{ formattedDuration }}</text>
          </view>
          <wd-button type="primary" size="small" custom-class="rounded-[24rpx]" @click="confirmEndRide">
            结束骑行
          </wd-button>
        </view>
      </view>

      <!-- 路线预览区域 -->
      <view class="w-full" :style="{ height: mapViewHeight }">
        <!-- 当前选中路线详情 -->
        <view v-if="currentRoute" class="bg-card mx-[16rpx] mt-[16rpx] px-[24rpx] py-[20rpx] rounded-[24rpx]">
          <view class="flex justify-between items-start mb-[16rpx]">
            <view class="flex-1">
              <text class="text-[32rpx] font-600 text-white block">{{ currentRoute.name }}</text>
              <view class="flex items-center gap-[16rpx] mt-[8rpx]">
                <text class="text-[24rpx] text-gray">{{ currentRoute.distance }}km</text>
                <text class="text-[24rpx] text-gray">|</text>
                <text class="text-[24rpx] text-gray">{{ currentRoute.duration }}分钟</text>
                <view
                  class="px-[10rpx] py-[4rpx] rounded-[6rpx] text-[20rpx]"
                  :style="{ backgroundColor: DIFFICULTY_CONFIG[currentRoute.difficulty]?.bgColor, color: DIFFICULTY_CONFIG[currentRoute.difficulty]?.color }"
                >
                  {{ DIFFICULTY_CONFIG[currentRoute.difficulty]?.label }}
                </view>
              </view>
            </view>
            <wd-button
              type="primary"
              size="small"
              custom-class="rounded-[24rpx]"
              @click="handleNavigateToRoute(currentRoute)"
            >
              <view class="flex items-center gap-[4rpx]">
                <text class="i-carbon:navigation text-[26rpx]" />
                <text class="text-[26rpx]">导航</text>
              </view>
            </wd-button>
          </view>

          <!-- 路线节点列表 -->
          <view class="border-t border-base pt-[16rpx]">
            <text class="text-[22rpx] text-gray mb-[12rpx] block">途经打卡点</text>
            <scroll-view scroll-x class="flex gap-[12rpx]">
              <view
                v-for="(spot, index) in currentRoute.spots"
                :key="spot.id"
                class="flex-shrink-0 flex items-center gap-[8rpx] px-[16rpx] py-[10rpx] bg-base rounded-[12rpx]"
              >
                <view
                  class="w-[32rpx] h-[32rpx] rounded-full flex items-center justify-center text-[20rpx]"
                  :style="{ backgroundColor: SPOT_TYPE_CONFIG[spot.type]?.color || '#2ED573' }"
                >
                  {{ index + 1 }}
                </view>
                <text class="text-[24rpx] text-white">{{ spot.name }}</text>
              </view>
            </scroll-view>
          </view>
        </view>

        <!-- 无选中路线 - 显示地图占位 -->
        <view v-else class="w-full h-full flex flex-col items-center justify-center">
          <!-- #ifdef H5 -->
          <text class="i-carbon:map text-[100rpx] text-gray/40 mb-[16rpx]" />
          <!-- #endif -->
          <!-- #ifdef MP-WEIXIN -->
          <text class="i-carbon:map text-[100rpx] text-gray/40 mb-[16rpx]" />
          <!-- #endif -->
          <text class="text-[26rpx] text-gray">选择一个路线开始骑行</text>
          <text class="text-[22rpx] text-gray/60 mt-[8rpx]">从下方列表选择路线，点击导航开始</text>
        </view>
      </view>

      <!-- 筛选标签栏 -->
      <view class="bg-card mx-[16rpx] my-[16rpx] px-[20rpx] py-[16rpx] rounded-[24rpx]">
        <!-- 类型筛选 -->
        <scroll-view scroll-x class="flex gap-[8rpx]">
          <wd-button
            v-for="type in spotTypes"
            :key="type"
            :type="activeSpotTypes.includes(type) ? 'primary' : 'info'"
            size="small"
            custom-class="flex-shrink-0 rounded-[24rpx]"
            @click="toggleSpotType(type)"
          >
            {{ SPOT_TYPE_CONFIG[type].label }}
          </wd-button>
        </scroll-view>

        <!-- 难度筛选 -->
        <view class="flex gap-[8rpx] mt-[12rpx]">
          <wd-button
            v-for="item in difficultyList"
            :key="item.key"
            :type="selectedDifficulty === item.key ? 'warning' : 'info'"
            size="small"
            custom-class="rounded-[24rpx]"
            @click="setDifficulty(item.key)"
          >
            {{ item.label }}
          </wd-button>

          <view class="flex-1" />

          <wd-button
            v-if="selectedSpotTypes.length > 0 || selectedDifficulty"
            type="info"
            size="small"
            custom-class="rounded-[24rpx]"
            @click="clearFilters"
          >
            清除
          </wd-button>
        </view>
      </view>

      <!-- 路线列表 -->
      <scroll-view scroll-y class="flex-1 px-[16rpx] py-[12rpx] overflow-hidden" :style="{ height: listHeight }">
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
        <view v-if="routes.length === 0 && !loading" class="flex flex-col items-center justify-center py-[80rpx]">
          <text class="i-carbon:map text-[100rpx] text-gray mb-[16rpx]" />
          <text class="text-[28rpx] text-gray">暂无符合条件的路线</text>
          <text class="text-[24rpx] text-gray mt-[8rpx]">切换筛选条件试试</text>
        </view>
      </scroll-view>

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
        <text class="text-[18rpx] text-gray text-center block">
          骑行记录仅本地存储 · 地图仅作路线参考 · 遵守交通法规
        </text>
      </view>
    </view>
  </view>
</template>
