<template>
  <v-container>
    <v-row no-gutters class="d-flex" justify="space-around">
      <v-col cols="3">
        <v-img
          :src="require('../assets/images/logo.svg')"
          class="my-3"
          contain
        />
      </v-col>
      <v-col>
        <auth-menu />
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import Vue from "vue";
import AuthMenu from "@/components/AuthMenu.vue";

export default Vue.extend({
  name: "BaseHeader",
  components: {
    AuthMenu
  },

  data: () => ({
  }),
});
</script>
