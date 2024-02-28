// const boom = require('@hapi/boom');

const { models } = require('./../libs/sequelize');

class OrderService {

  constructor() {
  }


  async addItem(data) {
    const newOrderProduct = await models.OrderProduct.create(
      data
    );
    return newOrderProduct;
  }

  async create(data) {
    const newOrder = await models.Order.create(data);
    return newOrder;
  }

  async find() {
    return [];
  }

  async findOne(id) {
    const order = await models.Order.findByPk(id, {
      include: [
        {
          association: 'customer',
          include: ['user']
        },

        'products',

      ]
    });
    return order;
  }

  async update(id, changes) {
    return {
      id,
      changes,
    };
  }

  async delete(id) {
    return { id };
  }

  async findByUser(userId) {
    const orders = await models.Order.findAll({
      where: {
        '$customer.user.id$': userId
      },
      include: [
        {
          association: 'customer',
          include: [{
            association: 'user',
            attributes: { exclude: ['password'] },
          }]
        },
        'products',
      ]
    });
    return orders;
  }

}

module.exports = OrderService;
