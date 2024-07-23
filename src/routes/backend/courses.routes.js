const express = require('express');
const route = express.Router();
const courseController = require('../../controllers/backend/courses.controller');

module.exports = app => {

    route.post('/add', courseController.add);

    route.post('/view', courseController.view);

    route.post('/update', courseController.update);

    route.delete('/delete/:id', courseController.delete);


    app.use('/api/backend/courses',route);

}