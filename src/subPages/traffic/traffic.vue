<script setup lang="ts">
/**
 * 禁摩限行页面
 * 展示襄阳本地摩托车限行政策，为摩友提供安全出行指南
 */
import type { TrafficPolicy } from '@/types'

definePage({
  name: 'traffic',
  style: {
    navigationBarTitleText: '禁摩限行',
    navigationBarBackgroundColor: '#121212',
    navigationBarTextStyle: 'white',
  },
})

// ================================================
// 数据
// ================================================

const policies = ref<TrafficPolicy[]>([
  {
    id: '1',
    title: '襄阳市摩托车限行规定',
    content: '根据襄阳市交通管理部门规定，摩托车在特定区域和时间实行限行管理，请广大摩友遵守交通规则，安全文明出行。',
    effectiveDate: '2024年1月1日起实施',
  },
  {
    id: '2',
    title: '市中心核心区域限行',
    content: '襄阳火车站周边、人民广场周边、长虹路核心商圈等区域在工作日早高峰（7:00-9:00）和晚高峰（17:00-19:00）禁止摩托车通行。',
    area: '襄阳市中心核心区域',
    time: '工作日 7:00-9:00 / 17:00-19:00',
  },
  {
    id: '3',
    title: '桥梁隧道限行规定',
    content: '襄阳汉江大桥、长虹大桥、卧龙大桥等主要桥梁全天禁止摩托车通行。请选择合法通道过江。',
    area: '襄阳市主要桥梁隧道',
    time: '全天',
  },
  {
    id: '4',
    title: '高速公路禁止通行',
    content: '摩托车不得驶入高速公路，请提前规划路线，选择普通公路通行。',
    vehicleType: '所有摩托车',
    time: '全天',
  },
])

const tips = ref([
  { icon: 'i-carbon:warning', text: '出行前请提前了解当日限行政策' },
  { icon: 'i-carbon:document', text: '随身携带驾驶证、行驶证、保险凭证' },
  { icon: 'i-carbon:location', text: '使用导航避开限行区域' },
  { icon: 'i-carbon:time', text: '高峰时段尽量避开市中心' },
  { icon: 'i-carbon:helmet', text: '佩戴头盔，文明驾驶' },
])

const activePolicy = ref<TrafficPolicy | null>(null)

function showPolicyDetail(policy: TrafficPolicy) {
  activePolicy.value = policy
}

function closePolicyDetail() {
  activePolicy.value = null
}
</script>

<template>
  <view class="min-h-screen bg-base pb-[40rpx]">
    <!-- 提示横幅 -->
    <view class="px-[24rpx] pt-[20rpx]">
      <view class="bg-warning/10 border border-warning/30 rounded-[16rpx] p-[20rpx] flex items-center gap-[16rpx]">
        <text class="i-carbon:warning text-[40rpx] text-warning flex-shrink-0" />
        <text class="text-[24rpx] text-warning flex-1">出行前请提前了解当日限行政策，遵守交通规则</text>
      </view>
    </view>

    <!-- 政策列表 -->
    <view class="px-[24rpx] mt-[24rpx]">
      <text class="text-[28rpx] font-600 text-white mb-[16rpx] block">限行政策</text>
      <view class="space-y-[16rpx]">
        <view
          v-for="policy in policies"
          :key="policy.id"
          class="bg-card rounded-[16rpx] p-[24rpx]"
          @click="showPolicyDetail(policy)"
        >
          <view class="flex items-start justify-between">
            <view class="flex-1">
              <text class="text-[26rpx] font-600 text-white block mb-[8rpx]">{{ policy.title }}</text>
              <text class="text-[22rpx] text-gray line-clamp-2">{{ policy.content }}</text>
            </view>
            <text class="i-carbon:chevron-right text-[24rpx] text-gray ml-[16rpx]" />
          </view>
          <view v-if="policy.area || policy.time" class="flex gap-[24rpx] mt-[16rpx]">
            <view v-if="policy.area" class="flex items-center gap-[6rpx]">
              <text class="i-carbon:location text-[20rpx] text-gray" />
              <text class="text-[20rpx] text-gray">{{ policy.area }}</text>
            </view>
            <view v-if="policy.time" class="flex items-center gap-[6rpx]">
              <text class="i-carbon:time text-[20rpx] text-gray" />
              <text class="text-[20rpx] text-gray">{{ policy.time }}</text>
            </view>
          </view>
        </view>
      </view>
    </view>

    <!-- 安全提示 -->
    <view class="px-[24rpx] mt-[24rpx]">
      <text class="text-[28rpx] font-600 text-white mb-[16rpx] block">安全出行指南</text>
      <view class="bg-card rounded-[16rpx] p-[24rpx]">
        <view
          v-for="(tip, index) in tips"
          :key="index"
          class="flex items-center gap-[16rpx] py-[12rpx]"
          :style="index < tips.length - 1 ? { borderBottom: '1rpx solid var(--wot-color-border)' } : {}"
        >
          <text :class="tip.icon + ' text-[28rpx] text-primary'" />
          <text class="text-[24rpx] text-white flex-1">{{ tip.text }}</text>
        </view>
      </view>
    </view>

    <!-- 合规声明 -->
    <view class="px-[24rpx] mt-[40rpx] text-center">
      <text class="text-[20rpx] text-gray">本平台仅提供限行信息参考，具体政策以官方公告为准</text>
    </view>

    <!-- 政策详情弹窗 -->
    <view
      v-if="activePolicy"
      class="fixed inset-0 z-[998] bg-black/60"
      @click="closePolicyDetail"
    />
    <view
      v-if="activePolicy"
      class="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-[999] w-[650rpx] bg-card rounded-[24rpx] p-[32rpx]"
    >
      <text class="text-[30rpx] font-600 text-white block mb-[16rpx]">{{ activePolicy.title }}</text>
      <text class="text-[24rpx] text-gray leading-[36rpx] block mb-[20rpx]">{{ activePolicy.content }}</text>
      <view v-if="activePolicy.area" class="flex items-center gap-[8rpx] mb-[12rpx]">
        <text class="i-carbon:location text-[24rpx] text-primary" />
        <text class="text-[24rpx] text-white">{{ activePolicy.area }}</text>
      </view>
      <view v-if="activePolicy.time" class="flex items-center gap-[8rpx] mb-[12rpx]">
        <text class="i-carbon:time text-[24rpx] text-primary" />
        <text class="text-[24rpx] text-white">{{ activePolicy.time }}</text>
      </view>
      <view v-if="activePolicy.effectiveDate" class="flex items-center gap-[8rpx]">
        <text class="i-carbon:calendar text-[24rpx] text-primary" />
        <text class="text-[24rpx] text-white">{{ activePolicy.effectiveDate }}</text>
      </view>
      <button
        class="mt-[24rpx] w-full py-[20rpx] bg-primary rounded-[12rpx] text-[26rpx] text-white font-500"
        @click="closePolicyDetail"
      >
        我已知晓
      </button>
    </view>
  </view>
</template>
