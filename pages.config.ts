/*
 * @Author: weisheng
 * @Date: 2025-06-23 22:23:05
 * @LastEditTime: 2025-06-27 13:04:54
 * @LastEditors: weisheng
 * @Description:
 * @FilePath: /wot-starter/pages.config.ts
 * 记得注释
 */
import { defineUniPages } from '@uni-helper/vite-plugin-uni-pages'

export default defineUniPages({
  globalStyle: {
    // 导航栏配置
    navigationBarBackgroundColor: '#121212',
    navigationBarTextStyle: 'white',
    navigationBarTitleText: '襄行摩友',

    // 页面背景配置
    backgroundColor: '#121212',
    backgroundTextStyle: 'light',
    backgroundColorTop: '#121212',
    backgroundColorBottom: '#121212',

    // 下拉刷新配置
    enablePullDownRefresh: false,
    onReachBottomDistance: 50,

    // 动画配置
    // animationType: 'pop-in',
    // animationDuration: 300,
  },
  tabBar: {
    custom: true,
    height: '0',
    list: [
      {
        pagePath: 'pages/index/index',
      },
      {
        pagePath: 'pages/map/map',
      },
      {
        pagePath: 'pages/data/data',
      },
      {
        pagePath: 'pages/mine/mine',
      },
    ],
  },
})
