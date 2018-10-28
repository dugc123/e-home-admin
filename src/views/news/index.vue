<template>
 <div class="page">
       <el-card>
         <div slot="header">新闻列表</div>
    <el-table
    :data="tableData"
    style="width: 100%"  border>
    <el-table-column  label="新闻标题"  width="320" prop="title"></el-table-column>
    <el-table-column  label="新闻作者"  width="200" prop="author.nickname"></el-table-column>
    <el-table-column  label="新闻头图"  prop="img" width="120">
      <template slot-scope="scope">
        <img :src="scope.row.img" class="user-img">
      </template>
    </el-table-column>
    <el-table-column  label="新闻分类" width="200" prop="type.label"></el-table-column>
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
     getData(){
         this.$axios.get('/news/get').then(res=>{
             if (res.code == 200) {
                 this.tableData = res.data
             }
         })
     },
     handleEdit(id){
          this.$router.push({name:"editNews",query:{id}})
     },
     handleDelete(id){
          this.$confirm('此操作将永久删除该新闻, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
            this.$axios.post(`/news/del/${id}`).then(res=>{
                this.$message.success(res.msg)
                this.getData()
         })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
     }
 },
 created () {
     this.getData()
 }
}
</script>

<style scoped lang="scss">
img{
    width: 80px;
    height: 100px;
}
</style>
