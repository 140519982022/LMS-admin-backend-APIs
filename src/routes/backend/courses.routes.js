const express = require('express');
const route = express.Router();
const courseController = require('../../controllers/backend/courses.controller');

module.exports = app => {

    route.post('/add', courseController.add);

    route.post('/view', courseController.view);

    route.post('/detail/:id', courseController.detail);

    route.put('/update', courseController.update);

    route.put('/change-status', courseController.changeStatus);

    route.post('/delete', courseController.delete);

    route.post('/multiple-delete', courseController.multipleDelete);



    app.use('/api/backend/courses',route);

}