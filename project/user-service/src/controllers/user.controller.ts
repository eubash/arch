// Uncomment these imports to begin using these cool features!
import {inject} from '@loopback/core';
import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  param,
  patch,
  post,
  put,
  requestBody,
  SchemaObject
} from '@loopback/rest';
import {RegisteredUser} from '../models';
import {UserRepository} from '../repositories';

const UserSchema: SchemaObject = {
  type: 'object',
  required: ['email'],
  properties: {
    guid: {
      type: 'string'
    },
    email: {
      type: 'string',
      format: 'email',
    },
    company: {
      type: 'string'
    },
    username: {
      type: 'string'
    }
  },
};


export class UserController {
  constructor(
    @repository(UserRepository)
    public userRepository: UserRepository,
  ) {}

  //Start SRV routes
  @post('/users', {
    responses: {
      '200': {
        description: 'User model instance',
        content: {'application/json': {schema: UserSchema}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(RegisteredUser, {
            title: 'NewUser'
          }),
        },
      },
    })
      user: Omit<RegisteredUser, 'id'>,
  ): Promise<RegisteredUser> {
    return await this.userRepository.create(user);
  }

  @del('/users/{id}', {
    responses: {
      '204': {
        description: 'User DELETE success',
      },
    },
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.userRepository.deleteById(id);
  }

  @put('/users/{id}', {
    responses: {
      '204': {
        description: 'User PUT success',
      },
    },
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() user: RegisteredUser,
  ): Promise<void> {
    await this.userRepository.replaceById(id, user);
  }
  //End SRV routes

  @get('/users/{id}', {
    responses: {
      '200': {
        description: 'User model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(RegisteredUser, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findOne(
    @param.path.string('id') id: string,
  ): Promise<RegisteredUser | null> {
    return this.userRepository.findOne({where : {guid : id}});
  }

  @get('/users', {
    responses: {
      '200': {
        description: 'Array of User model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(RegisteredUser),
            },
          },
        },
      },
    },
  })
  async find(@param.filter(RegisteredUser) filter?: Filter<RegisteredUser>): Promise<RegisteredUser[]> {
    return this.userRepository.find(filter);
  }
}
