<template>
 <div class="side-bar">
      <el-menu
      default-active="2"
      class="el-menu-vertical-demo"
      background-color="#304156"
      text-color="#fff"
      active-text-color="#aaf"
      :router = "true">
        <el-submenu index="/admin">
                <template slot="title">
                <i class="el-icon-location"></i>
                <span>管理员管理</span>
                </template>
                <el-menu-item-group>
                <el-menu-item index="/login">登录</el-menu-item>
                <el-menu-item index="/layout/index">管理员列表</el-menu-item>
                <el-menu-item index="/layout/addAdmin">添加管理员</el-menu-item>
                </el-menu-item-group>
        </el-submenu>
        <el-submenu index="/news">
                <template slot="title">
                <i class="el-icon-news"></i>
                <span>新闻管理</span>
                </template>
                <el-menu-item-group>
                <el-menu-item index="/layout/news">新闻列表</el-menu-item>
                <el-menu-item index="/layout/addNews">添加新闻</el-menu-item>
                </el-menu-item-group>
        </el-submenu>
        <el-submenu index="/swiper">
                <template slot="title">
                <i class="el-icon-picture"></i>
                <span>轮播图管理</span>
                </template>
                <el-menu-item-group>
                <el-menu-item index="/layout/swiper">轮播图管理</el-menu-item>
                <el-menu-item index="/layout/addSwiper">添加轮播图</el-menu-item>
                </el-menu-item-group>
        </el-submenu>
        <el-submenu index="/topic">
                <template slot="title">
                <i class="el-icon-date"></i>
                <span>互动管理</span>
                </template>
                <el-menu-item-group>
                <el-menu-item index="/layout/topic">互动管理</el-menu-item>
                <el-menu-item index="/layout/addTopic">添加互动主题</el-menu-item>
                </el-menu-item-group>
        </el-submenu>
        <el-submenu index="/personalSummary">
                <template slot="title">
                <i class="el-icon-date"></i>
                <span>个人总结</span>
                </template>
                <el-menu-item-group>
                <el-menu-item index="/layout/personalSummary">个人总结管理</el-menu-item>
                <el-menu-item index="/layout/addPersonalSummary">添加总结</el-menu-item>
                </el-menu-item-group>
        </el-submenu>
    </el-menu>
 </div>
</template>

<script type="text/ecmascript-6">
export default {
 data() {
 return {

 }
 },
 components: {

 }
}
</script>

<style scoped lang="scss">
.side-bar{
    min-height: 100vh;
    border-right:1px solid #f1f1f1;
    background-color: #304156;
    overflow: hidden;
    .nav-item{
        display: block;
        background-color: #1f2d3d !important ;
    }
    i{
      color:#fff
    }
    .el-menu-vertical-demo{
      margin-top:60px;
    }
}
  /deep/{   //去右边的多出边框
            .el-menu{
                border-right:none;
            }
        }
</style>
