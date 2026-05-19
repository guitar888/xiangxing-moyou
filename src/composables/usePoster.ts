import type { RideRecord } from '@/types'

interface PosterOptions {
  record: RideRecord
  routeName?: string
  avgSpeed?: number
  routePath?: Coordinate[]
  startLocationName?: string
  endLocationName?: string
}

export function usePoster() {
  const generating = ref(false)
  const posterPath = ref('')

  const POSTER_WIDTH = 560
  const POSTER_HEIGHT = 830

  const COLORS = {
    background: '#0D0D0D',
    primary: '#2ED573',
    secondary: '#1E1E1E',
    text: '#FFFFFF',
    textGray: '#8D99AE',
    warning: '#FF7A00',
    accent: '#FF6B35',
    cardBg: 'rgba(46, 213, 115, 0.08)',
    cardBorder: 'rgba(46, 213, 115, 0.25)',
  }

  function formatDuration(minutes: number): string {
    const hours = minutes / 60
    return hours.toFixed(1)
  }

  function formatDate(timestamp: number): string {
    const date = new Date(timestamp)
    return `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日`
  }

  function drawRoundedRect(
    ctx: UniApp.CanvasContext,
    x: number,
    y: number,
    w: number,
    h: number,
    r: number
  ) {
    ctx.beginPath()
    ctx.moveTo(x + r, y)
    ctx.arcTo(x + w, y, x + w, y + h, r)
    ctx.arcTo(x + w, y + h, x, y + h, r)
    ctx.arcTo(x, y + h, x, y, r)
    ctx.arcTo(x, y, x + w, y, r)
    ctx.closePath()
  }

  /**
   * 绘制轨迹缩略图
   */
  function drawRoutePath(
    ctx: UniApp.CanvasContext,
    path: Coordinate[],
    x: number,
    y: number,
    width: number,
    height: number
  ) {
    if (!path || path.length < 2) return

    // 计算边界
    let minLat = path[0].latitude
    let maxLat = path[0].latitude
    let minLng = path[0].longitude
    let maxLng = path[0].longitude

    path.forEach(point => {
      minLat = Math.min(minLat, point.latitude)
      maxLat = Math.max(maxLat, point.latitude)
      minLng = Math.min(minLng, point.longitude)
      maxLng = Math.max(maxLng, point.longitude)
    })

    // 添加边距
    const padding = 0.1
    const latRange = (maxLat - minLat) || 0.001
    const lngRange = (maxLng - minLng) || 0.001

    // 坐标转换函数
    const toX = (lng: number) => x + ((lng - minLng) / (lngRange * (1 + padding))) * width
    const toY = (lat: number) => y + height - ((lat - minLat) / (latRange * (1 + padding))) * height

    // 绘制背景
    ctx.fillStyle = 'rgba(46, 213, 115, 0.05)'
    drawRoundedRect(ctx, x, y, width, height, 8)
    ctx.fill()

    // 绘制轨迹线
    ctx.strokeStyle = COLORS.primary
    ctx.lineWidth = 2.5
    ctx.lineCap = 'round'
    ctx.lineJoin = 'round'
    ctx.beginPath()

    path.forEach((point, index) => {
      const px = toX(point.longitude)
      const py = toY(point.latitude)
      if (index === 0) {
        ctx.moveTo(px, py)
      } else {
        ctx.lineTo(px, py)
      }
    })
    ctx.stroke()

    // 绘制起点（绿色）
    const startX = toX(path[0].longitude)
    const startY = toY(path[0].latitude)
    ctx.fillStyle = '#2ED573'
    ctx.beginPath()
    ctx.arc(startX, startY, 4, 0, Math.PI * 2)
    ctx.fill()

    // 绘制终点（红色）
    const endPath = path[path.length - 1]
    const endX = toX(endPath.longitude)
    const endY = toY(endPath.latitude)
    ctx.fillStyle = '#FF6B35'
    ctx.beginPath()
    ctx.arc(endX, endY, 4, 0, Math.PI * 2)
    ctx.fill()
  }

  async function generatePoster(options: PosterOptions): Promise<string> {
    generating.value = true
    posterPath.value = ''

    try {
      const ctx = uni.createCanvasContext('posterCanvas')

      // 深色渐变背景
      ctx.fillStyle = COLORS.background
      ctx.fillRect(0, 0, POSTER_WIDTH, POSTER_HEIGHT)

      // 网格暗纹 - 城市夜景氛围
      ctx.strokeStyle = 'rgba(46, 213, 115, 0.03)'
      ctx.lineWidth = 1
      for (let i = 0; i < POSTER_WIDTH; i += 30) {
        ctx.beginPath()
        ctx.moveTo(i, 0)
        ctx.lineTo(i, POSTER_HEIGHT)
        ctx.stroke()
      }
      for (let i = 0; i < POSTER_HEIGHT; i += 30) {
        ctx.beginPath()
        ctx.moveTo(0, i)
        ctx.lineTo(POSTER_WIDTH, i)
        ctx.stroke()
      }

      // 对角速度线 - 动感
      ctx.strokeStyle = 'rgba(46, 213, 115, 0.08)'
      for (let i = 0; i < 6; i++) {
        const y = 180 + i * 50
        ctx.beginPath()
        ctx.moveTo(0, y)
        ctx.lineTo(POSTER_WIDTH, y - 80)
        ctx.stroke()
      }

      // 顶部光效条
      const headerGrad = ctx.createLinearGradient(0, 0, POSTER_WIDTH, 0)
      headerGrad.addColorStop(0, 'rgba(46, 213, 115, 0)')
      headerGrad.addColorStop(0.3, 'rgba(46, 213, 115, 0.9)')
      headerGrad.addColorStop(0.7, 'rgba(46, 213, 115, 0.9)')
      headerGrad.addColorStop(1, 'rgba(46, 213, 115, 0)')
      ctx.fillStyle = headerGrad
      ctx.fillRect(0, 25, POSTER_WIDTH, 3)

      // Logo 区域
      ctx.fillStyle = COLORS.primary
      ctx.font = 'bold 32px sans-serif'
      ctx.fillText('🏍️', 30, 72)
      ctx.fillStyle = COLORS.text
      ctx.font = 'bold 24px sans-serif'
      ctx.fillText('襄行摩友', 75, 72)

      // 右上角日期
      ctx.fillStyle = COLORS.primary
      ctx.font = '14px sans-serif'
      ctx.textAlign = 'right'
      ctx.fillText(formatDate(options.record.startTime), POSTER_WIDTH - 30, 55)
      ctx.fillStyle = COLORS.textGray
      ctx.font = '12px sans-serif'
      ctx.fillText('湖北 · 襄阳', POSTER_WIDTH - 30, 73)
      ctx.textAlign = 'left'

      // 主标题 - RIDE 完成挑战
      ctx.fillStyle = COLORS.text
      ctx.font = 'bold 32px sans-serif'
      ctx.textAlign = 'center'
      ctx.fillText('RIDE', POSTER_WIDTH / 2, 140)
      ctx.fillStyle = COLORS.primary
      ctx.font = 'bold 42px sans-serif'
      ctx.fillText('完成挑战', POSTER_WIDTH / 2, 190)
      ctx.textAlign = 'left'

      // 路线名
      const routeName = options.record.routeName || '自由骑行'
      ctx.fillStyle = COLORS.text
      ctx.font = '18px sans-serif'
      ctx.textAlign = 'center'
      ctx.fillText(routeName, POSTER_WIDTH / 2, 225)
      ctx.textAlign = 'left'

      // 分割线
      ctx.strokeStyle = 'rgba(46, 213, 115, 0.4)'
      ctx.lineWidth = 1
      ctx.beginPath()
      ctx.moveTo(30, 245)
      ctx.lineTo(POSTER_WIDTH - 30, 245)
      ctx.stroke()

      // 圆形仪表盘 - 基于骑行距离的进度
      const centerX = POSTER_WIDTH / 2
      const centerY = 370
      const radius = 95

      // 以 200km 为参考标准（单日骑行合理距离）
      const referenceDistance = 200
      const distance = options.record.distance || 0
      const progress = Math.min(distance / referenceDistance, 1)

      // 外发光
      ctx.shadowColor = COLORS.primary
      ctx.shadowBlur = 25
      ctx.strokeStyle = 'rgba(46, 213, 115, 0.25)'
      ctx.lineWidth = 18
      ctx.beginPath()
      ctx.arc(centerX, centerY, radius, 0, Math.PI * 2)
      ctx.stroke()
      ctx.shadowBlur = 0

      // 背景弧
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.08)'
      ctx.lineWidth = 10
      ctx.beginPath()
      ctx.arc(centerX, centerY, radius, Math.PI * 0.75, Math.PI * 2.25)
      ctx.stroke()

      // 进度弧 - 根据实际距离计算
      if (progress > 0) {
        ctx.shadowColor = COLORS.primary
        ctx.shadowBlur = 15
        ctx.strokeStyle = COLORS.primary
        ctx.lineWidth = 10
        ctx.lineCap = 'round'
        ctx.beginPath()
        ctx.arc(centerX, centerY, radius, Math.PI * 0.75, Math.PI * 0.75 + Math.PI * 1.5 * progress)
        ctx.stroke()
        ctx.shadowBlur = 0
      }

      // 中心数值 - 显示骑行距离
      ctx.fillStyle = COLORS.text
      ctx.font = 'bold 48px sans-serif'
      ctx.textAlign = 'center'
      ctx.fillText(String(distance), centerX, centerY + 5)
      ctx.fillStyle = COLORS.primary
      ctx.font = '18px sans-serif'
      ctx.fillText('公里', centerX, centerY + 32)
      ctx.textAlign = 'left'

      // 标签
      ctx.fillStyle = 'rgba(255, 255, 255, 0.4)'
      ctx.font = '12px sans-serif'
      ctx.textAlign = 'center'
      ctx.fillText('0', centerX - radius - 20, centerY + 5)
      ctx.fillText('200km', centerX + radius + 20, centerY + 5)
      ctx.textAlign = 'left'

      // 数据卡片
      const cardY = 510
      const cardW = 160
      const cardH = 125
      const gap = 15
      const startX = (POSTER_WIDTH - (cardW * 3 + gap * 2)) / 2

      const cards = [
        { value: `${options.record.distance || 0}`, unit: '公里', label: '骑行距离' },
        { value: formatDuration(options.record.duration || 0), unit: '小时', label: '骑行时长' },
        { value: `${options.record.avgSpeed || '0'}`, unit: 'km/h', label: '平均速度' },
      ]

      cards.forEach((card, i) => {
        const cardX = startX + i * (cardW + gap)

        // 卡片背景
        ctx.fillStyle = COLORS.cardBg
        drawRoundedRect(ctx, cardX, cardY, cardW, cardH, 12)
        ctx.fill()

        // 卡片边框
        ctx.strokeStyle = COLORS.cardBorder
        ctx.lineWidth = 1
        drawRoundedRect(ctx, cardX, cardY, cardW, cardH, 12)
        ctx.stroke()

        // 标签
        ctx.fillStyle = 'rgba(255, 255, 255, 0.5)'
        ctx.font = 'bold 18px sans-serif'
        ctx.textAlign = 'center'
        ctx.fillText(card.label, cardX + cardW / 2, cardY + 30)

        // 数值
        ctx.fillStyle = COLORS.text
        ctx.font = 'bold 36px sans-serif'
        ctx.fillText(card.value, cardX + cardW / 2, cardY + 78)

        // 单位
        if (card.unit) {
          ctx.fillStyle = COLORS.primary
          ctx.font = '14px sans-serif'
          ctx.fillText(card.unit, cardX + cardW / 2, cardY + 100)
        }
      })
      ctx.textAlign = 'left'

      // 虚线分割
      const lineY = 655
      ctx.strokeStyle = 'rgba(46, 213, 115, 0.25)'
      ctx.lineWidth = 1
      ctx.setLineDash([6, 6])
      ctx.beginPath()
      ctx.moveTo(30, lineY)
      ctx.lineTo(POSTER_WIDTH - 30, lineY)
      ctx.stroke()
      ctx.setLineDash([])

      // 骑行路线信息 - 起点 → 终点
      const routeInfoY = lineY + 30
      const startName = options.startLocationName || '起点'
      const endName = options.endLocationName || '终点'
      const routeText = `${startName}  →  ${endName}`

      ctx.fillStyle = 'rgba(46, 213, 115, 0.12)'
      const textWidth = ctx.measureText(routeText).width || 160
      const boxWidth = Math.max(textWidth + 40, 180)
      drawRoundedRect(ctx, (POSTER_WIDTH - boxWidth) / 2, routeInfoY - 15, boxWidth, 32, 16)
      ctx.fill()

      ctx.fillStyle = COLORS.text
      ctx.font = '15px sans-serif'
      ctx.textAlign = 'center'
      ctx.fillText(routeText, POSTER_WIDTH / 2, routeInfoY + 5)
      ctx.textAlign = 'left'

      // 轨迹缩略图 - 如果有轨迹数据
      const hasPath = options.routePath && options.routePath.length > 1

      if (hasPath) {
        const pathBoxY = routeInfoY + 40
        const pathBoxW = 210
        const pathBoxH = 65
        const pathBoxX = (POSTER_WIDTH - pathBoxW) / 2

        // 背景卡片
        ctx.fillStyle = COLORS.cardBg
        drawRoundedRect(ctx, pathBoxX, pathBoxY, pathBoxW, pathBoxH, 12)
        ctx.fill()

        // 边框
        ctx.strokeStyle = COLORS.cardBorder
        ctx.lineWidth = 1
        drawRoundedRect(ctx, pathBoxX, pathBoxY, pathBoxW, pathBoxH, 12)
        ctx.stroke()

        // 绘制轨迹
        drawRoutePath(ctx, options.routePath!, pathBoxX + 10, pathBoxY + 8, pathBoxW - 20, 48)
      }

      // 底部免责声明 - 固定在最底部
      const disclaimerY = POSTER_HEIGHT - 45
      ctx.fillStyle = 'rgba(255, 255, 255, 0.25)'
      ctx.font = '11px sans-serif'
      ctx.textAlign = 'center'
      ctx.fillText('骑行有风险，遵守交通法规', POSTER_WIDTH / 2, disclaimerY)
      ctx.fillStyle = 'rgba(255, 255, 255, 0.15)'
      ctx.font = '10px sans-serif'
      ctx.fillText('本海报仅个人分享，非商业用途', POSTER_WIDTH / 2, disclaimerY + 16)
      ctx.textAlign = 'left'

      // 四角装饰
      ctx.strokeStyle = 'rgba(46, 213, 115, 0.35)'
      ctx.lineWidth = 2

      ctx.beginPath()
      ctx.moveTo(18, 48)
      ctx.lineTo(18, 18)
      ctx.lineTo(48, 18)
      ctx.stroke()

      ctx.beginPath()
      ctx.moveTo(POSTER_WIDTH - 18, 48)
      ctx.lineTo(POSTER_WIDTH - 18, 18)
      ctx.lineTo(POSTER_WIDTH - 48, 18)
      ctx.stroke()

      ctx.beginPath()
      ctx.moveTo(18, POSTER_HEIGHT - 48)
      ctx.lineTo(18, POSTER_HEIGHT - 18)
      ctx.lineTo(48, POSTER_HEIGHT - 18)
      ctx.stroke()

      ctx.beginPath()
      ctx.moveTo(POSTER_WIDTH - 18, POSTER_HEIGHT - 48)
      ctx.lineTo(POSTER_WIDTH - 18, POSTER_HEIGHT - 18)
      ctx.lineTo(POSTER_WIDTH - 48, POSTER_HEIGHT - 18)
      ctx.stroke()

      // 导出
      return new Promise((resolve, reject) => {
        ctx.draw(false, () => {
          setTimeout(() => {
            uni.canvasToTempFilePath({
              canvasId: 'posterCanvas',
              width: POSTER_WIDTH,
              height: POSTER_HEIGHT,
              destWidth: POSTER_WIDTH,
              destHeight: POSTER_HEIGHT,
              success: (res) => {
                posterPath.value = res.tempFilePath
                generating.value = false
                resolve(res.tempFilePath)
              },
              fail: (err) => {
                generating.value = false
                reject(err)
              },
            })
          }, 150)
        })
      })
    } catch (err) {
      generating.value = false
      console.error('海报生成失败', err)
      throw err
    }
  }

  async function savePoster(path: string): Promise<void> {
    // #ifdef H5
    const a = document.createElement('a')
    a.href = path
    a.download = `襄行摩友_骑行海报_${Date.now()}.png`
    a.click()
    uni.showToast({ title: '下载成功', icon: 'success' })
    return
    // #endif

    // #ifndef H5
    return new Promise((resolve, reject) => {
      uni.saveImageToPhotosAlbum({
        filePath: path,
        success: () => {
          uni.showToast({ title: '保存成功', icon: 'success' })
          resolve()
        },
        fail: (err) => {
          uni.showToast({ title: '保存失败，请开启权限', icon: 'none' })
          reject(err)
        },
      })
    })
    // #endif
  }

  async function sharePoster(path: string): Promise<void> {
    try {
      // #ifdef H5
      return void uni.showToast({ title: '请长按图片分享', icon: 'none' })
      // #endif

      await uni.share({
        provider: 'weixin',
        type: 2,
        imageUrl: path,
      })
    } catch (err) {
      uni.showToast({ title: '分享失败', icon: 'none' })
    }
  }

  return {
    generating,
    posterPath,
    generatePoster,
    savePoster,
    sharePoster,
  }
}
