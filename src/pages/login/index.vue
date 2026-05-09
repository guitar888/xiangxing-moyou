<script setup lang="ts">
/**
 * 微信一键登录页面
 * 现代简约设计风格
 */
import { useUserStore } from '@/store/userStore'

definePage({
  name: 'login',
  style: {
    navigationBarTitleText: '登录',
    navigationStyle: 'custom',
  },
})

const userStore = useUserStore()
const loading = ref(false)

async function handleWechatLogin() {
  if (loading.value) return

  loading.value = true

  try {
    // #ifdef MP-WEIXIN
    const loginRes = await new Promise<UniApp.LoginRes>((resolve, reject) => {
      uni.login({
        provider: 'weixin',
        onlyAuthorize: true,
        success: resolve,
        fail: reject,
      })
    })

    if (!loginRes.code) {
      throw new Error('获取登录凭证失败')
    }

    const userInfoRes = await new Promise<UniApp.GetUserInfoSuccessCallbackResult>((resolve, reject) => {
      uni.getUserInfo({
        provider: 'weixin',
        success: resolve,
        fail: reject,
      })
    })

    const userInfo = userInfoRes.userInfo

    userStore.loginWithWechat({
      openid: loginRes.code,
      nickname: userInfo.nickName,
      avatar: userInfo.avatarUrl,
    })

    uni.showToast({
      title: '登录成功',
      icon: 'success',
      duration: 1500,
    })

    setTimeout(() => {
      uni.navigateBack()
    }, 1500)
    // #endif

    // #ifndef MP-WEIXIN
    uni.showToast({
      title: '请在微信小程序中使用',
      icon: 'none',
    })
    // #endif
  } catch (err: any) {
    console.error('登录失败:', err)
    if (err.errMsg?.includes('auth deny') || err.errMsg?.includes('authorize')) {
      uni.showToast({
        title: '请允许授权',
        icon: 'none',
      })
    } else {
      uni.showToast({
        title: '登录失败，请重试',
        icon: 'none',
      })
    }
  } finally {
    loading.value = false
  }
}

function handleSkip() {
  uni.navigateBack()
}
</script>

<template>
  <view class="relative min-h-screen bg-base overflow-hidden">
    <!-- 背景光效 -->
    <view class="absolute inset-0 overflow-hidden">
      <view class="absolute top-[-100rpx] left-[-100rpx] w-[400rpx] h-[400rpx] rounded-full bg-gradient-to-br from-primary/20 to-transparent blur-3xl" />
      <view class="absolute bottom-[-100rpx] right-[-100rpx] w-[300rpx] h-[300rpx] rounded-full bg-gradient-to-tl from-primary/15 to-transparent blur-3xl" />
    </view>

    <!-- 网格背景 -->
    <view class="absolute inset-0 opacity-[0.03]">
      <view class="w-full h-full" style="background-image: linear-gradient(rgba(46,213,115,1) 1px, transparent 1px), linear-gradient(90deg, rgba(46,213,115,1) 1px, transparent 1px); background-size: 40rpx 40rpx;" />
    </view>

    <!-- 主内容区 -->
    <view class="relative z-10 h-full flex flex-col items-center justify-center px-[40rpx] pb-[100rpx]">
      <!-- Logo区域 -->
      <view class="mb-[60rpx]">
        <view class="relative">
          <view class="w-[140rpx] h-[140rpx] bg-gradient-to-br from-primary to-[#1DB954] rounded-full flex items-center justify-center shadow-2xl shadow-[0_0_60rpx_rgba(46,213,115,0.4)]">
            <text class="i-fluent:vehicle-motorcycle-28-filled text-[72rpx] text-white" />
          </view>
          <!-- 光晕效果 -->
          <view class="absolute inset-0 rounded-full bg-primary/30 blur-xl animate-pulse" />
        </view>
      </view>

      <!-- 标题 -->
      <view class="text-center mb-[60rpx]">
        <text class="text-[44rpx] font-bold text-white mb-[12rpx] tracking-wider">襄行摩友</text>
        <text class="text-[24rpx] text-gray/70">襄阳本地摩友公益工具</text>
      </view>

      <!-- 登录卡片 -->
      <view class="w-full max-w-[520rpx]">
        <!-- 隐私提示 -->
        <view class="bg-white/5 backdrop-blur-sm rounded-2xl p-[24rpx] mb-[24rpx] border border-white/10">
          <text class="text-[24rpx] text-gray/80 text-center leading-relaxed">
            登录后获取微信头像和昵称，数据仅本地存储，不上传服务器
          </text>
        </view>

        <!-- 登录按钮 -->
        <view 
          class="group relative w-full bg-gradient-to-r from-primary via-[#2ED573] to-[#1DB954] rounded-2xl py-[32rpx] px-[40rpx] flex items-center justify-center gap-[16rpx] shadow-2xl shadow-[0_10rpx_40rpx_rgba(46,213,115,0.35)] transition-all duration-300 hover:shadow-[0_15rpx_50rpx_rgba(46,213,115,0.45)] active:scale-[0.98] active:shadow-[0_5rpx_20rpx_rgba(46,213,115,0.3)] cursor-pointer"
          @click="handleWechatLogin"
        >
          <!-- 渐变边框效果 -->
          <view class="absolute inset-0 rounded-2xl bg-gradient-to-r from-primary/50 to-[#1DB954]/50 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          
          <view class="relative z-10 flex items-center gap-[16rpx]">
            <text v-if="loading" class="i-carbon:loader animate-spin text-[36rpx] text-white" />
            <text v-else class="i-carbon:logo-wechat text-[48rpx] text-white" />
            <text class="text-[32rpx] font-semibold text-white">{{ loading ? '登录中...' : '微信一键登录' }}</text>
          </view>
        </view>
      </view>

      <!-- 跳过按钮 -->
      <view class="mt-[80rpx]">
        <view 
          class="px-[48rpx] py-[20rpx] rounded-full bg-white/5 backdrop-blur-sm border border-white/10 text-gray/60 text-[26rpx] transition-all duration-300 hover:bg-white/10 hover:text-gray/80 active:scale-95 cursor-pointer"
          @click="handleSkip"
        >
          暂不登录
        </view>
      </view>
    </view>

    <!-- 底部装饰 -->
    <view class="absolute bottom-[40rpx] left-0 right-0 text-center">
      <text class="text-[20rpx] text-gray/40">襄阳本地摩友公益工具 · 非盈利</text>
    </view>
  </view>
</template>

<style scoped>
</style>
