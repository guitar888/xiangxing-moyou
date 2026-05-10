# 襄行摩友小程序（Trae AI 专用）

⚠️ 【AI 开发强制指令】
1. 启动后**先自动读取**：.trae/rules/project-rules.md（最高优先级）
2. 再读取：docs/development-spec.md、docs/api对接指南.md
3. 所有代码**100% 遵循强制规范**，不允许违反合规红线
4. 禁止修改技术栈、目录结构、依赖版本
5. 只生成符合规范的代码：Vue3 setup + TS + UnoCSS + wot-design-uni + alova

## 核心定位
襄阳本地摩友公益工具｜非盈利｜无交易｜无社交｜无导流

## 开发命令
pnpm dev:mp-weixin      # 微信小程序开发
pnpm build:mp-weixin    # 构建
pnpm type-check        # TS 检查
pnpm lint:fix          # 格式化
