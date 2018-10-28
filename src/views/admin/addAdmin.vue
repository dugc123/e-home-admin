<template>
 <div class="addAdmin">
     <el-card>
         <div slot="header">添加管理员</div>
        <el-form :model="formData" label-width="100px" label-position="left" :rules="rules">
            <el-form-item label="用户头像">
                <uploadAvatar v-model="formData.avatar"></uploadAvatar>
            </el-form-item>
            <el-form-item label="用户名" prop="username">
                <el-input v-model="formData.username"></el-input>
            </el-form-item>
            <el-form-item label="密码" required prop="password" :rules="[
            { required: true, message: '请输入密码', trigger: 'blur' },
            { min: 5, max: 8, message: '长度在 5 到 8 个字符', trigger: 'blur' }
          ]">
                <el-input v-model="formData.password" type="password"></el-input>
            </el-form-item>
            <el-form-item label="姓名">
                <el-input v-model="formData.nickname"></el-input>
            </el-form-item>
            <el-form-item label="联系方式">
                <el-input v-model="formData.phone"></el-input>
            </el-form-item>
            <el-form-item label="个性签名">
                <el-input v-model="formData.desc"></el-input>
            </el-form-item>
            <el-form-item label="性别">
                <el-select v-model="formData.sex" placeholder="请选择">
                    <el-option label="男" value="1"></el-option>
                    <el-option label="女" value="0"></el-option>
                </el-select>
            </el-form-item>
            <el-button type="primary" @click="handleSubmit">提交</el-button>
        </el-form>
    </el-card>
 </div>
</template>

<script type="text/ecmascript-6">
import uploadAvatar from "../../components/upload-img";
export default {
  data() {
    return {
      formData: {
        avatar: "",
        username: "",
        nickname: "",
        sex: "",
        password: "",
        phone: "",
        desc: "",
        job: ""
      },
      rules:{
           username: [
            { required: true, message: '请输入用户名', trigger: 'blur' },
            { min: 3, max: 8, message: '长度在 3 到 8 个字符', trigger: 'blur' }
          ],
      }
    };
  },
  methods: {
    handleSubmit() {
      this.$axios.post("/user/add", this.formData).then(res => {
        if (res.code == 200) {
          this.$message.success(res.msg);
          this.$router.push({name:"index"})
        } else {
          this.$message.info(res.msg);
        }
      });
    }
  },
  components: {
    uploadAvatar
  }
};
</script>

<style scoped lang="scss">
</style>
