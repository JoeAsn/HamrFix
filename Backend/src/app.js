import express from "express" ;
import dbHealth from "./config/DB.health.js";
const app = express() ;
app.get("/health" , dbHealth)
export default app ;