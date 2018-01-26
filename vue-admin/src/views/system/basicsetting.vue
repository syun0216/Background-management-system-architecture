<template>
 <div style="width:100%;height:100vh">This is {{name}}</div>  
</template>

<script>
  export default {
    methods: {
      deleteRow(index, rows) {
        rows.splice(index, 1)
      }
    },
    data() {
      return {
        name: '基础数据设置'
      }
    }
  }
</script>