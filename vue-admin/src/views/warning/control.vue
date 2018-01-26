<template>
      <div class="amap-page-container">
        <div id="container"></div>
        <i-button type="text" @click="folded" class="showBtn" v-show="!isfolded"><Icon type="navicon"  size="32" color="#000"></Icon></i-button>
        <div class="content-group" v-show="isfolded">
              <div class="search">
                    <!-- <Button type="text" @click="folded"><Icon type="navicon"  size="32" color="#000"></Icon></Button> -->
                    <label class="search-label">行业：</label>
                  <template v-for="(item,index) in industry_items">
                             <i-button type="text" @click="initInfo(item,index)" :class="{'active':index==active_index}">{{item.sort}}</i-button>
                  </template>
              </div>
              <!-- <div class="search-input">
                      <Input v-model="industry"  placeholder="行业搜索" style="width: 200px"></Input>
                      <Button type="text" @click="searchInfo"><Icon type="ios-search-strong"   size="26" color="#000" style="vertical-align:middle;cursor: pointer;" ></Icon></Button>
              </div> -->
              <div class="item-group one" >
                  <i-progress :percent="100" :stroke-width="20" hide-info ></i-progress>
                  <p>一年增速上升企业数：{{one_year}}家</p>
              </div>
               <div class="item-group two">
                  <i-progress :percent="100"  :stroke-width="20" hide-info></i-progress>
                  <p>二年增速上升企业数：{{two_year}}家</p>
              </div>
               <div class="item-group three">
                  <i-progress :percent="100"  :stroke-width="20" hide-info></i-progress>
                  <p>三年增速上升企业数：{{three_year}}家</p>
              </div>
               <div class="item-group four">
                  <i-progress :percent="100"  :stroke-width="20" hide-info></i-progress>
                  <p>四年增速上升企业数：{{four_year}}家</p>
              </div>
               <div class="item-group five">
                  <i-progress :percent="100"  :stroke-width="20" hide-info></i-progress>
                  <p>五年增速上升企业数：{{five_year}}家</p>
              </div>

        </div>
      </div>

</template>
<script>
    import BMap from 'BMap';
    import { getIncreaseCompany,companyList,companyInfo } from '@/api/warn/company';
    var map=null;
    // import { Progress,Button,Icon} from 'iview'
    export default {
      name:"companymap",
      data() {
            return {
              industry:"",
              active_index:"0" ,
              industry_items :[
　　　　　　{sort: '不限', code: ''},
　　　　　　{sort: '服务业', code: "F"},
　　　　　　{sort: '批发与零售', code: "E"}
　　　　],
              isfolded:true,
              one_year:"",
              two_year:"",
              three_year:"",
              four_year:"",
              five_year:""
            }
      },
      components:{
          //  Progress,Button,Icon
        },
      mounted: function () {
          this.init();
          this.initInfo({sort: '不限', val: ''},"0");
      },
      methods: {
        folded(){
            this.isfolded=!this.isfolded;
        },
        searchInfo(){
            this.initInfo({
                sort: '', code: this.industry
            })
        },
        initInfo(item,index){
            this.active_index=index;
            let data={
              industry_code:item.code
            };
            getIncreaseCompany(data).then(response=>{
                    if(response.status===200 && !response.data.code){
                            let data=response.data.data.bus_rev_tag
                            response.data.data.bus_rev_tag.map(item=>{
                              if(item.name==1){
                                  this.one_year=item.num;
                              }else if(item.name==2){
                                  this.two_year=item.num;
                              }else if(item.name==3){
                                  this.three_year=item.num;
                              }else if(item.name==4){
                                  this.four_year=item.num;
                              }else if(item.name==5){
                                  this.five_year=item.num;
                              }
                            })
                    }else{
                        this.$Loading.error();
                        this.$Message.error('后台服务出错啦!'+response.data.msg);
                    }
            })
            this.mapCompanyList(item.code);
        },
        init: function () {
          let self=this;
          map = new BMap.Map('container', {
              enableMapClick: false,
              mapType:BMAP_PERSPECTIVE_MAP
          })

          map.centerAndZoom(new BMap.Point(114.067801,22.540537), 14);
          map.enableScrollWheelZoom();

          map.addControl(new BMap.MapTypeControl({
              anchor: BMAP_ANCHOR_TOP_LEFT
          })); //左上角，默认地图控件
          map.setCurrentCity("深圳"); //由于有3D图，需要设置城市哦

        },
        clearMap(){
          map.clearOverlays();
        },
        mapCompanyList(code){
          this.clearMap();
          let self=this;
              var colors = [
                    '#b30000',
                    "#e62229",
                    "#eb3b84",
                    "#47cc55",
                    "#73ff8c"
                  ];
            companyList({
                  industry_code:code
                }).then(response=>{
                      if(response.status===200 && !response.data.code){
                              let data=response.data.data;
                               let points1=[],points2=[],points3=[],points4=[],points5=[],points99=[];
                              let options1=[],options2=[],options3=[],options4=[],options5=[],options99=[];
                              data.map((item,index)=>{
                                    let p=item.amap_location.split(",");
                                    if(item.level==1){
                                        options1 = {
                                            size:6, // BMAP_POINT_SIZE_SMALL ==3   7 最大
                                            shape: 3, // BMAP_POINT_SHAPE_STAR ==1
                                            color: colors[0],
                                            opacity: 0.75
                                        }
                                        points1.push( new BMap.Point(p[0], p[1]));
                                    }else if(item.level==2){
                                          options2 = {
                                            size:6, // BMAP_POINT_SIZE_SMALL ==3   7 最大
                                            shape: 3, // BMAP_POINT_SHAPE_STAR ==1
                                            color: colors[1],
                                            opacity: 0.75
                                        }
                                        points2.push( new BMap.Point(p[0], p[1]));
                                    }else if(item.level==3){
                                          options3 = {
                                            size:6, // BMAP_POINT_SIZE_SMALL ==3   7 最大
                                            shape: 3, // BMAP_POINT_SHAPE_STAR ==1
                                            color: colors[2],
                                            opacity: 0.75
                                        }
                                          points3.push(new BMap.Point(p[0], p[1]))
                                    }else if(item.level==4){
                                          options4 = {
                                            size:6, // BMAP_POINT_SIZE_SMALL ==3   7 最大
                                            shape: 3, // BMAP_POINT_SHAPE_STAR ==1
                                            color: colors[3],
                                            opacity: 0.75
                                        }
                                          points4.push(new BMap.Point(p[0], p[1]))
                                    }else if(item.level==5){
                                          options5 = {
                                            size:6, // BMAP_POINT_SIZE_SMALL ==3   7 最大
                                            shape: 3, // BMAP_POINT_SHAPE_STAR ==1
                                            color: colors[4],
                                            opacity: 0.75
                                        }
                                          points5.push(new BMap.Point(p[0], p[1]))
                                    }else{
                                          options99 = {
                                            size:4, // BMAP_POINT_SIZE_SMALL ==3   7 最大
                                            shape: 3, // BMAP_POINT_SHAPE_STAR ==1
                                            color: '#25A8EF',
                                            opacity: 0.75
                                        }
                                          points99.push(new BMap.Point(p[0], p[1]))
                                    }
                              })
                              let pointCollection1 = new BMap.PointCollection(points1, options1);
                              let pointCollection2 = new BMap.PointCollection(points2, options2);
                              let pointCollection3 = new BMap.PointCollection(points3, options3);
                              let pointCollection4 = new BMap.PointCollection(points4, options4);
                              let pointCollection5 = new BMap.PointCollection(points5, options5);
                              let pointCollection99 = new BMap.PointCollection(points99, options99);


                            map.addOverlay(pointCollection1); // 添加Overlay
                            map.addOverlay(pointCollection2);
                            map.addOverlay(pointCollection3);
                            map.addOverlay(pointCollection4);
                            map.addOverlay(pointCollection5);
                            map.addOverlay(pointCollection99);

                             pointCollection1.addEventListener('click', function(e) {
                                  data.map(item=>{
                                    let point=item.amap_location.split(",");
                                       if (point[0] == e.point.lng && point[1]  == e.point.lat) {
                                            self.openInfo(item.org_id, new BMap.Point(e.point.lng, e.point.lat));
                                            return false;
                                        }
                                  })
                             })

                               pointCollection2.addEventListener('click', function(e) {
                                  data.map(item=>{
                                    let point=item.amap_location.split(",");
                                       if (point[0] == e.point.lng && point[1]  == e.point.lat) {
                                            self.openInfo(item.org_id, new BMap.Point(e.point.lng, e.point.lat));
                                            return false;
                                        }
                                  })
                             })

                               pointCollection3.addEventListener('click', function(e) {
                                  data.map(item=>{
                                    let point=item.amap_location.split(",");
                                       if (point[0] == e.point.lng && point[1]  == e.point.lat) {
                                            self.openInfo(item.org_id, new BMap.Point(e.point.lng, e.point.lat));
                                            return false;
                                        }
                                  })
                             })

                               pointCollection4.addEventListener('click', function(e) {
                                  data.map(item=>{
                                    let point=item.amap_location.split(",");
                                       if (point[0] == e.point.lng && point[1]  == e.point.lat) {
                                            self.openInfo(item.org_id, new BMap.Point(e.point.lng, e.point.lat));
                                            return false;
                                        }
                                  })
                             })

                               pointCollection5.addEventListener('click', function(e) {
                                  data.map(item=>{
                                    let point=item.amap_location.split(",");
                                       if (point[0] == e.point.lng && point[1]  == e.point.lat) {
                                            self.openInfo(item.org_id, new BMap.Point(e.point.lng, e.point.lat));
                                            return false;
                                        }
                                  })
                             })

                               pointCollection99.addEventListener('click', function(e) {
                                  data.map(item=>{
                                    let point=item.amap_location.split(",");
                                       if (point[0] == e.point.lng && point[1]  == e.point.lat) {
                                            self.openInfo(item.org_id, new BMap.Point(e.point.lng, e.point.lat));
                                            return false;
                                        }
                                  })
                             })
                      }else{
                          self.$Loading.error();
                          self.$Message.error('后台服务出错啦!'+response.data.msg);
                      }
              });
        },
        openInfo(id,point){
            let data_id={
                  id:id
              };
              companyInfo(data_id).then(response=>{
                      if(response.status===200 && !response.data.code){
                             let html='',company_name="";
                              let data_info=response.data.data;
                              company_name=data_info.org_name;
                              let bus_rev_amount=data_info.bus_rev_amount==null?"暂无数据":data_info.bus_rev_amount;
                              let C301ZS=data_info.C301ZS==null?"暂无数据":data_info.C301ZS;
                              let emp_num=data_info.emp_num==null?"暂无数据":data_info.emp_num;
                              let occur_period=data_info.occur_period==null?"暂无数据":data_info.occur_period;
                              html='<h2>'+company_name+'</h2><ul class="company_info"><li><lable>当季营收(千元)</lable>:<span>'+bus_rev_amount+'</span></li>\
                              <li><lable>企业增速(%)</lable>:<span>'+C301ZS+'</span></li>\
                              <li><lable>从业人数</lable>:<span>'+emp_num+'</span></li>\
                              <li><lable>数据周期</lable>:<span>'+occur_period+'</span></li>\
                              </ul>';
                            let infoWindow = new BMap.InfoWindow(html, {
                                    width: 280, // 信息窗口宽度
                                    height: 130, // 信息窗口高度
                                    title: "", // 信息窗口标题
                                    enableMessage: true //设置允许信息窗发送短息
                                }); // 创建信息窗口对象
                            map.openInfoWindow(infoWindow, point); //开启信息窗口
                      }else{
                            this.$Loading.error();
                            this.$Message.error('后台服务出错啦!'+response.data.msg);
                      }
              })
        }
      }
    }
</script>
<style>
.amap-page-container{
  height:100vh;
}
.amap-ui-smp-ifwn-content-body .amap-ui-smp-ifwn-info-title{
    color:#000;
    font-size:18px;
}
.company_info li{
  font-size:14px;
}

#container {
	position: absolute;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	height: 100%;
}

.circle {
    border-radius: 7px;
    width: 14px;
    height: 14px;
    text-align: center;
    color: white;
}

.circle1 {
    border-radius: 8px;
    width: 16px;
    height: 16px;
    text-align: center;
    color: white;
}

.circle2 {
    border-radius: 10px;
    width: 20px;
    height: 20px;
    text-align: center;
    color: white;
}

.circle3 {
    border-radius: 11px;
    width: 22px;
    height: 22px;
    text-align: center;
    color: white;
}

.circle4 {
    border-radius: 12px;
    width: 24px;
    height: 24px;
    padding: 3px;
    text-align: center;
    color: white;
}
.circle5 {
    border-radius: 13px;
    width: 26px;
    height: 26px;
    padding: 3px;
    text-align: center;
    color: white;
}

.content-group {
	position: absolute;
  width:350px;
	top: 20px;
	right: 20px;
	font-size: 18px;
	padding: 10px;
  background:#fff;
  opacity: 0.8;
  filter:alpha(opacity=80);
  border-radius: 16px;
}
.showBtn{
  position: absolute;
	top: 20px;
	right: 20px;
}
.item-group{
  color:#000;
  margin-top: 10px;
  height:50px;
  width:100%;
}
.amap-page-container .one .ivu-progress{
   width:100%;
}
.amap-page-container .one .ivu-progress-bg{
  background:#73ff8c;
}
.amap-page-container .two .ivu-progress{
  width:80%;
}
.amap-page-container .two .ivu-progress-bg{
  background:#47cc55;
}
.amap-page-container .three .ivu-progress{
  width:60%;
}
.amap-page-container .three .ivu-progress-bg{
  background:#eb3b84;
}
.amap-page-container .four .ivu-progress {
  width:40%;
}
.amap-page-container .four .ivu-progress-bg{
  background:#e62229;

}
.amap-page-container .five .ivu-progress {
    width:20%;
}
.amap-page-container .five .ivu-progress-bg{
  background:#b30000;
}
.search button{
  font-size:16px;
  padding:0 5px;
}

.search .active span{
    background: #2d8cf0;
    color: #fff;
}
.search-label{
color:#000;
 font-weight: bold;
}
.search-input{
  margin-top:12px;
  padding-left:60px;
  margin-bottom:30px;
}
.industrylist{
  padding-left:60px;
}
.industrylist button{
  font-size:16px;
  padding:0;
  padding-right:10px;
}
</style>
