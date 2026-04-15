import type { ThemeMode } from '@/composables/types/theme'

/**
 * 简化版主题管理组合式API
 *
 * 功能特性：
 * - 固定暗黑主题
 * - 自动同步导航栏颜色
 *
 * 适用场景：
 * - 禁止用户切换主题色的应用
 * - 仅使用固定主题色的应用
 *
 * @example
 * ```vue
 * <script setup>
 * import { useManualTheme } from '@/composables/useManualTheme'
 *
 * const {
 *   theme,
 *   isDark,
 *   themeVars
 * } = useManualTheme()
 * </script>
 *
 * <template>
 *   <wd-config-provider :theme-vars="themeVars">
 *     <view :class="{ 'dark-mode': isDark }">
 *       <text>固定暗黑主题</text>
 *     </view>
 *   </wd-config-provider>
 * </template>
 * ```
 */
export function useManualTheme() {
  const store = useManualThemeStore()

  /**
   * 切换暗黑模式
   * @param mode 指定主题模式，不传则自动切换
   * @param isFollw 是否跟随系统
   */
  function toggleTheme(mode?: ThemeMode, isFollw: boolean = false) {
    store.toggleTheme(mode, isFollw)
  }

  /**
   * 初始化主题
   */
  function initTheme() {
    store.initTheme()
  }

  // 组件挂载前初始化主题
  onBeforeMount(() => {
    initTheme()

    // 监听系统主题变化
    if (typeof uni !== 'undefined' && uni.onThemeChange) {
      uni.onThemeChange((res) => {
        if (store.followSystem) {
          toggleTheme(res.theme as ThemeMode, true)
        }
      })
    }
  })

  // 页面显示时更新导航栏颜色，确保每次切换页面时导航栏颜色都是正确的
  onShow(() => {
    store.setNavigationBarColor()
  })

  // 组件卸载时清理监听
  onUnmounted(() => {
    if (typeof uni !== 'undefined' && uni.offThemeChange) {
      uni.offThemeChange((res) => {
        if (store.followSystem) {
          toggleTheme(res.theme as ThemeMode, true)
        }
      })
    }
  })

  return {
    // 状态
    theme: computed(() => store.theme),
    isDark: computed(() => store.isDark),
    followSystem: computed(() => store.followSystem),
    hasUserSet: computed(() => store.hasUserSet),
    themeVars: computed(() => store.themeVars),

    // 方法
    initTheme,
    toggleTheme,
    setFollowSystem: store.setFollowSystem,
  }
}

export type { ThemeMode }
