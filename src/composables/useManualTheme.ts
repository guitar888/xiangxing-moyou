import type { ThemeMode } from '@/composables/types/theme'

export function useManualTheme() {
  const store = useManualThemeStore()

  function toggleTheme(mode?: ThemeMode, isFollw: boolean = false) {
    store.toggleTheme(mode, isFollw)
  }

  function initTheme() {
    store.initTheme()
  }

  onBeforeMount(() => {
    initTheme()

    if (typeof uni !== 'undefined' && uni.onThemeChange) {
      uni.onThemeChange((res) => {
        if (store.followSystem) {
          toggleTheme(res.theme as ThemeMode, true)
        }
      })
    }
  })

  onShow(() => {
    store.setNavigationBarColor()
  })

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
    theme: computed(() => store.theme),
    isDark: computed(() => store.isDark),
    followSystem: computed(() => store.followSystem),
    hasUserSet: computed(() => store.hasUserSet),
    themeVars: computed(() => store.themeVars),
    initTheme,
    toggleTheme,
    setFollowSystem: store.setFollowSystem,
  }
}

export type { ThemeMode }
