import {inject, lifeCycleObserver, LifeCycleObserver} from '@loopback/core';
import {juggler} from '@loopback/repository';
import {configuration} from "../config";

//Change DB url to: configuration.DATABASE_URI - get from environment
//Url per i test in locale: `mongodb+srv://remago:Remago12345@remago.4anw3.azure.mongodb.net/remago?retryWrites=true&w=majority`

const config = {
  'name': 'mongo',
  'connector': 'mongodb',
  'url': configuration.DATABASE_URI,
  'useNewUrlParser': true,
  'useUnifiedTopology': true
};

// Observe application's life cycle to disconnect the datasource when
// application is stopped. This allows the application to be shut down
// gracefully. The `stop()` method is inherited from `juggler.DataSource`.
// Learn more at https://loopback.io/doc/en/lb4/Life-cycle.html
@lifeCycleObserver('datasource')
export class MongoDataSource extends juggler.DataSource
  implements LifeCycleObserver {
  static dataSourceName = 'mongo';
  static readonly defaultConfig = config;

  constructor(
    @inject('datasources.config.mongo', {optional: true})
    dsConfig: object = config,
  ) {
    super(dsConfig);
  }
}
