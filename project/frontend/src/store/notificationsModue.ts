import { MutationTree, ActionTree, ActionContext, GetterTree } from "vuex";
import { RootState } from "./index";
import { Notification } from "@/models/notification.interface";

export interface NotificationState {
  notification: Notification;
}

type NotificationsContext = ActionContext<NotificationState, RootState>;

export const namespaced = true;

export const state = (): NotificationState => ({
  notification: {
    message: null,
    type: null
  }
});

export const getters: GetterTree<NotificationState, RootState> = {};

export const mutations: MutationTree<NotificationState> = {
  addNotification(state: NotificationState, notification: Notification) {
    state.notification = notification;
  },
  hideNotification(state: NotificationState) {
    state.notification = {
      message: null,
      type: null
    };
  }
};

export const actions: ActionTree<NotificationState, RootState> = {
  displayNotification(
    context: NotificationsContext,
    notification: Notification
  ) {
    context.commit("addNotification", notification);
  },
  dismissNotification(context: NotificationsContext) {
    context.commit("hideNotification");
  }
};
