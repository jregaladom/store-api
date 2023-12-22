const express = require('express');
const routerAPI = require('./routes');

const { logErrors, errorHandler, boomErrorHandler } = require('./middlewares/error.handler');
const validatorHandler = require('./middlewares/validator.handler');

const port = 3003;


express.application.prefix = express.Router.prefix = function (path, configure) {
  var router = express.Router();
  this.use(path, router);
  configure(router);
  return router;
};

const app = express();

app.use(express.json());


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
