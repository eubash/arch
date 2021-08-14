<template>
  <v-snackbar v-model="displayNotification" :timeout="-1" :multi-line="true">
    {{ notification.message }}
    <template v-slot:action="{ attrs }">
      <v-btn text v-bind="attrs" @click="onDismiss">
<!--        <i class="mdi-remove-circle"></i>-->
        <v-icon>
          mdi-remove-circle
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
          return `info--text mdi-info-outline mr-3`;
        case "success":
          return `success--text uis uis-check-circle mr-3`;
        case "warning":
          return `warning--text uis-exclamation-triangle mr-3`;
        case "error":
          return `error--text mdi-warning-circle mr-3`;
        case "primary":
          return `info--text uis-info-circle mr-3`;
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