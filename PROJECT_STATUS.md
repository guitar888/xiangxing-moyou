# 襄行摩友 (XiangXing MoYou) 项目状态

> 最后更新：2026-05-20
> 分支：main (已推送到 GitHub)

---

## 当前进度
- **首页**：Banner 图片统一数据源（使用活动封面），高度增至 480rpx
- **活动页**：按状态分组（即将开始/进行中/历史记录），标签已改为中文显示
- **关于我们**：优化头像、签名区样式、复制按钮交互，Logo 适配浅色模式
- **数据层**：`useHomeData` 精简，骑行数据改用真实接口
- **敏感内容处理**：所有活动数据已优化，避免夜骑、炸街等扰民相关内容，强调文明驾驶

## 技术架构
- **框架**：uni-app + Vue 3 + TypeScript
- **UI**：Wot Design Uni
- **样式**：UnoCSS + SCSS
- **数据源**：统一使用 `src/api/mock/activityMock.ts`

## 核心文件位置
- 首页数据：`src/composables/useHomeData.ts`
- 活动数据：`src/composables/useActivityData.ts`
- Mock 数据：`src/api/mock/activityMock.ts`
- Banner 组件：`src/components/Banner/Banner.vue`
- 活动列表：`src/components/home/ActivityList.vue`
- 关于我们：`src/pages/about/index.vue`

## 特殊注意事项
1. **数据源统一**：Banner 和首页活动列表均来自 `mockActivities` 中 `status === 'upcoming'` 的活动
2. **图片映射**：封面图在 `homeService.ts` 的 `ACTIVITY_COVER_IMAGES` 对象中定义
3. **标签中文**：`useActivityData.ts` 中有 `filterMap` 映射英文标签到中文
4. **敏感内容**：所有活动强调文明驾驶，无扰民相关内容（夜骑、炸街等）
5. **预览地址**：通过 `/deploy-website` skill 启动，端口 5173

## 下一步计划
- 等待用户反馈或新需求
- 可能涉及：后端 API 对接、更多活动运营数据、用户反馈功能等
