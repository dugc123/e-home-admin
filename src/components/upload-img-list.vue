<template>
 <div class="page">
     <el-upload
        action="https://upload-z1.qiniup.com"
        list-type="picture-card"
        :on-preview="handlePictureCardPreview"
        :on-remove="handleRemove"
        :on-success="handleSuccess"
        :data = 'formData'>
    <i class="el-icon-plus"></i>
    </el-upload>
    <el-dialog :visible.sync="dialogVisible">
    <img width="100%" :src="dialogImageUrl">
    </el-dialog>
 </div>
</template>

<script type="text/ecmascript-6">
import axios from "axios"
export default {
 data() {
 return {
        dialogImageUrl: '',
        dialogVisible: false,
        formData:{
            token:""
        }
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
      handleRemove(file, fileList) {
        // console.log(file);
      },
      handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
      },
      handleSuccess(res, file, fileList){
            this.$emit("change",res.url)
            // console.log(res.url)
            
      }
 },
 created () {
     this.getToken()
 }
}
</script>

<style scoped lang="scss">
</style>
