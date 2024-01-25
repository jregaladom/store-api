const boom = require('@hapi/boom');

const { models } = require('../libs/sequelize');

class CustomerService {
  constructor() { }

  async create(data) {
    const reponse = await models.Customer.create(data);
    return reponse;
  }

  async find() {
    const customer = await models.Customer.findAll({
      include: [
        {
          association: 'user',
          attributes: ['id', 'email']
        }
      ]
    });
    return customer;
  }

  async findOne(id) {
    const customer = await models.Customer.findByPk(id);
    if (!customer) {
      throw boom.notFound('Customer no encontrado');
    }
    return customer;
  }

  async update(id, changes) {
    const customer = await this.findOne(id);
    const response = await customer.update(changes);
    return response;
  }

  async delete(id) {
    const customer = await this.findOne(id);
    await customer.destroy();
    return { id };
  }
}

module.exports = CustomerService;
