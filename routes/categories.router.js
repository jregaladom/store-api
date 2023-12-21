const express = require('express');

const router = express.Router();

router.get('/:categoryId/products/:productId', (req, res) => {
  const { categoryId, productId } = req.params;
  const products = [
    { id: 1, name: 'product1', categoryId: 1 },
    { id: 2, name: 'product2', categoryId: 2 },
    { id: 3, name: 'product3', categoryId: 1 },
  ];
  const product = products.filter((product) => product.categoryId == categoryId && product.id == productId);
  res.json(product);
});

module.exports = router;
