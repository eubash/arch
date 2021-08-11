import {inject, Provider} from '@loopback/core';
import {getService} from '@loopback/service-proxy';
import {RestdsDataSource} from '../datasources';
import {NewUserConfiguration} from "../controllers";

export interface ConfiguratorService {
  // this is where you define the Node.js methods that will be
  // mapped to REST/SOAP/gRPC operations as stated in the datasource
  // json file.
  getCompanies(): Promise<object[]>;
  getArticulates(companyId: number): Promise<object[] | string>;
  getPrice(companyId: number, productId: number): Promise<object | string>;
  getUserConfigurationList(userId?: string): Promise<object[]>;
  getUserConfigurationById(id: string): Promise<object>;
  createUserConfiguration(userId: string, companyId: number, configuration: [], configurationName?: string): Promise<NewUserConfiguration>;
  updateUserConfiguration(id: string, userId: string, companyId: number, configuration: [], configurationName?: string): Promise<NewUserConfiguration>;
  // patchUserConfiguration(id: string, userId?: string, companyId?: number, configuration?: [], configurationName?: string): Promise<NewUserConfiguration>;
  deleteUserConfiguration(id: string): Promise<string>;
}

export class ConfiguratorProvider implements Provider<ConfiguratorService> {
  constructor(
    @inject('datasources.restds')
    protected dataSource: RestdsDataSource = new RestdsDataSource(),
  ) {}

  value(): Promise<ConfiguratorService> {
    return getService(this.dataSource);
  }
}
