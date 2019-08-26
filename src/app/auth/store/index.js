import {
  USER_NOT_FOUND,
  EMAIL_ALREADY_IN_USE,
  TOO_MANY_REQUESTS,
  WRONG_PASSWORD,
} from '@/app/auth/store/errorTypes';
import {
  LOGIN_WITH_EMAIL_AND_PASSWORD,
  REGISTER_WITH_EMAIL_AND_PASSWORD,
  LOGOUT,
  SET_USER_DATA,
} from '@/app/auth/store/actionTypes';
import { SET_USER, SET_ACCESS_TOKEN, SET_REFRESH_TOKEN } from '@/app/auth/store/mutationTypes';
import { notify, checkIsAdmin } from '@/helpers';
import { login, register, logout } from '@/app/auth/services/auth-service';

const state = { user: null, accessToken: null, refreshToken: null };

const getters = {
  user: state => state.user,
  accessToken: state => state.accessToken,
  refreshToken: state => state.refreshToken,
};

const mutations = {
  /** Set user data to state. */
  [SET_USER]: (state, payload) => (state.user = payload),

  /** Set user access token to state. */
  [SET_ACCESS_TOKEN]: (state, payload) => (state.accessToken = payload),

  /** Set user refresh token to store. */
  [SET_REFRESH_TOKEN]: (state, payload) => (state.refreshToken = payload),
};

const actions = {
  /** Login user action and notify client about success or errors. */
  [LOGIN_WITH_EMAIL_AND_PASSWORD]: async (context, { email, password }) => {
    try {
      const data = await login(email, password);
      notify('success', 'Sign in successfully');

      setUserData(context, data.user);
    } catch (error) {
      switch (error.code) {
        case USER_NOT_FOUND:
          notify('error', 'User not found');
          throw new Error('User not found');

        case WRONG_PASSWORD:
          notify('error', 'Wrong password');
          throw new Error('Wrong password');

        case TOO_MANY_REQUESTS:
          notify('error', 'Too many unsuccessful requests');
          throw new Error('Too many unsuccessful requests');

        default:
          notify('error', 'Server error');
          throw new Error('Server error');
      }
    }
  },

  /** Register user action and notify client about success or errors. */
  [REGISTER_WITH_EMAIL_AND_PASSWORD]: async (context, { email, password }) => {
    try {
      const data = await register(email, password);

      setUserData(context, data.user);

      notify('success', 'Registered successfully');
    } catch (error) {
      if (error.code === EMAIL_ALREADY_IN_USE) {
        notify('error', 'This email already in use');
        throw new Error('This email already in use');
      }
      notify('error', 'Server error');
      throw new Error('Server error');
    }
  },

  /** Logout user action and notify client about success or errors. */
  [LOGOUT]: async context => {
    try {
      await logout();

      notify('success', 'Logout successfully');

      resetUserData(context);
    } catch (error) {
      notify('error', 'Server error');
      throw new Error('Server error');
    }
  },

  [SET_USER_DATA]: (context, userData) => {
    setUserData(context, userData);
  },
};

/**
 * Method setting user state.
 * @param {Object} context Store context.
 * @param {Object} userData Response user data.
 */
const setUserData = (context, { email, uid, ra, refreshToken }) => {
  const isAdmin = checkIsAdmin(email);

  context.commit(SET_USER, {
    email,
    id: uid,
    isAdmin,
  });
  context.commit(SET_ACCESS_TOKEN, ra);
  context.commit(SET_REFRESH_TOKEN, refreshToken);
};

/**
 * Method clear user state.
 * @param {Object} context Store context.
 */
const resetUserData = context => {
  context.commit(SET_USER, null);
  context.commit(SET_ACCESS_TOKEN, null);
  context.commit(SET_REFRESH_TOKEN, null);
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
