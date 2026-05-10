<script setup lang="ts">
import { LineChart } from 'echarts/charts'
import { GridComponent, LegendComponent, TooltipComponent } from 'echarts/components'
import * as echarts from 'echarts/core'
import { CanvasRenderer } from 'echarts/renderers'

echarts.use([
  GridComponent,
  LegendComponent,
  TooltipComponent,
  LineChart,
  CanvasRenderer,
])

interface MonthData {
  month: string
  totalDistance: number
  totalRides: number
}

interface Props {
  data?: MonthData[]
}

const props = withDefaults(defineProps<Props>(), {
  data: () => [],
})

const option = computed(() => {
  const sortedData = [...props.data].sort((a, b) => a.month.localeCompare(b.month))

  return {
    tooltip: {
      trigger: 'axis',
      backgroundColor: 'rgba(18, 18, 18, 0.9)',
      borderColor: '#2ED573',
      textStyle: {
        color: '#FFFFFF'
      }
    },
    legend: {
      data: ['骑行距离', '骑行次数'],
      top: 10,
      textStyle: {
        color: '#8D99AE'
      }
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: sortedData.map(item => item.month),
      axisLine: {
        lineStyle: {
          color: '#333333'
        }
      },
      axisLabel: {
        color: '#8D99AE'
      }
    },
    yAxis: [
      {
        type: 'value',
        name: '距离(km)',
        position: 'left',
        axisLine: {
          lineStyle: {
            color: '#2ED573'
          }
        },
        axisLabel: {
          color: '#8D99AE'
        },
        splitLine: {
          lineStyle: {
            color: '#333333'
          }
        }
      },
      {
        type: 'value',
        name: '次数',
        position: 'right',
        axisLine: {
          lineStyle: {
            color: '#FF7A00'
          }
        },
        axisLabel: {
          color: '#8D99AE'
        },
        splitLine: {
          show: false
        }
      }
    ],
    series: [
      {
        name: '骑行距离',
        type: 'line',
        stack: 'Total',
        data: sortedData.map(item => item.totalDistance),
        smooth: true,
        itemStyle: {
          color: '#2ED573'
        },
        areaStyle: {
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              { offset: 0, color: 'rgba(46, 213, 115, 0.3)' },
              { offset: 1, color: 'rgba(46, 213, 115, 0.1)' }
            ]
          }
        }
      },
      {
        name: '骑行次数',
        type: 'line',
        yAxisIndex: 1,
        data: sortedData.map(item => item.totalRides),
        smooth: true,
        itemStyle: {
          color: '#FF7A00'
        },
        areaStyle: {
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              { offset: 0, color: 'rgba(255, 122, 0, 0.3)' },
              { offset: 1, color: 'rgba(255, 122, 0, 0.1)' }
            ]
          }
        }
      }
    ]
  }
})
</script>

<template>
  <uni-echarts custom-class="h-[400rpx] w-full" :option="option" />
</template>
