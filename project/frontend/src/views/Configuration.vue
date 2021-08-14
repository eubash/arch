<template>
  <v-container class="configurations-page">
    <v-row no-gutters fill-height>
      <v-col cols="8" class="px-10">
        <h3 style="color: #9DE6FD;">Product preview</h3>
      </v-col>
      <v-col cols="4" class="px-10" style="border-left: 1px solid #4990e2;">
        <h3 style="color: #9DE6FD;" class="mb-6">Configure your room:</h3>
        <v-text-field
          v-model="configuration.configurationName"
          label="Insert your configuration name"
          dark
          outlined
        ></v-text-field>
        <div v-for="(item, n) in currentConfiguration" :key="n" class="mt-6">
          <span style="color: white; background-color: #4990e2; border-radius: 2px;" class="font-weight-bold pa-1 pl-2 mr-4">{{n + 1}} </span>
          <span style="color: white;"> {{item.description}}</span>
          <div class="mt-3">
            <v-slider
              v-model="item.currentQuantity"
              step="1"
              thumb-label
              ticks
              :max="item.max_value"
              :min="item.min_Value"
              @change="getCurrentPrice"
            ></v-slider>
          </div>
        </div>
        <div class="mt-8">
          <span style="color: white;" class="font-weight-bold caption mr-3">Total price:</span>
          <span style="color: #9DE6FD;" class="font-weight-bold">{{price === 0 ? currentPrice : price}} {{currency}}</span>
        </div>
        <v-btn
          large
          depressed
          class="mr-3 mt-8"
          color="primary"
          outlined
          @click="saveUserConfiguration"
        >
          Save
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import Vue from "vue";
import ConfigurationService from "@/services/configurationService";
import store from "@/store";
import {Articulate, Configuration} from "@/services/configurationService";

export default Vue.extend({
  name: "Configuration",

  data: () => ({
    price: 0
  }),
  async created() {
    if(this.configuration.id !== this.$route.params.id) {
      await this.getUserConfiguration();
    }
    if(this.configuration.companyId) {
      await this.getArticulatesList();
    }
  },
  computed: {
    user() {
      return store.getters["session/user"];
    },
    configuration() {
      return store.getters["configurator/configuration"];
    },
    articulatesList() {
      return store.getters["configurator/articulatesList"];
    },
    currentConfiguration() {
      let currentUserConfiguration = [];
      if(this.configuration.configuration.length > 0 && this.articulatesList.length > 0) {
        currentUserConfiguration = this.configuration.configuration.map((item: Configuration) => {
          const arr = this.articulatesList.filter((articulate: Articulate) => item.productId === articulate.productId);
          return {...arr[0], ...{currentQuantity: item.quantity}};
        });
      }
      console.log(currentUserConfiguration);
      return currentUserConfiguration;
     },
    currentPrice() {
      return this.currentConfiguration.reduce((a, c) => a + (c.price * c.currentQuantity), 0);
    },
    currency() {
      return this.currentConfiguration.length > 0 ? this.currentConfiguration[0].currency : "";
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
    async getArticulatesList() {
      try {
        const articulatesList = await ConfigurationService.getArticulatesList(this.configuration.companyId);
        store.commit("configurator/setArticulatesList", articulatesList);
      } catch(e) {
        this.$store.dispatch("notifications/displayNotification", {
          type: "error",
          message: "Something went wrong. Try later."
        });
      }
    },
    async saveUserConfiguration() {
      try {
        this.configuration.configuration = this.currentConfiguration.map((item: any) => {
          return {
            productId: item.productId,
            quantity: item.currentQuantity
          };
        });
        const conf = await ConfigurationService.updateUserConfiguration(this.$route.params.id, this.configuration);
        store.commit("configurator/setConfiguration", conf);
      } catch(e) {
        this.$store.dispatch("notifications/displayNotification", {
          type: "error",
          message: "Something went wrong. Try later."
        });
      }
    },
    getCurrentPrice(): number {
      this.price = this.currentConfiguration.reduce((a, c) => a + (c.price * c.currentQuantity), 0);
    }
  }
});
</script>

<style lang="scss" scoped>

</style>
