<script setup lang="ts">
/**
 * WebView 页面
 * 用于打开外部链接，如地图导航等
 */

const route = useRoute()
const url = ref('')

onMounted(() => {
  const params = route.query
  if (params.url) {
    url.value = decodeURIComponent(params.url as string)
  }
})
</script>

<template>
  <view class="min-h-screen bg-base">
    <web-view :src="url"></web-view>
  </view>
</template>