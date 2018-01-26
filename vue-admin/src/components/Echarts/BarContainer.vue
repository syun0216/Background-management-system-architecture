<template>
  <div id="bar_container">
    <div id="barChart" :style="width:width;height:height">

    </div>
  </div> 
</template>
<script>
export default{
  methods: {
    initBar() {
      if (this.$props.config !== null) {
        const barChart = this.$echarts.init(document.getElementById('barChart'))
        barChart.setOptions(this.$props.config)
        window.onresize = function() {
          barChart.resize()
        }
      }
    }
  },
  props: {
    config: {
      default: null,
      type: Object
    },
    width: {
      default: '600px',
      type: String
    },
    height: {
      default: '400px',
      type: String
    }
  },
  watch: {
    config() {
      document.getElementById('bar_container').innerHTML = `<div style="width:${this.$props.width};height:${this.$props.height}" id="barChart" ></div>`
      this.initBar()
    }
  }
}

</script>
<style rel="stylesheet/scss" lang="scss" scoped>
  
</style>