# 襄行摩友小程序 - 主项目规范（AI 精准版）
## 一、项目定位
襄阳本地摩友公益工具 | 非盈利 | 无交易 | 无社交 | 无导流 | 微信小程序专属

## 二、技术栈（1:1 匹配 package.json）
- 框架：UniApp 3.0.0-4080520251106001 + Vue 3.4.38
- 语言：TypeScript 5.5.4
- 构建：Vite 5.2.8
- 样式：UnoCSS 66.0.0
- UI：wot-design-uni 1.14.0（暗黑模式默认开启）
- 请求：alova 3.3.4 + @alova/adapter-uniapp
- 状态：Pinia 2.3.1
- 路由：@wot-ui/router 1.1.2
- 图表：echarts 6.0.0 + uni-echarts 2.2.5
- 地图：腾讯地图SDK
- 后端：Bmob 后端云
- 包管理器：pnpm 9.9.0
- Node：>=20.19.0

## 三、已完成成果（必须保留）
- 首页开发完成
- 组件业务分离
- 组件自动引入
- UnoCSS 原子样式
- ESLint + Husky + lint-staged
- API 自动导入
- vue-i18n 国际化
- 暗黑模式全局生效

## 四、目录结构（固定）
src/
├── pages/        页面（index/map/data/activity/mine）
├── components/   业务组件（自动引入）
├── composables/  自动导入组合式函数
├── hooks/        全局钩子
├── api/          alova 请求
├── utils/        工具（tencentMap/storage/request/route）
├── store/        pinia 状态
├── styles/       全局样式 + CSS 变量
├── static/       静态资源
└── types/        TS 类型

## 五、强制开发规范
1. 仅使用 <script setup lang="ts">，禁止选项式 API
2. TS 全覆盖，禁止隐式 any
3. 异步统一 async/await
4. 小程序 API 统一使用 uni.xxx，禁止 wx.xxx
5. 组件自动引入，禁止手动 import
6. 100% 使用 UnoCSS，禁止冗余 style
7. 请求统一放 src/api/，禁止 uni.request 裸写
8. 路由使用 @wot-ui/router，禁止原生跳转
9. 尺寸统一 rpx
10. 样式必须 scoped，禁止全局污染

## 六、命令规范
- 开发：pnpm dev:mp-weixin
- 构建：pnpm build:mp-weixin
- 类型检查：pnpm type-check
- 格式化：pnpm lint:fix

## 七、合规红线（绝对禁止）
- 无支付、无交易、无电商、无二手
- 无社交、无评论、无点赞、无关注
- 不展示电话/微信/二维码/外链
- 不收集手机号/身份证/真实姓名
- 用户上传内容必须管理员审核
- 地图仅用腾讯地图官方SDK

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

## 九、平台兼容性优化

### 8.1 动画优化
- **H5 平台**：可以使用 `requestAnimationFrame` 和复杂动画效果
- **小程序平台**：建议使用简单动画或无动画，避免使用 `setInterval` 影响性能
- **实现方式**：使用条件编译 `#ifdef H5` 和 `#ifndef H5` 为不同平台提供不同实现

### 8.2 毛玻璃效果（backdrop-filter）
- **H5 平台**：可以使用 `backdrop-blur-xl` 等 UnoCSS 类
- **小程序平台**：
  - 不支持 `backdrop-filter` 属性
  - 可以使用半透明背景模拟效果，如 `bg-white/20`
  - 或直接使用实色背景

### 8.3 渐变效果
- **H5 平台**：支持 `radial-gradient` 和 `linear-gradient`
- **小程序平台**：
  - 建议使用 `linear-gradient`，对 `radial-gradient` 支持有限
  - 不支持 CSS 变量在渐变中使用，需要使用具体颜色值
  - 示例：`linear-gradient(to bottom, rgba(46, 213, 115, 0.3) 0%, rgba(46, 213, 115, 0.1) 100%)`

### 8.4 CSS 变量使用
- **H5 平台**：可以正常使用 CSS 变量
- **小程序平台**：
  - 部分场景下 CSS 变量可能不生效（如在渐变中）
  - 建议在关键样式中使用具体颜色值作为 fallback
  - 颜色值参考 `src/styles/variables.css` 中的定义

### 8.5 SVG 使用
- 小程序仅支持作为静态图片资源使用 SVG
- 不支持在 SVG 中使用 `<filter>` 等滤镜标签
- 不支持 SVG 的 `<style>` 样式表定义
- 不支持通过 `url()` 方式引用外部 SVG 滤镜文件

### 8.6 条件编译最佳实践
- 使用 `#ifdef H5` 为 H5 平台提供高级效果
- 使用 `#ifndef H5` 为小程序平台提供兼容性实现
- 保持两个平台的视觉效果尽可能一致
- 优先保证小程序平台的稳定性和性能
