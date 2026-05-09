<script setup lang="ts">
definePage({
  name: 'help',
  style: {
    navigationBarTitleText: '帮助中心',
    navigationBarBackgroundColor: '#121212',
    navigationBarTextStyle: 'white',
  },
})

const helpSections = [
  {
    title: '首页功能',
    items: [
      { question: '骑行数据是什么？', answer: '展示您的骑行统计信息，包括骑行次数、总里程、总时长等数据。' },
      { question: '活动公告有什么用？', answer: '展示最新的摩友活动信息，点击可查看活动详情。' },
      { question: '口碑店铺是什么？', answer: '推荐襄阳本地优质摩托车相关店铺，方便摩友了解。' },
    ],
  },
  {
    title: '地图功能',
    items: [
      { question: '热门推荐是什么？', answer: '展示襄阳周边热门骑行路线和打卡点，点击可查看详情。' },
      { question: '如何使用地图？', answer: '地图页面支持缩放、拖动，点击标记点可查看详细信息。' },
    ],
  },
  {
    title: '数据统计',
    items: [
      { question: '数据来源是什么？', answer: '骑行数据由用户手动记录或系统自动统计生成。' },
      { question: '数据可以导出吗？', answer: '目前暂不支持数据导出功能，后续版本会考虑添加。' },
    ],
  },
  {
    title: '活动功能',
    items: [
      { question: '如何参与活动？', answer: '点击活动卡片的"立即报名"按钮，按提示操作即可。活动详情请留意群公告。' },
      { question: 'AA计算器是什么？', answer: '用于计算活动费用的AA分摊金额，输入总费用和人数即可快速计算。' },
    ],
  },
  {
    title: '其他问题',
    items: [
      { question: '如何联系管理员？', answer: '在"我的"页面点击"关于我们"，可获取管理员微信联系方式。' },
      { question: '如何切换暗黑模式？', answer: '在"我的"页面底部找到"暗黑模式"开关，点击即可切换。' },
      { question: '小程序是盈利性质吗？', answer: '不是。本小程序为襄阳本地摩友公益工具，非盈利、无交易、无社交。' },
    ],
  },
]

const expandedItems = ref<Set<number>>(new Set())

function toggleItem(index: number) {
  if (expandedItems.value.has(index)) {
    expandedItems.value.delete(index)
  }
  else {
    expandedItems.value.add(index)
  }
}
</script>

<template>
  <view class="min-h-screen bg-gradient-to-br from-base via-[var(--wot-color-bg-hover)] to-[var(--wot-color-bg-card)]">
    <view class="px-[24rpx] pt-[24rpx]">
      <view v-for="(section, sIndex) in helpSections" :key="sIndex" class="mb-[24rpx]">
        <view class="text-[28rpx] font-600 text-white mb-[16rpx] flex items-center gap-[8rpx]">
          <text class="i-carbon:catalog text-[24rpx] text-primary" />
          {{ section.title }}
        </view>
        <view class="bg-card rounded-[16rpx] overflow-hidden border border-white/10">
          <view
            v-for="(item, iIndex) in section.items"
            :key="iIndex"
            class="border-b border-white/5 last:border-b-0"
          >
            <view
              class="flex items-center justify-between p-[24rpx] active:bg-white/5"
              @click="toggleItem(sIndex * 100 + iIndex)"
            >
              <text class="text-[24rpx] text-white">{{ item.question }}</text>
              <text
                class="text-[20rpx] text-gray transition-transform duration-200"
                :class="expandedItems.has(sIndex * 100 + iIndex) ? 'i-carbon:chevron-up' : 'i-carbon:chevron-down'"
              />
            </view>
            <view
              v-if="expandedItems.has(sIndex * 100 + iIndex)"
              class="px-[24rpx] pb-[24rpx] pt-0"
            >
              <text class="text-[22rpx] text-gray leading-relaxed">{{ item.answer }}</text>
            </view>
          </view>
        </view>
      </view>

      <!-- 底部提示 -->
      <view class="py-[40rpx]">
        <text class="text-[18rpx] text-gray text-center block">
          如有其他问题，请在"关于我们"中联系管理员
        </text>
      </view>
    </view>
  </view>
</template>
