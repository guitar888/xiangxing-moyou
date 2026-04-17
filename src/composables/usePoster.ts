/**
 * 海报生成 composable
 * 职责：生成精美的骑行分享海报
 */
import type { RideRecord } from '@/types'

interface PosterOptions {
  record: RideRecord
  routeName?: string
  avgSpeed?: number
}

export function usePoster() {
  const generating = ref(false)
  const posterPath = ref('')

  const POSTER_WIDTH = 560
  const POSTER_HEIGHT = 830

  const COLORS = {
    background: '#121212',
    primary: '#2ED573',
    secondary: '#1E1E1E',
    text: '#FFFFFF',
    textGray: '#8D99AE',
    warning: '#FF7A00',
  }

  function formatDuration(minutes: number): string {
    if (minutes < 60) return `${minutes}分钟`
    const h = Math.floor(minutes / 60)
    const m = minutes % 60
    return m > 0 ? `${h}小时${m}分钟` : `${h}小时`
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

  async function generatePoster(options: PosterOptions): Promise<string> {
    generating.value = true
    posterPath.value = ''

    try {
      const ctx = uni.createCanvasContext('posterCanvas')

      ctx.fillStyle = COLORS.background
      ctx.fillRect(0, 0, POSTER_WIDTH, POSTER_HEIGHT)

      ctx.fillStyle = COLORS.primary
      ctx.font = '48px sans-serif'
      ctx.fillText('🏍️', 30, 70)

      ctx.font = '32px sans-serif'
      ctx.fillStyle = COLORS.text
      ctx.fillText('襄行摩友', 90, 70)

      ctx.strokeStyle = COLORS.secondary
      ctx.lineWidth = 2
      ctx.beginPath()
      ctx.moveTo(30, 100)
      ctx.lineTo(POSTER_WIDTH - 30, 100)
      ctx.stroke()

      const routeName = options.record.routeName || '自由骑行'
      ctx.font = 'bold 40px sans-serif'
      ctx.fillStyle = COLORS.text
      ctx.setTextAlign('center')
      ctx.fillText(routeName, POSTER_WIDTH / 2, 170)

      ctx.font = '28px sans-serif'
      ctx.fillStyle = COLORS.primary
      ctx.fillText('🚴 骑行挑战完成', POSTER_WIDTH / 2, 215)

      ctx.fillStyle = COLORS.secondary
      drawRoundedRect(ctx, 30, 250, POSTER_WIDTH - 60, 240, 16)
      ctx.fill()

      ctx.strokeStyle = COLORS.primary
      ctx.lineWidth = 6
      ctx.lineCap = 'round'
      ctx.lineJoin = 'round'
      ctx.beginPath()
      ctx.moveTo(80, 370)
      ctx.quadraticCurveTo(180, 300, 280, 340)
      ctx.quadraticCurveTo(380, 380, 480, 320)
      ctx.stroke()

      ctx.fillStyle = COLORS.primary
      ctx.beginPath()
      ctx.arc(80, 370, 14, 0, 2 * Math.PI)
      ctx.fill()
      ctx.font = '20px sans-serif'
      ctx.fillStyle = COLORS.text
      ctx.setTextAlign('left')
      ctx.fillText('起点', 55, 410)

      ctx.fillStyle = COLORS.warning
      ctx.beginPath()
      ctx.arc(480, 320, 14, 0, 2 * Math.PI)
      ctx.fill()
      ctx.fillStyle = COLORS.text
      ctx.fillText('终点', 455, 360)

      const cardY = 530
      const cardWidth = 155
      const cardGap = 20
      const startX = (POSTER_WIDTH - (cardWidth * 3 + cardGap * 2)) / 2

      const cards = [
        { value: `${options.record.distance || 0}`, unit: '公里', icon: '📍' },
        { value: formatDuration(options.record.duration || 0), unit: '时长', icon: '⏱️' },
        { value: `${options.record.avgSpeed || '0.0'}`, unit: '均速(km/h)', icon: '🚀' },
      ]

      cards.forEach((card, i) => {
        const cardX = startX + i * (cardWidth + cardGap)

        ctx.fillStyle = COLORS.secondary
        drawRoundedRect(ctx, cardX, cardY, cardWidth, 140, 12)
        ctx.fill()

        ctx.font = '36px sans-serif'
        ctx.textAlign = 'center'
        ctx.fillText(card.icon, cardX + cardWidth / 2, cardY + 45)

        ctx.font = 'bold 36px sans-serif'
        ctx.fillStyle = COLORS.primary
        ctx.fillText(card.value, cardX + cardWidth / 2, cardY + 90)

        ctx.font = '20px sans-serif'
        ctx.fillStyle = COLORS.textGray
        ctx.fillText(card.unit, cardX + cardWidth / 2, cardY + 115)
      })

      ctx.textAlign = 'center'
      ctx.font = '22px sans-serif'
      ctx.fillStyle = COLORS.textGray
      ctx.fillText(`${formatDate(options.record.startTime)} · 襄阳`, POSTER_WIDTH / 2, 730)

      ctx.setLineDash([8, 8])
      ctx.strokeStyle = COLORS.primary
      ctx.lineWidth = 2
      ctx.beginPath()
      ctx.moveTo(30, 760)
      ctx.lineTo(POSTER_WIDTH - 30, 760)
      ctx.stroke()
      ctx.setLineDash([])

      ctx.font = '20px sans-serif'
      ctx.fillStyle = COLORS.textGray
      ctx.fillText('骑行有风险，遵守交通法规', POSTER_WIDTH / 2, 790)
      ctx.font = '18px sans-serif'
      ctx.fillStyle = COLORS.textGray
      ctx.fillText('本海报仅个人分享，非商业用途', POSTER_WIDTH / 2, 815)

      return new Promise((resolve, reject) => {
        ctx.draw(true, () => {
          uni.canvasToTempFilePath({
            canvasId: 'posterCanvas',
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
        })
      })
    } catch (err) {
      generating.value = false
      console.error('生成海报失败:', err)
      throw err
    }
  }

  async function savePoster(path: string): Promise<void> {
    return new Promise((resolve, reject) => {
      uni.saveImageToPhotosAlbum({
        filePath: path,
        success: () => {
          uni.showToast({ title: '保存成功', icon: 'success' })
          resolve()
        },
        fail: (err) => {
          if (err.errMsg?.includes('auth deny')) {
            uni.showToast({ title: '请授权保存到相册', icon: 'none' })
          }
          reject(err)
        },
      })
    })
  }

  async function sharePoster(path: string): Promise<void> {
    try {
      await uni.share({
        provider: 'weixin',
        type: 2,
        imageUrl: path,
      })
    } catch (err) {
      console.error('分享失败:', err)
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
