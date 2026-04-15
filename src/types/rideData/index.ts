export interface QuickEntry {
  id: string
  name: string
  subname: string
  icon: string
  highlight?: boolean
  badge?: string
  path: string
  isTab?: boolean
}

export interface RideData {
  totalDistance: number
  totalDays: number
  totalRoutes: number
}
