<template>
  <div class="page-container">
    <md-app md-waterfall md-mode="fixed">
      <md-app-toolbar class="md-primary md-large">
        <div class="md-toolbar-row">
          <span class="md-title">
            <router-link :class="$style.navbarLink" :to="{ name: 'films' }" tag="b">
              Kirizey SW Films
            </router-link>
          </span>

          <user-dropdown />
        </div>
      </md-app-toolbar>

      <md-app-content>
        <router-view />
      </md-app-content>
    </md-app>
  </div>
</template>

<script>
import UserDropdown from '@/components/UserDropdown'

/** Client layout. */
export default {
  components: {
    UserDropdown,
  },
};
</script>

<style lang="scss" module>
.navbarLink {
  cursor: pointer;
}
</style>
