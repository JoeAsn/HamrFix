import ErrorAPI from "../errors/AppError.js";
function notFoundMiddleware(req , res , next){
    new ErrorAPI("the requested route does not exist." , 404) ;
}
export default notFoundMiddleware ;