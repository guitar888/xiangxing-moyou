# 修复暗黑/亮色模式切换功能

## Overview
- **Summary**: 修复项目中暗黑/亮色模式切换功能无法正常工作的问题。目前切换开关无效，并且页面在切换模式后颜色不会自动更新。
- **Purpose**: 确保用户可以在"我的"页面正常切换暗黑/亮色模式，并且所有页面的颜色样式能够正确响应主题变化。
- **Target Users**: 所有使用襄阳摩友助手的用户。

## Goals
1. 修复主题切换功能，确保点击开关可以正常切换 dark/light 模式
2. 确保所有页面的 CSS 颜色变量正确响应主题变化
3. 统一使用官方脚手架的最佳实践（useManualTheme composable）
4. 修复主题切换后页面颜色不更新的问题

## Non-Goals (Out of Scope)
- 不修改主题配色方案
- 不新增主题功能

## Background & Context
当前问题分析：
1. `manualThemeStore.ts` 中的所有主题切换逻辑被注释掉，强制固定为 `dark`
2. `mine.vue` 中错误调用不存在的 `setTheme()` 方法
3. `App.vue` 使用 `useThemeStore()` 而不是官方推荐的 `useManualTheme()`
4. 项目存在两个主题 store（themeStore 和 manualThemeStore），造成混淆

官方最佳实践参考 `App.ku.vue`：
- 使用 `useManualTheme()` composable
- 在 `wd-config-provider` 上绑定 `:theme-vars="themeVars"` 和 `:theme="theme"`

## Functional Requirements
- **FR-1**: 用户可以在"我的"页面通过开关切换暗黑/亮色模式
- **FR-2**: 切换主题后，所有页面的颜色会立即更新
- **FR-3**: 导航栏颜色会随着主题切换自动更新
- **FR-4**: 主题切换状态能够持久化（保持用户的选择）

## Non-Functional Requirements
- **NFR-1**: 主题切换响应迅速，不超过 200ms
- **NFR-2**: 主题切换功能在小程序和 H5 平台都正常工作

## Constraints
- **Technical**: 必须使用现有的 UnoCSS 和 wot-design-uni 组件库
- **Dependencies**: 依赖 pinia 状态管理和 @wot-ui/router

## Assumptions
- 项目使用 wot-design-uni 的主题系统
- UnoCSS 支持条件类（dark:）
- 微信小程序支持 CSS 变量

## Acceptance Criteria

### AC-1: 主题切换功能正常工作
- **Given**: 用户在"我的"页面
- **When**: 用户点击暗黑模式开关
- **Then**: 页面立即切换到对应的暗黑/亮色模式
- **Verification**: human-judgment
- **Notes**: 开关状态需要和当前主题一致

### AC-2: 所有页面颜色正确更新
- **Given**: 用户切换了主题
- **When**: 用户访问其他页面（首页、地图、数据、活动）
- **Then**: 所有页面的颜色正确显示为当前主题的配色
- **Verification**: human-judgment
- **Notes**: 特别注意背景色、文字色、卡片色的变化

### AC-3: 导航栏颜色自动更新
- **Given**: 用户切换了主题
- **When**: 导航栏显示
- **Then**: 导航栏的背景色和文字色自动适配当前主题
- **Verification**: human-judgment

### AC-4: 使用官方最佳实践
- **Given**: 检查代码结构
- **When**: 查看 App.vue 和主题相关代码
- **Then**: 使用 `useManualTheme()` composable 和正确的 wd-config-provider 配置
- **Verification**: programmatic (code review)

## Open Questions
- 无
