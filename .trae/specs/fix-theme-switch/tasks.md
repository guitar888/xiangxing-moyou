# 修复暗黑/亮色模式切换功能 - 实施计划

## Task Dependencies
无，所有任务可独立执行

## Tasks

### Task 1: 修复 manualThemeStore.ts - 恢复主题切换逻辑
- **Priority**: high
- **Depends On**: None
- **Description**: 
  - 取消 `manualThemeStore.ts` 中所有被注释掉的主题切换逻辑
  - 恢复 `toggleTheme()` 方法的正常功能
  - 恢复 `setFollowSystem()` 方法
  - 恢复 `setNavigationBarColor()` 方法的动态颜色逻辑
  - 恢复 `getSystemTheme()` 方法
  - 恢复 `initTheme()` 方法的正常初始化逻辑
- **Acceptance Criteria Addressed**: AC-1, AC-3
- **Test Requirements**:
  - programmatic: 检查代码中不再有强制锁定 dark 模式的逻辑
  - human-judgment: 验证 toggleTheme 能够正常切换 dark/light
- **Notes**: 参考官方脚手架的原始实现（git 历史）

### Task 2: 修复 App.vue - 使用官方最佳实践
- **Priority**: high
- **Depends On**: Task 1
- **Description**: 
  - 修改 `App.vue`，参考 `App.ku.vue` 的实现方式
  - 使用 `useManualTheme()` composable 而不是 `useThemeStore()`
  - 在 `wd-config-provider` 上正确绑定 `:theme-vars="themeVars"` 和 `:theme="theme"`
- **Acceptance Criteria Addressed**: AC-4
- **Test Requirements**:
  - human-judgment: 验证 App.vue 的代码结构符合官方最佳实践
- **Notes**: 可以直接参考 App.ku.vue 的实现

### Task 3: 修复 mine.vue - 正确调用主题切换
- **Priority**: high
- **Depends On**: Task 1
- **Description**: 
  - 修改 `mine.vue` 中的主题切换逻辑
  - 使用 `useManualTheme()` composable 而不是直接使用两个 store
  - 修复 `toggleTheme()` 函数，正确调用 `manualThemeStore.toggleTheme()`
- **Acceptance Criteria Addressed**: AC-1, AC-4
- **Test Requirements**:
  - human-judgment: 验证"我的"页面的开关能够正常切换主题
- **Notes**: 移除对 `setTheme()` 的调用（该方法不存在）

### Task 4: 验证和测试主题切换
- **Priority**: high
- **Depends On**: Task 2, Task 3
- **Description**: 
  - 在 H5 平台测试主题切换功能
  - 在小程序平台测试主题切换功能
  - 测试所有页面的颜色是否正确响应主题变化
  - 测试导航栏颜色是否正确更新
- **Acceptance Criteria Addressed**: AC-1, AC-2, AC-3
- **Test Requirements**:
  - human-judgment: 完整的端到端测试
- **Notes**: 特别注意小程序平台的兼容性
