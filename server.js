const express = require("express");
const mysql = require("mysql2");

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const db = mysql.createConnection(
  {
    host: "localhost",
    user: "global_user",
    password: "global456",
    database: "ems_db",
  },
  console.log(`Connected to the ems_db database.`)
);

db.query("SELECT * FROM departments", function (err, departments_table) {
  console.log(departments_table);
});

app.use((req, res) => {
  res.status(404).end();
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
