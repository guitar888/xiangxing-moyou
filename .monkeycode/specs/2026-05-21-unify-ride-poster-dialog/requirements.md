# Requirements Document

## Introduction

统一骑行结束后的海报弹窗与数据页面分享弹窗，解决当前结束骑行后弹窗无数据的问题。方案为：结束骑行时将记录持久化到本地存储，数据页面自动刷新，弹窗逻辑复用数据页面的分享流程。

## Glossary

- **骑行记录 (RideRecord)**: 包含时间、距离、速度、轨迹路径等完整数据的骑行会话对象
- **海报弹窗 (RidePoster)**: 展示骑行数据并支持保存/分享的 Canvas 海报组件
- **useRideRecord**: 管理骑行记录开始/结束/存储的 composable
- **useMapData**: 管理地图页面业务逻辑的 composable
- **usePoster**: 负责海报生成/保存/分享的 composable

## Requirements

### Requirement 1: 结束骑行自动持久化记录

**User Story:** AS 骑行用户, WHEN 我结束骑行, THE 系统 SHALL 将本次骑行记录保存到本地存储，以便在数据页面查看和分享。

#### Acceptance Criteria

1. WHEN 用户确认结束骑行, THE 系统 SHALL 调用 `saveRideRecord()` 将完整记录写入本地存储
2. THE 骑行记录 SHALL 包含 path 轨迹数组、startLocationName、endLocationName 字段
3. IF 本地存储写入失败, THE 系统 SHALL 提示用户"记录保存失败"并阻止海报弹窗打开

### Requirement 2: 数据页面自动刷新最新记录

**User Story:** AS 数据页面用户, WHEN 有新的骑行记录产生, THE 系统 SHALL 自动刷新列表，以便用户看到最新数据。

#### Acceptance Criteria

1. WHEN useRideRecord 的 records 数组发生变化, THE 数据页面 SHALL 重新计算统计数据和分组
2. THE 最新记录 SHALL 出现在列表顶部，按 startTime 倒序排列
3. WHILE 数据页面处于活跃状态, THE 系统 SHALL 监听记录变化事件并自动刷新

### Requirement 3: 统一海报弹窗触发逻辑

**User Story:** AS 用户, WHEN 我结束骑行或点击分享按钮, THE 系统 SHALL 展示一致的海报弹窗，以便获得统一的视觉体验。

#### Acceptance Criteria

1. WHEN 结束骑行完成, THE 系统 SHALL 触发与数据页面分享相同的弹窗打开逻辑
2. THE 海报弹窗 SHALL 使用数据页面 `handleShare(record)` 的同一套状态管理
3. IF 传入的 record 缺少必要字段, THE 弹窗 SHALL 显示降级内容而非空白

### Requirement 4: 清理冗余状态管理

**User Story:** AS 维护者, WHEN 重构弹窗逻辑, THE 系统 SHALL 移除重复的状态变量，以便降低维护成本。

#### Acceptance Criteria

1. THE useMapData 中的 `showPoster` 和 `completedRecord` 状态 SHALL 被移除
2. THE 海报弹窗控制逻辑 SHALL 统一由 useRideRecord 或全局事件总线管理
3. THE RidePoster 组件在地图页面和数据页面的引用 SHALL 指向同一状态源
