import { Pool } from "pg";
import validateEnv from "./validate.env.js";

const validatedEnv = validateEnv();
const env = validatedEnv;
const pool = new Pool({
  host: env.DB_HOST,
  port: env.DB_PORT,
  user: env.DB_USER,
  password: env.DB_PASSWORD,
  database: env.DB_NAME,
  max: env.DB_POOL,

  idleTimeoutMillis: 30_000,
  connectionTimeoutMillis: 5_000,

  maxLifetimeSeconds: 1800
});

pool.on("error", (err) => {
  console.error("Unexpected idle PostgreSQL client error:", err);
});

export default pool;
