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
</style>
