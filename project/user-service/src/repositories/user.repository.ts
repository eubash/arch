import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MongoDataSource} from '../datasources';
import {RegisteredUser, UserRelations} from '../models';

export class UserRepository extends DefaultCrudRepository<
  RegisteredUser,
  typeof RegisteredUser.prototype.id,
  UserRelations
> {
  constructor(
    @inject('datasources.mongo') dataSource: MongoDataSource,
  ) {
    super(RegisteredUser, dataSource);
  }
}
