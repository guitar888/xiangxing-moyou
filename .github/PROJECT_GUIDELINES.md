# 襄行摩友小程序 - 项目开发指南
> 面向 VS Code Copilot / 开发者的统一规范手册

## 项目定位
- 襄阳本地摩友公益工具小程序
- 非盈利、无交易、无社交、无导流、无支付
- 纯工具属性，仅支持微信小程序
- 全局暗黑模式，主色骑行绿 #2ED573

## 固定技术栈
- UniApp 3.0.0-4080520251106001 + Vue 3.4.38
- TypeScript 5.5.4
- Vite 5.2.8
- UnoCSS 66.0.0
- wot-design-uni 1.14.0
- alova 3.3.4 + @alova/adapter-uniapp
- Pinia 2.3.1
- pnpm 9.9.0

## 已完成基础架构（必须保留）
- 首页已开发完成
- 组件按业务拆分 + 自动引入
- UnoCSS 原子样式全覆盖
- ESLint + Husky + lint-staged
- API 自动导入
- 全局暗黑模式
- vue-i18n 国际化

## 固定目录结构
src/
├── pages/ 页面（index/map/data/activity/mine）
├── components/ 业务组件（自动引入）
├── composables/ 组合式函数
├── hooks/ 全局钩子
├── api/ alova 接口请求
├── utils/ 工具（tencentMap/storage/request/route）
├── store/ Pinia 状态管理
├── styles/ 全局 CSS 变量 + 主题
├── static/ 静态资源
└── types/ TS 类型定义

## 强制开发规范
1. 仅使用 `<script setup lang="ts">`，禁止选项式 API
2. TS 类型全覆盖，禁止隐式 any
3. 异步统一使用 `async/await`
4. 小程序 API 统一 `uni.xxx`，禁止 `wx.xxx`
5. 组件自动引入，禁止手动 import
6. 样式 100% 使用 UnoCSS，禁止冗余内联样式
7. 尺寸单位统一使用 rpx
8. 样式必须加 `scoped`，禁止全局污染

## 颜色规范（禁止硬编码色号）
- 主色：`text-primary` / `bg-primary` → #2ED573
- 主背景：`bg-base` → #121212
- 卡片背景：`bg-card` → #1E1E1E
- 主文字：`text-white`
- 次要文字：`text-gray`
- 警告色：`text-warning` / `bg-warning` → #FF7A00
- 边框：`border-color` → #333333

## 固定 TabBar 5 页面
1. 首页     pages/index/index
2. 地图     pages/map/map
3. 数据     pages/data/data
4. 活动     pages/activity/activity
5. 我的     pages/mine/mine

## 常用命令
- 开发：pnpm dev:mp-weixin
- 构建：pnpm build:mp-weixin
- 类型检查：pnpm type-check
- 代码格式化：pnpm lint:fix

## 合规红线（绝对禁止）
- 禁止支付、交易、电商、二手相关功能
- 禁止社交、评论、点赞、关注、私聊
- 禁止展示手机号、微信、二维码、外链
- 禁止获取用户隐私权限（手机号、实名信息）
- 禁止未经审核的用户生成内容暴露
