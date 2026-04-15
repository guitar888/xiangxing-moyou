export interface ActivityItem {
  id: string
  title: string
  date: string
  time: string
  info: string
  tags: string[]
  image: string
  isUpcoming: boolean
  countdownText?: string
}
