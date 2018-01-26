<template>
  <div class="sidebar-container">
    <el-dialog title="资源数据视图" :visible.sync="dialog1" width="90%">
      <el-row :gutter="30">
        <div style="height:600px">
          <el-col :span="12"  v-if="dialog1" style="border-right:1px solid #ccc">
            <h2>旧视图</h2>
            <v-echartcommon v-if="data_value === 'macroData'" :id="form.id" :echartParams='form.params' :type="form.params.echartType" height="560px"></v-echartcommon>
            <indicators v-else-if="data_value === 'microData'" :search-condition="form.params"/>  
          </el-col>
          <el-col :span="12"  v-if="dialog1">
            <h2>新视图</h2>
            <v-echartcommon v-if="data_value === 'macroData'&&newForm !== null" :id="form.id+'new'" :echartParams='newForm' :type="newForm.echartType" height="560px"></v-echartcommon>
            <indicators v-else-if="data_value === 'microData'" :search-condition="JSON.parse(form.search_params)"/> 
          </el-col>
        </div>
      </el-row>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialog1 = false">取 消</el-button>
        <el-button type="primary" @click="updateData">更 新</el-button>
      </div>
    </el-dialog>
    <el-dialog title="修改资源" :visible.sync="dialog2" width="50%">
      <el-form ref="source_form" :model="source_form" label-width="80px">
        <el-form-item label="资源名称">
          <el-input v-model="source_form.nick"></el-input>
        </el-form-item>  
        <el-form-item label="资源说明">
          <el-input v-model="source_form.intro"></el-input>
        </el-form-item>  
        <el-form-item>
          <el-button type="primary" @click="onSubmit">确认修改</el-button>
          <el-button @click="dialog2 = false">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <el-container>
      <el-header>
        <el-row>
          <el-col :offset="4" :span="8">
            <el-input
              placeholder="搜索资源名称关键字"
              prefix-icon="el-icon-search"
              style="width:400px"
              clearable
              v-model="nick">
            </el-input>
          </el-col>
        </el-row>  
      </el-header>
      <!-- <el-container> -->
        <el-row>
          <div class="content-container">
            <el-col :span="4">
               <h5>选择菜单</h5>
                  <el-menu
                    :default-active="navData[0].children[0].name+navData[0].children[0].parent"
                    class="el-menu-vertical-demo">
                    <template v-for="(item,index) in navData">
                      <el-submenu :index="item.name" :key="index" v-if="item.children.length > 0">
                        <template slot='title'>{{item.label}}</template>  
                        <template v-for="(citem,cindex) in item.children">
                          <el-menu-item style="margin-left:20px" :index="citem.name+citem.parent" :key="cindex" @click="handleNavClick(citem)">{{citem.label}}</el-menu-item>  
                        </template>
                      </el-submenu>
                      <el-menu-item v-else :index="item.name" :key="index" @click="handleNavClick(item)">{{item.label}}</el-menu-item>
                    </template>  
                  </el-menu>
            </el-col>
            <el-col :span="20">
              <el-table
                  v-loading="loading"
                  ref="singleTable"
                  highlight-current-row
                  :data="datas"
                  @cell-click="handleCellClick"
                  border
                  style="width: 100%">
                  <el-table-column
                    type="index"
                    label="序号"
                    width="50px"
                    >
                  </el-table-column>
                  <el-table-column
                    prop="nick"
                    label="资源名称">
                    <template slot-scope="scope">
                      <i class="el-icon-edit"></i>
                      <span style="margin-left: 10px">{{ scope.row.nick }}</span>
                    </template>
                  </el-table-column>
                  <el-table-column
                    prop="intro"
                    label="资源说明">
                  </el-table-column>
                  <el-table-column
                    prop="update_time"
                    label="添加日期">
                  </el-table-column>
                  <el-table-column
                    prop="user_id"
                    label="添加人id">
                  </el-table-column>
                  <el-table-column
                    prop="user_name"
                    label="添加人信息">
                  </el-table-column>
                  <el-table-column
                    label="操作"
                    width="180">
                    <template slot-scope="scope">
                      <el-button @click="handleDelete(scope.row,$event)" type="text" size="small" style="color:#ff5858">删除</el-button>
                      <el-button type="text" size="small" v-if="activeName==='private'" @click="changeBelongType(scope.row,$event)">转为公有</el-button>
                      <el-button type="text" size="small" style="color:#6dc448" @click="updateModal(scope.row,$event)">更新数据</el-button>
                    </template>
                  </el-table-column>
                </el-table>
                 <el-pagination
                  @size-change="handleSizeChange"
                  @current-change="handleCurrentChange"
                  :page-sizes="[20, 30, 40]"
                  :page-size="100"
                  layout="total, sizes, prev, pager, next, jumper"
                  :total="allCount">
                </el-pagination>
                </el-pagination>
            </el-col>
          </div>
        </el-row>  
      <!-- </el-container> -->

    </el-container>
  </div>
</template>
<script>
import {
  fetch_current_choose,
  fetch_public_current_choose,
  delete_current_choose,
  change_belong_type,
  change_current_choose_name,
  refresh_current_choose
} from '@/api/current_choose'
import { getUid } from '@/utils/auth'
import { user_name_filter } from '@/filters'
import { raw_data_to_echart } from './data/handle_macro_content_data'
import indicators from '@/components/microIndicators/indicators.vue'
export default {
  data() {
    return {
      navData: [
        {
          label: '我的资源',
          name: 'private',
          children: [
            { label: '宏观数据', name: 'macroData', parent: 'private' },
            { label: '微观数据', name: 'microData', parent: 'private' }
          ]
        },
        {
          label: '公有资源',
          name: 'public',
          children: [
            { label: '宏观数据', name: 'macroData', parent: 'public' },
            { label: '微观数据', name: 'microData', parent: 'public' }
          ]
        }
      ],
      data_value: 'macroData',
      datas: [],
      allCount: null,
      pageParams: {
        page: 1,
        limit: '20'
      },
      addData: [],
      user_id_arr: [],
      activeName: 'private', // 菜单active项
      loading: false,
      dialog1: false, // 更新视图数据dialog
      dialog2: false, // 更新资源名称和资源说明
      form: {
        // 更新数据表单
        nick: '',
        intro: '',
        update_time: '',
        user_id: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      },
      newForm: null,
      formLabelWidth: '120px',
      nick: '',
      source_form: {
        nick: '',
        intro: ''
      }
    }
  },
  methods: {
    init() {
      this.datas = []
      this.allData = []
      this.user_id_arr = []
    },
    // api
    getPrivateCurrentChoose() {
      this.loading = true
      this.init()
      const _condition = [
        { type: '=', key: 'data_value', value: this.data_value },
        { type: '=', key: 'be_used_to', value: 'my_interest' },
        { type: '=', key: 'belong_type', value: 'private' }
      ]
      fetch_current_choose(
        JSON.stringify(_condition),
        this.pageParams.page,
        this.pageParams.limit
      ).then(data => {
        this.allCount = data.count
        this.handleCommonApiCallBack(data)
      })
    },
    getPublicCurrentChoose() {
      this.loading = true
      this.init()
      const _condition = [
        { type: '=', key: 'data_value', value: this.data_value },
        { type: '=', key: 'be_used_to', value: 'my_interest' },
        { type: '=', key: 'belong_type', value: 'public' }
      ]
      fetch_public_current_choose(
        JSON.stringify(_condition),
        this.pageParams.page,
        this.pageParams.limit
      ).then(data => {
        this.handleCommonApiCallBack(data)
      })
    },
    updateCurrentChooseCache(data) {
      const current_choose_obj = {}
      data.data.forEach((val, idx) => {
        val.params = JSON.parse(val.parameter)
        current_choose_obj[val.id] = val
      })
      this.$store.dispatch('addCurrentChooseData', { current_choose_data: current_choose_obj })
    },
    handleDelete(row, event) {
      event.cancelBubble = true
      this.$confirm(`此操作将永久删除${row.nick}该视图, 是否继续?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          delete_current_choose(getUid(), row.id).then(data => {
            this.$message({
              message: '删除成功',
              type: 'success'
            })
            this.activeName === 'private'
              ? this.getPrivateCurrentChoose()
              : this.getPublicCurrentChoose()
          })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    },
    changeBelongType(row, event) {
      event.cancelBubble = true
      change_belong_type(getUid(), row.id, 'public').then(data => {
        this.$message({
          type: 'success',
          message: '修改成功'
        })
        this.getPrivateCurrentChoose()
      })
    },
    // common function
    handleNavClick(item) {
      this.$cLog(item)
      this.activeName = item.parent
      this.data_value = item.name
      if (this.activeName === 'private') {
        this.getPrivateCurrentChoose()
      } else {
        this.getPublicCurrentChoose()
      }
    },
    handleCellClick(row, column, cell, event) {
      // this.$cLog('row', row)
      // this.$cLog('column', column)
      // this.$cLog('cell', cell)
      // this.$cLog('event', event)
      // event.cancelBubble = true
      if (column.label === '资源名称') {
        this.dialog2 = true
        this.source_form = Object.assign(this.source_form, row)
      }
    },
    onSubmit() {
      change_current_choose_name(
        this.source_form.id,
        this.source_form.nick,
        this.source_form.intro
      ).then(data => {
        this.dialog2 = false
        this.$message({
          type: 'success',
          message: '修改成功'
        })
        this.activeName === 'private'
          ? this.getPrivateCurrentChoose()
          : this.getPublicCurrentChoose()
      })
    },
    handleCommonApiCallBack(data) {
      // 处理相同逻辑的api
      this.loading = false
      this.updateCurrentChooseCache(data)
      if (data.data.length > 0) {
        const _data = []
        data.data.forEach((val, idx) => {
          if (this.user_id_arr.indexOf(val.user_id) === -1) {
            this.user_id_arr.push(val.user_id)
          }
          // val.intro = '不含增速数据'
          _data.push(val)
        })
        const callback = data => {
          _data.forEach((val, idx) => {
            val.user_name = `${data[val.user_id].name}/${data[val.user_id]
              .phone}`
            this.datas.push(val)
            this.allData.push(val)
          })
          // this.$cLog(data)
        }
        user_name_filter(this.user_id_arr, callback)
      }
    },
    updateModal(row, event) {
      // 更新视图数据
      this.$cLog(row)
      if (this.data_value === 'macroData') {
        const callback = data => {
          this.$cLog(data)
          this.newForm = data
        }
        raw_data_to_echart(JSON.parse(row.search_params), callback)
      }
      row.params = JSON.parse(row.parameter)
      this.form = Object.assign(row)
      // console.table(this.form)
      event.cancelBubble = true
      this.dialog1 = true
    },
    filterName() {
      let _data = []
      this.datas = this.allData.slice()
      _data = this.datas.filter((val, idx) => {
        return val.nick.indexOf(this.nick) > -1
      })
      if (_data.length === 0) {
        this.datas = this.nick === '' ? this.allData.slice() : _data
      } else {
        this.datas = _data
      }
    },
    updateData() {
      if (this.data_value === 'macroData') {
        refresh_current_choose(
          this.form.id,
          JSON.stringify(this.newForm)
        ).then(data => {
          this.dialog1 = false
          this.activeName === 'private'
            ? this.getPrivateCurrentChoose()
            : this.getPublicCurrentChoose()
          this.$message({
            type: 'success',
            message: '更新数据成功'
          })
        })
      }
    },
    handleCurrentChange(val) {
      this.$cLog(val)
      this.pageParams.page = val
      if (this.activeName === 'private') {
        this.getPrivateCurrentChoose()
      } else {
        this.getPublicCurrentChoose()
      }
    },
    handleSizeChange(val) {
      this.$cLog(val)
      this.pageParams.limit = val
      if (this.activeName === 'private') {
        this.getPrivateCurrentChoose()
      } else {
        this.getPublicCurrentChoose()
      }
    }
  },
  components: {
    indicators
  },
  watch: {
    activeName() {
      this.$cLog(this.activeName)
    },
    nick() {
      this.filterName()
    },
    dialog1() {
      if (!this.dialog1) {
        this.newForm = null
      }
    }
  },
  created() {
    this.getPrivateCurrentChoose()
  }
}
</script>
<style lang="scss" scoped>
.el-header {
  padding: 0;
}
.content-container {
  width: 100%;
  .el-col {
    height: 100vh;
    border-right: 1px solid;
    overflow: auto;
  }
}
</style>
