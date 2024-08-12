const { findOne } = require('../../models/courses');
const usersModel = require('../../models/users');
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
var secretKey = '1234567890'

exports.register = async(request,response)=>{
    var data = new usersModel({
        name: request.body.name,
        email: request.body.email,
        mobile_number: request.body.mobile_number,
        password: bcrypt.hashSync(request.body.password, 10)  
    })

    await data.save().then((result)=>{

        var token = jwt.sign({
            // email: result.email
            userData:result
          },
          secretKey,

          {
            expiresIn : '15s'
          }
        )

        var res = {
            status: true,
            message:"use registed successfully!!",
            token:token,
            data:result
        }

        response.send(res)

    }).catch((error)=>{
        var res = {
            status: false,
            message:"use registed failed!!",
            error: error
        }

        response.send(res)

    })

    

}

exports.login = async(request,response)=>{
    // console.log("login")

   
    await usersModel.findOne(
        {
            email: request.body.email
        }
    ).then((result)=>{
        if (result) {
            var compare = bcrypt.compareSync(request.body.password,result.password)

            if (compare) {
                var token = jwt.sign({
                    // email: result.email
                    userData:result

                  },
                  secretKey,

                  {
                    expiresIn : '1h'
                  }
                )

                var res = {
                    status : true,
                    message:"Loged in Successfully",
                    token:token,
                    data:result
                }
                
            }else{

                var res = {
                    status : false,
                    message:"Incorrect Password",
                    token:token,
                    data:result
                }
                

            }
            
        }else{
            var res = {
                status : false,
                message:"No user Found",
                
            }
        }

        response.send(res)
    }).catch((error)=>{

    })
    

}

exports.profile = async(request,response) => {
    console.log("profile")

    console.log(request.headers.authorization);

    if(request.headers.authorization == undefined){
        var res = {
            status : false,
            token_error : true,
            message : 'token required'
        }
        response.send(res);
    }

    if(request.headers.authorization == ''){

        var res = {
            status : false,
            token_error : true,
            message : 'Invalid token.. required'
        }

        response.send(res);

    }

    // verify a token symmetric
    jwt.verify(request.headers.authorization, secretKey, function(error, result) {
        if(error){
            var res = {
                status : false,
                token_error : true,
                message : 'Incorrect token'
            }
    
            response.send(res);
        } else {
            var res = {
                status : true,
                message : 'Profile found.',
                data : result
            }

            response.send(res);
        }   
    })
}