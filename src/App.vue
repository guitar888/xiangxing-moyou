<script setup lang="ts">
import { useThemeStore } from '@/store/themeStore'

const themeStore = useThemeStore()
themeStore.initSystemTheme()

onLaunch(() => {})
</script>

<template>
  <wd-config-provider :theme-vars="themeStore.themeVars">
    <view class="page-wraper w-full min-h-screen bg-[var(--darkBackground)]">
      <slot />
    </view>
  </wd-config-provider>
</template>

<style lang="scss">
@import '@/styles/variables.css';

.page-wraper {
  min-height: calc(100vh - var(--window-top));
  box-sizing: border-box;
  background: var(--color-bg-base);
}

.wot-theme-dark.page-wraper {
  background: var(--color-bg-base);
}
</style>
