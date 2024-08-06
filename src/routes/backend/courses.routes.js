const express = require('express');
const route = express.Router();
const courseController = require('../../controllers/backend/courses.controller');

const multer  = require('multer')
const path = require('path')
const upload = multer({ dest: 'uploads/courses' })

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        
        cb(null, 'uploads/courses')
    },

    filename: function (req, file, cb) {
        console.log(file)
        const uniqueSuffix = Date.now()
        var imageExtenssion = path.extname(file.originalname)
        console.log(imageExtenssion)
        cb(null, file.fieldname + '-' + uniqueSuffix + imageExtenssion)
    }
})
  
const uploadImage = multer({ storage: storage }).single('image')

module.exports = app => {

    route.post('/add', uploadImage , courseController.add);

    route.post('/view',upload.none(), courseController.view);

    route.post('/detail/:id',upload.none(), courseController.detail);

    route.put('/update',uploadImage, courseController.update);

    route.put('/change-status',upload.none(), courseController.changeStatus);

    route.post('/delete',upload.none(), courseController.delete);

    route.post('/multiple-delete',upload.none(), courseController.multipleDelete);



    app.use('/api/backend/courses',route);

}