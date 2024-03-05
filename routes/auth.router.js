const express = require('express');
const passport = require('passport');
const router = express.Router();
// const jwt = require('jsonwebtoken');
// const { config } = require('../config/config');
const AuthService = require('../services/auth.service');
const service = new AuthService();

router.post('/login',
  passport.authenticate('local', { session: false }),
  async (req, res, next) => {
    try {
      const jwt = service.signToken(req.user);
      res.json(jwt);
    } catch (error) {
      next(error);
    }
  }
);

router.post('/recovery',
  async (req, res, next) => {
    try {
      const { email } = req.body;
      const resp = await service.recovery(email);
      res.json(resp);
    } catch (error) {
      next(error);
    }
  }
);





module.exports = router;

