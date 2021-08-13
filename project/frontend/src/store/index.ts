import Vue from "vue";
import Vuex from "vuex";
import * as session from "./sessionModule";
import * as notifications from "./notificationsModue";
import * as configurator from "./configuratorModule";

Vue.use(Vuex);

export interface RootState {
  session: session.SessionState;
  notifications: notifications.NotificationState;
  configurator: configurator.ConfiguratorState;
}

export default new Vuex.Store({
  modules: {
    session,
    notifications,
    configurator
  },
});
