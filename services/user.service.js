const boom = require('@hapi/boom');

// const getConnection = require('../libs/postgres');
const { models } = require('../libs/sequelize');

class UserService {
  constructor() { }

  async create(data) {
    const reponse = await models.User.create(data);
    return reponse;
  }

  async find() {
    const user = await models.User.findAll({
      include: [
        {
          association: 'customer',
          attributes: ['id', 'name', 'lastName', 'phone']
        }
      ]
    });
    return user;
  }

  async findOne(id) {
    const user = await models.User.findByPk(id);
    if (!user) {
      throw boom.notFound('Usuario no encontrado');
    }
    return user;
  }

  async update(id, changes) {
    const user = await this.findOne(id);
    const response = await user.update(changes);
    return response;
  }

  async delete(id) {
    const user = await this.findOne(id);
    await user.destroy();
    return { id };
  }
}

module.exports = UserService;
