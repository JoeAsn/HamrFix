import asyncHandler from "../../shared/utils/async-handler.js";
import browse_service from "./browse.service.js";
async function browse_controller (req ,res , next){
    const browse_result = await browse_service({
        filters: req.filters,
        pagination: req.pagination,
    });
    res.status(200).json(browse_result);
}
export default asyncHandler(browse_controller) ;
