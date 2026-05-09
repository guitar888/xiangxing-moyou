/**
 * 用户 Store
 * 合规设计：
 * - 使用微信授权登录，不收集手机号、身份证等敏感信息
 * - 数据存储在本地，不上传服务器
 * - 用户可随时清除数据
 */
import { defineStore } from 'pinia'
import type { Medal, MedalType } from '@/types'

interface UserState {
  isLoggedIn: boolean
  openid: string
  nickname: string
  avatar: string
  joinDate: string
  medals: Medal[]
  rideStats: {
    totalRides: number
    totalDistance: number
    totalDuration: number
    longestRide: number
    avgDistance: number
    avgSpeed: number
  }
  rideHistory: Array<{
    id: string
    date: string
    distance: number
    duration: number
    route?: string
    medal?: string
  }>
}

export const useUserStore = defineStore('user', {
  state: (): UserState => ({
    isLoggedIn: false,
    openid: '',
    nickname: '',
    avatar: '',
    joinDate: '',
    medals: [],
    rideStats: {
      totalRides: 0,
      totalDistance: 0,
      totalDuration: 0,
      longestRide: 0,
      avgDistance: 0,
      avgSpeed: 0,
    },
    rideHistory: [],
  }),

  getters: {
    isVip: (state) => state.medals.length >= 5,
    level: (state) => {
      if (state.rideStats.totalDistance >= 10000) return '传说骑士'
      if (state.rideStats.totalDistance >= 5000) return '黄金骑士'
      if (state.rideStats.totalDistance >= 2000) return '白银骑士'
      if (state.rideStats.totalDistance >= 500) return '青铜骑士'
      return '摩友新手'
    },
  },

  actions: {
    // 微信授权登录
    loginWithWechat(userInfo: { openid: string; nickname: string; avatar: string }) {
      this.isLoggedIn = true
      this.openid = userInfo.openid
      this.nickname = userInfo.nickname || `摩友${userInfo.openid.slice(-4)}`
      this.avatar = userInfo.avatar
      this.joinDate = new Date().toISOString()
      this.medals = []
      this.rideStats = {
        totalRides: 0,
        totalDistance: 0,
        totalDuration: 0,
        longestRide: 0,
        avgDistance: 0,
        avgSpeed: 0,
      }
      this.rideHistory = []
      this.saveToStorage()
    },

    // 退出登录
    logout() {
      this.isLoggedIn = false
      this.openid = ''
      this.nickname = ''
      this.avatar = ''
      this.joinDate = ''
      this.medals = []
      this.rideStats = {
        totalRides: 0,
        totalDistance: 0,
        totalDuration: 0,
        longestRide: 0,
        avgDistance: 0,
        avgSpeed: 0,
      }
      this.rideHistory = []
      uni.removeStorageSync('userInfo')
    },

    // 添加骑行记录
    addRideRecord(record: { distance: number; duration: number; route?: string }) {
      const newRecord = {
        id: Date.now().toString(),
        date: new Date().toISOString(),
        distance: record.distance,
        duration: record.duration,
        route: record.route,
        medal: '',
      }

      // 检查是否获得新勋章
      const newMedal = this.checkAndAwardMedal(record)
      if (newMedal) {
        newRecord.medal = newMedal.name
      }

      this.rideHistory.unshift(newRecord)

      // 更新统计数据
      this.rideStats.totalRides += 1
      this.rideStats.totalDistance += record.distance
      this.rideStats.totalDuration += record.duration
      if (record.distance > this.rideStats.longestRide) {
        this.rideStats.longestRide = record.distance
      }
      this.rideStats.avgDistance = this.rideStats.totalDistance / this.rideStats.totalRides
      this.rideStats.avgSpeed = this.rideStats.totalDuration > 0
        ? (this.rideStats.totalDistance / (this.rideStats.totalDuration / 60))
        : 0

      this.saveToStorage()
      return newMedal
    },

    // 检查并授予勋章
    checkAndAwardMedal(record: { distance: number; duration: number }): Medal | null {
      const newMedals: Medal[] = []

      // 里程勋章
      if (this.rideStats.totalDistance >= 100 && !this.hasMedal('distance_100')) {
        newMedals.push({ id: 'distance_100', name: '百里挑一', type: 'distance', icon: '🥇', description: '累计骑行100公里', unlocked: true, unlockDate: new Date().toISOString() })
      }
      if (this.rideStats.totalDistance >= 500 && !this.hasMedal('distance_500')) {
        newMedals.push({ id: 'distance_500', name: '五百里程', type: 'distance', icon: '🏅', description: '累计骑行500公里', unlocked: true, unlockDate: new Date().toISOString() })
      }
      if (this.rideStats.totalDistance >= 1000 && !this.hasMedal('distance_1000')) {
        newMedals.push({ id: 'distance_1000', name: '千里之行', type: 'distance', icon: '🎖️', description: '累计骑行1000公里', unlocked: true, unlockDate: new Date().toISOString() })
      }

      // 次数勋章
      if (this.rideStats.totalRides >= 10 && !this.hasMedal('rides_10')) {
        newMedals.push({ id: 'rides_10', name: '十次达人', type: 'rides', icon: '⭐', description: '累计骑行10次', unlocked: true, unlockDate: new Date().toISOString() })
      }
      if (this.rideStats.totalRides >= 50 && !this.hasMedal('rides_50')) {
        newMedals.push({ id: 'rides_50', name: '五十次骑士', type: 'rides', icon: '🌟', description: '累计骑行50次', unlocked: true, unlockDate: new Date().toISOString() })
      }

      // 单次里程勋章
      if (record.distance >= 50 && !this.hasMedal('single_50')) {
        newMedals.push({ id: 'single_50', name: '单次50+', type: 'single', icon: '🚀', description: '单次骑行超过50公里', unlocked: true, unlockDate: new Date().toISOString() })
      }
      if (record.distance >= 100 && !this.hasMedal('single_100')) {
        newMedals.push({ id: 'single_100', name: '单次破百', type: 'single', icon: '💫', description: '单次骑行超过100公里', unlocked: true, unlockDate: new Date().toISOString() })
      }

      // 首次勋章
      if (this.rideStats.totalRides === 1 && !this.hasMedal('first_ride')) {
        newMedals.push({ id: 'first_ride', name: '初次见面', type: 'special', icon: '🎉', description: '完成首次骑行', unlocked: true, unlockDate: new Date().toISOString() })
      }

      // 早鸟勋章（早上6点前骑行）
      const hour = new Date().getHours()
      if (hour < 6 && !this.hasMedal('early_bird')) {
        newMedals.push({ id: 'early_bird', name: '早鸟骑士', type: 'special', icon: '🐦', description: '在凌晨6点前完成骑行', unlocked: true, unlockDate: new Date().toISOString() })
      }

      // 添加新勋章
      if (newMedals.length > 0) {
        this.medals.push(...newMedals)
        this.saveToStorage()
        return newMedals[0]
      }

      return null
    },

    // 检查是否已有某勋章
    hasMedal(medalId: string): boolean {
      return this.medals.some(m => m.id === medalId)
    },

    // 从本地存储恢复
    loadFromStorage() {
      const stored = uni.getStorageSync('userInfo')
      if (stored) {
        const data = JSON.parse(stored)
        Object.assign(this, data)
      }
    },

    // 保存到本地存储
    saveToStorage() {
      uni.setStorageSync('userInfo', JSON.stringify({
        isLoggedIn: this.isLoggedIn,
        openid: this.openid,
        nickname: this.nickname,
        avatar: this.avatar,
        joinDate: this.joinDate,
        medals: this.medals,
        rideStats: this.rideStats,
        rideHistory: this.rideHistory,
      }))
    },
  },
})
