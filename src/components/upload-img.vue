<template>
    <div class="page">
        <el-upload
            class="avatar-uploader"
            action="https://upload-z1.qiniup.com"
            :show-file-list="false"
            :on-success="handleSuccess"
            :data="formData"
        >
    <img v-if="imageUrl" :src="imageUrl" class="avatar">
    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
    </el-upload>
    </div>
</template>

<script type="text/ecmascript-6">
import axios from "axios"
export default {
    props:{   
        value:String
    },
    data() {
        return {
            formData:{
                token:""
            },
            imageUrl:this.value
        }
    },
    methods: {
        getToken(){
            axios.get('http://upload.yaojunrong.com/getToken').then(res=>{
                if (res.data.code == 200) {
                    this.formData.token = res.data.data
                    localStorage.setItem("token",res.data.data)
                }
            })
        },
        handleSuccess(res){
            this.imageUrl = res.url
            this.$emit("input",this.imageUrl)
        }
    },watch: {
        value(val){  //监听从父组件传过来的值，并赋值给imageUrl
            this.imageUrl = val
        }
    },created () {
        this.getToken()
    }
}
</script>

<style scoped lang="scss">
 /deep/ .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    }
    /deep/ .avatar-uploader .el-upload:hover {
        border-color: #409EFF;
    }
    /deep/ .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 178px;
        height: 178px;
        line-height: 178px;
        text-align: center;
    }
    /deep/ .avatar {
        width: 178px;
        height: 178px;
        display: block;
    }
</style>
