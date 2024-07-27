const coursesModel = require('../../models/courses')

// insert new course detail / record
exports.add = async(request,response)=>{
    console.log("inside controller!!")

    var data = new coursesModel({
        name : request.body.name,
        price : request.body.price,
        duration : request.body.duration,
        order : request.body.order ?? 1,
        description : request.body.description,
        image : request.body.image,
        status : request.body.status ?? 1
    });

    await data.save().then((result) => {
        var res = {
            status : true,
            message : 'Course Added Succussfully',
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

// view all courses record
exports.view = async(request,response)=>{
    //     try {

    //         // collect all records from db
    //     var  result = await coursesModel.find()

    //     var userData = {
    //         status:true,
    //         message:"Record fetched successfully",
    //         data:result
    //     }

    //     response.send(userData)

    // } catch (error) {
    //     var result = {
    //         status:false,
    //         message:"somthing went wrong",
    //         error_message:error_message
    //     }

    //     response.send(result)
        
    // }

    // console.log("iinside view")

    var condition = {
        deleted_at : null
    } 

    if (request.body.name != undefined) {
         if(request.body.name != ''){
            condition.name = new RegExp(request.body.name,'i')
            
        }
        
    }
   

    if (request.body.price != undefined) {
    if(request.body.price != ''){
        condition.price = request.body.price
        
    }
    }

    if (request.body.duration != undefined) {
    if(request.body.duration != ''){
        condition.duration = new RegExp(request.body.duration,'i')
        
    }
    }

    if (request.body.status != undefined) {
    if(request.body.status != ''){
        condition.status = new RegExp(request.body.status,'i')
    }
    }

    // console.log(condition)


    await coursesModel.find(condition).sort({order:'asc'},{_id:'desc'}).then((result)=>{
        if (result.length > 0) {
            var res = {
                status:true,
                message:"Record fetched successfully",
                data:result
            }

        response.send(res)

        }else{
            var res = {
                status:false,
                message:"No Record Found",
                data:''
            }

            response.send(res)
        }


    }).catch((error)=>{
        var res = {
            status:false,
            message:"somthing went wrong"
        }

        response.send(res)

    })
    
}

// get perticular course detail by using id
exports.detail = async(request,response)=>{

    await coursesModel.findById(request.params.id).then(
        (result)=>{
            if (result != '') {
                var res = {
                    status:true,
                    message:"Record fetched successfully",
                    data:result
                }
            }else{
                var res = {
                    status:false,
                    message:"No Record Found",
                    data:''
                }
    
            }
    
            response.send(res)

        }
    ).catch((error)=>{
        var res = {
            status:false,
            message:"somthing went wrong"
        }

        response.send(res)

    })
    
    
}

// update perticular record by using id
exports.update = async(request,response)=>{

    var data = {
        name : request.body.name,
        price : request.body.price,
        duration : request.body.duration,
        order : request.body.order ?? 1,
        description : request.body.description,
        image : request.body.image,
        status : request.body.status ?? 1
    };

    await coursesModel.updateOne(
        {
            _id : request.body.id
        },
        {
            $set: data
        }
    ).then(
        (result)=>{
            if (result != '') {
                var res = {
                    status:true,
                    message:"Record update successfully",
                    data:result
                }
            }else{
                var res = {
                    status:false,
                    message:"No Record updated",
                    data:''
                }
    
            }
    
            response.send(res)

        }
    ).catch((error)=>{
        var res = {
            status:false,
            message:"somthing went wrong"
        }

        response.send(res)

    })
    
}

// update perticular key i.e "status" by using id and updated status value
exports.changeStatus = async(request,response)=>{

    const courseData = await coursesModel
    .findOne(
        {
            _id : request.body.id
        }
    )

    if(courseData == null){
        var res = {
            status : false,
            message : 'Id not msatched in db'
        }
        response.send(res)
    }

    await coursesModel.updateOne(
        
        {
            _id : request.body.id
        },
        {
            $set: {
                status : request.body.status
            }
        }
    ).then(
        (result)=>{
            if (result != '') {
                var res = {
                    status:true,
                    message:"Record update successfully",
                    data:result
                }
            }else{
                var res = {
                    status:false,
                    message:"No Record updated",
                    data:''
                }
    
            }
    
            response.send(res)

        }
    ).catch((error)=>{
        var res = {
            status:false,
            message:"somthing went wrong"
        }

        response.send(res)

    })
    
}

exports.delete = async(request,response)=>{

    
    const courseData = await coursesModel
    .findOne(
        {
            _id : request.body.id,
            deleted_at : null
        }
    )

    if(courseData == null){
        var res = {
            status : false,
            message : 'Id not msatched in db'
        }
        response.send(res)
    }

    await coursesModel.updateOne(
        
        {
            _id : request.body.id
        },
        {
            $set: {
                deleted_at : Date.now()
            }
        }
    ).then(
        (result)=>{
            if (result != '') {
                var res = {
                    status:true,
                    message:"Record Delete successfully",
                    data:result
                }
            }else{
                var res = {
                    status:false,
                    message:"No Record Deleted",
                    data:''
                }
    
            }
    
            response.send(res)

        }
    ).catch((error)=>{
        var res = {
            status:false,
            message:"somthing went wrong"
        }

        response.send(res)

    })

    
}


exports.multipleDelete = async(request,response)=>{

    await coursesModel.updateMany(
        
        {
            _id : {$in : request.body.ids}
        },
        {
            $set: {
                deleted_at : Date.now()
            }
        }
    ).then(
        (result)=>{
            if (result != '') {
                var res = {
                    status:true,
                    message:"Record Delete successfully",
                    data:result
                }
            }else{
                var res = {
                    status:false,
                    message:"No Record Deleted",
                    data:''
                }
    
            }
    
            response.send(res)

        }
    ).catch((error)=>{
        var res = {
            status:false,
            message:"somthing went wrong"
        }

        response.send(res)

    })

    
}