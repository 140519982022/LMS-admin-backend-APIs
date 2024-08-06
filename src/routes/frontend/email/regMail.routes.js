const express = require('express');
const route = express.Router()

const regMailController = require('../../../controllers/frontend/email/regMail.controller')

module.exports = app => {

    route.post('/send-mail',regMailController.sendMail);

    app.use('/api/frontend/email',route);
}



