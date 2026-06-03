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
    title: '骑行记录',
    items: [
      {
        question: '如何开始骑行记录？',
        answer: '在地图页面点击"开始骑行"按钮，授权位置权限后，系统将自动记录您的骑行轨迹、距离和时长。结束骑行后数据会自动保存到本地。',
      },
      {
        question: '骑行轨迹是如何记录的？',
        answer: '系统通过手机 GPS 定位功能，在骑行过程中持续采集您的位置坐标，形成完整的轨迹路线。轨迹数据仅保存在您的设备本地，不会上传至任何服务器。',
      },
      {
        question: '位置权限是必需的吗？',
        answer: '是的。骑行记录功能需要获取您的位置信息才能记录轨迹和计算里程。我们仅在您主动开始骑行后采集位置，不会在后台偷偷定位。',
      },
      {
        question: '如何关闭位置权限？',
        answer: '您可以在手机系统设置中找到本小程序，关闭"位置信息"权限。关闭后仍可正常使用其他功能，但无法再记录骑行轨迹。如需恢复，重新开启权限即可。',
      },
      {
        question: '骑行记录可以删除吗？',
        answer: '可以。在"我的"页面点击"清除本地数据"可删除所有骑行记录。删除后数据无法恢复。',
      },
    ],
  },
  {
    title: '数据统计',
    items: [
      {
        question: '骑行数据来源是什么？',
        answer: '骑行数据来自您在地图页面的骑行记录，系统自动统计生成总里程、总时长、骑行次数等信息。',
      },
      {
        question: '数据可以导出或同步吗？',
        answer: '目前数据仅保存在设备本地，暂不支持导出或云端同步功能。建议定期截图保存重要数据。',
      },
      {
        question: '更换手机后数据还在吗？',
        answer: '不在。由于数据仅保存在本地，更换设备后需要重新开始记录。',
      },
    ],
  },
  {
    title: '路线与活动',
    items: [
      {
        question: '骑行路书是什么？',
        answer: '展示襄阳及周边（谷城、南漳、保康等）高质量骑行路线和打卡点，包含路线难度、距离、沿途景点、餐饮等信息，点击可查看详情和导航。',
      },
      {
        question: '如何报名参加活动？',
        answer: '在首页或活动页面找到感兴趣的活动，点击"立即报名"即可。活动数据仅用于展示，不涉及任何费用交易。',
      },
      {
        question: '路线数据准确吗？',
        answer: '路线坐标基于地图服务估算，仅供参考。实际路况、封路情况、施工等可能有变化。骑行前请实地确认路线安全性，遵守交通规则，安全驾驶。',
      },
    ],
  },
  {
    title: '隐私与合规',
    items: [
      {
        question: '我的数据会被上传吗？',
        answer: '不会。您的所有骑行数据、位置信息仅保存在设备本地存储中，不会上传、传输或分享给任何第三方服务器。',
      },
      {
        question: '小程序是否收集个人信息？',
        answer: '本小程序不收集手机号、身份证、真实姓名等个人身份信息。仅在您使用骑行功能时申请位置权限，用于记录轨迹。',
      },
      {
        question: '这是盈利性应用吗？',
        answer: '不是。本小程序为襄阳本地摩友公益工具，非盈利、无交易、无付费功能、无广告推广。',
      },
      {
        question: '未成年人可以使用吗？',
        answer: '本小程序面向成年用户。未成年人需在监护人指导下使用，监护人应帮助未成年人理解隐私协议内容并管理设备权限。',
      },
      {
        question: '如何彻底删除我的数据？',
        answer: '在"我的"页面点击"清除本地数据"，确认后即可删除所有骑行记录。您也可以直接删除本小程序，不会有任何数据残留。',
      },
    ],
  },
  {
    title: '其他问题',
    items: [
      {
        question: '如何切换深色模式？',
        answer: '在"我的"页面底部找到"深色模式"开关，点击即可切换浅色/深色主题。',
      },
      {
        question: '小程序支持哪些地区？',
        answer: '目前主要服务襄阳全市（市区、谷城、南漳、保康等），后续可能扩展至湖北其他地区。',
      },
      {
        question: '遇到问题如何联系？',
        answer: '在"我的"页面点击"关于我"，可查看管理员微信号。添加微信后直接与开发者沟通反馈。',
      },
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
  <view class="min-h-screen from-base via-[var(--wot-color-bg-hover)] to-[var(--wot-color-bg-card)] bg-gradient-to-br">
    <view class="px-[24rpx] pt-[24rpx]">
      <view v-for="(section, sIndex) in helpSections" :key="sIndex" class="mb-[24rpx]">
        <view class="mb-[16rpx] flex items-center gap-[8rpx] text-[28rpx] text-white font-600">
          <text class="i-carbon:catalog text-[24rpx] text-primary" />
          {{ section.title }}
        </view>
        <view class="overflow-hidden border border-white/10 rounded-[16rpx] bg-card">
          <view
            v-for="(item, iIndex) in section.items"
            :key="iIndex"
            class="border-b border-white/5 last:border-b-0"
          >
            <view
              class="flex items-center justify-between p-[24rpx] active:bg-white/5"
              @click="toggleItem(sIndex * 100 + iIndex)"
            >
              <text class="text-[24rpx] text-white">
                {{ item.question }}
              </text>
              <text
                class="text-[20rpx] text-gray transition-transform duration-200"
                :class="expandedItems.has(sIndex * 100 + iIndex) ? 'i-carbon:chevron-up' : 'i-carbon:chevron-down'"
              />
            </view>
            <view
              v-if="expandedItems.has(sIndex * 100 + iIndex)"
              class="px-[24rpx] pb-[24rpx] pt-0"
            >
              <text class="text-[22rpx] text-gray leading-relaxed">
                {{ item.answer }}
              </text>
            </view>
          </view>
        </view>
      </view>

      <!-- 底部提示 -->
      <view class="py-[40rpx]">
        <text class="block text-center text-[18rpx] text-gray">
          如有其他问题，请在"关于我"中添加管理员微信联系
        </text>
      </view>
    </view>
  </view>
</template>
