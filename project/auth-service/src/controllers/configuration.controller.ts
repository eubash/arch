import {authenticate, TokenService} from '@loopback/authentication';
import {
  TokenServiceBindings
} from '@loopback/authentication-jwt';
import {inject} from '@loopback/core';
import {model, property, Entity} from '@loopback/repository';
import {ConfiguratorService} from "../services";
import {
  get,
  getModelSchemaRef,
  post,
  requestBody,
  SchemaObject,
  param,
  patch,
  put,
  del,
  response
} from '@loopback/rest';

@model()
export class NewUserConfiguration extends Entity {
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
  configuration: [];
}

const UserConfiguration: SchemaObject = {
  type: 'object',
  required: ['userId', 'companyId', 'configuration'],
  properties: {
    configurationName: {
      type: 'string'
    },
    userId: {
      type: 'string'
    },
    companyId: {
      type: 'number'
    },
    configuration: {
      type: 'array'
    }
  },
};

export class ConfigurationController {
  constructor(
    @inject(TokenServiceBindings.TOKEN_SERVICE)
    public jwtService: TokenService,
    @inject('services.Configurator')
    protected configuratorService: ConfiguratorService,
  ) {}

  //GATEWAY ROUTES
  @authenticate('jwt')
  @get('/companies', {
    responses: {
      '200': {
        description: 'Return available companies',
        content: {
          'application/json': {
            schema: {
              type: Object,
            },
          },
        },
      },
    },
  })
  async getCompanies(): Promise<object[]> {
    return await this.configuratorService.getCompanies();
  }

  @authenticate('jwt')
  @get('/articulates', {
    responses: {
      '200': {
        description: 'Return company articulates',
        content: {
          'application/json': {
            schema: {
              type: Object,
            },
          },
        },
      },
    },
  })
  async getArticulates(
    @param.query.number('companyId') id: number,
  ): Promise<object[] | string> {
    if(!id) {
      //TODO: logger provider
      return "Query param comapnyId is missing";
    }
    return await this.configuratorService.getArticulates(id);
  }

  @authenticate('jwt')
  @get('/price', {
    responses: {
      '200': {
        description: 'Return articulate price',
        content: {
          'application/json': {
            schema: {
              type: Object,
            },
          },
        },
      },
    },
  })
  async getPrice(
    @param.query.number('companyId') id: number,
    @param.query.number('productId') pId: number,
  ): Promise<object | string> {
    if(!id) {
      //TODO: use Logger provider
      return "companyId query param is missing";
    }
    if(!pId) {
      return "productId query param is missing";
    }
    return await this.configuratorService.getPrice(id, pId);
  }

  @authenticate('jwt')
  @get('/user-configurations', {
    responses: {
      '200': {
        description: 'Return user configurations',
        content: {
          'application/json': {
            schema: {
              type: Object,
            },
          },
        },
      },
    },
  })
  async getUserConfigurationList(
    @param.query.string('userId') id: string,
  ): Promise<object[] | string> {
    if(!id) {
      //TODO: use Logger provider
      return "userId query param is missing";
    }
    return await this.configuratorService.getUserConfigurationList(id);
  }

  @authenticate('jwt')
  @get('/user-configurations/{id}', {
    responses: {
      '200': {
        description: 'Return user configuration by id',
        content: {
          'application/json': {
            schema: {
              type: Object,
            },
          },
        },
      },
    },
  })
  async getUserConfigurationById(
    @param.path.string('id') id: string,
  ): Promise<object> {
    return await this.configuratorService.getUserConfigurationById(id);
  }

  @authenticate('jwt')
  @post('/user-configurations')
  @response(200, {
    description: 'Create new user configuration',
    content: {'application/json': {schema: UserConfiguration}},
  })
  async createNewUserConfiguration(
    @requestBody({
      content: {
        'application/json': {
          schema: UserConfiguration
        },
      },
    })
      userConfiguration: Omit<NewUserConfiguration, 'id'>,
  ): Promise<object> {
    return await this.configuratorService.createUserConfiguration(userConfiguration.userId, userConfiguration.companyId, userConfiguration.configuration, userConfiguration.configurationName);
  }

  // @authenticate('jwt')
  // @patch('/user-configurations/{id}')
  // @response(204, {
  //   description: 'UserConfiguration PATCH success',
  //   content: {'application/json': {schema: UserConfiguration}},
  // })
  // async patchUserConfiguration(
  //   @param.path.string('id') id: string,
  //   @requestBody({
  //     content: {
  //       'application/json': {
  //         schema: getModelSchemaRef(NewUserConfiguration, {partial: true}),
  //       },
  //     },
  //   })
  //     userConfiguration: NewUserConfiguration,
  // ): Promise<NewUserConfiguration> {
  //   return await this.configuratorService.patchUserConfiguration(id, userConfiguration?.userId, userConfiguration?.companyId, userConfiguration?.configuration, userConfiguration?.configurationName);
  // }

  @authenticate('jwt')
  @put('/user-configurations/{id}')
  @response(204, {
    description: 'UserConfiguration PUT success',
    content: {'application/json': {schema: UserConfiguration}},
  })
  async updateUserConfiguration(
    @param.path.string('id') id: string,
    @requestBody() userConfiguration: NewUserConfiguration,
  ): Promise<NewUserConfiguration> {
    return await this.configuratorService.updateUserConfiguration(id, userConfiguration.userId, userConfiguration.companyId, userConfiguration.configuration, userConfiguration?.configurationName);
  }

  @authenticate('jwt')
  @del('/user-configurations/{id}')
  @response(204, {
    description: 'UserConfiguration DELETE success',
  })
  async deleteUserConfiguration(@param.path.string('id') id: string): Promise<string> {
    return await this.configuratorService.deleteUserConfiguration(id);
  }
}
