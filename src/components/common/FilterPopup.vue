<script setup lang="ts">
/**
 * 筛选弹窗组件
 * 统一封装类型筛选和区域筛选弹窗
 */
import type { SpotType } from '@/types'
import { SPOT_TYPE_CONFIG, REGION_CONFIG } from '@/types'

export interface FilterOption {
  key: string
  label: string
  icon?: string
}

export interface FilterPopupEmits {
  (e: 'confirm'): void
  (e: 'clear'): void
  (e: 'change', values: string[]): void
  (e: 'update:modelValue', value: boolean): void
  (e: 'confirm-values', values: string[]): void
}

export interface FilterPopupProps {
  modelValue: boolean
  type: 'type' | 'region'
  activeValues: string[]
  single?: boolean
}

const props = withDefaults(defineProps<FilterPopupProps>(), {
  single: false,
})

const emit = defineEmits<FilterPopupEmits>()

const popupRef = ref()

const showPopup = computed({
  get: () => props.modelValue,
  set: (val) => emit('update:modelValue', val),
})

const currentValues = ref<string[]>([...props.activeValues])

watch(() => props.activeValues, (val) => {
  currentValues.value = [...val]
}, { immediate: true })

watch(() => props.modelValue, (val) => {
  if (val) {
    currentValues.value = [...props.activeValues]
  }
})

const SPOT_TYPE_ICONS: Record<SpotType, string> = {
  scenic: 'i-carbon:palm-tree',
  food: 'i-carbon:restaurant',
  coffee: 'i-carbon:cafe',
  photo: 'i-carbon:camera',
  drone: 'i-carbon:drone',
  camp: 'i-carbon:military-camp',
}

const REGION_ICONS: Record<string, string> = {
  all: 'i-carbon:location',
  xiangcheng: 'i-carbon:location',
  fancheng: 'i-carbon:location',
  guangcheng: 'i-carbon:location',
  yicheng: 'i-carbon:location',
  nanzhang: 'i-carbon:location',
  baokang: 'i-carbon:location',
  gucheng: 'i-carbon:location',
  laohekou: 'i-carbon:location',
  zaoyang: 'i-carbon:location',
}

const title = computed(() => props.type === 'type' ? '选择类型' : '选择区域')

const options = computed<FilterOption[]>(() => {
  if (props.type === 'type') {
    return Object.entries(SPOT_TYPE_CONFIG).map(([key, config]) => ({
      key,
      label: config.label,
      icon: SPOT_TYPE_ICONS[key as SpotType],
    }))
  }
  return Object.entries(REGION_CONFIG).map(([key, config]) => ({
    key,
    label: config.label,
    icon: REGION_ICONS[key] || 'i-carbon:location',
  }))
})

const hasFilter = computed(() => currentValues.value.length > 0)

function isActive(key: string) {
  if (props.single) {
    return currentValues.value.length > 0 && currentValues.value[0] === key
  }
  return currentValues.value.includes(key)
}

function toggleOption(key: string) {
  if (props.single) {
    currentValues.value = [key]
    emit('update:modelValue', false)
    emit('confirm-values', [key])
    emit('confirm')
  } else {
    const index = currentValues.value.indexOf(key)
    if (index > -1) {
      currentValues.value.splice(index, 1)
    } else {
      currentValues.value.push(key)
    }
    emit('change', [...currentValues.value])
  }
}

function handleClear() {
  currentValues.value = []
  emit('clear')
}

function handleConfirm() {
  emit('update:modelValue', false)
  emit('confirm-values', [...currentValues.value])
  emit('confirm')
}

function handleClose() {
  emit('update:modelValue', false)
}
</script>

<template>
  <wd-root-portal>
    <wd-popup
      v-model="showPopup"
      position="bottom"
      custom-class="rounded-t-[32rpx] overflow-hidden"
      :close-on-click-modal="true"
      :z-index="9999"
      :safe-area-inset-bottom="true"
      lazy-render
    >
      <view class="bg-[var(--wot-color-bg-card)] px-[32rpx] py-[24rpx]">
      <view class="flex items-center justify-between mb-[24rpx]">
        <text class="text-[32rpx] font-700 text-white">{{ title }}</text>
        <view class="flex items-center gap-[16rpx]">
          <text
            v-if="hasFilter"
            class="text-[24rpx] text-gray"
            @click="handleClear"
          >
            一键清空
          </text>
          <text class="i-carbon:close text-[32rpx] text-gray" @click="handleClose" />
        </view>
      </view>

      <view class="flex flex-wrap gap-[22rpx]">
        <wd-button
          v-for="option in options"
          :key="option.key"
          :type="isActive(option.key) ? (type === 'region' ? 'warning' : 'primary') : 'info'"
          size="small"
          custom-class="rounded-[24rpx] font-500 px-[24rpx] py-[16rpx]"
          @click="toggleOption(option.key)"
        >
          <view class="flex items-center gap-[8rpx]">
            <text v-if="option.icon" :class="option.icon" class="text-[24rpx]" />
            <text class="text-[24rpx]">{{ option.label }}</text>
          </view>
        </wd-button>
      </view>
    </view>
  </wd-popup>
  </wd-root-portal>
</template>
