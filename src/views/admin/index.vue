<template>
 <div class="page">
     <el-card>
         <div slot="header">管理员列表</div>
    <el-table
    :data="tableData"
    style="width: 100%"  border>
    <el-table-column  label="姓名"  width="137" prop="nickname"></el-table-column>
    <el-table-column  label="手机号" width="200" prop="phone"></el-table-column>
    <el-table-column  label="头像"  prop="avatar" width="120">
      <template slot-scope="scope">
        <img :src="scope.row.avatar" class="user-img">
      </template>
    </el-table-column>
    <el-table-column  label="性别" prop="sex" width="80"></el-table-column>
    <el-table-column  label="个性签名" width="320" prop="desc"></el-table-column>
    <el-table-column  label="操作" width="180">
       <template slot-scope="scope">
        <el-button
          size="mini"
          @click="handleEdit(scope.row._id)">编辑</el-button>
        <el-button
          size="mini"
          type="danger"
          @click="handleDelete(scope.row._id)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
    <el-pagination
    background
    layout="prev, pager, next"
    @current-change = "changePage"
    :page-size=3
    :total= 'count'>
  </el-pagination>
     </el-card>
 </div>
</template>

<script type="text/ecmascript-6">
export default {
 data() {
 return {
  tableData:[],
  count:0,
  page:1
 }
 },
 methods: {
   getUserList(){
this.$axios.get(`/user/getUserInfo`,{page:this.page,pageSize:3}).then(res=>{
  this.tableData = res.data
  this.count = res.count
})
   },
   handleEdit(){

   },
   handleDelete(id){
     this.$confirm('此操作将永久删除该管理员, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
            this.$axios.post(`/user/delete/${id}`).then(res=>{
          this.getUserList()
          this.$message.success(res.msg)
      })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
   },
   changePage(page){ //分页
    //  console.log(page)
    this.page = page
    this.getUserList()
     
   }
 },
 created () {
   this.getUserList()
 }
}
</script>

<style scoped lang="scss">
.user-img{
  width: 80px;
  height: 100px;
}
</style>
