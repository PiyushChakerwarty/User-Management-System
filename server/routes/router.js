const express = require('express');
const route = express.Router();
const services=require('../services/render')
const controller = require('../controller/controller');

/**
 * @description Root Route
 * @method GET/
 */

route.get('/', services.homeRoutes)

/**
 * @description add user Route
 * @method GET/add-user
 */
route.get('/add-user',services.addUser);

/**
 * @description update user Route
 * @method GET/update-user
  */
route.get('/update-user', services.updateUser)
route.get('/update-user',controller.update)
//API
route.post('/api/users', controller.create);
route.get('/api/users', controller.find);
route.put('/api/users/:id', controller.update);
route.delete('/api/users/:id', controller.delete);

module.exports = route;