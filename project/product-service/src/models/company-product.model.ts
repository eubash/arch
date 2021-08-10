import {Entity, model, property, belongsTo} from '@loopback/repository';
import {Product, ProductWithRelations} from "./product.model";
import {Company, CompanyWithRelations} from "./company.model";

@model({
  name: 'articulates',
  settings: {
    idInjection: false,
    mysql: {schema: 'articulates', table: 'company_product'},
    foreignKeys: {
      fk_product_productId: {
        name: 'fk_product_productId',
        entity: 'Product',
        entityKey: 'id',
        foreignKey: 'productId',
      },
      fk_company_companyId: {
        name: 'fk_company_companyId',
        entity: 'Company',
        entityKey: 'id',
        foreignKey: 'companyId',
      },
    },
  },
})
export class CompanyProduct extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'number',
  })
  min_Value?: number;

  @property({
    type: 'number',
  })
  max_value?: number;

  @property({
    type: 'number',
    required: true,
  })
  price: number;

  @property({
    type: 'string',
    required: true,
  })
  currency: string;

  @belongsTo(() => Product,{name: 'product'})
  productId: number;

  @belongsTo(() => Company,{name: 'company'})
  companyId: number;

  constructor(data?: Partial<CompanyProduct>) {
    super(data);
  }
}

export interface CompanyProductRelations {
  // describe navigational properties here
  company?: CompanyWithRelations;
  product?: ProductWithRelations;
}

export type CompanyProductWithRelations = CompanyProduct & CompanyProductRelations;
