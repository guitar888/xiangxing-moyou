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
    ],
  },
  {
    title: '地图功能',
    items: [
      { question: '热门推荐是什么？', answer: '展示襄阳周边热门骑行路线和打卡点，点击可查看详情。' },
      { question: '如何开始骑行？', answer: '在地图页面点击"开始骑行"按钮，系统将记录您的骑行轨迹。结束骑行后数据会自动保存。' },
    ],
  },
  {
    title: '数据统计',
    items: [
      { question: '骑行数据来源是什么？', answer: '骑行数据来自您在地图页面的骑行记录，系统自动统计生成。' },
      { question: '数据可以导出吗？', answer: '目前暂不支持数据导出功能。' },
      { question: '骑行记录可以删除吗？', answer: '可以。在"我的"页面点击"清除本地数据"可删除所有骑行记录。' },
    ],
  },
  {
    title: '其他问题',
    items: [
      { question: '如何切换深色模式？', answer: '在"我的"页面底部找到"深色模式"开关，点击即可切换。' },
      { question: '小程序是盈利性质吗？', answer: '不是。本小程序为襄阳本地摩友公益工具，非盈利、无交易、无社交。' },
      { question: '数据存储在哪里？', answer: '您的骑行数据仅保存在您设备的本地存储中，不会上传至任何服务器。' },
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
