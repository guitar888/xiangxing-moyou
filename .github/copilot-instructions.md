---
applyTo: "**/*.{vue,ts,js,scss,css}"
---

# Copilot 全局强制指令 · 襄行摩友小程序

## 一、基础约束
- 平台：**仅微信小程序 mp-weixin**
- 模式：**全局暗黑模式**
- 风格：简约公益骑行风，襄阳本地特色
- 合规：无交易、无社交、无支付、无隐私权限

## 二、语法强制
- 必须使用 `<script setup lang="ts">`
- 必须完整类型定义，禁止隐式 any
- 异步必须 `async/await`
- 必须使用 `uni.xxx`，禁止 `wx.xxx`

## 三、样式与颜色
- 100% 使用 UnoCSS 原子类
- 禁止硬编码色号 #xxxxxx
- 禁止 `bg-[#xxx]` / `text-[#xxx]`
- 必须使用语义化类名：
  primary / base / card / white / gray / warning / border-color

## 四、组件与导入
- 组件大驼峰命名，自动引入，禁止手动 import
- 仅使用 Woto UI 组件 `wd-*`
- Vue 文件结构固定：template → script setup → style scoped

## 五、目录与路由
- 页面只能放在 `pages/`
- 接口只能放在 `api/`
- 工具放在 `utils/`
- 路由使用 `@wot-ui/router`

## 六、绝对禁止生成的 API
- uni.getPhoneNumber
- uni.getUserProfile / uni.getUserInfo
- uni.requestPayment
- uni.navigateToMiniProgram
- 任何隐私、支付、社交相关 API

## 七、代码风格
- 变量/函数：小驼峰
- 类型/接口：大驼峰
- 注释简洁，必要时标注业务含义
