# 襄行摩友小程序开发计划

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 完成襄行摩友小程序的开发，包括头部优化、数据管理优化和剩余页面开发

**Architecture:** 采用UniApp + Vue 3 + TypeScript + UnoCSS技术栈，使用组件化开发和状态管理，通过条件编译实现H5和小程序的兼容性

**Tech Stack:** UniApp 3.0.0 + Vue 3.4.38 + TypeScript 5.5.4 + UnoCSS 66.0.0 + wot-design-uni 1.14.0 + Pinia 2.3.1 + alova 3.3.4

---

## 第一阶段：优化现有功能

### 任务1：小程序头部右侧遮挡问题优化

**文件：**
- 修改：`/Users/winter/Desktop/tech/襄阳摩友助手/2.0version/moyou2.0/xiangxingmoyou/src/components/home/HeaderHome.vue`

- [ ] **步骤1：分析头部布局问题**
  - 检查小程序头部右侧城市选择器的位置和padding
  - 确认遮挡原因

- [ ] **步骤2：优化小程序头部样式**
  - 为小程序版本增加额外的padding-right
  - 确保城市选择器完全可见
  - 保持H5版本不变

- [ ] **步骤3：测试效果**
  - 在微信开发者工具中测试
  - 确保头部元素布局合理

### 任务2：优化首页数据管理，使用Mock数据

**文件：**
- 修改：`/Users/winter/Desktop/tech/襄阳摩友助手/2.0version/moyou2.0/xiangxingmoyou/src/composables/useHomeData.ts`
- 修改：`/Users/winter/Desktop/tech/襄阳摩友助手/2.0version/moyou2.0/xiangxingmoyou/src/api/services/homeService.ts`
- 修改：`/Users/winter/Desktop/tech/襄阳摩友助手/2.0version/moyou2.0/xiangxingmoyou/src/api/mock/modules/common.ts`

- [ ] **步骤1：创建首页Mock数据**
  - 在common.ts中添加首页相关的Mock数据
  - 包括banner、快捷入口、骑行数据、活动列表等

- [ ] **步骤2：优化homeService**
  - 创建获取首页数据的API方法
  - 配置Mock适配器

- [ ] **步骤3：重构useHomeData**
  - 改为从API获取数据
  - 添加加载状态和错误处理
  - 保持现有功能不变

- [ ] **步骤4：测试数据获取**
  - 确保数据能正常从Mock获取
  - 验证加载状态和错误处理

### 任务3：首页逻辑封装优化

**文件：**
- 修改：`/Users/winter/Desktop/tech/襄阳摩友助手/2.0version/moyou2.0/xiangxingmoyou/src/composables/useHomeData.ts`

- [ ] **步骤1：优化代码结构**
  - 提取重复逻辑为单独函数
  - 优化类型定义
  - 增加注释说明

- [ ] **步骤2：添加数据缓存**
  - 使用localStorage缓存数据
  - 实现数据过期机制

- [ ] **步骤3：测试性能**
  - 确保数据加载流畅
  - 验证缓存效果

## 第二阶段：开发剩余页面

### 任务4：开发地图页面

**文件：**
- 修改：`/Users/winter/Desktop/tech/襄阳摩友助手/2.0version/moyou2.0/xiangxingmoyou/src/pages/map/map.vue`

- [ ] **步骤1：集成腾讯地图SDK**
  - 配置地图SDK
  - 实现基础地图展示

- [ ] **步骤2：添加骑行路线**
  - 展示推荐骑行路线
  - 实现路线详情查看

- [ ] **步骤3：添加地图功能**
  - 定位功能
  - 路线规划
  - 兴趣点标记

### 任务5：开发骑行数据页面

**文件：**
- 修改：`/Users/winter/Desktop/tech/襄阳摩友助手/2.0version/moyou2.0/xiangxingmoyou/src/pages/data/data.vue`

- [ ] **步骤1：集成ECharts**
  - 配置uni-echarts
  - 创建数据可视化图表

- [ ] **步骤2：实现数据统计**
  - 骑行距离统计
  - 骑行时间统计
  - 路线数量统计

- [ ] **步骤3：添加数据详情**
  - 历史骑行记录
  - 单次骑行详情
  - 数据导出功能

### 任务6：开发活动页面

**文件：**
- 修改：`/Users/winter/Desktop/tech/襄阳摩友助手/2.0version/moyou2.0/xiangxingmoyou/src/pages/activity/activity.vue`
- 修改：`/Users/winter/Desktop/tech/襄阳摩友助手/2.0version/moyou2.0/xiangxingmoyou/src/subPages/activity/detail.vue`

- [ ] **步骤1：实现活动列表**
  - 活动分类展示
  - 活动筛选功能
  - 活动搜索功能

- [ ] **步骤2：开发活动详情**
  - 活动信息展示
  - 报名功能
  - 分享功能

- [ ] **步骤3：添加活动管理**
  - 活动创建（管理员）
  - 活动审核（管理员）
  - 活动状态管理

### 任务7：开发个人中心页面

**文件：**
- 修改：`/Users/winter/Desktop/tech/襄阳摩友助手/2.0version/moyou2.0/xiangxingmoyou/src/pages/mine/mine.vue`

- [ ] **步骤1：实现个人信息**
  - 用户基本信息
  - 骑行统计概览
  - 个人设置

- [ ] **步骤2：添加功能入口**
  - 我的收藏
  - 我的报名
  - 我的消息

- [ ] **步骤3：实现设置功能**
  - 主题设置
  - 通知设置
  - 关于我们

## 第三阶段：完善项目

### 任务8：实现国际化

**文件：**
- 创建：`/Users/winter/Desktop/tech/襄阳摩友助手/2.0version/moyou2.0/xiangxingmoyou/src/i18n/index.ts`
- 创建：`/Users/winter/Desktop/tech/襄阳摩友助手/2.0version/moyou2.0/xiangxingmoyou/src/i18n/locales/zh-CN.ts`
- 创建：`/Users/winter/Desktop/tech/襄阳摩友助手/2.0version/moyou2.0/xiangxingmoyou/src/i18n/locales/en-US.ts`

- [ ] **步骤1：配置i18n**
  - 初始化i18n
  - 配置语言切换

- [ ] **步骤2：添加翻译**
  - 中文翻译
  - 英文翻译

- [ ] **步骤3：测试国际化**
  - 验证语言切换
  - 确保所有文本都已翻译

### 任务9：添加权限管理

**文件：**
- 修改：`/Users/winter/Desktop/tech/襄阳摩友助手/2.0version/moyou2.0/xiangxingmoyou/src/router/index.ts`

- [ ] **步骤1：配置路由守卫**
  - 实现权限检查
  - 配置管理员路由

- [ ] **步骤2：添加管理员功能**
  - 管理员登录
  - 后台管理入口

### 任务10：优化性能和用户体验

**文件：**
- 修改：多个文件

- [ ] **步骤1：性能优化**
  - 图片懒加载
  - 代码分割
  - 缓存策略

- [ ] **步骤2：用户体验优化**
  - 加载动画
  - 过渡效果
  - 错误提示

- [ ] **步骤3：兼容性测试**
  - 测试不同设备
  - 测试不同网络环境

## 第四阶段：测试和部署

### 任务11：功能测试

- [ ] **步骤1：单元测试**
  - 测试组件功能
  - 测试API调用

- [ ] **步骤2：集成测试**
  - 测试页面跳转
  - 测试数据流转

- [ ] **步骤3：端到端测试**
  - 测试完整流程
  - 测试用户场景

### 任务12：部署上线

- [ ] **步骤1：构建项目**
  - 执行构建命令
  - 检查构建结果

- [ ] **步骤2：提交审核**
  - 准备审核材料
  - 提交小程序审核

- [ ] **步骤3：发布上线**
  - 审核通过后发布
  - 监控上线状态

---

## 开发规范

### 技术规范
- 严格遵循项目规范文档中的技术栈和开发规范
- 使用TypeScript进行类型检查
- 使用UnoCSS进行样式管理
- 使用条件编译处理平台差异

### 代码规范
- 组件化开发，提高代码复用性
- 模块化管理，保持代码结构清晰
- 良好的注释和文档
- 遵循ESLint规范

### 测试规范
- 每个功能都要进行测试
- 确保H5和小程序平台都能正常运行
- 测试不同设备和网络环境

### 安全规范
- 遵循合规红线
- 不收集用户敏感信息
- 确保数据安全

## 预期成果

1. 完成小程序头部优化，解决遮挡问题
2. 实现从Mock数据获取首页数据
3. 优化首页数据管理逻辑
4. 完成所有页面的开发
5. 实现国际化支持
6. 确保项目性能和用户体验
7. 成功部署上线

---

**计划完成时间：** 按照任务优先级和复杂度，预计在合理时间内完成所有开发任务。