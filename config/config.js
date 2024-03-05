require('dotenv').config();


const config = {
  env: process.env.NODE_ENV || 'development',
  port: process.env.APP_PORT || 3003,
  db: {
    dbUser: process.env.DB_USER,
    dbPassword: process.env.DB_PASSWORD,
    dbName: process.env.DB_NAME,
    dbPort: process.env.DB_PORT,
    dbAddress: process.env.DB_ADDRES,
  },
  mail: {
    mailHost: process.env.MAIL_HOST,
    mailPort: process.env.MAIL_PORT,
    mailSecure: process.env.MAIL_SECURE,
    mailUser: process.env.MAIL_USER,
    mailPassword: process.env.MAIL_PASSWORD,
  },
  API_KEY: process.env.API_KEY,
  AUTH_JWT_SECRET: process.env.AUTH_JWT_SECRET,
}

module.exports = { config };
