const { faker } = require('@faker-js/faker');
const boom = require('@hapi/boom');

class ProductService {
  constructor() {
    this.products = [];
    this.generate();
  }

  generate() {
    const limit = 100;
    for (let index = 0; index < limit; index++) {
      this.products.push({
        id: faker.string.uuid(),
        name: faker.commerce.productName(),
        price: parseInt(faker.commerce.price(), 10),
        image: faker.image.url(),
        isBlock: faker.datatype.boolean(),
      });
    }
  }

  async addProduct(product) {
    try {
      product.id = faker.string.uuid();
      this.products.push(product);
      return { product: product, message: 'created' };
    } catch (error) {
      return { product: product, message: 'error' };
    }
  }

  async getProducts(limit) {
    return new Promise((resolve) => { setTimeout(() => { resolve(this.products.filter((product, index) => index < limit)); }, 3000); })
  }

  async getProduct(id) {
    const product = this.products.find(item => item.id === id);

    if (!product) {
      throw boom.notFound('product not found');
    }

    if (product.isBlock) {
      throw boom.conflict('product is block');
    }
    return product;
  }

  async updateProduct(id, product) {
    const index = this.products.findIndex(product => product.id === id);
    if (index === -1) {
      throw boom.notFound('product not found');
    };
    this.products[index] = product;
    return { product: product, message: 'updated' };
  }

  async patchProduct(id, productChanges) {

    const index = this.products.findIndex(product => product.id === id);
    if (index === -1) { throw boom.notFound('product not found'); };
    const product = this.products[index];

    this.products[index] = {
      ...product,
      ...productChanges,
    };
    return { product: product, message: 'updated' };

  }

  async deleteProduct(id) {
    this.products = this.products.filter(product => product.id !== id);
    return { message: 'deleted' };
  }
}

module.exports = ProductService;
