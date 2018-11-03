<template>
 <div class="addNews">
    <el-card>
        <div slot="header">添加新闻</div>
        <el-form :model="formData" label-width="100px" label-position="left">
            <el-form-item label="新闻标题" prop="title" required>
                <el-input v-model="formData.title"></el-input>
            </el-form-item>
            <el-form-item label="作者" prop="author" required>
                <el-select v-model="formData.author"> 
                    <el-option v-for="(item,index) in users" :key="index" :label="item.nickname" :value="item._id"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="新闻头图" prop="img" required>
                <upload-img v-model="formData.img"></upload-img>
            </el-form-item>
            <el-form-item label="新闻分类" required>
                <el-select v-model="formData.type"> 
                    <el-option v-for="(item,index) in types" :key="index" :label="item.label" :value="item._id"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="新闻内容" required>
                <quill-editor v-model="formData.content"
                    ref="myQuillEditor"
                    :options="editorOption"
                    @change="onEditorChange($event)">
                </quill-editor>
            </el-form-item>
            <el-button type="primary" @click="handleSubmit" v-if="!isEdit">提交</el-button>
            <el-button type="danger" @click="handleSave" v-else>保存更改</el-button>
        </el-form>
    </el-card>
 </div>
</template>

<script type="text/ecmascript-6">
    import uploadImg from "../../components/upload-img";
    import axios from "axios"
    import {quillEditor, Quill} from 'vue-quill-editor'
    import {container, ImageExtend, QuillWatch} from 'quill-image-extend-module'

    Quill.register('modules/ImageExtend', ImageExtend)
    import 'quill/dist/quill.core.css'
    import 'quill/dist/quill.snow.css'
    import 'quill/dist/quill.bubble.css'

    export default {
    data() {
    return {
        isEdit:false,
        formData:{
            title:"",type:"",img:"",
            content:"",contentText:"",author:"" //contentText非富文本字体
        },
        users:[],
        types:[],
        token:"",
        editorOption:{
            modules: {
                ImageExtend: {
                loading: true,
                name: 'file',
                action: 'https://upload-z1.qiniup.com',
                response: (res) => {
                return res.url
                },
                change: (xhr, formData) => {
                        formData.append('token', this.token)
                    } 
                },
                toolbar: {
                container: container,
                handlers: {
                    'image': function () {
                    QuillWatch.emit(this.quill.id)
                    }
                }
            }
            }
        }
    }
    },
    methods: {
        getUser(){
        this.$axios.get(`/user/getUserInfo`).then(res=>{
            if (res.code == 200) {
                this.users = res.data               
            }
})
        },
            getTypes(){
        this.$axios.get(`/category/get`).then(res=>{
            if (res.code == 200) {
                this.types = res.data               
            }
})
        },
        getToken(){
            axios.get('http://upload.yaojunrong.com/getToken').then(res=>{
            if (res.data.code == 200) {
                this.token = res.data.data
            }
        })
        },
        onEditorChange({ quill, html, text }) {
        // console.log('editor change!', quill, html, text)
        this.formData.contentText = text
    },
        handleSubmit(){
            this.$axios.post("/news/add",this.formData).then(res=>{
                if (res.code == 200) {
                    this.$message.success(res.msg)
                    this.$router.push({name:"news"})
                    
                }else{
                    this.$message.error(res.msg)
                }
            })
        },
        getNew(){  //获取单条新闻
            const id = this.$route.query.id
        this.$axios.get(`/news/get/${id}`).then(res=>{
            if (res.code == 200) {
                this.formData = res.data
            }
        })
        },
        handleSave(){
            const id = this.$route.query.id
            this.$axios.post(`/news/update/${id}`,this.formData).then(res=>{
                if (res.code == 200) {
                    this.$message.success(res.msg)
                    this.$router.push({name:"news"})
                }else{
                    this.$message.error(res.msg)
                }
            })
        }
    },
    components: {quillEditor, 
    uploadImg},
    watch: {
        $route(to,form){
            if (to.name == "eidtNews") {
                this.isEdit = true
            }else{
                this.isEdit = false
                this.formData = {
                    title:"",type:"",img:"",
                    content:"",contentText:"",author:"",look_number:""
                }
}
        }  
    },
    created () {
        this.getUser()
        this.getToken()
        this.getTypes()
        if (this.$route.name =="editNews") {
            this.isEdit = true
        }else{
            this.isEdit = false
        }
        if(this.isEdit){
            this.getNew()
        }
    }
}
</script>

<style scoped lang="scss">
/deep/ .ql-editor{
    min-height:280px;
}
</style>

