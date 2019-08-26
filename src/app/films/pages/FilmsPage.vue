<template>
  <div>
    <span class="md-headline">Star Wars Films</span>

    <md-table v-if="!isLoading">
      <md-table-row>
        <md-table-head md-numeric>ID</md-table-head>
        <md-table-head>Title</md-table-head>
        <md-table-head>Release date</md-table-head>
        <md-table-head>Producer</md-table-head>
      </md-table-row>

      <md-table-row v-for="film in films" :key="film.id">
        <md-table-cell md-numeric>{{ film.id }}</md-table-cell>
        <md-table-cell>
          <router-link :to="{ name: 'filmDetails', params: { id: film.id } }">
            {{ film.title }}
          </router-link>
        </md-table-cell>
        <md-table-cell>{{ film.releaseDate | date }}</md-table-cell>
        <md-table-cell>{{ film.producer }}</md-table-cell>
      </md-table-row>
    </md-table>

    <md-progress-spinner v-if="isLoading" md-mode="indeterminate"></md-progress-spinner>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

import { GET_ALL_FILMS } from '@/app/films/store/actionTypes';

/** Films table page */
export default {
  data: () => ({
    isLoading: true,
  }),

  computed: {
    ...mapGetters({ films: 'films/films' }),
  },

  methods: {
    ...mapActions({ getAllFilms: `films/${GET_ALL_FILMS}` }),
  },

  /** Initially load data about all films. */
  async mounted() {
    await this.getAllFilms();
    this.isLoading = false;
  },
};
</script>
