const {Pool} = require("pg");
require("dotenv").config();

const pool = new Pool({
  user: process.env.DBUSER,
  password: process.env.DBPASS,
  host: "localhost",
  port: 5432,
  database: "managing",
});

module.exports = pool;
