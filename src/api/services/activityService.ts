/**
 * 活动服务 API
 * 预留 Bmob 接口
 */
import type { Activity, ActivityFilter, AdminContact } from '@/types'
import { mockActivities, mockAdminContact } from '@/api/mock/activityMock'

/**
 * 获取活动列表
 * @param filter 筛选条件
 */
export async function getActivities(filter?: ActivityFilter): Promise<Activity[]> {
  // TODO: 对接 Bmob
  // return alovaInstance.Get<Activity[]>('/api/activities', { params: { filter } })

  return new Promise((resolve) => {
    setTimeout(() => {
      let activities = [...mockActivities]

      if (filter && filter !== 'all') {
        activities = activities.filter(a => a.tags.includes(filter as any))
      }

      // 按状态和日期排序
      activities.sort((a, b) => {
        if (a.status === 'upcoming' && b.status !== 'upcoming') return -1
        if (a.status !== 'upcoming' && b.status === 'upcoming') return 1
        return new Date(a.date).getTime() - new Date(b.date).getTime()
      })

      resolve(activities)
    }, 300)
  })
}

/**
 * 获取活动详情
 * @param id 活动ID
 */
export async function getActivityById(id: string): Promise<Activity | null> {
  // TODO: 对接 Bmob
  // return alovaInstance.Get<Activity>(`/api/activities/${id}`)

  return new Promise((resolve) => {
    setTimeout(() => {
      const activity = mockActivities.find(a => a.id === id) || null
      resolve(activity)
    }, 200)
  })
}

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
