<script setup lang="ts">
definePage({
  name: 'weather',
  style: {
    navigationBarTitleText: '天气查询',
    navigationBarBackgroundColor: '#121212',
    navigationBarTextStyle: 'white',
  },
})
</script>

<template>
  <GlobalStatusEmptyPage 
    title="天气查询" 
    subtitle="天气查询功能正在开发中，敬请期待！" 
    icon="🌤️"
  />
</template>
