/**
 * 轮播图数据类型
 */
export interface BannerData {
  /** 轮播图ID */
  id: string
  /** 图片URL */
  image: string
  /** 跳转链接 */
  link?: string
  /** 标题 */
  title?: string
}
