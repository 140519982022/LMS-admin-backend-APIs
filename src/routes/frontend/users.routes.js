const express = require('express');
const route = express.Router()

const usersController = require('../../controllers/frontend/users.controller')

module.exports = app => {

    route.post('/register',usersController.register);

    route.post('/login',usersController.login);

    route.post('/profile', usersController.profile);


    app.use('/api/frontend/users',route);
}



