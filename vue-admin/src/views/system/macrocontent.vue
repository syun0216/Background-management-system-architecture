<template>
    <div class="manage_container">
       <el-dialog
        title="添加模板"
        :visible.sync="dialog1"
        width="75%"
        top="10vh"
        >
        <newtemplate @emitTemplateName="getTemplateName"/>  
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialog1 = false">取 消</el-button>
          <el-button type="primary" @click="saveTemplate">确 定</el-button>
        </span>
      </el-dialog>
      <el-dialog
      title="提示"
      :visible.sync="dialog2"
      top="10vh"
      width="95%">
      <currentchoosedialog :isShow="dialog2" @emitContentId="getCurrentChooseId"/>  
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialog2 = false">取 消</el-button>
        <el-button type="primary" @click="addChart">使用</el-button>
      </span>
    </el-dialog>
        <!-- <v-loading v-show="loading"></v-loading> -->
    <el-container v-loading="fullscreenLoading" v-if="!isAdding">

      <el-header style="border-bottom:1px solid #eee;margin-bottom:10px">
          <h2 style="line-height:3rem;display:inline-block">宏观内容管理</h2>
          <el-button-group style="float:right;margin-top:5px">
          <el-button type="primary" icon="el-icon-tickets" @click="openModalPage">添加页面</el-button>
          <el-button type="primary" icon="el-icon-picture-outline" :disabled="templateData.length>3" @click="openModalTemplate">添加模板</el-button>
          <el-button type="success" icon="el-icon-edit-outline" @click="addCurrentChoose">配置{{current_page_name}}模板内容</el-button>
        </el-button-group>
      </el-header>
      <el-container>
        <el-aside width="300px" style="background-color: #fff;">
            <ul v-if='pageData!= null'>
                <li class='common-li' :class="{selected_item:key==current_idx}" @click='handleDetails(item,key)' v-for='(item,key) in pageData' :key='key'>{{item.page_name.length >14 ? item.page_name.substr(0,14)+'...' : item.page_name}}
                    <span class='common-icon' @click='handleDeletePage($event,item)'><Icon type="trash-a"></Icon></span>    
                    <span class='common-icon' @click='handleEditPage($event,item)'><Icon type="edit"></Icon></span>
                </li>
            </ul>
        </el-aside>
        <el-main>
            <h2>{{current_page_name}}页面图表</h2>
           <ul v-if='templateData.length>0'>
                <li class='common-t-li' v-for='(item,index) in templateData' :key='index'>
                    图表{{item.id}}
                    <el-button class='common-button common-margin' type="danger" @click="handleDeleteBlock(item)" plain>取消关注</el-button>
                </li>
            </ul>
            <p class='common-t-li' v-else>
                该页面暂未配置图表
            </p>
        </el-main>
      </el-container> 
    </el-container>
    <el-container v-else>
      <el-header>
        <h3 style="display:inline-block;font-size:35px;margin-top:2px;font-weight:300">{{current_page_name}}</h3><el-button style="float:right;margin-top:5px" type="primary" @click="isAdding = false"><i class="el-icon-download"></i>保存</el-button>
      </el-header>
      <instancetemplate v-for="(item,idx) in templatDataWithChart" :key="idx" :template="item.template_name" :canDelete='false' :totalData="item.children" :template_id="item.id" @handleAddChart="openChartDialog" @emitDeleteTemplate="deleteTemplate"/> 
    </el-container>
  </div>
    
</template>

<script>
import { Icon } from 'iview'
import { fetch_page, fetch_template, fetch_chart, edit_page_name, delete_page, delete_block, add_page, add_template, add_chart } from '@/api/run_situation'
import currentchoosedialog from '../myfocus/components/currentchoosedialog'
import newtemplate from '../myfocus/components/newtemplate'
import instancetemplate from '../myfocus/components/instancetemplate.vue'
import { getUid } from '@/utils/auth'
import { current_choose_filter } from '@/filters'

export default {
  data() {
    return {
      pageData: null,
      pageId: null,
      templateData: [],
      templateId: null,
      templateName: 'A',
      templatDataWithChart: [],
      chartData: [],
      currentChooseId: null,
      fullscreenLoading: false,
      current_idx: 0,
      current_page_name: null,
      dialog1: false,
      dialog2: false,
      isAdding: false
    }
  },
  components: {
    Icon,
    newtemplate,
    currentchoosedialog,
    instancetemplate
  },
  methods: {
    init() {
      // this.pageData = []
      this.templateData = []
      this.templatDataWithChart = []
    },
    getPage(idx) {
      this.pageData = []
      fetch_page().then((data) => {
        if (data.data.length > 0) {
          const _idx = typeof idx === 'undefined' ? 0 : idx
          this.pageData = data.data
          this.pageId = data.data[0].id
          this.current_idx = _idx
          this.current_page_name = data.data[_idx].page_name
          this.getTemplate(data.data[_idx].id)
        }
      })
    },
    getTemplate(id) {
      this.init()
      this.fullscreenLoading = true
      fetch_template(JSON.stringify([{ 'type': '=', 'key': 'page_id', 'value': id }])).then((data) => {
        data.data.forEach((val, idx) => {
          val.children = []
          this.templateData.push(val)
        })
        // this.$cLog('templateData', this.templateData)
        this.fullscreenLoading = false
      })
    },
    getChart(chartId) {
      const block_arr = []
      this.fullscreenLoading = true
      this.templateData.forEach((val, idx) => {
        if (block_arr.indexOf(val.id)) {
          block_arr.push(val.id)
        }
      })
      fetch_chart(JSON.stringify([{ 'type': 'in', 'key': 'block_id', 'value': block_arr }])).then(data => {
        this.chartData = data.data
        if (this.chartData.length > 0) {
          this.getCurrentChoose()
        } else {
          this.templatDataWithChart = this.templateData.slice()
          this.fullscreenLoading = false
        }
      })
    },
    getCurrentChoose() {
      const chart_id_arr = []
      const chart_obj = {}

      const callback = (data) => {
        this.$cLog(1111, data)
        this.chartData.forEach((val, idx) => {
          data.forEach((dval, didx) => {
            if (val.content_id === dval.id) {
              val.extra = dval
            }
          })
        })
        // this.templatDataWithChart = _data
        this.templateData.forEach((val, idx) => {
          this.chartData.forEach((dval, didx) => {
            if (val.id === dval.block_id) {
              val.children.push(dval)
            }
          })
        })
        this.templatDataWithChart = this.templateData
        this.fullscreenLoading = false
        this.$cLog('templateData', this.templateData)
        this.$cLog('templateDataWithChart', this.templatDataWithChart)
      }
      this.chartData.forEach((val, idx) => {
        // this.$cLog(val)
        if (chart_id_arr.indexOf(val.content_id) == -1) {
          chart_id_arr.push(val.content_id)
        }
        chart_obj[val.content_id] = val
      })
      current_choose_filter(chart_id_arr, callback)
      // this.$cLog(chart_id_arr)
    },
    addPage(name) {
      add_page(getUid(), name).then((data) => {
        // this.$cLog(data.data)
        // this.pageId = data.data.insert_id
        this.getPage()
      })
    },
    addTemplate() {
      add_template(this.pageId, this.templateName).then((data) => {
        // this.getPage()
        this.$message({
          message: '添加模板成功',
          type: 'success'
        })
        this.templateId = data.data.insert_id
        this.dialog1 = false
        this.getPage(this.current_idx)
        // this.$cLog(data.data)
      })
    },
    addChart() {
      // this.$cLog(this.templateId, this.currentChooseId, this.templateChildrenName)
      if (this.currentChooseId === null) {
        this.$message({
          message: '必须选择表格中的其中一项',
          type: 'error'
        })
        return
      }
      add_chart(this.templateId, this.currentChooseId, this.templateChildrenName).then(data => {
        this.$message({
          message: '添加图表成功',
          type: 'success'
        })
        this.dialog2 = false
        this.templatDataWithChart = []
        this.getChart()
      })
    },
    handleDetails(item, idx) {
      this.current_idx = idx
      this.current_page_name = item.page_name
      this.pageId = item.id
      //   this.templateData = null
      this.getTemplate(item.id)
    },
    handleDeletePage(e, item) {
      e.cancelBubble = true
      this.$confirm(`您确定删除${item.page_name}该页面吗?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        delete_page(item.id).then((data) => {
          this.getPage()
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    handleEditPage(e, item) {
      e.cancelBubble = true
      this.$prompt('请输入修改的名称', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputPattern: /\S/,
        inputErrorMessage: '名字不能为空',
        inputValue: item.page_name
      }).then(({ value }) => {
        edit_page_name(item.id, value).then(data => {
          this.$message({
            type: 'success',
            message: '修改成功'
          })
          this.getPage(this.current_idx)
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '取消输入'
        })
      })
    },
    handleDeleteBlock(item) {
      delete_block(item.id).then((data) => {
        this.getPage(this.current_idx)
        this.templateData = data.data
      })
    },
    openModalTemplate() {
      this.dialog1 = true
    },
    openModalPage() {
      this.$prompt('请输入页面名称', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputPattern: /\S/,
        inputErrorMessage: '名字不能为空'
      }).then(({ value }) => {
        this.addPage(value)
        this.$message({
          type: 'success',
          message: '添加成功'
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '取消输入'
        })
      })
    },
    openChartDialog(template_id, template_name) {
      this.currentChooseId = null // 重置currentChooseId
      this.templateId = template_id
      this.templateChildrenName = template_name
      this.dialog2 = true
      // this.$cLog('children', this.$children)
    },
    getTemplateName(name) {
      this.templateName = name
    },
    saveTemplate() {
      this.addTemplate()
    },
    getCurrentChooseId(id) {
      // this.$cLog(id)
      this.currentChooseId = id
    },
    addCurrentChoose(chartId) {
      if (this.templateData.length === 0) {
        this.$message({
          message: '请先添加模板',
          type: 'warning'
        })
        return
      }
      this.isAdding = true
      this.templatDataWithChart = []
      this.getChart(chartId)
    },
    deleteTemplate(id) {
      // this.$cLog(id)
      delete_block(id).then(data => {
        this.$message({
          type: 'success',
          message: '删除模板成功'
        })
        this.isAdding = false
        this.getPage(this.pageId)
      })
    }
  },
  mounted() {
    this.getPage()
  }
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
.manage_container{
    width:100%;
    border-bottom:1px solid #eee;
    .el-main{
      padding:0 10px;
      min-height: 100vh;
      overflow: auto;
    }
    .el-aside{
      min-height:600px;
      overflow:auto;  
      border-right:1px solid #eee
    }
    .common-li{
        height: 50px;
        border-bottom: 1px solid #eee;
        line-height: 50px;
        font-size: 1rem;
        margin: 0;
        background:#fff;
        transition: background 0.5s;
        text-align: left;
        padding-left:5px;
        
        &:last-child{
            border-bottom:none
        }
        &:hover{
            cursor: pointer;
        }
        
    }
    .common-icon,.common-button{
            float: right;
            margin:0 10px;
            i{
                font-size: 20px;
            }
        }
    .common-t-li{
        height: 50px;
        border-bottom: 1px solid #eee;
        line-height: 50px;
        font-size: 1rem;
        margin: 0;
        background:#fff;
        transition: background 0.5s;
        text-align: center;
    }
}
.common-margin{
        margin:4px 10px 0 !important;
    }
</style>
