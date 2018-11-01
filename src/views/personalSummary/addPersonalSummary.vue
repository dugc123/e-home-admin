<template>
 <div class="page">
     <el-card>
         <div slot="header">添加总结</div>
           <el-form :model="formData" label-width="100px" label-position="left">
            <el-form-item label="总结主题" prop="title" required>
                <el-select v-model="formData.pic"> 
                    <el-option v-for="(item,index) in pics" :key="index" :label="item.content" :value="item._id"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="作者" prop="author" required>
                <el-select v-model="formData.userId"> 
                    <el-option v-for="(item,index) in users" :key="index" :label="item.nickname" :value="item._id"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="总结头图" prop="img" required>
                <div class="img-wrap">
                    <!-- <img :src="item" v-for="(item,index) in formData.common" :key="index" v-if="item" class="header-img"> -->
                    <upload-img-list @change = "getImgUrl"></upload-img-list>
                </div>
            </el-form-item>
            <el-button type="primary" @click="handleSubmit">提交</el-button>
        </el-form>
     </el-card>
 </div>
</template>

<script type="text/ecmascript-6">
import uploadImgList from "../../components/upload-img-list";

export default {
data() {
return {
    formData:{
        pic:"",
        discussId:"",
        userId:"",
        common:[],
        page:1,
        pageSize:10
    },
    pics:[],
    users:[]
}
},
methods: {
    getPics(){
        this.$axios.get(`/topic/get`).then(res=>{
            if (res.code == 200) {
                this.pics = res.data
            }
        })
    },
        getUser(){
    this.$axios.get(`/user/getUserInfo`,this.formData).then(res=>{
        if (res.code == 200) {
        this.users = res.data               
        }
    })
    },
    getImgUrl(params){
        this.formData.common.push(params)
    },
    handleSubmit(){
        this.formData.discussId = localStorage.token
        this.$axios.post("/personalSummary/add",this.formData).then(res=>{
            if (res.code == 200) {
                this.$message.success(res.msg)
                this.$router.push("/layout/personalSummary")
            }else{
                this.$message.info(res.msg)
            }
        })
    }
},
components: {
    uploadImgList
 }, 
created () {
    this.getPics()
    this.getUser()
}
}
</script>

<style scoped lang="scss">
.el-upload--text{
    float: left;
}
.header-img{
        width: 178px;
        height: 178px;
        border-radius: 6px;
}
</style>
