import type { SystemThemeState, ThemeMode } from '@/composables/types/theme'
import { defineStore } from 'pinia'
import { themeColorOptions } from '@/composables/types/theme'

const PRIMARY_COLOR = '#2ED573'

const themeVars = {
  darkBackground: '#121212',
  darkBackground2: '#1E1E1E',
  darkBackground3: '#272727',
  darkBackground4: '#333333',
  darkBackground5: '#444444',
  darkBackground6: '#555555',
  darkBackground7: '#666666',
  darkColor: '#FFFFFF',
  darkColor2: '#CCCCCC',
  darkColor3: '#8D99AE',
  colorTheme: PRIMARY_COLOR,
}

const cssVars = {
  '--wot-color-theme': PRIMARY_COLOR,
  '--wot-color-theme-light': '#4FE085',
  '--wot-color-theme-dark': '#27C468',
  '--wot-color-bg-base': '#121212',
  '--wot-color-bg-card': '#1E1E1E',
  '--wot-color-bg-hover': '#272727',
  '--wot-color-text-white': '#FFFFFF',
  '--wot-color-text-gray': '#8D99AE',
  '--wot-color-text-muted': '#CCCCCC',
  '--wot-color-border': '#333333',
  '--wot-color-border-light': '#444444',
  '--wot-color-warning': '#FF7A00',
  '--wot-color-danger': '#FF4757',
  '--wot-color-success': PRIMARY_COLOR,
}

Object.assign(themeVars, cssVars)

/**
 * 简化版系统主题状态管理
 * 仅支持跟随系统主题，不提供手动切换功能
 * 导航栏颜色通过 theme.json 自动处理
 */
export const useThemeStore = defineStore('theme', {
  state: (): SystemThemeState => ({
    theme: 'dark',
    themeVars: { ...themeVars },
  }),

  getters: {
    isDark: state => state.theme === 'dark',
    primaryColor: () => PRIMARY_COLOR,
    cssVars: () => cssVars,
  },

  actions: {
    getSystemTheme(): ThemeMode {
      return 'dark'
    },

    setTheme(theme: ThemeMode) {
      console.log('设置主题:', theme)
      this.theme = 'dark'
    },

    initSystemTheme() {
      this.theme = 'dark'
      console.log('初始化系统主题:', this.theme)
    },
  },
})
