import type { ThemeMode, ThemeState } from '@/composables/types/theme'
import { defineStore } from 'pinia'
import { themeColorOptions } from '@/composables/types/theme'

const PRIMARY_COLOR = '#2ED573'

/**
 * 完整版主题状态管理
 * 支持手动切换主题、主题色选择、跟随系统主题等完整功能
 */
export const useManualThemeStore = defineStore('manualTheme', {
  state: (): ThemeState => ({
    theme: 'dark',
    followSystem: false,
    hasUserSet: true,
    currentThemeColor: themeColorOptions[0],
    themeVars: {},
  }),

  getters: {
    isDark: state => state.theme === 'dark',
  },

  actions: {
    /**
     * 设置 DOM 上的 CSS 变量
     */
    setCssVariables(vars: Record<string, string>) {
      try {
        // #ifdef H5
        const root = document.documentElement
        for (const key in vars) {
          if (key.startsWith('--')) {
            root.style.setProperty(key, vars[key])
          }
        }
        // #endif

        // #ifdef MP-WEIXIN
        // 小程序中通过 wd-config-provider 的 theme-vars 传递
        // #endif
      }
      catch (error) {
        console.warn('设置 CSS 变量失败:', error)
      }
    },

    /**
     * 获取当前主题的 CSS 变量
     */
    getThemeCssVars(): Record<string, string> {
      const isDark = this.theme === 'dark'
      const primaryColor = this.currentThemeColor.primary

      return {
        '--wot-color-theme': primaryColor,
        '--wot-color-theme-light': '#4FE085',
        '--wot-color-theme-dark': '#27C468',
        '--wot-color-theme-rgb': '46, 213, 115',
        '--wot-color-bg-base': isDark ? '#121212' : '#ffffff',
        '--wot-color-bg-card': isDark ? '#1E1E1E' : '#f5f5f5',
        '--wot-color-bg-hover': isDark ? '#272727' : '#e5e5e5',
        '--wot-color-text-white': isDark ? '#FFFFFF' : '#000000',
        '--wot-color-text-gray': isDark ? '#8D99AE' : '#737373',
        '--wot-color-text-muted': isDark ? '#CCCCCC' : '#a3a3a3',
        '--wot-color-border': isDark ? '#333333' : '#d4d4d4',
        '--wot-color-border-light': isDark ? '#444444' : '#e5e5e5',
        '--wot-color-warning': '#FF7A00',
        '--wot-color-danger': '#FF4757',
        '--wot-color-success': primaryColor,
        '--wot-filled-content': isDark ? '#121212' : '#f5f5f5',
      }
    },

    /**
     * 更新主题变量
     */
    updateThemeVars() {
      const vars = this.getThemeCssVars()
      this.themeVars = vars
      this.setCssVariables(vars)
    },

    /**
     * 手动切换主题
     */
    toggleTheme(mode?: ThemeMode, isFollw: boolean = false) {
      this.theme = mode || (this.theme === 'light' ? 'dark' : 'light')
      if (!isFollw) {
        this.hasUserSet = true
        this.followSystem = false
      }
      this.setNavigationBarColor()
      this.updateThemeVars()
      console.log('主题切换成功:', this.theme)
    },

    /**
     * 设置是否跟随系统主题
     */
    setFollowSystem(follow: boolean) {
      this.followSystem = follow
      if (follow) {
        this.hasUserSet = false
        this.initTheme()
      }
    },

    /**
     * 设置导航栏颜色
     */
    setNavigationBarColor() {
      uni.setNavigationBarColor({
        frontColor: this.theme === 'light' ? '#000000' : '#ffffff',
        backgroundColor: this.theme === 'light' ? '#ffffff' : '#000000',
      })
    },

    /**
     * 获取系统主题
     */
    getSystemTheme(): ThemeMode {
      try {
        // #ifdef MP-WEIXIN
        const appBaseInfo = uni.getAppBaseInfo()
        if (appBaseInfo && appBaseInfo.theme) {
          return appBaseInfo.theme as ThemeMode
        }
        // #endif

        // #ifndef MP-WEIXIN
        const systemInfo = uni.getSystemInfoSync()
        if (systemInfo && systemInfo.theme) {
          return systemInfo.theme as ThemeMode
        }
        // #endif
      }
      catch (error) {
        console.warn('获取系统主题失败:', error)
      }
      return 'light'
    },

    /**
     * 初始化主题
     */
    initTheme() {
      if (this.hasUserSet && !this.followSystem) {
        this.setNavigationBarColor()
        this.updateThemeVars()
        return
      }

      const systemTheme = this.getSystemTheme()

      if (!this.hasUserSet || this.followSystem) {
        this.theme = systemTheme
        if (!this.hasUserSet) {
          this.followSystem = true
        }
      }

      this.setNavigationBarColor()
      this.updateThemeVars()
    },
  },
})
