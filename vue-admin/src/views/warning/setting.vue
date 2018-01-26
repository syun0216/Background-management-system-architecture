<template>
      <div class="amap-page-container">
        <div id="container" style="height:100vh;"></div>
      </div>
</template>
<script>
    import AMap from 'AMap'
import { getCompanyList , companyInfo, company_detail, areaJSON, areaRegion } from '@/api/warn/companylist'
var map = null
export default {
      name: 'companylist',
      data() {
        return {
          areaRegion: []
        }
      },
      mounted: function() {
        this.init()
      this.areaList()
  },
      methods: {
        init: function() {
          const self = this
        map = new AMap.Map('container', {
            center: [114.067801, 22.540537],
            resizeEnable: true,
            zoom: 13
          })

          AMapUI.loadUI(['control/BasicControl'], function(BasicControl) {
            var zoomCtrl = new BasicControl.Zoom({
              position: 'bl'
            })
              map.addControl(zoomCtrl)
        })

      window.onload = function() {
            map.plugin(['AMap.ToolBar'], function() {
              map.addControl(new AMap.ToolBar())
        })
        if (location.href.indexOf('&guide=1') !== -1) {
              map.setStatus({ scrollWheel: false })
            }
          }
        },
        clearMap() {
          map.clearMap()
    },
        areaList() {
          map.clearMap()
        let self = this
        let colorlist = ['#F385F3', '#AB7EFF', '#728BFF', '#5CB9E7', '#50E7B5', '#4CFF89', '#72E738', '#AFF324', '#f2e124', '#FFB318', '#FF5E0C', '#FF1818']
        colorlist = colorlist.reverse()
        areaRegion().then(response => {
            if (response.status === 200 && !response.data.code) {
              this.areaRegion = response.data.data
                    this.areaRegion.map((item, index) => {
                const center_point = item.center.split(',')
                    let get_color = colorlist[index]
                    areaJSON(item.path).then(response => {
                  if (response.status === 200 && !response.data.code) {
                    const borderLine = response.data
                                let polygonArr = new Array() //多边形覆盖物节点坐标数组
                                let point = [], good_point = []
                                if (borderLine != '') {
                      borderLine.forEach((element, idx) => {
                        if (idx == 0) {
                          point.push(element)
                                            }
                        polygonArr.push(element)
                                    })
                                    if (center_point == '') {
                        good_point = point[0]
                                    } else{
                        good_point = center_point
                                    }
                      self.center_point = good_point
                                    let polygon = new AMap.Polygon({
                        name: item.name,
                        point: good_point,
                        num: item.num,
                        path: polygonArr, // 设置多边形边界路径
                        strokeColor: get_color, // 线颜色
                        strokeOpacity: 0.5, // 线透明度
                        strokeWeight: 5, // 线宽
                        fillColor: get_color, // 填充色
                        fillOpacity: 0.8 // 填充透明度
                      })
                                    polygon.setMap(map)

                                    let createMarker = function(data, name, num) {
                        const div = document.createElement('div')
                                        div.className = 'circle'
                                        div.style.backgroundColor = '#FF1818'
                                        div.innerHTML = '<a>' + name + '<br><span style="display:block;margin-top:5px;">' + num + '家</span></a>'
                                        let marker = new AMap.Marker({
                          content: div,
                          position: data,
                          offset: new AMap.Pixel(-30, 5)
                        })
                                        return marker
                                    }

                      const marker_center = createMarker(good_point, item.name, item.num)

                                    marker_center.setMap(map)

                                    polygon.on('dblclick', function(event) {
                        self.$store.commit('setDrilldown', true)
                                        var flag = true
                                        let region = item.value
                                        if (flag) {
                          self.$store.commit('setRegion', region)
                                            self.$store.commit('setRegionList', region)
                                            flag = false
                                        }
                      })

                                    polygon.on('mouseover', function(event) {
                        polygon.setOptions({
                          strokeColor: 'red',
                          strokeWeight: 5
                        })
                                    })

                                    // 鼠标离开多边形时触发此事件。
                                        polygon.on('mouseout', function() {
                        polygon.setOptions({
                          strokeColor: get_color
                        })
                                        })
                                }
                  }else {
                    this.$Loading.error()
                                this.$Message.error('后台服务出错啦!' + response.data.msg)
                            }
                })
              })
              map.setFitView()
        map.setZoom(13)
        map.panTo(this.center_point)
            } else{
              this.$Loading.error()
                this.$Message.error('后台服务出错啦!' + response.data.msg)
            }
          })
        },
        mapCompanyList() {
          this.clearMap()
        let self = this
         let markers = []
        this.$Spin.show()
        getCompanyList({
            size: 99999999,
            page: 1,
            index_id: 5545
          }).then(response => {
            if (response.status === 200 && !response.data.code) {
              this.$Spin.hide()
                            let data = response.data.data.data
                            data.forEach((element, index) => {
                const markerPosition = element.amap_location.split(',')
                                markerPosition.push(element.org_id)
                                markerPosition.push(element.org_name)
                                let position = new AMap.LngLat(markerPosition[0], markerPosition[1])
                                let marker = new AMap.Marker({
                  position: position,
                  companyCode: markerPosition[2], // 自定义属性
                  companyName: markerPosition[3],
                  content: '<div style="text-align:center;background-color: hsla(180, 100%, 50%, 0.7); height: 24px; width: 24px; border: 1px solid hsl(180, 100%, 40%); border-radius: 12px; box-shadow: hsl(180, 100%, 50%) 0px 0px 1px;"></div>',
                  offset: new AMap.Pixel(-15, -15)
                })
                markers.push(marker)
                                AMap.event.addListener(marker, 'click', function(e) {
                  const data = {
                    index_id: 5545,
                    id: e.target.Qi.companyCode
                  }
                                        self.getCompanyDetail(data, e.target.Qi.companyName, position)
                })
                           })
                            setTimeout(() => {
                self.addCluster(markers)
                            }, 500)
                    } else{
              self.$Loading.error()
                        self.$Message.error('后台服务出错啦!' + response.data.msg)
                    }
          })
        },
        getCompanyDetail(data, name, position) {
          const self = this
        this.$Spin.show()
        company_detail(data).then(response => {
            if (response.status === 200 && !response.data.code) {
              this.$Spin.hide()
                        let html = '<ul class="company_info">'
                        response.data.data.map(item => {
                html += '<li><lable>' + item.title + '</lable>:<span>' + item.value + '</span></li>'
              })
              html += '</ul>'
                        self.addMarker(name, html, position)
                }else {
              this.$Loading.error()
                        this.$Message.error('后台服务出错啦!' + response.data.msg)
                }
          })
        },
        addMarker(name, html, lnglatXY) {
          map.panTo(lnglatXY)
        // map.setZoom(18);
        AMapUI.loadUI(['overlay/SimpleInfoWindow'], function(SimpleInfoWindow) {
            var infoWindow = new SimpleInfoWindow({

              infoTitle: '<strong>' + name + '</strong>',
              infoBody: html,
              // 基点指向marker的头部位置
              offset: new AMap.Pixel(0, -31)
            })
            infoWindow.open(map, lnglatXY)
        })
    },
        _renderCluserMarker(count, context) {
          // const count = this.markers.length;

          const factor = Math.pow(context.count / count, 1 / 18)
          const div = document.createElement('div')
      let Hue = 180 - factor * 180
      let bgColor = 'hsla(' + Hue + ',100%,50%,0.7)'
      let fontColor = 'hsla(' + Hue + ',100%,20%,1)'
      let borderColor = 'hsla(' + Hue + ',100%,40%,1)'
      let shadowColor = 'hsla(' + Hue + ',100%,50%,1)'
      div.style.backgroundColor = bgColor
          const size = Math.round(30 + Math.pow(context.count / count, 1 / 5) * 20)
      div.style.width = div.style.height = size + 'px'
      div.style.border = 'solid 1px ' + borderColor
      div.style.borderRadius = size / 2 + 'px'
      div.style.boxShadow = '0 0 1px ' + shadowColor
      div.innerHTML = context.count
      div.style.lineHeight = size + 'px'
      div.style.color = fontColor
      div.style.fontSize = '14px'
      div.style.textAlign = 'center'
      context.marker.setOffset(new AMap.Pixel(-size / 2, -size / 2))
      context.marker.setContent(div)
        },
        addCluster(markers) {
          const self = this
        let cluster = new AMap.MarkerClusterer(map, markers, {
            gridSize: 80,
            renderCluserMarker: self._renderCluserMarker.bind(this, markers.length)
          })
    }
      }
    }
</script>
<style>
.amap-page-container{
  /* height:100%; */
}
.amap-ui-smp-ifwn-content-body .amap-ui-smp-ifwn-info-title{
    color:#000;
    font-size:18px;
}
#container {
	position: absolute;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	width: 100%;
	height: 100%;
}

.circle {
    border-radius: 37px;
    width: 74px;
    height: 74px;
    text-align: center;
    color: white;
}
.circle>a{
    width: 65px;
    margin: 0 auto;
    display: block;
    font-size: 12px;
    color: #fff;
    text-align: center;
    line-height: 18px;
    padding-top: 12px;
}
</style>