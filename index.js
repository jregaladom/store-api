const express = require('express');
const routerAPI = require('./routes');
var cors = require('cors')

const { logErrors, errorHandler, boomErrorHandler, ormErrorHandler } = require('./middlewares/error.handler');
const validatorHandler = require('./middlewares/validator.handler');
const { checkApiKeyHandler } = require('./middlewares/auth.handler');
const port = 3003;

const app = express();

app.use(express.json());

// const whitelist = ['http://localhost:3003', 'https://myapp.com'];
// const options = {
//   origin: (origin, callback) => {
//     if (whitelist.includes(origin) || !origin) {
//       callback(null, true);
//     } else {
//       callback(new Error('No permitido'));
//     }
//   },
// };
// app.use(cors(options));
app.use(cors());

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('/nueva-ruta',
  checkApiKeyHandler,
  (req, res) => {
    res.send('Hello, Im new route');
  });

routerAPI(app);

app.use(validatorHandler);
app.use(logErrors);
app.use(boomErrorHandler);
app.use(errorHandler);
app.use(ormErrorHandler);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
