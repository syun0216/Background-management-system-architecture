<template>
    <Row style="height:100%;" class="page">
        <i-col span="6" style="height:100%;background: #f6f6f6;padding-top: 10px;">
              <Card  class="card-item">
                  <p slot="title" class="target_title">
                    四上企业数量
                  </p>
                  <div class="cardinfo">
                        <h3>{{total_count}}家</h3>
                  </div>
                  <div class="detail">
                      <div class="detail-item">
                              <p  class="item-num"><span >{{total_count}}</span></p>
                              <p  class="item-title">总数</p>
                      </div>
                      <div class="detail-item">
                                 <p class="item-num"><span >{{new_count}}</span></p>
                              <p class="item-title-up">上年新增</p>
                      </div>
                      <div class="detail-item">
                             <p class="item-num"><span >{{loss_count}}</span></p>
                              <p class="item-title-down">上年减少</p>
                      </div>
                  </div>

              </Card>
              <Card   class="card-item">
                  <p slot="title" class="target_title">
                   四上企业营收总额
                  </p>

                    <div class="cardinfo">
                        <h3>{{total_bus_rev_amount}}亿元</h3>
                  </div>
                       <div class="detail">
                      <div class="detail-item">
                              <p class="item-num"><span >{{total_bus_rev_amount}}</span></p>
                              <p class="item-title">总量</p>
                      </div>
                      <div class="detail-item">
                                 <p class="item-num"><span >{{new_bus_rev_amount}}</span></p>
                              <p class="item-title-up">上年新增</p>
                      </div>
                      <div class="detail-item">
                             <p class="item-num"><span >{{loss_bus_rev_amount}}</span></p>
                              <p class="item-title-down">上年减少</p>
                      </div>
                  </div>
              </Card>

              <Card   class="card-item">
                  <p slot="title" class="target_title">
                    四上企业从业人数
                  </p>
                    <div class="cardinfo">
                         <h3>{{total_emp_num}}人</h3>
                  </div>
                      <div class="detail">
                      <div class="detail-item">
                              <p class="item-num"><span >{{total_emp_num}}</span></p>
                              <p class="item-title">总数</p>
                      </div>
                      <div class="detail-item">
                                 <p class="item-num"><span >{{new_emp_num}}</span></p>
                              <p class="item-title-up">上年新增</p>
                      </div>
                      <div class="detail-item">
                             <p class="item-num"><span >{{loss_emp_num}}</span></p>
                              <p class="item-title-down">上年减少</p>
                      </div>
                  </div>
              </Card>
          </i-col>
        <i-col span="18" style="height:760px;">
          <Row  class="echarts_content">
              <i-col span="24"  class="item_echart" >
                  <div style="width:100%;height:100%;" id="echart1"></div>
              </i-col>
              <i-col span="24" class="item_echart">
                    <div style="width:100%;height:100%;" id="echart2"></div>
              </i-col>
              <i-col span="24"  class="item_echart">
                    <div style="width:100%;height:100%;" id="echart3"></div>
              </i-col>
          </Row>
        </i-col>
    </Row>
</template>
<script>
    import { getCardInfo,echartsInfo } from '@/api/warn/echarts';
  //  import { Row,Col, Card } from 'iview'

    const echarts = require('echarts');

    const itemStyle = {
        normal: {
            color:"#7ab1d1"
        },
        emphasis: {
            barBorderWidth: 1,
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowOffsetY: 0,
            shadowColor: 'rgba(0,0,0,0.5)'
        }
    };

    const itemStyle_down = {
        normal: {
            color:"#a0e8d9"
        },
        emphasis: {
            barBorderWidth: 1,
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowOffsetY: 0,
            shadowColor: 'rgba(0,0,0,0.5)'
        }
    };


    let  option1= {
            title: {
                left: 'left',
                textStyle:{
                    // fontFamily:"Microsoft YaHei",
                    fontSize:16,
                    color:"#4c5e70"
                }
            },
            tooltip: {
                trigger: 'axis',
                axisPointer: { // 坐标轴指示器，坐标轴触发有效
                    type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
                }
            },
            legend: {
               x: 'right',
               top:"10"
            },
            grid: {
                top: '30px',
                left: '1.2%',
                right: '1%',
                bottom: '25px',
                containLabel: true
            },
            //设置坐标轴
            xAxis: {
              silent: false,
              name:"年份",
             nameLocation:"start",
              data:[],
              axisLine: {onZero: true},
              splitLine: {show: false},
              splitArea: {show: false},
                axisLabel: {
                    interval: 0,
                    // rotate: -45,
                    margin: 2,
                },
                axisTick: {
                    alignWithLabel: true
                },
                type: 'category'
            },
            yAxis: {
                type: 'value',
                name:"家",
                nameLocation:"start",
                splitArea: {show: false},
                nameTextStyle:{
                    align:'right'
                },
                splitLine: {
                    show: false
                }
            },
            series: [{
                  type: 'bar',
                stack: 'one',
                barGap: '20%',
                barCategoryGap: '40%',
                barWidth : 30,
                itemStyle: itemStyle
            }, {
                type: 'bar',
                stack: 'one',
                //设置柱子的宽度
                    barWidth : 30,
                //配置样式
                itemStyle:itemStyle_down,
            }],
      };
          let  option2= {
            title: {
                left: 'left',
                  textStyle:{
                    fontFamily:"Microsoft YaHei",
                    fontSize:16,
                    color:"#4c5e70"
                }
            },
            tooltip: {
                trigger: 'axis',
                axisPointer: { // 坐标轴指示器，坐标轴触发有效
                    type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
                }
            },
            legend: {
               x: 'right',
                 top:"10"
            },
            grid: {
                top: '30px',
                left: '1.2%',
                right: '1%',
                bottom: '25px',
                containLabel: true
            },
            //设置坐标轴
            xAxis: {
              silent: false,
              name:"年份",
             nameLocation:"start",
              data:[],
              axisLine: {onZero: true},
              splitLine: {show: false},
              splitArea: {show: false},
                axisLabel: {
                    interval: 0,
                    // rotate: -45,
                    margin: 2,
                },
                axisTick: {
                    alignWithLabel: true
                },
                type: 'category'
            },
            yAxis: {
                type: 'value',
                name:"亿元",
                nameLocation:"start",
                splitArea: {show: false},
                nameTextStyle:{
                    align:'right'
                },
                splitLine: {
                    show: false
                }
            },
            series: [{
                  type: 'bar',
                stack: 'one',
                barGap: '20%',
                barCategoryGap: '40%',
                barWidth : 30,
                itemStyle: itemStyle
            }, {
                type: 'bar',
                stack: 'one',
                //设置柱子的宽度
                    barWidth : 30,
                //配置样式
                itemStyle:itemStyle_down ,
            }],
      };
            let  option3= {
            title: {
                left: 'left',
                  textStyle:{
                    fontFamily:"Microsoft YaHei",
                    fontSize:16,
                    color:"#4c5e70"
                }
            },
            tooltip: {
                trigger: 'axis',
                axisPointer: { // 坐标轴指示器，坐标轴触发有效
                    type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
                }
            },
            legend: {
              x: 'right',
               top:"10"
            },
            grid: {
                top: '30px',
                left: '1.2%',
                right: '1%',
                bottom: '25px',
                containLabel: true
            },
            //设置坐标轴
            xAxis: {
              silent: false,
                name:"年份",
             nameLocation:"start",
              data:[],
              axisLine: {onZero: true},
              splitLine: {show: false},
              splitArea: {show: false},
                axisLabel: {
                    interval: 0,
                    // rotate: -45,
                    margin: 2,
                },
                axisTick: {
                    alignWithLabel: true
                },
                type: 'category'
            },
            yAxis: {
                type: 'value',
                name:"人",
                nameLocation:"start",
                splitArea: {show: false},
                nameTextStyle:{
                    align:'right'
                },
                splitLine: {
                    show: false
                }
            },
            series: [{
                  type: 'bar',
                stack: 'one',
                barGap: '20%',
                barCategoryGap: '40%',
                barWidth : 30,
                itemStyle: itemStyle
            }, {
                type: 'bar',
                stack: 'one',
                //设置柱子的宽度
                    barWidth : 30,
                //配置样式
                itemStyle:itemStyle_down ,
            }],
      };
    const echart_option={
            echart1:option1,
            echart2:option2,
            echart3:option3
    };

    function toDecimal(x) {
        var f = parseFloat(x);
        if (isNaN(f)) {
            return;
        }
        f = Math.round(x*100)/100;
        return f;
    }
    export default {
        data () {
            return {
              total_count:"",  //企业数
              new_count:"", // 新增企业数
              loss_count:"",  //减少企业数

              total_bus_rev_amount:"",//企业营收总额
              new_bus_rev_amount:"", //企业营收总额
              loss_bus_rev_amount:"",// 新增企业营收总额

              total_emp_num:"",// 从业人数
              new_emp_num:"",// 新增从业人数
              loss_emp_num:""// 减少从业人数
            }
        },
        components:{
          // Row,Col, Card
        },
        mounted () {
            this.initTargetInfo();
            this.initEcharts();
        },
        methods: {
            initTargetInfo () {
                getCardInfo().then(response=>{
                  if(response.status===200 && !response.data.code){
                          let data=response.data.data;
                            this.total_count=data.total_count;
                            this.new_count=data.new_count;
                            this.loss_count=data.loss_count;

                            this.total_bus_rev_amount=toDecimal(data.total_bus_rev_amount/100000);
                            this.new_bus_rev_amount=toDecimal(data.new_bus_rev_amount/100000);
                            this.loss_bus_rev_amount=toDecimal(data.loss_bus_rev_amount/100000);

                            this.total_emp_num=data.total_emp_num;
                            this.new_emp_num=data.new_emp_num;
                            this.loss_emp_num=data. loss_emp_num;

                  }else{
                      this.$message.error('后台服务出错啦!'+response.data.msg);
                  }

                })
            },
            initEcharts(){
                echartsInfo().then(response=>{
                    if(response.status===200 && !response.data.code){
                          let Data=response.data.data;
                          let  echart_legend=[
                              ['四上企业数增加值', '四上企业数减少值'],
                              ['四上企业营收总额增加值', '四上企业营收总额减少值'],
                              ['四上企业从业人数增加值', '四上企业从业人数减少值']
                          ];
                          let  echart_title=['四上企业数增减趋势','四上企业营收总额趋势','四上企业从业人数趋势'];

                          echart_option.echart1.legend.data=echart_legend[0];
                          echart_option.echart2.legend.data=echart_legend[1];
                          echart_option.echart3.legend.data=echart_legend[2];

                          echart_option.echart1.title.text=echart_title[0];
                          echart_option.echart2.title.text=echart_title[1];
                          echart_option.echart3.title.text=echart_title[2];
                          echart_option.echart1.xAxis.data=Data.new_count.map(item=>{
                             return item.name;
                           })
                        //    echart_option.echart1.tooltip.formatter="{b}<br/>{a} : {c}家<br/>{a1}:{c1}家 ";
                            echart_legend[0].map((item,index)=>{
                                  echart_option.echart1.series[index].name=item;
                            })
                           echart_option.echart1.series[0].data=Data.new_count.map(item=>{
                             return item.value;
                           })
                            echart_option.echart1.series[1].data=Data.loss_count.map(item=>{
                             return -(item.value);
                           })


                            echart_legend[1].map((item,index)=>{
                                  echart_option.echart2.series[index].name=item;
                            })
                           echart_option.echart2.xAxis.data=Data.new_bus_rev_amount.map(item=>{
                             return item.name;
                           })
                            // echart_option.echart2.tooltip.formatter="{b}<br/>{a} : {c}亿元<br/>{a1}:{c1}亿元 ";
                           echart_option.echart2.series[0].data=Data.new_bus_rev_amount.map(item=>{
                             return toDecimal(item.value/100000);
                           })
                            echart_option.echart2.series[1].data=Data.loss_bus_rev_amount.map(item=>{
                             return -toDecimal(item.value/100000);
                           })


                           echart_legend[2].map((item,index)=>{
                                  echart_option.echart3.series[index].name=item;
                            })
                           echart_option.echart3.xAxis.data=Data.new_emp_num.map(item=>{
                             return item.name;
                           })
                        //    echart_option.echart3.tooltip.formatter="{b}<br/>{a} : {c}人<br/>{a1}:{c1}人 ";
                           echart_option.echart3.series[0].data=Data.new_emp_num.map(item=>{
                             return item.value;
                           })
                            echart_option.echart3.series[1].data=Data.loss_emp_num.map(item=>{
                             return -(item.value);
                           })

                           let echart1 = echarts.init(document.getElementById('echart1'));
                           let echart2 = echarts.init(document.getElementById('echart2'));
                           let echart3 = echarts.init(document.getElementById('echart3'));

                            echart1.setOption(echart_option.echart1);
                            echart2.setOption(echart_option.echart2);
                            echart3.setOption(echart_option.echart3);


                            window.addEventListener('resize', function () {
                                echart1.resize();
                                echart2.resize();
                                echart3.resize();
                            });

                    }else{
                        this.$message.error('后台服务出错啦!'+response.data.msg);
                    }
                })
            }
        },
    }
</script>
<style>
  .page .target_title{
     /* font-family:"SimHei"; */
    text-align: center;
    color:#fff;
    font-size:20px;
  }
  .page .ivu-card-head{
      height:58px;
      padding:0;
      line-height: 63px;
      background:#7ab1d1;
  }
   .page .card-item{
    height:30%;
    margin-bottom:16px;
    border: 1px solid  #d7e7ec;
  }
  .page .ivu-card-body{
        padding:0;
  }
   .page .card-item h3{
      font-family:"Microsoft YaHei";
    color:#667285;
    font-size:26px;
    height:40px;
    line-height:40px;
    font-weight:bold;
   text-align: center;
  }
   .page .echarts_content{
      height:100%;
      padding:10px;
      padding-left:50px;
      background:#f6f6f6;
  }
   .page .item_echart{
    height:31%;
    padding:10px;
    margin-right:20px;
    margin-bottom:20px;
    background: #fff;
  }
   .page .detail{
    width:100%;
    padding-top:25px;
  }
   .page .detail .detail-item{
    width:30%;
    display: inline-block;
  }
  .page .cardinfo{
      height:100px;
    padding-top:35px;
    border-bottom: 1px solid  #d7e7ec;
  }
    .page .detail .detail-item .item-num{
        font-family:"Akzidenz-Grotesk BQ Condensed A";
      text-align: center;
      color: #7ab1d1;
      font-size: 20px;
  }
     .page  .detail .detail-item .item-title{
          color:#667285;
        /* font-family:"SimHei"; */
          font-size:10px;
          text-align: center;
  }
   .page .detail .detail-item .item-title-up{
         color:#667285;
         font-size:10px;
           /* font-family:"SimHei"; */
          text-align: center;
   }
    .page   .detail .detail-item .item-title-down{
        color:#667285;
          font-size:10px;
          /* font-family:"SimHei"; */
          text-align: center;
   }
</style>
