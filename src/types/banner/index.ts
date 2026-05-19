/**
 * 轮播图数据类型
 */
export interface BannerData {
  /** 轮播图ID */
  id: string
  /** 封面图片URL */
  image: string
  /** 跳转链接 */
  link?: string
  /** 标题 */
  title: string
  /** 描述文案（可选） */
  desc?: string
  /** 标签（如"热门"、"周末"等） */
  tag?: string
  /** 内部跳转路径 */
  url?: string
}
