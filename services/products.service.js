// const { faker } = require('@faker-js/faker');
const boom = require('@hapi/boom');
const { models } = require('../libs/sequelize');

// const pool = require('./../libs/postgres.pool');
// const sequelize = require('./../libs/sequelize');

const { CATEGORY_TABLE } = require('../db/models/category.model');
const CategoryService = require('./category.service');

class ProductService {
  constructor() {
  }


  async create(data) {
    const categoryService = new CategoryService();
    const name = categoryService.findOne(data.categoryId);
    let reponse = null;
    if (!name) {
      reponse = await models.Product.create(data, {
        include: [CATEGORY_TABLE]
      });
    } else {
      reponse = await models.Product.create(data);
    }

    return reponse;
  }

  async find() {
    const products = await models.Product.findAll({
      include: ['category']
    });
    return products;
  }

  async findOne(id) {
    const category = await models.Product.findByPk(id, {
      include: ['category']
    });
    if (!category) {
      throw boom.notFound('Product no encontrada');
    }
    return category;
  }


  // async find() {
  //   const query = 'SELECT * FROM tasks';
  //   //const response = await this.pool.query(query);
  //   const reponse = await sequelize.query(query, { type: sequelize.QueryTypes.SELECT });
  //   return reponse;
  // }

  // generate() {
  //   const limit = 100;
  //   for (let index = 0; index < limit; index++) {
  //     this.products.push({
  //       id: faker.string.uuid(),
  //       name: faker.commerce.productName(),
  //       price: parseInt(faker.commerce.price(), 10),
  //       image: faker.image.url(),
  //       isBlock: faker.datatype.boolean(),
  //     });
  //   }
  // }

  // async addProduct(product) {
  //   try {
  //     product.id = faker.string.uuid();
  //     this.products.push(product);
  //     return { product: product, message: 'created' };
  //   } catch (error) {
  //     return { product: product, message: 'error' };
  //   }
  // }

  // async getProducts(limit) {
  //   return new Promise((resolve) => { setTimeout(() => { resolve(this.products.filter((product, index) => index < limit)); }, 3000); })
  // }

  // async getProduct(id) {
  //   const product = this.products.find(item => item.id === id);

  //   if (!product) {
  //     throw boom.notFound('product not found');
  //   }

  //   if (product.isBlock) {
  //     throw boom.conflict('product is block');
  //   }
  //   return product;
  // }

  // async updateProduct(id, product) {
  //   const index = this.products.findIndex(product => product.id === id);
  //   if (index === -1) {
  //     throw boom.notFound('product not found');
  //   };
  //   this.products[index] = product;
  //   return { product: product, message: 'updated' };
  // }

  // async patchProduct(id, productChanges) {

  //   const index = this.products.findIndex(product => product.id === id);
  //   if (index === -1) { throw boom.notFound('product not found'); };
  //   const product = this.products[index];

  //   this.products[index] = {
  //     ...product,
  //     ...productChanges,
  //   };
  //   return { product: product, message: 'updated' };

  // }

  // async deleteProduct(id) {
  //   this.products = this.products.filter(product => product.id !== id);
  //   return { message: 'deleted' };
  // }
}

module.exports = ProductService;
