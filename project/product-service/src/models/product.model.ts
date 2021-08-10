import {Entity, model, property, hasOne} from '@loopback/repository';

@model({
  name: 'products',
  settings: {
    idInjection: false,
    mysql: {schema: 'articulates', table: 'product'}
  }
})
export class Product extends Entity {
  @property({
    type: 'string',
    required: true,
  })
  code: string;

  @property({
    type: 'string',
  })
  description?: string;

  @property({
    type: 'string',
    required: false,
  })
  name: string;

  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  constructor(data?: Partial<Product>) {
    super(data);
  }
}

export interface ProductRelations {
  // describe navigational properties here
}

export type ProductWithRelations = Product & ProductRelations;
