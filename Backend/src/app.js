import express from "express" ;
import dbHealth from "./config/DB.health.js";
import browse_router from "./modules/Browse/browse.routes.js";
const app = express() ;
app.get("/health" , dbHealth)
app.use("/api/professionals", browse_router);
export default app ;