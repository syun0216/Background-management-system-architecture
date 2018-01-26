<template>
 <div class="menu-container">
   <el-dialog
    title="提示"
    :visible.sync="isModalEditShow"
    width="30%">
    <el-form ref="form" :rules="rules" label-position="left" :model="form" label-width="100px">
    <el-form-item label="菜单名称" prop="name">
      <el-input v-model="form.name" style="width:90%"></el-input>
    </el-form-item>
    <el-form-item label="路由名称" prop="path_temp">
      <el-input v-model="form.path_temp" style="width:90%"></el-input>
    </el-form-item>
    <el-form-item label="排序" prop="sort">
      <el-input v-model="form.sort" style="width:90%"></el-input>
    </el-form-item>
    <el-form-item label="菜单图标" prop="img">
      <el-input v-model="form.img" style="width:90%"></el-input>
    </el-form-item>
    <el-form-item label="权限类型">
      <el-radio-group v-model="form.shape">
        <el-radio label="nav">显示型权限菜单</el-radio>
        <el-radio label="button">隐藏型权限按钮</el-radio>
      </el-radio-group>
    </el-form-item>
    <el-form-item label="父级菜单">
      <el-cascader
      style="width:91%"
      :options="netMenu"
      change-on-select
      filterable
      @change="handleCascaderChange"
      placeholder="支持输入关键字搜索"
      v-model="form.parent_id">
    </el-cascader>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onSubmit" :class="{editBtn:isEdit}">{{submitBtn}}</el-button>
      <el-button @click="isModalEditShow = false">取消</el-button>
    </el-form-item>
    </el-form>
  </el-dialog>
  <el-dialog
    title="权限详情"
    :visible.sync="isModalPermissionShow"
    width="30%">
    <p v-for="(item,idx) in permissionData" :key="idx">{{item.user_name}}</p>
    <span slot="footer" class="dialog-footer">
      <el-button @click="isModalPermissionShow = false">取 消</el-button>
      <el-button type="primary" @click="isModalPermissionShow = false">确 定</el-button>
    </span>
  </el-dialog>

  <el-container>
    <el-header>
          <el-row>
            <el-col :offset="2" :span="8">
              <el-input
                placeholder="搜索菜单名称关键字"
                prefix-icon="el-icon-search"
                style="width:400px"
                clearable
                v-model="menuName">
              </el-input>
            </el-col>
          <el-button style="float:right" @click="openDialog('add')">新增菜单</el-button>   
          </el-row>
        </el-header>
    <!-- 表单  -->
      <tree-grid v-if="menuName===''" @emitEdit="handleEdit" @emitDelete="handleDelete" @emitInfo="handleInfo"
       :columns="menuTableHeaders" :tree-structure="true" :data-source="dataSource"></tree-grid>
      <el-table 
        v-else
        :data="menus"  
        border 
        height="900">

        <el-table-column 
          v-for="column in menuTableHeaders" :key="column.dataIndex" :prop="column.dataIndex" 
      :label="column.text">
        </el-table-column>

        <el-table-column
          fixed="right"
          label="操作"
          width="200">
          <template slot-scope="scope">
            <el-button type="text" @click="handleEdit(scope.row)">编辑</el-button>
            <el-button type="text" @click="handleDelete(scope.row)" style="color:#ff5858">删除</el-button>
            <el-button type="text" @click="handleInfo(scope.row)" style="color:#25b8a9">权限详情</el-button>
          </template>
        </el-table-column>

      </el-table>
  </el-container>
  </div>  
</template>

<script>
import { fetch_menu, fetchNetMenu, edit_menu, add_menu, delete_menu } from '@/api/navigation'
import { fetchPermission } from '@/api/permission'
import { user_name_filter } from '@/filters'
import TreeGrid from './components/TreeGrid.vue'

export default {
  data() {
    return {
      dataSource: [],
      menuTableHeaders: [
        // { text: '序号', dataIndex: 'index', editable: false },
        { text: 'ID', dataIndex: 'id', editable: false },
        { text: '菜单名称', dataIndex: 'name' },
        { text: '菜单icon', dataIndex: 'img' },
        { text: '路由', dataIndex: 'path_temp' },
        { text: '排序', dataIndex: 'sort' },
        { text: '菜单类型', dataIndex: 'shape' },
        { text: '创建时间', dataIndex: 'create_time', editable: false },
        { text: '更新时间', dataIndex: 'update_time', editable: false }
      ],
      isModalEditShow: false,
      isModalPermissionShow: false,
      menus: [],
      netMenu: [],
      allMenu: [],
      permissionData: [],
      menuName: '',
      form: {
        name: '',
        path_temp: '',
        sort: 50,
        img: '',
        level: 1, // 使用parent_Id数组的length代替
        shape: 'nav',
        parent_id: ['0']
      },
      rules: {
        name: [{ required: true, message: '请输入菜单名称' }],
        path_temp: [{ required: true, message: '请输入路由名称' }],
        sort: [{ required: true, message: '请输入排序' }]
        // img: [{ required: true, message: '请输入图片名称' }]
      },
      isEdit: false,
      submitBtn: '立即创建'
    }
  },
  components: {
    TreeGrid
  },
  created() {
    this.getMenu()
    this.getNetMenu()
  },
  methods: {
    init() {
      this.menus = []
      this.netMenu = []
      this.allMenu = []
      this.dataSource = []
    },
    initForm() {
      this.form = {
        name: '',
        path_temp: '',
        sort: 50,
        img: '',
        level: 1, // 使用parent_Id数组的length代替
        shape: 'nav',
        parent_id: ['0']
      }
    },
    getMenu() {
      this.init()
      fetch_menu().then(data => {
        if (data.data.length > 0) {
          this.menus = data.data
          this.$cLog('menus', this.menus)
          this.allMenu = data.data
        }
      })
    },
    getNetMenu() {
      fetchNetMenu().then(data => {
        this.dataSource = data.data
        const str = JSON.stringify(data.data).replace(/name/g, 'label').replace(/id/g, 'value')
        const arr = JSON.parse(str)
        arr.unshift({ label: '无父级菜单(一级)', value: '0' })
        this.netMenu = arr
        this.$cLog(this.netMenu)
      })
    },
    addMenu() {
      add_menu(this.form).then(data => {
        this.$message({
          type: 'success',
          message: '新增菜单成功'
        })
        this.getMenu()
        this.getNetMenu()
        this.isModalEditShow = false
      })
    },
    editMenu() {
      edit_menu(this.form.id, this.form).then(data => {
        this.$message({
          type: 'success',
          message: '编辑成功'
        })
        this.getMenu()
        this.getNetMenu()
        this.isModalEditShow = false
      })
    },
    onSubmit() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.isEdit ? this.editMenu() : this.addMenu()
        }
      })
    },
    resetForm() {
      if (typeof this.$refs.form === 'undefined') {
        return
      }
      this.$refs.form.resetFields()
    },
    handleEdit(row) {
      // this.$cLog(row)
      this.form = Object.assign(this.form, row)
      this.form.parent_id = []
      this.form.parent_id.push(row.parent_id)
      // this.$cLog('form', this.form)
      this.openDialog('edit')
    },
    handleDelete(row) {
      event.cancelBubble = true
      this.$confirm(`此操作将永久删除${row.name}该菜单, 是否继续?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        delete_menu(row.id).then(data => {
          this.$message({
            type: 'success',
            message: '删除成功'
          })
          this.getMenu()
          this.getNetMenu()
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    handleInfo(row) {
      this.$cLog(row)
      const user_id_arr = []
      const _condition = [{ 'type': '=', 'key': 'owner_class', 'value': 'personage' }, { 'type': '=', 'key': 'permission_class', 'value': row.shape }, { 'type': '=', 'key': 'permission_obj_id', 'value': row.id }]
      const params = {
        condition: JSON.stringify(_condition),
        page: 1,
        limit: 9999
      }
      fetchPermission(params).then(pdata => {
        // this.$cLog(pdata.data)
        // this.permissionData = []
        const callback = (data) => {
          pdata.data.forEach((val, idx) => {
            val.user_name = `${data[val.owner_id].nick}`
            this.permissionData.push(val)
          })
          // this.$cLog(data)
          // this.$cLog(this.permissionData)
        }
        pdata.data.forEach((val, idx) => {
          user_id_arr.push(val.owner_id)
        })
        if (user_id_arr.length > 0) {
          user_name_filter(user_id_arr, callback)
        } else {
          this.$message({
            type: 'warning',
            message: '该菜单还未配置权限'
          })
        }
      })
      this.isModalPermissionShow = true
    },
    handleCascaderChange(data) {
      this.$cLog(data)
    },
    filterName() {
      let _data = []
      this.menus = this.allMenu.slice()
      _data = this.menus.filter((val, idx) => {
        return val.name.indexOf(this.menuName) > -1
      })
      if (_data.length === 0) {
        this.menus = this.menuName === '' ? this.allMenu.slice() : _data
      } else {
        this.menus = _data
      }
    },
    openDialog(status) {
      this.isEdit = status === 'edit'
      this.submitBtn = this.isEdit ? '确认编辑' : '立即创建'
      if (!this.isEdit) {
        this.initForm()
        this.resetForm()
      }
      this.isModalEditShow = true
    }
  },
  watch: {
    menuName() {
      this.filterName()
    },
    isModalPermissionShow() {
      if (!this.isModalPermissionShow) {
        this.permissionData = []
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.menu-container{
  // height:100vh;
  .editBtn{
    background:#67c23a;
    border:1px solid #67c23a;
    &:hover{
      background:#86e258;
    border:1px solid #86e258
    }
  }
}
</style>
