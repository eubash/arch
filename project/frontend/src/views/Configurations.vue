<template>
  <div class="configurations page px-16">
    <h3 style="color: #9DE6FD;">Select existing configuration o create new one</h3>
    <v-chip
      v-for="(item, n) in configurationList" :key="item.id"
      class="ma-2 mt-6"
      close
      color="primary"
      label
      text-color="white"
      @click="getConfigurationDetail(item.id)"
      @click:close="openDialog(item.id)"
    >
      <v-icon left>
        mdi-account
      </v-icon>
      {{item.configurationName}}
    </v-chip>
    <v-divider />
    <h3 class="mt-6" style="color: #9DE6FD;">To create a new configuration, select the company</h3>
    <v-progress-circular
      v-if="companiesLoading"
      :size="18"
      indeterminate
      color="primary"
    />
    <v-chip
      v-if="!companiesLoading"
      v-for="(item, i) in companyList" :key="item.id"
      class="ma-2 mt-4"
      color="primary"
      label
      text-color="white"
      @click="createNewUserConfiguration(item.id)"
    >
      <v-icon left>
        mdi-domain
      </v-icon>
      {{item.name}}
    </v-chip>

    <v-dialog
      persistent
      no-click-animation
      width="600"
      v-model="isOpen"
    >
      <v-card>
        <v-card-title>
          <h3>Are you sure to remove this configuration?</h3>
        </v-card-title>
        <v-card-text>
          By clicking this button your configuration and BOM will be permanently removed.
        </v-card-text>
        <v-card-actions class="d-flex justify-end">
          <v-btn
            large
            depressed
            class="mr-3"
            color="secondary"
            outlined
            @click="onDismiss"
          >
            Cancel
          </v-btn>
          <v-btn
            large
            color="primary"
            @click="onRemove"
          >
            Confirm
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import ConfigurationService from "@/services/configurationService";
import store from "@/store";

export default Vue.extend({
  name: "Configurations",

  data: () => ({
    configurationId: "",
    companiesLoading: false,
    isOpen: false
  }),
  created() {
    this.getUserConfigurationList();
    this.getCompanyList();
  },
  computed: {
    user() {
      return store.getters["session/user"];
    },
    configurationList() {
      return store.getters["configurator/configurationList"];
    },
    configuration() {
      return store.getters["configurator/configuration"];
    },
    companyList() {
      return store.getters["configurator/companyList"];
    },
  },
  methods: {
    async getUserConfigurationList() {
      try {
        const configurations = await ConfigurationService.getExistingConfigurationList(this.user.id);
        store.commit("configurator/setConfigurationList", configurations);
      } catch(e) {
        console.error(e);
        this.$store.dispatch("notifications/displayNotification", {
          type: "error",
          message: "Something went wrong. Try later."
        });
      }
    },
    async getCompanyList() {
      try {
        this.companiesLoading = true;
        const companies = await ConfigurationService.getCompanyList();
        store.commit("configurator/setCompanyList", companies);
      } catch(e) {
        console.error(e);
        this.$store.dispatch("notifications/displayNotification", {
          type: "error",
          message: "Something went wrong. Try later."
        });
      } finally {
        this.companiesLoading = false;
      }
    },
    async removeUserConfiguration(confId: string) {
      try {
        await ConfigurationService.deleteUserConfiguration(confId);
        store.commit("configurator/removeUserConfiguration", confId);
      } catch(e) {
        console.error(e);
        this.$store.dispatch("notifications/displayNotification", {
          type: "error",
          message: "Something went wrong. Try later."
        });
      }
    },
    async getConfigurationDetail(confId: string) {
      await this.$router.push(`/configuration/${confId}`);
    },
    async createNewUserConfiguration(companyId: number) {
      try {
        this.configuration.userId = this.user.id;
        this.configuration.companyId = companyId;
        const conf = await ConfigurationService.saveUserConfiguration(this.configuration);
        store.commit("configurator/setConfiguration", conf);
        await this.$router.push(`/configuration/${conf.id}`);
      } catch(e) {
        this.$store.dispatch("notifications/displayNotification", {
          type: "error",
          message: "Something went wrong. Try later."
        });
      }
    },
    onDismiss() {
      this.isOpen = false;
    },
    onRemove() {
      this.onDismiss();
      this.removeUserConfiguration(this.configurationId);
    },
    openDialog(confId: string) {
      this.configurationId = confId;
      this.isOpen = true;
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
