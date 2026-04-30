# 主题切换优化规则

## 核心原则

1. **双入口架构**：`App.vue` 是伪入口，仅保留生命周期钩子；`App.ku.vue` 是真实入口，处理主题配置
2. **CSS变量驱动**：所有响应式颜色通过 CSS 变量 `--wot-color-*` 实现主题切换
3. **深色背景特殊处理**：固定背景的组件（如 Banner）使用固定颜色值而非 CSS 变量

## 文件职责

### App.vue
- 仅包含 `onLaunch()` 生命周期钩子
- 引入全局样式变量
- 不包含任何主题逻辑

### App.ku.vue
- 真实入口文件
- 使用 `useManualTheme()` composable
- 包裹 `wd-config-provider` 传递主题变量

### store/manualThemeStore.ts
- 管理主题状态（theme、themeVars）
- `setCssVariables()`: 动态设置 DOM CSS 变量（H5平台）
- `updateThemeVars()`: 更新主题变量并同步到 DOM
- `toggleTheme()`: 切换主题模式

### composables/useManualTheme.ts
- 封装主题管理逻辑
- 提供响应式主题状态
- 在 `onBeforeMount` 初始化主题
- 监听系统主题变化

## 样式使用规范

### 响应式样式（推荐）
```vue
<!-- 使用 UnoCSS 类，自动响应主题变化 -->
<view class="bg-card text-white text-gray">
  <!-- card 背景、文字颜色自动跟随主题 -->
</view>
```

### 固定样式（特殊场景）
```vue
<!-- Banner 等固定深色背景组件，使用固定白色 -->
<text class="text-[#FFFFFF]">标题文字</text>
<text class="text-[#E0E0E0]">描述文字</text>
```

### CSS 变量引用
```scss
/* 使用 CSS 变量 */
.color-primary {
  color: var(--wot-color-theme);
}
.bg-base {
  background: var(--wot-color-bg-base);
}
```

## 主题变量清单

| 变量名 | Dark | Light | 用途 |
|--------|------|-------|------|
| --wot-color-theme | #2ED573 | #2ED573 | 主题色 |
| --wot-color-bg-base | #121212 | #ffffff | 基础背景 |
| --wot-color-bg-card | #1E1E1E | #f5f5f5 | 卡片背景 |
| --wot-color-bg-hover | #272727 | #e5e5e5 | 悬停背景 |
| --wot-color-text-white | #FFFFFF | #000000 | 主文字 |
| --wot-color-text-gray | #8D99AE | #737373 | 次要文字 |
| --wot-color-text-muted | #CCCCCC | #a3a3a3 | 辅助文字 |
| --wot-color-border | #333333 | #d4d4d4 | 边框 |

## 常见问题处理

### 问题1：主题切换后页面不变
- 检查是否在 `App.ku.vue` 中使用了 `wd-config-provider`
- 确保 `themeVars` 包含完整的 CSS 变量
- 验证 `updateThemeVars()` 调用了 `setCssVariables()`

### 问题2：深色背景上文字不可见
- Banner 等固定深色背景组件使用固定白色值 `text-[#FFFFFF]`
- 避免使用 `text-white` 在固定深色背景上

### 问题3：小程序渲染错误
- 移除 `wd-root-portal` 和 `:root-portal="true"`
- 小程序不支持 `document.body` 操作

## 优化检查清单

- [ ] `App.vue` 已清空为最小入口
- [ ] `App.ku.vue` 正确使用 `wd-config-provider`
- [ ] 响应式组件使用 UnoCSS 颜色类
- [ ] 固定背景组件使用固定颜色值
- [ ] `manualThemeStore.ts` 包含完整的主题变量
- [ ] 主题切换时调用 `updateThemeVars()`
