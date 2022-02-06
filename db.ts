import { Pool } from "pg";
import "dotenv/config";

export const pool = new Pool({
  user: process.env.DBUSER ?? "",
  password: process.env.DBPASS ?? "",
  host: "localhost",
  port: 5432,
  database: "managing",
});
