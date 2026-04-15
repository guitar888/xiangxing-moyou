import type { ThemeMode, ThemeState } from '@/composables/types/theme'
import { defineStore } from 'pinia'
import { themeColorOptions } from '@/composables/types/theme'

/**
 * 完整版主题状态管理
 * 支持手动切换主题、主题色选择、跟随系统主题等完整功能
 */
export const useManualThemeStore = defineStore('manualTheme', {
  state: (): ThemeState => ({
    theme: 'dark',
    followSystem: false, // 是否跟随系统主题
    hasUserSet: true, // 用户是否手动设置过主题
    currentThemeColor: themeColorOptions[0],
    themeVars: {
      darkBackground: '#0f0f0f',
      darkBackground2: '#1a1a1a',
      darkBackground3: '#242424',
      darkBackground4: '#2f2f2f',
      darkBackground5: '#3d3d3d',
      darkBackground6: '#4a4a4a',
      darkBackground7: '#606060',
      darkColor: '#ffffff',
      darkColor2: '#e0e0e0',
      darkColor3: '#a0a0a0',
      colorTheme: themeColorOptions[0].primary,
      colorWarning: '#FF7A00',
    },
  }),

  getters: {
    isDark: state => state.theme === 'dark',
  },

  actions: {
    /**
     * 手动切换主题
     * @param mode 指定主题模式，不传则自动切换
     * @param isFollw 是否是跟随系统
     */
    /**
     * 重写：禁用手动切换，强制保留 dark
     */
    toggleTheme(mode?: ThemeMode, isFollw: boolean = false) {
      console.log('toggleTheme', mode, isFollw)
      // this.theme = mode || (this.theme === 'light' ? 'dark' : 'light')
      // if (!isFollw) {
      //   // 如果不是跟随系统，是手动切换
      //   this.hasUserSet = true // 标记用户已手动设置
      //   this.followSystem = false // 不再跟随系统
      // }

      this.theme = 'dark'
      this.hasUserSet = true
      this.followSystem = false

      this.setNavigationBarColor()
    },

    /**
     * 设置是否跟随系统主题
     * @param follow 是否跟随系统
     */
    /**
     * 重写：禁用跟随系统，强制设为 false
     */
    setFollowSystem(follow: boolean) {
      console.log('setFollowSystem', follow)
      // this.followSystem = follow
      // if (follow) {
      //   this.hasUserSet = false
      //   this.initTheme() // 重新获取系统主题
      // }

      this.followSystem = false
    },

    /**
     * 设置导航栏颜色
     */
    /**
     * 重写：导航栏强制使用暗黑模式配色
     */
    setNavigationBarColor() {
      // uni.setNavigationBarColor({
      //   frontColor: this.theme === 'light' ? '#000000' : '#ffffff',
      //   backgroundColor: this.theme === 'light' ? '#ffffff' : '#000000',
      // })

      uni.setNavigationBarColor({
        frontColor: '#ffffff', // 暗黑模式文字（白色）
        backgroundColor: '#000000', // 暗黑模式背景（黑色）
      })
    },

    /**
     * 获取系统主题
     * @returns 系统主题模式
     */
    /**
     * 重写：强制返回 dark，忽略系统检测
     */
    getSystemTheme(): ThemeMode {
      // try {
      //   // #ifdef MP-WEIXIN
      //   // 微信小程序使用 getAppBaseInfo
      //   const appBaseInfo = uni.getAppBaseInfo()
      //   if (appBaseInfo && appBaseInfo.theme) {
      //     return appBaseInfo.theme as ThemeMode
      //   }
      //   // #endif

      //   // #ifndef MP-WEIXIN
      //   // 其他平台使用 getSystemInfoSync
      //   const systemInfo = uni.getSystemInfoSync()
      //   if (systemInfo && systemInfo.theme) {
      //     return systemInfo.theme as ThemeMode
      //   }
      //   // #endif
      // }
      // catch (error) {
      //   console.warn('获取系统主题失败:', error)
      // }
      // return 'light' // 默认返回 light
      return 'dark'
    },

    /**
     * 初始化主题
     */
    /**
     * 重写：初始化直接锁定 dark，跳过系统逻辑
     */
    initTheme() {
      // // 如果用户已手动设置且不跟随系统，保持当前主题
      // if (this.hasUserSet && !this.followSystem) {
      //   console.log('使用用户设置的主题:', this.theme)
      //   this.setNavigationBarColor()
      //   return
      // }

      // // 获取系统主题
      // const systemTheme = this.getSystemTheme()

      // // 如果是首次启动或跟随系统，使用系统主题
      // if (!this.hasUserSet || this.followSystem) {
      //   this.theme = systemTheme
      //   if (!this.hasUserSet) {
      //     this.followSystem = true
      //     console.log('首次启动，使用系统主题:', this.theme)
      //   }
      //   else {
      //     console.log('跟随系统主题:', this.theme)
      //   }
      // }

      // this.setNavigationBarColor()
      this.theme = 'dark'
      if (!this.currentThemeColor) {
        this.currentThemeColor = themeColorOptions[0]
      }
      this.themeVars.colorTheme = this.currentThemeColor.primary
      this.setNavigationBarColor()
      console.log('初始化主题: dark（强制锁定）')
    },
  },
})
