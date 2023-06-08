const mysql = require("mysql2/promise");

const db = mysql.createConnection(
  {
    host: "localhost",
    user: "global_user",
    password: "global456",
    database: "ems_db",
  },
  console.log(`Connected to the ems_db database.`)
);

module.exports = db;
