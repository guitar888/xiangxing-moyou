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
- 自动引入规则（禁止手动 import）：
  - Vue API（ref/reactive/computed/watch）
  - 生命周期（onMounted/onShow/onLoad等）
  - Pinia（createPinia/useStore/persistPlugin）
  - UniApp 工具函数
  - Woto UI 组件（wd-*）
  - src/components/ 下业务组件

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

## 八、小程序 UnoCSS Carbon 图标规范（重要）
**问题**：小程序中 `entry.icon === 'i-carbon:map'` 精确匹配经常失败，导致图标不显示。

**正确写法**：
```vue
<!-- 用 includes 模糊匹配，不要精确匹配 === -->
<text v-else-if="entry.icon.includes('map')" class="i-carbon:map text-[40rpx] leading-[40rpx] flex items-center justify-center" :class="entry.highlight ? 'mini-icon-theme' : 'mini-icon-warning'"></text>
<text v-else-if="entry.icon.includes('cloud')" class="i-carbon:cloud text-[40rpx] leading-[40rpx] flex items-center justify-center" :class="entry.highlight ? 'mini-icon-theme' : 'mini-icon-warning'"></text>
```

**要点**：
1. 判断条件用 `.includes('关键词')` 模糊匹配，不用 `===` 精确匹配
2. 图标 class 静态写死（如 `class="i-carbon:map"`），不动态绑定
3. UnoCSS 的 `text-[40rpx]` 响应式语法在小程序中可用
