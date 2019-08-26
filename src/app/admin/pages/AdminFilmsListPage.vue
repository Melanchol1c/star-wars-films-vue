<template>
  <div>
    <span class="md-headline">Films</span>
    <md-list>
      <md-list-item v-for="film in films" :key="film.id">
        <router-link :to="{ name: 'admin-film-edit', params: { id: film.id } }">
          {{ film.title }}
        </router-link>
      </md-list-item>
    </md-list>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

import { GET_ALL_FILMS } from '@/app/films/store/actionTypes';

export default {
  mounted() {
    this.getAllFilms();
  },

  computed: {
    ...mapGetters({ films: 'films/films' }),
  },

  methods: {
    ...mapActions({ getAllFilms: `films/${GET_ALL_FILMS}` }),
  },
};
</script>
