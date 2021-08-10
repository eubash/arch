import {Entity, model, property} from '@loopback/repository';
import {configuration} from "../intefaces/configuration.interface";

@model({settings: {strict: false}})
export class UserConfiguration extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'string',
    default: 'Configuration',
  })
  configurationName?: string;

  @property({
    type: 'string',
    required: true,
  })
  userId: string;

  @property({
    type: 'number',
    required: true,
  })
  companyId: number;

  @property({
    type: 'array',
    itemType: 'object',
    required: true,
  })
  configuration: configuration[];

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<UserConfiguration>) {
    super(data);
  }
}

export interface UserConfigurationRelations {
  // describe navigational properties here
}

export type UserConfigurationWithRelations = UserConfiguration & UserConfigurationRelations;
