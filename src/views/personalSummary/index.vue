<template>
 <div class="page">
        <el-card>
         <div slot="header">个人总结列表</div>
    <el-table :data="tableData"
    style="width: 100%"  border>
    <el-table-column  label="总结主题"  width="200" prop="pic.content"></el-table-column>
    <el-table-column  label="总结作者"  width="200" prop="userId.username"></el-table-column>
    <el-table-column  label="总结头图"  prop="img" width="300">
      <template slot-scope="scope" prop="common" >
        <img class="user-img" >
      </template>
    </el-table-column>
    <el-table-column  label="操作" width="180">
       <template slot-scope="scope">
        <el-button
          size="mini"
          type="primary"
          @click="handleEdit(scope.row._id)">编辑</el-button>
        <el-button
          size="mini"
          type="danger"
          @click="handleDelete(scope.row._id)">删除</el-button>
      </template>
    </el-table-column>

  </el-table>
     </el-card>
 </div>
</template>

<script type="text/ecmascript-6">
export default {
 data() {
 return {
     tableData:[]
 }
 },
 methods: {
     getpersonalSummary(){
         this.$axios.get(`/personalSummary/get`).then(res=>{
             if (res.code == 200) {
                this.tableData = res.data
                console.log(this.tableData)
         
             }else{
                 this.$message.info(res.msg)
             }
         })
     }
 },
 created () {
     this.getpersonalSummary()
 }
}
</script>

<style scoped lang="scss">
.user-img{
    width: 80px;
    height: 100px;
}
</style>
