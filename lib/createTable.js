// this helper function creates formatted tables
function createTable(rows, option) {
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
        val.title,
        val.department,
        val.salary,
        val.manager,
      ]);
      break;
    case "role":
      array = rows.map((val) => [
        val.id,
        val.title,
        val.department,
        val.salary,
      ]);
      break;
  }
  array.unshift(columnHeadings);
  console.log(table(array));
}

module.exports = [createTable];
