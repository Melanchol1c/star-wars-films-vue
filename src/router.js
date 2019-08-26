import Vue from 'vue';
import Router from 'vue-router';
import firebase from 'firebase/app';

import { routes as auth } from './app/auth';
import { routes as films } from './app/films';
import { routes as characters } from './app/characters';
import { routes as admin } from './app/admin';
import { startLoader, finishLoader } from './helpers';
import { getCurrentUser } from './app/auth/services/auth-service';
import store from './store/store';
import { SET_USER_DATA } from './app/auth/store/actionTypes';

Vue.use(Router);

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      redirect: { name: 'films' },
    },
    { path: '*', component: () => import('./pages/PageNotFound') },
    ...auth,
    ...films,
    ...characters,
    ...admin,
  ],
});

/** Router guard check auth status and starting page loader.  */
router.beforeEach((to, from, next) => {
  startLoader();

  const requireAuth = to.matched.some(record => record.meta.auth);
  const requireAdminPermissions = to.matched.some(record => record.meta.admin);

  requireAuth ? resolveAuthRequiredRoute(requireAdminPermissions, to, next, from) : next();
});

/**
 * Resolve user movement in route is it's require to be authorized.
 *
 * @param {boolean} requireAdminPermissions Is route require admin permissions.
 * @param {object} to Next route data.
 * @param {function} next Function move user to next route.
 * @param {object} from Previous route data.
 */
const resolveAuthRequiredRoute = (requireAdminPermissions, to, next, from) => {
  // If user is not on application data
  if (!getCurrentUser()) {
    firebase.auth().onAuthStateChanged(userData => {
      if (userData) {
        // Write user data in store.
        store.dispatch(`auth/${SET_USER_DATA}`, userData);
        // Check is route has admin protection.
        requireAdminPermissions ? resolveIsAdminRoute(next, from) : next();
      } else {
        // Move user to login page with redirect data.
        next({ name: 'login', query: { redirect: to.fullPath } });
      }
    });
  } else {
    // Check is route has admin protection.
    requireAdminPermissions ? resolveIsAdminRoute(next, from) : next();
  }
};

/**
 * Resolve user movement in route is it's require admin permissions.
 *
 * @param {function} next Function move user to next route.
 * @param {object} from Previous route data.
 */
const resolveIsAdminRoute = (next, from) => {
  const { isAdmin } = store.getters['auth/user'];
  isAdmin ? next() : next(from.fullPath);
};

/** Finish page loader on complete of route resolving. */
router.afterEach(() => finishLoader());

export default router;
