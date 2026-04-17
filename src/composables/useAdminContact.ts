/**
 * 管理员联系 composable
 * 职责：获取管理员联系方式，提供联系功能
 */
import type { AdminContact } from '@/types'
import { getAdminContact } from '@/api/services/activityService'

export function useAdminContact() {
  // ================================================
  // 状态
  // ================================================

  const contact = ref<AdminContact | null>(null)
  const loading = ref(false)
  const showContactModal = ref(false)

  // ================================================
  // 加载联系方式
  // ================================================

  async function loadContact() {
    loading.value = true

    try {
      contact.value = await getAdminContact()
    } catch (err) {
      console.error('加载联系方式失败:', err)
    } finally {
      loading.value = false
    }
  }

  // ================================================
  // 联系操作
  // ================================================

  function showContact() {
    showContactModal.value = true
  }

  function hideContact() {
    showContactModal.value = false
  }

  /**
   * 复制微信号
   */
  function copyWechatId() {
    if (!contact.value?.wechatId) return

    uni.setClipboardData({
      data: contact.value.wechatId,
      success: () => {
        uni.showToast({
          title: '微信号已复制',
          icon: 'success',
        })
      },
      fail: () => {
        uni.showToast({
          title: '复制失败',
          icon: 'none',
        })
      },
    })
  }

  // ================================================
  // 生命周期
  // ================================================

  onMounted(() => {
    loadContact()
  })

  return {
    contact,
    loading,
    showContactModal,
    loadContact,
    showContact,
    hideContact,
    copyWechatId,
  }
}
