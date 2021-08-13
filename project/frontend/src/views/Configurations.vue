<template>
  <div class="configurations page px-16">
    <h2>Select existing configuration o create new one</h2>
    <v-chip
      v-for="(item, n) in configurationList" :key="n"
      class="ma-2"
      close
      color="primary"
      label
      text-color="white"
      @click="getConfigurationDetail(item.id)"
      @click:close="handleClose(item.id)"
    >
      <v-icon left>
        mdi-account
      </v-icon>
      {{item.configurationName}}
    </v-chip>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import ConfigurationService from "@/services/configurationService";
import store from "@/store";

export default Vue.extend({
  name: "Configurations",

  data: () => ({
  }),
  created() {
    this.getUserConfigurationList();
  },
  computed: {
    user() {
      return store.getters["session/user"];
    },
    configurationList() {
      return store.getters["configurator/configurationList"];
    }
  },
  methods: {
    async getUserConfigurationList() {
      try {
        const configurations = await ConfigurationService.getExistingConfigurationList(this.user.id);
        store.commit("configurator/setConfigurationList", configurations);
      } catch(e) {
        console.error(e);
      }
    },
    async handleClose(confId: string) {
      try {
        await ConfigurationService.deleteUserConfiguration(confId);
        store.commit("configurator/removeUserConfiguration", confId);
      } catch(e) {
        console.error(e);
      }
    },
    async getConfigurationDetail(confId: string) {
      await this.$router.push(`/configuration/${confId}`);
    }
  }
});
</script>

<style lang="scss" scoped>
.menu-item {
  color: white;
  &:hover {
    color: #4990e2;
  }
}
</style>
