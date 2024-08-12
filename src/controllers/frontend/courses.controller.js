const coursesModel = require('../../models/courses');
var jwt = require('jsonwebtoken');
var secretKey = '1234567890'


exports.view = async(request,response)=>{

    // console.log(request.headers.authorization.split(' ')[1])

    if (request.headers.authorization.split(' ')[1] == undefined) {
        var res = {
            status:false,
            message:"Token Required",
        }
        response.send(res)
    }

    if (request.headers.authorization.split(' ')[1] == '') {
        var res = {
            status:false,
            message:"Token Required",
        }
        response.send(res)
    }

    // verify a token symmetric
    jwt.verify(request.headers.authorization.split(' ')[1], secretKey, function(error, result) {

        if(error) {
            var res = {
                status:false,
                message:"Incorrect Token",
            }
            response.send(res)
            
        }else{
            var userDetails = result
            console.log(result)
        }
        
    });

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


    await coursesModel.find(condition).sort({order:'asc'},{_id:'desc'}).then((result,userDetails)=>{
        if (result.length > 0) {
            var res = {
                status:true,
                message:"Record fetched successfully",
                userDetails:userDetails,
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