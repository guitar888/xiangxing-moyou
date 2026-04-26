/**
 * 全局合规提示横幅管理 composable
 * 职责：管理全局合规提示横幅的显示/隐藏状态
 * 特性：
 * - 全局单例，任何页面都可以调用
 * - 支持本地存储，记住用户的关闭状态
 * - 自动响应到 ComplianceBanner 组件显示
 */

// ================================================
// 单例状态（模块级别，所有调用共享同一个实例）
// ================================================

/** 合规提示显示状态 */
const visible = ref(true)

/** 本地存储键名 */
const STORAGE_KEY = 'compliance_banner_closed'

/**
 * 初始化合规提示状态
 * 从本地存储读取状态，如果用户之前关闭过，则不显示
 */
function initComplianceBanner() {
  try {
    const closed = uni.getStorageSync(STORAGE_KEY)
    if (closed) {
      visible.value = false
    }
  } catch (err) {
    console.error('读取合规提示状态失败:', err)
  }
}

/**
 * 关闭合规提示
 * 并将状态保存到本地存储
 */
function closeComplianceBanner() {
  visible.value = false
  try {
    uni.setStorageSync(STORAGE_KEY, true)
  } catch (err) {
    console.error('保存合规提示状态失败:', err)
  }
}

/**
 * 显示合规提示
 */
function showComplianceBanner() {
  visible.value = true
  try {
    uni.removeStorageSync(STORAGE_KEY)
  } catch (err) {
    console.error('清除合规提示状态失败:', err)
  }
}

/**
 * 重置合规提示状态
 */
function resetComplianceBanner() {
  visible.value = true
  try {
    uni.removeStorageSync(STORAGE_KEY)
  } catch (err) {
    console.error('重置合规提示状态失败:', err)
  }
}

// 初始化
initComplianceBanner()

export function useComplianceBanner() {
  return {
    visible,
    closeComplianceBanner,
    showComplianceBanner,
    resetComplianceBanner,
  }
}
