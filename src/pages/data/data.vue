<script setup lang="ts">
definePage({
  name: 'data',
  layout: 'tabbar',
  style: {
    navigationBarTitleText: '骑行数据',
    navigationBarBackgroundColor: '#121212',
    navigationBarTextStyle: 'white',
  },
})

import { ref, onMounted } from 'vue'

// 骑行统计数据
const rideStats = ref({
  totalDistance: 1286, // 总骑行距离（公里）
  totalDays: 45, // 总骑行天数
  totalRoutes: 12, // 总骑行路线
  averageSpeed: 32, // 平均速度（km/h）
  totalCalories: 8500, // 总消耗卡路里
  longestRide: 85, // 最长单次骑行（公里）
})

// 月度骑行数据
const monthlyData = ref({
  labels: ['1月', '2月', '3月', '4月', '5月', '6月'],
  distances: [120, 180, 210, 250, 280, 246],
  days: [5, 8, 10, 12, 15, 10],
})

// 骑行类型分布
const rideTypeData = ref({
  labels: ['休闲骑', '通勤', '长途摩旅', '夜骑', '晨骑'],
  data: [45, 25, 15, 10, 5],
  colors: ['#2ED573', '#FF7A00', '#FF4757', '#3742FA', '#70A1FF'],
})

// 骑行记录
const rideRecords = ref([
  {
    id: '1',
    date: '2026-04-15',
    distance: 45,
    duration: 120,
    route: '古城环线',
    averageSpeed: 22.5,
    calories: 320,
  },
  {
    id: '2',
    date: '2026-04-10',
    distance: 32,
    duration: 85,
    route: '汉江沿岸',
    averageSpeed: 22.6,
    calories: 240,
  },
  {
    id: '3',
    date: '2026-04-05',
    distance: 28,
    duration: 70,
    route: '隆中景区',
    averageSpeed: 24.0,
    calories: 200,
  },
  {
    id: '4',
    date: '2026-03-28',
    distance: 56,
    duration: 150,
    route: '襄阳至武当山',
    averageSpeed: 22.4,
    calories: 420,
  },
  {
    id: '5',
    date: '2026-03-20',
    distance: 35,
    duration: 95,
    route: '古城环线',
    averageSpeed: 22.1,
    calories: 260,
  },
])

// 初始化图表
function initCharts() {
  // 这里将在后续集成ECharts时实现
  console.log('初始化图表')
}

onMounted(() => {
  initCharts()
})
</script>

<template>
  <view class="min-h-screen bg-base">
    <!-- 统计卡片 -->
    <view class="p-[24rpx] space-y-[16rpx]">
      <text class="text-[32rpx] font-700 text-white">骑行统计</text>
      
      <view class="grid grid-cols-2 gap-[16rpx]">
        <view class="bg-card rounded-[12rpx] p-[20rpx] shadow-lg">
          <text class="text-[20rpx] text-gray">总骑行距离</text>
          <text class="text-[36rpx] font-700 text-white mt-[8rpx] block">{{ rideStats.totalDistance }} km</text>
          <text class="text-[18rpx] text-success mt-[8rpx] block">+12% 较上月</text>
        </view>
        
        <view class="bg-card rounded-[12rpx] p-[20rpx] shadow-lg">
          <text class="text-[20rpx] text-gray">总骑行天数</text>
          <text class="text-[36rpx] font-700 text-white mt-[8rpx] block">{{ rideStats.totalDays }} 天</text>
          <text class="text-[18rpx] text-success mt-[8rpx] block">+8% 较上月</text>
        </view>
        
        <view class="bg-card rounded-[12rpx] p-[20rpx] shadow-lg">
          <text class="text-[20rpx] text-gray">总骑行路线</text>
          <text class="text-[36rpx] font-700 text-white mt-[8rpx] block">{{ rideStats.totalRoutes }} 条</text>
          <text class="text-[18rpx] text-success mt-[8rpx] block">+5% 较上月</text>
        </view>
        
        <view class="bg-card rounded-[12rpx] p-[20rpx] shadow-lg">
          <text class="text-[20rpx] text-gray">平均速度</text>
          <text class="text-[36rpx] font-700 text-white mt-[8rpx] block">{{ rideStats.averageSpeed }} km/h</text>
          <text class="text-[18rpx] text-warning mt-[8rpx] block">+2% 较上月</text>
        </view>
      </view>
    </view>
    
    <!-- 图表区域 -->
    <view class="p-[24rpx] space-y-[24rpx]">
      <!-- 月度骑行趋势 -->
      <view class="bg-card rounded-[12rpx] p-[20rpx] shadow-card">
        <text class="text-[24rpx] font-600 text-white mb-[20rpx] block">月度骑行趋势</text>
        <view class="h-[300rpx] bg-bg-base rounded-[8rpx] flex items-center justify-center">
          <text class="text-gray">月度骑行数据图表</text>
        </view>
      </view>
      
      <!-- 骑行类型分布 -->
      <view class="bg-card rounded-[12rpx] p-[20rpx] shadow-card">
        <text class="text-[24rpx] font-600 text-white mb-[20rpx] block">骑行类型分布</text>
        <view class="h-[300rpx] bg-bg-base rounded-[8rpx] flex items-center justify-center">
          <text class="text-gray">骑行类型分布图表</text>
        </view>
      </view>
    </view>
    
    <!-- 骑行记录 -->
    <view class="p-[24rpx]">
      <text class="text-[32rpx] font-700 text-white mb-[20rpx] block">骑行记录</text>
      
      <view class="space-y-[16rpx]">
        <view
          v-for="record in rideRecords"
          :key="record.id"
          class="bg-card rounded-[12rpx] p-[20rpx] shadow-card transition-all duration-100 active:scale-95"
        >
          <view class="flex justify-between items-start">
            <text class="text-[24rpx] font-600 text-white">{{ record.route }}</text>
            <text class="text-[20rpx] text-gray">{{ record.date }}</text>
          </view>
          
          <view class="flex items-center gap-[24rpx] mt-[12rpx]">
            <view class="flex items-center gap-[4rpx]">
              <wd-icon name="distance" size="20rpx" color="#8D99AE" />
              <text class="text-[20rpx] text-gray">{{ record.distance }}公里</text>
            </view>
            <view class="flex items-center gap-[4rpx]">
              <wd-icon name="time" size="20rpx" color="#8D99AE" />
              <text class="text-[20rpx] text-gray">{{ record.duration }}分钟</text>
            </view>
            <view class="flex items-center gap-[4rpx]">
              <wd-icon name="speedometer" size="20rpx" color="#8D99AE" />
              <text class="text-[20rpx] text-gray">{{ record.averageSpeed }}km/h</text>
            </view>
          </view>
        </view>
      </view>
    </view>
    
    <!-- 底部导出按钮 -->
    <view class="fixed bottom-[20rpx] left-[24rpx] right-[24rpx]">
      <button
        class="w-full bg-primary text-white rounded-[12rpx] py-[20rpx] text-[24rpx] font-600"
      >
        导出骑行数据
      </button>
    </view>
  </view>
</template>


