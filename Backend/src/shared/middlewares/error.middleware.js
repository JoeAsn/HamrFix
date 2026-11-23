function appErrorHander(err , req , res , next){
    res.status(err.statusCode).json(
        {
            success : false ,
            status : err.status ,
            errorcode : err.errorCode ,
            message : err.message ,
        }
    )
}