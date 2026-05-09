# 活动页面优化 Spec

## Why
活动页面存在多个UI/UX问题：发布活动功能不符合实际使用场景（活动应由管理员后台发布）、标签页按钮过大过丑、分类筛选按钮占据整行、部分功能名称不直观（"路书"含义不明）。

## What Changes
- **删除发布活动功能**：移除"发布活动"标签页及相关代码
- **优化标签页设计**：改用图标+文字的小型标签栏，类似底部 tabbar 风格
- **优化分类筛选**：使用 flex-wrap 多行布局，每个标签紧凑显示
- **重命名"路书生成"**：改为更直观的名称如"骑行计划"或移除该功能

## Impact
- Affected specs: 活动页面 UI/UX
- Affected code: `src/pages/activity/activity.vue`

## ADDED Requirements

### Requirement: 精简标签页
系统 SHALL 仅保留"活动列表"和"AA计算器"两个标签页，移除"发布活动"和"路书生成"功能。

#### Scenario: 用户查看活动页面
- **WHEN** 用户进入活动页面
- **THEN** 仅显示"活动列表"和"AA计算器"两个标签选项

### Requirement: 美化标签栏
系统 SHALL 使用紧凑的标签栏设计，每个标签包含图标和文字，整体高度不超过 88rpx。

#### Scenario: 标签栏显示
- **WHEN** 用户查看活动页面
- **THEN** 标签栏以图标+文字形式紧凑展示，不占据过多空间

### Requirement: 多行分类筛选
系统 SHALL 使用 flex-wrap 布局展示分类筛选标签，每行可显示多个标签。

#### Scenario: 分类筛选显示
- **WHEN** 用户查看活动列表
- **THEN** 分类标签以多行紧凑方式排列，每个标签宽度自适应

## REMOVED Requirements

### Requirement: 发布活动功能
**Reason**: 活动由管理员从后台发布，普通用户无需此功能
**Migration**: 移除相关代码和 UI 组件

### Requirement: 路书生成功能
**Reason**: "路书"一词含义不明确，且功能与骑行地图重复
**Migration**: 移除相关代码和 UI 组件
