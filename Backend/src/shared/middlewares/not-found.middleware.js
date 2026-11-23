import ErrorAPI from "../errors/AppError.js";
function notFoundMiddleware(req , res , next){
    new ErrorAPI("the requested route does not exist." , 400) ;
}
export default notFoundMiddleware ;