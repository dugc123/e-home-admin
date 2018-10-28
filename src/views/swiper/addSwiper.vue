<template>
 <div class="addSwiper">
  <el-card>
         <div slot="header">添加轮播图</div>
        <el-form :model="formData" label-width="100px" label-position="left">
            <el-form-item label="轮播图标题" prop="title" required>
                <el-input v-model="formData.title"></el-input>
            </el-form-item>
            <el-form-item label="轮播图" prop="img" required>
                <upload-img v-model="formData.img"></upload-img>
            </el-form-item>
            <el-form-item label="新闻" required>
                <el-select v-model="formData.url"> 
                    <el-option v-for="(item,index) in news" :key="index" :label="item.title" :value="item._id"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="轮播图排序">  
                <el-input-number v-model="formData.sort" :min="1"></el-input-number>
            </el-form-item>
            <el-form-item label="是否显示">  
                <el-switch
                    style="display: block"
                    v-model="formData.isShow"
                    active-color="#13ce66"
                    inactive-color="#ff4949"
                    active-text="显示"
                    inactive-text="不显示"
                    :active-value="1"
                    :inactive-value="0">
                </el-switch>
            </el-form-item>
            <el-button type="primary" @click="handleSubmit" v-if="!isEdit">提交</el-button>
            <el-button type="danger" @click="handleSave" v-else>保存更改</el-button>
        </el-form>
    </el-card>
 </div>
</template>

<script type="text/ecmascript-6">
import uploadImg from "../../components/upload-img";

export default {
 data() {
 return {
        formData:{
            title:"",img:"",url:"",isShow:1,sort:"",newsId:""
        },
        news:[],
        isEdit:false
}
},
methods: {
    getData(){
        this.$axios.get('/news/get').then(res=>{
            if (res.code == 200) {
                this.news = res.data
            }
        })
    },
    handleSubmit(){
        this.$axios.post(`/slider/add`,this.formData).then(res=>{
            if (res.code == 200) {
                this.$message.success(res.msg)
                this.$router.push({name:"swiper"})
            }else{
                this.$message.error(res.msg)
            }
        })
    },
    getEditData(){
        const  id = this.$route.query.id
        this.$axios.get(`/slider/get/${id}`).then(res=>{
            if (res.code == 200) {
                this.formData = res.data
            }
        })
    },
    handleSave(){
        const {id} = this.$route.query
        this.$axios.post(`/slider/update/${id}`,this.formData).then(res=>{
            if (res.code == 200) {
                this.$message.success(res.msg)
                this.$router.push({name:"swiper"})
            }else{
                this.$message.error(res.msg)
            }
        })
    }
},
components: {
    uploadImg
 }, 
 watch: {
    $route(to,from){
        if (to.name == 'editSwiper') {
            this.isEdit = true
        }else{
            this.isEdit = false
            this.formData={ title:"",img:"",url:"",isShow:1,sort:"",newsId:""}
        }
    }  
},
created () {
    this.getData()
    if (this.$route.name == 'editSwiper') {  //判断是否点击编辑跳转到编辑页面
        this.isEdit = true
    }else{
        this.isEdit = false
    }

    if (this.isEdit) {
        this.getEditData()
    }
}
}
</script>

<style scoped lang="scss">
/deep/ .el-switch{
    margin-top: 8px;
}
</style>
