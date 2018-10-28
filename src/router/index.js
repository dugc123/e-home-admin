import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

let router = new Router({
  routes: [
        {
          path: '/',
          redirect: "/login"
        },
    {
      path: '/login',
      name: 'login',
      component: ()=>import ('@/views/Login'),
          meta: {
            title: "登录页"
          }
    },
  {
    path:"/layout",
    component:()=>import ('@/views/Layout'),
    redirect: "/layout/index",
    meta: {
      title: "首页"
    },
    children:[
          {
            path: 'index',
            name: 'index',
            component: () => import('@/views/admin/index')
          },
          {
            path: 'admin',
            name: 'admin',
            meta: {
              title: "管理员管理"
            },
            component: () => import('@/views/admin')
          },
          {
            path: 'addAdmin',
            name: 'addAdmin',
            meta: {
              title: "添加管理员"
            },
            component: () => import('@/views/admin/addAdmin')
          }, {
            path: 'news',
            name: 'news',
            meta: {
              title: "新闻管理"
            },
            component: () => import('@/views/news')
          }, {
            path: 'addNews',
            name: 'addNews',
            meta: {
              title: "添加新闻"
            },
            component: () => import('@/views/news/addNews')
          },
          {
            path: 'editNews',
            name: 'editNews',
            meta: {
              title: "编辑新闻"
            },
            component: () => import('@/views/news/addNews')
          }, {
            path: 'swiper',
            name: 'swiper',
            meta: {
              title: "轮播图管理"
            },
            component: () => import('@/views/swiper')
          }, {
            path: 'editSwiper',
            name: 'editSwiper',
            meta: {
              title: "编辑轮播图"
            },
            component: () => import('@/views/swiper/addSwiper')
          } ,{
            path: 'addSwiper',
            name: 'addSwiper',
            meta: {
              title: "添加轮播图"
            },
            component: () => import('@/views/swiper/addSwiper')
          }
    ]
    }
  ]
})
router.beforeEach((to,form,next)=>{
  if (to.meta && to.meta.title) {
    document.title = to.meta.title
  }else{
    document.title = "管理员列表"
  }
  next()
})

export default router