import { LoginPage, RegistrationPage } from '@/app/auth/pages';

export default [
  {
    path: '/login',
    name: 'login',
    meta: { layout: 'auth' },
    component: LoginPage,
  },
  {
    path: '/register',
    name: 'register',
    meta: { layout: 'auth' },
    component: RegistrationPage,
  },
];
