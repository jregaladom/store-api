const UserService = require('./user.service');
const service = new UserService();
const boom = require('@hapi/boom');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { config } = require('../config/config');
const nodemailer = require("nodemailer");

class AuthService {

  async getUser(email, password) {
    service.findByEmail(email)
      .then(async user => {
        if (!user) {
          throw boom.unauthorized();
        }
        const isPassword = await bcrypt.compare(password, user.password);

        if (!isPassword) {
          throw boom.unauthorized();
        }
        delete user.dataValues.password;
        return user;
      })
      .catch(err => {
        throw err;
      });
  }

  signToken(user) {
    const payload = {
      sub: user.id,
      role: user.role
    };
    const token = jwt.sign(payload, config.AUTH_JWT_SECRET);
    return {
      token,
      user
    };
  }

  async recovery(mail) {
    const user = await service.findByEmail(mail);
    const transporter = nodemailer.createTransport({
      host: config.mail.mailHost,
      port: config.mail.mailPort,
      auth: {
        user: config.mail.mailUser,
        pass: config.mail.mailPassword,
      },
    });

    await transporter.sendMail({
      from: `API Store 👻" <${config.mail.mailUser}>`, // sender address
      to: `${user.email}`, // list of receivers
      subject: "Recovery Account ✔", // Subject line
      text: "Hello world, recovery account here", // plain text body
      html: "<b>Hello world?</b>", // html body
    });

    return {
      message: 'Recovery email sent'
    }
  }



}

module.exports = AuthService;
