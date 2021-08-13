import Vue from "vue";
import axios, { AxiosResponse } from "axios";
import configService from "./configService";

interface Configuration {
  productId?: number;
  quantity?: number;
}

export interface UserConfiguration {
  id?: string;
  configurationName?: string;
  userId?: string;
  companyId?: number;
  configuration?: Configuration[];
}

export default {
  async getExistingConfigurationList(userId: string): Promise<[]> {
    const res = await axios.get(`${configService.configurator.getConfigurationsUrl()}?userId=${userId}`);
    return res.data;
  },
  async deleteUserConfiguration(configurationId: string): Promise<string> {
    const res = await axios.delete(`${configService.configurator.getConfigurationsUrl()}/${configurationId}`);
    return res.data;
  },
  async getUserConfiguration(configurationId: string): Promise<UserConfiguration> {
    const res = await axios.get(`${configService.configurator.getConfigurationsUrl()}/${configurationId}`);
    return res.data;
  }
};
