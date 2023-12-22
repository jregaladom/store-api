const express = require('express');
const routerAPI = require('./routes');
var cors = require('cors')

const { logErrors, errorHandler, boomErrorHandler } = require('./middlewares/error.handler');
const validatorHandler = require('./middlewares/validator.handler');

const port = 3003;

const app = express();

app.use(express.json());

const whitelist = ['http://localhost:8080', 'https://myapp.com'];
const options = {
  origin: (origin, callback) => {
    if (whitelist.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('No permitido'));
    }
  },
};
app.use(cors(options));

app.get('/', (req, res) => {
  res.send('Hello World!');
});

routerAPI(app);

app.use(validatorHandler);
app.use(logErrors);
app.use(boomErrorHandler);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
