import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
} from '@loopback/rest';
import {UserConfiguration} from '../models';
import {UserConfigurationRepository} from '../repositories';

export class UserConfigurationController {
  constructor(
    @repository(UserConfigurationRepository)
    public userConfigurationRepository : UserConfigurationRepository,
  ) {}

  //Exposed
  @post('/user-configurations')
  @response(200, {
    description: 'UserConfiguration model instance',
    content: {'application/json': {schema: getModelSchemaRef(UserConfiguration)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(UserConfiguration, {
            title: 'NewUserConfiguration',
            exclude: ['id'],
          }),
        },
      },
    })
    userConfiguration: Omit<UserConfiguration, 'id'>,
  ): Promise<UserConfiguration> {
    return await this.userConfigurationRepository.create(userConfiguration);
  }

  @get('/user-configurations/count')
  @response(200, {
    description: 'UserConfiguration model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(UserConfiguration) where?: Where<UserConfiguration>,
  ): Promise<Count> {
    return this.userConfigurationRepository.count(where);
  }

  //Exposed
  @get('/user-configurations')
  @response(200, {
    description: 'Array of UserConfiguration model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(UserConfiguration, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.query.string('userId') uid: string,
    @param.filter(UserConfiguration) filter?: Filter<UserConfiguration>,
  ): Promise<UserConfiguration[]> {
    if(uid) {
      filter = filter ? filter : {};
      filter.where = {
        userId: uid
      }
    }
    return await this.userConfigurationRepository.find(filter);
  }

  //Exposed
  @get('/user-configurations/{id}')
  @response(200, {
    description: 'UserConfiguration model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(UserConfiguration, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(UserConfiguration, {exclude: 'where'}) filter?: FilterExcludingWhere<UserConfiguration>
  ): Promise<UserConfiguration> {
    return await this.userConfigurationRepository.findById(id, filter);
  }

  //Exposed
  @patch('/user-configurations/{id}')
  @response(204, {
    description: 'UserConfiguration PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(UserConfiguration, {partial: true}),
        },
      },
    })
    userConfiguration: UserConfiguration,
  ): Promise<UserConfiguration> {
    await this.userConfigurationRepository.updateById(id, userConfiguration);
    return await this.userConfigurationRepository.findById(id);
  }

  //Exposed
  @put('/user-configurations/{id}')
  @response(204, {
    description: 'UserConfiguration PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() userConfiguration: UserConfiguration,
  ): Promise<UserConfiguration> {
    await this.userConfigurationRepository.replaceById(id, userConfiguration);
    return await this.userConfigurationRepository.findById(id);
  }

  //Exposed
  @del('/user-configurations/{id}')
  @response(204, {
    description: 'UserConfiguration DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<string> {
    await this.userConfigurationRepository.deleteById(id);
    return id;
  }
}
