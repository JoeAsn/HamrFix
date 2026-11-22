import http from "node:http"
import "dotenv/config"
import app from "./app.js";
const server = http.createServer(app) ;
server.listen(Number(process.env.SERVER_PORT) , ()=>console.log("The server is listening for requests.")) ;