---
description: 襄行摩友｜AI编码强制规范（最高优先级）
globs: src/**/*
alwaysApply: true
---

# 襄行摩友｜AI 编码强制规范（精简终版）

## 1. 合规红线（绝对禁止）

- ❌ 无交易、支付、电商、社交、私信、评论
- ❌ 不展示手机号/微信号/二维码/外链
- ❌ 不收集手机号/身份证/真实姓名
- ❌ 地图仅用腾讯地图官方SDK
- ✅ 所有页面标注「非盈利公益工具」

## 2. 技术栈（固定不变）

- UniApp 3.0 + Vue3 + TS5 + Vite
- wot-design-uni 1.14.0（默认暗黑）
- UnoCSS 100% 原子类（禁止 style）
- alova + Pinia + @wot-ui/router
- 腾讯地图 + Bmob（Mock优先）

## 3. 编码规范（AI生成必遵）

- ✅ 仅 `<script setup lang="ts">`，无选项式API
- ✅ TS 全覆盖，**无 any**
- ✅ 异步统一 `async/await`
- ✅ 小程序 API 用 `uni.xxx`，禁止 `wx.xxx`
- ✅ 组件自动引入，**无手动 import**
- ✅ 样式 `scoped`，全局污染禁止
- ✅ 请求统一 `src/api/`，**无裸 uni.request**
- ✅ 路由用 `@wot-ui/router`，无原生跳转
- ✅ 平台差异：`#ifdef H5` / `#ifndef H5`

## 4. UI/主题（硬约束）

- 主色：`#2ED573`（骑行绿）
- 辅助：`#FF7A00`（橙）、`#8D99AE`（襄阳灰）
- 背景：`#121212`（主）、`#1E1E1E`（卡片）
- 文字：`#FFFFFF`（主）、`#CCCCCC`（次）
- ✅ 全页面适配暗黑模式
- ✅ 用 CSS 变量 + UnoCSS，**无硬编码色值**

## 5. 目录结构（禁止修改）

src/
├── pages/ # 5 Tab：index/map/data/activity/mine
├── components/ # 业务组件（大驼峰）
├── composables/ # 自动导入组合式函数
├── api/ # alova 请求
├── store/ # Pinia
├── utils/ # 工具
├── styles/ # 全局样式+主题变量
└── types/ # TS 类型

## 6. 页面功能（需求补充）

- 首页：定位+LOGO、快捷入口、公告、骑行数据、活动列表、合规声明
- 地图：腾讯地图、襄阳路线/打卡点、定位/导航/筛选
- 数据：图表、统计卡片、记录列表、海报生成
- 活动：列表、筛选、AA计算器、地图跳转、群公告引导
- 我的：用户信息、数据总览、暗黑切换、清除缓存、无联系方式
