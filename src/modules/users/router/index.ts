export default {
  name: 'gestion',
  redirect: { name: 'signin' },
  children: [
    {
      path: 'registro',
      name: 'signin',
      //meta:{ rolsAllow: ['admin', 'tech'] },
      //beforeEnter: [ rolGuard ],
      component: () =>
        import(/* webpackChunkName: "tech add user  view "*/ '@/modules/users/views/SignIn.vue'),
    },
    {
      path: 'Gestion',
      name: 'management',
      //meta:{ rolsAllow: ['admin', 'tech'] },
      //beforeEnter: [ rolGuard ],
      children: [
        {
          path: 'clientes/:type?',
          name: 'userList',
          component: () =>
            import(
              /* webpackChunkName: " manag for clients view "*/ '@/modules/users/pages/ManagementPage.vue'
            ),
          props: true,
        },
      ],
      component: () =>
        import(/* webpackChunkName: "tech principal view "*/ '@/modules/users/views/Managview.vue'),
    },
    {
      path: '/:pathMatch(.*)*',
      redirect: { name: 'management' },
    },
  ],
}
