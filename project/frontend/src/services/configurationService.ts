import Vue from "vue";
import axios, { AxiosResponse } from "axios";
import configService from "./configService";

export interface Articulate {
  id: number;
  min_Value: number;
  max_value: number;
  price: number;
  currency: string;
  productId: number;
  companyId: number;
  code: string;
  description: string;
  name: string;
}

export interface Company {
  id: number;
  code: string;
  name: string;
  description: string;
}

export interface Configuration {
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
  },
  async saveUserConfiguration(configuration: UserConfiguration): Promise<UserConfiguration> {
    const res = await axios.post(`${configService.configurator.getConfigurationsUrl()}`, configuration);
    return res.data;
  },
  async updateUserConfiguration(confId: string, configuration: UserConfiguration): Promise<UserConfiguration> {
    const res = await axios.put(`${configService.configurator.getConfigurationsUrl()}/${confId}`, configuration);
    return res.data;
  },
  async getCompanyList(): Promise<Company> {
    const res = await axios.get(`${configService.configurator.getCompaniesUrl()}`);
    return res.data;
  },
  async getArticulatesList(companyId: string): Promise<Articulate[]> {
    const res = await axios.get(`${configService.configurator.getArticulatesUrl()}?companyId=${companyId}`);
    return res.data;
  },
};
