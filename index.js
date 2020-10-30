'use strict';

const config = require('./common/config/env.config')

const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const AuthorizationRouter = require('./auth/routes.config');
const UsersRouter = require('./users/routes.config');
const ItemsRouter = require('./menuitems/routes.config');
const OrdersRouter = require('./ordering/routes.config');
const TodosRouter = require('./todos/routes.config');

// allow CORS - Cross-Origin Resource Sharing
app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE');
    res.header('Access-Control-Expose-Headers', 'Content-Length');
    res.header('Access-Control-Allow-Headers', 'Accept, Authorization, Content-Type, X-Requested-With, Range');
    if (req.method === 'OPTIONS') {
        return res.sendStatus(200);
    } else {
        return next();
    }
});

app.use(bodyParser.json());
//AuthorizationRouter.routesConfig(app);
UsersRouter.routesConfig(app);
ItemsRouter.routesConfig(app);
OrdersRouter.routesConfig(app);
TodosRouter.routesConfig(app);

app.listen(config.port, function () {
  console.log('Your server is listening on port %d (http://localhost:%d)', config.port, config.port);
});
