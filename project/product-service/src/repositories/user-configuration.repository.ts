import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {UserConfiguration, UserConfigurationRelations} from '../models';

export class UserConfigurationRepository extends DefaultCrudRepository<
  UserConfiguration,
  typeof UserConfiguration.prototype.id,
  UserConfigurationRelations
> {
  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource,
  ) {
    super(UserConfiguration, dataSource);
  }
}
