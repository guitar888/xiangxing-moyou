---
description: 襄行摩友小程序核心规范，AI编码时必须遵循
globs: src/**/*
alwaysApply: true
---

# 襄行摩友小程序 - 核心开发规范

## 项目定位
襄阳本地摩友公益服务工具，非盈利、纯工具属性。
小程序=工具入口（展示活动记录、骑行路线、地图标注），活动组织通过微信群独立运营。

## 合规红线（绝对禁止，任何情况下不得违反）
- 禁止展示任何联系方式（微信号、手机号、二维码、外链）
- 禁止交易、支付、电商、社交功能
- 禁止收集手机号、身份证号、真实姓名
- 禁止使用AI深度合成功能
- 用户上传内容必须管理员审核后展示
- 地图仅用腾讯地图官方SDK
- 小程序简介、首页、关于页必须标注"非盈利公益工具"

## 技术栈
- UniApp 3.0.0-4080520251106001 + Vue 3.4.38 + TypeScript 5.5.4 + Vite 5.2.8
- wot-design-uni 1.14.0（默认暗黑模式）
- UnoCSS 66.0.0（100%原子样式，禁止冗余style）
- alova 3.3.4（请求统一放 src/api/）
- Pinia 2.3.1（状态管理）
- @wot-ui/router 1.1.2（路由）
- echarts 6.0.0 + uni-echarts 2.2.5（图表）
- 腾讯地图SDK（地图）
- Bmob后端云（存储）

## 强制编码规范
1. 仅使用 `<script setup lang="ts">`，禁止选项式API
2. TS全覆盖，禁止隐式any
3. 异步统一 async/await
4. 小程序API统一 `uni.xxx`，禁止 `wx.xxx`
5. 组件自动引入，禁止手动import组件
6. 100% UnoCSS原子类，禁止冗余style，统一rpx单位
7. 请求统一放 src/api/，禁止裸写 uni.request
8. 路由使用 @wot-ui/router，禁止原生跳转
9. 样式必须scoped，禁止全局污染
10. 图标判断用 `.includes('关键词')` 模糊匹配，不用 `===`

## 色彩规范
- 主色调: #2ED573 (骑行绿)
- 辅助色: #FF7A00 (荧光橙), #8D99AE (襄阳灰)
- 背景: #121212 (主), #1E1E1E (辅助)
- 文字: #FFFFFF (主), #CCCCCC (次)

## 平台兼容
- 使用 `#ifdef H5` / `#ifndef H5` 条件编译
- 小程序不支持 backdrop-filter，用半透明背景模拟
- 小程序不支持 radial-gradient，用 linear-gradient
- 小程序中渐变不能用CSS变量，用具体颜色值
- SVG仅作静态图片，不支持filter和style标签

## 参考文档
编码时请参考以下文档获取更详细的指南：
- 项目完整规范: `docs/development-spec.md`
- 暗黑模式: `docs/guide/dark-mode.md`
- 路由用法: `docs/guide/router.md`
- 网络请求: `docs/guide/request.md`
- 状态管理: `docs/guide/state-management.md`
- 样式指南: `docs/guide/styling.md`
- 图标使用: `docs/guide/icons.md`
- 组件库: `docs/guide/wot-ui.md`
- Tabbar: `docs/guide/tabbar.md`
- Echarts: `docs/guide/uni-echarts.md`
- 国际化: `docs/guide/i18n.md`
- 分包优化: `docs/guide/bundle-optimizer.md`
- 全局反馈: `docs/guide/feedback.md`
- 部署: `docs/guide/deployment.md`
