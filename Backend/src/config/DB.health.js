import pool from "./database.js";
export default async function dbHealth(req, res, next) {
  try {
    const result = await pool.query("SELECT 1");
    res.status(200).json({
      status: "ready",
      database: "connected",
    });
  } catch (error) {
    res.status(503).json({
      status: "not ready",
      database: "not available",
    });
  }
}
