const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const server = express();
server.use(cors());

server.use(express.json());
server.use(express.urlencoded( {extended : true} ));

server.get('/', (request,response)=>{
    console.log("Server Working Fine!!!");
    response.send("Server Working Fine!!!");
    
});

require('./src/routes/backend/courses.routes')(server);
require('./src/routes/backend/videos.routes')(server);


server.get('*', (request,response)=>{
    console.log("Page Not Found!!!");
    response.send("Page Not Found!!!");

});

mongoose.connect('mongodb://localhost:27017/learning_management_system').then(()=>{
    server.listen('8000', 
        ()=>{
            console.log("Databse Connected Successfully!!!")
        }
    )
}).catch((error)=>{
        console.log("Databse Not Connected..." + error)
});

