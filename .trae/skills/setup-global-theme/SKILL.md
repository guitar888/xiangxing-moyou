
---

## 二、.trae/skills/setup-global-theme/SKILL.md
（技能：让 Trae 一键执行「全局主题规范化」）

```markdown
---
name: setup-global-theme
description: 基于 wot-starter + unocss 搭建全局CSS变量主题系统（禁止硬编码色号）
---

# 全局主题规范化技能

## 描述
为襄行摩友项目搭建 **企业级可维护颜色系统**：
- 全局 CSS 变量
- UnoCSS 主题预设
- wot-starter ConfigProvider 注入
- 全项目替换硬编码色号
- 适配所有页面与全局组件（Loading/Error）

## 使用场景
- 项目初始化/重构颜色规范
- 需求：“把所有色号改成变量”
- 需求：“优化主题可维护性”
- 需求：“一键换肤”

## 执行指令（强制步骤）
1. **创建全局样式文件**
   - 路径：`src/styles/global.css` / `variables.css`
   - 定义 `:root` 下所有 `--wot-color-*` 变量
   - 主色：`--wot-color-theme: #2ED573`

2. **配置 UnoCSS**
   - 修改 `uno.config.ts`
   - 在 `theme.colors` 映射 CSS 变量
   - 支持：`text-primary`、`bg-base`、`border-color` 等语义化类名

3. **配置 wot-starter ConfigProvider**
   - 根 App.vue 全局包裹
   - 注入主题变量，对接 wot-ui 官方规范

4. **全量替换硬编码色号**
   - 首页所有 `bg-[#121212]` → `bg-base`
   - `text-[#2ED573]` → `text-primary`
   - `border-[#333]` → `border-color`
   - 包括：`GlobalStatusLoading`、`GlobalStatusError`

5. **统一阴影/渐变**
   - 阴影：`shadow-[0_8rpx_32rpx_rgba(var(--wot-color-theme-rgb),0.08)]`
   - 渐变：`bg-gradient-to-r from-primary to-primary/80`

6. **验证**
   - 搜索项目：**无任何 #xxxxxx 硬编码色号**
   - 修改主色 `#2ED573` → 全项目自动变化

## 输出产物
1. `src/styles/global.css`（完整变量）
2. `uno.config.ts`（完整 theme 配置）
3. 根组件 `App.vue`（ConfigProvider）
4. 改造后：首页 + `GlobalStatusLoading` + `GlobalStatusError`
5. 规范说明文档

## 约束（同规则）
- 禁止硬编码色号
- 100% 使用 UnoCSS 原子类
- 遵循 wot-starter 官方最佳实践
- 支持一键换肤、高度可维护
