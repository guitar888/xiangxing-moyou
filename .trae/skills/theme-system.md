# 全局主题系统（CSS变量+UnoCSS+wot-ui）

- 目标：无硬编码色值、一键换肤、统一色彩
- 配置：
  1. src/styles/global.css 定义 CSS 变量
  2. uno.config.ts 映射主题
  3. App.ku.vue 注入 wd-config-provider
- 输出：主题变量化页面，无 #xxxxxx
