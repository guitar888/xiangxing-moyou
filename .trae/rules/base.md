# 基础技术规范（Wot-Starter 适配版）
## 一、技术栈（沿用 Wot-Starter 内置版本）
- 开发框架：UniApp（Wot-Starter 内置版本） + Vue 3 + TypeScript
- 构建工具：Vite（Wot-Starter 内置版本）
- UI 组件库：Woto UI（wot-design-uni，Wot-Starter 内置版本），开启 easycom 自动引入
- 后端支持：Bmob 后端云（SDK 2.0+，仅按需引入）
- 地图 SDK：腾讯地图微信小程序版（3.0+，封装后使用）
- 适配平台：仅微信小程序（基于 Wot-Starter 的 `dev:mp-weixin`/`build:mp-weixin` 命令）
- 包管理器：pnpm（Wot-Starter 推荐），禁止 npm/yarn

## 二、语法强制规则
1. Vue 3 仅使用 `<script setup lang="ts">`，禁止选项式 API；
2. TypeScript 类型全覆盖（接口/函数/变量），禁止隐式 any；
3. 异步代码统一用 `async/await`，禁止回调地狱；
4. 微信小程序 API 统一用 `uni.xxx`，禁止直接调用 `wx.xxx`；
5. 路由跳转使用 Wot-Starter 内置的路由封装，禁止直接调用 `uni.navigateTo` 等原生 API。

## 三、Import 规范（Vite 自动引入）
1. **禁止手动引入 Vue 内置 API**：`ref`、`reactive`、`computed`、`watch`、`onMounted`、`onUnmounted`、`onBeforeMount`、`onBeforeUnmount`、`onShow`、`onHide`、`onLoad` 等 Vue 3 和 UniApp 的生命周期/响应式 API 由 Vite 自动引入，禁止手动 import；
2. **禁止重复引入**：Vite 配置了自动引入，重复 import 容易引起错误；
3. **仅按需引入**：只引入 Vite 无法自动引入的第三方库或自定义工具；
4. **Wot UI 组件**：通过 easycom 自动引入，禁止手动 import 组件；
5. **自定义组件**：放置在 `src/components/` 目录下的自定义组件（遵循 Vue 组件命名规范，如 `GlobalLoading.vue` 使用 `<GlobalLoading />`），同样通过 easycom 自动引入，无需手动 import；
6. **类型定义**：仅在需要显式类型声明时引入类型。
