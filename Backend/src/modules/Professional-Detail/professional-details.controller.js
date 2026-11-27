import asyncHandler from "../../shared/utils/async-handler.js" ;
import proDetailService from "./professional-details.service.js";
async function ProDetailController(req , res , next){
    const {professionalId} = req.params ; 
    const result = await proDetailService(professionalId) ;
    res.json(result)
}
export default asyncHandler(ProDetailController);