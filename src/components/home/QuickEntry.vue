<script setup lang="ts">
import type { QuickEntry } from '@/types'

defineOptions({
  options: {
    styleIsolation: 'shared'
  }
})

defineProps<{
  entries: QuickEntry[]
}>()

const router = useRouter()

function handleEntryClick(entry: QuickEntry) {
  uni.vibrateShort({ type: 'light' })
  if (entry.isTab) {
    router.pushTab(entry.path)
  }
  else {
    router.push(entry.path)
  }
}
</script>

<template>
  <!-- #ifdef H5 -->
  <view class="animate-fade-in-up relative z-1 px-[24rpx] py-[16rpx] pb-[24rpx]">
    <view class="mb-[16rpx] flex items-center justify-between">
      <text class="text-[28rpx] text-white font-600">
        快捷入口
      </text>
    </view>
    <view class="grid grid-cols-3 gap-[16rpx]">
      <view
        v-for="(entry, index) in entries"
        :key="index"
        class="animate-fade-in-up flex flex-col items-center rounded-[16rpx] bg-card p-[24rpx_16rpx] shadow-card shadow-inset transition-all duration-100"
        :style="{ animationDelay: `${index * 80}ms` }"
        :class="[
          entry.highlight
            ? 'cursor-pointer border-[1.5rpx] border-primary bg-gradient-to-br from-[rgba(46,213,115,0.08)] to-transparent active:scale-95 active:border-primary active:shadow-glow'
            : 'cursor-pointer active:bg-hover active:scale-95',
        ]"
        @click="handleEntryClick(entry)"
      >
        <view
          class="mb-[12rpx] h-[80rpx] w-[80rpx] flex items-center justify-center rounded-[16rpx] transition-all duration-100"
          :class="entry.highlight ? 'bg-[rgba(46,213,115,0.2)] shadow-[0_2rpx_8rpx_rgba(46,213,115,0.2)]' : 'bg-hover'"
        >
          <wd-icon v-if="entry.icon && !entry.icon.startsWith('i-')" :name="entry.icon" size="48rpx" :color="entry.highlight ? 'var(--wot-color-theme)' : 'var(--wot-color-warning)'" />
          <text v-else-if="entry.icon" class="text-[40rpx] leading-[40rpx] flex items-center justify-center" :class="[entry.icon, entry.highlight ? 'text-[var(--wot-color-theme)]' : 'text-[var(--wot-color-warning)]']" />
        </view>
        <text class="mb-[4rpx] text-[24rpx] text-white font-500">
          {{ entry.name }}
        </text>
        <text class="text-[20rpx] text-gray">
          {{ entry.subname }}
        </text>
        <view v-if="entry.badge" class="absolute right-[8rpx] top-[8rpx] rounded-[6rpx] bg-warning px-[8rpx] py-[2rpx] text-[18rpx] text-base">
          {{ entry.badge }}
        </view>
      </view>
    </view>
  </view>
  <!-- #endif -->

  <!-- #ifndef H5 -->
  <view class="relative z-1 px-[24rpx] py-[16rpx] pb-[24rpx]">
    <view class="mb-[16rpx] flex items-center justify-between">
      <text class="text-[28rpx] text-white font-600">
        快捷入口
      </text>
    </view>
    <view class="grid grid-cols-3 gap-[16rpx]">
      <view
        v-for="(entry, index) in entries"
        :key="index"
        :class="['mini-entry-container', entry.highlight ? 'mini-entry-highlight' : '']"
        @click="handleEntryClick(entry)"
      >
        <view :class="['mini-icon-container', entry.highlight ? 'mini-icon-highlight' : '']">
          <wd-icon v-if="entry.icon && !entry.icon.startsWith('i-')" :name="entry.icon" size="48rpx" :color="entry.highlight ? '#2ED573' : '#FF7A00'" />
          <!-- 小程序端Carbon图标：静态class用view包裹 -->
          <text v-else-if="entry.icon.includes('map')" class="i-carbon:map text-[40rpx] leading-[40rpx] flex items-center justify-center" :class="entry.highlight ? 'mini-icon-theme' : 'mini-icon-warning'"></text>
          <text v-else-if="entry.icon.includes('cloud')" class="i-carbon:cloud text-[40rpx] leading-[40rpx] flex items-center justify-center" :class="entry.highlight ? 'mini-icon-theme' : 'mini-icon-warning'"></text>
          <view v-else-if="entry.icon" class="mini-icon-wrap" :class="[entry.icon, entry.highlight ? 'mini-icon-theme' : 'mini-icon-warning']" />
        </view>
        <text class="mb-[4rpx] text-[24rpx] text-white font-500">
          {{ entry.name }}
        </text>
        <text class="text-[20rpx] text-gray">
          {{ entry.subname }}
        </text>
        <view v-if="entry.badge" class="absolute right-[8rpx] top-[8rpx] rounded-[6rpx] bg-warning px-[8rpx] py-[2rpx] text-[18rpx] text-base">
          {{ entry.badge }}
        </view>
      </view>
    </view>
  </view>
  <!-- #endif -->
</template>

<style lang="scss" scoped>
.mini-entry-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 16rpx;
  padding: 24rpx 16rpx;
  box-shadow: 0 8rpx 32rpx rgba(46, 213, 115, 0.15), inset 0 1rpx 0 rgba(255, 255, 255, 0.1);
  background: linear-gradient(135deg, #2A2A2A 0%, #1E1E1E 100%);
  transition: all 0.1s ease;
}

.mini-entry-container:active {
  transform: scale(0.95);
}

.mini-entry-highlight {
  background: linear-gradient(135deg, rgba(46, 213, 115, 0.08) 0%, transparent 100%);
}

.mini-icon-container {
  margin-bottom: 12rpx;
  width: 80rpx;
  height: 80rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 16rpx;
  background: #333333;
}

.mini-icon-highlight {
  background: rgba(46, 213, 115, 0.35);
  box-shadow: 0 4rpx 16rpx rgba(46, 213, 115, 0.4);
}

.mini-icon-theme {
  color: #2ED573;
}

.mini-icon-warning {
  color: #FF7A00;
}

.mini-icon-wrap {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 40rpx;
  line-height: 40rpx;
}
</style>
