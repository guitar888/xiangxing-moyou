# 项目规范与架构说明

## 一、项目定位

- 该仓库基于 `Wot Starter` 的 `uni-app` 多端模板，主要面向微信小程序开发。
- 使用 `Vue 3 + TypeScript + Vite + pnpm`，同时引入 `Wot UI`、`UnoCSS`、`Alova`、`Pinia`、`Uni Echarts` 等生态。
- 该项目当前以 `mp-weixin` 作为核心适配平台，`.trae` 规范要求以微信小程序为主。
- 规范主体为 `.trae/rules/project_rules.md`，该文件是本项目最完整的规则文档；本指南为快速参考。

## 二、核心架构

- `src/pages/`：基于文件路由的页面目录，页面即路由。
- `src/components/`：公共组件目录，使用 PascalCase 命名。
- `src/layouts/`：应用布局组件。
- `src/api/`：API 接口定义、请求封装、Mock 适配。
- `src/composables/`：自定义组合式函数（hooks）。
- `src/store/`：Pinia 状态管理。
- `src/utils/`：工具函数和通用模块。
- `src/customize-tab-bar/`：定制 tabBar 相关资源。
- `src/static/`：静态资源。
- `docs/`：项目与框架文档。
- 根目录配置文件：`package.json`、`vite.config.ts`、`tsconfig.json`、`eslint.config.mjs`、`uno.config.ts`、`pages.config.ts` 等。

## 三、开发流程与命令

- 启动开发：`pnpm dev` 或 `pnpm dev:h5`，微信小程序调试使用 `pnpm dev:mp-weixin`。
- 打包构建：`pnpm build` 或 `pnpm build:mp-weixin`。
- 类型检查：`pnpm type-check`。
- 代码检查：`pnpm lint`，自动修复：`pnpm lint:fix`。
- 提交规范：`pnpm commit`（基于 `commitizen`）。

## 四、`.trae` 规则要点

### 1. 技术栈与工具

- 框架：`UniApp` + `Vue 3` + `TypeScript`。
- 构建：`Vite`。
- 包管理：`pnpm`，禁止使用 `npm` / `yarn`。
- UI：`Wot UI`（easycom 自动引入）。
- 目标平台：仅微信小程序（`mp-weixin`）。

### 2. 语法与代码模式

- 仅使用 `<script setup lang="ts">`，禁止选项式 API。
- TypeScript 类型覆盖，避免隐式 `any`。
- 异步逻辑统一使用 `async/await`。
- 路由使用内置封装，避免直接调用原生 `uni.navigateTo` 等。

### 3. 引入规范

- Vue / UniApp 响应式 API 与生命周期函数由自动导入管理，禁止手动 `import`：
  - `ref`, `reactive`, `computed`, `watch`, `onMounted`, `onShow` 等。
- Wot UI 组件由 `easycom` 自动引入，禁止手动导入组件。
- 只显式引入第三方库或自定义工具中未自动注入的内容。

### 4. 目录与命名规范

- 变量/函数：小驼峰。
- 组件/类：大驼峰。
- 文件名：小写 + 短横线。
- 样式类名：小写 + 短横线，优先使用 UnoCSS 原子类。
- Vue 文件结构：`template` → `script setup` → `style scoped`。

### 5. 安全与合规限制

- 禁止直接使用 `wx.xxx`。
- 禁止敏感 API：
  - `uni.getPhoneNumber`, `uni.getUserInfo`, `uni.getUserProfile`
  - `uni.requestPayment`, `uni.openCard`, `uni.navigateToMiniProgram`
  - 未授权的 `uni.getLocation`、后台定位等。
- 禁止收集/存储用户敏感信息。
- 禁止跨平台兼容代码，核心只做微信小程序适配。

## 五、项目适配要点

- 该项目采用 `@uni-helper/vite-plugin-uni-pages` 生成路由，实际路由数据来自 `src/router/index.ts` 的 `generateRoutes()`。
- `pages.config.ts` 管理全局样式、tabBar 与页面配置。
- 代码中大量使用 `uni.xxx` API 与 Wot UI 组件，遵循自动引入机制。

## 六、建议执行标准

- 开发时优先遵循 `.trae/rules/*` 的规范。
- 任何新页面或组件应保持与现有目录结构一致，避免引入多余平台兼容层。
- 提交前执行 `pnpm lint` 并保证 `pnpm type-check` 通过。

## 七、文档与学习参考

- 项目 README 基于 `Wot Starter` 模板，可参考其快速上手与生态说明。
- 若需补充本仓库规范，可继续将 `.trae` 规则整理为对应 `docs/` 或 `.github` 文档。
- `.trae/README.md` 为本仓库规范目录说明文件，建议在新增规则时一并维护该文件。

---

> 该文档为当前仓库适配版本的开发规范总结，结合项目实际架构与 `.trae` 规则，旨在形成适用于本仓库的工程约定。
