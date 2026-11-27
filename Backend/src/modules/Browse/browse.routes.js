import express from "express" ;
import browse_controller from "./browse.controller.js";
import browse_validation from "./browse_validation.js";
const browse_router = express.Router() ;
browse_router.get("/browse", browse_validation, browse_controller);
export default browse_router ;
