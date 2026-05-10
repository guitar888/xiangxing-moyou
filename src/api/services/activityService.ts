/**
 * 活动服务 API
 * 预留 Bmob 接口
 */
import type { AdminContact } from '@/types'
import { mockAdminContact } from '@/api/mock/activityMock'

/**
 * 获取管理员联系方式
 */
export async function getAdminContact(): Promise<AdminContact> {
  // TODO: 对接 Bmob（从后台配置读取）
  // return alovaInstance.Get<AdminContact>('/api/config/admin-contact')

  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockAdminContact as AdminContact)
    }, 100)
  })
}
