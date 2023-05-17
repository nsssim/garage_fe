import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      component: () => import('@/views/dashboard/Index'),
      redirect: '/admin/login',
      children: [
        {
          name: 'Dashboard',
          path: '/admin/dashboard',
          component: () => import('@/views/dashboard/Dashboard'),
        },
        {
          name: 'Dashboard',
          path: '/super/dashboard',
          component: () => import('@/views/dashboard/DashboardSuper'),
        },
      ],
    },
    // {
    //   path: '/admin/login',
    //   component: () => import('@/views/dashboard/pages/admin/Login'),
    // },
    {
      path: '/admin/login',
      component: () => import('@/views/dashboard/pages/admin/LoginTwo'),
    },

    {
      path: '/admin',
      redirect:'/admin/login',
    },
    {
      path: '/logout',
      redirect:'/admin/login',
    },
    {
      path: '/super',
      redirect:'/super/login',
    },
    {
     path: '/super/login',
      component: () => import('@/views/dashboard/pages/super/Login'),
    },
    {
      path: '/admin/logout',
      component: () => import('@/views/dashboard/pages/admin/Logout'),
    },

  ],
})