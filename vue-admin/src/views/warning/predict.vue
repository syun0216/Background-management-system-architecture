<template>
      <div class="page">
          <Row style="height:100%;">
                <i-col span="10" style="padding-right: 40px;">
                      <div class="search">
                            <label class="search-label">行业：</label>
                          <template v-for="(item,index) in industry_items">
                                    <i-button type="text" @click="initInfo(item,index)" :class="{'active':index==active_index}">{{item.sort}}</i-button>
                          </template>
                              <!-- <Input v-model="search_industry"  placeholder="行业搜索" style="width: 200px"></Input>
                              <Button type="text"  @click="searchInfo"><Icon type="ios-search-strong"   size="26" color="#000" style="vertical-align:middle;cursor: pointer;"></Icon></Button> -->
                        </div>
                        <Tabs value="increse" @on-click="tabchange">
                              <TabPane label="人数增加Top50" name="increse">
                                      <i-table   :columns="columns" :data="data" @on-row-click="companyEchart" highlight-row  disabled-hover :row-class-name="rowClassName"></i-table>
                                        <div class="pagelist">
                                                <Page :total="total"  show-total  :page-size="pageSize" :current="initpage"  @on-change="changepage"></Page>
                                        </div>
                              </TabPane>
                            <TabPane label="人数减少Top50" name="reduce">
                                       <i-table   :columns="columns" :data="data" @on-row-click="companyEchart" highlight-row  disabled-hover :row-class-name="rowClassName"></i-table>
                                        <div class="pagelist">
                                                <Page :total="total"  show-total  :page-size="pageSize"  :current="initpage"  @on-change="changepage"></Page>
                                        </div>
                            </TabPane>
                        </Tabs>
                </i-col>
                <i-col span="14" style="height:870px;background:#f6f6f6;">
                    <div style="width:100%;height:50%;position: relative;margin-top:180px;" id="company_echart">
                    </div>
                </i-col>
          </Row>
      </div>
</template>
<script>
    import { getCompanyEmploy,getCompanyEmployTrend } from '@/api/warn/companynum';
    // import { Row,Col,Tabs,TabPane,Icon,Table,Page,Button} from 'iview'
    const echarts = require('echarts');
    const  option= {
            title: {
                left: 'center',
            },
            tooltip: {
                trigger: 'axis',
                axisPointer: { // 坐标轴指示器，坐标轴触发有效
                    type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
                }
            },
            legend: {
                top: '30px'
            },
            grid: {
                  left: '3%',
                    right: '4%',
                    bottom: '3%',
                containLabel: true
            },
            //设置坐标轴
            xAxis: {
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
            yAxis: [{
                type: 'value',
                nameTextStyle:{
                    align:'right'
                },
                splitLine: {
                    show: false
                }
            }, {
                type: 'value',
                nameTextStyle:{
                    align:'right'
                },
                splitLine: {
                    show: false
                }
            }],
            series: [{
                type: "bar",
                region: [],
                barGap: '20%',
                barCategoryGap: '40%',
                barWidth : 30,
                itemStyle: {
                    emphasis: {
                        barBorderRadius: 7
                    },
                    normal: {
                        color:"#00aeef",
                        barBorderRadius: 7
                    }
                }
            }, {
                type: "line",
                yAxisIndex: 1,
                region: [],
                barGap: '20%',
                barCategoryGap: '40%',
                //设置柱子的宽度
                    barWidth : 30,
                //配置样式
                itemStyle: {
                    normal:{
                        color:"#98f296",
                        barBorderRadius: 7
                    },
                    //鼠标悬停时：
                    emphasis: {
                            barBorderRadius: 7,
                            shadowBlur: 10,
                            shadowOffsetX: 0,
                            shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                },
            }],
        };
    export default {
      name:"companynum",
      components:{
          // Row,Col,Tabs,Icon,Table,Page,TabPane,Button
      },
      data() {
            return {
               industry:"",
               default_color:true,
               active_index:"0" ,
                search_industry:"",
                total: 50,
                tabname:"increse",
                pageSize:15,
                totalData:[],
                initpage:1,
                listLoading: false,
                industry_items :[
  　　　　　{sort: '不限', code: ''},
  　　　　　{sort: '服务业', code: "F"},
  　　　　　{sort: '批发与零售', code: "E"}
  　　　　],
                columns: [
                    {
                        title: '排名',
                        key: 'index',
                         width: 60,
                    },
                    {
                        title: '名称',
                        key: 'org_name'
                    },
                    {
                        title: '上期人数',
                        key: 'emp_num_bef'
                    },
                     {
                        title: '当期人数',
                        key: 'emp_num'
                    },
                     {
                        title: '差额',
                        key: 'emp_num_diff'
                    }
                ],
                data: []
            }
      },
      mounted: function () {
          this.init();
      },
      methods: {
          init(){
            let data={
               sort:this.tabname,
               industry_code:this.industry
            };
              getCompanyEmploy(data).then(response=>{
                      if(response.status===200 && !response.data.code){
                           this.totalData=response.data.data.map((item,index)=>{
                                  item.index=index+1;
                                  return  item;
                            });
                             this.data= this.totalData.slice(0,this.pageSize);
                             this.companyEchart(this.data[0]);
                      }else{
                          this.$Loading.error();
                          this.$Message.error('后台服务出错啦!'+response.data.msg);
                      }
              })
          },
          changepage(page){
                this.initpage=page;
                let start=(page-1)*this.pageSize;
                this.data= this.totalData.slice(start,start+this.pageSize);
                   this.default_color=true;
                 this.companyEchart(this.data[0]);
            },
            initInfo(item,index){
                this.active_index=index;
                this.default_color=true;
                this.industry=item.code;
                this.init();
            },
          searchInfo(){
                this.industry=this.search_industry;
                this.default_color=true;
                this.init();
          },
          tabchange(val){
              this.initpage=1;
              this.tabname=val;
                this.default_color=true;
              this.init(val);
          },
           rowClassName (row, index) {
                if (index === 0 && this.default_color) {
                    return 'demo-table-info-row';
                }
                return '';
            },
          companyEchart(row){
            if(row.index!=1&& row.index!=16 && row.index!=31 && row.index!=46){
                this.default_color=false;
            }
            let data={
                id:row.org_id
            };
            getCompanyEmployTrend(data).then(response=>{
                      if(response.status===200 && !response.data.code){
                        let Data=response.data.data;
                        let unit=[],legendData=[],flaglength=0;
                        for (let item in Data){
                             let dataSet = [],xAxis=[];
                             legendData.push(Data[item].title);
                            //  unit.push(Data[item].unit);
                             flaglength=Data[item].data.length;
                            Data[item].data.map((key,idx)=>{
                                xAxis.push(key.name);
                                let num=key.num==null?0:key.num
                                dataSet.push(num);
                            })
                              option.xAxis.data=xAxis;
                            if(item=="amount"){
                                option.series[0].name=Data[item].title;
                                option.yAxis[0].name=Data[item].title+"("+Data[item].unit+")";
                                option.series[0].data=dataSet;
                                unit.push(Data[item].unit);
                            }else if(item=="emp"){
                                option.series[1].name=Data[item].title;
                                option.yAxis[1].name=Data[item].title+"("+Data[item].unit+")";
                                option.series[1].data=dataSet;
                                 unit.push(Data[item].unit);
                            }
                        }

                            option.legend.data=legendData;
                            option.title.text=row.org_name;
                            if(flaglength>6){
                                  let start=100- parseInt(5/flaglength*100);
                                    option.dataZoom= {
                                        orient: 'horizontal',
                                        show: true,
                                        realtime: true,
                                        start: start,
                                        end:100
                                    };
                                }

                            // unit=unit.reverse();
                            // if(unit[1]!=""){
                            //     option.tooltip.formatter = '{b}<br />{a0}: {c0} ' + unit[0] + '<br>{a1}:{c1}' + unit[1];
                            // }else{
                            //     option.tooltip.formatter = '{b}<br />{a0}: {c0} ' + unit[0];
                            // }
                            let Echart_Charts = echarts.init(document.getElementById('company_echart'));
                            Echart_Charts.setOption(option);
                            window.addEventListener('resize', function () {
                                Echart_Charts.resize();
                            });
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
.page{
  padding:10px;
  height:100%;
}
.page .search{
  margin-bottom:30px;
}
.page .search button{
  font-size:16px;
  padding:0 5px;
}
.page .search-label{
   color:#000;
    font-size:16px;
   font-weight: bold;
   vertical-align: middle;
 }
.page .search .active span{
    background: #2d8cf0;
    color: #fff;
}
 .page .search-input{
    margin-top:12px;
    padding-left:60px;
    margin-bottom:30px;
  }

  .page  .pagelist{
      margin-top: 15px;
      text-align: right;
    }

   .page .ivu-table-row{
       cursor: pointer;
   }
    .page .ivu-table-row-highlight td{
        background-color: #cbeaff;
    }

   .page .ivu-table .demo-table-info-row td{
        background-color: #cbeaff;
    }
</style>
