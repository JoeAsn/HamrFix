import http from "node:http";
import "dotenv/config";
import app from "./app.js";
import pool from "./config/database.js";
const server = http.createServer(app);
server.listen(Number(process.env.SERVER_PORT), () =>
  console.log("The server is listening for requests."),
);
let is_shuttingDown = false;
async function gracefulShutdown(signal) {
  if (is_shuttingDown) return;
  is_shuttingDown = true;
  console.log(signal, " signal is recived.");
  const shutdownTimer = setTimeout(async () => {
    console.log("time out for the graceful shutdown.");
    process.exit(1);
  }, 30_000);
  try {
    await new Promise((resolve, reject) => {
      server.close((error) => {
        if (error) {
          console.log("error happened when tring to close the server.");
          reject(error);
          return;
        }
        resolve();
      });
    });
    await pool.end();
    console.log(
      "both the pools and the server are closed for new connections.",
    );
    clearTimeout(shutdownTimer);
    process.exitCode = 0;
  } catch (error) {
    clearTimeout(shutdownTimer);
    process.exit(1);
  } finally {
    clearTimeout(shutdownTimer);
  }
}
process.on("SIGINT", () => gracefulShutdown("SIGINT"));
process.on("SIGTERM", () => gracefulShutdown("SIGTERM"));
