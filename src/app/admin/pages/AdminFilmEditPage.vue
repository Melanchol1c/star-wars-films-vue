<template>
  <form novalidate class="md-layout relative" @submit.prevent="submit">
    <md-card class="md-layout-item">
      <md-progress-bar md-mode="indeterminate" v-if="loading" />

      <md-card-header>
        <div class="md-title">Update Film #{{ film.id }}</div>
      </md-card-header>

      <md-card-content v-if="!loading">
        <div class="md-layout md-gutter">
          <div class="md-layout-item md-small-size-100">
            <md-field :class="getValidationClass('title')">
              <label for="title">Title</label>
              <md-input
                name="title"
                id="title"
                type="text"
                v-model="form.title"
                :disabled="loading"
              />
              <span class="md-error" v-if="!$v.form.title.required">Title is required</span>
            </md-field>

            <md-field :class="getValidationClass('releaseDate')">
              <label for="releaseDate">Release date</label>
              <md-input
                name="releaseDate"
                id="releaseDate"
                type="text"
                v-model="form.releaseDate"
                :disabled="loading"
              />
              <span class="md-error" v-if="!$v.form.releaseDate.required">
                Release date is required
              </span>
            </md-field>

            <md-field :class="getValidationClass('producer')">
              <label for="producer">Producer</label>
              <md-input
                name="producer"
                id="producer"
                type="text"
                v-model="form.producer"
                :disabled="loading"
              />
              <span class="md-error" v-if="!$v.form.producer.required">
                Producer is required
              </span>
            </md-field>

            <md-field :class="getValidationClass('director')">
              <label for="director">Director</label>
              <md-input
                name="director"
                id="director"
                type="text"
                v-model="form.director"
                :disabled="loading"
              />
              <span class="md-error" v-if="!$v.form.director.required">
                Director is required
              </span>
            </md-field>

            <md-field :class="getValidationClass('openingCrawl')">
              <label for="openingCrawl">Opening crawl</label>
              <md-textarea
                name="openingCrawl"
                id="openingCrawl"
                type="text"
                v-model="form.openingCrawl"
                :disabled="loading"
                :class="$style.opening"
              />
              <span class="md-error" v-if="!$v.form.openingCrawl.required">
                Opening crawl is required
              </span>
            </md-field>
          </div>
        </div>
      </md-card-content>

      <md-card-actions>
        <md-button @click="remove" type="button" class="md-accent" :disabled="loading">
          Remove film
        </md-button>
        <md-button type="submit" class="md-primary" :disabled="loading">Update film</md-button>
      </md-card-actions>
    </md-card>
  </form>
</template>

<script>
import { validationMixin } from 'vuelidate';
import { required, minLength } from 'vuelidate/lib/validators';
import { mapActions, mapGetters } from 'vuex';

import { GET_FILM_BY_ID, RESET_SELECTED_FILM } from '@/app/films/store/actionTypes';
import { UPDATE_FILM, REMOVE_FILM } from '@/app/admin/store/actionTypes';

/** Page for deleting and editing a movie. */
export default {
  mixins: [validationMixin],

  /** Load film and fill the form it's data. */
  async mounted() {
    this.id = this.$route.params.id;

    this.loading = true;
    await this.getFilm(this.id);
    this.form.title = this.film.title;
    this.form.releaseDate = this.film.releaseDate;
    this.form.producer = this.film.producer;
    this.form.director = this.film.director;
    this.form.openingCrawl = this.film.openingCrawl;
    this.loading = false;
  },

  /** Reset selected film data on destroy component. */
  beforeDestroy() {
    this.resetFilm();
  },

  data: () => ({
    id: null,
    loading: false,
    form: {
      title: null,
      releaseDate: null,
      producer: null,
      director: null,
      openingCrawl: null,
    },
  }),

  computed: {
    ...mapGetters({ film: 'films/selectedFilm' }),
  },

  validations: {
    form: {
      title: {
        required,
      },
      releaseDate: {
        required,
      },
      producer: {
        required,
      },
      director: {
        required,
      },
      openingCrawl: {
        required,
      },
    },
  },

  methods: {
    ...mapActions({
      getFilm: `films/${GET_FILM_BY_ID}`,
      resetFilm: `films/${RESET_SELECTED_FILM}`,
      updateFilm: `admin/${UPDATE_FILM}`,
      removeFilm: `admin/${REMOVE_FILM}`,
    }),

    /** Set class to the fields if it's invalid. */
    getValidationClass(fieldName) {
      const field = this.$v.form[fieldName];

      if (field) {
        return {
          'md-invalid': field.$invalid && field.$dirty,
        };
      }
    },

    /** Make update action, toggle loader state and after it move admin to list page. */
    async update() {
      this.loading = true;
      await this.updateFilm({ id: this.id, data: this.form });
      this.loading = false;
      this.$router.push({ name: 'admin-films-page' });
    },

    /** Form submit handler. */
    submit() {
      this.$v.$touch();

      if (!this.$v.$invalid) {
        this.update();
      }
    },

    /** Make remove action, toggle loader state and after it move admin to list page. */
    async remove() {
      this.loading = true;
      await this.removeFilm(this.id);
      this.loading = false;
      this.$router.push({ name: 'admin-films-page' });
    },
  },
};
</script>

<style module>
.opening {
  min-height: 250px !important;
}
</style>
