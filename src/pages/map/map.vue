<script setup lang="ts">
definePage({
  name: 'map',
  layout: 'tabbar',
  style: {
    navigationBarTitleText: '骑行地图',
    navigationBarBackgroundColor: '#121212',
    navigationBarTextStyle: 'white',
  },
})

import { ref, onMounted, onUnmounted } from 'vue'

const mapContext = ref<any>(null)
const loading = ref(true)
const currentLocation = ref({ latitude: 32.0603, longitude: 112.1401 }) // 襄阳中心坐标
const rideRoutes = ref([
  {
    id: '1',
    name: '古城环线',
    distance: 25,
    duration: 90,
    path: [
      { latitude: 32.0603, longitude: 112.1401 },
      { latitude: 32.0550, longitude: 112.1350 },
      { latitude: 32.0500, longitude: 112.1450 },
      { latitude: 32.0650, longitude: 112.1500 },
      { latitude: 32.0603, longitude: 112.1401 },
    ],
    description: '襄阳古城墙环线，适合晨骑和夜骑',
    difficulty: '简单',
  },
  {
    id: '2',
    name: '汉江沿岸',
    distance: 30,
    duration: 120,
    path: [
      { latitude: 32.0603, longitude: 112.1401 },
      { latitude: 32.0700, longitude: 112.1500 },
      { latitude: 32.0800, longitude: 112.1600 },
      { latitude: 32.0900, longitude: 112.1700 },
    ],
    description: '沿汉江绿道骑行，尽享江风拂面',
    difficulty: '中等',
  },
  {
    id: '3',
    name: '隆中景区',
    distance: 40,
    duration: 180,
    path: [
      { latitude: 32.0603, longitude: 112.1401 },
      { latitude: 32.0300, longitude: 112.0800 },
      { latitude: 32.0100, longitude: 112.0500 },
    ],
    description: '前往隆中景区的经典路线',
    difficulty: '中等',
  },
])

function initMap() {
  // #ifdef MP-WEIXIN
  mapContext.value = uni.createMapContext('rideMap')
  // #endif
  
  // 模拟地图加载完成
  setTimeout(() => {
    loading.value = false
  }, 1000)
}

function getLocation() {
  uni.getLocation({
    type: 'gcj02',
    success: (res) => {
      currentLocation.value = {
        latitude: res.latitude,
        longitude: res.longitude,
      }
      mapContext.value?.moveToLocation({
        latitude: res.latitude,
        longitude: res.longitude,
      })
    },
    fail: (err) => {
      console.error('获取位置失败:', err)
    },
  })
}

function selectRoute(route: any) {
  console.log('选择路线:', route)
  // 这里可以实现路线详情展示
}

onMounted(() => {
  initMap()
  getLocation()
})

onUnmounted(() => {
  // 清理地图资源
})
</script>

<template>
  <view class="min-h-screen bg-base">
    <!-- 地图容器 -->
    <view class="relative h-[500rpx] w-full">
      <map
        id="rideMap"
        class="w-full h-full"
        :latitude="currentLocation.latitude"
        :longitude="currentLocation.longitude"
        :scale="14"
        show-location
        style="opacity: 1;"
      >
        <!-- 路线标记 -->
        <template v-for="(route, index) in rideRoutes" :key="route.id">
          <polyline
            :points="route.path"
            :color="index === 0 ? '#2ED573' : index === 1 ? '#FF7A00' : '#FF4757'"
            width="4"
            arrow-line
          />
          <marker
            :latitude="route.path[0].latitude"
            :longitude="route.path[0].longitude"
            :title="route.name"
            :iconPath="'/static/logo.png'"
            :scale="0.5"
          />
        </template>
      </map>
      
      <!-- 加载遮罩 -->
      <view v-if="loading" class="absolute inset-0 bg-base/80 flex items-center justify-center">
        <text class="text-white text-[28rpx]">加载地图中...</text>
      </view>
    </view>
    
    <!-- 路线列表 -->
    <view class="p-[24rpx]">
      <text class="text-[32rpx] font-700 text-white mb-[20rpx] block">推荐路线</text>
      
      <view class="space-y-[16rpx]">
        <view
          v-for="route in rideRoutes"
          :key="route.id"
          class="bg-card rounded-[12rpx] p-[20rpx] shadow-lg transition-all duration-100 active:scale-95"
          @click="selectRoute(route)"
        >
          <view class="flex justify-between items-start">
            <text class="text-[28rpx] font-600 text-white">{{ route.name }}</text>
            <text class="text-[20rpx] px-[12rpx] py-[4rpx] rounded-[8rpx]" :class="{
              'bg-success/20 text-success': route.difficulty === '简单',
              'bg-warning/20 text-warning': route.difficulty === '中等',
              'bg-danger/20 text-danger': route.difficulty === '困难',
            }">
              {{ route.difficulty }}
            </text>
          </view>
          
          <view class="flex items-center gap-[20rpx] mt-[12rpx]">
            <view class="flex items-center gap-[4rpx]">
              <wd-icon name="distance" size="20rpx" color="#8D99AE" />
              <text class="text-[20rpx] text-gray">{{ route.distance }}公里</text>
            </view>
            <view class="flex items-center gap-[4rpx]">
              <wd-icon name="time" size="20rpx" color="#8D99AE" />
              <text class="text-[20rpx] text-gray">{{ route.duration }}分钟</text>
            </view>
          </view>
          
          <text class="text-[22rpx] text-gray mt-[12rpx] line-clamp-2">{{ route.description }}</text>
        </view>
      </view>
    </view>
    
    <!-- 底部操作栏 -->
    <view class="fixed bottom-[20rpx] left-[24rpx] right-[24rpx] flex gap-[16rpx]">
      <button
        class="flex-1 bg-primary text-white rounded-[12rpx] py-[20rpx] text-[24rpx] font-600"
        @click="getLocation"
      >
        定位当前位置
      </button>
      <button
        class="flex-1 bg-card text-white rounded-[12rpx] py-[20rpx] text-[24rpx] font-600 border border-border"
      >
        规划路线
      </button>
    </view>
  </view>
</template>


