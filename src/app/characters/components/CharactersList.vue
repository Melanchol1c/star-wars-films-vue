<template>
  <div>
    <span class="bold">Characters:</span>
    <md-list :class="$style.charactersList" v-if="characters">
      <md-list-item v-for="character in characters" :key="character.id">
        <router-link :to="{ name: 'characterDetails', params: { id: character.id } }">
          {{ character.name }}
        </router-link>
      </md-list-item>
    </md-list>
  </div>
</template>

<script>
/** Characters list component. */
export default {
  name: 'characters-list',

  props: {
    characters: Array,
  },
};
</script>

<style module>
.charactersList {
  display: flex;
  flex-direction: row !important;
  flex-wrap: wrap !important;
}
</style>
