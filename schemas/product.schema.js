const Joi = require('joi');

const id = Joi.number().integer();
const name = Joi.string().min(3).max(15);
const price = Joi.number().precision(2);
const description = Joi.string().min(10).max(100);
const image = Joi.string().uri();
const categoryId = Joi.number().integer();

const createProductSchema = Joi.object({
  name: name.required(),
  price: price.required(),
  image: image.required(),
  description: description.required(),
  category: Joi.object({
    name: name.required(),
    image: image.required()
  }),
  categoryId: categoryId
});

const updateProductSchema = Joi.object({
  name: name,
  price: price,
  image: image,
  description: description,
  categoryId: categoryId
});

const getProductSchema = Joi.object({
  id: id.required(),
});

module.exports = { createProductSchema, updateProductSchema, getProductSchema }
