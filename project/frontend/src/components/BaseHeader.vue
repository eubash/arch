<template>
  <v-container>
    <v-row no-gutters class="d-flex" justify="space-around">
      <v-col cols="3">
        <v-img
          style="z-index: 99; cursor: pointer"
          :src="require('../assets/images/logo.svg')"
          class="my-3"
          contain
          @click="goHome"
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
import store from "@/store";

export default Vue.extend({
  name: "BaseHeader",
  components: {
    AuthMenu
  },
  computed: {
    isAuthenticated(): boolean {
      return store.getters["session/token"];
    }
  },
  data: () => ({
  }),

  methods: {
    async goHome() {
      if(this.$route.name !== "Configurations" && this.isAuthenticated) await this.$router.push("/configurations");
    }
  }
});
</script>
