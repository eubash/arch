import {inject, lifeCycleObserver, LifeCycleObserver} from '@loopback/core';
import {juggler} from '@loopback/repository';
import {configuration} from "../configuration";

//Change DB url to: configuration.DATABASE_URI - get from environment

const connectionUrl = configuration.DATABASE_URI ? configuration.DATABASE_URI : "";

const config = {
  'name': 'mongo',
  'connector': 'mongodb',
  'url': connectionUrl,
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
