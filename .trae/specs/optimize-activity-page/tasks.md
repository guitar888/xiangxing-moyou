# Tasks

- [x] Task 1: 精简标签页功能
  - [x] SubTask 1.1: 删除"发布活动"标签页及相关代码（newActivity、handleCreateActivity、showCreateActivity 等）
  - [x] SubTask 1.2: 删除"路书生成"标签页及相关代码（routeName、routeStops、generateRoute 等）
  - [x] SubTask 1.3: 修改 activeTab 仅保留 'activities' 和 'aa' 两个选项

- [x] Task 2: 美化标签栏设计
  - [x] SubTask 2.1: 重新设计标签栏，使用图标+文字的紧凑布局
  - [x] SubTask 2.2: 标签栏高度控制在 88rpx 以内
  - [x] SubTask 2.3: 使用 UnoCSS 实现响应式主题适配

- [x] Task 3: 优化分类筛选布局
  - [x] SubTask 3.1: 将 scroll-view 改为 flex-wrap 多行布局
  - [x] SubTask 3.2: 每个筛选标签使用紧凑的 pill 样式
  - [x] SubTask 3.3: 标签宽度自适应内容，不占据整行

# Task Dependencies
- Task 2 依赖 Task 1 完成
- Task 3 可与 Task 2 并行执行
