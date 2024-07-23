const videosModel = require('../../models/videos')

exports.add = async(request,response)=>{
    console.log("inside controller!!")

    var data = new videosModel({
        category : request.body.category,
        topic : request.body.topic,
        link : request.body.link,
        status : request.body.status ?? 1
    });

    await data.save().then((result) => {
        var res = {
            status : true,
            message : 'Course Video Added Succussfully',
            data : result
        }
    
        response.send(res);

    }).catch((error) => {
        var error_messages = [];

        for(let field in error.errors){
            error_messages.push(error.errors[field].message);
        }

        var res = {
            status : false,
            message : 'Something went wrong',
            error_messages : error_messages
        }
    
        response.send(res);
    });

}

exports.view = async(request,response)=>{
    try {

        // collect all records from db
    var  result = await videosModel.find()
    // var  result = await videosModel.find({status:true})

    var userData = {
        status:true,
        message:"Record fetched successfully",
        data:result
    }

    response.send(userData)

} catch (error) {
    var result = {
        status:false,
        message:"somthing went wrong",
        error_message:error_message
    }

    response.send(result)
    
}
    
}

exports.update = async(request,response)=>{
    
}

exports.delete = async(request,response)=>{
    
}