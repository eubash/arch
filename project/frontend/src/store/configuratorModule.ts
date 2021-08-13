import { MutationTree, ActionTree, ActionContext, GetterTree } from "vuex";
import { RootState } from "./index";
import UserConfiguration from "@/services/configService";


export interface ConfiguratorState {
  configuration: UserConfiguration;
  configurationList: UserConfiguration[];
}

type ConfiguratorContext = ActionContext<ConfiguratorState, RootState>;

export const namespaced = true;

export const state = (): ConfiguratorState => ({
  configurationList: [],
  configuration: {
    id: undefined,
    configurationName: "New configuration",
    userId: undefined,
    companyId: 1,
    configuration: {
      productId: 1,
      quantity: 1
    }
  }
});

export const getters: GetterTree<ConfiguratorState, RootState> = {
  configuration: (state) => {
    return state.configuration;
  },
  configurationList: (state) => {
    return state.configurationList;
  }
};

export const mutations: MutationTree<ConfiguratorState> = {
  setConfiguration(state: ConfiguratorState, configuration: UserConfiguration) {
    state.configuration = configuration;
  },
  setConfigurationList(state: ConfiguratorState, configurationList: UserConfiguration[]) {
    state.configurationList = configurationList;
  },
  addUserConfiguration(state: ConfiguratorState, configuration: UserConfiguration) {
    state.configurationList = [...state.configurationList, configuration];
  },
  removeUserConfiguration(state: ConfiguratorState, configurationId: string) {
    state.configurationList = state.configurationList.filter((conf: UserConfiguration) => {
        return conf.id !== configurationId;
      })
  },
};

export const actions: ActionTree<ConfiguratorState, RootState> = {

};
