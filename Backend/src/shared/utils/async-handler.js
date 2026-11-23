function asyncHandler(controller){
    const handler = async function (req ,res , next) {
        try{
            await controller(req , res , next) ;
        }
        catch(error){
            next(error)
        }
    }
    return handler ;
}
export default asyncHandler ;