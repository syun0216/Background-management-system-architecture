<template>  
  <el-table  
    :data="data"  
    border  
    style="width: 100%"  
    :row-style="showTr">  
    <el-table-column v-for="(column, index) in columns" :key="column.dataIndex"  
      :label="column.text">  
      <template slot-scope="scope">  
        <span v-if="spaceIconShow(index)" v-for="(space, levelIndex) in scope.row._level" :key="levelIndex" class="ms-tree-space"></span>  
        <button class="button is-outlined is-primary is-small" style="border:none;outline:none" v-if="toggleIconShow(index,scope.row)" @click="toggle(scope.$index)">  
          <i v-if="!scope.row._expanded" class="el-icon-caret-right" aria-hidden="true"></i>  
          <i v-if="scope.row._expanded" class="el-icon-caret-bottom" aria-hidden="true"></i>  
        </button>  
        <span v-else-if="index===0" class="ms-tree-space"></span>  
        {{scope.row[column.dataIndex]}}  
      </template>  
    </el-table-column>  
    <el-table-column label="操作" v-if="treeType === 'normal'" width="260">  
      <template slot-scope="scope">  
        <el-button type="text" @click="emitEdit(scope.row)">编辑</el-button>
            <el-button type="text" @click="emitDelete(scope.row)" style="color:#ff5858">删除</el-button>
            <el-button type="text" @click="emitInfo(scope.row)" style="color:#25b8a9">权限详情</el-button>
      </template>  
    </el-table-column>  
  </el-table>  
</template>  
<script>
  import Utils from './index'
//  import Vue from 'vue'
  export default {
    name: 'tree-grid',
    props: {
    // 该属性是确认父组件传过来的数据是否已经是树形结构了，如果是，则不需要进行树形格式化
      treeStructure: {
        type: Boolean,
        default: function() {
          return false
        }
      },
      // 这是相应的字段展示
      columns: {
        type: Array,
        default: function() {
          return []
        }
      },
      // 这是数据源
      dataSource: {
        type: Array,
        default: function() {
          return []
        }
      },
      // 这个作用是根据自己需求来的，比如在操作中涉及相关按钮编辑，删除等，需要向服务端发送请求，则可以把url传过来
      requestUrl: {
        type: String,
        default: function() {
          return ''
        }
      },
      // 这个是是否展示操作列
      treeType: {
        type: String,
        default: function() {
          return 'normal'
        }
      },
      // 是否默认展开所有树
      defaultExpandAll: {
        type: Boolean,
        default: function() {
          return true
        }
      }
    },
    data() {
      return { newData: [] }
    },
    created() {
      this.dataFormat()
    },
    computed: {
    // 格式化数据源
      data: function() {
        const me = this
        if (me.treeStructure) {
          const data = Utils.MSDataTransfer.treeToArray(me.$props.dataSource, null, null, me.defaultExpandAll)
          // console.log(data)
          if (data.length > 0) {
            return data
          }
        }
        return me.$props.dataSource
      }
    },
    methods: {
    // 数据格式化
      dataFormat() {
        const me = this
        if (me.treeStructure) {
          const data = Utils.MSDataTransfer.treeToArray(me.$props.dataSource, null, null, me.defaultExpandAll)
          // console.log(data)
          this.newData = data
        }
        this.newData = me.$props.dataSource
      },
      // 显示行
      showTr: function(row, index) {
        const show = (row.row._parent ? (row.row._parent._expanded && row.row._parent._show) : true)
        // const show = row._expanded
        row.row._show = show
        // console.log(1111, row.row._expanded)
        // console.log(111, show)
        return show ? '' : 'display:none;'
      },
      // 展开下级
      toggle: function(trIndex) {
        // console.log(trIndex)
        const me = this
        const record = me.data[trIndex]
        // console.log(record)
        record._expanded = !record._expanded
      },
      // 显示层级关系的空格和图标
      spaceIconShow(index) {
        const me = this
        if (me.treeStructure && index === 0) {
          return true
        }
        return false
      },
      // 点击展开和关闭的时候，图标的切换
      toggleIconShow(index, record) {
        const me = this
        if (me.treeStructure && index === 0 && record.children && record.children.length > 0) {
          return true
        }
        return false
      },
      handleDelete() {
        this.$confirm('此操作将永久删除该记录, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'error'
        }).then(() => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
      },
      emitEdit(row) {
        this.$emit('emitEdit', row)
      },
      emitDelete(row) {
        this.$emit('emitDelete', row)
      },
      emitInfo(row) {
        this.$emit('emitInfo', row)
      }
      // handleCellClick(row, column, cell, event) {
      //   console.log('row', row)
      //   console.log('column', column)
      //   console.log('cell', cell)
      //   console.log('event', event)
      //   // if (column.label === 'ID') {
      //   //   this.toggle()
      //   // }
      // }
    }
  }
</script>  
<style scoped>  
  .ms-tree-space{position: relative;  
    top: 1px;  
    display: inline-block;  
    font-family: 'Glyphicons Halflings';  
    font-style: normal;  
    font-weight: 400;  
    line-height: 1;  
    width: 18px;  
    height: 14px;}  
  .ms-tree-space::before{content: ""}  
  table td{  
    line-height: 26px;  
  }  
</style>  