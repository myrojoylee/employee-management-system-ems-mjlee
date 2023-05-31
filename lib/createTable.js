// this helper function creates formatted tables
module.exports = (rows, option) => {
  const { table } = require("table");
  let array;
  let columnHeadings = Object.keys(rows[0]);
  switch (option) {
    case "dept":
      array = rows.map((val) => [val.id, val.name]);
      break;
    case "empl":
      array = rows.map((val) => [
        val.id,
        val.first_name,
        val.last_name,
        val.role_id,
        val.manager_id,
      ]);
      break;
    case "role":
      array = rows.map((val) => [
        val.id,
        val.title,
        val.salary,
        val.department_id,
      ]);

      break;
  }
  array.unshift(columnHeadings);
  console.log(table(array));
};
