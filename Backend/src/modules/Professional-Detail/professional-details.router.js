import express from "express"
import professionalDetailsController from "./professional-details.controller.js";
const professionalDetail = express.Router() ;
professionalDetail.get("/professional/:professionalId" , professionalDetailsController)
export default professionalDetail ;