import { presetUni } from '@uni-helper/unocss-preset-uni'

import {
  defineConfig,
  presetIcons,
  transformerDirectives,
  transformerVariantGroup,
} from 'unocss'

export default defineConfig({
  presets: [
    presetUni({
      attributify: false,
    }),
    presetIcons({
      scale: 1.2,
      warn: true,
      extraProperties: {
        'display': 'inline-block',
        'vertical-align': 'middle',
      },
    }),
  ],
  transformers: [
    transformerDirectives(),
    transformerVariantGroup(),
  ],
  theme: {
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
  },
})
