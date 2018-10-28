<template>
 <div class="login">
     <div class="loginbox">
            <h2>党建e家后台管理系统</h2>
        <el-form ref="ruleForm2" label-width="60px" label-position="left">
            <el-form-item label="用户名" prop="pass">
                <el-input type="username" v-model="formData.username"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="checkPass">
                <el-input type="password" v-model="formData.password" @keydown.enter.native="submitForm"></el-input>
            </el-form-item>
                <el-button type="primary" @click="submitForm" class="loginBtn" :loading="isLoading">登录</el-button>
        </el-form>
     </div>
 </div>
</template>

<script type="text/ecmascript-6">
export default {
data() {
return {
    formData:{
        username:"admin",
        password:"admin"
    },
    isLoading:false
}
},
methods: {
    submitForm(){
        this.isLoading = true
        this.$axios.post(`/user/login`,this.formData).then(res=>{
            if (res.code == 200) {
            this.isLoading = false
            this.$message.success(res.msg)
            setTimeout(() => {
                this.$router.push("/layout/index")
            }, 1000);
            }else{
                this.$message.error(res.msg)
                this.isLoading = false
            }
        }).catch(err=>{
            this.isLoading = false
        })
    }
}
}
</script>

<style scoped lang="scss">
.login{
    h2{
        text-align: center;
        font-weight: 400;
        margin-bottom: 32px;
    }
    overflow: hidden;
    height: 100vh;
    background-color: #2d3a4b;
.loginbox{
    width: 450px;
    height: 360px;
    background-color: #fff;
    margin:160px auto;
    box-sizing: border-box;
    padding:20px;
    border-radius: 8px;
}
}
/deep/ .loginBtn{
    width: 100%;
    margin-top: 40px;
    margin: 40px auto;
}
</style>
