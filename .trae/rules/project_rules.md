# 襄行摩友小程序 - 项目规范（Trae 自动读取·完整版）

## 一、基础技术栈

- 开发框架：**UniApp + Vue 3 + TypeScript**，项目核心仅适配微信小程序。
- 构建工具：**Vite**。
- UI 组件库：**Woto UI（wot-design-uni）**，默认开启 easycom 自动引入。
- 后端支持：**Bmob 后端云**（按需引入，数据调用统一封装）。
- 地图 SDK：**腾讯地图微信小程序版**。
- 包管理器：**pnpm**，禁止使用 `npm` / `yarn`。

## 二、UI 设计规范

1.  **色彩规范**：

- 主色：`#2ED573`
- 辅助色：`#FF7A00`
- 背景：`#121212` / `#1E1E1E` / `#272727`
- 文字：`#FFFFFF` / `#CCCCCC`
- 分割线：`#333333`

2.  **组件规范**：

- 100% 使用 Woto UI 原生组件，禁止手动引入基础组件。
- 暗黑模式必须全局生效，禁止浅色背景或高亮元素。
- UnoCSS 仅用于布局、间距、圆角，禁止覆盖 Woto UI 组件主题样式。

3.  **尺寸规范**：

- 图标：36rpx / 40rpx / 60rpx
- 文字：20rpx / 22rpx / 24rpx / 28rpx
- 圆角：8rpx / 12rpx / 16rpx
- 间距：16rpx / 20rpx / 24rpx / 32rpx

4.  **交互规范**：

- 点击反馈：背景变 `#272727`，轻微缩放 1.02 倍，过渡 100ms。
- 加载态：统一使用 `wd-loading`，禁止自定义动画。
- 异常提示：统一使用 `wd-toast`。
- 适配安全区：避免底部/顶部被刘海或小黑条遮挡。

## 三、代码规范

1.  **语法规范**：

- Vue 文件必须使用 `<script setup lang="ts">`。
- 禁止选项式 API。
- 禁止隐式 `any`，类型覆盖必须完整。
- 异步逻辑统一使用 `async/await`。
- 统一使用 `uni.xxx` API，禁止直接调用 `wx.xxx`。

2.  **导入规范**：

- Vue / UniApp API 由自动导入管理，禁止手动引入 `ref`、`reactive`、`computed`、`watch`、`onMounted`、`onShow` 等。
- Woto UI 组件通过 easycom 自动引入，禁止手动 import 组件。
- 仅按需引入未自动注入的第三方库或自定义工具。

3.  **文件与命名规范**：

- 变量/函数：小驼峰。
- 组件/类：大驼峰。
- 文件名：小写+短横线。
- 样式类名：小写+短横线，优先采用 UnoCSS 原子类。
- Vue 文件顺序：`template` → `script setup` → `style scoped`。

4.  **目录结构**：

- `src/pages/`：页面文件。
- `src/components/`：公共业务组件。
- `src/utils/`：工具封装。
- `src/store/`：Pinia 状态管理。
- `src/static/`：静态资源。
- `src/types/`：类型声明。

## 四、项目特定要求

1.  **路由与 TabBar**：

- TabBar 保持 5 页结构：`index`、`map`、`data`、`activity`、`mine`。
- 使用 `pages.config.ts` 配置 tabBar 样式与页面路径。
- 样式：背景 `#1E1E1E`，文字 `#8D99AE` / `#2ED573`，边框 `black`。

2.  **工具与数据**：

- Bmob 统一通过 `utils/request.ts` 封装请求。
- 腾讯地图功能通过 `utils/tencentMap.ts` 封装。
- 路由封装通过 `utils/route.ts`，禁止直接调用 `uni.navigateTo`。

3.  **适配与输出**：

- 仅面向微信小程序端，禁止跨平台兼容层。
- 代码要求可运行、清晰、无冗余。
- 注释适度，功能和参数说明清楚。

## 五、测试与命令规范

1.  **包管理**：

- 统一使用 `pnpm`。
- 禁止使用 `npm` 或 `yarn` 命令。

2.  **开发命令**：

- `pnpm dev:mp-weixin`
- `pnpm build:mp-weixin`
- `pnpm lint`
- `pnpm type-check`

3.  **测试建议**：

- 如需补充测试，优先使用 `Vitest` 和 `@vue/test-utils`。

## 六、禁止项

1.  **绝对禁止**：

- `wx.xxx` 直接调用。
- `uni.getPhoneNumber`、`uni.getUserInfo`、`uni.getUserProfile`。
- `uni.requestPayment`、`uni.openCard`、`uni.navigateToMiniProgram`。

2.  **其他禁止项**：

- 禁止动态生成样式覆盖 Woto UI。
- 禁止收集敏感用户信息。
- 禁止引入 `package-lock.json` 或 `yarn.lock`。

## 七、样式转换规则（重要）

当参考旧版代码（如 `moyou/` 目录）进行还原或修改时，**必须**将传统 SCSS/CSS 样式**自动转换**为 UnoCSS 原子类写法：

1.  **布局类**：
   - `display: flex` → `flex`
   - `display: grid` → `grid`
   - `display: none` → `hidden`
   - `position: relative` → `relative`
   - `position: absolute` → `absolute`

2.  **间距类**：
   - `padding: 16rpx 24rpx` → `p-[16rpx] px-[24rpx]`
   - `margin-bottom: 16rpx` → `mb-[16rpx]`
   - `gap: 16rpx` → `gap-[16rpx]`

3.  **尺寸类**：
   - `width: 100%` → `w-full`
   - `height: 100%` → `h-full`
   - `width: 48rpx` → `w-[48rpx]`
   - `height: 48rpx` → `h-[48rpx]`

4.  **圆角与边框**：
   - `border-radius: 16rpx` → `rounded-[16rpx]`
   - `border-radius: 50%` → `rounded-[50%]`

5.  **颜色类**：
   - `background: #1E1E1E` → `bg-[#1E1E1E]`
   - `color: #FFFFFF` → `text-[#FFFFFF]`
   - `color: #2ED573` → `text-[#2ED573]`

6.  **文字类**：
   - `font-size: 28rpx` → `text-[28rpx]`
   - `font-weight: 600` → `font-600`

7.  **过渡类**：
   - `transition: all 100ms ease` → `transition-all duration-100`

**示例**：
```vue
<!-- 旧写法（需转换） -->
<view class="data-card">
  <view style="display: flex; justify-content: space-between; margin-bottom: 16rpx;">
    <text style="font-size: 28rpx; color: #FFFFFF;">骑行数据</text>
  </view>
</view>

<!-- 新写法（正确） -->
<view class="data-card">
  <view class="flex justify-between mb-[16rpx]">
    <text class="text-[28rpx] text-[#FFFFFF]">骑行数据</text>
  </view>
</view>
```

## 八、规则引用说明

- 该文件为本项目主要规范，开发时请优先参考本文件内容。
- `.github/PROJECT_GUIDELINES.md` 为快速入门摘要，`.trae/rules/*` 则为详细规则。
- 若出现规范冲突，以 `.trae/rules/project_rules.md` 为准。
