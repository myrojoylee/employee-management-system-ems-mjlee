const express = require("express");
const db = require("./lib/db");

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// db.query("SELECT * FROM departments", function (err, results) {
//   const departments_table = results;
//   console.log(departments_table);
// });

// db.query("SELECT * FROM roles", function (err, results) {
//   const roles_table = results;
//   return roles_table;
// });

// db.query("SELECT * FROM employees", function (err, results) {
//   const employees_table = results;
//   return employees_table;
// });

// app.use((req, res) => {
//   res.status(404).end();
// });

// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });
