import Vue from 'vue';
import Vuex from 'vuex';

import auth from '@/app/auth/store';
import films from '@/app/films/store';
import characters from '@/app/characters/store';
import admin from '@/app/admin/store';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  getters: {},
  mutations: {},
  actions: {},
  modules: { auth, films, characters, admin },
});
