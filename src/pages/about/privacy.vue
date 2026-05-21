<script setup lang="ts">
/**
 * 隐私协议页面
 * 合规必需：明确告知用户数据使用方式
 */
definePage({
  name: 'privacy',
  style: {
    navigationBarTitleText: '隐私协议',
    navigationStyle: 'custom',
  },
})

const router = useRouter()
const { statusBarHeight } = useSystemInfo()

function handleBack() {
  router.back()
}

const sections = [
  {
    title: '一、我们如何收集和使用您的信息',
    content: `本小程序仅在您主动使用"骑行记录"功能时申请位置权限，用于以下目的：

• 记录您的骑行轨迹路线
• 计算骑行距离和时长
• 生成骑行统计数据

位置信息采集说明：
- 仅在您点击"开始骑行"后采集
- 不会在后台偷偷定位
- 您可以随时在手机系统设置中关闭位置权限

本小程序不收集您的手机号、身份证、真实姓名等个人身份信息。`,
  },
  {
    title: '二、我们如何存储和保护您的信息',
    content: `您的所有骑行数据（包括轨迹、距离、时长等）仅存储在您设备的本地存储中。

我们承诺：
- 不会将您的任何数据上传至服务器
- 不会将您的数据传输或分享给第三方
- 不会将您的数据用于任何商业目的

数据安全由您的设备系统保护，我们建议您定期备份重要数据。`,
  },
  {
    title: '三、您如何管理自己的信息',
    content: `您拥有对自己数据的完全控制权：

删除数据：在"我的 - 清除本地数据"中可删除全部骑行记录，删除后无法恢复。

关闭权限：在手机系统设置中关闭本小程序的位置权限，我们将停止采集位置信息。

注销使用：直接删除本小程序即可，不会有任何数据残留。`,
  },
  {
    title: '四、未成年人保护',
    content: `本小程序面向成年摩友群体。未成年人使用本小程序需在监护人指导下进行，监护人应帮助未成年人理解本隐私协议内容。`,
  },
  {
    title: '五、本协议的更新',
    content: `我们可能适时修订本隐私协议。更新后会在小程序内以适当方式通知您。继续使用本小程序即表示您同意更新后的协议。`,
  },
  {
    title: '六、联系我们',
    content: `如果您对本隐私协议有任何疑问，或需要协助管理您的数据，欢迎通过小程序内"关于我们"功能联系管理员。`,
  },
]

const lastUpdate = '2026年5月19日'
</script>

<template>
  <view class="min-h-screen bg-base">
    <!-- 自定义Header -->
    <view
      class="relative z-50 flex items-center justify-between border-b border-white/10 bg-base/80 backdrop-blur-xl"
      :style="{ paddingTop: `${statusBarHeight + 12}px` }"
    >
      <view class="flex items-center gap-[12rpx] px-[24rpx] pb-[12rpx]">
        <text class="i-carbon:arrow-left text-[32rpx] text-primary cursor-pointer" @click="handleBack" />
        <text class="i-carbon:document text-[32rpx] text-primary" />
        <text class="text-[32rpx] font-700 tracking-[1px]" :style="{ color: '#2ED573' }">隐私协议</text>
      </view>
    </view>

    <!-- 内容 -->
    <view class="p-[24rpx]">
      <!-- 声明 -->
      <view class="mb-[24rpx] rounded-[16rpx] border border-white/10 p-[20rpx]" :style="{ background: 'rgba(46, 213, 115, 0.08)' }">
        <view class="flex items-start gap-[12rpx]">
          <text class="i-carbon:shield text-[36rpx] text-primary mt-[4rpx]" />
          <view>
            <text class="text-[26rpx] text-white font-600">数据安全承诺</text>
            <text class="text-[22rpx] text-white/70 mt-[8rpx] block leading-[1.6]">
              您的骑行数据仅保存在本地设备，我们严格遵守相关法规，保护您的隐私安全。本小程序为非盈利公益工具，不收集个人身份信息。
            </text>
          </view>
        </view>
      </view>

      <!-- 协议内容 -->
      <view class="flex flex-col gap-[16rpx]">
        <view
          v-for="(section, index) in sections"
          :key="index"
          class="rounded-[16rpx] bg-card border border-white/10 p-[20rpx]"
        >
          <view class="flex items-center gap-[8rpx] mb-[12rpx]">
            <text class="i-carbon:policy text-[24rpx] text-primary" />
            <text class="text-[26rpx] text-white font-600">{{ section.title }}</text>
          </view>
          <text class="text-[22rpx] text-white/60 leading-[1.8] whitespace-pre-line">{{ section.content }}</text>
        </view>
      </view>

      <!-- 底部 -->
      <view class="mt-[32rpx] text-center">
        <text class="text-[20rpx] text-white/40">最后更新：{{ lastUpdate }}</text>
      </view>
    </view>
  </view>
</template>
