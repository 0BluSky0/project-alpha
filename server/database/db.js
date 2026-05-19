const { Pool } = require("pg");
require("dotenv").config();

const pool = new Pool ({
    connectionString: process.env.NODE_ENV === "test"
    ? process.env.DB_TEST_URL
    : process.env.DB_URL
});

module.exports = pool;
