import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  requestBody,
  response,
} from '@loopback/rest';
import {CompanyProduct, CompanyProductRelations} from '../models';
import {CompanyProductRepository} from '../repositories';
import {price} from "../intefaces/price.interface";

//TODO: Try catch ovunque!!!!

export class ProductConfiguratorController {
  constructor(
    @repository(CompanyProductRepository)
    public companyProductRepository : CompanyProductRepository,
  ) {}

  @post('/products')
  @response(200, {
    description: 'CompanyProduct model instance',
    content: {'application/json': {schema: getModelSchemaRef(CompanyProduct)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(CompanyProduct, {
            title: 'NewCompanyProduct',
            exclude: ['id'],
          }),
        },
      },
    })
    companyProduct: Omit<CompanyProduct, 'id'>,
  ): Promise<CompanyProduct> {
    return this.companyProductRepository.create(companyProduct);
  }


  @get('/articulates/count')
  @response(200, {
    description: 'CompanyProduct model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(CompanyProduct) where?: Where<CompanyProduct>,
  ): Promise<Count> {
    return this.companyProductRepository.count(where);
  }

  //Exposed
  @get('/products')
  @response(200, {
    description: 'Array of CompanyProduct model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(CompanyProduct, {includeRelations: true}),
        },
      },
    },
  })
  async findByCommand(
    @param.filter(CompanyProduct) filter?: Filter<CompanyProduct>,
  ): Promise<CompanyProduct[]> {
    return this.companyProductRepository.find(filter);
  }

  /*
   * START Exposed routes
   */
  @get('/articulates')
  @response(200, {
    description: 'Articulates of determinated company',
    content: {
      'application/json': {
        schema: getModelSchemaRef(CompanyProduct, {includeRelations: true}),
      },
    },
  })
  async find(
    @param.query.number('companyId') id: number,
    // @param.filter(CompanyProduct) filter?: Filter<CompanyProduct>
  ): Promise<(CompanyProduct & CompanyProductRelations)[] | string> {
    if(!id) {
      //TODO: logger provider
      return "Query param comapnyId is missing";
    }
    const query = `SELECT * FROM company_product JOIN product p ON p.id = productId WHERE companyId = ${id}`;
    try {
      return await this.companyProductRepository.execute(query) as (CompanyProduct & CompanyProductRelations)[];
    } catch (e) {
      console.error(e);
      return "Something went wrong";
    }
  }

  @get('/price')
  @response(200, {
    description: 'Articulate price',
    content: {
      'application/json': {
        schema: getModelSchemaRef(CompanyProduct, {includeRelations: true}),
      },
    },
  })
  async findPrice(
    @param.query.number('companyId') id: number,
    @param.query.number('productId') pId: number,
  ): Promise<price | string> {
    if(!id) {
      //TODO: use Logger provider
      return "companyId query param is missing";
    }
    if(!pId) {
      return "productId query param is missing";
    }
    const query = `SELECT price,currency FROM company_product JOIN product p ON p.id = productId WHERE companyId = ${id} AND productId = ${pId}`;
    try {
      const result = await this.companyProductRepository.execute(query) as price[];
      return result[0];
    } catch (e) {
      console.error(e);
      return "Something went wrong";
    }
  }

  /*
   * END Exposed routes
   */
}
