<template>
  <v-container class="configurations-page">
    <v-row no-gutters fill-height>
      <v-col cols="8" class="">
        <h3 style="color: #9DE6FD;">{{company ? company.name : "Your"}} room configuration preview</h3>
        <div style="width: 100%; height: 100%;">
          <iframe src="https://momento360.com/e/uc/38c87ec9e65349118b2132b287ac5d4f?utm_campaign=marketingsite&amp;utm_source=www&amp;size=large&amp;pan-speed=.035&amp;reset-heading=false&amp;hide-cardboard=true&amp;autoplay-collection=true&amp;ap-interval-coll=5&amp;fade=1000 " frameborder="0" allowfullscreen="" style="position:absolute;top:0;left:0;width:100%;height:100%;"></iframe>
        </div>
      </v-col>
      <v-col cols="4" class="pa-10" style="border: 1px solid #4990e2; background-color: rgba(24, 50, 84, 0.9); z-index: 99; overflow-y: scroll; position: relative; height: calc(100vh - 150px);">
        <h3 style="color: #9DE6FD;" class="mb-6">Configure your {{company ? company.name : ""}} room:</h3>
        <v-text-field
          v-model="configuration.configurationName"
          label="Insert your configuration name"
          dark
          outlined
        ></v-text-field>
        <div v-for="(item, n) in currentConfiguration" :key="n" class="mt-6">
          <div :class="{ disabled: !item.isEnabled }">
            <span style="color: white; background-color: #4990e2; border-radius: 2px;" class="font-weight-bold pa-1 pl-2 mr-4">{{n + 1}} </span>
            <span style="color: white;"> {{item.description}}</span>
          </div>
          <div :class="{ disabled: !item.isEnabled }" class="mt-3">
            <v-slider
              v-if="item.currentQuantity > 0"
              v-model="item.currentQuantity"
              step="1"
              thumb-label
              ticks
              :max="item.max_value"
              :min="item.min_Value"
              @change="getCurrentPrice"
            ></v-slider>
          </div>
          <v-switch
            v-model="item.isEnabled"
            @change="setWidgetStatus(item)"
            class="custom-label"
            inset
          >
            <template v-slot:label>
              <span class="v-label-white">{{ item.isEnabled ? 'Enabled' : 'Disabled' }}</span>
            </template>
          </v-switch>
        </div>
        <div class="mt-8">
          <span style="color: white;" class="font-weight-bold caption mr-3">Total price:</span>
          <span style="color: #9DE6FD;" class="font-weight-bold">{{price === 0 ? getCurrentPrice() : price}} {{currency}}</span>
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
import {Articulate, Configuration, Company, UserConfiguration, CurrentConfiguration} from "@/services/configurationService";



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
      await this.getArticulatesList(this.configuration.companyId);
    }
  },
  beforeDestroy() {
    this.price = 0;
    this.currentConfiguration = [] as CurrentConfiguration[];
  },
  computed: {
    user() {
      return store.getters["session/user"];
    },
    company(): Company {
      const companyList = store.getters["configurator/companyList"];
      if(companyList.length === 0) {
        this.getCompanyList();
      }
      if(this.configuration?.companyId) {
        const i = companyList.findIndex((company: Company) => company.id === this.configuration?.companyId);
        return companyList[i];
      }
      return store.getters["configurator/company"];
    },
    configuration(): UserConfiguration {
      return store.getters["configurator/configuration"];
    },
    articulatesList(): Articulate[] {
      return store.getters["configurator/articulatesList"];
    },
    currentConfiguration: {
      get(): CurrentConfiguration[] {
        let currentUserConfiguration = [] as CurrentConfiguration[];
        if(this.configuration?.id === this.$route.params.id) {
          if (this.configuration.configuration && this.configuration.configuration?.length > 0 && this.articulatesList?.length > 0) {
            currentUserConfiguration = this.configuration.configuration.map((item: Configuration) => {
              const arr = this.articulatesList.filter((articulate: Articulate) => item.productId === articulate.productId);
              return {...arr[0], ...{currentQuantity: item.quantity, isEnabled: item.isEnabled}};
            });
          }
        }
        this.price = currentUserConfiguration.reduce((a: number, c: CurrentConfiguration) => c.isEnabled ? a + (c.price * c.currentQuantity) : a, 0);
        console.log(currentUserConfiguration);
        return currentUserConfiguration;
      },
      set(val: CurrentConfiguration[]) {
        return val;
      }
     },
    currency(): string {
      return this.currentConfiguration.length > 0 ? this.currentConfiguration[0].currency : "";
    }
  },
  methods: {
    setWidgetStatus(item: CurrentConfiguration) {
      if(item.isEnabled) {
        this.price = this.price + (item.price * item.currentQuantity);
      } else {
        this.price = this.price - (item.price * item.currentQuantity);
      }
      store.commit("configurator/patchConfigurationItem", item);
    },
    async getUserConfiguration() {
      try {
        const configuration = await ConfigurationService.getUserConfiguration(this.$route.params.id);
        store.commit("configurator/setConfiguration", configuration);
      } catch(e) {
        console.error(e);
      }
    },
    async getArticulatesList(companyId: number) {
      try {
        const articulatesList = await ConfigurationService.getArticulatesList(companyId);
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
            quantity: item.currentQuantity,
            isEnabled: item.isEnabled
          };
        });
        const conf = await ConfigurationService.updateUserConfiguration(this.$route.params.id, this.configuration);
        store.commit("configurator/setConfiguration", conf);
        this.$store.dispatch("notifications/displayNotification", {
          type: "success",
          message: "Your configuration was successfully saved."
        });
      } catch(e) {
        this.$store.dispatch("notifications/displayNotification", {
          type: "error",
          message: "Something went wrong. Try later."
        });
      }
    },
    getCurrentPrice(): void {
      if (this.configuration?.id === this.$route.params.id) {
        this.price = this.currentConfiguration.reduce((a: number, c: CurrentConfiguration) => c.isEnabled ? a + (c.price * c.currentQuantity) : a, 0);
      }
    },
    async getCompanyList() {
      try {
        const companies = await ConfigurationService.getCompanyList();
        store.commit("configurator/setCompanyList", companies);
      } catch(e) {
        this.$store.dispatch("notifications/displayNotification", {
          type: "error",
          message: "Something went wrong. Try later."
        });
      }
    },
  }
});
</script>

<style lang="scss" scoped>
.v-label-white {
    color: white;
}

.disabled {
  pointer-events: none;
  opacity: 0.3;
}
</style>
