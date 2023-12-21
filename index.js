const express = require('express');
const routerAPI = require('./routes');

const { logErrors, errorHandler } = require('./middlewares/error.handler');

const port = 3003;


express.application.prefix = express.Router.prefix = function (path, configure) {
  var router = express.Router();
  this.use(path, router);
  configure(router);
  return router;
};

const app = express();

app.use(express.json());

app.use(logErrors);
app.use(errorHandler);

app.get('/', (req, res) => {
  res.send('Hello World!');
});

routerAPI(app);


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
