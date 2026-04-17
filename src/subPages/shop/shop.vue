<script setup lang="ts">
/**
 * 口碑店铺页面
 * 展示摩友推荐的口碑商家，不展示联系方式（联系管理员获取）
 */
import type { Shop, ShopType } from '@/types'
import { SHOP_TYPE_CONFIG } from '@/types'

definePage({
  name: 'shop',
  style: {
    navigationBarTitleText: '口碑店铺',
    navigationBarBackgroundColor: '#121212',
    navigationBarTextStyle: 'white',
  },
})

// ================================================
// 状态
// ================================================

const shops = ref<Shop[]>([])
const loading = ref(false)
const currentFilter = ref<ShopType | 'all'>('all')

// ================================================
// 筛选
// ================================================

const filters: { key: ShopType | 'all'; label: string }[] = [
  { key: 'all', label: '全部' },
  { key: 'gas_station', label: '加油站' },
  { key: 'repair', label: '维修店' },
  { key: 'restaurant', label: '餐厅' },
  { key: 'cafe', label: '咖啡馆' },
  { key: 'scenic', label: '景点' },
  { key: 'parking', label: '停车场' },
]

const filteredShops = computed(() => {
  if (currentFilter.value === 'all') return shops.value
  return shops.value.filter(s => s.type === currentFilter.value)
})

// ================================================
// 数据加载
// ================================================

async function loadShops() {
  loading.value = true
  try {
    const res = await getShops()
    shops.value = res
  } catch (err) {
    console.error('加载店铺失败:', err)
  } finally {
    loading.value = false
  }
}

async function getShops(): Promise<Shop[]> {
  return [
    {
      id: '1',
      name: '壳牌加油站（襄阳大道站）',
      type: 'gas_station',
      address: '襄阳大道与航空路交叉口',
      distance: 1.2,
      rating: 4.8,
      tags: ['24小时', '便利店'],
      description: '正规连锁加油站，油品质量有保障，适合摩友补给',
    },
    {
      id: '2',
      name: '老陈摩托车维修',
      type: 'repair',
      address: '樊城区长虹路123号',
      rating: 4.9,
      tags: ['专业维修', '配件齐全'],
      description: '二十年老店，师傅手艺精湛，维修摩托车、电动车经验丰富',
      highlight: true,
    },
    {
      id: '3',
      name: '江边农家乐',
      type: 'restaurant',
      address: '襄城区汉江边',
      distance: 5.8,
      rating: 4.7,
      tags: ['农家菜', '江景'],
      description: '品尝地道襄阳菜，欣赏汉江美景，摩友聚餐推荐',
    },
    {
      id: '4',
      name: '荒野咖啡',
      type: 'cafe',
      address: '樊城区建设路56号',
      rating: 4.6,
      tags: ['精品咖啡', '露营风'],
      description: '美式复古风格咖啡馆，咖啡香醇，适合摩友小憩',
      highlight: true,
    },
    {
      id: '5',
      name: '古隆中景区',
      type: 'scenic',
      address: '襄城区隆中路1号',
      distance: 12.5,
      rating: 4.9,
      tags: ['5A景区', '历史古迹'],
      description: '诸葛亮故居，三顾茅庐故事发生地，摩旅必去',
    },
    {
      id: '6',
      name: '唐城影视基地',
      type: 'scenic',
      address: '襄城区浩然路',
      distance: 8.2,
      rating: 4.7,
      tags: ['拍照圣地', '夜游'],
      description: '《妖猫传》取景地，夜景绝美，适合摩友拍照打卡',
    },
    {
      id: '7',
      name: '月亮湾公园停车场',
      type: 'parking',
      address: '樊城区月亮湾公园',
      rating: 4.5,
      tags: ['免费停车', '安全'],
      description: '沿江骑行休息点，停车方便，有卫生间和饮用水',
    },
    {
      id: '8',
      name: '中石化加油站（卧龙站）',
      type: 'gas_station',
      address: '襄城区卧龙大道',
      distance: 3.5,
      rating: 4.6,
      tags: ['24小时', '洗车'],
      description: '位于卧龙大道旁，适合前往古隆中方向的摩友加油',
    },
  ]
}

// ================================================
// 交互
// ================================================

function setFilter(key: ShopType | 'all') {
  currentFilter.value = key
}

function getShopIcon(type: ShopType) {
  return SHOP_TYPE_CONFIG[type]?.icon || 'i-carbon:store'
}

function getShopColor(type: ShopType) {
  return SHOP_TYPE_CONFIG[type]?.color || '#999'
}

onMounted(() => {
  loadShops()
})
</script>

<template>
  <view class="min-h-screen bg-base pb-[40rpx]">
    <!-- 筛选标签 -->
    <view class="px-[24rpx] py-[20rpx]">
      <scroll-view scroll-x show-scrollbar="false" class="flex gap-[12rpx]">
        <button
          v-for="f in filters"
          :key="f.key"
          class="flex-shrink-0 px-[24rpx] py-[10rpx] rounded-[28rpx] text-[22rpx] font-500 transition-all"
          :class="currentFilter === f.key ? 'bg-primary text-white' : 'bg-card text-gray'"
          @click="setFilter(f.key)"
        >
          {{ f.label }}
        </button>
      </scroll-view>
    </view>

    <!-- 店铺列表 -->
    <view class="px-[24rpx]">
      <view class="space-y-[20rpx]">
        <view
          v-for="shop in filteredShops"
          :key="shop.id"
          class="bg-card rounded-[16rpx] p-[24rpx]"
        >
          <!-- 头部 -->
          <view class="flex items-start gap-[16rpx]">
            <!-- 图标 -->
            <view
              class="w-[80rpx] h-[80rpx] rounded-[16rpx] flex items-center justify-center flex-shrink-0"
              :style="{ backgroundColor: getShopColor(shop.type) + '20' }"
            >
              <text :class="getShopIcon(shop.type) + ' text-[40rpx]'" :style="{ color: getShopColor(shop.type) }" />
            </view>

            <!-- 信息 -->
            <view class="flex-1 min-w-0">
              <view class="flex items-center gap-[12rpx] mb-[4rpx]">
                <text class="text-[26rpx] font-600 text-white truncate">{{ shop.name }}</text>
                <view
                  v-if="shop.highlight"
                  class="px-[10rpx] py-[2rpx] rounded-[6rpx] text-[18rpx] text-white flex-shrink-0"
                  :style="{ backgroundColor: getShopColor(shop.type) }"
                >
                  推荐
                </view>
              </view>

              <!-- 评分 -->
              <view class="flex items-center gap-[8rpx] mb-[8rpx]">
                <view class="flex items-center">
                  <text
                    v-for="i in 5"
                    :key="i"
                    :class="i <= Math.floor(shop.rating) ? 'i-carbon:star-filled text-[20rpx]' : 'i-carbon:star text-[20rpx]'"
                    :style="{ color: i <= Math.floor(shop.rating) ? '#FFB800' : '#666' }"
                  />
                </view>
                <text class="text-[22rpx] text-warning">{{ shop.rating }}</text>
              </view>

              <!-- 标签 -->
              <view class="flex flex-wrap gap-[8rpx] mb-[8rpx]">
                <text
                  v-for="tag in shop.tags"
                  :key="tag"
                  class="px-[10rpx] py-[4rpx] rounded-[6rpx] text-[18rpx] bg-white/5 text-gray"
                >
                  {{ tag }}
                </text>
              </view>

              <!-- 描述 -->
              <text class="text-[22rpx] text-gray line-clamp-2">{{ shop.description }}</text>
            </view>
          </view>

          <!-- 底部 -->
          <view class="flex items-center justify-between mt-[16rpx] pt-[16rpx]" style="border-top: 1rpx solid var(--wot-color-border)">
            <!-- 地址 -->
            <view class="flex items-center gap-[6rpx] flex-1 min-w-0">
              <text class="i-carbon:location text-[22rpx] text-gray flex-shrink-0" />
              <text class="text-[22rpx] text-gray truncate">{{ shop.address }}</text>
            </view>

            <!-- 距离 -->
            <view v-if="shop.distance" class="flex items-center gap-[4rpx] ml-[16rpx]">
              <text class="i-carbon:distance text-[22rpx] text-gray" />
              <text class="text-[22rpx] text-gray">{{ shop.distance }}km</text>
            </view>
          </view>
        </view>
      </view>

      <!-- 空状态 -->
      <view v-if="filteredShops.length === 0 && !loading" class="flex flex-col items-center justify-center py-[100rpx]">
        <text class="i-carbon:store text-[80rpx] text-gray mb-[16rpx]" />
        <text class="text-[26rpx] text-gray">暂无相关店铺</text>
      </view>

      <!-- Loading -->
      <view v-if="loading" class="flex items-center justify-center py-[60rpx]">
        <wd-loading type="ring" />
      </view>
    </view>

    <!-- 合规提示 -->
    <view class="px-[24rpx] mt-[40rpx] text-center">
      <text class="text-[20rpx] text-gray">
        更多商家信息请联系管理员获取
      </text>
    </view>
  </view>
</template>
