const OrderController = require('./orders.controller');
const PermissionMiddleware = require('../common/middlewares/auth.permission.middleware');
const ValidationMiddleware = require('../common/middlewares/auth.validation.middleware');
const config = require('../common/config/env.config');

const PAID = config.permissionLevels.PAID_USER;

exports.routesConfig = function (app) {
    app.post('/orders', [
        //PermissionMiddleware.minimumPermissionLevelRequired(PAID),
        OrderController.insert
    ]);
    app.get('/orders', [
        //ValidationMiddleware.validJWTNeeded,
        //PermissionMiddleware.minimumPermissionLevelRequired(PAID),
        OrderController.list
    ]);
    app.get('/orders/:orderId', [
        //ValidationMiddleware.validJWTNeeded,
        //PermissionMiddleware.minimumPermissionLevelRequired(PAID),
        OrderController.getById
    ]);
    app.patch('/orders/:orderId', [
        //ValidationMiddleware.validJWTNeeded,
        //PermissionMiddleware.minimumPermissionLevelRequired(PAID),
        OrderController.patchById
    ]);
    app.delete('/orders/:orderId', [
        //ValidationMiddleware.validJWTNeeded,
        //PermissionMiddleware.minimumPermissionLevelRequired(PAID),
        OrderController.removeById
    ]);
};