import {inject, lifeCycleObserver, LifeCycleObserver} from '@loopback/core';
import {juggler} from '@loopback/repository';
import {configuration} from "../configuration";
import UserOperations from "../operations/users";
import CompanyOperations from "../operations/companies";
import ArticulatesOperations from "../operations/articulates";
import PriceOperations from "../operations/price";
import UserConfigurationOperations from "../operations/userConfigurations";

export const userServiceUrl = configuration.USER_SERVICE_BASE_URL ? configuration.USER_SERVICE_BASE_URL : 'http://localhost:3001';
export const productServiceUrl = configuration.PRODUCT_SERVICE_BASE_URL ? configuration.PRODUCT_SERVICE_BASE_URL : 'http://localhost:3002';

const config = {
  name: 'restds',
  connector: 'rest',
  baseURL: `${userServiceUrl}/`,
  crud: false,
  options: {
    headers: {
      accept: 'application/json',
      'content-type': 'application/json',
    },
  },
  operations: [
    UserOperations.createUser(userServiceUrl),
    UserOperations.getUserList(userServiceUrl),
    CompanyOperations.getCompanies(productServiceUrl),
    ArticulatesOperations.getArticulates(productServiceUrl),
    PriceOperations.getPrice(productServiceUrl),
    UserConfigurationOperations.getUserConfigurations(productServiceUrl),
    UserConfigurationOperations.getUserConfigurationById(productServiceUrl),
    UserConfigurationOperations.createUserConfiguration(productServiceUrl),
    UserConfigurationOperations.updateUserConfiguration(productServiceUrl),
    // UserConfigurationOperations.patchUserConfiguration(productServiceUrl),
    UserConfigurationOperations.deleteUserConfiguration(productServiceUrl)
  ]
};

// Observe application's life cycle to disconnect the datasource when
// application is stopped. This allows the application to be shut down
// gracefully. The `stop()` method is inherited from `juggler.DataSource`.
// Learn more at https://loopback.io/doc/en/lb4/Life-cycle.html
@lifeCycleObserver('datasource')
export class RestdsDataSource extends juggler.DataSource
  implements LifeCycleObserver {
  static dataSourceName = 'restds';
  static readonly defaultConfig = config;

  constructor(
    @inject('datasources.config.restds', {optional: true})
    dsConfig: object = config,
  ) {
    super(dsConfig);
  }
}
