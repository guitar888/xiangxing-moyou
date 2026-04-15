---
name: project-color-variables
description: 全局颜色强制规范（禁止硬编码色号）
alwaysApply: true
globs: ["**/*.vue","**/*.css","**/*.scss","**/uno.config.ts"]
---

# 颜色强制规范
## 禁止项
- 禁止任何 #xxxxxx 色号硬编码
- 禁止 bg-[#xxx] / text-[#xxx]

## 统一 CSS 变量 + UnoCSS 语义化类
- 主色：--wot-color-theme: #2ED573 → text-primary / bg-primary
- 主背景：--wot-color-bg-base: #121212 → bg-base
- 卡片背景：--wot-color-bg-card: #1E1E1E → bg-card
- 主文字：--wot-color-text-white: #FFFFFF → text-white
- 次要文字：--wot-color-text-gray: #8D99AE → text-gray
- 边框：--wot-color-border: #333333 → border-color
- 警告色：--wot-color-warning: #FF7A00 → text-warning / bg-warning

## 必须使用方式
bg-base bg-card text-primary text-white text-gray border-color
