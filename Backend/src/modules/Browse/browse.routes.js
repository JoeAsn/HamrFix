import express from "express" ;
import asyncHandler from "./browse.controller.js"
import browse_validation from "./browse_validation.js";
const browse_router = express.Router() ;
browse_router.get("/browse" , browse_validation, asyncHandler) ;
export default browse_router ;
