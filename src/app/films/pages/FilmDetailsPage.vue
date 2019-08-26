<template>
  <div>
    <md-card v-if="!isLoading">
      <md-card-header>
        <div class="md-title">{{ film.title }}</div>
        <div class="md-subhead">{{ film.releaseDate | date }}</div>
      </md-card-header>

      <md-card-content>
        <p>
          <span class="bold">Director:</span>
          {{ film.director }}
        </p>
        <p>
          <span class="bold">Producer:</span>
          {{ film.producer }}
        </p>
        <p>
          <span class="bold">Opening crawl:</span>
          {{ film.openingCrawl }}
        </p>

        <characters-list :characters="characters" />
      </md-card-content>
    </md-card>

    <md-progress-spinner v-if="isLoading" md-mode="indeterminate"></md-progress-spinner>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

import { GET_FILM_BY_ID, RESET_SELECTED_FILM } from '@/app/films/store/actionTypes';
import { RESET_FILM_CHARACTERS, GET_FILM_CHARACTERS } from '@/app/characters/store/actionTypes';
import { CharactersList } from '@/app/characters/components';

/** Film details page. */
export default {
  components: {
    CharactersList,
  },

  data: () => ({
    isLoading: true,
  }),

  /** Initially load film data. */
  async mounted() {
    const id = this.$route.params.id;

    await this.getFilm(id);
    await this.getFilmCharacters(id);

    this.isLoading = false;
  },

  /** Reset selected film and characters list state on destroying component. */
  beforeDestroy() {
    this.resetFilm();
    this.resetCharacters();
  },

  computed: {
    ...mapGetters({ film: 'films/selectedFilm', characters: 'characters/filmCharacters' }),
  },

  methods: {
    ...mapActions({
      getFilm: `films/${GET_FILM_BY_ID}`,
      resetFilm: `films/${RESET_SELECTED_FILM}`,
      getFilmCharacters: `characters/${GET_FILM_CHARACTERS}`,
      resetCharacters: `characters/${RESET_FILM_CHARACTERS}`,
    }),
  },
};
</script>
