# TabBar 配置规范（襄行摩友小程序）
## 一、核心约束
1. TabBar 固定 5 页：首页（index）、地图（map）、数据（data）、活动（activity）、我的（mine）；
2. 基于 Wot-Starter 的 `pages.config.ts` 配置，覆盖默认 tabBar 配置；
3. 样式强制：
   - 背景色：#1E1E1E
   - 未选中文字色：#8D99AE
   - 选中文字色：#2ED573
   - 边框样式：black
   - 自定义 tabBar 开启（Wot-Starter 原生 `custom: true`）

## 二、配置示例（替换 pages.config.ts 中 tabBar 字段）
{
  "tabBar": {
    "custom": true,
    "height": "0", // 保持 Wot-Starter 自定义 tabBar 高度配置
    "backgroundColor": "#1E1E1E",
    "color": "#8D99AE",
    "selectedColor": "#2ED573",
    "borderStyle": "black",
    "list": [
      { "pagePath": "pages/index/index", "text": "首页", "iconPath": "static/icons/home.png", "selectedIconPath": "static/icons/home-active.png" },
      { "pagePath": "pages/map/map", "text": "地图", "iconPath": "static/icons/map.png", "selectedIconPath": "static/icons/map-active.png" },
      { "pagePath": "pages/data/data", "text": "数据", "iconPath": "static/icons/data.png", "selectedIconPath": "static/icons/data-active.png" },
      { "pagePath": "pages/activity/activity", "text": "活动", "iconPath": "static/icons/activity.png", "selectedIconPath": "static/icons/activity-active.png" },
      { "pagePath": "pages/mine/mine", "text": "我的", "iconPath": "static/icons/mine.png", "selectedIconPath": "static/icons/mine-active.png" }
    ]
  }
}
