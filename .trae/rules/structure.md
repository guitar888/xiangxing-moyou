# 目录与命名规范（适配 Wot-Starter 结构）
## 一、目录结构（基于 Wot-Starter 基础结构扩展）
- `pages/`：页面文件（index/map/data/activity/mine）
- `components/`：公共业务组件（PascalCase 命名）
- `utils/`：工具函数（tencentMap/storage/request/route，TS 类型完整）
- `static/`：静态资源（图标/图片，禁止超大文件）
- `types/`：全局 TS 类型定义

## 二、命名规则
1. 变量/函数：小驼峰（如 `getUserInfo`）
2. 组件/类：大驼峰（如 `ActivityCard.vue`）
3. 文件：小写+短横线（如 `activity-list.vue`）
4. 样式类：小写+短横线（如 `card-container`），优先使用 UnoCSS 原子类

## 三、文件结构
Vue 文件顺序：template → script setup → style scoped，禁止调整顺序。
