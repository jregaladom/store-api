const express = require('express');
const router = express.Router();
const ServiceProduct = require('../services/products.service');
const serviceProduct = new ServiceProduct();

router.get('/', async (req, res) => {
  let { limit } = req.query;
  if (!limit) {
    limit = 100;
  }
  const products = await serviceProduct.getProducts(limit);
  res.json(products);
});

router.get('/filter', (req, res) => {
  res.send('Soy un filter');
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const product = await serviceProduct.getProduct(id);
  res.json(product);
});

router.post('/', async (req, res) => {
  const { body } = req;
  const created = await serviceProduct.addProduct(body);
  if (created.message === 'error') {
    res.status(404).json({
      message: 'error to created',
    });
  } else {
    res.status(201).json(created);
  }
});


router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { body } = req;
  const updated = await serviceProduct.updateProduct(id, body);
  if (updated.message === 'error') {
    res.status(404).json({
      message: 'error to created',
    });
  } else {
    res.status(201).json(updated);
  }
});

router.patch('/:id', async (req, res) => {
  const { id } = req.params;
  const { body } = req;
  const updated = await serviceProduct.patchProduct(id, body);
  if (updated.message === 'error') {
    res.status(404).json({
      message: 'error to patch',
    });
  } else {
    res.status(201).json(updated);
  }
});

router.delete('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const deleted = await serviceProduct.deleteProduct(id);
    if (deleted.message === 'error') {
      res.status(404).json({
        message: 'error to created',
      });
    } else {
      res.status(201).json(deleted);
    }
  } catch (error) {
    next(error);
  }
});


module.exports = router;
