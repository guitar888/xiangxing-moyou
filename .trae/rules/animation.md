# 动画特效规范（AI 专用）

## 一、动画设计原则
1. **适度克制**：动画不喧宾夺主，提升用户体验而非干扰
2. **性能优先**：避免复杂动画导致卡顿，使用 `transform` 和 `opacity`
3. **统一风格**：所有页面动画风格一致，时长、缓动函数统一
4. **暗黑适配**：动画色彩在暗黑模式下依然清晰

## 二、UnoCSS 动画类（统一使用）

### 2.1 页面入场动画（必选）

| 动画类 | 效果 | 适用场景 |
|--------|------|----------|
| `animate-fade-in-up` | 从下往上淡入 | 卡片、列表项、模块 |
| `animate-fade-in-down` | 从上往下淡入 | 头部、下拉内容 |
| `animate-scale-in` | 缩放进入 | 弹窗、图标、按钮 |
| `animate-slide-in-left` | 从左侧滑入 | 侧边栏、侧滑菜单 |

**使用示例：**
```html
<view class="animate-fade-in-up">卡片内容</view>
```

### 2.2 高级特效动画

| 动画类 | 效果 | 适用场景 |
|--------|------|----------|
| `animate-glow-pulse` | 呼吸辉光 | 头部、高亮按钮、重要标识 |
| `animate-float-slow` | 轻微浮动 | 装饰元素、悬浮提示 |
| `animate-border-flow` | 边框流光 | VIP卡片、特殊标识 |

### 2.3 动画延迟（配合入场动画）

| 延迟类 | 时长 |
|--------|------|
| `animate-delay-0` | 0ms |
| `animate-delay-100` | 100ms |
| `animate-delay-200` | 200ms |
| `animate-delay-300` | 300ms |

**列表交错示例：**
```html
<view v-for="(item, index) in list" 
      :key="index"
      class="animate-fade-in-up"
      :style="{ animationDelay: `${index * 80}ms` }">
  {{ item }}
</view>
```

## 三、交互动画规范

### 3.1 点击反馈
- **按钮/卡片点击**：`active:scale-95` + `transition-all duration-100`
- **Tab 切换**：`active:scale-98`
- **禁用状态**：无动画

### 3.2 数字动画
使用 `requestAnimationFrame` 实现平滑数字变化，参考首页实现：
```typescript
function animateNumber(target: number, display: Ref<number>) {
  const duration = 1500
  const start = Date.now()
  const startValue = 0

  const animate = () => {
    const elapsed = Date.now() - start
    const progress = Math.min(elapsed / duration, 1)
    display.value = Math.floor(startValue + (target - startValue) * progress)

    if (progress &lt; 1) {
      requestAnimationFrame(animate)
    }
  }
  animate()
}
```

### 3.3 元素出现/消失
- **出现**：`opacity-100` + `translate-y-0` + `scale-100`
- **消失**：`opacity-0` + `translate-y-[20rpx]` + `scale-90`
- **过渡**：`transition-all duration-200`

## 四、动画时长规范

| 场景 | 时长 |
|------|------|
| 页面入场 | 0.5-0.6s |
| 点击反馈 | 0.1s |
| 元素过渡 | 0.2s |
| 数字动画 | 1.5s |
| 循环特效 | 4-6s |

## 五、禁止事项
- ❌ 禁止在循环列表中使用复杂动画影响性能
- ❌ 禁止动画时长超过 1s 的一次性动画
- ❌ 禁止同时触发多个全屏动画
- ❌ 禁止自定义 CSS keyframes，统一使用 uno.config.ts 配置
- ❌ 禁止过度使用动画，保持克制

## 六、参考实现
- 首页入场动画：`pages/index/index.vue`
- 快捷入口交错动画：`components/home/QuickEntry.vue`
- 骑行数据卡片：`components/home/RideDataCard.vue`
