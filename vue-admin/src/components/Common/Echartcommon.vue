<template>
    <div>
      <div v-if="hasTheme" style="margin-left:15px;padding:10px 0">
      <span>主题选择:</span>
      <el-select style="width:130px;" v-model='theme' placeholder='请选择主题'>
        <el-option v-for="(item,idx) in themeData" :key="idx" :label='item.label' :value='item.name'>
        </el-option>
      </el-select>
      </div>
      <div id="chart-container">
        <div :id='$props.id' :style="{'width':$props.width,'height':$props.height}"></div>
      </div>
    </div>
</template> 
<script>
import { bar_data, line_data, pie_data } from '@/data/echart_common_data'
import { debounce } from '@/utils'
require('echarts/theme/macarons')
require('echarts/theme/vintage')
require('echarts/theme/infographic')
require('echarts/theme/dark')
require('echarts/theme/shine')
require('echarts/theme/roma')
export default {
  data() {
    return {
      chart: null,
      color: '',
      theme: 'macarons',
      colors: ['#4accb7', '#6a78f5', '#fd5892', '#2ce7f5', '#ffda5b', '#438cff', '#C6E579', '#8ecacb', '#FF585C', '#27727B'],
      themeData: [
        { name: 'macarons', label: '马卡龙' },
        { name: 'vintage', label: '古典' },
        { name: 'infographic', label: '信息化' },
        { name: 'dark', label: '暗色' },
        { name: 'shine', label: '亮色' },
        { name: 'roma', label: '罗马风格' }
      ]
    }
  },
  methods: {
    initChart() {
      // document.getElementById('chart-container').innerHTML = `<div id='${this.$props.id}' style="width:${this.$props.width};height:${this.$props.height}"></div>`
      let options = {}
      options = this.currentEchartType()
      this.chart = this.$echarts.init(document.getElementById(this.$props.id), this.theme)
      // console.log(this.chart)
      // console.log('options', options)
      // console.log(this.$props.id + 'options', options)
      this.chart.setOption(options, true)
    },
    currentEchartType() {
      const { xAxis, series, legend } = this.$props.echartParams

      series[0].itemStyle = {
        normal: {
          color: this.color,
          barBorderRadius: 6
        }
      }
      series[0].lineStyle = {
        normal: {
          color: this.color
        }
      }
      switch (this.$props.type) {
        case 'bar':
          return series[0].data.length > 12 ? bar_data(xAxis, legend, series, true, this.$props.zoomStart)
            : bar_data(xAxis, legend, series, false, this.$props.zoomStart); break
        case 'line':return series[0].data.length > 12 ? line_data(xAxis, legend, series, true, this.$props.zoomStart)
          : line_data(xAxis, legend, series, false, this.$props.zoomStart); break
        case 'pie':return pie_data(series[0].name, legend, series); break
        default: return bar_data(xAxis, legend, series, this.$props.isZoom, this.$props.zoomStart)
      }
    }
  },
  props: {
    width: {
      type: String,
      default: '100%'
    },
    height: {
      type: String,
      default: '600px'
    },
    type: {
      type: String,
      default: 'bar'
    },
    echartParams: {
      type: Object,
      default: null
    },
    autoResize: {
      type: Boolean,
      default: true
    },
    // title: {
    //   type: String,
    //   default: '示例图表'
    // },
    id: {
      type: String,
      default: 'myChart'
    },
    isZoom: {
      type: Boolean,
      default: false
    },
    zoomStart: {
      type: Number,
      default: 25
    },
    hasTheme: {
      type: Boolean,
      default: false
    }
  },
  mounted() {
    this.color = this.colors[Math.floor((Math.random() * this.colors.length))]
    this.$nextTick(function() {
      this.initChart()
      if (this.autoResize) {
        this.__resizeHanlder = debounce(() => {
          if (this.chart) {
            this.chart.resize()
          }
        }, 100)
        window.addEventListener('resize', this.__resizeHanlder)
      }

      // 监听侧边栏的变化
      const sidebarElm = document.getElementsByClassName('sidebar-container')[0]
      sidebarElm.addEventListener('transitionend', this.__resizeHanlder)
    })
    // this.initChart()
  },
  beforeDestroy() {
    if (!this.chart) {
      return
    }
    this.chart.dispose()
    this.chart = null
  },
  // updated() {
  //   console.log(this.$props.id)
  // }
  watch: {
    id() {
      // this.chart.destory()
      this.$nextTick(function() {
        this.initChart()
      })
    },
    theme() {
      if (!this.chart) {
        return
      }
      this.chart.dispose()
      this.chart = null
      this.color = this.colors[Math.floor((Math.random() * this.colors.length))]
      this.initChart()
      // console.log(111)
      // if(!this.chart){
      //   return
      // }

      // this.$nextTick(function() {

      // })
    },
    // xzg加
    echartParams() {
      this.$nextTick(function() {
        this.initChart()
      })
    }
  }
}
</script>
 <style rel="stylesheet/scss" lang="scss" scoped>
 
 </style>
 