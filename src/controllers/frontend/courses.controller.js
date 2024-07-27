const coursesModel = require('../../models/courses');

exports.view = async(request,response)=>{

    var condition = {
        deleted_at : null,
        status : 1
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