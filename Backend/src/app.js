import express from "express" ;
import dbHealth from "./config/DB.health.js";
import browse_router from "./modules/Browse/browse.routes.js";
import professionalDetail from "./modules/Professional-Detail/professional-details.router.js";
const app = express() ;
app.use(express.json())
app.get("/health" , dbHealth)
app.use("/api/professionals", browse_router);
app.use("/api" ,professionalDetail)
export default app ;