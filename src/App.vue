<template>
  <div id="app">
    <component :is="layout">
      <router-view />
    </component>
    <notifications animation-type="velocity" position="bottom right" />
  </div>
</template>

<script>
import { AuthLayout, DashboardLayout } from '@/layouts';

export default {
  components: {
    AuthLayout,
    DashboardLayout,
  },
  computed: {
    layout() {
      return (this.$route.meta.layout || 'auth') + '-layout';
    },
  },
};
</script>
