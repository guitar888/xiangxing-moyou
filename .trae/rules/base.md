# 基础语法规范（AI 专用）
## 一、强制语法
1. 仅使用 <script setup lang="ts">
2. TypeScript 全覆盖，禁止隐式 any
3. 异步统一 async/await
4. 小程序 API：uni.xxx，禁止 wx.xxx

## 二、自动引入规则（禁止手动 import）
- Vue API（ref/reactive/computed/watch）
- 生命周期（onMounted/onShow/onLoad等）
- Pinia（createPinia/useStore/persistPlugin）
- UniApp 工具函数
- Woto UI 组件（wd-*）
- src/components/ 下业务组件

## 三、类型检查规则
- uni_modules 目录下的类型不需要检查
- 仅检查 src 目录下的 TypeScript 类型
