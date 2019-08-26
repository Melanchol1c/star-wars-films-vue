import { FilmsPage, FilmDetailsPage } from '@/app/films/pages';

export default [
  {
    path: '/films',
    name: 'films',
    meta: { auth: true, layout: 'dashboard' },
    component: FilmsPage,
  },
  {
    path: '/films/:id',
    name: 'filmDetails',
    meta: { auth: true, layout: 'dashboard' },
    component: FilmDetailsPage,
  },
];
