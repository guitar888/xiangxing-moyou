# Theme Active Background Rule

When implementing click feedback with `active:` state in UniApp projects that support both light and dark themes, use dark semi-transparent backgrounds instead of light ones.

## Background

In projects with theme switching (light/dark mode), using `active:bg-white/X` for click feedback causes invisible feedback in light mode, while `active:bg-black/X` works correctly in both themes.

## The Problem

### Incorrect Pattern
```vue
<!-- ❌ WRONG: Invisible in light mode -->
<view class="active:bg-white/5">
  Click me
</view>
```

**Why it fails:**
- Light mode: White semi-transparent on white/light background = invisible
- Dark mode: White semi-transparent on dark background = visible (but inconsistent)

### Correct Pattern
```vue
<!-- ✅ CORRECT: Visible in both modes -->
<view class="active:bg-black/5">
  Click me
</view>
```

**Why it works:**
- Light mode: Dark semi-transparent on light background = visible feedback
- Dark mode: Dark semi-transparent on dark background = subtle but visible feedback

## Guidelines

### 1. Click Feedback Background

**Always use dark semi-transparent:**
```vue
<!-- Recommended opacity range: 5%-10% -->
<view class="active:bg-black/5">...</view>
<view class="active:bg-black/10">...</view>
```

**Avoid light semi-transparent:**
```vue
<!-- Never use these -->
<view class="active:bg-white/5">...</view>
<view class="active:bg-white/10">...</view>
<view class="active:bg-[#ffffff]/5">...</view>
```

### 2. Text Colors in Cards

**Use `text-white` for primary content in cards:**
```vue
<view class="bg-card">
  <text class="text-white">Title</text>
  <text class="text-gray">Secondary info</text>
  <text class="text-primary">Accent</text>
</view>
```

**Use `text-base` for page-level content:**
```vue
<view class="bg-base">
  <text class="text-base">Page content</text>
</view>
```

### 3. Border Colors

**Use fixed light opacity for dark-themed cards:**
```vue
<view class="border border-white/10 bg-card">
  <!-- Consistent in both light and dark modes -->
</view>
```

**Avoid theme variable borders on cards:**
```vue
<!-- May be inconsistent -->
<view class="border border-border bg-card">
  ...
</view>
```

### 4. Navigation Bar Configuration

**Never set fixed background colors in `definePage`:**
```js
// ❌ WRONG: Causes flash in light mode
definePage({
  style: {
    navigationBarBackgroundColor: '#121212',
    navigationBarTextStyle: 'white'
  }
})
```

**Use theme.json for automatic adaptation:**
```js
// ✅ CORRECT: Auto-adapts to theme
definePage({
  style: {
    navigationBarTitleText: 'Page Title'
    // No fixed colors - uses theme.json
  }
})
```

### 5. Page Backgrounds

**Use gradients with CSS variables for themed pages:**
```vue
<view class="from-base via-[var(--wot-color-bg-hover)] to-[var(--wot-color-bg-card)] bg-gradient-to-br">
  <!-- Auto-adapts to theme -->
</view>
```

**Use solid theme colors for simple pages:**
```vue
<view class="bg-base">
  <!-- Simple, no flash -->
</view>
```

## Quick Reference Table

| Element | Light Mode Compatible | Dark Mode Compatible | Recommendation |
|---------|----------------------|---------------------|----------------|
| `active:bg-black/5` | ✅ Visible | ✅ Visible | ✅ Use this |
| `active:bg-black/10` | ✅ Visible | ✅ Visible | ✅ Use this |
| `active:bg-white/5` | ❌ Invisible | ✅ Visible | ❌ Never use |
| `active:bg-white/10` | ❌ Invisible | ✅ Visible | ❌ Never use |
| `bg-card` + `text-white` | ✅ Compatible | ✅ Compatible | ✅ Use for cards |
| `bg-base` + `text-base` | ✅ Compatible | ✅ Compatible | ✅ Use for pages |
| `border-white/10` | ✅ Compatible | ✅ Compatible | ✅ Use for cards |
| Fixed nav bg color | ❌ Causes flash | ✅ OK | ❌ Never use |

## Examples

### Correct Card Component
```vue
<template>
  <view class="overflow-hidden border border-white/10 rounded-[16rpx] bg-card">
    <view
      class="flex items-center justify-between p-[24rpx] active:bg-black/5"
      @click="handleClick"
    >
      <text class="text-[24rpx] text-white">
        {{ title }}
      </text>
    </view>
  </view>
</template>
```

### Correct Page Navigation
```js
definePage({
  name: 'help',
  style: {
    navigationBarTitleText: '帮助中心'
    // ✅ No fixed colors - theme.json handles it
  }
})
```

### Correct Page Background
```vue
<template>
  <view class="min-h-screen from-base via-[var(--wot-color-bg-hover)] to-[var(--wot-color-bg-card)] bg-gradient-to-br">
    <!-- Theme-aware gradient -->
  </view>
</template>
```

## Testing Checklist

Before committing theme-related changes:

- [ ] Switch to light mode and test click feedback visibility
- [ ] Switch to dark mode and test click feedback visibility
- [ ] Navigate between pages - check for background flash
- [ ] Verify text contrast in both light and dark modes
- [ ] Test on actual device (not just dev server)

## Related Files

- `/workspace/src/theme.json` - Theme configuration for mini-program
- `/workspace/src/manifest.json` - App manifest with theme settings

## Rationale

- **Dark semi-transparent works universally**: Black with low opacity creates subtle shadows that work on both light and dark backgrounds
- **Light semi-transparent fails in light mode**: White on white = invisible
- **Fixed nav colors cause flash**: Page navigation loads nav config before theme, causing momentary wrong color
- **Consistent card styling**: Cards should maintain their internal contrast regardless of page theme
