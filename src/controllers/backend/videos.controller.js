const Videos = require('../../models/videos')
const Course = require('../../models/courses')

exports.add = async(request,response)=>{
    console.log("inside controller!!")

    var data = new Videos({
        // category : request.body.category,
        category_id : request.body.category_id,
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

    var condition = {
        deleted_at : null
    } 

    // if (request.body.name != undefined) {
    //      if(request.body.name != ''){
    //         condition.name = new RegExp(request.body.name,'i')
            
    //     }
        
    // }
   

    // if (request.body.price != undefined) {
    // if(request.body.price != ''){
    //     condition.price = request.body.price
        
    // }
    // }

    // if (request.body.duration != undefined) {
    // if(request.body.duration != ''){
    //     condition.duration = new RegExp(request.body.duration,'i')
        
    // }
    // }

    // if (request.body.status != undefined) {
    // if(request.body.status != ''){
    //     condition.status = new RegExp(request.body.status,'i')
    // }
    // }

    // console.log(condition)

    try {
        var videosData = await Videos.find(condition)
        .populate({
            path : 'category_id',
            select: { '_id': 1,'name':1,'image':1},
        } )
        // .populate({ path: 'categories', options: {strictPopulate: false} })
        .exec();

        if(videosData.length != 0){
            var res = {
                status : true,
                message : 'record found successfully !!',
                data : videosData
            }
            
            response.send(res);
        } else {
            var res = {
                status : false,
                message : 'No record found !!'
            }
            
            response.send(res);
        }

    } catch (error) {
        console.log(error);
        var res = {
            status : false,
            message : 'Something went wrong !!'
        }
        
        response.send(res);

    } 


    // await Videos.find(condition).sort({_id:'asc'}).then((result)=>{
    //     if (result.length > 0) {
    //         var res = {
    //             status:true,
    //             message:"Record fetched successfully",
    //             data:result
    //         }

    //     response.send(res)

    //     }else{
    //         var res = {
    //             status:false,
    //             message:"No Record Found",
    //             data:''
    //         }

    //         response.send(res)
    //     }


    // }).catch((error)=>{
    //     var res = {
    //         status:false,
    //         message:"somthing went wrong"
    //     }

    //     response.send(res)

    // })
    
}

exports.courseCategories = async(request,response)=>{
    var condition = {
        deleted_at : null,
        status : true
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


    await Course.find(condition).sort({_id:'asc'}).then((result)=>{
        if (result.length > 0) {
            var res = {
                status:true,
                message:"Course Category fetched successfully",
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

exports.changeStatus = async(request,response)=>{

    const courseData = await Videos
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

    await Videos.updateOne(
        
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
                    message:"Status update successfully",
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

exports.multipleDelete = async(request,response)=>{

    await Videos.updateMany(
        
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

exports.detail = async(request,response)=>{

    await Videos.findById(request.params.id).then(
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

exports.update = async(request,response)=>{

    var data = {
        // category : request.body.category,
        category_id : request.body.category_id,
        topic : request.body.topic,
        link : request.body.link,
        status : request.body.status ?? 1
    };

    
    if (request.body.category_id == undefined) {
        var res = {
            status:false,
            message:"No Record updated",
            data:''
        }
        response.send(res)
   }
   
   if(request.body.category_id  == ''){
        var res = {
            status:false,
            message:"No Record updated",
            data:''
        }

        response.send(res)
    }



    console.log(data)

    
    await Videos.updateOne(
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

exports.editCourseCategories = async(request,response)=>{
    await Course.findById(request.params.id).then(
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

// exports.delete = async(request,response)=>{
    
// }