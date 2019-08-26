<template>
  <div>
    <md-card v-if="!isLoading">
      <md-card-header>
        <div class="md-title">{{ character.name }}</div>
        <div class="md-subhead">{{ character.birthYear }}</div>
      </md-card-header>

      <md-card-content>
        <p>
          <span class="bold">Eye color:</span>
          {{ character.eyeColor }}
        </p>
        <p>
          <span class="bold">Gender:</span>
          {{ character.gender }}
        </p>
        <p>
          <span class="bold">Hair color:</span>
          {{ character.hairColor }}
        </p>
        <p>
          <span class="bold">Height:</span>
          {{ character.height }}
        </p>

        <p>
          <span class="bold">Mass:</span>
          {{ character.mass }}
        </p>
        <p>
          <span class="bold">Skin color:</span>
          {{ character.skinColor }}
        </p>
      </md-card-content>
    </md-card>

    <md-progress-spinner v-if="isLoading" md-mode="indeterminate"></md-progress-spinner>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

import { GET_CHARACTER_BY_ID, RESET_SELECTED_CHARACTER } from '@/app/characters/store/actionTypes';

/** Character details page component. */
export default {
  data: () => ({
    isLoading: true,
  }),

  computed: {
    ...mapGetters({ character: `characters/selectedCharacter` }),
  },

  methods: {
    ...mapActions({
      getCharacter: `characters/${GET_CHARACTER_BY_ID}`,
      resetCharacter: `characters/${RESET_SELECTED_CHARACTER}`,
    }),
  },

  /** Initially load data about character. */
  async mounted() {
    const id = this.$route.params.id;
    await this.getCharacter(id);
    this.isLoading = false;
  },

  /** Reset selected character state on destroying component. */

  beforeDestroy() {
    this.resetCharacter();
  },
};
</script>
