const boom = require('@hapi/boom');
const { models } = require('../libs/sequelize');

class CategoryService {

  constructor() {
  }
  async create(data) {
    const reponse = await models.Category.create(data);
    return reponse;
  }

  async find() {
    const category = await models.Category.findAll();
    return category;
  }

  async findOne(id) {
    const category = await models.Category.findByPk(id, {
      include: ['products']
    });
    if (!category) {
      throw boom.notFound('Category no encontrada');
    }
    return category;
  }

  async findName(name) {
    const category = await models.Category.findOne({ where: { name: name } });
    if (!category) {
      throw boom.notFound('Category no encontrada');
    }
    return category;
  }

  async update(id, changes) {
    const category = await this.findOne(id);
    const response = await category.update(changes);
    return response;
  }

  async delete(id) {
    const category = await this.findOne(id);
    await category.destroy();
    return { id };
  }

}

module.exports = CategoryService;
