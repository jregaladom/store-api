const { faker } = require('@faker-js/faker');
const { boom }

class ProductService {
  constructor() {
    this.products = [];
    this.generate();
  }

  generate() {
    const limit = 100;
    this.products = [
    ];

    for (let index = 0; index < limit; index++) {
      this.products.push({
        id: faker.string.uuid(),
        name: faker.commerce.productName(),
        price: parseInt(faker.commerce.price(), 10),
        image: faker.image.url(),
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
    return this.products.filter((product, index) => index < limit);
  }

  async getProduct(id) {
    return this.products.find(product => product.id === id);
  }

  async updateProduct(id, product) {
    try {
      const index = this.products.findIndex(product => product.id === id);
      if (index === -1) return { product: product, message: 'error' };
      this.products[index] = product;
      return { product: product, message: 'updated' };
    } catch (error) {
      return { product: product, message: 'error' };
    }
  }

  async patchProduct(id, productChanges) {
    try {
      const index = this.products.findIndex(product => product.id === id);
      if (index === -1) return { product: product, message: 'error' };
      const product = this.products[index];

      this.products[index] = {
        ...product,
        ...productChanges,
      };

      return { product: product, message: 'updated' };
    } catch (error) {
      return { id: id, message: 'error' };
    }
  }

  async deleteProduct(id) {
    this.eleiminarglgo();
    this.products = this.products.filter(product => product.id !== id);
    return { message: 'deleted' };
  }
}

module.exports = ProductService;
