import {createRouter, createWebHistory } from "vue-router";
const routes = [

    {
    path: '/contacts',
    name: 'contacts',
    component: () => import('../views/contact.vue')  },
          {
    path: '/blog',
    name: 'blog',
    component: () => import('../views/blog.vue')  },
              {
    path: '/blog/:slug',
    name: 'post',
    component: () => import('../views/post_page.vue')  ,
    props: true,
 },
              {
    path: '/',
    name: 'home',
    component: () => import('../views/home.vue')
              },
          {
    path: '/panel',
    name: 'panel',
    component: () => import('../views/panel.vue'),
              },
              {
    path: '/panel_change/:slug',
    name: 'panel_change',
    component: () => import('../views/panel_change.vue'),
                  props: true
              },

              {
    path: '/tickets_cab_single/:slug',
    name: 'tickets_cab_single',
    component: () => import('../views/tickets_cab_single.vue'),
                  props: true,
              },
              {
    path: '/cabinet/:slug',
    name: 'cabinet',
    component: () => import('../views/cab.vue'),
              props: true,
              },
              {
    path: '/tickets_cabinet/:slug',
    name: 'tickets_cabinet',
    component: () => import('../views/tickets_cab.vue'),
              props: true,
              },
      {
    path: '/profile_edit/:slug',
    name: 'profile_edit',
    component: () => import('../views/profileedit.vue'),
      props: true,
      },
  {
    path: '/users/:slug',
    name: 'profile',
    component: () => import('../views/profile.vue'),
    props: true,
  },
  {
    path: '/users/activation/:uid/:slug',
    name: 'activation',
    component: () => import('../views/activation.vue'),
    props: true,},
    {
    path: '/users/reset_password/:uid/:slug',
    name: 'reset_password',
    component: () => import('../views/reset_password.vue'),
    props: true,},
          {
    path: '/registration',
    name: 'registration',
    component: () => import('../views/registration.vue')  },
  {
    path: '/login',
    name: 'login',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Login.vue')
  },
  {
    path: '/tickets',
    name: 'tickets',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/tickets.vue')
  },
    {
    path: '/ticket',
    name: 'ticket_single',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/ticket_single.vue')
  },
          {
    path: '/404',
    name: '404',
    component: () => import(/* webpackChunkName: "about" */ '../views/404.vue')
  }, {
    path: "/:pathMatch(.*)*",
    redirect: '/404'
  }

]
const router = createRouter({
  history: createWebHistory(),
      scrollBehavior() {
    return { x: 0, y: 0 };
  },
  routes,
})

export default router
