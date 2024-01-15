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
  }
}

module.exports = { config };
