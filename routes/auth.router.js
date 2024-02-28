const express = require('express');
const passport = require('passport');
const router = express.Router();
const jwt = require('jsonwebtoken');
const { config } = require('../config/config');


router.post('/login',
  passport.authenticate('local', { session: false }),
  async (req, res, next) => {
    try {
      const payload = {
        sub: req.user.id,
        role: req.user.role
      };
      const token = jwt.sign(payload, config.AUTH_JWT_SECRET);
      res.json({
        token,
        user: req.user
      });
    } catch (error) {
      next(error);
    }
  }
);




module.exports = router;

