<template>
 <div class="page">
     <el-card class="header">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/index' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item><a href="/">活动管理</a></el-breadcrumb-item>
        <el-breadcrumb-item>活动列表</el-breadcrumb-item>
        <el-breadcrumb-item>活动详情</el-breadcrumb-item>
        </el-breadcrumb>
        <!-- <el-dropdown> -->
  <!-- <span class="el-dropdown-link">
    下拉菜单<i class="el-icon-arrow-down el-icon--right"></i>
  </span>
  <el-dropdown-menu slot="dropdown">
    <el-dropdown-item>黄金糕</el-dropdown-item>
    <el-dropdown-item>狮子头</el-dropdown-item>
  </el-dropdown-menu> -->
<!-- </el-dropdown> -->
     </el-card>
 </div>
</template>

<script type="text/ecmascript-6">
export default {
 data() {
 return {

 }
 },
 components: {

 }
}
</script>

<style scoped lang="scss">
/deep/ .el-dropdown-selfdefine{
    float: right;
    cursor: pointer;
}
</style>
