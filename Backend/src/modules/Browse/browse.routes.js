import express from "express" ;
import asyncHandler from "./browse.controller.js"
const browse_router = express.Router() ;
browse_router.get("/browse" , asyncHandler) ;
export default browse_router ;