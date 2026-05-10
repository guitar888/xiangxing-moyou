---
description: 襄行摩友｜AI编码强制规范（最高优先级）
globs: src/**/*
alwaysApply: true
---

# 襄行摩友｜AI 编码强制规范（终版 · 无冗余）

## 一、合规红线（绝对禁止）
- ❌ 无交易、支付、电商、社交、私信、评论、点赞、关注
- ❌ 不展示手机号/微信号/二维码/外链/导流
- ❌ 不收集手机号/身份证/真实姓名
- ❌ 地图仅用腾讯地图官方SDK，不私自标注未备案点位
- ❌ 用户上传内容必须管理员人工审核后展示
- ✅ 所有页面必须标注「非盈利公益工具」

## 二、固定技术栈（禁止修改）
- UniApp 3.0 + Vue3 + TS5 + Vite
- wot-design-uni 1.14.0（默认暗黑）
- UnoCSS 100% 原子类，禁止写 style 标签
- alova + @alova/adapter-uniapp，禁止裸写 uni.request
- Pinia 按模块拆分，禁止全局变量
- 路由：@wot-ui/router，禁止原生跳转
- 后端：Bmob 免费版，前期用 Mock
- 图表：echarts + uni-echarts
- 包管理器：pnpm，禁止 npm/yarn

## 三、编码硬约束（AI 必须遵守）
- 仅 `<script setup lang="ts">`，禁止选项式 API
- TS 全覆盖，**禁止隐式 any**
- 异步统一 `async/await`
- 小程序 API 统一 `uni.xxx`，禁止 `wx.xxx`
- 组件自动引入，禁止手动 import，命名大驼峰
- 样式 scoped，禁止全局污染，统一 rpx
- 平台差异用 `#ifdef H5` / `#ifndef H5`
- 请求统一放 `src/api/`，结构清晰

## 四、UI/主题（硬约束）
- 主色：#2ED573（骑行绿）
- 辅助：#FF7A00（橙）、#8D99AE（襄阳灰）
- 背景：#121212（主）、#1E1E1E（卡片）
- 文字：#FFFFFF（主）、#CCCCCC（次）
- 全页面适配暗黑，用 CSS 变量 + UnoCSS，禁止硬编码色值

## 五、目录结构（禁止修改）
src/
├── pages/       5 Tab：index/map/data/activity/mine
├── components/  业务组件（自动引入）
├── composables/ 自动导入组合式函数
├── api/         alova 请求
├── store/       Pinia 状态
├── utils/       工具（tencentMap、storage、route）
├── styles/      全局样式+主题变量
├── static/      静态资源
└── types/       TS 类型定义

## 六、页面边界（禁止超纲）
- 首页：定位+LOGO、快捷入口、公告、数据卡片、活动、合规声明
- 地图：腾讯地图、襄阳路线/打卡点、定位/导航/筛选
- 数据：图表、统计、记录、海报生成
- 活动：列表+筛选、AA计算器、跳转地图、引导群公告
- 我的：数据、设置、暗黑切换、清除缓存、无联系方式
