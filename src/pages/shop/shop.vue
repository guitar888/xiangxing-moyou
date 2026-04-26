<script setup lang="ts">
/**
 * 口碑店铺页面
 * 合规优先：仅展示店铺信息，无交易功能
 * 全端兼容：适配H5和微信小程序
 */

// 系统信息
const { statusBarHeight } = useSystemInfo()

// 模拟店铺数据
const shops = ref([
  {
    id: '1',
    name: '襄行摩友俱乐部',
    rating: 4.8,
    reviewCount: 128,
    address: '襄阳市襄城区檀溪路123号',
    distance: '2.5km',
    tags: ['维修', '保养', '配件'],
    image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=motorcycle%20shop%20exterior%20with%20repair%20tools%20and%20motorcycles%20parked%20outside&image_size=square',
    coordinates: {
      latitude: 32.0082,
      longitude: 112.1226
    }
  },
  {
    id: '2',
    name: '速修摩托车行',
    rating: 4.6,
    reviewCount: 96,
    address: '襄阳市樊城区人民广场15号',
    distance: '3.8km',
    tags: ['快修', '洗车', '轮胎'],
    image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=motorcycle%20repair%20shop%20interior%20with%20tools%20and%20motorcycles%20being%20worked%20on&image_size=square',
    coordinates: {
      latitude: 32.0282,
      longitude: 112.1426
    }
  },
  {
    id: '3',
    name: '机车装备店',
    rating: 4.9,
    reviewCount: 203,
    address: '襄阳市高新区邓城大道456号',
    distance: '5.2km',
    tags: ['装备', '头盔', '骑行服'],
    image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=motorcycle%20gear%20shop%20with%20helmets%20and%20riding%20gear%20displayed&image_size=square',
    coordinates: {
      latitude: 32.0582,
      longitude: 112.1626
    }
  }
])

// 筛选状态
const selectedTags = ref<string[]>([])
const searchKeyword = ref('')

// 筛选弹窗控制
const showFilter = ref(false)

// 计算过滤后的店铺
const filteredShops = computed(() => {
  let result = shops.value
  
  // 关键词搜索
  if (searchKeyword.value) {
    const keyword = searchKeyword.value.toLowerCase()
    result = result.filter(shop => 
      shop.name.toLowerCase().includes(keyword) || 
      shop.address.toLowerCase().includes(keyword)
    )
  }
  
  // 标签筛选
  if (selectedTags.value.length > 0) {
    result = result.filter(shop => 
      selectedTags.value.some(tag => shop.tags.includes(tag))
    )
  }
  
  return result
})

// 导航逻辑
const { openMapNavigation } = useMapNavigation()

function handleNavigateToShop(shop: any) {
  openMapNavigation({
    latitude: shop.coordinates.latitude,
    longitude: shop.coordinates.longitude,
    name: shop.name,
    address: shop.address
  })
}

// 筛选相关
const allTags = ['维修', '保养', '配件', '快修', '洗车', '轮胎', '装备', '头盔', '骑行服']

function openFilterPopup() {
  showFilter.value = true
}

function confirmFilter() {
  showFilter.value = false
}

function clearFilters() {
  selectedTags.value = []
  searchKeyword.value = ''
}

function updateFilterValues(values: string[]) {
  selectedTags.value = values
}

// 搜索处理
function handleSearch() {
  // 这里可以添加搜索逻辑
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
          <text class="i-carbon:store text-[36rpx] text-primary" />
          <text class="text-[32rpx] font-700 tracking-[1px]" :style="{ color: '#2ED573' }">口碑店铺</text>
        </view>
        <view class="flex items-center gap-[8rpx] rounded-[10rpx] bg-card/50 px-[16rpx] py-[10rpx]">
          <text class="i-carbon:information text-[24rpx] text-primary" />
          <text class="text-[22rpx] text-white/80 font-500">优质推荐</text>
        </view>
      </view>

      <!-- 合规提示横幅 -->
      <common-ComplianceBanner />

      <!-- 搜索框 -->
      <view class="mx-[24rpx] mt-[12rpx]">
        <view class="flex items-center gap-[12rpx] bg-card/50 rounded-[20rpx] px-[16rpx] py-[12rpx] border border-white/10">
          <text class="i-carbon:search text-[24rpx] text-gray" />
          <input
            v-model="searchKeyword"
            type="text"
            placeholder="搜索店铺名称或地址"
            placeholder-style="color: #8D99AE"
            class="flex-1 text-[24rpx] text-white outline-none"
            @confirm="handleSearch"
          />
          <text v-if="searchKeyword" class="i-carbon:close text-[24rpx] text-gray" @click="searchKeyword = ''" />
        </view>
      </view>

      <!-- 筛选入口按钮 -->
      <view class="mt-[16rpx] px-[24rpx] flex gap-[16rpx]">
        <view class="relative flex-1" @click="openFilterPopup">
          <wd-button
            type="info"
            size="medium"
            custom-class="w-full rounded-[20rpx] font-500 border border-white/10"
          >
            <view class="flex items-center justify-center gap-[8rpx]">
              <text class="i-carbon:tag text-[24rpx]" />
              <text class="text-[24rpx]">类型筛选</text>
              <text v-if="selectedTags.length > 0" class="i-carbon:checkmark text-[20rpx] text-success" />
            </view>
          </wd-button>
          <view
            v-if="selectedTags.length > 0"
            class="absolute -top-[8rpx] -right-[8rpx] w-[28rpx] h-[28rpx] bg-red-500 rounded-full flex items-center justify-center"
          >
            <text class="text-[16rpx] text-white font-600">{{ selectedTags.length }}</text>
          </view>
        </view>
        <view class="relative flex-1">
          <wd-button
            type="info"
            size="medium"
            custom-class="w-full rounded-[20rpx] font-500 border border-white/10"
            @click="clearFilters"
          >
            <view class="flex items-center justify-center gap-[8rpx]">
              <text class="i-carbon:close text-[24rpx]" />
              <text class="text-[24rpx]">清除筛选</text>
            </view>
          </wd-button>
        </view>
      </view>

      <!-- 店铺列表 -->
      <view class="mt-[14rpx] flex-1 px-[24rpx] pb-[20rpx]">
        <view class="flex justify-between items-center mb-[10rpx]">
          <text class="text-[28rpx] font-600 text-white flex items-center gap-[6rpx]">
            <text class="i-carbon:store text-[24rpx] text-primary" />
            店铺列表
          </text>
          <text class="text-[22rpx] text-gray">{{ filteredShops.length }}家店铺</text>
        </view>
        <view class="flex flex-col gap-[16rpx]">
          <view
            v-for="shop in filteredShops"
            :key="shop.id"
            class="bg-[var(--wot-color-bg-card)] rounded-[20rpx] overflow-hidden shadow-lg border border-white/5"
          >
            <!-- #ifdef H5 -->
            <view class="flex flex-col md:flex-row">
              <view class="w-full md:w-[200rpx] h-[160rpx] md:h-auto">
                <img :src="shop.image" class="w-full h-full object-cover" />
              </view>
              <view class="flex-1 p-[16rpx]">
                <view class="flex items-center justify-between mb-[8rpx]">
                  <text class="text-[26rpx] font-600 text-white">{{ shop.name }}</text>
                  <view class="flex items-center gap-[4rpx]">
                    <text class="i-carbon:star-filled text-[20rpx] text-yellow-400" />
                    <text class="text-[22rpx] font-600 text-white">{{ shop.rating }}</text>
                    <text class="text-[18rpx] text-gray">({{ shop.reviewCount }})</text>
                  </view>
                </view>
                <view class="flex items-center gap-[8rpx] mb-[10rpx]">
                  <text class="i-carbon:location text-[20rpx] text-gray" />
                  <text class="text-[20rpx] text-gray line-clamp-1">{{ shop.address }}</text>
                </view>
                <view class="flex items-center gap-[8rpx] mb-[10rpx]">
                  <text class="i-carbon:distance text-[20rpx] text-gray" />
                  <text class="text-[20rpx] text-gray">{{ shop.distance }}</text>
                </view>
                <view class="flex flex-wrap gap-[6rpx] mb-[10rpx]">
                  <view
                    v-for="tag in shop.tags"
                    :key="tag"
                    class="px-[12rpx] py-[4rpx] rounded-[8rpx] text-[16rpx] font-500 bg-primary/10 text-primary"
                  >
                    {{ tag }}
                  </view>
                </view>
                <view class="flex justify-end">
                  <wd-button
                    type="primary"
                    size="small"
                    custom-class="rounded-[18rpx] font-600"
                    @click="handleNavigateToShop(shop)"
                  >
                    <view class="flex items-center gap-[4rpx]">
                      <text class="i-carbon:directions text-[20rpx]" />
                      <text>导航</text>
                    </view>
                  </wd-button>
                </view>
              </view>
            </view>
            <!-- #endif -->
            <!-- #ifndef H5 -->
            <view class="flex flex-col">
              <view class="w-full h-[160rpx]">
                <img :src="shop.image" class="w-full h-full object-cover" />
              </view>
              <view class="p-[16rpx]">
                <view class="flex items-center justify-between mb-[8rpx]">
                  <text class="text-[26rpx] font-600 text-white">{{ shop.name }}</text>
                  <view class="flex items-center gap-[4rpx]">
                    <text class="i-carbon:star-filled text-[20rpx] text-yellow-400" />
                    <text class="text-[22rpx] font-600 text-white">{{ shop.rating }}</text>
                    <text class="text-[18rpx] text-gray">({{ shop.reviewCount }})</text>
                  </view>
                </view>
                <view class="flex items-center gap-[8rpx] mb-[10rpx]">
                  <text class="i-carbon:location text-[20rpx] text-gray" />
                  <text class="text-[20rpx] text-gray line-clamp-1">{{ shop.address }}</text>
                </view>
                <view class="flex items-center gap-[8rpx] mb-[10rpx]">
                  <text class="i-carbon:distance text-[20rpx] text-gray" />
                  <text class="text-[20rpx] text-gray">{{ shop.distance }}</text>
                </view>
                <view class="flex flex-wrap gap-[6rpx] mb-[10rpx]">
                  <view
                    v-for="tag in shop.tags"
                    :key="tag"
                    class="px-[12rpx] py-[4rpx] rounded-[8rpx] text-[16rpx] font-500 bg-primary/10 text-primary"
                  >
                    {{ tag }}
                  </view>
                </view>
                <view class="flex justify-end">
                  <wd-button
                    type="primary"
                    size="small"
                    custom-class="rounded-[18rpx] font-600"
                    @click="handleNavigateToShop(shop)"
                  >
                    <view class="flex items-center gap-[4rpx]">
                      <text class="i-carbon:directions text-[20rpx]" />
                      <text>导航</text>
                    </view>
                  </wd-button>
                </view>
              </view>
            </view>
            <!-- #endif -->
          </view>
        </view>

        <!-- 空状态 -->
        <view v-if="filteredShops.length === 0" class="flex flex-col items-center justify-center py-[60rpx]">
          <text class="i-carbon:search text-[80rpx] text-gray/40 mb-[12rpx]" />
          <text class="text-[24rpx] text-gray/70 font-500">暂无符合条件的店铺</text>
          <text class="text-[20rpx] text-gray/50 mt-[6rpx]">尝试其他搜索条件</text>
        </view>
      </view>

      <!-- 筛选弹窗 -->
      <common-FilterPopup
        v-model="showFilter"
        type="custom"
        :options="allTags.map(tag => ({ value: tag, label: tag }))"
        :active-values="selectedTags"
        @confirm="confirmFilter"
        @clear="clearFilters"
        @confirm-values="updateFilterValues"
      />

      <!-- 底部合规声明 -->
      <view class="px-[20rpx] py-[12rpx]">
        <text class="text-[18rpx] text-gray/50 text-center block">
          店铺信息由摩友推荐 · 仅作参考 · 遵守交通法规
        </text>
      </view>
    </view>
  </view>
</template>
