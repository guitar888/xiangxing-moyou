<script setup lang="ts">
definePage({
  name: 'activity',
  layout: 'tabbar',
  style: {
    navigationBarTitleText: '活动接龙',
    navigationBarBackgroundColor: '#121212',
    navigationBarTextStyle: 'white',
  },
})

import { ref, computed } from 'vue'
import { useRouter } from '@wot-ui/router'

const router = useRouter()

// 活动列表数据
const activities = ref([
  {
    id: '1',
    title: '唐城追焦夜骑',
    date: '2026-04-20',
    time: '19:00',
    location: '襄阳唐城',
    info: '穿越盛唐夜景，襄阳唐城夜间骑行&摄影活动',
    tags: ['夜骑', '摄影'],
    image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=襄阳唐城夜景%20摩托车骑行%20古建筑灯光&image_size=square_hd',
    isUpcoming: true,
    countdownText: '距开始 3天',
    participants: 45,
    maxParticipants: 100,
  },
  {
    id: '2',
    title: '古城环线晨骑',
    date: '2026-04-27',
    time: '06:30',
    location: '襄阳古城墙',
    info: '襄阳古城墙环线，全程约25公里',
    tags: ['晨骑', '免费'],
    image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=襄阳古城墙%20摩托车%20清晨骑行&image_size=square_hd',
    isUpcoming: true,
    countdownText: '距开始 10天',
    participants: 28,
    maxParticipants: 80,
  },
  {
    id: '3',
    title: '摩友交流会',
    date: '2026-05-01',
    time: '14:00',
    location: '襄阳市体育馆',
    info: '襄阳摩友俱乐部月度聚会',
    tags: ['聚会', '交流'],
    image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=摩托车俱乐部聚会%20摩友交流&image_size=square_hd',
    isUpcoming: true,
    countdownText: '距开始 14天',
    participants: 68,
    maxParticipants: 150,
  },
  {
    id: '4',
    title: '汉江沿岸骑行',
    date: '2026-05-03',
    time: '08:00',
    location: '汉江绿道',
    info: '沿汉江绿道，尽享江风拂面',
    tags: ['绿道', '休闲'],
    image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=汉江沿岸%20摩托车骑行%20江景&image_size=square_hd',
    isUpcoming: true,
    countdownText: '距开始 16天',
    participants: 35,
    maxParticipants: 100,
  },
  {
    id: '5',
    title: '隆中景区骑行',
    date: '2026-04-10',
    time: '09:00',
    location: '隆中景区',
    info: '前往隆中景区的经典路线',
    tags: ['景区', '休闲'],
    image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=隆中景区%20摩托车骑行%20山水风景&image_size=square_hd',
    isUpcoming: false,
    participants: 42,
    maxParticipants: 80,
  },
])

// 搜索和筛选
const searchQuery = ref('')
const selectedTag = ref('全部')
const tags = ref(['全部', '夜骑', '晨骑', '聚会', '景区', '绿道', '摄影', '免费'])

// 过滤后的活动列表
const filteredActivities = computed(() => {
  let result = activities.value
  
  // 按标签筛选
  if (selectedTag.value !== '全部') {
    result = result.filter(activity => activity.tags.includes(selectedTag.value))
  }
  
  // 按搜索关键词筛选
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    result = result.filter(activity => 
      activity.title.toLowerCase().includes(query) ||
      activity.info.toLowerCase().includes(query) ||
      activity.location.toLowerCase().includes(query)
    )
  }
  
  return result
})

// 按时间排序
const sortedActivities = computed(() => {
  return [...filteredActivities.value].sort((a, b) => {
    if (a.isUpcoming && !b.isUpcoming) return -1
    if (!a.isUpcoming && b.isUpcoming) return 1
    return new Date(a.date).getTime() - new Date(b.date).getTime()
  })
})

function handleActivityClick(activity: any) {
  router.push({
    path: '/subPages/activity/detail',
    query: { id: activity.id },
  })
}

function handleTagClick(tag: string) {
  selectedTag.value = tag
}
</script>

<template>
  <view class="min-h-screen bg-base">
    <!-- 搜索栏 -->
    <view class="p-[24rpx]">
      <view class="relative">
        <wd-icon name="search" size="28rpx" color="#8D99AE" class="absolute left-[20rpx] top-1/2 -translate-y-1/2" />
        <input
          v-model="searchQuery"
          type="text"
          placeholder="搜索活动"
          placeholder-style="color: #8D99AE"
          class="w-full bg-card rounded-[12rpx] pl-[60rpx] pr-[20rpx] py-[20rpx] text-white text-[24rpx]"
        />
      </view>
    </view>
    
    <!-- 标签筛选 -->
    <view class="px-[24rpx] pb-[16rpx]">
      <scroll-view scroll-x show-scrollbar="false" class="flex gap-[12rpx]">
        <view
          v-for="tag in tags"
          :key="tag"
          class="px-[20rpx] py-[10rpx] rounded-[20rpx] text-[20rpx] transition-all duration-100"
          :class="selectedTag === tag ? 'bg-primary text-white' : 'bg-card text-gray'"
          @click="handleTagClick(tag)"
        >
          {{ tag }}
        </view>
      </scroll-view>
    </view>
    
    <!-- 活动列表 -->
    <view class="p-[24rpx] space-y-[20rpx]">
      <text class="text-[32rpx] font-700 text-white mb-[20rpx] block">
        {{ selectedTag === '全部' ? '全部活动' : selectedTag + '活动' }}
      </text>
      
      <view v-if="sortedActivities.length === 0" class="py-[100rpx] flex flex-col items-center justify-center">
        <text class="text-[28rpx] text-gray mb-[20rpx]">暂无活动</text>
        <text class="text-[24rpx] text-gray">请尝试其他筛选条件</text>
      </view>
      
      <view v-else class="space-y-[20rpx]">
        <view
          v-for="activity in sortedActivities"
          :key="activity.id"
          class="bg-card rounded-[16rpx] overflow-hidden shadow-lg transition-all duration-100 active:scale-95"
          @click="handleActivityClick(activity)"
        >
          <!-- 活动图片 -->
          <view class="relative h-[300rpx] w-full">
            <image
              :src="activity.image"
              class="w-full h-full object-cover"
              mode="aspectFill"
            />
            <view v-if="activity.isUpcoming" class="absolute top-[16rpx] right-[16rpx] bg-primary text-white text-[18rpx] px-[16rpx] py-[8rpx] rounded-[8rpx]">
              {{ activity.countdownText }}
            </view>
            <view v-else class="absolute top-[16rpx] right-[16rpx] bg-gray text-white text-[18rpx] px-[16rpx] py-[8rpx] rounded-[8rpx]">
              已结束
            </view>
          </view>
          
          <!-- 活动信息 -->
          <view class="p-[20rpx]">
            <text class="text-[28rpx] font-600 text-white mb-[12rpx] block">{{ activity.title }}</text>
            
            <view class="flex items-center gap-[20rpx] mb-[12rpx]">
              <view class="flex items-center gap-[4rpx]">
                <wd-icon name="calendar" size="20rpx" color="#8D99AE" />
                <text class="text-[20rpx] text-gray">{{ activity.date }} {{ activity.time }}</text>
              </view>
              <view class="flex items-center gap-[4rpx]">
                <wd-icon name="location" size="20rpx" color="#8D99AE" />
                <text class="text-[20rpx] text-gray">{{ activity.location }}</text>
              </view>
            </view>
            
            <view class="flex flex-wrap gap-[8rpx] mb-[12rpx]">
              <text
                v-for="tag in activity.tags"
                :key="tag"
                class="text-[18rpx] px-[12rpx] py-[4rpx] rounded-[8rpx] bg-primary/20 text-primary"
              >
                {{ tag }}
              </text>
            </view>
            
            <text class="text-[22rpx] text-gray line-clamp-2 mb-[12rpx]">{{ activity.info }}</text>
            
            <view class="flex justify-between items-center">
              <view class="flex items-center gap-[4rpx]">
                <wd-icon name="user" size="20rpx" color="#8D99AE" />
                <text class="text-[20rpx] text-gray">{{ activity.participants }}/{{ activity.maxParticipants }}人</text>
              </view>
              <wd-icon name="arrow-right" size="24rpx" color="#8D99AE" />
            </view>
          </view>
        </view>
      </view>
    </view>
    
    <!-- 底部创建活动按钮（管理员） -->
    <view class="fixed bottom-[20rpx] left-[24rpx] right-[24rpx]">
      <button
        class="w-full bg-primary text-white rounded-[12rpx] py-[20rpx] text-[24rpx] font-600"
      >
        创建活动
      </button>
    </view>
  </view>
</template>

