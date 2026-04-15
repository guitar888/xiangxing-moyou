---
name: project-color-variables
description: 全局主题色与CSS变量强制规范（禁止硬编码色号）
alwaysApply: true
globs:
  - "**/*.vue"
  - "**/*.css"
  - "**/*.scss"
  - "**/uno.config.ts"
  - "**/wot-starter/**/*.ts"
---

# 项目颜色规范（强制生效）

## 核心约束（绝对禁止）
- ❌ 禁止在任何文件中硬编码色号：`#2ED573`、`#121212`、`#1E1E1E`、`#333333`、`#8D99AE`、`#FFFFFF`
- ❌ 禁止直接写：`bg-[#xxx]`、`text-[#xxx]`、`border-[#xxx]`
- ✅ 必须 **全部使用 CSS 变量 + UnoCSS 语义化类名**

## 颜色体系（统一变量）
主色：
- `--wot-color-theme: #2ED573` → 类名：`text-primary` / `bg-primary` / `border-primary`

背景色：
- `--wot-color-bg-base: #121212` → `bg-base`
- `--wot-color-bg-card: #1E1E1E` → `bg-card`

文字色：
- `--wot-color-text-white: #FFFFFF` → `text-white`
- `--wot-color-text-gray: #8D99AE` → `text-gray`

边框/分割线：
- `--wot-color-border: #333333` → `border-color`

辅助/警告：
- `--wot-color-warning: #FF7A00` → `text-warning` / `bg-warning`

## 技术栈最佳实践
1. **CSS 变量**
   - 全局定义在 `:root` 或 `styles/global.css`
   - 命名遵循 `--wot-color-*` 官方规范

2. **UnoCSS 配置**
   - 在 `uno.config.ts` 的 `theme.colors` 映射上述变量
   - 示例：
     ```ts
     theme: {
       colors: {
         primary: 'var(--wot-color-theme)',
         base: 'var(--wot-color-bg-base)',
         card: 'var(--wot-color-bg-card)',
         // ...
       }
     }
