<template>
  <v-snackbar v-model="displayNotification" :timeout="-1" :multi-line="true" color="primary">
    <v-icon class="mr-3">
      {{iconClass}}
    </v-icon>
    {{ notification.message }}
    <template v-slot:action="{ attrs }">
      <v-btn text v-bind="attrs" @click="onDismiss">
        <v-icon>
          mdi-close-circle
        </v-icon>
      </v-btn>
    </template>
  </v-snackbar>
</template>

<script lang="ts">
import Vue from "vue";
import store from "@/store";
import { Notification } from "@/models/notification.interface";

export default Vue.extend({
  computed: {
    computedNotification(): Notification {
      return store.state.notifications.notification;
    },
    iconClass(): string {
      switch (this.notification.type) {
        case "info":
          return `mdi-alert-circle-outline`;
        case "success":
          return `mdi-check-all`;
        case "warning":
          return `mdi-account-alert-outline`;
        case "error":
          return `mdi-alert-circle-outline`;
        default:
          return "";
      }
    }
  },
  watch: {
    computedNotification(newNotification: Notification) {
      this.notification = newNotification;
      this.displayNotification = newNotification.message !== null;
      if (newNotification.message !== null) {
        setTimeout(() => {
          store.dispatch("notifications/dismissNotification");
        }, 3000);
      }
    }
  },
  data() {
    return {
      notification: {
        message: null,
        type: null
      } as Notification,
      displayNotification: false,
      timeout: 3000
    };
  },
  components: {},
  props: {},
  methods: {
    onDismiss() {
      store.dispatch("notifications/dismissNotification");
    }
  }
});
</script>

<style lang="scss" scoped></style>