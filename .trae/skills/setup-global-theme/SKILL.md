---
name: setup-global-theme
description: 全局主题系统（CSS变量 + UnoCSS + Woto UI）
---

# 全局主题配置技能
## 目标
- 无任何硬编码色号
- 一键换肤
- 全项目统一色彩

## 执行步骤
1. 创建 src/styles/global.css 定义 CSS 变量
2. uno.config.ts 配置主题映射
3. App.vue 注入 ConfigProvider
4. 全页面替换为语义化类名
5. 验证：无 #xxxxxx 色号

## 输出
- global.css
- uno.config.ts
- App.vue 主题注入
- 主题规范化页面
