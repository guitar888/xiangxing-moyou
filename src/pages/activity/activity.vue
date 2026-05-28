<script setup lang="ts">
/**
 * 活动页面 - 纯展示版
 * 仅展示活动信息 + 状态 + 路线查看
 * 无社交、无报名、无交互
 */
import type { ActivityFilter, ActivityItem, ActivityStatusTab } from '@/types'

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
  groupedHistoryActivities,
  loadActivities,
  setFilter,
  setStatusTab,
  toggleMonth,
} = useActivityData()

// 标签页切换
const activeTab = ref('activities')
const showDisclaimer = ref(false)

// 搜索
const searchQuery = ref('')

// 状态筛选 Tab
const statusTabs: { key: ActivityStatusTab, label: string, icon: string }[] = [
  { key: 'upcoming', label: '即将开始', icon: 'i-carbon:time' },
  { key: 'ongoing', label: '进行中', icon: 'i-carbon:play' },
  { key: 'ended', label: '历史记录', icon: 'i-carbon:document' },
]

// 活动类型筛选标签
const filters: { key: ActivityFilter, label: string }[] = [
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
      a.title.toLowerCase().includes(query)
      || a.description.toLowerCase().includes(query)
      || a.location.toLowerCase().includes(query)
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
// 路线查看 & 详情 & 分享
// ================================================
const router = useRouter()

function handleViewRoute(activity: ActivityItem) {
  if (activity.routeId) {
    router.pushTab('/pages/map/map')
  }
}

function handleViewDetail(activity: ActivityItem) {
  router.push({
    path: '/subPages/activity/detail',
    query: { id: activity.id }
  })
}

function handleShareActivity(activity: ActivityItem) {
  const text = `【${activity.organizer || ''}${activity.organizer ? '】' : ''}${activity.title}
时间：${activity.date} ${activity.time}
地点：${activity.location}
详情：${activity.description}`

  uni.setClipboardData({
    data: text,
    success: () => {
      uni.showToast({ title: '已复制到剪贴板，快去分享吧', icon: 'success' })
    }
  })
}

// ================================================
// 生命周期
// ================================================
onMounted(() => {
  loadActivities()
})
</script>

<template>
  <view class="relative min-h-screen overflow-hidden from-base via-[var(--wot-color-bg-hover)] to-[var(--wot-color-bg-card)] bg-gradient-to-br">
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
          <text class="text-[32rpx] text-white font-700 tracking-[1px]">
            活动工具
          </text>
        </view>
        <view class="flex items-center gap-[8rpx] rounded-[10rpx] bg-warning px-[16rpx] py-[10rpx]" @click="showDisclaimer = true">
          <text class="i-carbon:document text-[24rpx] text-white" />
          <text class="text-[22rpx] text-white font-500">
            免责声明
          </text>
        </view>
      </view>

      <!-- 标签栏 -->
      <view class="flex items-center justify-between px-[32rpx] py-[20rpx]">
        <view
          class="relative flex flex-1 items-center justify-center gap-[10rpx] rounded-[12rpx] py-[16rpx] transition-all duration-200"
          :class="activeTab === 'activities' ? 'text-primary' : 'text-gray'"
          @click="activeTab = 'activities'"
        >
          <text class="i-carbon:calendar text-[28rpx]" />
          <text class="text-[26rpx] font-500">
            活动列表
          </text>
          <view v-if="activeTab === 'activities'" class="absolute bottom-0 left-1/4 right-1/4 h-[6rpx] rounded-full bg-primary" />
        </view>
        <view
          class="relative flex flex-1 items-center justify-center gap-[10rpx] rounded-[12rpx] py-[16rpx] transition-all duration-200"
          :class="activeTab === 'aa' ? 'text-primary' : 'text-gray'"
          @click="activeTab = 'aa'"
        >
          <text class="i-carbon:calculator text-[28rpx]" />
          <text class="text-[26rpx] font-500">
            AA计算器
          </text>
          <view v-if="activeTab === 'aa'" class="absolute bottom-0 left-1/4 right-1/4 h-[6rpx] rounded-full bg-primary" />
        </view>
      </view>

      <!-- 活动列表标签页 -->
      <view v-if="activeTab === 'activities'">
        <!-- 状态筛选 Tab -->
        <view class="flex gap-[12rpx] px-[24rpx] pt-[16rpx]">
          <view
            v-for="tab in statusTabs"
            :key="tab.key"
            class="flex flex-1 items-center justify-center gap-[8rpx] rounded-[12rpx] py-[16rpx] transition-all duration-200"
            :class="currentStatusTab === tab.key ? 'bg-primary text-base' : 'bg-card text-gray'"
            @click="setStatusTab(tab.key)"
          >
            <text class="text-[24rpx]" :class="[tab.icon]" />
            <text class="text-[24rpx] font-500">
              {{ tab.label }}
            </text>
            <text v-if="tab.key === 'upcoming'" class="text-[20rpx] opacity-80">
              ({{ upcomingActivities.length }})
            </text>
            <text v-else-if="tab.key === 'ongoing'" class="text-[20rpx] opacity-80">
              ({{ ongoingActivities.length }})
            </text>
            <text v-else-if="tab.key === 'ended'" class="text-[20rpx] opacity-80">
              ({{ endedActivities.length }})
            </text>
          </view>
        </view>

        <!-- 搜索栏 -->
        <view class="p-[24rpx]">
          <view class="relative">
            <text class="i-carbon:search absolute left-[20rpx] top-1/2 text-[28rpx] text-gray -translate-y-1/2" />
            <input
              v-model="searchQuery"
              type="text"
              placeholder="搜索活动"
              placeholder-class="text-gray"
              class="w-full rounded-[12rpx] bg-card py-[20rpx] pl-[60rpx] pr-[20rpx] text-[24rpx] text-white"
            >
          </view>
        </view>

        <!-- 活动类型筛选标签 - 多行布局 -->
        <view class="px-[24rpx] pb-[16rpx]">
          <view class="flex flex-wrap gap-[12rpx]">
            <view
              v-for="f in filters"
              :key="f.key"
              class="rounded-[20rpx] px-[20rpx] py-[8rpx] text-[22rpx] font-500 transition-all duration-200"
              :class="currentFilter === f.key ? 'bg-primary text-white' : 'bg-card text-gray border border-white/5'"
              @click="setFilter(f.key)"
            >
              {{ f.label }}
            </view>
          </view>
        </view>

        <!-- 活动列表 -->
        <view class="px-[24rpx]">
          <!-- 即将开始/进行中：直接列表 -->
          <view v-if="currentStatusTab !== 'ended'" class="space-y-[20rpx]">
            <view
              v-for="activity in finalFilteredActivities"
              :key="activity.id"
              class="overflow-hidden rounded-[16rpx] bg-card"
            >
              <activity-ActivityCard
                :activity="activity"
                @click="handleViewDetail"
                @trigger-share="handleShareActivity"
                @view-route="handleViewRoute"
              />
            </view>
          </view>

          <!-- 历史记录：按月份分组 -->
          <view v-else class="flex flex-col gap-[16rpx]">
            <view
              v-for="group in groupedHistoryActivities"
              :key="group.monthKey"
              class="overflow-hidden border border-white/10 rounded-[16rpx] bg-card"
            >
              <view
                class="flex items-center justify-between bg-card/80 p-[20rpx]"
                @click="toggleMonth(group.monthKey)"
              >
                <view class="flex items-center gap-[12rpx]">
                  <text class="i-carbon:calendar text-[28rpx] text-primary" />
                  <text class="text-[26rpx] text-white font-600">
                    {{ group.month }}
                  </text>
                  <text class="text-[22rpx] text-gray">
                    ({{ group.activities.length }}个活动)
                  </text>
                </view>
                <text
                  class="i-carbon:chevron-down text-[24rpx] text-gray transition-transform duration-200"
                  :class="{ 'rotate-180': group.expanded }"
                />
              </view>

              <view v-if="group.expanded" class="flex flex-col gap-[2rpx] p-[12rpx]">
                <activity-ActivityCard
                  v-for="activity in group.activities"
                  :key="activity.id"
                  :activity="activity"
                  @click="handleViewDetail"
                  @trigger-share="handleShareActivity"
                  @view-route="handleViewRoute"
                />
              </view>
            </view>
          </view>

          <!-- 空状态 -->
          <view v-if="currentStatusTab !== 'ended' && finalFilteredActivities.length === 0 && !loading" class="flex flex-col items-center justify-center py-[100rpx]">
            <text class="i-carbon:calendar mb-[16rpx] text-[80rpx] text-gray" />
            <text class="text-[26rpx] text-gray">
              暂无活动
            </text>
            <text class="mt-[8rpx] text-[22rpx] text-gray">
              关注更多摩友活动
            </text>
          </view>

          <!-- 历史记录空状态 -->
          <view v-else-if="currentStatusTab === 'ended' && groupedHistoryActivities.length === 0 && !loading" class="flex flex-col items-center justify-center py-[100rpx]">
            <text class="i-carbon:document mb-[16rpx] text-[80rpx] text-gray" />
            <text class="text-[26rpx] text-gray">
              暂无历史活动
            </text>
            <text class="mt-[8rpx] text-[22rpx] text-gray">
              快去参与即将开始的活动吧
            </text>
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
          <view class="rounded-[16rpx] bg-card p-[24rpx]">
            <text class="mb-[16rpx] block text-[24rpx] text-white">
              总费用
            </text>
            <wd-input
              v-model.number="aaTotal"
              type="digit"
              placeholder="输入总费用"
              class="text-[32rpx] text-white font-500"
            />
          </view>
          <view class="rounded-[16rpx] bg-card p-[24rpx]">
            <text class="mb-[16rpx] block text-[24rpx] text-white">
              参与人数
            </text>
            <wd-input
              v-model.number="aaParticipants"
              type="number"
              placeholder="输入参与人数"
              class="text-[32rpx] text-white font-500"
            />
          </view>
          <view class="rounded-[16rpx] bg-card p-[24rpx]">
            <text class="mb-[16rpx] block text-[24rpx] text-white">
              人均费用
            </text>
            <text class="text-[40rpx] text-primary font-600">
              {{ aaResult.toFixed(2) }} 元
            </text>
          </view>
        </view>
      </view>

      <!-- 底部合规声明 -->
      <view class="px-[20rpx] py-[12rpx]">
        <text class="block text-center text-[18rpx] text-gray/50">
          活动信息仅作参考 · 遵守交通法规 · 安全骑行
        </text>
      </view>
    </view>

    <!-- 免责声明弹窗 -->
    <wd-popup v-model="showDisclaimer" position="center" :close-on-click-modal="true" custom-class="disclaimer-popup">
      <view class="w-[90vw] overflow-hidden rounded-[24rpx] bg-card shadow-[0_16rpx_48rpx_rgba(0,0,0,0.4)]">
        <!-- 头部 -->
        <view class="flex items-center justify-between border-b border-white/10 px-[24rpx] py-[20rpx]">
          <view class="flex items-center gap-[12rpx]">
            <view class="h-[44rpx] w-[44rpx] flex items-center justify-center rounded-[12rpx] bg-warning/20">
              <text class="text-[22rpx]">
                🛡️
              </text>
            </view>
            <text class="text-[26rpx] text-white font-600">
              免责声明
            </text>
          </view>
          <text class="i-carbon:close cursor-pointer text-[28rpx] text-white/60 active:text-white" @click="showDisclaimer = false" />
        </view>

        <!-- 内容 -->
        <view class="p-[20rpx] pt-[12rpx]">
          <!-- 风险提示 -->
          <view class="mb-[16rpx] border border-warning/10 rounded-[12rpx] bg-warning/5 p-[16rpx]">
            <text class="mb-[8rpx] block text-[24rpx] text-white font-600">
              安全风险提示
            </text>
            <text class="block text-[22rpx] text-white/70 leading-[1.6]">
              骑行属高风险户外运动，请务必佩戴头盔护具。本活动为摩友自发组织的非盈利骑行，参与者需自愿承担风险，组织者不承担任何法律及连带责任。建议自行购买意外险。
            </text>
          </view>

          <!-- 隐私说明 -->
          <view class="mb-[16rpx] border border-primary/10 rounded-[12rpx] bg-primary/5 p-[16rpx]">
            <text class="mb-[8rpx] block text-[24rpx] text-white font-600">
              纯展示平台·零隐私收集
            </text>
            <text class="block text-[22rpx] text-white/70 leading-[1.6]">
              本小程序仅为活动展示工具，不收集、不上传任何个人身份信息。您无需注册登录，所有浏览记录均保存在本地。
            </text>
          </view>

          <!-- 报名指引 -->
          <view class="border border-blue-500/10 rounded-[12rpx] bg-blue-500/5 p-[16rpx]">
            <text class="mb-[8rpx] block text-[24rpx] text-white font-600">
              如何报名参与？
            </text>
            <text class="block text-[22rpx] text-white/70 leading-[1.6]">
              本应用不设在线报名。请按以下步骤操作：\n① 前往"我的-联系我们"复制微信号。\n② 添加管理员微信，说明想参加的活动。\n③ 受邀加入对应微信群，在群内接龙报名。
            </text>
          </view>
        </view>

        <!-- 底部按钮 -->
        <view class="px-[24rpx] pb-[24rpx]">
          <button class="w-full rounded-[12rpx] from-primary to-[#27C468] bg-gradient-to-r py-[20rpx] text-[26rpx] text-white font-500 active:opacity-90" @click="showDisclaimer = false">
            我已阅读并同意
          </button>
        </view>
      </view>
    </wd-popup>
  </view>
</template>
