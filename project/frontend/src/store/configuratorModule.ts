import { MutationTree, ActionTree, ActionContext, GetterTree } from "vuex";
import { RootState } from "./index";
import {UserConfiguration, Company, Articulate} from "@/services/configurationService";


export interface ConfiguratorState {
  configuration: UserConfiguration;
  configurationList: UserConfiguration[];
  company: Company | undefined;
  companyList: Company[];
  articulatesList: Articulate[];
}

type ConfiguratorContext = ActionContext<ConfiguratorState, RootState>;

export const namespaced = true;

export const state = (): ConfiguratorState => ({
  articulatesList: [],
  companyList: [],
  company: undefined,
  configurationList: [],
  configuration: {
    configurationName: "New configuration",
    userId: undefined,
    companyId: undefined,
    configuration: [
      {
      productId: 1,
      quantity: 1
    },
      {
        productId: 2,
        quantity: 1
      },
      {
        productId: 3,
        quantity: 1
      }
    ]
  }
});

export const getters: GetterTree<ConfiguratorState, RootState> = {
  configuration: (state) => {
    return state.configuration;
  },
  configurationList: (state) => {
    return state.configurationList;
  },
  company: (state) => {
    return state.company;
  },
  companyList: (state) => {
    return state.companyList;
  },
  articulatesList: (state) => {
    return state.articulatesList;
  },
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
  setCompany(state: ConfiguratorState, company: Company) {
    state.company = company;
  },
  setCompanyList(state: ConfiguratorState, companyList: Company[]) {
    state.companyList = companyList;
  },
  setArticulatesList(state: ConfiguratorState, articulatesList: Articulate[]) {
    state.articulatesList = articulatesList;
  }
};

export const actions: ActionTree<ConfiguratorState, RootState> = {

};
