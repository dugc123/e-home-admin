<template>
 <div class="page">
    <el-col :span="4" style="height:100vh"> <SlideBar></SlideBar> </el-col>
    <el-col :span="20" style="height:100vh;overflow:scroll">
        <Header></Header> 
        <div class="main">
            <router-view></router-view>
        </div>
    </el-col>

 </div>
</template>

<script type="text/ecmascript-6">
import Header from "@/components/Header"
import SlideBar from "@/components/SlideBar"

export default {
    data() {
    return {

    }
    },
    components: {
        Header,
        SlideBar
    }
}
</script>

<style scoped lang="scss">
.main{
    padding:20px;
    box-sizing: border-box;
}
</style>
