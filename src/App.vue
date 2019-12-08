<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>

export default {
  name: 'App',
  comments:{
  }
}
</script>

<style>
body{
  margin:0;
}
p{
  margin:0;
}
a{
  text-decoration: none;
}
ul{
  padding-inline-start:0;
}
.el-icon-arrow-right{
  color: black;
  font-weight: 800;
}
.el-pagination__total{
    color: white;
}
.el-pagination__jump{
    color: white;
}
.CodeMirror {
border: 1px solid #eee;
height:350px!important;
margin-top: 20px;
}
.el-table__empty-text{
  font-size: 20px;
  color:black;
}
 .el-menu--horizontal{
      border-bottom: none!important;
    }
</style>
