<script setup lang="ts">
import { mockAdminContact } from '@/api/mock/activityMock'

definePage({
  name: 'about',
  layout: 'tabbar',
  style: {
    navigationBarTitleText: '关于',
  },
})

const { success: showToast } = useGlobalToast()

// 提车日期：2024 年 6 月 19 日
const deliveryDate = new Date('2024-06-19')
const today = new Date()

// 精确计算骑行年限（小数）
const ridingYearsDecimal = (today.getTime() - deliveryDate.getTime()) / (365.25 * 24 * 60 * 60 * 1000)
const ridingYears = ridingYearsDecimal.toFixed(1)

// 13 年强制报废进度计算
const maxYears = 13
const expiryDate = new Date(deliveryDate)
expiryDate.setFullYear(deliveryDate.getFullYear() + maxYears)
const daysRemaining = Math.floor((expiryDate.getTime() - today.getTime()) / (24 * 60 * 60 * 1000))
const yearsRemaining = (expiryDate.getTime() - today.getTime()) / (365.25 * 24 * 60 * 60 * 1000)
const progressPercent = (ridingYearsDecimal / maxYears) * 100

// 幽默文案
function getHumorousMessage() {
  if (yearsRemaining > 10)
    return '正值当打之年，还能浪很久~'
  if (yearsRemaining > 5)
    return '壮年时期，继续驰骋江湖'
  if (yearsRemaining > 2)
    return '中年危机倒计时，且骑且珍惜'
  if (yearsRemaining > 0.5)
    return '且行且珍惜，多看一眼是一眼'
  return '13 年大限将至，准备迎娶新欢吧！'
}

const adminInfo = {
  nickname: '明辰',
  avatar: '/static/avatar.png',
  wechatId: mockAdminContact.wechatId,
  wechatDescription: mockAdminContact.description,
  qrCodeImage: '/static/qrcode.jpeg',
  description: '野生摄影师 | 巡航车主 | 机电/软件/AI 工程师',
  bikeInfo: `2024.06.19 提车 | 奔达灰石 250cc 复古巡航`,
  ridingYears,
  expiryDate: expiryDate.toISOString().split('T')[0],
  daysRemaining,
  yearsRemaining: yearsRemaining.toFixed(1),
  progressPercent,
  humorousMessage: getHumorousMessage(),
  intro: `在襄阳骑了${ridingYears}年车，拍过无数日出日落。

喜欢用镜头记录摩友们的帅气身影，
也喜欢在汉江边蹲守夕阳下的机车大片。

如果你也爱摄影、爱骑行，
欢迎来聊~ 🏍️📷`
}

function copyWechatId() {
  uni.setClipboardData({
    data: adminInfo.wechatId,
    success: () => {
      showToast({ msg: '微信号已复制' })
    }
  })
}
</script>

<template>
  <view class="min-h-screen overflow-hidden">
    <view class="relative min-h-screen">
      <view class="from-gray-900 via-gray-800 to-gray-900 absolute inset-0 bg-gradient-to-br" />
      <view class="absolute inset-0 opacity-20" :style="{ background: 'linear-gradient(135deg, rgba(46, 213, 115, 0.1) 0%, transparent 50%, rgba(46, 213, 115, 0.05) 100%)' }" />
      <view class="absolute left-0 top-0 h-full w-full overflow-hidden">
        <view class="absolute left-[-100rpx] top-[100rpx] h-[300rpx] w-[300rpx] rounded-full bg-primary/5 blur-[100rpx]" />
        <view class="absolute right-[-80rpx] top-[300rpx] h-[250rpx] w-[250rpx] rounded-full bg-primary/10 blur-[80rpx]" />
      </view>

      <view class="relative px-[32rpx] pt-[60rpx]">
        <view class="mb-[16rpx] flex justify-center">
          <view class="i-carbon:bookmark text-[48rpx] text-white" />
        </view>
        <view class="mb-[48rpx] text-center">
          <text class="text-[40rpx] text-white font-800 tracking-[3px]">
            ABOUT ME
          </text>
          <view class="mt-[12rpx] flex justify-center">
            <view class="h-[3rpx] w-[80rpx] rounded-full from-transparent via-primary to-transparent bg-gradient-to-r" />
          </view>
        </view>

        <!-- 头像区域：去掉"襄阳摩友"文字 -->
        <view class="relative z-10 mb-[48rpx] flex justify-center">
          <view class="h-[200rpx] w-[200rpx] flex items-center justify-center overflow-hidden border-2 border-primary/30 rounded-[40rpx] bg-primary/10 shadow-[0_0_60rpx_rgba(46,213,115,0.2)]">
            <image
              :src="adminInfo.avatar"
              class="h-full w-full"
              mode="aspectFill"
            />
          </view>
        </view>

        <view class="border border-white/10 rounded-[32rpx] bg-card/80 p-[32rpx] shadow-xl backdrop-blur-xl">
          <view class="mb-[24rpx] text-center">
            <text class="text-[44rpx] text-white font-800 tracking-[2px]">
              {{ adminInfo.nickname }}
            </text>
            <view class="mt-[8rpx] flex justify-center">
              <text class="text-[24rpx] text-white tracking-widest">
                {{ adminInfo.description }}
              </text>
            </view>
          </view>
          <!-- 座驾信息 -->
          <view class="mt-[16rpx] border-t border-white/10 pt-[16rpx]">
            <text class="text-[22rpx] text-white/80">
              {{ adminInfo.bikeInfo }}
            </text>
          </view>
        </view>

        <!-- 标签区域：图标/文字改为白色 -->
        <view class="mb-[40rpx] mt-[32rpx] flex flex-wrap justify-center gap-[16rpx]">
          <view class="flex items-center gap-[8rpx] rounded-[20rpx] bg-primary/20 px-[24rpx] py-[12rpx]">
            <text class="text-[24rpx]">
              📷
            </text>
            <text class="text-[24rpx] text-white font-600">
              野生摄影师
            </text>
          </view>
          <view class="flex items-center gap-[8rpx] rounded-[20rpx] bg-primary/20 px-[24rpx] py-[12rpx]">
            <text class="text-[24rpx]">
              🏍️
            </text>
            <text class="text-[24rpx] text-white font-600">
              巡航车主
            </text>
          </view>
        </view>

        <!-- 骑行时长 & 报废倒计时 -->
        <view class="mb-[24rpx] border border-primary/20 rounded-[24rpx] from-primary/10 via-primary/5 to-transparent bg-gradient-to-br p-[32rpx]">
          <!-- 骑行时长 -->
          <view class="mb-[24rpx] flex items-center justify-between">
            <view class="flex items-center gap-[12rpx]">
              <view class="h-[48rpx] w-[48rpx] flex items-center justify-center rounded-[12rpx] bg-primary/20">
                <text class="i-carbon:time text-[28rpx] text-white" />
              </view>
              <view>
                <text class="block text-[20rpx] text-white/70">
                  已陪伴你
                </text>
                <text class="text-[32rpx] text-white font-800">
                  {{ adminInfo.ridingYears }}<text class="ml-[4rpx] text-[20rpx] font-500">
                    年
                  </text>
                </text>
              </view>
            </view>
            <view class="text-right">
              <text class="block text-[20rpx] text-white/70">
                提车日期
              </text>
              <text class="text-[22rpx] text-white font-600">
                {{ deliveryDate.toLocaleDateString('zh-CN') }}
              </text>
            </view>
          </view>

          <!-- 报废进度条 -->
          <view class="mb-[16rpx]">
            <view class="mb-[12rpx] flex items-center justify-between">
              <text class="text-[20rpx] text-white/70">
                13 年强制报废倒计时
              </text>
              <text class="text-[20rpx] text-white/70">
                已用{{ (adminInfo.progressPercent).toFixed(0) }}%
              </text>
            </view>
            <!-- 进度条背景 -->
            <view class="bg-gray-800/80 relative h-[32rpx] overflow-hidden border border-white/10 rounded-[16rpx]">
              <!-- 渐变进度条 -->
              <view
                class="absolute left-0 top-0 h-full rounded-[16rpx] transition-all duration-500"
                :style="{
                  width: `${adminInfo.progressPercent}%`,
                  background: 'linear-gradient(90deg, #2ED573 0%, #7BED9F 50%, #FFA502 85%, #FF6348 100%)',
                }"
              >
                <!-- 流光效果 -->
                <view class="absolute inset-0 overflow-hidden">
                  <view
                    class="absolute inset-0 opacity-30"
                    :style="{
                      background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.8) 50%, transparent 100%)',
                      animation: 'shimmer 2s infinite',
                    }"
                  />
                </view>
              </view>
              <!-- 剩余年限标签 -->
              <view class="absolute inset-0 flex items-center justify-center">
                <text class="text-[18rpx] text-white font-700 drop-shadow-[0_2rpx_4rpx_rgba(0,0,0,0.8)]">
                  还能浪 {{ adminInfo.yearsRemaining }} 年
                </text>
              </view>
            </view>
            <!-- 到期日期 -->
            <view class="mt-[12rpx] flex items-center justify-between border-t border-white/10 pt-[12rpx]">
              <text class="text-[18rpx] text-white/60">
                预计大限：{{ adminInfo.expiryDate }}
              </text>
              <text class="text-[18rpx] text-white/60">
                剩余 {{ adminInfo.daysRemaining }} 天
              </text>
            </view>
          </view>

          <!-- 幽默文案 -->
          <view class="mt-[20rpx] border-t border-white/10 pt-[20rpx]">
            <view class="flex items-center gap-[8rpx]">
              <text class="i-carbon:face-cool text-[24rpx] text-primary" />
              <text class="text-[20rpx] text-white/80 italic">
                {{ adminInfo.humorousMessage }}
              </text>
            </view>
          </view>
        </view>

        <!-- 个人签名 -->
        <view class="bg-bg-hover mb-[24rpx] rounded-[24rpx] p-[32rpx]">
          <view class="mb-[20rpx] flex items-center gap-[12rpx]">
            <view class="h-[48rpx] w-[48rpx] flex items-center justify-center rounded-[12rpx] bg-primary/20">
              <text class="text-[28rpx]">
                ✍️
              </text>
            </view>
            <text class="text-[26rpx] text-white font-600">
              个人签名
            </text>
          </view>
          <text class="whitespace-pre-line text-[26rpx] text-white/90 leading-[1.9]">
            {{ adminInfo.intro }}
          </text>
        </view>

        <!-- 微信号 -->
        <view class="bg-bg-hover rounded-[20rpx] p-[28rpx]">
          <view class="flex items-center justify-between">
            <view class="flex items-center gap-[16rpx]">
              <view class="h-[56rpx] w-[56rpx] flex items-center justify-center rounded-[14rpx] bg-primary/20">
                <text class="i-carbon:logo-wechat text-[28rpx] text-white" />
              </view>
              <view>
                <text class="mb-[4rpx] block text-[20rpx] text-white">
                  微信号
                </text>
                <text class="text-[26rpx] text-white font-600">
                  {{ adminInfo.wechatId }}
                </text>
              </view>
            </view>
            <view
              class="flex items-center gap-[8rpx] rounded-[16rpx] bg-primary/10 px-[20rpx] py-[12rpx] transition-all duration-200 active:scale-95"
              @click="copyWechatId"
            >
              <text class="i-carbon:copy text-[24rpx] text-white" />
              <text class="text-[24rpx] text-white">
                复制
              </text>
            </view>
          </view>
          <!-- 管理员联系方式说明 -->
          <view class="mt-[16rpx] border-t border-white/10 pt-[16rpx]">
            <text class="text-[20rpx] text-white/70">
              {{ adminInfo.wechatDescription }}
            </text>
          </view>
        </view>

        <view class="mt-[32rpx] flex justify-center">
          <view class="h-[200rpx] w-[200rpx] overflow-hidden border border-white/10 rounded-[24rpx] shadow-lg">
            <image
              :src="adminInfo.qrCodeImage"
              class="h-full w-full"
              mode="aspectFill"
            />
          </view>
        </view>

        <view class="mb-[60rpx] mt-[48rpx]">
          <view class="mb-[12rpx] flex justify-center gap-[8rpx]">
            <view class="h-[2rpx] w-[40rpx] rounded-full from-transparent to-primary/50 bg-gradient-to-r" />
            <view class="h-[2rpx] w-[40rpx] rounded-full from-transparent to-primary/50 bg-gradient-to-l" />
          </view>
          <text class="block text-center text-[20rpx] text-white/40">
            襄阳本地摩友公益工具
          </text>
          <text class="mt-[8rpx] block text-center text-[18rpx] text-white/30">
            非盈利 · 无交易 · 本地存储
          </text>
        </view>

        <!-- 合规声明 -->
        <view class="mb-[40rpx] mt-[24rpx] border border-white/10 rounded-[16rpx] bg-card/50 p-[20rpx]">
          <view class="flex items-start gap-[12rpx]">
            <text class="i-carbon:information mt-[4rpx] text-[24rpx] text-white" />
            <view>
              <text class="mb-[8rpx] block text-[22rpx] text-white font-600">
                合规声明
              </text>
              <text class="block text-[18rpx] text-white/50 leading-[1.6]">
                本小程序为工具类应用，仅在您主动骑行时采集位置信息用于记录轨迹。所有数据保存在设备本地，不上传服务器。您可以在"隐私协议"中了解详细信息。
              </text>
            </view>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>
