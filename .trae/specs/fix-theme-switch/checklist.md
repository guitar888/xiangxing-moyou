# 修复暗黑/亮色模式切换功能 - 验证清单

- [x] manualThemeStore.ts 中没有强制锁定 dark 模式的注释代码
- [x] manualThemeStore.ts 中的 toggleTheme() 能够正常切换 dark/light
- [x] App.vue 使用 useManualTheme() composable
- [x] App.vue 的 wd-config-provider 正确绑定 theme-vars 和 theme
- [x] mine.vue 使用 useManualTheme() composable
- [x] mine.vue 中的 toggleTheme() 正确调用 manualThemeStore.toggleTheme()
- [ ] 在 H5 平台，点击"我的"页面的开关能够切换暗黑/亮色模式
- [ ] 在 H5 平台，所有页面颜色正确响应主题变化
- [ ] 在小程序平台，点击"我的"页面的开关能够切换暗黑/亮色模式
- [ ] 在小程序平台，所有页面颜色正确响应主题变化
- [ ] 导航栏颜色随着主题切换自动更新
