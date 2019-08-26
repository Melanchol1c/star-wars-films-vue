export default [
  {
    path: '/admin',
    name: 'admin-page',
    meta: { auth: true, admin: true, layout: 'dashboard' },
    component: () => import('./pages/AdminPage.vue'),
  },
  {
    path: '/admin/films',
    name: 'admin-films-page',
    meta: { auth: true, admin: true, layout: 'dashboard' },
    component: () => import('./pages/AdminFilmsListPage.vue'),
  },
  {
    path: '/admin/films/:id',
    name: 'admin-film-edit',
    meta: { auth: true, admin: true, layout: 'dashboard' },
    component: () => import('./pages/AdminFilmEditPage.vue'),
  },
];
