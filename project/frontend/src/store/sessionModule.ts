import { MutationTree, ActionTree, ActionContext, GetterTree } from "vuex";
import { RootState } from "./index";
import AuthService from "@/services/authService";

export interface User {
  id: string;
}

export interface SessionState {
  user: User | null;
  token: string | null;
}

type SessionContext = ActionContext<SessionState, RootState>;

export const namespaced = true;

export const state = (): SessionState => ({
  user: null,
  token: null,
});

export const getters: GetterTree<SessionState, RootState> = {
  user: (state) => {
    return state.user;
  },
  token: (state) => {
    return state.token;
  },
};

export const mutations: MutationTree<SessionState> = {
  setCurrentUser(state: SessionState, auth: { user: User; token: string }) {
    state.user = auth.user;
    state.token = auth.token;
  },
  updateCurrentUser(state: SessionState, user: User) {
    state.user = user;
  },
  cleanCurrentUser(state: SessionState) {
    state.token = null;
    state.user = null;
  },
  refreshToken(state: SessionState, data: { token: string }) {
    state.token = data.token;
  },
};

export const actions: ActionTree<SessionState, RootState> = {
  login(context: SessionContext, data: { user: User; tokenData: string }) {
    context.commit("setCurrentUser", {
      user: data.user,
      token: data.tokenData,
    });
  },
  logout(context: SessionContext) {
    context.commit("cleanCurrentUser");
  },
  recoverLogin(context: SessionContext, data: SessionState) {
    context.commit("setCurrentUser", {
      user: data.user,
      token: data.token,
    });
  },
  async getCurrentUser(context: SessionContext) {
    const userId = await AuthService.getUser();
    context.commit("updateCurrentUser", { id: userId });
  },
};
