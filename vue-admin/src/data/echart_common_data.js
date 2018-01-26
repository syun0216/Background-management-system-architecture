export const bar_data = (xAxis, legend, series, isZoom, zoomStart) => {
  const zoom = {
    dataZoom: [{
      type: 'slider',
      show: true,
      xAxisIndex: [0],
      start: zoomStart,
      end: 100,
      bottom: 0,
      startValue: 0
    }]
  }
  const data = {
    // title: {
    //   text: title
    //   // subtext: '纯属虚构'
    // },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        // 坐标轴指示器，坐标轴触发有效
        type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
      }},
    legend: {
      data: legend,
      type: 'scroll',
      // orient: 'vertical',
      left: 10,
      top: 0,
      bottom: 10
    },
    toolbox: {
      show: true,
      top: '20px',
      right: '60px',
      feature: {
        mark: { show: true },
        dataView: { show: true, readOnly: true,
          optionToContent: function(opt) {
            const axisData = opt.xAxis[0].data // 坐标数据
            const series = opt.series // 折线图数据
            let tdHeads = '<td  style="padding: 0 10px"></td>' // 表头
            let tdBodys = '' // 数据
            series.forEach(function(item) {
              // 组装表头
              tdHeads += `<td style="padding: 0 10px">${item.name}</td>`
            })
            let table = `<table border="1" style="margin-left:20px;border-collapse:collapse;font-size:14px;text-align:center"><tbody><tr>${tdHeads} </tr>`
            for (let i = 0, l = axisData.length; i < l; i++) {
              for (let j = 0; j < series.length; j++) {
                // 组装表数据
                tdBodys += `<td>${series[j].data[i]}</td>`
              }
              table += `<tr><td style="padding: 0 10px">${axisData[i]}</td>${tdBodys}</tr>`
              tdBodys = ''
            }
            table += '</tbody></table>'
            return table
          }
        },
        magicType: { show: true, type: ['line', 'bar'] },
        restore: { show: true },
        saveAsImage: { show: true }
      }
    },
    calculable: true,
    xAxis: [
      { data: xAxis,
        axisLabel: {
          rotate: -20,
          interval: 0
        }}
    ],
    yAxis: [
      {
        type: 'value'
      }
    ],
    // dataZoom: [{
    //   type: 'slider',
    //   show: true,
    //   xAxisIndex: [0],
    //   // start: 0,
    //   end: 100,
    //   bottom: '5',
    //   startValue: 0
    // }],
    series: series
  }

  return isZoom ? Object.assign(zoom, data) : data
}

export const horizon_bar_data = (xAxis, legend, series) => {
  return {
    // title: {
    //   text: title
    //   // subtext: '纯属虚构'
    // },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        // 坐标轴指示器，坐标轴触发有效
        type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
      }},
    legend: {
      data: legend,
      type: 'scroll',
      // orient: 'vertical',
      left: 10,
      top: 0,
      bottom: 10
    },
    toolbox: {
      show: true,
      top: '20px',
      feature: {
        mark: { show: true },
        dataView: { show: true, readOnly: true },
        magicType: { show: true, type: ['line', 'bar'] },
        restore: { show: true },
        saveAsImage: { show: true }
      }
    },
    calculable: true,
    yAxis: [
      { data: xAxis }
    ],
    xAxis: [
      {
        type: 'value'
      }
    ],
    // dataZoom: [{
    //   type: 'slider',
    //   show: true,
    //   xAxisIndex: [0],
    //   // start: 0,
    //   end: 100,
    //   bottom: '5',
    //   startValue: 0
    // }],
    series: series
  }
}

export const line_data = (xAxis, legend, series, isZoom, zoomStart) => {
  const zoom = {
    dataZoom: [{
      type: 'slider',
      show: true,
      xAxisIndex: [0],
      start: zoomStart,
      end: 100,
      bottom: '0',
      startValue: 0
    }]
  }
  const data = {
    tooltip: {
      trigger: 'axis'
    },
    legend: {
      data: legend,
      type: 'scroll',
      // orient: 'vertical',
      left: 10,
      top: 0,
      bottom: 10
    },
    toolbox: {
      show: true,
      top: '20px',
      right: '60px',
      feature: {
        mark: { show: true },
        dataView: { show: true, readOnly: true,
          optionToContent: function(opt) {
            const axisData = opt.xAxis[0].data // 坐标数据
            const series = opt.series // 折线图数据
            let tdHeads = '<td  style="padding: 0 10px"></td>' // 表头
            let tdBodys = '' // 数据
            series.forEach(function(item) {
              // 组装表头
              tdHeads += `<td style="padding: 0 10px">${item.name}</td>`
            })
            let table = `<table border="1" style="margin-left:20px;border-collapse:collapse;font-size:14px;text-align:center"><tbody><tr>${tdHeads} </tr>`
            for (let i = 0, l = axisData.length; i < l; i++) {
              for (let j = 0; j < series.length; j++) {
                // 组装表数据
                tdBodys += `<td>${series[j].data[i]}</td>`
              }
              table += `<tr><td style="padding: 0 10px">${axisData[i]}</td>${tdBodys}</tr>`
              tdBodys = ''
            }
            table += '</tbody></table>'
            return table
          } },
        magicType: { show: true, type: ['line', 'bar'] },
        restore: { show: true },
        saveAsImage: { show: true }
      }
    },
    calculable: true,
    xAxis: [
      { data: xAxis, axisLabel: {
        rotate: -20,
        interval: 0
      }}
    ],
    yAxis: [
      {
        type: 'value'
      }
    ],
    series: series
  }
  return isZoom ? Object.assign(zoom, data) : data
}

export const pie_data = (title, legend, series) => {
  return {
    title: {
      text: title,
      x: 'left'
    },
    tooltip: {
      trigger: 'item',
      formatter: '{a} <br/>{b} : {c} ({d}%)'
    },
    legend: {
      type: 'scroll',
      orient: 'vertical',
      right: 10,
      top: 40,
      bottom: 20,
      data: legend
    },
    toolbox: {
      show: true,
      feature: {
        mark: { show: true },
        dataView: { show: true, readOnly: true },
        magicType: {
          show: true,
          type: ['pie', 'funnel'],
          option: {
            funnel: {
              x: '25%',
              width: '50%',
              funnelAlign: 'left',
              max: 1548
            }
          }
        },
        restore: { show: true },
        saveAsImage: { show: true }
      }
    },
    // toolbox: {
    //   show: true,
    //   feature: {
    //     mark: { show: true },
    //     dataView: { show: true, readOnly: false },
    //     magicType: { show: true, type: ['line', 'bar', 'stack', 'tiled'] },
    //     restore: { show: true },
    //     saveAsImage: { show: true }
    //   }
    // },
    calculable: true,
    series: series
  }
}
