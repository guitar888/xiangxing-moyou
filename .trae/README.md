# Trae 规范说明

该仓库的 `.trae` 目录用于存放项目开发规范与 AI 规则资源。

## 目录说明

- `.trae/rules/`：项目规范文档，覆盖技术栈、编码规范、UI 设计、安全规则、TabBar 配置等。
- `.trae/skills/`：AI 相关技能与参考内容，用于 Copilot / 代码生成辅助。
- `.github/PROJECT_GUIDELINES.md`：面向开发者的快速指南，摘要项目核心约定。

## 使用方式

1. 开发前请先阅读 `.github/PROJECT_GUIDELINES.md`，了解整体定位与开发流程。
2. 代码规范与项目约定请以 `.trae/rules/*` 中的规则为准。
3. 创建新页面或组件时，优先遵循 `pages/`、`components/`、`utils/` 目录结构与命名规范。
4. 所有新增功能应使用 `pnpm` 安装和运行，禁止使用 `npm` / `yarn`。

## 规则维护

- 若需要补充项目专属规范，请新增或更新 `.trae/rules/project_rules.md`。
- 任何修改应同步更新 `.github/PROJECT_GUIDELINES.md` 中的核心摘要。
- `.trae/skills/` 仅存放与 AI 生成相关的辅助信息，不作为代码执行配置。
