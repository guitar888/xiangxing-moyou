<script setup lang="ts">
/**
 * 活动页面
 * 实现管理员发布活动、摩友匿名报名、AA计算器、路书生成等功能
 */
import type { Activity, ActivityFilter, ActivityTag } from '@/types'
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
  loadActivities,
  setFilter,
} = useActivityData()

// 标签页切换
const activeTab = ref('activities')

// 搜索
const searchQuery = ref('')

// 活动筛选
const filteredActivities = computed(() => {
  if (!searchQuery.value) return activities.value

  const query = searchQuery.value.toLowerCase()
  return activities.value.filter(a =>
    a.title.toLowerCase().includes(query) ||
    a.description.toLowerCase().includes(query) ||
    a.location.toLowerCase().includes(query)
  )
})

// 筛选标签
const filters: { key: ActivityFilter; label: string }[] = [
  { key: 'all', label: '全部' },
  { key: 'night', label: '夜骑' },
  { key: 'morning', label: '晨骑' },
  { key: 'gather', label: '聚会' },
  { key: 'scenic', label: '景区' },
  { key: 'greenway', label: '绿道' },
  { key: 'free', label: '免费' },
]

// ================================================
// 发布活动
// ================================================

const showCreateActivity = ref(false)
const newActivity = reactive({
  title: '',
  date: '',
  time: '',
  location: '',
  description: '',
  tags: [] as ActivityTag[],
  maxParticipants: 50,
  routeId: '',
  routeName: '',
})

function handleCreateActivity() {
  // 这里应该调用API创建活动
  console.log('创建活动:', newActivity)
  showCreateActivity.value = false
  // 重置表单
  Object.assign(newActivity, {
    title: '',
    date: '',
    time: '',
    location: '',
    description: '',
    tags: [] as ActivityTag[],
    maxParticipants: 50,
    routeId: '',
    routeName: '',
  })
  // 重新加载活动列表
  loadActivities()
  // 显示成功提示
  useGlobalToast().show({
    message: '活动创建成功',
    type: 'success'
  })
}

// ================================================
// 匿名报名
// ================================================

const showSignup = ref(false)
const selectedActivity = ref<Activity | null>(null)
const signupInfo = reactive({
  nickname: '',
  phone: '',
  motorcycle: '',
  note: '',
})

function handleSignup() {
  // 这里应该调用API报名
  console.log('报名信息:', signupInfo)
  showSignup.value = false
  // 重置表单
  Object.assign(signupInfo, {
    nickname: '',
    phone: '',
    motorcycle: '',
    note: '',
  })
  // 显示成功提示
  useGlobalToast().show({
    message: '报名成功',
    type: 'success'
  })
}

function openSignupModal(activity: Activity) {
  selectedActivity.value = activity
  showSignup.value = true
}

// ================================================
// AA计算器
// ================================================

const aaTotal = ref(0)
const aaParticipants = ref(1)
const aaResult = computed(() => {
  if (aaParticipants.value === 0) return 0
  return aaTotal.value / aaParticipants.value
})

// ================================================
// 路书生成
// ================================================

const routeName = ref('')
const routeStops = ref([{ name: '', location: '' }])
const routeDescription = ref('')

function addRouteStop() {
  routeStops.value.push({ name: '', location: '' })
}

function removeRouteStop(index: number) {
  if (routeStops.value.length > 1) {
    routeStops.value.splice(index, 1)
  }
}

function generateRoute() {
  // 这里应该调用API生成路书
  console.log('生成路书:', {
    name: routeName.value,
    stops: routeStops.value,
    description: routeDescription.value
  })
  // 显示成功提示
  useGlobalToast().show({
    message: '路书生成成功',
    type: 'success'
  })
}

// ================================================
// 路由
// ================================================

const router = useRouter()

function handleActivityClick(activity: Activity) {
  if (activity.routeId) {
    router.push({
      path: '/pages/map/map',
      query: { routeId: activity.routeId },
    })
  }
}

function handleViewRoute(activity: Activity) {
  if (activity.routeId) {
    router.push({
      path: '/pages/map/map',
      query: { routeId: activity.routeId },
    })
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
    <!-- #ifdef H5 -->
    <view class="pointer-events-none absolute inset-x-0 top-0 z-0 h-[240rpx]" :style="{ background: 'radial-gradient(circle at top, rgba(var(--wot-color-theme-rgb),0.18), transparent 55%)' }" />
    <view class="pointer-events-none absolute inset-0 z-0 opacity-5" :style="{ background: `repeating-linear-gradient(45deg, transparent, transparent 40rpx, var(--wot-color-theme) 40rpx, var(--wot-color-theme) 80rpx), repeating-linear-gradient(-45deg, transparent, transparent 40rpx, var(--wot-color-theme) 40rpx, var(--wot-color-theme) 80rpx)` }" />
    <!-- #endif -->
    <!-- #ifndef H5 -->
    <view class="pointer-events-none absolute inset-x-0 top-0 z-0 h-[240rpx]" :style="{ background: 'linear-gradient(to bottom, rgba(46, 213, 115, 0.25), transparent 100%)' }" />
    <view class="pointer-events-none absolute inset-0 z-0 opacity-3" :style="{ background: 'repeating-linear-gradient(45deg, transparent, transparent 40rpx, #2ED573 40rpx, #2ED573 80rpx), repeating-linear-gradient(-45deg, transparent, transparent 40rpx, #2ED573 40rpx, #2ED573 80rpx)' }" />
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
          <text class="i-carbon:calendar text-[36rpx] text-primary" />
          <text class="text-[32rpx] font-700 tracking-[1px]" :style="{ color: '#2ED573' }">活动工具</text>
        </view>
        <view class="flex items-center gap-[8rpx] rounded-[10rpx] bg-card/50 px-[16rpx] py-[10rpx]">
          <text class="i-carbon:shield text-[24rpx] text-primary" />
          <text class="text-[22rpx] text-white/80 font-500">匿名报名</text>
        </view>
      </view>

      <!-- 标签页 -->
      <view class="flex border-b border-white/10 bg-[var(--wot-color-bg-card)]/30">
        <button
          v-for="tab in ['activities', 'create', 'aa', 'route']"
          :key="tab"
          class="flex-1 py-[32rpx] text-[24rpx] font-500 transition-all"
          :class="activeTab === tab ? 'text-primary border-b-2 border-primary' : 'text-gray'"
          @click="activeTab = tab"
        >
          {{ tab === 'activities' ? '活动列表' : tab === 'create' ? '发布活动' : tab === 'aa' ? 'AA计算器' : '路书生成' }}
        </button>
      </view>

      <!-- 活动列表标签页 -->
      <view v-if="activeTab === 'activities'">
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

      <!-- 筛选标签 -->
      <view class="px-[24rpx] pb-[16rpx]">
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

      <!-- 活动列表 -->
      <view class="px-[24rpx]">
        <view class="space-y-[20rpx]">
          <view
            v-for="activity in filteredActivities"
            :key="activity.id"
            class="bg-card rounded-[16rpx] overflow-hidden"
          >
            <activity-ActivityCard
              :activity="activity"
              @click="handleActivityClick"
              @view-route="handleViewRoute"
            />
            <!-- 报名按钮 -->
            <view class="p-[20rpx] border-t border-border">
              <button
                class="w-full py-[20rpx] bg-primary rounded-[12rpx] text-white text-[24rpx] font-500"
                @click="openSignupModal(activity)"
                :disabled="activity.status === 'ended'"
              >
                {{ activity.status === 'ended' ? '活动已结束' : '立即报名' }}
              </button>
            </view>
          </view>
        </view>

        <!-- 空状态 -->
        <view v-if="filteredActivities.length === 0 && !loading" class="flex flex-col items-center justify-center py-[100rpx]">
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

    <!-- 发布活动标签页 -->
    <view v-else-if="activeTab === 'create'" class="p-[24rpx]">
      <view class="space-y-[24rpx]">
        <wd-input
          v-model="newActivity.title"
          placeholder="活动标题"
          class="bg-card rounded-[12rpx]"
        />
        <view class="flex gap-[12rpx]">
          <wd-input
            v-model="newActivity.date"
            placeholder="日期"
            type="date"
            class="flex-1 bg-card rounded-[12rpx]"
          />
          <wd-input
            v-model="newActivity.time"
            placeholder="时间"
            type="time"
            class="flex-1 bg-card rounded-[12rpx]"
          />
        </view>
        <wd-input
          v-model="newActivity.location"
          placeholder="地点"
          class="bg-card rounded-[12rpx]"
        />
        <wd-textarea
          v-model="newActivity.description"
          placeholder="活动描述"
          rows="4"
          class="bg-card rounded-[12rpx]"
        />
        <view>
          <text class="block text-[24rpx] text-white mb-[12rpx]">活动标签</text>
          <view class="flex flex-wrap gap-[12rpx]">
            <button
              v-for="(config, tag) in ACTIVITY_TAG_CONFIG"
              :key="tag"
              class="px-[24rpx] py-[10rpx] rounded-[28rpx] text-[22rpx] font-500 transition-all"
              :class="newActivity.tags.includes(tag as ActivityTag) ? 'bg-primary text-white' : 'bg-card text-gray'"
              @click="() => {
                const index = newActivity.tags.indexOf(tag as ActivityTag)
                if (index > -1) {
                  newActivity.tags.splice(index, 1)
                } else {
                  newActivity.tags.push(tag as ActivityTag)
                }
              }"
            >
              {{ tag === 'night' ? '夜骑' : tag === 'morning' ? '晨骑' : tag === 'gather' ? '聚会' : tag === 'scenic' ? '景区' : tag === 'greenway' ? '绿道' : tag === 'free' ? '免费' : tag === 'photo' ? '摄影' : tag }}
            </button>
          </view>
        </view>
        <wd-input
          v-model.number="newActivity.maxParticipants"
          placeholder="最大参与人数"
          type="number"
          class="bg-card rounded-[12rpx]"
        />
        <wd-input
          v-model="newActivity.routeName"
          placeholder="路书名称"
          class="bg-card rounded-[12rpx]"
        />
        <button
          class="w-full py-[24rpx] bg-primary rounded-[12rpx] text-white text-[26rpx] font-500"
          @click="handleCreateActivity"
        >
          发布活动
        </button>
      </view>
    </view>

    <!-- AA计算器标签页 -->
    <view v-else-if="activeTab === 'aa'" class="p-[24rpx]">
      <view class="space-y-[32rpx]">
        <view class="bg-card rounded-[16rpx] p-[24rpx]">
          <text class="block text-[24rpx] text-white mb-[16rpx]">总费用</text>
          <wd-input
            v-model.number="aaTotal"
            type="number"
            placeholder="输入总费用"
            class="text-[32rpx] font-500"
          />
        </view>
        <view class="bg-card rounded-[16rpx] p-[24rpx]">
          <text class="block text-[24rpx] text-white mb-[16rpx]">参与人数</text>
          <wd-input
            v-model.number="aaParticipants"
            type="number"
            placeholder="输入参与人数"
            class="text-[32rpx] font-500"
          />
        </view>
        <view class="bg-card rounded-[16rpx] p-[24rpx]">
          <text class="block text-[24rpx] text-white mb-[16rpx]">人均费用</text>
          <text class="text-[40rpx] font-600 text-primary">{{ aaResult.toFixed(2) }} 元</text>
        </view>
      </view>
    </view>

    <!-- 路书生成标签页 -->
    <view v-else-if="activeTab === 'route'" class="p-[24rpx]">
      <view class="space-y-[24rpx]">
        <wd-input
          v-model="routeName"
          placeholder="路书名称"
          class="bg-card rounded-[12rpx]"
        />
        <view class="space-y-[16rpx]">
          <text class="block text-[24rpx] text-white">途经点</text>
          <view
            v-for="(stop, index) in routeStops"
            :key="index"
            class="flex gap-[12rpx] items-end"
          >
            <wd-input
              v-model="stop.name"
              placeholder="地点名称"
              class="flex-1 bg-card rounded-[12rpx]"
            />
            <wd-input
              v-model="stop.location"
              placeholder="详细位置"
              class="flex-1 bg-card rounded-[12rpx]"
            />
            <button
              v-if="routeStops.length > 1"
              class="w-[80rpx] h-[80rpx] flex items-center justify-center text-[32rpx] text-gray"
              @click="removeRouteStop(index)"
            >
              <text class="i-carbon:trash-can" />
            </button>
          </view>
          <button
            class="w-full py-[20rpx] border border-border rounded-[12rpx] text-white text-[24rpx]"
            @click="addRouteStop"
          >
            <text class="i-carbon:add mr-[8rpx]" /> 添加途经点
          </button>
        </view>
        <wd-textarea
          v-model="routeDescription"
          placeholder="路书描述"
          rows="4"
          class="bg-card rounded-[12rpx]"
        />
        <button
          class="w-full py-[24rpx] bg-primary rounded-[12rpx] text-white text-[26rpx] font-500"
          @click="generateRoute"
        >
          生成路书
        </button>
      </view>
    </view>

      <!-- 报名弹窗 -->
      <wd-popup v-model:visible="showSignup" position="center" round>
        <view class="p-[32rpx] w-[80vw]">
          <text class="block text-[28rpx] font-600 text-white mb-[24rpx]">报名活动</text>
          <text class="block text-[24rpx] text-white mb-[16rpx]">{{ selectedActivity?.title }}</text>
          <view class="space-y-[20rpx]">
            <wd-input
              v-model="signupInfo.nickname"
              placeholder="昵称（匿名）"
              class="bg-card rounded-[12rpx]"
            />
            <wd-input
              v-model="signupInfo.phone"
              placeholder="联系电话"
              type="tel"
              class="bg-card rounded-[12rpx]"
            />
            <wd-input
              v-model="signupInfo.motorcycle"
              placeholder="车型"
              class="bg-card rounded-[12rpx]"
            />
            <wd-textarea
              v-model="signupInfo.note"
              placeholder="备注"
              rows="3"
              class="bg-card rounded-[12rpx]"
            />
          </view>
          <view class="flex gap-[12rpx] mt-[32rpx]">
            <button
              class="flex-1 py-[20rpx] border border-border rounded-[12rpx] text-white text-[24rpx]"
              @click="showSignup = false"
            >
              取消
            </button>
            <button
              class="flex-1 py-[20rpx] bg-primary rounded-[12rpx] text-white text-[24rpx] font-500"
              @click="handleSignup"
            >
              确认报名
            </button>
          </view>
        </view>
      </wd-popup>

      <!-- 底部合规声明 -->
      <view class="px-[20rpx] py-[12rpx]">
        <text class="text-[18rpx] text-gray/50 text-center block">
          活动信息仅作参考 · 遵守交通法规 · 安全骑行
        </text>
      </view>
    </view>
  </view>
</template>
