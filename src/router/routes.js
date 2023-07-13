
const routes = [
  // {
  //   path: '/',
  //   component: () => import('layouts/MainLayout.vue'),
  //   children: [
  //     { path: '', component: () => import('layouts/FormPage.vue') }
  //   ]
  // },
  {
    path: '/',
    component: () => import('layouts/IndexVue.vue'),
  },
  {
    path: '/table',
    component: () => import('pages/TableComponent.vue'),
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
