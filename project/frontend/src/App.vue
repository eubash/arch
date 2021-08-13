<template>
  <v-app
    id="app"
    :style="{
      backgroundImage: 'url('+ '../assets/images/background.jpg' + ')',
    }"
  >
    <v-main id="main">
      <notifications />
      <router-view />
    </v-main>
  </v-app>
</template>

<script lang="ts">
import Vue from "vue";
import Notifications from "@/components/shared/Notifications.vue";

export default Vue.extend({
  name: "App",
  components: {
    Notifications
  },
  data() {
    return {};
  },
});
</script>

<style lang="scss" scoped>
#app {
  //background-image: url('~@/assets/images/background.jpg');
  background-color: #183254;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  background-attachment: fixed;
}
</style>
