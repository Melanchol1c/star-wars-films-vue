<template>
  <div class="md-toolbar-section-end">
    <md-menu md-size="medium" md-align-trigger>
      <md-button md-menu-trigger>
        <div :class="$style.dropdown">
          <span :class="$style.email">{{ user.email }}</span>
          <md-icon>person_outline</md-icon>
        </div>
      </md-button>

      <md-menu-content>
        <router-link v-if="user.isAdmin" :to="{ name: 'admin-page' }" tag="md-menu-item">
          Admin panel
        </router-link>
        <md-menu-item @click="logout">Logout</md-menu-item>
      </md-menu-content>
    </md-menu>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

import { LOGOUT } from '@/app/auth/store/actionTypes';

/** User dropdown component for user layout. */
export default {
  name: 'user-dropdown',

  computed: {
    ...mapGetters({ user: 'auth/user' }),
  },

  methods: {
    ...mapActions({ singOut: `auth/${LOGOUT}` }),

    /** Make logout action and redirect user to login page. */
    async logout() {
      await this.singOut();
      this.$router.push({ name: 'login' });
    },
  },
};
</script>

<style lang="scss" module>
.dropdown {
  display: flex !important;
  align-items: center !important;
}

.email {
  margin: 1px 10px 0 0;
}
</style>
