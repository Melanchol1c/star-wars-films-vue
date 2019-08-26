<template>
  <div :class="$style.authLayout">
    <router-view />
  </div>
</template>

<style lang="scss" module>
.authLayout {
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
