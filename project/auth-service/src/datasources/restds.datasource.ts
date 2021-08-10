import {inject, lifeCycleObserver, LifeCycleObserver} from '@loopback/core';
import {juggler} from '@loopback/repository';
import {configuration} from "../config";

//Change url to: configuration.USER_SERVICE_BASE_URL - get from environment
//Url per i test in locale: http://localhost:3001/

const config = {
  name: 'restds',
  connector: 'rest',
  baseURL: `${configuration.USER_SERVICE_BASE_URL}/`,//'http://user.service/', //'http://localhost:3001' //mancava / `${configuration.USER_SERVICE_BASE_URL}/`
  crud: false,
  options: {
    headers: {
      accept: 'application/json',
      'content-type': 'application/json',
    },
  },
  operations: [
    {
      template: {
        method: 'POST',
        url: `${configuration.USER_SERVICE_BASE_URL}/users`,//'http://user.service/users', //http://localhost:3001
        headers: {
          "accept": "application/json",
          "content-type": "application/json"
        },
        body: {
          guid: "{guid:string}",
          email: "{email:string}",
          username: "{username:string}",
          company: "{company:string}"
        },
      },
      functions: {
        "saveUser": [
          "guid",
          "email",
          "username",
          "company"
        ]
      }
    },
    {
      template: {
        method: "GET",
        url: `${configuration.USER_SERVICE_BASE_URL}/users`,
        headers: {
          "accepts": "application/json",
          "content-type": "application/json"
        },
      },
      functions: {
        "getUserList": []
      }
    }
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
