import { presetUni } from '@uni-helper/unocss-preset-uni'
import {
  defineConfig,
  presetIcons,
  transformerDirectives,
  transformerVariantGroup,
} from 'unocss'

export default defineConfig({
  presets: [
    presetUni({ attributify: false }),
    presetIcons({
      scale: 1.2,
      warn: true,
      extraProperties: {
        'display': 'inline-block',
        'vertical-align': 'middle',
      },
      collections: {
        fluent: () => import('@iconify-json/fluent/icons.json').then((i) => i.default as any),
      },
    }),
  ],
  transformers: [
    transformerDirectives(),
    transformerVariantGroup(),
  ],
  theme: {
     // 解决小程序不支持 * 选择器
    preflightRoot: ["page,::before,::after"],
    colors: {
      'primary': 'var(--wot-color-theme)',
      'primary-light': 'var(--wot-color-theme-light)',
      'primary-dark': 'var(--wot-color-theme-dark)',
      'base': 'var(--wot-color-bg-base)',
      'card': 'var(--wot-color-bg-card)',
      'hover': 'var(--wot-color-bg-hover)',
      'white': 'var(--wot-color-text-white)',
      'gray': 'var(--wot-color-text-gray)',
      'muted': 'var(--wot-color-text-muted)',
      'border': 'var(--wot-color-border)',
      'border-light': 'var(--wot-color-border-light)',
      'warning': 'var(--wot-color-warning)',
      'danger': 'var(--wot-color-danger)',
      'success': 'var(--wot-color-success)',
    },
    fontFamily: {
      sans: ['system-ui', 'sans-serif'],
      serif: ['Georgia', 'serif'],
      mono: ['Menlo', 'Monaco', 'Courier New', 'monospace'],
    },
    // 整套高端小程序动效合集 - 仅在 H5 平台启用
    animation: process.env.UNI_PLATFORM === 'h5'
      ? {
          keyframes: {
            // 页面入场
            'fade-in-up': `{
              from { opacity:0; transform:translateY(30rpx); }
              to { opacity:1; transform:translateY(0); }
            }`,
            'fade-in-down': `{
              from { opacity:0; transform:translateY(-30rpx); }
              to { opacity:1; transform:translateY(0); }
            }`,
            'scale-in': `{
              from { opacity:0; transform:scale(0.92); }
              to { opacity:1; transform:scale(1); }
            }`,
            'slide-in-left': `{
              from { opacity:0; transform:translateX(-40rpx); }
              to { opacity:1; transform:translateX(0); }
            }`,

            // 高级柔光扫光（你要的非 loading 流光）
            'sheen-sweep': `{
              0% { transform:translateX(-100%); }
              100% { transform:translateX(100vw); }
            }`,

            'sheen-sweep-fast': `{
              0% { transform:translateX(-120%) skewX(-15deg); }
              100% { transform:translateX(120%); }
            }`,

            // 呼吸辉光（头部、按钮专用）
            'glow-pulse': `{
              0%,100% { box-shadow:0 0 20rpx rgba(var(--wot-color-theme-rgb),0.1); }
              50% { box-shadow:0 0 30rpx rgba(var(--wot-color-theme-rgb),0.25); }
            }`,

            // 轻微浮动（高端静谧感）
            'float-slow': `{
              0%,100% { transform:translateY(0); }
              50% { transform:translateY(-6rpx); }
            }`,

            // 🔥 新增：边框渐变流光（你学习的效果 1:1）
            'border-flow': `{
              0%,100% { background-position: 0% 50%; }
              50% { background-position: 100% 50%; }
            }`,
            // Tabbar 图标呼吸辉光
            'tabbar-glow': `{
              0%,100% { filter: drop-shadow(0 0 8rpx rgba(46, 213, 115, 0.5)); }
              50% { filter: drop-shadow(0 0 16rpx rgba(46, 213, 115, 0.7)); }
            }`,
            // Tabbar 顶部渐变分隔线
            'tabbar-divider-sheen': `{
              0% { opacity: 0.2; }
              50% { opacity: 0.5; }
              100% { opacity: 0.2; }
            }`,
          },

          durations: {
            'fade-in-up': '0.6s',
            'fade-in-down': '0.6s',
            'scale-in': '0.5s',
            'slide-in-left': '0.5s',
            'sheen-sweep-fast': '4s',
            'sheen-sweep': '4s',
            'glow-pulse': '4s',
            'float-slow': '5s',
            'border-flow': '6s',
            'tabbar-glow': '2s',
            'tabbar-divider-sheen': '3s',
          },

          timingFns: {
            'fade-in-up': 'ease-out',
            'fade-in-down': 'ease-out',
            'scale-in': 'ease-out',
            'slide-in-left': 'ease-out',
            'sheen-sweep-fast': 'ease-in-out',
            'sheen-sweep': 'ease-in-out',
            'glow-pulse': 'ease-in-out',
            'float-slow': 'ease-in-out',
            'border-flow': 'ease',
            'tabbar-glow': 'ease-in-out',
            'tabbar-divider-sheen': 'ease-in-out',
          },

          counts: {
            'sheen-sweep-fast': 'infinite',
            'sheen-sweep': 'infinite',
            'glow-pulse': 'infinite',
            'float-slow': 'infinite',
            'border-flow': 'infinite',
            'tabbar-glow': 'infinite',
            'tabbar-divider-sheen': 'infinite',
          },
        }
      : undefined,
  },
  shortcuts: {
    'bg-primary': 'bg-primary',
    'bg-base': 'bg-base',
    'bg-card': 'bg-card',
    'bg-hover': 'bg-hover',
    'text-primary': 'text-primary',
    'text-white': 'text-white',
    'text-gray': 'text-gray',
    'text-muted': 'text-muted',
    'border-primary': 'border-primary',
    'border-color': 'border-border',
    'shadow-card': 'shadow-[0_4rpx_16rpx_rgba(0,0,0,0.2)]',
    'shadow-glow': 'shadow-[0_0_20rpx_rgba(46,213,115,0.3)]',
    'shadow-inset': 'shadow-[inset_0_1rpx_0_rgba(255,255,255,0.05)]',
    'rounded-sm': 'rounded-[8rpx]',
    'rounded-md': 'rounded-[12rpx]',
    'rounded-lg': 'rounded-[16rpx]',
    // Tabbar 快捷类名
    'tabbar-item-inactive': 'text-[#A0AEC0]',
    'tabbar-item-active': 'text-[#2ED573]',
    'tabbar-bg': 'bg-[#1E1E1E]',
    'tabbar-divider': 'h-1 bg-gradient-to-r from-transparent via-[rgba(46,213,115,0.3)] to-transparent',
  },
  safelist: [
    'i-carbon:map', 'i-carbon:cloud', 'i-carbon:users', 'i-carbon:distance', 'i-carbon:speedometer',
    'i-carbon:calendar', 'i-carbon:location', 'i-carbon:share', 'i-carbon:trash-can', 'i-carbon:time',
    'i-carbon:delta', 'i-carbon:star', 'i-carbon:star-filled', 'i-carbon:store', 'i-carbon:bicycle',
    'i-carbon:palm-tree', 'i-carbon:restaurant', 'i-carbon:cafe', 'i-carbon:camera', 'i-carbon:drone',
    'i-carbon:military-camp', 'i-fluent:vehicle-motorcycle-28-filled', 'i-carbon:direction-straight-right', 'i-carbon:warning',
    'i-carbon:information', 'i-carbon:fire', 'i-carbon:tag', 'i-carbon:list', 'i-carbon:close',
    'i-carbon:checkmark', 'i-carbon:search',
  ],

})
