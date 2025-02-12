import { createRouter, createWebHistory } from 'vue-router'
import ticketsRoutes from '@/modules/ticket/router'
import mailRoutes from '@/modules/mail/router'
import managementRoutes from '@/modules/users/router'
import LoginView from '@/views/LoginView.vue'
import { isNotAuth, isAuth } from '@/router/wards'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'login',
      beforeEnter: [isNotAuth],
      component: LoginView,
    },
    {
      path: '/',
      name: 'home',
      beforeEnter: [isAuth],
      component: () =>
        import(
          /* webpackChunkName: "Vista principal donde se cargan las rutas"*/ '@/views/HomeView.vue'
        ),
      redirect: { name: 'tickets' },
      children: [
        { path: 'tickets', ...ticketsRoutes },
        { path: 'mail', ...mailRoutes },
        { path: 'gestion', ...managementRoutes },
        // { path: "mail", ...chatRoutes },
      ],
    },
    {
      path: '/:pathMatch(.*)*',
      redirect: { name: 'login' },
    },
  ],
})

export default router
