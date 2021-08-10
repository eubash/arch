import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {CompanyProduct, CompanyProductRelations} from '../models';

export class CompanyProductRepository extends DefaultCrudRepository<
  CompanyProduct,
  typeof CompanyProduct.prototype.id,
  CompanyProductRelations
> {
  constructor(
    @inject('datasources.db') dataSource: DbDataSource,
  ) {
    super(CompanyProduct, dataSource);
  }
}
