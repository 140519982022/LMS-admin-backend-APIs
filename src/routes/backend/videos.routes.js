const express = require('express');
const route = express.Router();
const videosController = require('../../controllers/backend/videos.controller');

module.exports = app => {

    route.post('/add', videosController.add);

    route.post('/view', videosController.view);

    route.post('/course-category', videosController.courseCategories);

    route.put('/change-status', videosController.changeStatus);

    route.post('/multiple-delete', videosController.multipleDelete);

    route.post('/detail/:id', videosController.detail);

    route.put('/update', videosController.update);




    route.delete('/delete/:id', videosController.delete);



    app.use('/api/backend/videos',route);

}