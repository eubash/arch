<template>
  <div class="configurations page px-16">
    <h2 style="color: #9DE6FD;">Configure your room</h2>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import ConfigurationService from "@/services/configurationService";
import store from "@/store";

export default Vue.extend({
  name: "Configuration",

  data: () => ({
  }),
  created() {
    this.getUserConfiguration();
  },
  computed: {
    user() {
      return store.getters["session/user"];
    },
    configuration() {
      return store.getters["configurator/configuration"];
    }
  },
  methods: {
    async getUserConfiguration() {
      try {
        const configuration = await ConfigurationService.getUserConfiguration(this.$route.params.id);
        store.commit("configurator/setConfiguration", configuration);
      } catch(e) {
        console.error(e);
      }
    },
  }
});
</script>

<style lang="scss" scoped>

</style>
