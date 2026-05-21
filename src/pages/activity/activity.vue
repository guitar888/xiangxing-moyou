<script setup lang="ts">
/**
 * 活动页面 - 纯展示版
 * 仅展示活动信息 + 状态 + 路线查看
 * 无社交、无报名、无交互
 */
import type { ActivityItem, ActivityFilter, ActivityTag, ActivityStatusTab } from '@/types'
import { ACTIVITY_TAG_CONFIG } from '@/types'

definePage({
  name: 'activity',
  layout: 'tabbar',
  style: {
    navigationBarTitleText: '活动工具',
    navigationStyle: 'custom',
  },
})

// ================================================
// 系统信息
// ================================================
const { statusBarHeight } = useSystemInfo()

// ================================================
// 数据
// ================================================
const {
  activities,
  loading,
  currentFilter,
  currentStatusTab,
  filteredByStatus,
  upcomingActivities,
  ongoingActivities,
  endedActivities,
  loadActivities,
  setFilter,
  setStatusTab,
} = useActivityData()

// 标签页切换
const activeTab = ref('activities')
const showDisclaimer = ref(false)

// 搜索
const searchQuery = ref('')

// 状态筛选 Tab
const statusTabs: { key: ActivityStatusTab; label: string; icon: string }[] = [
  { key: 'upcoming', label: '即将开始', icon: 'i-carbon:time' },
  { key: 'ongoing', label: '进行中', icon: 'i-carbon:play' },
  { key: 'ended', label: '历史记录', icon: 'i-carbon:document' },
]

// 活动类型筛选标签
const filters: { key: ActivityFilter; label: string }[] = [
  { key: 'all', label: '全部' },
  { key: 'morning', label: '晨骑' },
  { key: 'gather', label: '聚会' },
  { key: 'scenic', label: '景区' },
  { key: 'greenway', label: '绿道' },
  { key: 'free', label: '免费' },
  { key: 'photo', label: '摄影' },
]

// 活动筛选（结合状态 Tab + 类型筛选 + 搜索）
const finalFilteredActivities = computed(() => {
  let data = filteredByStatus.value

  // 搜索过滤
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    data = data.filter(a =>
      a.title.toLowerCase().includes(query) ||
      a.description.toLowerCase().includes(query) ||
      a.location.toLowerCase().includes(query)
    )
  }

  // 类型过滤
  if (currentFilter.value !== 'all') {
    data = data.filter(a => a.tags.includes(currentFilter.value))
  }

  return data
})

// ================================================
// AA计算器 - 彻底修复版
// ================================================
const aaTotal = ref(0)
const aaParticipants = ref(1)

// 监听变量变化，强制修正 NaN
watch(aaTotal, (val) => {
  if (isNaN(val) || val < 0) {
    aaTotal.value = 0
  }
})

watch(aaParticipants, (val) => {
  if (isNaN(val) || val <= 0) {
    aaParticipants.value = 1
  }
})

// 计算结果，去掉不必要的限制，直接计算并兜底
const aaResult = computed(() => {
  // 强制转数字，兜底为 0/1
  const total = Number(aaTotal.value) || 0
  const participants = Number(aaParticipants.value) || 1

  // 直接计算，结果非负
  const result = total / participants
  return Math.max(0, Math.round(result * 100) / 100)
})

// ================================================
// 路线查看
// ================================================
const router = useRouter()

function handleViewRoute(activity: ActivityItem) {
  if (activity.routeId) {
    router.pushTab('/pages/map/map')
  }
}

// ================================================
// 生命周期
// ================================================
onMounted(() => {
  loadActivities()
})
</script>

<template>
  <view class="relative min-h-screen overflow-hidden bg-gradient-to-br from-base via-[var(--wot-color-bg-hover)] to-[var(--wot-color-bg-card)]">
    <!-- 背景装饰 -->
    <view class="pointer-events-none absolute inset-x-0 top-0 z-0 h-[240rpx]" :style="{ background: 'linear-gradient(to bottom, rgba(46, 213, 115, 0.25), transparent 100%)' }" />
    <view class="pointer-events-none absolute inset-0 z-0 opacity-3" :style="{ background: 'repeating-linear-gradient(45deg, transparent, transparent 40rpx, #2ED573 40rpx, #2ED573 80rpx), repeating-linear-gradient(-45deg, transparent, transparent 40rpx, #2ED573 40rpx, #2ED573 80rpx)' }" />

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
          <text class="i-carbon:calendar text-[36rpx] text-white" />
          <text class="text-[32rpx] font-700 tracking-[1px] text-white">活动工具</text>
        </view>
        <view class="flex items-center gap-[8rpx] rounded-[10rpx] bg-warning px-[16rpx] py-[10rpx]" @click="showDisclaimer = true">
          <text class="i-carbon:document text-[24rpx] text-white" />
          <text class="text-[22rpx] text-white font-500">免责声明</text>
        </view>
      </view>

      <!-- 标签栏 -->
      <view class="flex items-center justify-between px-[32rpx] py-[20rpx]">
        <view
          class="flex-1 flex items-center justify-center gap-[10rpx] py-[16rpx] rounded-[12rpx] transition-all duration-200 relative"
          :class="activeTab === 'activities' ? 'text-primary' : 'text-gray'"
          @click="activeTab = 'activities'"
        >
          <text class="i-carbon:calendar text-[28rpx]" />
          <text class="text-[26rpx] font-500">活动列表</text>
          <view v-if="activeTab === 'activities'" class="absolute bottom-0 left-1/4 right-1/4 h-[6rpx] bg-primary rounded-full" />
        </view>
        <view
          class="flex-1 flex items-center justify-center gap-[10rpx] py-[16rpx] rounded-[12rpx] transition-all duration-200 relative"
          :class="activeTab === 'aa' ? 'text-primary' : 'text-gray'"
          @click="activeTab = 'aa'"
        >
          <text class="i-carbon:calculator text-[28rpx]" />
          <text class="text-[26rpx] font-500">AA计算器</text>
          <view v-if="activeTab === 'aa'" class="absolute bottom-0 left-1/4 right-1/4 h-[6rpx] bg-primary rounded-full" />
        </view>
      </view>

      <!-- 活动列表标签页 -->
      <view v-if="activeTab === 'activities'">
        <!-- 状态筛选 Tab -->
        <view class="flex gap-[12rpx] px-[24rpx] pt-[16rpx]">
          <view
            v-for="tab in statusTabs"
            :key="tab.key"
            class="flex-1 flex items-center justify-center gap-[8rpx] py-[16rpx] rounded-[12rpx] transition-all duration-200"
            :class="currentStatusTab === tab.key ? 'bg-primary text-base' : 'bg-card text-gray'"
            @click="setStatusTab(tab.key)"
          >
            <text :class="[tab.icon, 'text-[24rpx]']" />
            <text class="text-[24rpx] font-500">{{ tab.label }}</text>
            <text v-if="tab.key === 'upcoming'" class="text-[20rpx] opacity-80">({{ upcomingActivities.length }})</text>
            <text v-else-if="tab.key === 'ongoing'" class="text-[20rpx] opacity-80">({{ ongoingActivities.length }})</text>
            <text v-else-if="tab.key === 'ended'" class="text-[20rpx] opacity-80">({{ endedActivities.length }})</text>
          </view>
        </view>

        <!-- 搜索栏 -->
        <view class="p-[24rpx]">
          <view class="relative">
            <text class="i-carbon:search absolute left-[20rpx] top-1/2 -translate-y-1/2 text-[28rpx] text-gray" />
            <input
              v-model="searchQuery"
              type="text"
              placeholder="搜索活动"
              placeholder-class="text-gray"
              class="w-full bg-card rounded-[12rpx] pl-[60rpx] pr-[20rpx] py-[20rpx] text-white text-[24rpx]"
            />
          </view>
        </view>

        <!-- 活动类型筛选标签 - 多行布局 -->
        <view class="px-[24rpx] pb-[16rpx]">
          <view class="flex flex-wrap gap-[12rpx]">
            <view
              v-for="f in filters"
              :key="f.key"
              class="px-[20rpx] py-[8rpx] rounded-[20rpx] text-[22rpx] font-500 transition-all duration-200"
              :class="currentFilter === f.key ? 'bg-primary text-white' : 'bg-card text-gray border border-white/5'"
              @click="setFilter(f.key)"
            >
              {{ f.label }}
            </view>
          </view>
        </view>

        <!-- 活动列表 -->
        <view class="px-[24rpx]">
          <view class="space-y-[20rpx]">
            <view
              v-for="activity in finalFilteredActivities"
              :key="activity.id"
              class="bg-card rounded-[16rpx] overflow-hidden"
            >
              <activity-ActivityCard
                :activity="activity"
                @view-route="handleViewRoute"
              />
            </view>
          </view>

          <!-- 空状态 -->
          <view v-if="finalFilteredActivities.length === 0 && !loading" class="flex flex-col items-center justify-center py-[100rpx]">
            <text class="i-carbon:calendar text-[80rpx] text-gray mb-[16rpx]" />
            <text class="text-[26rpx] text-gray">暂无活动</text>
            <text class="text-[22rpx] text-gray mt-[8rpx]">关注更多摩友活动</text>
          </view>

          <!-- Loading -->
          <view v-if="loading" class="flex items-center justify-center py-[60rpx]">
            <wd-loading type="ring" />
          </view>
        </view>
      </view>


  <!-- AA计算器标签页 -->
  <view v-else-if="activeTab === 'aa'" class="p-[24rpx]">
    <view class="space-y-[32rpx]">
      <view class="bg-card rounded-[16rpx] p-[24rpx]">
        <text class="block text-[24rpx] text-white mb-[16rpx]">总费用</text>
        <wd-input
          v-model.number="aaTotal"
          type="digit"
          placeholder="输入总费用"
          class="text-[32rpx] font-500 text-white"
        />
      </view>
      <view class="bg-card rounded-[16rpx] p-[24rpx]">
        <text class="block text-[24rpx] text-white mb-[16rpx]">参与人数</text>
        <wd-input
          v-model.number="aaParticipants"
          type="number"
          placeholder="输入参与人数"
          class="text-[32rpx] font-500 text-white"
        />
      </view>
      <view class="bg-card rounded-[16rpx] p-[24rpx]">
        <text class="block text-[24rpx] text-white mb-[16rpx]">人均费用</text>
        <text class="text-[40rpx] font-600 text-primary">{{ aaResult.toFixed(2) }} 元</text>
      </view>
    </view>
  </view>

      <!-- 底部合规声明 -->
      <view class="px-[20rpx] py-[12rpx]">
        <text class="text-[18rpx] text-gray/50 text-center block">
          活动信息仅作参考 · 遵守交通法规 · 安全骑行
        </text>
      </view>
    </view>

    <!-- 免责声明弹窗 -->
    <wd-popup v-model="showDisclaimer" position="center" :close-on-click-modal="true" custom-class="disclaimer-popup">
      <view class="w-[90vw] rounded-[24rpx] bg-card overflow-hidden shadow-[0_16rpx_48rpx_rgba(0,0,0,0.4)]">
        <!-- 头部 -->
        <view class="flex items-center justify-between px-[24rpx] py-[20rpx] border-b border-white/10">
          <view class="flex items-center gap-[12rpx]">
            <view class="w-[44rpx] h-[44rpx] rounded-[12rpx] bg-warning/20 flex items-center justify-center">
              <text class="text-[22rpx]">🛡️</text>
            </view>
            <text class="text-[26rpx] text-white font-600">免责声明</text>
          </view>
          <text class="i-carbon:close text-[28rpx] text-white/60 active:text-white cursor-pointer" @click="showDisclaimer = false" />
        </view>

        <!-- 内容 -->
        <view class="p-[20rpx] pt-[12rpx]">
          <!-- 风险提示 -->
          <view class="mb-[16rpx] p-[16rpx] rounded-[12rpx] bg-warning/5 border border-warning/10">
            <text class="text-[24rpx] font-600 text-white mb-[8rpx] block">安全风险提示</text>
            <text class="block text-[22rpx] text-white/70 leading-[1.6]">骑行属高风险户外运动，请务必佩戴头盔护具。本活动为摩友自发组织的非盈利骑行，参与者需自愿承担风险，组织者不承担任何法律及连带责任。建议自行购买意外险。</text>
          </view>
          
          <!-- 隐私说明 -->
          <view class="mb-[16rpx] p-[16rpx] rounded-[12rpx] bg-primary/5 border border-primary/10">
            <text class="text-[24rpx] font-600 text-white mb-[8rpx] block">纯展示平台·零隐私收集</text>
            <text class="block text-[22rpx] text-white/70 leading-[1.6]">本小程序仅为活动展示工具，不收集、不上传任何个人身份信息。您无需注册登录，所有浏览记录均保存在本地。</text>
          </view>

          <!-- 报名指引 -->
          <view class="p-[16rpx] rounded-[12rpx] bg-blue-500/5 border border-blue-500/10">
            <text class="text-[24rpx] font-600 text-white mb-[8rpx] block">如何报名参与？</text>
            <text class="block text-[22rpx] text-white/70 leading-[1.6]">本应用不设在线报名。请按以下步骤操作：\n① 前往"我的-联系我们"复制微信号。\n② 添加管理员微信，说明想参加的活动。\n③ 受邀加入对应微信群，在群内接龙报名。</text>
          </view>
        </view>
        
        <!-- 底部按钮 -->
        <view class="px-[24rpx] pb-[24rpx]">
          <button class="w-full py-[20rpx] rounded-[12rpx] bg-gradient-to-r from-primary to-[#27C468] text-white text-[26rpx] font-500 active:opacity-90" @click="showDisclaimer = false">
            我已阅读并同意
          </button>
        </view>
      </view>
    </wd-popup>
  </view>
</template>
