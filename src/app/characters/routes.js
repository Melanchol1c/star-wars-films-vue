import { CharacterDetailsPage } from '@/app/characters/pages';

export default [
  {
    path: '/characters/:id',
    name: 'characterDetails',
    meta: { auth: true, layout: 'dashboard' },
    component: CharacterDetailsPage,
  },
];
